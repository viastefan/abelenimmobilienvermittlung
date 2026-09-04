export const site = {
  name: "Büro für Immobilien Bewertung & Vermittlung",
  shortName: "Silke Abelen",
  legalName: "Büro für Immobilien Bewertung & Vermittlung – Silke Abelen",
  owner: "Silke Abelen",
  tagline: "Ihre Immobilie. In guten Händen.",
  description:
    "Wir sind Ihr zuverlässiger Partner für die Bewertung, Vermittlung und Vermietung von Immobilien in Leverkusen und Umgebung.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.abelen-immobilien.de",
  phone: "0176 34 60 89 66",
  phoneHref: "tel:+4917634608966",
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
};

export const primaryNav: NavItem[] = [
  { label: "Startseite", href: "/" },
  { label: "Bewertung", href: "/bewertung" },
  { label: "Verkaufen", href: "/verkaufen" },
  { label: "Vermieten", href: "/vermieten" },
  { label: "Über uns", href: "/ueber-mich" },
  { label: "Referenzen", href: "/referenzen" },
  { label: "Kontakt", href: "/kontakt" },
];

export const footerNav: NavItem[] = primaryNav;

export const leistungenNav: NavItem[] = [
  { label: "Immobilienbewertung", href: "/bewertung" },
  { label: "Immobilienverkauf", href: "/verkaufen" },
  { label: "Vermietung", href: "/vermieten" },
];

export const legalNav: NavItem[] = [
  { label: "Impressum", href: "/impressum" },
  { label: "Datenschutz", href: "/datenschutz" },
  { label: "AGB", href: "/agb" },
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

export const trustRegions = ["Leverkusen", "Leichlingen", "Solingen", "Köln", "Region"] as const;

export const trustBadges = [
  {
    title: "Geprüfte Fachkompetenz",
    subtitle: "Geprüfter Immobilienbewerter (Sprengnetter Akademie)",
  },
  {
    title: "Bronze Partner",
    subtitle: "ImmoScout24",
  },
] as const;

export const featureStrip = [
  {
    title: "Persönlich & nah",
    description: "Wir nehmen uns Zeit für Ihr Anliegen.",
  },
  {
    title: "Erfahrung & Kompetenz",
    description: "Langjährige Expertise in der Region.",
  },
  {
    title: "Regional verwurzelt",
    description: "In Leverkusen zuhause.",
  },
] as const;
