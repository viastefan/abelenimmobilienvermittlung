export const site = {
  name: "Büro für Immobilien Bewertung & Vermittlung",
  shortName: "Silke Abelen",
  legalName: "Büro für Immobilien Bewertung & Vermittlung – Silke Abelen",
  owner: "Silke Abelen",
  ownerRole: "Inhaberin",
  tagline: "Immobilienvermittlung, die Werte schafft",
  /**
   * Dieselbe Zeile für den Aufmacher, mit weichem Trennzeichen im langen
   * Kompositum. Es ist unsichtbar und greift nur, wenn die Zeile sonst
   * nicht auf den Bildschirm passt — auf schmalen Geräten bricht sie dann
   * als „Immobilien-/vermittlung“ statt mitten im Wort.
   */
  taglineAufmacher: "Immobilien\u00ADvermittlung, die Werte schafft",
  description:
    "Wir sind Ihr zuverlässiger Partner für die Bewertung, Vermittlung und Vermietung von Immobilien in Leverkusen und Umgebung.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.abelen-immobilien.de",
  /**
   * Mobilnummer. Steht bewusst nur auf „Über mich“: Silke Abelen arbeitet
   * als Einzelne, nicht als Firma, und möchte ihre Nummer nicht auf jeder
   * Seite im Netz stehen haben.
   */
  phone: "0176 34 60 89 66",
  phoneHref: "tel:+4917634608966",
  /** Festnetz. Steht auf „Über mich“ und — gesetzlich gefordert — im Impressum. */
  landline: "02175 / 99 04 98",
  landlineHref: "tel:+492175990498",
  /** Telefax — steht im Impressum des bisherigen Auftritts. */
  fax: "02175 / 99 00 92",
  email: "info@abelen-immobilien.de",
  /**
   * Geschäftssitz. Leichlingen, nicht Leverkusen: Leverkusen ist das
   * Tätigkeitsgebiet (siehe `regions`), die Anschrift gehört ins Impressum
   * und in die strukturierten Daten.
   */
  address: {
    street: "Am Adler 1a",
    postalCode: "42799",
    locality: "Leichlingen",
    region: "Nordrhein-Westfalen",
    country: "DE",
  },
  /**
   * Tätigkeitsgebiet — nicht zu verwechseln mit der Anschrift. Das Büro
   * sitzt in Leichlingen, gearbeitet wird in Leverkusen und Umgebung.
   */
  serviceArea: "Leverkusen",
  /** Angaben nach § 5 DDG und § 34c GewO. */
  legal: {
    profession: "Immobilienmaklerin",
    taxNumber: "230/5000/0932",
    supervisoryAuthority: "Ordnungsamt der Stadt Leichlingen",
    supervisoryAuthorityAddress: "Am Büscherhof 1, 42799 Leichlingen",
    liabilityInsurer: "Allianz",
    liabilityScope: "Deutschland",
    /** Gerichtsstand nach den Allgemeinen Geschäftsbedingungen. */
    jurisdiction: "Leverkusen",
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
  { label: "Dienstleistungen", href: "/leistungen" },
  { label: "Immobilien", href: "/immobilien" },
  { label: "Referenzen", href: "/referenzen" },
  { label: "Über Mich", href: "/ueber-mich" },
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

/**
 * Siegel der Aussteller. Beide Grafiken tragen Text bereits in sich, deshalb
 * steht daneben keine zweite Beschriftung — `alt` sagt, was zu sehen ist.
 */
export const trustBadges = [
  {
    key: "sprengnetter",
    alt: "Sprengnetter Akademie: Geprüfte Fachkompetenz, Geprüfter Immobilienbewerter",
    /** Quergestrecktes Siegel mit Schrift — sitzt auf einer weißen Karte. */
    shape: "lockup",
    width: 700,
    height: 236,
  },
  {
    key: "immoscout24",
    alt: "ImmoScout24: Ausgezeichneter Bronze Partner",
    /** Quadratische Plakette — steht frei. */
    shape: "seal",
    width: 1644,
    height: 1644,
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
