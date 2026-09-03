import type { Property } from "@/types/property";

/**
 * CMS-ready property data. Add new objects to this array to publish them —
 * detail pages, the overview grid and the featured teaser are all generated
 * from this list. `images` is intentionally empty until real listing
 * photography is supplied; the UI falls back to an art-directed placeholder
 * so no stock or fabricated photos are shown for real addresses.
 */
export const properties: Property[] = [
  {
    slug: "eigentumswohnung-leverkusen",
    title: "3-Zimmer-Wohnung in Leverkusen",
    city: "Leverkusen",
    status: "zu-verkaufen",
    statusLabel: "Zu verkaufen",
    price: 270000,
    priceLabel: "270.000 €",
    livingSpace: 99.77,
    rooms: 3,
    images: [],
    heroNote: "Stellplatz optional · 15.000 €",
    summary:
      "Helle 3-Zimmer-Wohnung mit großem Südbalkon und zusätzlichem Nordbalkon — ruhig gelegen und durchdacht geschnitten.",
    description: [
      "Diese gepflegte 3-Zimmer-Wohnung in Leverkusen überzeugt durch ihren durchdachten Grundriss und die helle, freundliche Raumaufteilung auf rund 99,77 m² Wohnfläche.",
      "Zwei Balkone — ein großzügiger Südbalkon und ein zusätzlicher Nordbalkon — sorgen für Tageslicht und Außenbezug zu jeder Tageszeit. Die Aufteilung eignet sich sowohl für Paare als auch für kleine Familien, die Wert auf ruhiges Wohnen mit guter Anbindung legen.",
      "Ein Stellplatz kann optional für 15.000 € mit erworben werden.",
    ],
    features: [
      { label: "Wohnfläche", value: "ca. 99,77 m²" },
      { label: "Zimmer", value: "3" },
      { label: "Balkone", value: "2 (Süd & Nord)" },
      { label: "Stellplatz", value: "optional, 15.000 €" },
      { label: "Kaufpreis", value: "270.000 €" },
      { label: "Lage", value: "Leverkusen" },
    ],
    equipment: [
      "Großer Südbalkon mit Nachmittags- und Abendsonne",
      "Zusätzlicher Nordbalkon",
      "Durchdachter, praktischer Grundriss",
      "Ruhige Wohnlage",
      "Optionaler Stellplatz",
    ],
    location:
      "Die Wohnung liegt in einer etablierten Wohnlage in Leverkusen mit guter Anbindung an Einkaufsmöglichkeiten, Schulen und den öffentlichen Nahverkehr.",
    energy: [
      { label: "Energieausweis", value: "Auf Anfrage" },
      { label: "Energieträger", value: "Auf Anfrage" },
    ],
    featured: true,
  },
];

export function getProperty(slug: string) {
  return properties.find((property) => property.slug === slug);
}

export function getActiveProperties() {
  return properties.filter((property) => property.status !== "verkauft");
}

export function getFeaturedProperty() {
  return properties.find((property) => property.featured) ?? properties[0];
}
