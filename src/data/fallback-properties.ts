import type { Property } from "@/types/property";
import { formatPrice } from "@/types/property";

/**
 * Listings shown when Supabase is not configured (local preview, first
 * deployment) or returns nothing. Content mirrors the object currently
 * advertised on abelen-immobilien.de so the site never renders an empty
 * "Aktuelle Immobilien" section. As soon as the admin area holds published
 * listings, these are ignored entirely.
 */
export const fallbackProperties: Property[] = [
  {
    id: "fallback-rheindorf",
    slug: "doppelhaushaelfte-leverkusen-rheindorf",
    title: "Doppelhaushälfte mit Charme",
    city: "Leverkusen – Rheindorf",
    status: "zu-verkaufen",
    statusLabel: "Zu verkaufen",
    price: 420000,
    priceLabel: formatPrice(420000),
    livingSpace: 171.31,
    rooms: 6,
    images: [],
    heroNote: "Aktuelles Angebot",
    summary:
      "Großzügige Doppelhaushälfte mit rund 171 m² Wohnfläche, sechs Zimmern und drei Stellplätzen in ruhiger Lage von Leverkusen-Rheindorf.",
    description: [
      "Die Doppelhaushälfte bietet auf rund 171 m² Wohnfläche Platz für die ganze Familie: sechs Zimmer verteilen sich über mehrere Ebenen und lassen sich flexibel als Wohn-, Arbeits- und Schlafräume nutzen.",
      "Drei Stellplätze auf dem Grundstück sind in dieser Lage eine Seltenheit — ebenso wie der ruhige Zuschnitt der Straße. Alle weiteren Unterlagen erhalten Sie im persönlichen Gespräch.",
    ],
    features: [
      { label: "Wohnfläche", value: "171,31 m²" },
      { label: "Zimmer", value: "6" },
      { label: "Stellplätze", value: "3" },
      { label: "Kaufpreis", value: formatPrice(420000) },
    ],
    equipment: ["Sechs Zimmer", "Drei Stellplätze", "Ruhige Wohnlage", "Garten"],
    location:
      "Rheindorf liegt im Norden Leverkusens, nah am Rhein und an den Rheinauen. Nahversorgung, Schulen und die Anbindung Richtung Köln und Düsseldorf sind schnell erreichbar.",
    energy: [],
    featured: true,
    published: true,
  },
];
