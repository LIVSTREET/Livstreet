import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { SMTPClient } from "https://deno.land/x/denomailer@1.6.0/mod.ts";

/**
 * Email sending uses Domene.no SMTP exclusively for both customer
 * confirmation and internal admin notifications.
 */

// Domain SMTP (Domene.no)
const SMTP_HOST = (Deno.env.get("SMTP_HOST") ?? "").trim();
const SMTP_PORT = Number(Deno.env.get("SMTP_PORT") ?? "587");
const SMTP_USERNAME = (Deno.env.get("SMTP_USERNAME") ?? "").trim();
const SMTP_PASSWORD = (Deno.env.get("SMTP_PASSWORD") ?? "").trim();
const ADMIN_NOTIFICATION_EMAIL = (Deno.env.get("ADMIN_NOTIFICATION_EMAIL") ?? "").trim();
const SMTP_FROM = (Deno.env.get("SMTP_FROM") ?? `Livstreet <${SMTP_USERNAME}>`).trim();

// Supabase credentials for database operations
const SUPABASE_URL = (Deno.env.get("SUPABASE_URL") ?? "").trim();
const SUPABASE_SERVICE_ROLE_KEY =
  (Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "").replace(/\s+/g, "");

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
  designData?: any;
  designSummary?: string;
  designImageBase64?: string;
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
   * When true, sends customer confirmation to ADMIN_NOTIFICATION_EMAIL for verification.
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
  console.log(str);
}

// Upload design image to Storage and return the storage path
async function uploadDesignImage(
  imageBase64: string,
  inquiryId: string,
): Promise<string | null> {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    console.error("Supabase credentials missing for storage upload");
    return null;
  }

  try {
    let contentType = "image/png";
    let ext = "png";

    const dataUrlMatch = imageBase64.match(/^data:([^;]+);base64,/);
    if (dataUrlMatch?.[1]) {
      contentType = dataUrlMatch[1];
      if (contentType === "image/jpeg") ext = "jpg";
      else if (contentType === "image/webp") ext = "webp";
      else if (contentType === "image/png") ext = "png";
    }

    const base64Data = imageBase64.includes(",")
      ? imageBase64.split(",")[1]
      : imageBase64;

    const binaryString = atob(base64Data);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    const fileName = `${inquiryId}/preview.${ext}`;

    const response = await fetch(
      `${SUPABASE_URL}/storage/v1/object/design-previews/${fileName}`,
      {
        method: "POST",
        headers: {
          "Content-Type": contentType,
          apikey: SUPABASE_SERVICE_ROLE_KEY,
          Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
          "x-upsert": "true",
        },
        body: bytes,
      },
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Storage upload failed:", errorText);
      return null;
    }

    return fileName;
  } catch (error) {
    console.error("Error uploading design image:", error);
    return null;
  }
}

// Save inquiry to database
async function saveInquiryToDatabase(
  inquiryId: string,
  data: InquiryRequest,
  designImagePath: string | null,
): Promise<boolean> {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    console.error("Supabase credentials missing for database insert");
    return false;
  }

  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/inquiries`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": SUPABASE_SERVICE_ROLE_KEY,
        "Authorization": `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
        "Prefer": "return=representation",
      },
      body: JSON.stringify({
        id: inquiryId,
        name: data.name,
        phone: data.phone,
        email: data.email,
        address: data.address || null,
        description: data.description,
        has_design: data.hasDesign || false,
        design_data: data.designData || null,
        design_image_url: designImagePath,
        base_price: data.basePrice || null,
        maintenance_selected: data.maintenanceSelected || false,
        maintenance_price: data.maintenancePrice || null,
        installation_selected: data.installationSelected || false,
        installation_price: data.installationPrice || null,
        total_price: data.totalPrice || null,
        source: data.source,
        status: "new",
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Database insert failed:", errorText);
      return false;
    }

    console.log(`Inquiry saved to database with ID: ${inquiryId}`);
    return true;
  } catch (error) {
    console.error("Error saving inquiry to database:", error);
    return false;
  }
}

async function sendViaDomainSMTP(
  payload: EmailPayload,
): Promise<{ success: boolean; provider: "domain_smtp"; error?: string }> {
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USERNAME || !SMTP_PASSWORD) {
    return {
      success: false,
      provider: "domain_smtp",
      error: "SMTP settings are missing",
    };
  }

  // Port 465 uses implicit TLS; 587 uses STARTTLS
  const useImplicitTls = SMTP_PORT === 465;

  const client = new SMTPClient({
    connection: {
      hostname: SMTP_HOST,
      port: SMTP_PORT,
      tls: useImplicitTls,
      auth: {
        username: SMTP_USERNAME,
        password: SMTP_PASSWORD,
      },
    },
  });

  try {
    await client.send({
      from: SMTP_FROM,
      to: payload.to,
      subject: payload.subject,
      content: "auto",
      html: payload.html,
      replyTo: payload.replyTo || SMTP_USERNAME,
    });

    return { success: true, provider: "domain_smtp" };
  } catch (error: any) {
    console.error("Domain SMTP exception:", error);
    return { success: false, provider: "domain_smtp", error: error.message };
  } finally {
    try {
      await client.close();
    } catch {
      // ignore
    }
  }
}

async function sendEmail(
  payload: EmailPayload,
): Promise<{ success: boolean; provider: string; error?: string }> {
  return await sendViaDomainSMTP(payload);
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
        <p style="font-size: 15px; color: #444; margin-left: 20px; margin-bottom: 16px;">Etter godkjenning settes gravplaten i produksjon. Faktura sendes per e-post etter levering/montering.</p>
      </div>

      <div style="margin-bottom: 24px;">
        <p style="font-size: 16px; margin-bottom: 6px;"><strong style="color: #5c4a3a;">5. Produksjon og levering</strong></p>
        <p style="font-size: 15px; color: #444; margin-left: 20px; margin-bottom: 16px;">Normal leveringstid er 2–4 uker. Dersom du har behov for raskere levering, er du velkommen til å ta kontakt – så ser vi på mulighetene sammen.</p>
      </div>

      ${hasDesign ? '<p style="font-size: 15px; font-style: italic; color: #666; margin-top: 20px; padding: 12px; background-color: #f9f7f5; border-radius: 6px;">Vi har mottatt designet du har laget, og vil gjennomgå dette grundig.</p>' : ""}

      <p style="font-size: 16px; margin-top: 28px; margin-bottom: 28px;">Har du spørsmål underveis, eller er det noe du er usikker på, er du varmt velkommen til å svare på denne e-posten eller ta kontakt med oss direkte. Vi er her for å hjelpe.</p>

      <div style="margin-top: 32px; padding-top: 20px; border-top: 1px solid #e0d6cc;">
        <p style="font-size: 16px; margin-bottom: 4px;">Med vennlig hilsen</p>
        <p style="font-size: 17px; font-weight: bold; color: #5c4a3a; margin-bottom: 16px;">Peder August Halvorsen – Livstreet</p>
        <p style="font-size: 14px; color: #666; line-height: 1.6;">
          <a href="tel:45251280" style="color: #5c4a3a; text-decoration: none;">452 51 280</a><br>
          <a href="mailto:post@livstreet.no" style="color: #5c4a3a; text-decoration: none;">post@livstreet.no</a><br>
          <a href="https://livstreet.no" style="color: #5c4a3a; text-decoration: none;">livstreet.no</a>
        </p>
      </div>

      <p style="font-size: 14px; color: #888; margin-top: 24px; font-style: italic; text-align: center;">
        Du kan trygt svare direkte på denne e-posten – svaret går rett til oss.
      </p>

    </div>
  `;
}

function buildAdminNotificationHtml(inquiryId: string, data: InquiryRequest): string {
  const sourceLabel = data.source === "contact" ? "Kontaktskjema" : "Bestillingsskjema/Konfigurator";
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #2c2c2c; line-height: 1.6; padding: 20px;">
      <h2 style="color: #5c4a3a; margin-bottom: 16px;">Ny forespørsel fra Livstreet</h2>

      <p style="margin: 4px 0;"><strong>Navn:</strong> ${data.name}</p>
      <p style="margin: 4px 0;"><strong>Telefon:</strong> <a href="tel:${data.phone}">${data.phone}</a></p>
      <p style="margin: 4px 0;"><strong>E-post:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
      ${data.address ? `<p style="margin: 4px 0;"><strong>Adresse:</strong> ${data.address}</p>` : ""}
      <p style="margin: 4px 0;"><strong>Kilde:</strong> ${sourceLabel}</p>
      ${data.totalPrice ? `<p style="margin: 4px 0;"><strong>Totalpris:</strong> ${data.totalPrice.toLocaleString("nb-NO")} kr</p>` : ""}
      <p style="margin: 4px 0;"><strong>Design vedlagt:</strong> ${data.hasDesign ? "Ja" : "Nei"}</p>
      <p style="margin: 4px 0; font-size: 12px; color: #888;"><strong>ID:</strong> ${inquiryId}</p>

      <h3 style="color: #5c4a3a; margin-top: 20px; margin-bottom: 8px;">Melding</h3>
      <p style="white-space: pre-wrap; background-color: #f9f7f5; padding: 12px; border-radius: 6px;">${data.description}</p>

      <p style="margin-top: 24px;">
        <a href="https://livstreet.no/admin" style="background-color: #5c4a3a; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 6px; display: inline-block;">Åpne admin</a>
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
    safeEmailLog(
      `Received inquiry (source=${data.source}, hasDesign=${!!data.hasDesign}, testMode=${!!data.testMode})`,
    );

    const { name, email, hasDesign, testMode, designImageBase64 } = data;

    let designImagePath: string | null = null;
    const inquiryId = crypto.randomUUID();

    if (designImageBase64) {
      designImagePath = await uploadDesignImage(designImageBase64, inquiryId);
      safeEmailLog(`Design image upload: ${designImagePath ? "success" : "failed"}`);
    }

    const saved = await saveInquiryToDatabase(inquiryId, data, designImagePath);

    if (saved) {
      safeEmailLog(`Inquiry saved to database: ${inquiryId}`);
    } else {
      console.error("Failed to save inquiry to database - continuing with email only");
    }

    // Internal admin notification
    if (saved && ADMIN_NOTIFICATION_EMAIL) {
      const adminPayload: EmailPayload = {
        to: [ADMIN_NOTIFICATION_EMAIL],
        subject: `Ny forespørsel fra ${data.name}`,
        html: buildAdminNotificationHtml(inquiryId, data),
        replyTo: data.email || SMTP_USERNAME,
      };

      const adminJob = (async () => {
        const result = await sendViaDomainSMTP(adminPayload);
        safeEmailLog(
          `Admin notification: ${result.success ? "sent" : "failed"} (provider=${result.provider})${result.error ? ` error=${result.error}` : ""}`,
        );
      })();

      // @ts-ignore
      EdgeRuntime.waitUntil(adminJob);
    }

    // Customer confirmation
    const customerRecipient = testMode ? [ADMIN_NOTIFICATION_EMAIL || SMTP_USERNAME] : [email];

    const confirmationPayload: EmailPayload = {
      to: customerRecipient,
      subject: "Takk for at du tok kontakt – vi følger deg videre",
      html: buildConfirmationEmailHtml(name, hasDesign || false),
      // Send kundesvar direkte til admin-innboksen (Gmail) i stedet for SMTP-kontoen
      replyTo: ADMIN_NOTIFICATION_EMAIL || SMTP_USERNAME,
    };

    const sendJob = (async () => {
      const confirmation = await sendEmail(confirmationPayload);
      safeEmailLog(
        `Confirmation email: ${confirmation.success ? "sent" : "failed"} (provider=${confirmation.provider})${confirmation.error ? ` error=${confirmation.error}` : ""}`,
      );
    })();

    // @ts-ignore
    EdgeRuntime.waitUntil(sendJob);

    return new Response(JSON.stringify({ success: true, inquiryId }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-inquiry function:", error);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
};

serve(handler);
