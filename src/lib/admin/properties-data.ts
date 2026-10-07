import "server-only";
import { createClient } from "@/lib/supabase/server";
import { mapRowToProperty, type Property } from "@/types/property";
import { istEintragsId, nichtGeladen } from "./laden";

/**
 * Authenticated reads for the admin dashboard — returns every listing
 * (published or draft). Relies on the caller already being behind the
 * /admin auth check (middleware + layout); RLS additionally enforces this
 * at the database level for the `authenticated` role.
 */
export async function getAllPropertiesAdmin(): Promise<Property[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("properties")
    .select("*")
    // Dieselbe Reihenfolge wie auf der Website — was hier vorn steht, steht dort vorn.
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) nichtGeladen("Objekte", error);
  return data.map(mapRowToProperty);
}

export async function getPropertyByIdAdmin(id: string): Promise<Property | undefined> {
  if (!istEintragsId(id)) return undefined;
  const supabase = await createClient();
  const { data, error } = await supabase.from("properties").select("*").eq("id", id).maybeSingle();

  if (error) nichtGeladen("Objekt", error);
  return data ? mapRowToProperty(data) : undefined;
}
