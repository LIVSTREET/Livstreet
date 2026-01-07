import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { SMTPClient } from "https://deno.land/x/denomailer@1.6.0/mod.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const GMAIL_APP_PASSWORD = Deno.env.get("GMAIL_APP_PASSWORD");
const GMAIL_USER = "livstreet.store@gmail.com";
const RECIPIENT_EMAIL = "livstreet.store@gmail.com";
const FROM_EMAIL = "Livstreet <no-reply@send.livstreet.org>";
const REPLY_TO_EMAIL = "livstreet.store@gmail.com";

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
  hasDesign?: boolean;
  designSummary?: string;
  basePrice?: number;
  maintenanceSelected?: boolean;
  maintenancePrice?: number;
  installationSelected?: boolean;
  installationPrice?: number;
  totalPrice?: number;
  source: "contact" | "inquiry";
  testMode?: boolean;
}

interface EmailPayload {
  to: string[];
  subject: string;
  html: string;
  replyTo?: string;
}

// Send email via Resend
async function sendViaResend(payload: EmailPayload): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: payload.to,
        subject: payload.subject,
        html: payload.html,
        reply_to: payload.replyTo || REPLY_TO_EMAIL,
      }),
    });

    const result = await response.json();
    
    if (!response.ok) {
      const errorMessage = result.message || result.error || "Unknown Resend error";
      console.error("Resend API error:", result);
      return { success: false, error: errorMessage };
    }

    console.log("Email sent via Resend:", result);
    return { success: true };
  } catch (error: any) {
    console.error("Resend exception:", error);
    return { success: false, error: error.message };
  }
}

// Send email via Gmail SMTP as fallback
async function sendViaGmailSMTP(payload: EmailPayload): Promise<{ success: boolean; error?: string }> {
  if (!GMAIL_APP_PASSWORD) {
    return { success: false, error: "Gmail SMTP credentials not configured" };
  }

  try {
    const client = new SMTPClient({
      connection: {
        hostname: "smtp.gmail.com",
        port: 465,
        tls: true,
        auth: {
          username: GMAIL_USER,
          password: GMAIL_APP_PASSWORD,
        },
      },
    });

    await client.send({
      from: GMAIL_USER,
      to: payload.to,
      subject: payload.subject,
      content: "auto",
      html: payload.html,
      replyTo: payload.replyTo || REPLY_TO_EMAIL,
    });

    await client.close();
    console.log("Email sent via Gmail SMTP fallback");
    return { success: true };
  } catch (error: any) {
    console.error("Gmail SMTP exception:", error);
    return { success: false, error: error.message };
  }
}

// Main email sending function with fallback
async function sendEmailWithFallback(payload: EmailPayload): Promise<{ success: boolean; provider: string; error?: string }> {
  // Try Resend first
  const resendResult = await sendViaResend(payload);
  if (resendResult.success) {
    return { success: true, provider: "resend" };
  }

  console.log(`Resend failed (${resendResult.error}), attempting Gmail SMTP fallback...`);

  // Fallback to Gmail SMTP
  const gmailResult = await sendViaGmailSMTP(payload);
  if (gmailResult.success) {
    return { success: true, provider: "gmail_smtp" };
  }

  return { success: false, provider: "none", error: `Resend: ${resendResult.error}; Gmail: ${gmailResult.error}` };
}

// Build internal notification email HTML
function buildInternalEmailHtml(data: InquiryRequest): string {
  const {
    name, phone, email, address, description,
    hasDesign, designSummary, basePrice,
    maintenanceSelected, maintenancePrice,
    installationSelected, installationPrice,
    totalPrice, source
  } = data;

  let html = `
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
    html += `
      <h2>Design</h2>
      <p>${designSummary || "Eget design vedlagt"}</p>
    `;
  }

  if (basePrice) {
    html += `
      <h2>Prisdetaljer</h2>
      <p><strong>Gravplate:</strong> ${basePrice.toLocaleString("nb-NO")} NOK</p>
      ${maintenanceSelected ? `<p><strong>Vedlikehold (årlig):</strong> ${maintenancePrice?.toLocaleString("nb-NO")} NOK</p>` : ""}
      ${installationSelected ? `<p><strong>Montering:</strong> ${installationPrice?.toLocaleString("nb-NO")} NOK (inkludert)</p>` : ""}
      <p><strong>Total:</strong> ${totalPrice?.toLocaleString("nb-NO")} NOK</p>
    `;
  }

  html += `
    <hr>
    <p style="color: #666; font-size: 12px;">
      Sendt fra Livstreet nettside - ${new Date().toLocaleString("nb-NO")}
    </p>
  `;

  return html;
}

// Build customer confirmation email HTML
function buildConfirmationEmailHtml(name: string, hasDesign: boolean): string {
  return `
    <div style="font-family: Georgia, 'Times New Roman', serif; max-width: 600px; margin: 0 auto; color: #2c2c2c; line-height: 1.7; padding: 20px;">
      
      <p style="font-size: 17px; margin-bottom: 20px;">Kjære deg,</p>
      
      <p style="font-size: 16px; margin-bottom: 16px;">Takk for at du har tatt kontakt med oss i Livstreet.</p>
      
      <p style="font-size: 16px; margin-bottom: 24px;">Vi vet at valget av gravminne ofte skjer i en tid der mye annet også skal tas stilling til. Derfor ønsker vi å gjøre prosessen så rolig, oversiktlig og trygg som mulig. Du trenger ikke å ha alle svarene med én gang – vi tar dette steg for steg, sammen med deg.</p>
      
      <h2 style="color: #5c4a3a; font-size: 20px; margin-top: 32px; margin-bottom: 20px; border-bottom: 1px solid #e0d6cc; padding-bottom: 8px;">Hva skjer videre?</h2>
      
      <div style="margin-bottom: 24px;">
        <p style="font-size: 16px; margin-bottom: 6px;"><strong style="color: #5c4a3a;">1. Vi starter med dine ønsker</strong></p>
        <p style="font-size: 15px; color: #444; margin-left: 20px; margin-bottom: 16px;">Vi går gjennom opplysningene og ønskene du har sendt inn. Har du ikke alt klart ennå, er det helt i orden – dette kan avklares underveis.</p>
      </div>
      
      <div style="margin-bottom: 24px;">
        <p style="font-size: 16px; margin-bottom: 6px;"><strong style="color: #5c4a3a;">2. Designutkast til godkjenning</strong></p>
        <p style="font-size: 15px; color: #444; margin-left: 20px; margin-bottom: 16px;">Basert på dialogen lager vi et designutkast av gravplaten. Dette sendes til deg på e-post, slik at du i ro og fred kan se hvordan det ferdige gravminnet vil fremstå.</p>
      </div>
      
      <div style="margin-bottom: 24px;">
        <p style="font-size: 16px; margin-bottom: 6px;"><strong style="color: #5c4a3a;">3. Justering og endelig bekreftelse</strong></p>
        <p style="font-size: 15px; color: #444; margin-left: 20px; margin-bottom: 16px;">Ønsker du endringer, tilpasser vi designet til det føles riktig. Først når du er fornøyd og har gitt en skriftlig bekreftelse, går vi videre.</p>
      </div>
      
      <div style="margin-bottom: 24px;">
        <p style="font-size: 16px; margin-bottom: 6px;"><strong style="color: #5c4a3a;">4. Faktura og oppstart av produksjon</strong></p>
        <p style="font-size: 15px; color: #444; margin-left: 20px; margin-bottom: 16px;">Etter godkjenning sender vi faktura. Når betalingen er mottatt, settes gravplaten i produksjon.</p>
      </div>
      
      <div style="margin-bottom: 24px;">
        <p style="font-size: 16px; margin-bottom: 6px;"><strong style="color: #5c4a3a;">5. Produksjon og levering</strong></p>
        <p style="font-size: 15px; color: #444; margin-left: 20px; margin-bottom: 16px;">Normal leveringstid er 2–3 uker. Dersom du har behov for raskere levering, er du velkommen til å ta kontakt – så ser vi på mulighetene sammen.</p>
      </div>
      
      ${hasDesign ? '<p style="font-size: 15px; font-style: italic; color: #666; margin-top: 20px; padding: 12px; background-color: #f9f7f5; border-radius: 6px;">Vi har mottatt designet du har laget, og vil gjennomgå dette grundig.</p>' : ""}
      
      <p style="font-size: 16px; margin-top: 28px; margin-bottom: 28px;">Har du spørsmål underveis, eller er det noe du er usikker på, er du alltid velkommen til å svare på denne e-posten eller ta kontakt med oss direkte. Vi er her for å hjelpe.</p>
      
      <div style="margin-top: 32px; padding-top: 20px; border-top: 1px solid #e0d6cc;">
        <p style="font-size: 16px; margin-bottom: 4px;">Med vennlig hilsen</p>
        <p style="font-size: 17px; font-weight: bold; color: #5c4a3a; margin-bottom: 16px;">Peder August Halvorsen – Livstreet</p>
        <p style="font-size: 14px; color: #666; line-height: 1.6;">
          <a href="tel:45251280" style="color: #5c4a3a; text-decoration: none;">452 51 280</a><br>
          <a href="mailto:livstreet.store@gmail.com" style="color: #5c4a3a; text-decoration: none;">livstreet.store@gmail.com</a><br>
          <a href="https://livstreet.org" style="color: #5c4a3a; text-decoration: none;">livstreet.org</a>
        </p>
      </div>
      
      <p style="font-size: 14px; color: #888; margin-top: 24px; font-style: italic; text-align: center;">
        Du kan trygt svare direkte på denne e-posten – svaret går rett til oss.
      </p>
      
    </div>
  `;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data: InquiryRequest = await req.json();
    console.log("Received inquiry:", { ...data, description: data.description.substring(0, 50) + "..." });

    const { name, email, hasDesign, source, testMode } = data;
    
    // Determine recipients (test mode sends all to livstreet.store@gmail.com)
    const internalRecipient = testMode ? [RECIPIENT_EMAIL] : [RECIPIENT_EMAIL];
    const customerRecipient = testMode ? [RECIPIENT_EMAIL] : [email];

    // Track email sending results
    const emailResults: { type: string; success: boolean; provider: string; error?: string }[] = [];

    // Send internal notification email (non-blocking)
    const internalEmailPromise = sendEmailWithFallback({
      to: internalRecipient,
      subject: `Ny forespørsel fra ${name} - ${source === "contact" ? "Kontaktskjema" : "Bestilling"}`,
      html: buildInternalEmailHtml(data),
    }).then(result => {
      emailResults.push({ type: "internal", ...result });
      console.log(`Internal email: ${result.success ? `sent via ${result.provider}` : `failed - ${result.error}`}`);
    });

    // Send customer confirmation email (non-blocking)
    const confirmationEmailPromise = sendEmailWithFallback({
      to: customerRecipient,
      subject: "Takk for at du tok kontakt – vi følger deg videre",
      html: buildConfirmationEmailHtml(name, hasDesign || false),
      replyTo: REPLY_TO_EMAIL,
    }).then(result => {
      emailResults.push({ type: "confirmation", ...result });
      console.log(`Confirmation email: ${result.success ? `sent via ${result.provider}` : `failed - ${result.error}`}`);
    });

    // Wait for both emails to complete (but don't block the response if they fail)
    await Promise.allSettled([internalEmailPromise, confirmationEmailPromise]);

    // Log final results
    console.log("Email sending complete:", emailResults);

    // Return success even if emails partially failed (to not break form submission)
    const allSucceeded = emailResults.every(r => r.success);
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        emailStatus: allSucceeded ? "all_sent" : "partial_failure",
        details: emailResults
      }), 
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in send-inquiry function:", error);
    // Return success to user even on error (don't expose internal failures)
    return new Response(
      JSON.stringify({ success: true, emailStatus: "processing" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
