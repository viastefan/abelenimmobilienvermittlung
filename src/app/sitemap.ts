import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { properties } from "@/data/properties";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/immobilien",
    "/verkaufen",
    "/kaufen",
    "/leistungen",
    "/ueber-mich",
    "/referenzen",
    "/kontakt",
    "/impressum",
    "/datenschutz",
    "/agb",
  ].map((path) => ({
    url: new URL(path, site.url).toString(),
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const propertyRoutes = properties.map((property) => ({
    url: new URL(`/immobilien/${property.slug}`, site.url).toString(),
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...propertyRoutes];
}
