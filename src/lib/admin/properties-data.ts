import "server-only";
import { createClient } from "@/lib/supabase/server";
import { mapRowToProperty, type Property } from "@/types/property";

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
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Admin: Konnte Immobilien nicht laden:", error.message);
    return [];
  }

  return data.map(mapRowToProperty);
}

export async function getPropertyByIdAdmin(id: string): Promise<Property | undefined> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("properties").select("*").eq("id", id).maybeSingle();

  if (error || !data) return undefined;
  return mapRowToProperty(data);
}

export async function slugExists(slug: string, excludeId?: string): Promise<boolean> {
  const supabase = await createClient();
  let query = supabase.from("properties").select("id").eq("slug", slug);
  if (excludeId) query = query.neq("id", excludeId);
  const { data } = await query.maybeSingle();
  return Boolean(data);
}
