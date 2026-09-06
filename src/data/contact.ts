/** Anliegen im Kontaktformular — geteilt zwischen Formular und API-Route. */
export const contactInterests = [
  { value: "bewertung", label: "Immobilienbewertung" },
  { value: "verkaufen", label: "Verkauf" },
  { value: "vermieten", label: "Vermietung" },
  { value: "kaufen", label: "Immobiliensuche" },
  { value: "sonstiges", label: "Sonstiges" },
] as const;

export type ContactInterest = (typeof contactInterests)[number]["value"];

export const contactInterestLabels: Record<string, string> = Object.fromEntries(
  contactInterests.map((item) => [item.value, item.label])
);

export const defaultContactInterest: ContactInterest = "bewertung";
