import type { Metadata } from "next";
import { site } from "@/data/site";

type PageSeoInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
};

export function pageSeo({ title, description, path, image }: PageSeoInput): Metadata {
  const url = new URL(path, site.url).toString();

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: site.name,
      locale: "de_DE",
      type: "website",
      images: image ? [{ url: image }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : undefined,
    },
  };
}
