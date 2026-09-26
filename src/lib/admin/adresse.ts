import "server-only";
import type { createClient } from "@/lib/supabase/server";
import { naechsteFreieAdresse } from "@/lib/admin/form";

/**
 * Eine freie Adresse für ein Objekt oder eine Referenz, gebildet aus dem
 * Titel. Hier stand früher ein Pflichtfeld „Slug“ und die Meldung „Der Slug
 * wird bereits verwendet“ — beides verstand nur, wer die Website gebaut hat.
 */
export async function freieAdresse(
  supabase: Awaited<ReturnType<typeof createClient>>,
  tabelle: "properties" | "reference_objects",
  basis: string,
  ausser?: string
): Promise<string> {
  const stamm = basis || (tabelle === "properties" ? "objekt" : "referenz");
  const abfrage = supabase.from(tabelle).select("id, slug").like("slug", `${stamm}%`);
  const { data } = await abfrage;
  const vergeben = new Set((data ?? []).filter((zeile) => zeile.id !== ausser).map((zeile) => zeile.slug));
  return naechsteFreieAdresse(stamm, vergeben);
}
