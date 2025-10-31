import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface WaitlistEmailRequest {
  email: string;
}

const handler = async (req: Request): Promise<Response> => {
  console.log('Waitlist confirmation email function called');
  
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email }: WaitlistEmailRequest = await req.json();
    console.log('Sending confirmation email to:', email);

    const emailResponse = await resend.emails.send({
      from: "Family Lyfe Toolkit <onboarding@resend.dev>",
      to: [email],
      subject: "🎉 You're on the Family Lyfe Toolkit Waitlist!",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .header {
                background: linear-gradient(135deg, #B8733D 0%, #D4915F 100%);
                color: white;
                padding: 30px 20px;
                text-align: center;
                border-radius: 8px 8px 0 0;
              }
              .content {
                background: #ffffff;
                padding: 30px 20px;
                border: 1px solid #e5e7eb;
                border-top: none;
                border-radius: 0 0 8px 8px;
              }
              .highlight {
                background: #fef3c7;
                padding: 15px;
                border-left: 4px solid #B8733D;
                margin: 20px 0;
                border-radius: 4px;
              }
              .footer {
                text-align: center;
                margin-top: 20px;
                color: #6b7280;
                font-size: 14px;
              }
              h1 { margin: 0; font-size: 28px; }
              .emoji { font-size: 48px; margin-bottom: 10px; }
            </style>
          </head>
          <body>
            <div class="header">
              <div class="emoji">🎉</div>
              <h1>Welcome to the Waitlist!</h1>
            </div>
            <div class="content">
              <p>Hi there,</p>
              
              <p>Thank you for joining the <strong>Family Lyfe Toolkit</strong> waitlist! We're thrilled to have you on board.</p>
              
              <div class="highlight">
                <strong>📅 Launch Date: November 28th</strong><br>
                Mark your calendar! We'll send you an email as soon as we launch.
              </div>
              
              <p><strong>What to expect:</strong></p>
              <ul>
                <li>Comprehensive estate planning resources</li>
                <li>Easy-to-follow checklists and guides</li>
                <li>Tools to protect your family's future</li>
                <li>Expert insights delivered to your inbox</li>
              </ul>
              
              <p>We're working hard to make this the best resource for families like yours.</p>
              
              <p>Thank you for your patience and support!</p>
              
              <p>Best regards,<br>
              <strong>The Family Lyfe Toolkit Team</strong></p>
            </div>
            <div class="footer">
              <p>You received this email because you signed up for the Family Lyfe Toolkit waitlist.</p>
            </div>
          </body>
        </html>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-waitlist-confirmation function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
