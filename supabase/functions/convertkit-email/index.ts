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

    // Step 1: First get or create the subscriber
    const subscriberResponse = await fetch("https://api.convertkit.com/v3/subscribers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        api_key: convertKitApiKey,
        email: email,
        first_name: name || email.split('@')[0],
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
    const subscriberId = subscriberData.subscription?.subscriber?.id || subscriberData.subscriber?.id;
    logStep("Subscriber created/updated", { subscriberId, email });

    // Step 2: Get all tags to find the ID for our tag
    const tagsResponse = await fetch(`https://api.convertkit.com/v3/tags?api_key=${convertKitApiKey}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!tagsResponse.ok) {
      const errorData = await tagsResponse.text();
      logStep("Failed to fetch tags", { status: tagsResponse.status, error: errorData });
      throw new Error(`Failed to fetch ConvertKit tags: ${errorData}`);
    }

    const tagsData = await tagsResponse.json();
    const purchaseTag = tagsData.tags?.find((tag: any) => 
      tag.name === "end-of-lyfe-toolkit-purchase"
    );

    if (!purchaseTag) {
      logStep("Tag not found", { availableTags: tagsData.tags?.map((t: any) => t.name) });
      throw new Error("Tag 'end-of-lyfe-toolkit-purchase' not found in ConvertKit");
    }

    logStep("Found tag", { tagId: purchaseTag.id, tagName: purchaseTag.name });

    // Step 3: Add the tag to the subscriber to trigger the automation
    const tagSubscribeResponse = await fetch(`https://api.convertkit.com/v3/tags/${purchaseTag.id}/subscribe`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        api_key: convertKitApiKey,
        email: email,
      }),
    });

    if (!tagSubscribeResponse.ok) {
      const errorData = await tagSubscribeResponse.text();
      logStep("Failed to add tag to subscriber", { status: tagSubscribeResponse.status, error: errorData });
      throw new Error(`Failed to add tag to subscriber: ${errorData}`);
    }

    const tagData = await tagSubscribeResponse.json();
    logStep("Tag added successfully - automation should trigger", { 
      subscriberId: tagData.subscription?.subscriber?.id,
      tagId: purchaseTag.id 
    });

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