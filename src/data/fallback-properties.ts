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
    price: 395000,
    priceLabel: formatPrice(395000),
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
    id: "fallback-schlebusch-klinikum",
    slug: "3-zimmer-wohnung-nahe-klinikum-leverkusen",
    title: "Clever geschnittene 3-Zimmer-Wohnung, nahe dem Leverkusener Klinikum",
    city: "Leverkusen-Schlebusch",
    status: "zu-verkaufen",
    statusLabel: "Zu verkaufen",
    price: 272000,
    priceLabel: formatPrice(272000),
    livingSpace: 80.73,
    rooms: 3,
    images: [
      "/images/objekte/schlebusch-klinikum/01-haus-von-vorne.jpg",
      "/images/objekte/schlebusch-klinikum/02-essplatz.jpg",
      "/images/objekte/schlebusch-klinikum/03-balkon.jpg",
      "/images/objekte/schlebusch-klinikum/04-flur.jpg",
      "/images/objekte/schlebusch-klinikum/05-badezimmer.jpg",
      "/images/objekte/schlebusch-klinikum/06-gaeste-wc.jpg",
    ],
    summary:
      "Clever geschnittene 3-Zimmer-Wohnung mit ca. 80,73 m² im 1. OG/Hochparterre eines gepflegten Mehrfamilienhauses, nahe dem Leverkusener Klinikum. Einzel-Garage für 15.000 € zusätzlich.",
    description: [
      "Die Wohnung (Baujahr 1974) liegt im 1. OG/Hochparterre eines gepflegten Mehrfamilienhauses in Leverkusen-Schlebusch, nahe dem Leverkusener Klinikum. Sie bietet rund 80,73 m² Wohnfläche und drei Zimmer. Es sind nur kleine Renovierungsarbeiten notwendig.",
      "Der Kaufpreis beträgt 272.000 €. Eine Einzel-Garage ist für 15.000 € zusätzlich erhältlich.",
    ],
    features: [
      { label: "Wohnfläche", value: "ca. 80,73 m²" },
      { label: "Zimmer", value: "3" },
      { label: "Baujahr", value: "1974" },
      { label: "Lage im Haus", value: "1. OG/Hochparterre" },
      { label: "Einzel-Garage", value: "15.000 € zusätzlich" },
    ],
    equipment: [
      "Drei Zimmer",
      "Gepflegtes Mehrfamilienhaus",
      "Einzel-Garage gegen Aufpreis",
      "Nur kleine Renovierungsarbeiten notwendig",
    ],
    location:
      "Leverkusen-Schlebusch, nahe dem Leverkusener Klinikum, mit guter Anbindung Richtung Köln und Düsseldorf.",
    energy: [],
    featured: false,
    published: true,
  },
  {
    id: "fallback-opladen",
    slug: "4-zimmer-wohnung-in-leverkusen-opladen",
    title: "4-Zimmer-Wohnung in Leverkusen-Opladen",
    city: "Leverkusen-Opladen",
    status: "zu-verkaufen",
    statusLabel: "Zu verkaufen",
    price: 247000,
    priceLabel: formatPrice(247000),
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
    title: "3-Zimmer-Wohnung in Leverkusen-Quettingen",
    city: "Leverkusen-Quettingen",
    status: "reserviert",
    statusLabel: "Reserviert",
    price: 275000,
    priceLabel: formatPrice(275000),
    livingSpace: 99.77,
    rooms: 3,
    images: [...objectMedia.hausMitLoggia],
    summary:
      "Helle 3-Zimmer-Wohnung mit ca. 99,77 m², Süd- und Nordbalkon in gefragter Lage von Leverkusen-Quettingen, Kaufpreis inklusive TG-Stellplatz. Das Objekt ist fest reserviert.",
    description: [
      "Für diese helle und geräumige 3-Zimmer-Wohnung in gefragter Lage von Leverkusen konnte bereits ein passender Käufer gefunden werden – das Objekt ist fest reserviert. Die Immobilie besticht durch ca. 99,77 m² Wohnfläche und die seltene Kombination aus einem großen, sonnigen Südbalkon und einem Nordbalkon.",
      "Der Kaufpreis von 275.000 € beinhaltet den zugehörigen TG-Stellplatz. Die ausgezeichnete Anbindung und das lebenswerte Umfeld in Leverkusen-Quettingen machen diese Immobilie zu einer zukunftssicheren Investition.",
    ],
    features: [
      { label: "Wohnfläche", value: "ca. 99,77 m²" },
      { label: "Zimmer", value: "3" },
      { label: "Balkone", value: "Süd und Nord" },
      { label: "Stellplatz", value: "TG-Stellplatz im Kaufpreis enthalten" },
    ],
    equipment: [
      "Drei Zimmer",
      "Großer Südbalkon",
      "Zusätzlicher Nordbalkon",
      "TG-Stellplatz inklusive",
    ],
    location: "Die Wohnung liegt in einer gefragten Lage von Leverkusen-Quettingen mit ausgezeichneter Anbindung.",
    energy: [],
    featured: false,
    published: true,
  },
];
