import { supabasePublic } from "@/lib/supabase/public";
import { mapRowToProperty, type Property } from "@/types/property";

/**
 * Public, anonymous reads — backed by Supabase, restricted to published
 * listings by Row Level Security. Safe to call from Server Components,
 * generateStaticParams and the sitemap alike.
 */

export async function getPublishedProperties(): Promise<Property[]> {
  const { data, error } = await supabasePublic()
    .from("properties")
    .select("*")
    .eq("published", true)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Konnte Immobilien nicht laden:", error.message);
    return [];
  }

  return data.map(mapRowToProperty);
}

export async function getActiveProperties(): Promise<Property[]> {
  const properties = await getPublishedProperties();
  return properties.filter((property) => property.status !== "verkauft");
}

export async function getFeaturedProperty(): Promise<Property | undefined> {
  const properties = await getPublishedProperties();
  return properties.find((property) => property.featured) ?? properties[0];
}

export async function getPropertyBySlug(slug: string): Promise<Property | undefined> {
  const { data, error } = await supabasePublic()
    .from("properties")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();

  if (error || !data) return undefined;
  return mapRowToProperty(data);
}

export async function getAllPropertySlugs(): Promise<string[]> {
  const { data, error } = await supabasePublic().from("properties").select("slug").eq("published", true);
  if (error || !data) return [];
  return data.map((row) => row.slug);
}
