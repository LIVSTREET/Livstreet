import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface InquiryRequest {
  name: string;
  phone: string;
  email: string;
  address?: string;
  description: string;
  // Design data
  hasDesign?: boolean;
  designSummary?: string;
  // Pricing
  basePrice?: number;
  maintenanceSelected?: boolean;
  maintenancePrice?: number;
  installationSelected?: boolean;
  installationPrice?: number;
  totalPrice?: number;
  // Source
  source: "contact" | "inquiry";
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data: InquiryRequest = await req.json();
    console.log("Received inquiry:", data);

    const {
      name,
      phone,
      email,
      address,
      description,
      hasDesign,
      designSummary,
      basePrice,
      maintenanceSelected,
      maintenancePrice,
      installationSelected,
      installationPrice,
      totalPrice,
      source,
    } = data;

    // Build email content
    let emailHtml = `
      <h1>Ny forespørsel fra ${source === "contact" ? "Kontaktskjema" : "Bestillingsskjema"}</h1>
      
      <h2>Kundeinformasjon</h2>
      <p><strong>Navn:</strong> ${name}</p>
      <p><strong>Telefon:</strong> ${phone}</p>
      <p><strong>E-post:</strong> ${email}</p>
      ${address ? `<p><strong>Adresse:</strong> ${address}</p>` : ""}
      
      <h2>Melding</h2>
      <p>${description.replace(/\n/g, "<br>")}</p>
    `;

    if (hasDesign) {
      emailHtml += `
        <h2>Design</h2>
        <p>${designSummary || "Eget design vedlagt"}</p>
      `;
    }

    if (basePrice) {
      emailHtml += `
        <h2>Prisdetaljer</h2>
        <p><strong>Gravplate:</strong> ${basePrice.toLocaleString("nb-NO")} NOK</p>
        ${maintenanceSelected ? `<p><strong>Vedlikehold (årlig):</strong> ${maintenancePrice?.toLocaleString("nb-NO")} NOK</p>` : ""}
        ${installationSelected ? `<p><strong>Montering:</strong> ${installationPrice?.toLocaleString("nb-NO")} NOK (inkludert)</p>` : ""}
        <p><strong>Total:</strong> ${totalPrice?.toLocaleString("nb-NO")} NOK</p>
      `;
    }

    emailHtml += `
      <hr>
      <p style="color: #666; font-size: 12px;">
        Sendt fra Livstreet nettside - ${new Date().toLocaleString("nb-NO")}
      </p>
    `;

    // Send email to Livstreet using Resend API
    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Livstreet <onboarding@resend.dev>",
        to: ["livstreet.store@gmail.com"],
        subject: `Ny forespørsel fra ${name} - ${source === "contact" ? "Kontaktskjema" : "Bestilling"}`,
        html: emailHtml,
        reply_to: email,
      }),
    });

    const emailResult = await emailResponse.json();
    console.log("Email sent to Livstreet:", emailResult);

    // Send confirmation email to customer
    const confirmationHtml = `
      <h1>Takk for din henvendelse, ${name}!</h1>
      <p>Vi har mottatt din forespørsel og vil ta kontakt med deg så snart som mulig.</p>
      ${hasDesign ? "<p>Vi har mottatt ditt design og vil gjennomgå det grundig.</p>" : ""}
      <p>Med vennlig hilsen,<br>Livstreet</p>
    `;

    const confirmationResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Livstreet <onboarding@resend.dev>",
        to: [email],
        subject: "Vi har mottatt din forespørsel - Livstreet",
        html: confirmationHtml,
      }),
    });

    const confirmationResult = await confirmationResponse.json();
    console.log("Confirmation email sent:", confirmationResult);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-inquiry function:", error);
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
