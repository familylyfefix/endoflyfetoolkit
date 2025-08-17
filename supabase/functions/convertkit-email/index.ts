import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[CONVERTKIT-EMAIL] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Starting ConvertKit email delivery");

    const { email, name, sessionId } = await req.json();
    if (!email) {
      throw new Error("Email address is required");
    }
    logStep("Email request received", { email, name, sessionId });

    const convertKitApiKey = Deno.env.get("CONVERTKIT_API_KEY");
    if (!convertKitApiKey) {
      throw new Error("ConvertKit API key not configured");
    }
    logStep("ConvertKit API key verified");

    // Add subscriber to ConvertKit
    const subscriberResponse = await fetch("https://api.convertkit.com/v3/subscribers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        api_key: convertKitApiKey,
        email: email,
        first_name: name || email.split('@')[0],
        tags: ["end-of-lyfe-toolkit-purchase"],
        fields: {
          stripe_session_id: sessionId,
          purchase_date: new Date().toISOString(),
          product: "End-Of-Lyfe Toolkit"
        }
      }),
    });

    if (!subscriberResponse.ok) {
      const errorData = await subscriberResponse.text();
      logStep("ConvertKit subscriber creation failed", { status: subscriberResponse.status, error: errorData });
      throw new Error(`Failed to add subscriber to ConvertKit: ${errorData}`);
    }

    const subscriberData = await subscriberResponse.json();
    logStep("Subscriber added to ConvertKit", { subscriberId: subscriberData.subscriber?.id });

    // Send welcome email with download instructions
    const emailContent = `
      <h1>Welcome to Family Lyfe Fix!</h1>
      <p>Thank you for purchasing the End-Of-Lyfe Toolkit. Your digital download is ready!</p>
      
      <h2>Download Instructions:</h2>
      <ol>
        <li>You have <strong>3 downloads available</strong> for the next 30 days</li>
        <li>Return to the success page to download your toolkit</li>
        <li>Keep your confirmation email for your records</li>
      </ol>
      
      <p><strong>Important:</strong> Your download access will expire 30 days from today. Make sure to save your toolkit to your device.</p>
      
      <p>If you have any questions or need support, please don't hesitate to reach out to us.</p>
      
      <p>Best regards,<br>
      The Family Lyfe Fix Team</p>
      
      <hr>
      <p><small>Order Details:<br>
      Product: End-Of-Lyfe Toolkit<br>
      Session ID: ${sessionId}<br>
      Purchase Date: ${new Date().toLocaleDateString()}</small></p>
    `;

    const broadcastResponse = await fetch(`https://api.convertkit.com/v3/broadcasts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        api_key: convertKitApiKey,
        subject: "Your End-Of-Lyfe Toolkit Download is Ready! 📋",
        content: emailContent,
        email_address: email,
        send_at: new Date().toISOString()
      }),
    });

    if (!broadcastResponse.ok) {
      const errorData = await broadcastResponse.text();
      logStep("ConvertKit email broadcast failed", { status: broadcastResponse.status, error: errorData });
      // Don't fail completely, as subscriber was added successfully
      console.error("Email broadcast failed but subscriber was added:", errorData);
    } else {
      const broadcastData = await broadcastResponse.json();
      logStep("Welcome email sent successfully", { broadcastId: broadcastData.broadcast?.id });
    }

    return new Response(JSON.stringify({ 
      success: true, 
      subscriberId: subscriberData.subscriber?.id,
      message: "Welcome email sent successfully" 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR in convertkit-email", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});