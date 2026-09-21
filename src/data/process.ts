export type Step = {
  number: string;
  title: string;
  description: string;
};

/** Ablauf einer Immobilienbewertung. */
export const valuationSteps: Step[] = [
  {
    number: "01",
    title: "Immobilie vorstellen",
    description:
      "Sie schildern uns Ihre Immobilie und Ihr Anliegen — telefonisch, per E-Mail oder über das Kontaktformular. Ganz unverbindlich.",
  },
  {
    number: "02",
    title: "Vor-Ort-Termin",
    description:
      "Wir sehen uns die Immobilie gemeinsam an: Zustand, Zuschnitt, Ausstattung und alles, was den Wert beeinflusst.",
  },
  {
    number: "03",
    title: "Marktanalyse",
    description:
      "Wir gleichen Ihre Immobilie mit aktuellen Vergleichswerten aus Leverkusen und der Region ab und sichten die relevanten Objektunterlagen.",
  },
  {
    number: "04",
    title: "Bewertung",
    description:
      "In der Regel innerhalb einer Woche nach Besichtigung und Erfassung aller relevanten Objektinformationen erhalten Sie unsere Marktpreiseinschätzung.",
  },
  {
    number: "05",
    title: "Persönliches Gespräch",
    description:
      "Wir gehen die Einschätzung gemeinsam durch — nachvollziehbar erklärt, mit Zeit für Ihre Fragen und ohne Verpflichtung.",
  },
];

/** Ablauf eines Immobilienverkaufs. */
export const sellingSteps: Step[] = [
  {
    number: "01",
    title: "Beratung",
    description: "Wir klären Ihre Ausgangslage, Ihre Ziele und den zeitlichen Rahmen — ohne Verkaufsdruck.",
  },
  {
    number: "02",
    title: "Bewertung",
    description: "Eine fundierte Marktpreiseinschätzung ist die Grundlage für einen realistischen Angebotspreis.",
  },
  {
    number: "03",
    title: "Vorbereitung",
    description: "Wir stellen alle Unterlagen zusammen, prüfen sie auf Vollständigkeit und bereiten die Präsentation vor.",
  },
  {
    number: "04",
    title: "Vermarktung",
    description: "Aussagekräftiges Exposé, Veröffentlichung auf den passenden Portalen und gezielte Ansprache vorgemerkter Interessenten.",
  },
  {
    number: "05",
    title: "Besichtigungen",
    description: "Wir begleiten jeden Termin persönlich und geben Ihnen anschließend eine ehrliche Rückmeldung.",
  },
  {
    number: "06",
    title: "Käuferauswahl",
    description: "Wir prüfen Bonität und Finanzierungsbestätigung — Sie entscheiden, an wen Sie verkaufen.",
  },
  {
    number: "07",
    title: "Abschluss",
    description: "Von der Kaufvertragsvorbereitung über den Notartermin bis zur Schlüsselübergabe bleiben wir an Ihrer Seite.",
  },
];

/** Rückwärtskompatibler Export für den allgemeinen Ablauf. */
export const processSteps = sellingSteps;
