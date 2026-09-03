export type ReferenceItem = {
  type: string;
  region: string;
  size: "tall" | "wide" | "square";
};

/**
 * Representative property types handled across the region — not tied to a
 * specific address, price or transaction. Swap in real case studies (with
 * client consent) as they become available.
 */
export const references: ReferenceItem[] = [
  { type: "Eigentumswohnung", region: "Leverkusen", size: "tall" },
  { type: "Einfamilienhaus", region: "Leichlingen", size: "wide" },
  { type: "Doppelhaushälfte", region: "Solingen", size: "square" },
  { type: "Altbauwohnung", region: "Wuppertal", size: "square" },
  { type: "Reihenhaus", region: "Burscheid", size: "tall" },
  { type: "Mehrfamilienhaus", region: "Remscheid", size: "wide" },
];
