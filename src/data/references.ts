import { supabasePublic } from "@/lib/supabase/public";
import { fallbackReferences } from "@/data/fallback-references";
import { mapRowToReference, type ReferenceObject } from "@/types/reference";

/**
 * Öffentliche, anonyme Lesezugriffe auf die Referenzobjekte. Row Level
 * Security beschränkt den `anon`-Rollenzugriff auf veröffentlichte
 * Datensätze. Ist Supabase nicht konfiguriert oder noch leer, greifen die
 * gepflegten Fallback-Objekte — die Seite steht nie ohne Referenzen da.
 */
export async function getPublishedReferences(): Promise<ReferenceObject[]> {
  try {
    const client = supabasePublic();
    if (!client) return fallbackReferences;

    const { data, error } = await client
      .from("reference_objects")
      .select("*")
      .eq("published", true)
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Konnte Referenzen nicht laden:", error.message);
      return fallbackReferences;
    }

    const items = data.map(mapRowToReference);
    return items.length > 0 ? items : fallbackReferences;
  } catch (error) {
    console.error("Konnte Referenzen nicht laden:", error);
    return fallbackReferences;
  }
}

export async function getReferenceBySlug(slug: string): Promise<ReferenceObject | undefined> {
  const fallback = fallbackReferences.find((item) => item.slug === slug);

  try {
    const client = supabasePublic();
    if (!client) return fallback;

    const { data, error } = await client
      .from("reference_objects")
      .select("*")
      .eq("slug", slug)
      .eq("published", true)
      .maybeSingle();

    if (error || !data) return fallback;
    return mapRowToReference(data);
  } catch (error) {
    console.error("Konnte Referenz nicht laden:", error);
    return fallback;
  }
}

export async function getAllReferenceSlugs(): Promise<string[]> {
  const items = await getPublishedReferences();
  return items.map((item) => item.slug);
}
