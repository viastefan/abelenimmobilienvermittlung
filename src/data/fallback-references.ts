import { referenceCategoryLabels, type ReferenceObject } from "@/types/reference";
import { objectMedia } from "@/data/wix-media";

/**
 * Vermittelte Objekte, die gezeigt werden, solange die Datenbank nicht
 * erreichbar ist.
 *
 * Nur tatsächlich vermittelte Objekte aus der Sammlung „Objekte“ des
 * bisherigen Auftritts. Beispielobjekte gehören hier nicht hinein: Wer
 * Referenzen liest, will wissen, was wirklich verkauft wurde.
 */
export const fallbackReferences: ReferenceObject[] = [
  {
    slug: "2-zimmer-wohnung-in-haan",
    id: "ref-2-zimmer-wohnung-in-haan",
    title: "2-Zimmer-Wohnung in Haan",
    region: "Kreis Mettmann – Haan",
    category: "verkauf",
    categoryLabel: referenceCategoryLabels.verkauf,
    typeLabel: "Etagenwohnung",
    livingSpace: 55,
    rooms: 2,
    images: [...objectMedia.wohnungHaan],
    summary:
      "Charmante 2-Zimmer-Wohnung mit 55 m² Wohnfläche und Außenstellplatz in Haan, Kreis Mettmann — erfolgreich verkauft.",
    description: [
      "Diese charmante 2-Zimmer-Wohnung in Haan, im Kreis Mettmann, wurde erfolgreich verkauft. Mit einer Wohnfläche von 55 m² inklusive eines Außenstellplatzes hat sie schnell ein neues Zuhause gefunden.",
      "Haan ist eine beliebte Stadt, bekannt für ihre grüne Umgebung und die hervorragende Anbindung an Düsseldorf und Wuppertal. Die gute Infrastruktur mit vielfältigen Einkaufsmöglichkeiten, Restaurants und Freizeiteinrichtungen macht sie zu einem begehrten Wohnort.",
    ],
    equipment: ["Zwei Zimmer", "Außenstellplatz"],
    location: "Haan im Kreis Mettmann — grüne Umgebung, gute Anbindung an Düsseldorf und Wuppertal.",
    published: true,
    sortOrder: 0,
    testimonial: {
      quote:
        "Mit der Immobilienvermittlung Fr. S. Abelen erfährt man eine äußerst kompetente, erfahrene, zuverlässige, freundliche Unterstützung. Ich kann die Immobilienvermittlung von Fr. S. Abelen sehr weiter empfehlen.",
      rating: 4.8,
      label: "Exzellent",
      recommend: true,
    },
  },
];
