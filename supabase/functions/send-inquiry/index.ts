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

    // Send confirmation email to customer with "Hva skjer videre?" content
    const confirmationHtml = `
      <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; color: #333;">
        <p>Kjære ${name},</p>
        
        <p>Takk for at du har tatt kontakt med oss i Livstreet.</p>
        
        <p>Vi vet at valget av gravminne ofte skjer i en tid der mye annet også skal tas stilling til. Derfor ønsker vi å gjøre prosessen så rolig, oversiktlig og trygg som mulig. Du trenger ikke å ha alle svarene med én gang – vi tar dette steg for steg, sammen med deg.</p>
        
        <h2 style="color: #5c4a3a; margin-top: 30px;">Hva skjer videre?</h2>
        
        <ol style="line-height: 1.8;">
          <li><strong>Vi starter med dine ønsker</strong><br>
          Vi går gjennom opplysningene og ønskene du har sendt inn. Har du ikke alt klart ennå, er det helt i orden – dette kan avklares underveis.</li>
          
          <li><strong>Designutkast til godkjenning</strong><br>
          Basert på dialogen lager vi et designutkast av gravplaten. Dette sendes til deg på e-post, slik at du i ro og fred kan se hvordan det ferdige gravminnet vil fremstå.</li>
          
          <li><strong>Justering og endelig bekreftelse</strong><br>
          Ønsker du endringer, tilpasser vi designet til det føles riktig. Først når du er fornøyd og har gitt en skriftlig bekreftelse, går vi videre.</li>
          
          <li><strong>Faktura og oppstart av produksjon</strong><br>
          Etter godkjenning sender vi faktura. Når betalingen er mottatt, settes gravplaten i produksjon.</li>
          
          <li><strong>Produksjon og levering</strong><br>
          Normal leveringstid er 2–3 uker. Dersom du har behov for raskere levering, er du velkommen til å ta kontakt – så ser vi på mulighetene sammen.</li>
        </ol>
        
        ${hasDesign ? "<p><em>Vi har mottatt designet du har laget, og vil gjennomgå dette grundig.</em></p>" : ""}
        
        <p style="margin-top: 30px;">Har du spørsmål underveis, eller er det noe du er usikker på, er du alltid velkommen til å svare på denne e-posten eller ta kontakt med oss direkte. Vi er her for å hjelpe.</p>
        
        <p style="margin-top: 30px;">Med vennlig hilsen</p>
        <p><strong>Peder August Halvorsen</strong><br>Livstreet</p>
        <p style="color: #666; font-size: 14px;">
          Telefon: 452 51 280<br>
          E-post: livstreet.store@gmail.com<br>
          Nettside: livstreet.org
        </p>
      </div>
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
