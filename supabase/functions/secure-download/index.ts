import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { sessionId, email } = await req.json();
    
    // Validate sessionId format (Stripe pattern: cs_*)
    if (!sessionId || typeof sessionId !== 'string' || !sessionId.match(/^cs_[a-zA-Z0-9_]+$/)) {
      throw new Error("Invalid session ID format");
    }
    
    // Validate email
    if (!email || typeof email !== 'string') {
      throw new Error("Email is required for verification");
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email) || email.length > 255) {
      throw new Error("Invalid email address");
    }

    // Initialize Stripe to verify the session
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2023-10-16",
    });

    // Initialize Supabase with service role for database operations
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    // Verify the Stripe session exists and is paid
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (session.payment_status !== "paid") {
      throw new Error("Payment not completed for this session");
    }
    
    // SECURITY: Verify email matches the purchase
    const sessionEmail = session.customer_details?.email || session.customer_email;
    if (!sessionEmail || sessionEmail.toLowerCase() !== email.toLowerCase()) {
      throw new Error("Email does not match purchase record");
    }

    // Check if purchase session exists in our database
    let { data: purchaseSession, error: fetchError } = await supabase
      .from("purchase_sessions")
      .select("*")
      .eq("stripe_session_id", sessionId)
      .single();

    if (fetchError && fetchError.code !== "PGRST116") {
      throw new Error(`Database error: ${fetchError.message}`);
    }

    // If purchase session doesn't exist, create it
    if (!purchaseSession) {
      const { data: newSession, error: insertError } = await supabase
        .from("purchase_sessions")
        .insert({
          stripe_session_id: sessionId,
          customer_email: sessionEmail,
          customer_name: session.customer_details?.name,
          customer_address: session.customer_details?.address ? 
            `${session.customer_details.address.line1}, ${session.customer_details.address.city}, ${session.customer_details.address.postal_code}` : null,
          amount: session.amount_total,
          currency: session.currency,
          status: "completed"
        })
        .select()
        .single();

      if (insertError) {
        throw new Error(`Failed to create purchase session: ${insertError.message}`);
      }
      purchaseSession = newSession;
    }

    // Check if session has expired (30 days)
    const expiryDate = new Date(purchaseSession.expires_at);
    const now = new Date();
    if (now > expiryDate) {
      throw new Error("Download access has expired (30 days limit)");
    }

    // Count existing download attempts for this session
    const { data: downloadAttempts, error: countError } = await supabase
      .from("download_attempts")
      .select("id, download_success")
      .eq("purchase_session_id", purchaseSession.id);

    if (countError) {
      throw new Error(`Failed to check download attempts: ${countError.message}`);
    }

    const successfulDownloads = downloadAttempts.filter(attempt => attempt.download_success).length;
    if (successfulDownloads >= 3) {
      throw new Error("Download limit reached (3 downloads maximum)");
    }

    // Create signed URL for the PDF (expires in 10 minutes)
    const fileName = "End-Of-LyfeToolkit.pdf";
    const { data: signedUrlData, error: urlError } = await supabase.storage
      .from("toolkit-downloads")
      .createSignedUrl(fileName, 600); // 10 minutes

    if (urlError) {
      throw new Error(`Failed to create download URL: ${urlError.message}`);
    }

    // Log this download attempt with sanitized data
    const clientIP = (req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown").substring(0, 45);
    const userAgent = (req.headers.get("user-agent") || "unknown").substring(0, 255);
    const urlExpiresAt = new Date(Date.now() + 10 * 60 * 1000);

    const { error: logError } = await supabase
      .from("download_attempts")
      .insert({
        purchase_session_id: purchaseSession.id,
        file_name: fileName,
        download_ip: clientIP,
        user_agent: userAgent,
        download_success: true,
        download_url: signedUrlData.signedUrl,
        url_expires_at: urlExpiresAt.toISOString()
      });

    if (logError) {
      console.error("[SECURE-DOWNLOAD] Failed to log download attempt");
    }

    return new Response(JSON.stringify({
      downloadUrl: signedUrlData.signedUrl,
      remainingDownloads: 3 - successfulDownloads - 1,
      expiresAt: purchaseSession.expires_at,
      fileName: fileName
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("[SECURE-DOWNLOAD] Error:", errorMessage);
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});