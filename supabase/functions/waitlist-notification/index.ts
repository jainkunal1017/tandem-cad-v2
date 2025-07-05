
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

// Get the Resend API key from environment variables
const resendApiKey = Deno.env.get("RESEND_API_KEY");
if (!resendApiKey) {
  console.error("RESEND_API_KEY environment variable is not set");
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

interface WaitlistEntryRequest {
  first_name: string | null;
  last_name: string | null;
  email: string;
  phone: string | null;
  job_title: string | null;
  company: string | null;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Starting waitlist notification handler");
    
    // Verify Resend API key is present
    if (!resendApiKey) {
      console.error("RESEND_API_KEY is missing - please add it in the Supabase dashboard");
      throw new Error("RESEND_API_KEY environment variable is not set");
    } else {
      console.log("RESEND_API_KEY is configured");
    }
    
    // Initialize Resend with API key
    const resend = new Resend(resendApiKey);
    
    // Parse the request body
    const { first_name, last_name, email, phone, job_title, company }: WaitlistEntryRequest = await req.json();
    
    const fullName = first_name && last_name ? `${first_name} ${last_name}` : 
                    first_name ? first_name : 
                    last_name ? last_name : 'Not provided';
    
    console.log(`Received waitlist entry for: ${fullName} (${email}), phone: ${phone || 'Not provided'}`);

    // Send email notifications to the specified recipients
    const notificationEmails = ["kunaljain1017@gmail.com", "arjunjain1017@gmail.com"];
    
    console.log(`Attempting to send notifications to ${notificationEmails.join(', ')}`);
    
    const emailPromises = notificationEmails.map(recipient => 
      resend.emails.send({
        from: "Tandem Vault <onboarding@resend.dev>",
        to: recipient,
        subject: "New Waitlist Signup for Tandem Vault",
        html: `
          <h1>New Waitlist Signup</h1>
          <p>A new user has joined the Tandem Vault waitlist:</p>
          <ul>
            <li><strong>First Name:</strong> ${first_name || 'Not provided'}</li>
            <li><strong>Last Name:</strong> ${last_name || 'Not provided'}</li>
            <li><strong>Email:</strong> ${email}</li>
            ${phone ? `<li><strong>Phone:</strong> ${phone}</li>` : ''}
            ${job_title ? `<li><strong>Job Title:</strong> ${job_title}</li>` : ''}
            ${company ? `<li><strong>Company:</strong> ${company}</li>` : ''}
          </ul>
        `,
      }).catch(error => {
        console.error(`Error sending email to ${recipient}:`, error);
        return { error };
      })
    );
    
    const results = await Promise.all(emailPromises);
    
    console.log("Email notification results:", JSON.stringify(results));

    return new Response(JSON.stringify({ success: true, results }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in waitlist-notification function:", error);
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
