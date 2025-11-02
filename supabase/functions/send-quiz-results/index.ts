import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface QuizResultsRequest {
  email: string;
  score: number;
  tier: number;
}

const getTierContent = (tier: number, score: number) => {
  if (tier === 1) {
    return {
      title: "You're a Caring Procrastinator - And That's Okay!",
      subtitle: "You love your family deeply, but planning feels overwhelming.",
      message: `You scored ${score}/24 points. The good news? You don't need to have everything figured out today.`,
      whatThisMeans: `
        <ul style="list-style: none; padding-left: 0;">
          <li style="margin: 8px 0;">✅ You recognize the importance of planning</li>
          <li style="margin: 8px 0;">⚠️ You haven't started the conversation yet</li>
          <li style="margin: 8px 0;">⚠️ Your family may not know your wishes</li>
        </ul>
      `,
      nextStep: "Start with ONE simple conversation this week using the FREE guide attached to this email."
    };
  } else if (tier === 2) {
    return {
      title: "You're a Thoughtful Planner - You're On Your Way!",
      subtitle: "You've started thinking about your family's future, but there are still some gaps to fill.",
      message: `You scored ${score}/24 points. Let's close those gaps together.`,
      whatThisMeans: `
        <ul style="list-style: none; padding-left: 0;">
          <li style="margin: 8px 0;">✅ You've made progress on planning</li>
          <li style="margin: 8px 0;">✅ You've had some important conversations</li>
          <li style="margin: 8px 0;">⚠️ There are still missing pieces</li>
        </ul>
      `,
      nextStep: "Use the FREE guide attached to identify and fill the remaining gaps."
    };
  } else {
    return {
      title: "You're a Conversation-Ready Champion! 🎉",
      subtitle: "You're ahead of 90% of families. Your loved ones will feel confident and prepared because of the work you've done.",
      message: `You scored ${score}/24 points - Outstanding!`,
      whatThisMeans: `
        <ul style="list-style: none; padding-left: 0;">
          <li style="margin: 8px 0;">✅ You've done the hard work of planning</li>
          <li style="margin: 8px 0;">✅ Your family knows your wishes</li>
          <li style="margin: 8px 0;">✅ You're protecting your family's future</li>
        </ul>
      `,
      nextStep: "Keep everything organized and updated with the comprehensive End-Of-Lyfe Playbook launching November 28th."
    };
  }
};

const handler = async (req: Request): Promise<Response> => {
  console.log('Quiz results email function called');
  
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, score, tier }: QuizResultsRequest = await req.json();
    console.log(`Processing quiz results for ${email}: Score ${score}, Tier ${tier}`);

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Store or update quiz submission
    const { error: upsertError } = await supabase
      .from('quiz_submissions')
      .upsert({
        email,
        score,
        tier,
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'email',
        ignoreDuplicates: false
      });

    if (upsertError) {
      console.error('Error storing quiz submission:', upsertError);
    } else {
      console.log('Quiz submission stored successfully');
    }

    // Add to waitlist if not already there
    const { error: waitlistError } = await supabase
      .from('waitlist')
      .insert({ email })
      .select();

    if (waitlistError && !waitlistError.message?.includes('duplicate')) {
      console.error('Error adding to waitlist:', waitlistError);
    } else {
      console.log('Added to waitlist or already exists');
    }

    // Generate secure download link for PDF
    const { data: urlData, error: urlError } = await supabase
      .storage
      .from('toolkit-downloads')
      .createSignedUrl('guides/conversation-starter.pdf', 86400); // 24 hours

    if (urlError) {
      console.error('Error generating download URL:', urlError);
    }

    const downloadUrl = urlData?.signedUrl || '#';

    // Get tier-specific content
    const content = getTierContent(tier, score);

    // Send email with results
    const emailResponse = await resend.emails.send({
      from: "Family Lyfe Fix <noreply@familylyfefix.com>",
      to: [email],
      subject: `${content.title} - Your Quiz Results`,
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
                padding: 40px 20px;
                text-align: center;
                border-radius: 12px 12px 0 0;
              }
              .content {
                background: #ffffff;
                padding: 40px 30px;
                border: 1px solid #e5e7eb;
                border-top: none;
                border-radius: 0 0 12px 12px;
              }
              .score-badge {
                display: inline-block;
                background: #fef3c7;
                color: #92400e;
                padding: 8px 16px;
                border-radius: 20px;
                font-weight: bold;
                font-size: 16px;
                margin: 20px 0;
              }
              .section {
                background: #f9fafb;
                padding: 20px;
                border-left: 4px solid #B8733D;
                margin: 20px 0;
                border-radius: 4px;
              }
              .button {
                display: inline-block;
                background: #B8733D;
                color: white !important;
                padding: 16px 32px;
                text-decoration: none;
                border-radius: 8px;
                font-weight: bold;
                margin: 20px 0;
                text-align: center;
              }
              .button:hover {
                background: #a0652f;
              }
              .secondary-button {
                display: inline-block;
                background: transparent;
                color: #B8733D !important;
                padding: 16px 32px;
                text-decoration: none;
                border: 2px solid #B8733D;
                border-radius: 8px;
                font-weight: bold;
                margin: 10px 0;
                text-align: center;
              }
              h1 { margin: 0; font-size: 28px; line-height: 1.3; }
              h2 { color: #1f2937; font-size: 20px; margin-top: 30px; }
              .footer {
                text-align: center;
                margin-top: 40px;
                padding-top: 20px;
                border-top: 1px solid #e5e7eb;
                color: #6b7280;
                font-size: 14px;
              }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>${content.title}</h1>
              <p style="font-size: 18px; margin: 10px 0 0 0; opacity: 0.9;">${content.subtitle}</p>
            </div>
            
            <div class="content">
              <div style="text-align: center;">
                <div class="score-badge">Your Score: ${score}/24 Points</div>
              </div>

              <p style="font-size: 16px; color: #4b5563;">${content.message}</p>

              <div class="section">
                <h2>What This Means:</h2>
                ${content.whatThisMeans}
              </div>

              <div class="section">
                <h2>Your Next Step:</h2>
                <p>${content.nextStep}</p>
              </div>

              <div style="text-align: center; margin: 40px 0;">
                <a href="${downloadUrl}" class="button">
                  📥 Download Your FREE Conversation Starter Guide
                </a>
                <br>
                <a href="https://familylyfefix.com" class="secondary-button">
                  ✉️ Get the Full End-Of-Lyfe Playbook (Launching Nov 28)
                </a>
              </div>

              <p style="color: #6b7280; font-size: 14px;">
                <strong>Note:</strong> Your download link is valid for 24 hours. 
                If you have any trouble accessing the guide, please reply to this email.
              </p>

              <div style="background: #fef3c7; padding: 20px; border-radius: 8px; margin-top: 30px;">
                <p style="margin: 0; color: #92400e;">
                  <strong>💡 Ready to take the next step?</strong><br>
                  Join our waitlist to be the first to know when the complete End-Of-Lyfe Playbook launches on November 28th!
                </p>
              </div>

              <p style="margin-top: 30px;">
                Thank you for taking the quiz and investing in your family's peace of mind.
              </p>

              <p>
                Warmly,<br>
                <strong>Family Lyfe Fix Team 💛</strong>
              </p>
            </div>

            <div class="footer">
              <p>You received this email because you completed the End-Of-Lyfe Readiness Quiz.</p>
              <p style="margin-top: 10px;">
                <a href="https://familylyfefix.com" style="color: #B8733D;">Visit familylyfefix.com</a>
              </p>
            </div>
          </body>
        </html>
      `,
    });

    console.log("Quiz results email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ 
      success: true,
      downloadUrl: downloadUrl 
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-quiz-results function:", error);
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
