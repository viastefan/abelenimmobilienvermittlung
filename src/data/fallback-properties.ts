import { objectMedia } from "@/data/wix-media";
import type { Property } from "@/types/property";
import { formatPrice } from "@/types/property";

/**
 * Angebote, die gezeigt werden, solange die Datenbank nicht erreichbar ist.
 *
 * Inhalt und Bilder stammen eins zu eins aus der Sammlung „Objekte“ des
 * bisherigen Wix-Auftritts — nichts davon ist ausgedacht. Sobald die
 * Datenbank Einträge liefert, wird diese Liste ignoriert.
 */
export const fallbackProperties: Property[] = [
  {
    id: "fallback-doppelhaushaelfte",
    slug: "helle-individuelle-doppelhaushaelfte",
    title: "Helle individuelle Doppelhaushälfte mit viel Potenzial",
    city: "Leverkusen-Rheindorf",
    status: "zu-verkaufen",
    statusLabel: "Zu verkaufen",
    price: 420000,
    priceLabel: formatPrice(420000),
    livingSpace: 171.31,
    rooms: 6,
    images: [...objectMedia.doppelhaushaelfte],
    heroNote: "Aktuelles Angebot",
    summary:
      "Doppelhaushälfte mit rund 171 m² Wohnfläche auf einem Grundstück von etwa 373 m², sechs Zimmern über mehrere Ebenen und drei Stellplätzen.",
    description: [
      "Die Doppelhaushälfte verteilt rund 171 m² Wohnfläche über mehrere Ebenen: sechs Zimmer, Balkon am Obergeschoss, eine Kochnische im Dachgeschoss und ein eigener Hauseingang.",
      "Zum Objekt gehören ein Grundstück von etwa 373 m² mit Garten und drei Stellplätze. Alle weiteren Unterlagen erhalten Sie im persönlichen Gespräch.",
    ],
    features: [
      { label: "Wohnfläche", value: "ca. 171,31 m²" },
      { label: "Zimmer", value: "6" },
      { label: "Balkon", value: "Ja" },
      { label: "Grundstück", value: "ca. 373 m²" },
      { label: "Stellplätze", value: "3" },
    ],
    equipment: [
      "Sechs Zimmer über mehrere Ebenen",
      "Balkon am Obergeschoss",
      "Kochnische im Dachgeschoss",
      "Garten",
      "Drei Stellplätze",
    ],
    location:
      "Leverkusen-Rheindorf liegt im Norden Leverkusens, nah am Rhein und an den Rheinauen. Nahversorgung, Schulen und die Anbindung Richtung Köln und Düsseldorf sind schnell erreichbar.",
    energy: [],
    featured: true,
    published: true,
  },
  {
    id: "fallback-opladen",
    slug: "4-zimmer-wohnung-in-leverkusen-opladen",
    title: "4-Zimmer-Wohnung in Leverkusen-Opladen",
    city: "Leverkusen-Opladen",
    status: "zu-verkaufen",
    statusLabel: "Zu verkaufen",
    price: 255000,
    priceLabel: formatPrice(255000),
    livingSpace: 91,
    rooms: 4,
    images: [...objectMedia.wohnungGebhardstrasse],
    summary:
      "Großzügige 4-Zimmer-Wohnung mit ca. 91 m², Balkon und Stellplatz in gefragter Lage von Leverkusen-Opladen.",
    description: [
      "Diese großzügige 4-Zimmer-Wohnung in gefragter Lage von Leverkusen-Opladen bietet Familien oder Paaren viel Platz zur freien Entfaltung. Mit einer geräumigen Wohnfläche von ca. 91 m², einem Balkon, einem Stellplatz und dem großen Grundstück eignet sich diese gepflegte Immobilie für alle, die zusätzlich Platz im Alltag genießen möchten.",
      "Leverkusen ist eine beliebte Stadt, bekannt für ihre hervorragende Infrastruktur und die optimale Anbindung an die Metropolen Köln und Düsseldorf. Die Vielfalt an Einkaufsmöglichkeiten, Kulturangeboten und Freizeiteinrichtungen macht sie zu einem äußerst begehrten Wohnort. Ein eigener Stellplatz komplettiert dieses attraktive Angebot.",
    ],
    features: [
      { label: "Wohnfläche", value: "ca. 91 m²" },
      { label: "Zimmer", value: "4" },
      { label: "Balkon", value: "Ja" },
      { label: "Stellplatz", value: "10.000 € zusätzlich" },
    ],
    equipment: ["Vier Zimmer", "Balkon", "Stellplatz gegen Aufpreis", "Großes Grundstück"],
    location:
      "Leverkusen-Opladen ist bekannt für seine Infrastruktur und die Anbindung an Köln und Düsseldorf. Einkaufsmöglichkeiten, Kultur- und Freizeitangebote liegen in der Nähe.",
    energy: [],
    featured: true,
    published: true,
  },
  {
    id: "fallback-drei-zimmer",
    slug: "3-zimmer-wohnung-in-leverkusen",
    title: "3-Zimmer-Wohnung in Leverkusen",
    city: "Leverkusen",
    status: "reserviert",
    statusLabel: "Reserviert",
    price: 270000,
    priceLabel: formatPrice(270000),
    livingSpace: 99.77,
    rooms: 3,
    images: [...objectMedia.hausMitLoggia],
    summary:
      "Helle 3-Zimmer-Wohnung mit ca. 99,77 m², Süd- und Nordbalkon in gefragter Lage von Leverkusen. Das Objekt ist fest reserviert.",
    description: [
      "Für diese helle und geräumige 3-Zimmer-Wohnung in gefragter Lage von Leverkusen konnte bereits ein passender Käufer gefunden werden – das Objekt ist fest reserviert. Die Immobilie besticht durch ca. 99,77 m² Wohnfläche und die seltene Kombination aus einem großen, sonnigen Südbalkon und einem Nordbalkon.",
      "Neben dem attraktiven Kaufpreis von 270.000 € für die Wohnung bietet der zugehörige Stellplatz für 15.000 € optimalen Komfort. Die ausgezeichnete Anbindung und das lebenswerte Umfeld in Leverkusen machen diese Immobilie zu einer zukunftssicheren Investition.",
    ],
    features: [
      { label: "Wohnfläche", value: "ca. 99,77 m²" },
      { label: "Zimmer", value: "3" },
      { label: "Balkone", value: "Süd und Nord" },
      { label: "Stellplatz", value: "15.000 € zusätzlich" },
    ],
    equipment: [
      "Drei Zimmer",
      "Großer Südbalkon",
      "Zusätzlicher Nordbalkon",
      "Stellplatz gegen Aufpreis",
    ],
    location: "Die Wohnung liegt in einer gefragten Lage von Leverkusen mit ausgezeichneter Anbindung.",
    energy: [],
    featured: false,
    published: true,
  },
];
