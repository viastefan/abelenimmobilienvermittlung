export const services = [
  {
    number: "01",
    slug: "bewertung",
    icon: "home",
    title: "Immobilienbewertung",
    description:
      "Professionelle und marktgerechte Bewertung Ihrer Immobilie — transparent und zuverlässig.",
    cta: "Bewertung anfragen",
    href: "/bewertung",
  },
  {
    number: "02",
    slug: "verkaufen",
    icon: "handshake",
    title: "Immobilienverkauf",
    description:
      "Begleitung von der ersten Beratung bis zum erfolgreichen Verkauf Ihrer Immobilie.",
    cta: "Immobilie verkaufen",
    href: "/verkaufen",
  },
] as const;

/**
 * Leistungen, wie sie der bisherige Auftritt unter „Dienstleistungen“
 * beschreibt — Wortlaut übernommen.
 *
 * Bewusst andere Dreiteilung als `services` weiter oben: dort stehen die
 * Seiten, auf die verlinkt wird (Bewertung, Verkauf), hier das,
 * was Silke Abelen selbst über ihre Arbeit geschrieben hat.
 */
type Dienstleistung = {
  number: string;
  title: string;
  icon: "search" | "home" | "network";
  body: string;
  /** Fehlt, wo es keine eigene Seite gibt — „Netzwerk“ ist Beschreibung, kein Angebot. */
  href?: string;
  cta?: string;
};

export const dienstleistungen: Dienstleistung[] = [
  {
    number: "01",
    title: "Immobiliensuche",
    icon: "search",
    body: "Der Kauf einer Immobilie ist für die meisten Menschen die größte Investition ihres Lebens – und dabei können leicht Fehler passieren. Die Folgen sind oft langfristig und schwer zu korrigieren. Eine umfassende Vorbereitung ist daher unerlässlich: Der Marktwert sollte realistisch eingeschätzt, alle Folgekosten wie Umbau- und Sanierungsmaßnahmen berücksichtigt sowie Finanzierungen und Bankkonditionen sorgfältig zusammengestellt und verglichen werden. Im Mittelpunkt stehen dabei Ihre Interessen — damit Sie Ihr Traumhaus oder Ihre Traumwohnung zu einem fairen Preis finden und erfolgreich erwerben können.",
    href: "/kaufen",
    cta: "Für Käufer",
  },
  {
    number: "02",
    title: "Beratung und Bewertung",
    icon: "home",
    body: "Fundierte Beratung und Bewertung helfen Ihnen, die bestmöglichen Entscheidungen zu treffen. Bei der Bewertung wird der Verkehrswert (Marktwert) Ihrer Immobilie ermittelt. Nutzen Sie die Gelegenheit, sich unkompliziert über das Potenzial Ihrer Immobilie klar zu werden — eine kurze Nachricht genügt.",
    href: "/bewertung",
    cta: "Immobilie bewerten",
  },
  {
    number: "03",
    title: "Netzwerk",
    icon: "network",
    body: "Ein starkes Netzwerk ist unerlässlich. Dank enger Zusammenarbeit mit lokalen Notaren, Finanzierungsexperten, Energieberatern, Haushaltsauflösern, Umzugsunternehmen und Fachleuten für Immobilienbewertung lassen sich nahezu alle Fragen zuverlässig für Sie klären.",
  },
];

/**
 * Leistungen für Käuferinnen und Käufer sowie für Verkäuferinnen und
 * Verkäufer — Bezeichnungen und Reihenfolge wörtlich vom bisherigen
 * Auftritt, Seite „Für Käufer & Verkäufer“.
 */
export const fuerKaeufer = [
  "Interessentenkartei",
  "Vorauswahl von Objekten",
  "Schlüsselübergabe",
  "Besichtigungstermine",
  "Wertmitteilung",
  "Regionales Netzwerk",
] as const;

export const fuerVerkaeufer = [
  "Immobilienbewertung",
  "Fachdienliche Vermarktung",
  "Fotografie & Exposé",
  "Regionales Netzwerk",
  "Inserate",
  "Diskrete Vermittlung",
  "Open-House-Besichtigungen",
  "Koordinierung Notartermin",
  "Vermittlung Energieausweis",
  "Prüfung Finanzierungsnachweis",
  "Nach dem Verkauf",
] as const;
