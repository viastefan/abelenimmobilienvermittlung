import { regions, site } from "@/data/site";
import type { Property } from "@/types/property";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["RealEstateAgent", "LocalBusiness"],
    name: site.name,
    legalName: site.legalName,
    url: site.url,
    telephone: site.phoneHref.replace("tel:", ""),
    email: site.email,
    image: `${site.url}/og-image.png`,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      addressCountry: site.address.country,
    },
    areaServed: regions.map((region) => ({
      "@type": "AdministrativeArea",
      name: region,
    })),
    founder: {
      "@type": "Person",
      name: site.owner,
    },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: new URL(item.path, site.url).toString(),
    })),
  };
}

export function propertySchema(property: Property) {
  return {
    "@context": "https://schema.org",
    "@type": "Residence",
    name: property.title,
    description: property.summary,
    address: {
      "@type": "PostalAddress",
      addressLocality: property.city,
      addressCountry: site.address.country,
    },
    numberOfRooms: property.rooms,
    floorSize: {
      "@type": "QuantitativeValue",
      value: property.livingSpace,
      unitCode: "MTK",
    },
    offers: {
      "@type": "Offer",
      price: property.price,
      priceCurrency: "EUR",
      availability:
        property.status === "verkauft"
          ? "https://schema.org/SoldOut"
          : "https://schema.org/InStock",
    },
  };
}

export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
