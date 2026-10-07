import "server-only";
import { createClient } from "@/lib/supabase/server";
import { mapRowToReference, type ReferenceObject } from "@/types/reference";
import { istEintragsId, nichtGeladen } from "./laden";

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

  if (error) nichtGeladen("Referenzen", error);
  return data.map(mapRowToReference);
}

export async function getReferenceByIdAdmin(id: string): Promise<ReferenceObject | undefined> {
  if (!istEintragsId(id)) return undefined;
  const supabase = await createClient();
  const { data, error } = await supabase.from("reference_objects").select("*").eq("id", id).maybeSingle();
  if (error) nichtGeladen("Referenz", error);
  return data ? mapRowToReference(data) : undefined;
}
