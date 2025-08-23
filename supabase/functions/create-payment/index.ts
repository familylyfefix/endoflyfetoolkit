import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  console.log('create-payment function called');
  console.log('Request method:', req.method);
  console.log('Request origin:', req.headers.get("origin"));
  
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    console.log('Handling CORS preflight request');
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const requestBody = await req.json();
    console.log('Request body received:', JSON.stringify(requestBody, null, 2));
    const { price, customerInfo, couponCode } = requestBody;
    
    // Initialize Stripe
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    console.log('Stripe key exists:', !!stripeKey);
    
    if (!stripeKey) {
      throw new Error("STRIPE_SECRET_KEY is not configured in Edge Function secrets");
    }
    
    const stripe = new Stripe(stripeKey, {
      apiVersion: "2023-10-16",
    });
    console.log('Stripe client initialized');

    // Create session options
    const sessionOptions: any = {
      customer_email: customerInfo.email,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { 
              name: "End-Of-Lyfe Toolkit",
              description: "Complete digital toolkit for end-of-life planning - 3 downloads, 30-day access"
            },
            unit_amount: price * 100, // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${req.headers.get("origin")}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get("origin")}/checkout`,
      metadata: {
        customerName: `${customerInfo.firstName} ${customerInfo.lastName}`,
        customerAddress: `${customerInfo.address}, ${customerInfo.city}, ${customerInfo.zipCode}`,
      },
    };

    // Add coupon if provided
    if (couponCode && couponCode.trim()) {
      sessionOptions.discounts = [{
        coupon: couponCode.trim()
      }];
    }

    // Create a one-time payment session
    console.log('Creating Stripe checkout session with options:', JSON.stringify(sessionOptions, null, 2));
    const session = await stripe.checkout.sessions.create(sessionOptions);
    console.log('Stripe session created successfully:', session.id);
    console.log('Checkout URL:', session.url);

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Payment creation error:", error);
    console.error("Error stack:", error.stack);
    console.error("Error details:", JSON.stringify(error, null, 2));
    
    // Return more detailed error information
    const errorResponse = {
      error: error.message,
      type: error.constructor.name,
      details: error.raw || error.context || null
    };
    
    return new Response(JSON.stringify(errorResponse), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: error.statusCode || 500,
    });
  }
});