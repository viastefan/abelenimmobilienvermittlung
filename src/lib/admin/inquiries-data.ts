import "server-only";
import { createClient } from "@/lib/supabase/server";
import { mapRowToInquiry, type Inquiry } from "@/types/inquiry";

/** Alle Anfragen, neueste zuerst. Steht hinter der /admin-Prüfung und RLS. */
export async function getInquiriesAdmin(): Promise<Inquiry[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("inquiries")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Admin: Konnte Anfragen nicht laden:", error.message);
    return [];
  }

  return data.map(mapRowToInquiry);
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
