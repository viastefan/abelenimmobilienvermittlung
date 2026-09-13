import type { MetadataRoute } from "next";
import { site } from "@/data/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: "Silke Abelen",
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#FBFCFC",
    theme_color: "#102B4E",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
