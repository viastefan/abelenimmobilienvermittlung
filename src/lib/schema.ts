import { regions, site, socials } from "@/data/site";
import type { Property } from "@/types/property";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["RealEstateAgent", "LocalBusiness"],
    name: site.name,
    legalName: site.legalName,
    url: site.url,
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        email: site.email,
        areaServed: "DE",
        availableLanguage: "German",
      },
    ],
    email: site.email,
    // Das Vorschaubild erzeugt `src/app/opengraph-image.tsx` zur Laufzeit.
    // Hier stand einmal `/og-image.png` — eine Datei, die es nie gab; die
    // strukturierten Daten verwiesen damit auf eine 404.
    image: `${site.url}/opengraph-image`,
    logo: `${site.url}/icon-512.png`,
    // Das Festnetz steht im Impressum und ist damit ohnehin öffentlich; für
    // die lokale Suche ist eine erreichbare Nummer eines der wichtigsten
    // Merkmale. Die Mobilnummer bleibt bewusst draußen (siehe `site.ts`).
    telephone: site.landline.replace(/\s|\//g, ""),
    faxNumber: site.fax.replace(/\s|\//g, ""),
    priceRange: "$$",
    currenciesAccepted: "EUR",
    availableLanguage: "de",
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      postalCode: site.address.postalCode,
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
      jobTitle: site.ownerRole,
    },
    knowsAbout: [
      "Immobilienbewertung",
      "Immobilienverkauf",
      "Marktwertermittlung",
      "Immobilienvermittlung",
    ],
    slogan: site.tagline,
    // Leere Einträge würden als tote Verweise ausgeliefert.
    ...(socials.some((s) => s.href.trim())
      ? { sameAs: socials.filter((s) => s.href.trim()).map((s) => s.href) }
      : {}),
  };
}

/**
 * Die Website als Ganzes. Google nutzt sie, um den Namen der Seite in den
 * Ergebnissen zu setzen, statt ihn aus dem Titel zu raten.
 */
export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    alternateName: site.shortName,
    url: site.url,
    inLanguage: "de-DE",
    publisher: { "@type": "Organization", name: site.legalName },
  };
}

/** Eine einzelne Seite mit ihrem Platz im Auftritt. */
export function webPageSchema({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name,
    description,
    url: new URL(path, site.url).toString(),
    inLanguage: "de-DE",
    isPartOf: { "@type": "WebSite", name: site.name, url: site.url },
    about: { "@type": "RealEstateAgent", name: site.name },
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
