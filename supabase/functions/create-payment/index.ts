import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const requestBody = await req.json();
    const { customerInfo, couponCode } = requestBody;
    
    // Validate customer info
    if (!customerInfo?.email || !customerInfo?.firstName || !customerInfo?.lastName) {
      throw new Error("Missing required customer information");
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(customerInfo.email) || customerInfo.email.length > 255) {
      throw new Error("Invalid email address");
    }
    
    // Validate name lengths
    if (customerInfo.firstName.length > 100 || customerInfo.lastName.length > 100) {
      throw new Error("Name fields too long");
    }
    
    // Validate address fields
    if (customerInfo.address?.length > 500 || customerInfo.city?.length > 100 || customerInfo.zipCode?.length > 20) {
      throw new Error("Address fields too long");
    }
    
    // Sanitize coupon code (alphanumeric only, max 50 chars)
    let sanitizedCouponCode = "";
    if (couponCode && typeof couponCode === 'string') {
      sanitizedCouponCode = couponCode.trim().replace(/[^a-zA-Z0-9]/g, '').substring(0, 50);
    }
    
    // SERVER-SIDE PRICE CALCULATION - NEVER trust client
    const PRODUCT_PRICE = 67; // Hardcoded price in dollars
    
    // Initialize Stripe
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    
    if (!stripeKey) {
      throw new Error("Payment system not configured");
    }
    
    const stripe = new Stripe(stripeKey, {
      apiVersion: "2023-10-16",
    });

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
            unit_amount: PRODUCT_PRICE * 100, // Convert to cents
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
    if (sanitizedCouponCode) {
      sessionOptions.discounts = [{
        coupon: sanitizedCouponCode
      }];
    }

    // Create a one-time payment session
    const session = await stripe.checkout.sessions.create(sessionOptions);

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    // Minimal error logging without PII
    console.error("[CREATE-PAYMENT] Error:", error.message);
    
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: error.statusCode || 400,
    });
  }
});