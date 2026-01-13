import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { SMTPClient } from "https://deno.land/x/denomailer@1.6.0/mod.ts";

/**
 * Email sending mode:
 * - Prefer Resend (recommended for transactional email)
 * - Fallback to Gmail SMTP if Resend fails
 */
const FORCE_GMAIL_ONLY = false;

// Resend
const RESEND_API_KEY = (Deno.env.get("RESEND_API_KEY") ?? "").trim();
const RESEND_FROM = (Deno.env.get("RESEND_FROM") ?? "Livstreet <onboarding@resend.dev>").trim();

// Gmail SMTP
// App passwords are often shown with spaces. We normalize to avoid auth failures.
const GMAIL_APP_PASSWORD = (Deno.env.get("GMAIL_APP_PASSWORD") ?? "").replace(/\s+/g, "");
const GMAIL_USER = "livstreet.store@gmail.com";

const RECIPIENT_EMAIL = "livstreet.store@gmail.com";
const REPLY_TO_EMAIL = "livstreet.store@gmail.com";

// Supabase credentials for database operations
const SUPABASE_URL = (Deno.env.get("SUPABASE_URL") ?? "").trim();
// Keys can sometimes contain newlines/spaces when pasted into secrets
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
    // Detect mime from data URL (defaults to png)
    let contentType = "image/png";
    let ext = "png";

    const dataUrlMatch = imageBase64.match(/^data:([^;]+);base64,/);
    if (dataUrlMatch?.[1]) {
      contentType = dataUrlMatch[1];
      if (contentType === "image/jpeg") ext = "jpg";
      else if (contentType === "image/webp") ext = "webp";
      else if (contentType === "image/png") ext = "png";
    }

    // Extract base64 data (remove data:*;base64, prefix if present)
    const base64Data = imageBase64.includes(",")
      ? imageBase64.split(",")[1]
      : imageBase64;

    // Decode base64 to binary
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

    // Return the storage path (UI generates signed URLs when viewing)
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
  designImagePath: string | null
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
        "Prefer": "return=representation"
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
        status: "new"
      })
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

// Resend sender
async function sendViaResend(
  payload: EmailPayload,
): Promise<{ success: boolean; provider: "resend"; error?: string }> {
  if (!RESEND_API_KEY) {
    return { success: false, provider: "resend", error: "RESEND_API_KEY is missing" };
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: RESEND_FROM,
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

  const resend = await sendViaResend(payload);
  if (resend.success) return resend;

  const gmail = await sendViaGmailSMTP(payload);
  if (gmail.success) return gmail;

  return {
    success: false,
    provider: "none",
    error: `resend: ${resend.error || "unknown"}; gmail: ${gmail.error || "unknown"}`,
  };
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

    const { name, email, hasDesign, source, testMode, designImageBase64 } = data;

    // Step 1: Generate inquiry ID and save to database
    let designImagePath: string | null = null;
    const inquiryId = crypto.randomUUID();

    // Step 2: Upload design image to storage if present
    if (designImageBase64) {
      designImagePath = await uploadDesignImage(designImageBase64, inquiryId);
      safeEmailLog(`Design image upload: ${designImagePath ? "success" : "failed"}`);
    }

    // Step 3: Save inquiry to database (this is the primary data store now)
    const saved = await saveInquiryToDatabase(inquiryId, data, designImagePath);
    
    if (saved) {
      safeEmailLog(`Inquiry saved to database: ${inquiryId}`);
    } else {
      console.error("Failed to save inquiry to database - continuing with email only");
    }

    // Step 4: Send confirmation email to customer only (no internal email - we use inbox now)
    const customerRecipient = testMode ? [RECIPIENT_EMAIL] : [email];

    const confirmationPayload: EmailPayload = {
      to: customerRecipient,
      subject: "Takk for at du tok kontakt – vi følger deg videre",
      html: buildConfirmationEmailHtml(name, hasDesign || false),
      replyTo: REPLY_TO_EMAIL,
    };

    // Non-blocking: send in background
    const sendJob = (async () => {
      const confirmation = await sendEmail(confirmationPayload);
      safeEmailLog(
        `Confirmation email: ${confirmation.success ? "sent" : "failed"} (provider=${confirmation.provider})${confirmation.error ? ` error=${confirmation.error}` : ""}`,
      );
    })();

    // EdgeRuntime.waitUntil exists in the runtime; this keeps sending after response.
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

    // Never break form submission; never expose internal errors.
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
};

serve(handler);
