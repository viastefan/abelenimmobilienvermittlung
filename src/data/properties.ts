import { supabasePublic } from "@/lib/supabase/public";
import { fallbackProperties } from "@/data/fallback-properties";
import { mapRowToProperty, type Property } from "@/types/property";

/**
 * Public, anonymous reads — backed by Supabase, restricted to published
 * listings by Row Level Security. Safe to call from Server Components,
 * generateStaticParams and the sitemap alike. Degrades to empty results
 * (rather than throwing) if Supabase env vars are missing or the request
 * fails, so a misconfigured deployment shows the curated fallback listings
 * instead of a hard 500.
 */

export async function getPublishedProperties(): Promise<Property[]> {
  try {
    const client = supabasePublic();
    if (!client) return fallbackProperties;

    const { data, error } = await client
      .from("properties")
      .select("*")
      .eq("published", true)
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Konnte Immobilien nicht laden:", error.message);
      return fallbackProperties;
    }

    const properties = data.map(mapRowToProperty);
    return properties.length > 0 ? properties : fallbackProperties;
  } catch (error) {
    console.error("Konnte Immobilien nicht laden:", error);
    return fallbackProperties;
  }
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
  const fallback = fallbackProperties.find((property) => property.slug === slug);

  try {
    const client = supabasePublic();
    if (!client) return fallback;

    const { data, error } = await client
      .from("properties")
      .select("*")
      .eq("slug", slug)
      .eq("published", true)
      .maybeSingle();

    if (error || !data) return fallback;
    return mapRowToProperty(data);
  } catch (error) {
    console.error("Konnte Immobilie nicht laden:", error);
    return fallback;
  }
}

export async function getAllPropertySlugs(): Promise<string[]> {
  const fallbackSlugs = fallbackProperties.map((property) => property.slug);

  try {
    const client = supabasePublic();
    if (!client) return fallbackSlugs;

    const { data, error } = await client.from("properties").select("slug").eq("published", true);
    if (error || !data || data.length === 0) return fallbackSlugs;
    return data.map((row) => row.slug);
  } catch (error) {
    console.error("Konnte Immobilien-Slugs nicht laden:", error);
    return fallbackSlugs;
  }
}
