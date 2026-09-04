export type ReferenceCategory = "verkauf" | "vermietet";
export type ReferencePropertyType = "haus" | "wohnung" | "mehrfamilienhaus";

export type ReferenceItem = {
  title: string;
  region: string;
  category: ReferenceCategory;
  propertyType: ReferencePropertyType;
  livingSpace: number;
  rooms: number;
  year: number;
};

/**
 * Representative property types handled across the region — not tied to a
 * specific address, price or transaction. Swap in real case studies (with
 * client consent) as they become available.
 */
export const references: ReferenceItem[] = [
  {
    title: "Reihenhaus in ruhiger Lage",
    region: "Leverkusen – Schlebusch",
    category: "verkauf",
    propertyType: "haus",
    livingSpace: 120,
    rooms: 5,
    year: 1968,
  },
  {
    title: "3-Zimmer-Wohnung mit Balkon",
    region: "Leverkusen – Wiesdorf",
    category: "vermietet",
    propertyType: "wohnung",
    livingSpace: 78,
    rooms: 3,
    year: 1972,
  },
  {
    title: "Mehrfamilienhaus als Kapitalanlage",
    region: "Leverkusen – Opladen",
    category: "verkauf",
    propertyType: "mehrfamilienhaus",
    livingSpace: 310,
    rooms: 10,
    year: 1965,
  },
  {
    title: "Einfamilienhaus mit Garten",
    region: "Leverkusen – Manfort",
    category: "verkauf",
    propertyType: "haus",
    livingSpace: 135,
    rooms: 4,
    year: 1962,
  },
  {
    title: "Wohnung im 1. OG",
    region: "Leverkusen – Bürrig",
    category: "vermietet",
    propertyType: "wohnung",
    livingSpace: 65,
    rooms: 2,
    year: 1971,
  },
  {
    title: "2-Zimmer-Wohnung",
    region: "Leverkusen – Steinbüchel",
    category: "vermietet",
    propertyType: "wohnung",
    livingSpace: 55,
    rooms: 2,
    year: 1973,
  },
];
