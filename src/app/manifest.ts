import type { MetadataRoute } from "next";
import { site } from "@/data/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: "Abelen",
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#F8F6F2",
    theme_color: "#1F211F",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
