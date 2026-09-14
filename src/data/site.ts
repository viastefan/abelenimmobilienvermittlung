export const site = {
  name: "Büro für Immobilien Bewertung & Vermittlung",
  shortName: "Silke Abelen",
  legalName: "Büro für Immobilien Bewertung & Vermittlung – Silke Abelen",
  owner: "Silke Abelen",
  ownerRole: "Inhaberin",
  tagline: "Ihre Immobilie. In guten Händen.",
  description:
    "Wir sind Ihr zuverlässiger Partner für die Bewertung, Vermittlung und Vermietung von Immobilien in Leverkusen und Umgebung.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.abelen-immobilien.de",
  /** Mobile — the number shown on the primary call-to-action. */
  phone: "0176 34 60 89 66",
  phoneHref: "tel:+4917634608966",
  /** Office landline — shown in the info bar and footer. */
  landline: "02175 / 99 04 98",
  landlineHref: "tel:+492175990498",
  email: "info@abelen-immobilien.de",
  address: {
    locality: "Leverkusen",
    region: "Nordrhein-Westfalen",
    country: "DE",
  },
} as const;

export type NavItem = {
  label: string;
  href: string;
  /** Unterpunkte — erscheinen als Klappmenü. */
  children?: NavItem[];
};

/**
 * Hauptnavigation.
 *
 * Beschriftung und Reihenfolge folgen dem bisherigen Auftritt, damit
 * wiederkehrende Besucherinnen und Besucher sich nicht neu orientieren
 * müssen. Wo ein Punkt mehrere Seiten zusammenfasst, klappt er auf.
 */
export const primaryNav: NavItem[] = [
  { label: "Start", href: "/" },
  {
    label: "Dienstleistungen",
    href: "/leistungen",
    children: [
      { label: "Immobilienbewertung", href: "/bewertung" },
      { label: "Immobilienverkauf", href: "/verkaufen" },
      { label: "Vermietung", href: "/vermieten" },
      { label: "Alle Leistungen", href: "/leistungen" },
    ],
  },
  {
    label: "Objekte & Referenzen",
    href: "/immobilien",
    children: [
      { label: "Aktuelle Immobilien", href: "/immobilien" },
      { label: "Referenzen", href: "/referenzen" },
    ],
  },
  { label: "Über Mich", href: "/ueber-mich" },
  {
    label: "Für Käufer & Verkäufer",
    href: "/verkaufen",
    children: [
      { label: "Für Verkäufer", href: "/verkaufen" },
      { label: "Für Käufer", href: "/kaufen" },
      { label: "Immobilienbewertung", href: "/bewertung" },
    ],
  },
  { label: "Anlagen", href: "/anlagen" },
  { label: "Kontakt", href: "/kontakt" },
];

/** In der Fußzeile steht jede Seite einzeln — dort hilft kein Klappmenü. */
export const footerNav: NavItem[] = [
  { label: "Start", href: "/" },
  { label: "Dienstleistungen", href: "/leistungen" },
  { label: "Aktuelle Immobilien", href: "/immobilien" },
  { label: "Referenzen", href: "/referenzen" },
  { label: "Über Mich", href: "/ueber-mich" },
  { label: "Anlagen", href: "/anlagen" },
  { label: "Kontakt", href: "/kontakt" },
];

export const leistungenNav: NavItem[] = [
  { label: "Immobilienbewertung", href: "/bewertung" },
  { label: "Immobilienverkauf", href: "/verkaufen" },
  { label: "Vermietung", href: "/vermieten" },
  { label: "Immobilie kaufen", href: "/kaufen" },
  { label: "Unterlagen für den Verkauf", href: "/anlagen" },
  { label: "Alle Leistungen", href: "/leistungen" },
];

export const legalNav: NavItem[] = [
  { label: "Impressum", href: "/impressum" },
  { label: "Datenschutz", href: "/datenschutz" },
  { label: "AGB", href: "/agb" },
  { label: "Kontakt", href: "/kontakt" },
];

/**
 * Social profiles. Only entries with a real `href` are rendered — an icon
 * that links nowhere is worse than no icon, so leave these empty until the
 * actual profile URLs are known.
 */
export const socials: { label: string; icon: "linkedin" | "instagram" | "facebook"; href: string }[] = [
  { label: "LinkedIn", icon: "linkedin", href: "" },
  { label: "Instagram", icon: "instagram", href: "" },
  { label: "Facebook", icon: "facebook", href: "" },
];

export const regions = [
  "Burscheid",
  "Düsseldorf",
  "Kreis Mettmann",
  "Leichlingen",
  "Leverkusen",
  "Remscheid",
  "Solingen",
  "Wermelskirchen",
  "Wuppertal",
] as const;

export const trustBadges = [
  {
    title: "Geprüfte Fachkompetenz",
    subtitle: "Geprüfter Immobilienbewerter (Sprengnetter Akademie)",
    issuer: "Sprengnetter",
    /** Schlüssel in `badgeImages` — wird genutzt, sobald die Grafik vorliegt. */
    badge: "sprengnetter",
  },
  {
    title: "Bronze Partner",
    subtitle: "Ausgezeichneter Partner von ImmoScout24",
    issuer: "ImmoScout24",
    badge: "immoscout24",
  },
] as const;

export const featureStrip = [
  {
    icon: "users",
    title: "Persönlich & nah",
    description: "Wir nehmen uns Zeit für Ihr Anliegen.",
  },
  {
    icon: "award",
    title: "Erfahrung & Kompetenz",
    description: "Langjährige Expertise in der Region.",
  },
  {
    icon: "home",
    title: "Regional verwurzelt",
    description: "In Leverkusen zuhause.",
  },
] as const;
