import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[SECURE-DOWNLOAD] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Starting secure download request");

    const { sessionId } = await req.json();
    if (!sessionId) {
      throw new Error("Stripe session ID is required");
    }
    logStep("Session ID received", { sessionId });

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
    logStep("Stripe session verified", { paymentStatus: session.payment_status });

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
      logStep("Creating new purchase session record");
      const { data: newSession, error: insertError } = await supabase
        .from("purchase_sessions")
        .insert({
          stripe_session_id: sessionId,
          customer_email: session.customer_details?.email || session.customer_email,
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
      logStep("Purchase session created", { sessionId: purchaseSession.id });
    }

    // Check if session has expired (30 days)
    const expiryDate = new Date(purchaseSession.expires_at);
    const now = new Date();
    if (now > expiryDate) {
      throw new Error("Download access has expired (30 days limit)");
    }
    logStep("Session expiry check passed", { expiresAt: purchaseSession.expires_at });

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
    logStep("Download limit check passed", { successfulDownloads, remaining: 3 - successfulDownloads });

    // Create signed URL for the PDF (expires in 10 minutes)
    const fileName = "End-Of-LyfeToolkit.pdf";
    const { data: signedUrlData, error: urlError } = await supabase.storage
      .from("toolkit-downloads")
      .createSignedUrl(fileName, 600); // 10 minutes

    if (urlError) {
      throw new Error(`Failed to create download URL: ${urlError.message}`);
    }
    logStep("Signed URL created", { fileName, expiresIn: "10 minutes" });

    // Log this download attempt
    const clientIP = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown";
    const userAgent = req.headers.get("user-agent") || "unknown";
    const urlExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

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
      console.error("Failed to log download attempt:", logError);
      // Don't fail the request, just log the error
    }

    logStep("Download attempt logged successfully", { 
      remainingDownloads: 3 - successfulDownloads - 1,
      clientIP,
      userAgent 
    });

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
    logStep("ERROR in secure-download", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});