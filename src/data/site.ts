export const site = {
  name: "Abelen Immobilien",
  legalName: "Immobilienvermittlung Silke Abelen",
  owner: "Silke Abelen",
  tagline: "Immobilien. Persönlich vermittelt.",
  description:
    "Persönliche Immobilienvermittlung in Leichlingen, Leverkusen, Solingen und der Region — mit Erfahrung, klarer Beratung und einem Anspruch, der über den erfolgreichen Abschluss hinausgeht.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.abelen-immobilien.de",
  phone: "02175 / 99 04 98",
  phoneHref: "tel:+492175990498",
  email: "info@abelen-immobilien.de",
  address: {
    locality: "Leichlingen (Rheinland)",
    region: "Nordrhein-Westfalen",
    country: "DE",
  },
} as const;

export type NavItem = {
  label: string;
  href: string;
};

export const primaryNav: NavItem[] = [
  { label: "Start", href: "/" },
  { label: "Immobilien", href: "/immobilien" },
  { label: "Verkaufen", href: "/verkaufen" },
  { label: "Kaufen", href: "/kaufen" },
  { label: "Leistungen", href: "/leistungen" },
  { label: "Über mich", href: "/ueber-mich" },
  { label: "Referenzen", href: "/referenzen" },
  { label: "Kontakt", href: "/kontakt" },
];

export const footerNav: NavItem[] = [
  { label: "Immobilien", href: "/immobilien" },
  { label: "Verkaufen", href: "/verkaufen" },
  { label: "Kaufen", href: "/kaufen" },
  { label: "Leistungen", href: "/leistungen" },
  { label: "Über mich", href: "/ueber-mich" },
  { label: "Referenzen", href: "/referenzen" },
  { label: "Kontakt", href: "/kontakt" },
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

export const trustRegions = ["Leichlingen", "Leverkusen", "Solingen", "Wuppertal", "Region"] as const;
