import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { SMTPClient } from "https://deno.land/x/denomailer@1.6.0/mod.ts";

/**
 * TEMP MODE (per request): Gmail-only sending.
 * We are intentionally NOT sending via Resend until you say otherwise.
 */
const FORCE_GMAIL_ONLY = true;

// Resend (kept for later re-enable)
const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

// Gmail SMTP
const GMAIL_APP_PASSWORD = Deno.env.get("GMAIL_APP_PASSWORD");
const GMAIL_USER = "livstreet.store@gmail.com";

const RECIPIENT_EMAIL = "livstreet.store@gmail.com";
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

  /**
   * When true, sends BOTH internal + confirmation to RECIPIENT_EMAIL for verification.
   */
  testMode?: boolean;
}

interface EmailPayload {
  to: string[];
  subject: string;
  html: string;
  replyTo?: string;
}

function safeEmailLog(str: string) {
  // Avoid leaking full HTML to logs
  console.log(str);
}

async function sendViaGmailSMTP(
  payload: EmailPayload,
): Promise<{ success: boolean; provider: "gmail_smtp"; error?: string }> {
  if (!GMAIL_APP_PASSWORD) {
    return {
      success: false,
      provider: "gmail_smtp",
      error: "GMAIL_APP_PASSWORD is missing",
    };
  }

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

  try {
    await client.send({
      from: `Livstreet <${GMAIL_USER}>`,
      to: payload.to,
      subject: payload.subject,
      content: "auto",
      html: payload.html,
      replyTo: payload.replyTo || REPLY_TO_EMAIL,
    });

    return { success: true, provider: "gmail_smtp" };
  } catch (error: any) {
    console.error("Gmail SMTP exception:", error);
    return { success: false, provider: "gmail_smtp", error: error.message };
  } finally {
    try {
      await client.close();
    } catch {
      // ignore
    }
  }
}

// Resend sender kept for later re-enable
async function sendViaResend(
  payload: EmailPayload,
): Promise<{ success: boolean; provider: "resend"; error?: string }> {
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Livstreet <no-reply@send.livstreet.org>",
        to: payload.to,
        subject: payload.subject,
        html: payload.html,
        reply_to: payload.replyTo || REPLY_TO_EMAIL,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      const errorMessage = result?.message || result?.error || "Unknown Resend error";
      console.error("Resend API error:", result);
      return { success: false, provider: "resend", error: errorMessage };
    }

    return { success: true, provider: "resend" };
  } catch (error: any) {
    console.error("Resend exception:", error);
    return { success: false, provider: "resend", error: error.message };
  }
}

async function sendEmail(
  payload: EmailPayload,
): Promise<{ success: boolean; provider: string; error?: string }> {
  if (FORCE_GMAIL_ONLY) {
    return await sendViaGmailSMTP(payload);
  }

  // fallback behavior if we later re-enable Resend
  const resend = await sendViaResend(payload);
  if (resend.success) return resend;

  safeEmailLog(`Resend failed (${resend.error}), attempting Gmail fallback...`);
  return await sendViaGmailSMTP(payload);
}

function buildInternalEmailHtml(data: InquiryRequest): string {
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

  return emailHtml;
}

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
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data: InquiryRequest = await req.json();
    safeEmailLog(
      `Received inquiry (source=${data.source}, hasDesign=${!!data.hasDesign}, testMode=${!!data.testMode})`,
    );

    const { name, email, hasDesign, source, testMode } = data;

    const internalRecipient = [RECIPIENT_EMAIL];
    const customerRecipient = testMode ? [RECIPIENT_EMAIL] : [email];

    const internalPayload: EmailPayload = {
      to: internalRecipient,
      subject: `Ny forespørsel fra ${name} - ${
        source === "contact" ? "Kontaktskjema" : "Bestilling"
      }`,
      html: buildInternalEmailHtml(data),
      replyTo: REPLY_TO_EMAIL,
    };

    const confirmationPayload: EmailPayload = {
      to: customerRecipient,
      subject: "Takk for at du tok kontakt – vi følger deg videre",
      html: buildConfirmationEmailHtml(name, hasDesign || false),
      replyTo: REPLY_TO_EMAIL,
    };

    // Non-blocking: send in background
    const sendJob = (async () => {
      const internal = await sendEmail(internalPayload);
      safeEmailLog(
        `Internal email: ${internal.success ? "sent" : "failed"} (provider=${internal.provider})${internal.error ? ` error=${internal.error}` : ""}`,
      );

      const confirmation = await sendEmail(confirmationPayload);
      safeEmailLog(
        `Confirmation email: ${confirmation.success ? "sent" : "failed"} (provider=${confirmation.provider})${confirmation.error ? ` error=${confirmation.error}` : ""}`,
      );
    })();

    // EdgeRuntime.waitUntil exists in the runtime; this keeps sending after response.
    // @ts-ignore
    EdgeRuntime.waitUntil(sendJob);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-inquiry function:", error);

    // Never break form submission; never expose internal errors.
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
};

serve(handler);
