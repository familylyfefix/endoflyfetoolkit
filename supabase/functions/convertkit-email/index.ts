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
    logStep("Starting ConvertKit email delivery - SIMPLIFIED VERSION");

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

    // Step 1: Get all tags to find the ID for our tag
    const tagsResponse = await fetch(`https://api.convertkit.com/v3/tags?api_key=${convertKitApiKey}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!tagsResponse.ok) {
      const errorData = await tagsResponse.text();
      logStep("Failed to fetch tags", { 
        status: tagsResponse.status, 
        statusText: tagsResponse.statusText,
        error: errorData,
        headers: Object.fromEntries(tagsResponse.headers.entries())
      });
      throw new Error(`Failed to fetch ConvertKit tags: ${errorData}`);
    }

    const tagsData = await tagsResponse.json();
    logStep("Tags fetched", { totalTags: tagsData.tags?.length });
    
    const purchaseTag = tagsData.tags?.find((tag: any) => 
      tag.name === "end-of-lyfe-toolkit-purchase"
    );

    if (!purchaseTag) {
      logStep("Tag not found - listing all available tags", { 
        availableTags: tagsData.tags?.map((t: any) => ({ id: t.id, name: t.name }))
      });
      throw new Error("Tag 'end-of-lyfe-toolkit-purchase' not found in ConvertKit. Please create this tag in ConvertKit first.");
    }

    logStep("Found tag", { tagId: purchaseTag.id, tagName: purchaseTag.name });

    // Step 2: Subscribe email to tag (this creates subscriber if doesn't exist AND adds tag)
    // This is the simplified approach - one API call does everything
    const tagSubscribeResponse = await fetch(`https://api.convertkit.com/v3/tags/${purchaseTag.id}/subscribe`, {
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

    const responseText = await tagSubscribeResponse.text();
    
    if (!tagSubscribeResponse.ok) {
      logStep("Failed to subscribe to tag", { 
        status: tagSubscribeResponse.status, 
        statusText: tagSubscribeResponse.statusText,
        error: responseText,
        headers: Object.fromEntries(tagSubscribeResponse.headers.entries())
      });
      throw new Error(`Failed to subscribe to tag: ${responseText}`);
    }

    let tagData;
    try {
      tagData = JSON.parse(responseText);
    } catch (e) {
      logStep("Response is not JSON", { responseText });
      tagData = { success: true, response: responseText };
    }

    logStep("Successfully subscribed to tag - automation should trigger", { 
      response: tagData,
      tagId: purchaseTag.id 
    });

    // The welcome email will be sent automatically by ConvertKit automation
    // triggered by the "end-of-lyfe-toolkit-purchase" tag

    return new Response(JSON.stringify({ 
      success: true, 
      message: "Subscriber added to tag successfully. ConvertKit automation will send the welcome email.",
      details: tagData
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR in convertkit-email", { 
      message: errorMessage,
      stack: error instanceof Error ? error.stack : undefined
    });
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});