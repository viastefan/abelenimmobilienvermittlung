import "server-only";
import { createClient } from "@/lib/supabase/server";
import { mapRowToReference, type ReferenceObject } from "@/types/reference";

/**
 * Angemeldete Lesezugriffe für das Admin-Panel — liefert alle Referenzen,
 * auch unveröffentlichte. Der Aufruf steht bereits hinter der /admin-Prüfung
 * (Middleware + Layout); RLS erzwingt dasselbe zusätzlich in der Datenbank.
 */
export async function getAllReferencesAdmin(): Promise<ReferenceObject[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("reference_objects")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Admin: Konnte Referenzen nicht laden:", error.message);
    return [];
  }

  return data.map(mapRowToReference);
}

export async function getReferenceByIdAdmin(id: string): Promise<ReferenceObject | undefined> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("reference_objects").select("*").eq("id", id).maybeSingle();
  if (error || !data) return undefined;
  return mapRowToReference(data);
}

export async function referenceSlugExists(slug: string, excludeId?: string): Promise<boolean> {
  const supabase = await createClient();
  let query = supabase.from("reference_objects").select("id").eq("slug", slug);
  if (excludeId) query = query.neq("id", excludeId);
  const { data } = await query.maybeSingle();
  return Boolean(data);
}
