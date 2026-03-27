import { supabase } from "@/integrations/supabase/client";

export interface PartnershipContact {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  organization?: string;
  title?: string;
  type?: string;
  phone?: string;
  email?: string;
  contacted: boolean;
  contact_method?: "email" | "phone" | "meeting";
  status: "cold" | "pending" | "warm";
  last_contact_date?: string;
  follow_up_date?: string;
  next_step?: string;
  archived: boolean;
  topic_price: boolean;
  topic_existing_supplier: boolean;
  topic_quality: boolean;
  topic_customization: boolean;
  topic_delivery: boolean;
  topic_commission: boolean;
  topic_exclusivity: boolean;
  topic_demo_interest: boolean;
  topic_wants_followup: boolean;
  their_needs?: string;
  our_offer?: string;
  notes?: string;
}

export type ContactStatus = PartnershipContact["status"];
export type ContactMethod = NonNullable<PartnershipContact["contact_method"]>;

export type PartnershipContactInput = Omit<
  PartnershipContact,
  "id" | "created_at" | "updated_at"
>;

export const STATUS_LABELS: Record<ContactStatus, string> = {
  cold: "Kald",
  pending: "Ventende",
  warm: "Varm",
};

export const STATUS_COLORS: Record<ContactStatus, string> = {
  cold: "bg-blue-500",
  pending: "bg-amber-500",
  warm: "bg-green-500",
};

export const METHOD_LABELS: Record<ContactMethod, string> = {
  email: "E-post",
  phone: "Telefon",
  meeting: "Møte",
};

export const CONTACT_TYPES = [
  "florist",
  "begravelsesbyrå",
  "blomsterbutikk",
  "kirke",
  "gravferdsforvaltning",
  "seremonirom",
  "annen",
] as const;

export const TOPICS: { key: keyof PartnershipContact; label: string }[] = [
  { key: "topic_price", label: "Pris / margin" },
  { key: "topic_existing_supplier", label: "Har allerede leverandør" },
  { key: "topic_quality", label: "Opptatt av kvalitet" },
  { key: "topic_customization", label: "Ønsker skreddersøm / personlig preg" },
  { key: "topic_delivery", label: "Levering / logistikk" },
  { key: "topic_commission", label: "Provisjonsmodell" },
  { key: "topic_exclusivity", label: "Eksklusivitet" },
  { key: "topic_demo_interest", label: "Viste interesse for demo" },
  { key: "topic_wants_followup", label: "Vil ha oppfølging" },
];

export function formatDate(dateString?: string | null): string {
  if (!dateString) return "–";
  return new Date(dateString).toLocaleDateString("nb-NO", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export async function getPartnershipContacts(filters?: {
  status?: string;
  search?: string;
  showArchived?: boolean;
}): Promise<PartnershipContact[]> {
  let query = (supabase
    .from("partnership_contacts" as any)
    .select("*")
    .order("follow_up_date", { ascending: true, nullsFirst: false })
    .order("updated_at", { ascending: false })) as any;

  if (!filters?.showArchived) {
    query = query.eq("archived", false);
  }

  if (filters?.status && filters.status !== "all") {
    query = query.eq("status", filters.status);
  }

  if (filters?.search) {
    query = query.or(
      `name.ilike.%${filters.search}%,organization.ilike.%${filters.search}%,email.ilike.%${filters.search}%,phone.ilike.%${filters.search}%`
    );
  }

  const { data, error } = await query;
  if (error) throw error;
  return (data || []) as PartnershipContact[];
}

export async function createPartnershipContact(
  input: PartnershipContactInput
): Promise<PartnershipContact> {
  const { data, error } = await (supabase
    .from("partnership_contacts" as any)
    .insert(input as any)
    .select()
    .single()) as any;
  if (error) throw error;
  return data as PartnershipContact;
}

export async function updatePartnershipContact(
  id: string,
  updates: Partial<PartnershipContactInput>
): Promise<void> {
  const { error } = await (supabase
    .from("partnership_contacts" as any)
    .update(updates as any)
    .eq("id", id)) as any;
  if (error) throw error;
}

export async function deletePartnershipContact(id: string): Promise<void> {
  const { error } = await (supabase
    .from("partnership_contacts" as any)
    .delete()
    .eq("id", id)) as any;
  if (error) throw error;
}
