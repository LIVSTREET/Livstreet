import { supabase } from "@/integrations/supabase/client";

const BUCKET = "plate-gallery";
const MAX_DIMENSION = 2560;
const WEBP_QUALITY = 0.88;

async function compressImage(file: File): Promise<{ blob: Blob; width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      let { width, height } = img;
      if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
        const ratio = Math.min(MAX_DIMENSION / width, MAX_DIMENSION / height);
        width = Math.round(width * ratio);
        height = Math.round(height * ratio);
      }
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0, width, height);
      canvas.toBlob(
        (blob) => {
          if (!blob) return reject(new Error("Failed to compress image"));
          resolve({ blob, width, height });
        },
        "image/webp",
        WEBP_QUALITY
      );
    };
    img.onerror = () => reject(new Error("Failed to load image"));
    img.src = URL.createObjectURL(file);
  });
}

export async function getPublishedPlateGalleryImages() {
  const { data, error } = await supabase
    .from("plate_gallery_images")
    .select("*")
    .eq("is_published", true)
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return data;
}

export async function getAllPlateGalleryImages() {
  const { data, error } = await supabase
    .from("plate_gallery_images")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return data;
}

export async function createPlateGalleryImage(
  file: File,
  metadata: { alt_text: string; title?: string }
) {
  const { blob, width, height } = await compressImage(file);
  const id = crypto.randomUUID();
  const storagePath = `${id}/image.webp`;

  const { error: uploadError } = await supabase.storage
    .from(BUCKET)
    .upload(storagePath, blob, { contentType: "image/webp", upsert: false });
  if (uploadError) throw uploadError;

  const { data: urlData } = supabase.storage.from(BUCKET).getPublicUrl(storagePath);

  // Get max sort_order
  const { data: maxRow } = await supabase
    .from("plate_gallery_images")
    .select("sort_order")
    .order("sort_order", { ascending: false })
    .limit(1)
    .single();

  const nextSort = (maxRow?.sort_order ?? -1) + 1;

  const { data, error } = await supabase
    .from("plate_gallery_images")
    .insert({
      id,
      alt_text: metadata.alt_text,
      title: metadata.title || null,
      image_url: urlData.publicUrl,
      storage_path: storagePath,
      width,
      height,
      sort_order: nextSort,
    })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updatePlateGalleryImage(
  id: string,
  updates: { title?: string; alt_text?: string; is_published?: boolean; sort_order?: number }
) {
  const { data, error } = await supabase
    .from("plate_gallery_images")
    .update(updates)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deletePlateGalleryImage(id: string) {
  // Get storage path first
  const { data: row, error: fetchError } = await supabase
    .from("plate_gallery_images")
    .select("storage_path")
    .eq("id", id)
    .single();
  if (fetchError) throw fetchError;

  // Delete from storage
  if (row?.storage_path) {
    await supabase.storage.from(BUCKET).remove([row.storage_path]);
  }

  // Delete from DB
  const { error } = await supabase
    .from("plate_gallery_images")
    .delete()
    .eq("id", id);
  if (error) throw error;
}
