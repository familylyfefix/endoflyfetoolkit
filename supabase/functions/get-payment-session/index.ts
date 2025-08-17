import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[GET-PAYMENT-SESSION] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Starting payment session retrieval");

    const { sessionId } = await req.json();
    if (!sessionId) {
      throw new Error("Session ID is required");
    }
    logStep("Session ID received", { sessionId });

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) {
      throw new Error("Stripe secret key not configured");
    }
    logStep("Stripe key verified");

    const stripe = new Stripe(stripeKey, {
      apiVersion: "2023-10-16",
    });

    // Retrieve the checkout session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    logStep("Retrieved Stripe session", { 
      sessionId: session.id,
      customerEmail: session.customer_email,
      customerDetails: session.customer_details?.email,
      paymentStatus: session.payment_status
    });

    // Get customer email - check both possible fields
    const customerEmail = session.customer_email || session.customer_details?.email;
    
    if (!customerEmail) {
      throw new Error("No customer email found in session");
    }

    // Get customer name from metadata or customer details
    const customerName = session.metadata?.customerName || 
                        (session.customer_details?.name) ||
                        customerEmail.split('@')[0];

    return new Response(JSON.stringify({
      success: true,
      customerEmail,
      customerName,
      paymentStatus: session.payment_status,
      amountTotal: session.amount_total
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR in get-payment-session", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});