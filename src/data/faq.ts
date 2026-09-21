export type FaqItem = {
  question: string;
  answer: string;
};

/**
 * Fachliche Inhalte zu Bewertung und Verkauf.
 *
 * Bewusst ohne Angaben, die sich häufig ändern (Steuersätze, Provisionshöhen)
 * oder die nur das Büro selbst kennt. Wo auf Gesetze verwiesen wird, ist die
 * Fundstelle genannt, damit sich jede Aussage nachprüfen lässt.
 */

export const bewertungFaq: FaqItem[] = [
  {
    question: "Was kostet eine Immobilienbewertung?",
    answer:
      "Eine erste Einschätzung im Rahmen eines persönlichen Gesprächs ist unverbindlich. Ein förmliches Wertgutachten, etwa für eine Erbauseinandersetzung oder ein Gerichtsverfahren, ist eine eigene Leistung — dazu beraten wir Sie im Einzelfall.",
  },
  {
    question: "Wie lange dauert die Bewertung?",
    answer:
      "Nach der Erstbesichtigung und der Erfassung aller relevanten Objektinformationen erhalten Sie die Marktpreiseinschätzung in der Regel innerhalb einer Woche.",
  },
  {
    question: "Welche Unterlagen werden für die Bewertung benötigt?",
    answer:
      "Hilfreich sind Grundbuchauszug, Flurkarte, Grundrisse, Wohn- und Nutzflächenberechnung sowie der Energieausweis. Bei Eigentumswohnungen kommen Teilungserklärung, Wirtschaftsplan und die Protokolle der letzten Eigentümerversammlungen dazu. Fehlt etwas, unterstützen wir bei der Beschaffung.",
  },
  {
    question: "Nach welchem Verfahren wird bewertet?",
    answer:
      "Je nach Objektart nach dem Vergleichswert-, Ertragswert- oder Sachwertverfahren. Die Verfahren sind in der Immobilienwertermittlungsverordnung (ImmoWertV) geregelt; welches im Einzelfall trägt, hängt von Nutzung und Datenlage ab.",
  },
  {
    question: "Bin ich nach der Bewertung zu etwas verpflichtet?",
    answer:
      "Nein. Die Einschätzung ist eine Entscheidungsgrundlage — ob und wann Sie verkaufen, entscheiden allein Sie.",
  },
];

export const verkaufenFaq: FaqItem[] = [
  {
    question: "Wie lange dauert ein Immobilienverkauf?",
    answer:
      "Das hängt von Lage, Objektart und vor allem vom Angebotspreis ab. Ein realistisch angesetzter Preis verkürzt die Vermarktungsdauer deutlich — überhöhte Preise führen meist zu monatelangen Preisrunden und am Ende zu einem schlechteren Ergebnis.",
  },
  {
    question: "Wer zahlt die Maklerprovision?",
    answer:
      "Beim Verkauf von Einfamilienhäusern und Eigentumswohnungen an Verbraucher teilen sich Verkäufer und Käufer die Provision zu gleichen Teilen; die Käuferseite muss nie mehr tragen als die Verkäuferseite (§ 656c BGB, geltend seit Dezember 2020). Die Höhe wird individuell vereinbart und vorab schriftlich festgehalten.",
  },
  {
    question: "Brauche ich einen Energieausweis?",
    answer:
      "Ja. Der Energieausweis muss Interessenten spätestens bei der Besichtigung unaufgefordert vorgelegt und beim Verkauf übergeben werden; die Pflichtangaben daraus gehören bereits in die Anzeige (§ 80 Gebäudeenergiegesetz). Ist keiner vorhanden, kümmern wir uns rechtzeitig darum.",
  },
  {
    question: "Kann ich verkaufen, wenn die Immobilie vermietet ist?",
    answer:
      "Ja. Das Mietverhältnis geht auf den Käufer über — „Kauf bricht nicht Miete“ (§ 566 BGB). Vermietete Objekte sprechen vor allem Kapitalanleger an; die Vermarktung wird entsprechend anders aufgesetzt.",
  },
  {
    question: "Was passiert beim Notartermin?",
    answer:
      "Der Notar verliest den Kaufvertrag vollständig und beurkundet ihn. Der Entwurf muss Verbrauchern mindestens zwei Wochen vorher vorliegen. Anschließend veranlasst der Notar Auflassungsvormerkung, Lastenfreistellung und Eigentumsumschreibung — die Schlüsselübergabe erfolgt üblicherweise nach vollständiger Kaufpreiszahlung.",
  },
];

export const faqDisclaimer =
  "Die Angaben auf dieser Seite dienen der allgemeinen Orientierung und ersetzen keine Rechts- oder Steuerberatung im Einzelfall.";

/** Unterlagen, die für einen Verkauf zusammengestellt werden. */
/**
 * Die Unterlagen, gruppiert wie auf dem bisherigen Auftritt: was für jedes
 * Objekt gilt, was bei Wohnungs- und Teileigentum dazukommt, und was bei
 * den Städten angefordert werden muss. Wortlaut und Reihenfolge sind von
 * dort übernommen.
 */
export const verkaufsUnterlagen = [
  {
    title: "Grundlegende Dokumente",
    lead: "Für jeden Immobilienverkauf werden bestimmte Basisunterlagen benötigt. Sie bilden die Grundlage für die Bewertung der Immobilie und die rechtliche Absicherung des Verkaufs.",
    items: [
      "Grundbuchauszüge Abt. I und II (Eigentumsverhältnisse & Belastungen)",
      "Grundrisse des Gebäudes",
      "Baubeschreibungen",
      "Wohnflächenberechnung bzw. umbauter Raum",
      "Baugenehmigungen aller baulichen Anlagen (soweit vorhanden)",
      "Energieausweis",
      "ggf. Denkmalschutzauskunft",
      "Kopie der Gebäudeversicherung",
      "ggf. Mietverträge (bei vermieteten Objekten)",
      "Auflistung der Modernisierungsmaßnahmen",
      "Informationen zu bekannten Mängeln oder Schäden",
    ],
  },
  {
    title: "Unterlagen bei Wohnungs- oder Teileigentum",
    lead: "Wenn Sie eine Eigentumswohnung oder ein Teileigentum verkaufen möchten, sind zusätzliche Unterlagen erforderlich, die Auskunft über die Eigentümergemeinschaft geben.",
    items: [
      "Nebenkostenabrechnung",
      "Teilungserklärung",
      "Aufteilungspläne",
      "Abgeschlossenheitsbescheinigung",
      "Kontaktdaten der Hausverwaltung",
      "Protokolle der Eigentümerversammlungen (der letzten drei Jahre)",
      "Wirtschaftsplan",
      "Informationen zur Instandhaltungsrücklage",
    ],
  },
  {
    title: "Unterlagenanforderung bei den Städten",
    lead: "Zusätzlich werden verschiedene behördliche Auskünfte benötigt, die in der Regel direkt bei den Städten oder Gemeinden angefordert werden.",
    items: [
      "Auszug aus der Liegenschaftskarte (Flurkarte)",
      "Auskunft aus dem Baulastenverzeichnis",
      "Auskunft aus dem Altlastenkataster",
      "Informationen zu Anliegerbeiträgen (z. B. Erschließungs- und Kanalanschlussgebühren)",
      "Auskunft zur Wohnungsbindung (Belegungs- und Mietbindung)",
      "ggf. Denkmalschutzauskunft",
      "Einsicht in die Bauakte",
    ],
  },
];

/** Die drei Verfahren der Immobilienwertermittlungsverordnung. */
export const wertermittlungsverfahren = [
  {
    name: "Vergleichswertverfahren",
    lead: "Für Häuser und Eigentumswohnungen zur Eigennutzung",
    description:
      "Der Wert wird aus tatsächlich erzielten Kaufpreisen vergleichbarer Objekte abgeleitet — gleiche Lage, ähnlicher Zuschnitt, ähnlicher Zustand. Wo genug Vergleichsfälle vorliegen, ist das die belastbarste Grundlage.",
  },
  {
    name: "Ertragswertverfahren",
    lead: "Für Mehrfamilienhäuser und Kapitalanlagen",
    description:
      "Maßgeblich ist der nachhaltig erzielbare Ertrag: Jahresrohertrag abzüglich Bewirtschaftungskosten, kapitalisiert über den Liegenschaftszinssatz und die Restnutzungsdauer. Käufer rechnen hier mit Rendite, nicht mit Wohngefühl.",
  },
  {
    name: "Sachwertverfahren",
    lead: "Wenn Vergleichsfälle und Erträge fehlen",
    description:
      "Bodenwert plus Herstellungswert der baulichen Anlagen, gemindert um Alterswertminderung. Angewandt vor allem bei besonderen Objekten, für die sich kein tragfähiger Markt- oder Ertragsvergleich bilden lässt.",
  },
];

/**
 * Wo die einzelnen Unterlagen herkommen. Bewusst nur Stellen, die für jede
 * Immobilie dieselben sind — konkrete Gebühren und Bearbeitungszeiten
 * unterscheiden sich je Kommune und stehen deshalb hier nicht.
 */
export const unterlagenQuellen = [
  {
    dokument: "Grundbuchauszug",
    quelle: "Grundbuchamt beim zuständigen Amtsgericht",
    hinweis: "Nur Eigentümer und Berechtigte mit berechtigtem Interesse erhalten Einsicht.",
  },
  {
    dokument: "Flurkarte / Lageplan",
    quelle: "Katasteramt beziehungsweise Amt für Geoinformation",
    hinweis: "Zeigt Zuschnitt und Lage des Grundstücks.",
  },
  {
    dokument: "Grundrisse und Baupläne",
    quelle: "Bauakte beim Bauordnungsamt der Stadt",
    hinweis: "Liegt die Bauakte nicht mehr vor, lassen sich Grundrisse neu aufmessen.",
  },
  {
    dokument: "Wohn- und Nutzflächenberechnung",
    quelle: "Bauunterlagen — oder neu erstellen lassen",
    hinweis: "Die Fläche ist ein wertbildender Faktor; eine veraltete Angabe führt später zu Streit.",
  },
  {
    dokument: "Energieausweis",
    quelle: "Ausstellungsberechtigte nach § 88 GEG",
    hinweis: "Muss spätestens bei der Besichtigung vorgelegt werden (§ 80 Abs. 3 GEG).",
  },
  {
    dokument: "Teilungserklärung, Protokolle, Hausgeldabrechnung",
    quelle: "Hausverwaltung der Eigentümergemeinschaft",
    hinweis: "Bei Eigentumswohnungen der wichtigste Unterlagenblock für Kaufinteressenten.",
  },
] as const;
