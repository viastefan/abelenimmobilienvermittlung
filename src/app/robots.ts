import type { MetadataRoute } from "next";
import { site } from "@/data/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Das Panel ist ohnehin geschützt; es soll gar nicht erst besucht werden.
      disallow: ["/api/", "/admin", "/admin/"],
    },
    sitemap: new URL("/sitemap.xml", site.url).toString(),
  };
}
