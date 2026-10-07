import "server-only";
import { createClient } from "@/lib/supabase/server";
import { mapRowToInquiry, type Inquiry } from "@/types/inquiry";
import { istEintragsId, nichtGeladen } from "./laden";

/** Alle Anfragen, neueste zuerst. Steht hinter der /admin-Prüfung und RLS. */
export async function getInquiriesAdmin(): Promise<Inquiry[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("inquiries")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) nichtGeladen("Anfragen", error);
  return data.map(mapRowToInquiry);
}

export async function getInquiryByIdAdmin(id: string): Promise<Inquiry | undefined> {
  if (!istEintragsId(id)) return undefined;
  const supabase = await createClient();
  const { data, error } = await supabase.from("inquiries").select("*").eq("id", id).maybeSingle();
  if (error) nichtGeladen("Anfrage", error);
  return data ? mapRowToInquiry(data) : undefined;
}

export async function countNewInquiries(): Promise<number> {
  const supabase = await createClient();
  const { count, error } = await supabase
    .from("inquiries")
    .select("id", { count: "exact", head: true })
    .eq("status", "neu");

  if (error) {
    console.error("Admin: Konnte Anfragen nicht zählen:", error.message);
    return 0;
  }

  return count ?? 0;
}
