/**
 * Komprimerer et bilde i nettleseren før opplastning.
 * - PNG/JPEG → resizes til maks dimensjon og lagres som PNG (med transparens) eller JPEG.
 * - SVG → returneres uendret (allerede liten/vektorisert).
 *
 * Mål: rask lastning av symboler i konfiguratoren.
 */

const MAX_DIMENSION = 512; // piksler – mer enn nok for forhåndsvisning av symboler
const JPEG_QUALITY = 0.85;

export async function compressImageFile(file: File): Promise<File> {
  // SVG trenger ikke komprimering
  if (file.type.includes("svg")) {
    return file;
  }

  // Kun bilder
  if (!file.type.startsWith("image/")) {
    return file;
  }

  try {
    const bitmap = await loadBitmap(file);
    const { width, height } = scaleDown(bitmap.width, bitmap.height, MAX_DIMENSION);

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return file;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(bitmap, 0, 0, width, height);

    // Behold PNG hvis original er PNG (for transparens), ellers JPEG
    const isPng = file.type === "image/png";
    const mime = isPng ? "image/png" : "image/jpeg";
    const ext = isPng ? "png" : "jpg";

    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, mime, isPng ? undefined : JPEG_QUALITY)
    );

    if (!blob) return file;

    // Hvis komprimert ikke er mindre, bruk original
    if (blob.size >= file.size) {
      return file;
    }

    const baseName = file.name.replace(/\.[^/.]+$/, "");
    return new File([blob], `${baseName}.${ext}`, { type: mime });
  } catch (err) {
    console.warn("Image compression failed, using original:", err);
    return file;
  }
}

async function loadBitmap(file: File): Promise<ImageBitmap | HTMLImageElement> {
  if (typeof createImageBitmap === "function") {
    try {
      return await createImageBitmap(file);
    } catch {
      // fall through
    }
  }
  return await new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = (e) => {
      URL.revokeObjectURL(url);
      reject(e);
    };
    img.src = url;
  });
}

function scaleDown(w: number, h: number, max: number) {
  if (w <= max && h <= max) return { width: w, height: h };
  const ratio = Math.min(max / w, max / h);
  return { width: Math.round(w * ratio), height: Math.round(h * ratio) };
}
