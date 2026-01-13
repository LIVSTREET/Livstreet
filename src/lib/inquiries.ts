import { supabase } from "@/integrations/supabase/client";

export interface Inquiry {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  phone: string;
  email: string;
  address?: string;
  description: string;
  has_design: boolean;
  design_data?: any;
  design_image_url?: string;
  base_price?: number;
  maintenance_selected: boolean;
  maintenance_price?: number;
  installation_selected: boolean;
  installation_price?: number;
  total_price?: number;
  source: "contact" | "inquiry";
  status: "new" | "in_progress" | "responded" | "completed" | "archived";
  notes?: string;
}

export type InquiryStatus = Inquiry["status"];

export const STATUS_LABELS: Record<InquiryStatus, string> = {
  new: "Ny",
  in_progress: "I arbeid",
  responded: "Besvart",
  completed: "Fullført",
  archived: "Arkivert",
};

export const STATUS_COLORS: Record<InquiryStatus, string> = {
  new: "bg-blue-500",
  in_progress: "bg-amber-500",
  responded: "bg-green-500",
  completed: "bg-gray-500",
  archived: "bg-gray-700",
};

export async function getInquiries(filters?: {
  status?: string;
  search?: string;
}): Promise<Inquiry[]> {
  let query = supabase
    .from("inquiries")
    .select("*")
    .order("created_at", { ascending: false });

  if (filters?.status && filters.status !== "all") {
    query = query.eq("status", filters.status);
  }

  if (filters?.search) {
    query = query.or(`name.ilike.%${filters.search}%,email.ilike.%${filters.search}%,phone.ilike.%${filters.search}%`);
  }

  const { data, error } = await query;

  if (error) throw error;
  return (data || []) as Inquiry[];
}

export async function getInquiry(id: string): Promise<Inquiry | null> {
  const { data, error } = await supabase
    .from("inquiries")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data as Inquiry;
}

export async function updateInquiry(
  id: string,
  updates: Partial<Pick<Inquiry, "status" | "notes">>
): Promise<void> {
  const { error } = await supabase
    .from("inquiries")
    .update({
      ...updates,
      updated_at: new Date().toISOString()
    })
    .eq("id", id);

  if (error) throw error;
}

export async function getDesignImageUrl(imagePath: string): Promise<string | null> {
  if (!imagePath) return null;
  
  const { data } = await supabase.storage
    .from("design-previews")
    .createSignedUrl(imagePath, 3600); // 1 hour expiry

  return data?.signedUrl || null;
}

export function formatPrice(price: number | null | undefined): string {
  if (price == null) return "–";
  return price.toLocaleString("nb-NO") + " kr";
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("nb-NO", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
