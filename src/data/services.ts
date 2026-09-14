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
      "Wir begleiten Sie von der ersten Beratung bis zum erfolgreichen Verkauf Ihrer Immobilie.",
    cta: "Immobilie verkaufen",
    href: "/verkaufen",
  },
  {
    number: "03",
    slug: "vermieten",
    icon: "key",
    title: "Vermietung",
    description:
      "Wir finden den passenden Mieter für Ihre Immobilie — schnell, sicher und unkompliziert.",
    cta: "Immobilie vermieten",
    href: "/vermieten",
  },
] as const;

export const whyAbelen = [
  {
    title: "Persönlich",
    description: "Direkter Kontakt und individuelle Betreuung — kein Callcenter, keine wechselnden Ansprechpartner.",
  },
  {
    title: "Erfahren",
    description: "Langjährige Erfahrung in der Immobilienvermittlung im Rheinland.",
  },
  {
    title: "Regional",
    description: "Fundierte Marktkenntnis in Leichlingen, Leverkusen, Solingen und der Region.",
  },
  {
    title: "Verlässlich",
    description: "Klare Kommunikation, feste Zusagen und schnelle Reaktionszeiten.",
  },
] as const;

/**
 * Leistungen, wie sie der bisherige Auftritt unter „Dienstleistungen“
 * beschreibt — Wortlaut übernommen.
 *
 * Bewusst andere Dreiteilung als `services` weiter oben: dort stehen die
 * Seiten, auf die verlinkt wird (Bewertung, Verkauf, Vermietung), hier das,
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
    body: "Der Kauf einer Immobilie ist für die meisten Menschen die größte Investition ihres Lebens – und dabei können leicht Fehler passieren. Die Folgen sind oft langfristig und schwer zu korrigieren. Eine umfassende Vorbereitung ist daher unerlässlich: Der Marktwert sollte realistisch eingeschätzt, alle Folgekosten wie Umbau- und Sanierungsmaßnahmen berücksichtigt sowie Finanzierungen und Bankkonditionen sorgfältig zusammengestellt und verglichen werden. Wir achten darauf, Ihre Interessen zu wahren, damit Sie Ihr Traumhaus oder Ihre Traumwohnung zu einem fairen Preis finden und erfolgreich erwerben können.",
    href: "/kaufen",
    cta: "Für Käufer",
  },
  {
    number: "02",
    title: "Beratung und Bewertung",
    icon: "home",
    body: "Wir stehen Ihnen mit fundierter Beratung und Bewertung zur Seite, um sicherzustellen, dass Sie die bestmöglichen Entscheidungen treffen. Bei der Bewertung ermitteln wir den Verkehrswert (Marktwert) Ihrer Immobilie. Nutzen Sie die Gelegenheit, sich unkompliziert über das Potenzial Ihrer Immobilie klar zu werden, und nehmen Sie Kontakt zu uns auf.",
    href: "/bewertung",
    cta: "Immobilie bewerten",
  },
  {
    number: "03",
    title: "Netzwerk",
    icon: "network",
    body: "Ein starkes Netzwerk ist unerlässlich. Durch unsere enge Zusammenarbeit mit lokalen Notaren, Finanzierungsexperten, Energieberatern, Haushaltsauflösern, Umzugsunternehmen und für Immobilienbewertung können wir nahezu alle Fragen zuverlässig für Sie klären.",
  },
];
