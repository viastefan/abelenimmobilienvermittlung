import { referenceCategoryLabels, type ReferenceObject } from "@/types/reference";

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
    images: [
      "https://static.wixstatic.com/media/59289a_7899b90d25e0499a91955a2c18bff34c~mv2.jpg",
      "https://static.wixstatic.com/media/59289a_78252eaf77d647b4b3a7804b2614eacb~mv2.jpg",
      "https://static.wixstatic.com/media/59289a_c8472eac5bdd46e2961d94af1709ec94~mv2.jpg",
    ],
    summary: "Zwei Zimmer auf rund 55 m² mit Balkon im Kreis Mettmann — erfolgreich vermittelt.",
    description: ["Zwei Zimmer auf rund 55 m² mit Balkon, vermittelt im Kreis Mettmann."],
    equipment: ["Zwei Zimmer", "Balkon"],
    location: "Haan im Kreis Mettmann, zwischen Düsseldorf, Solingen und Wuppertal gelegen.",
    published: true,
    sortOrder: 0,
  },
];
