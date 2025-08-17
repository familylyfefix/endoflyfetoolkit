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

    // Add subscriber to ConvertKit with specific tag to trigger automation
    const subscriberResponse = await fetch("https://api.convertkit.com/v3/subscribers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        api_key: convertKitApiKey,
        email: email,
        first_name: name || email.split('@')[0],
        tags: ["end-of-lyfe-toolkit-purchase"], // This tag triggers the welcome sequence
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
    logStep("Subscriber added to ConvertKit with welcome tag", { subscriberId: subscriberData.subscriber?.id });

    // The welcome email will be sent automatically by ConvertKit automation
    // triggered by the "end-of-lyfe-toolkit-purchase" tag

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