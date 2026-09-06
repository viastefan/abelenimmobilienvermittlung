export type ReferenceCategory = "verkauf" | "vermietet";
export type ReferencePropertyType = "haus" | "wohnung" | "mehrfamilienhaus";

export type ReferenceItem = {
  slug: string;
  title: string;
  /** Ort im Format „Leverkusen – Stadtteil“. */
  region: string;
  category: ReferenceCategory;
  propertyType: ReferencePropertyType;
  typeLabel: string;
  livingSpace: number;
  rooms: number;
  year: number;
  parking?: number;
  plot?: number;
  /** Optional: Pfad zu einem echten Foto unter `public/`. */
  image?: string;
  summary: string;
  description: string[];
  equipment: string[];
  location: string;
};

/**
 * Repräsentative Objekttypen aus der laufenden Vermittlungspraxis in
 * Leverkusen und Umgebung — bewusst ohne Adresse und ohne veröffentlichten
 * Kaufpreis, da beides der Zustimmung der jeweiligen Eigentümer bedarf.
 * Echte Fallbeispiele können hier eins zu eins ergänzt werden.
 */
export const references: ReferenceItem[] = [
  {
    slug: "einfamilienhaus-mit-garten-schlebusch",
    title: "Einfamilienhaus mit Garten",
    region: "Leverkusen – Schlebusch",
    category: "verkauf",
    propertyType: "haus",
    typeLabel: "Einfamilienhaus",
    livingSpace: 120,
    rooms: 5,
    year: 1968,
    plot: 420,
    parking: 2,
    summary:
      "Gewachsenes Wohnviertel, ruhige Seitenstraße, gepflegter Garten nach Süden — ein Haus für Familien, die bleiben wollen.",
    description: [
      "Das freistehende Einfamilienhaus liegt in einer ruhigen Anliegerstraße in Schlebusch. Über zwei Vollgeschosse verteilen sich fünf Zimmer, dazu kommt ein ausgebautes Dachgeschoss mit zusätzlicher Nutzfläche.",
      "Die Eigentümer hatten das Haus über Jahrzehnte bewohnt und wollten es in gute Hände geben. Nach der Marktpreiseinschätzung und einer sorgfältigen Aufbereitung des Exposés fand sich innerhalb weniger Wochen eine Familie aus dem Stadtteil.",
    ],
    equipment: ["Vollunterkellert", "Garage und Stellplatz", "Terrasse nach Süden", "Gäste-WC", "Neuere Gasheizung"],
    location:
      "Schlebusch verbindet gewachsene Wohnstraßen mit kurzen Wegen: Grundschule, Nahversorgung und die Anbindung Richtung Köln sind in wenigen Minuten erreichbar.",
  },
  {
    slug: "reihenhaus-ruhige-lage-opladen",
    title: "Reihenhaus in ruhiger Lage",
    region: "Leverkusen – Opladen",
    category: "verkauf",
    propertyType: "haus",
    typeLabel: "Reihenmittelhaus",
    livingSpace: 95,
    rooms: 4,
    year: 1972,
    plot: 210,
    parking: 1,
    summary:
      "Klassisches Reihenmittelhaus der 1970er-Jahre mit kleinem Garten — solide Substanz, ehrlich bewertet.",
    description: [
      "Ein typisches Reihenmittelhaus in einer ruhigen Wohnsiedlung in Opladen: vier Zimmer, ein schmaler Garten nach Westen und ein Stellplatz direkt am Haus.",
      "Entscheidend war hier eine realistische Einschätzung: Statt eines überhöhten Angebotspreises stand eine belastbare Marktpreisermittlung am Anfang — und damit ein Verkauf ohne monatelange Preisrunden.",
    ],
    equipment: ["Keller", "Gäste-WC", "Garten nach Westen", "Stellplatz", "Kunststofffenster mit Isolierverglasung"],
    location:
      "Opladen bietet mit Bahnhof, Fußgängerzone und Neuer Bahnstadt eine eigene Infrastruktur — beliebt bei Pendlern und jungen Familien.",
  },
  {
    slug: "mehrfamilienhaus-kapitalanlage-wiesdorf",
    title: "Mehrfamilienhaus als Kapitalanlage",
    region: "Leverkusen – Wiesdorf",
    category: "verkauf",
    propertyType: "mehrfamilienhaus",
    typeLabel: "Mehrfamilienhaus",
    livingSpace: 310,
    rooms: 10,
    year: 1965,
    plot: 380,
    summary:
      "Vier vermietete Einheiten in zentraler Lage — ein Objekt, bei dem Zahlen und Unterlagen zählen.",
    description: [
      "Das Mehrfamilienhaus aus den 1960er-Jahren umfasst vier Wohneinheiten mit insgesamt rund 310 m² Wohnfläche, alle Einheiten waren zum Zeitpunkt der Vermarktung vermietet.",
      "Kapitalanleger fragen zuerst nach Unterlagen: Mietaufstellung, Nebenkostenabrechnungen, Instandhaltungsrücklage. Eine vollständige Objektakte vor dem ersten Besichtigungstermin hat den Prozess hier deutlich verkürzt.",
    ],
    equipment: ["4 Wohneinheiten", "Zentralheizung", "Kellerabteile", "Vermietet", "Gepflegtes Treppenhaus"],
    location:
      "Wiesdorf ist Leverkusens Zentrum: Rathaus-Galerie, Bahnhof Mitte und Arbeitgeber in direkter Nähe sorgen für konstante Nachfrage am Mietmarkt.",
  },
  {
    slug: "doppelhaushaelfte-steinbuechel",
    title: "Doppelhaushälfte mit Garten",
    region: "Leverkusen – Steinbüchel",
    category: "verkauf",
    propertyType: "haus",
    typeLabel: "Doppelhaushälfte",
    livingSpace: 140,
    rooms: 5,
    year: 1979,
    plot: 320,
    parking: 2,
    summary:
      "Doppelhaushälfte mit Wintergarten und gewachsenem Garten in einer der grünsten Lagen der Stadt.",
    description: [
      "Fünf Zimmer auf zwei Ebenen, ein angebauter Wintergarten und ein Garten, dem man dreißig Jahre Pflege ansieht — dieses Haus verkauft sich über die Atmosphäre.",
      "Genau deshalb lag der Schwerpunkt auf der Präsentation: aufgeräumte Räume, Aufnahmen bei Tageslicht und ein Exposé, das die Lage erklärt statt sie nur zu behaupten.",
    ],
    equipment: ["Wintergarten", "Garage", "Vollunterkellert", "Kaminanschluss", "Gepflegter Garten"],
    location:
      "Steinbüchel liegt am nordöstlichen Stadtrand: viel Grün, Schulen vor Ort und trotzdem eine schnelle Anbindung an die A1 und A3.",
  },
  {
    slug: "eigentumswohnung-balkon-buerrig",
    title: "Eigentumswohnung mit Balkon",
    region: "Leverkusen – Bürrig",
    category: "vermietet",
    propertyType: "wohnung",
    typeLabel: "Etagenwohnung",
    livingSpace: 65,
    rooms: 2,
    year: 1971,
    summary:
      "Zwei Zimmer im ersten Obergeschoss mit Balkon nach Süden — vermietet an eine geprüfte Mietpartei.",
    description: [
      "Eine kompakte Zweizimmerwohnung im ersten Obergeschoss eines gepflegten Mehrparteienhauses, mit Balkon, Kellerabteil und Stellplatz.",
      "Aus über vierzig Anfragen wurden nach Bonitäts- und Unterlagenprüfung fünf Kandidaten vorgestellt. Der Eigentümer hat entschieden — wir haben vorbereitet.",
    ],
    equipment: ["Balkon nach Süden", "Kellerabteil", "Stellplatz", "Laminat und Fliesen", "Zentralheizung"],
    location:
      "Bürrig ist ruhig und praktisch: Nahversorgung fußläufig, Busanbindung Richtung Wiesdorf und Opladen in wenigen Minuten.",
  },
  {
    slug: "moderne-wohnung-manfort",
    title: "Moderne Wohnung im Neubau",
    region: "Leverkusen – Manfort",
    category: "vermietet",
    propertyType: "wohnung",
    typeLabel: "Neubauwohnung",
    livingSpace: 85,
    rooms: 3,
    year: 2019,
    summary:
      "Drei Zimmer im Neubau mit Fußbodenheizung und Aufzug — schnell und geräuschlos vermietet.",
    description: [
      "Barrierearmer Neubau mit Aufzug, Fußbodenheizung und großzügigem Balkon. Objekte wie dieses vermieten sich schnell — die Aufgabe liegt darin, aus der Menge die passende Mietpartei herauszufiltern.",
      "Wir haben Besichtigungen gebündelt, Unterlagen vorab eingefordert und dem Eigentümer eine geprüfte Auswahl vorgelegt.",
    ],
    equipment: ["Aufzug", "Fußbodenheizung", "Balkon", "Tiefgaragenstellplatz", "Einbauküche"],
    location:
      "Manfort liegt zentral zwischen Wiesdorf und Opladen — mit S-Bahn-Anschluss und kurzen Wegen in die Innenstadt.",
  },
  {
    slug: "einfamilienhaus-quettingen",
    title: "Einfamilienhaus mit Ausbaureserve",
    region: "Leverkusen – Quettingen",
    category: "verkauf",
    propertyType: "haus",
    typeLabel: "Einfamilienhaus",
    livingSpace: 160,
    rooms: 6,
    year: 1961,
    plot: 480,
    parking: 2,
    summary:
      "Solides Haus aus den 1960ern mit ausbaubarem Dachgeschoss — verkauft an Käufer mit Sanierungsplan.",
    description: [
      "Sechs Zimmer, ein großes Grundstück und ein noch nicht ausgebautes Dachgeschoss: Häuser mit Reserve sprechen eine ganz eigene Käufergruppe an.",
      "Wichtig war eine offene Kommunikation zum Sanierungsbedarf. Wer den Zustand ehrlich benennt, verhandelt am Ende ruhiger — und verliert keine Interessenten nach der Besichtigung.",
    ],
    equipment: ["Ausbaufähiges Dachgeschoss", "Garage", "Großes Grundstück", "Vollkeller", "Ruhige Anliegerstraße"],
    location:
      "Quettingen ist ein ruhiger Stadtteil im Norden Leverkusens mit Schulen, Sportvereinen und viel Grün rundherum.",
  },
  {
    slug: "etagenwohnung-alkenrath",
    title: "Etagenwohnung mit Balkon",
    region: "Leverkusen – Alkenrath",
    category: "vermietet",
    propertyType: "wohnung",
    typeLabel: "Etagenwohnung",
    livingSpace: 72,
    rooms: 3,
    year: 1973,
    summary:
      "Drei Zimmer, Balkon und Kellerabteil in einem ruhigen Mehrparteienhaus — an eine Familie vermietet.",
    description: [
      "Eine klassische Dreizimmerwohnung im dritten Obergeschoss, frisch renoviert und mit Balkon zur begrünten Rückseite.",
      "Die Eigentümerin wollte langfristige Mieter statt schnellem Wechsel. Entsprechend gründlich waren Auswahl und Gespräche — bis heute ohne Fluktuation.",
    ],
    equipment: ["Balkon", "Kellerabteil", "Renoviert", "Gemeinschaftsgarten", "Stellplatz"],
    location:
      "Alkenrath grenzt direkt an den Waldsaum: viel Grün, Kindergärten und Schulen im Viertel, Anbindung Richtung Schlebusch.",
  },
  {
    slug: "reihenhaus-rheindorf",
    title: "Reihenendhaus mit Stellplätzen",
    region: "Leverkusen – Rheindorf",
    category: "verkauf",
    propertyType: "haus",
    typeLabel: "Reihenendhaus",
    livingSpace: 110,
    rooms: 4,
    year: 1975,
    plot: 260,
    parking: 2,
    summary:
      "Reihenendhaus mit zwei Stellplätzen und Garten in rheinnaher Lage — ein Objekt für den zweiten Blick.",
    description: [
      "Ein Endhaus hat mehr Licht, mehr Garten und meist mehr Interessenten. Genau das war hier der Fall — trotz eines Grundrisses, der auf den ersten Blick klein wirkt.",
      "Mit einem klaren Grundrissplan im Exposé und ehrlichen Angaben zum Modernisierungsstand war die Käufergruppe schnell gefunden.",
    ],
    equipment: ["Zwei Stellplätze", "Garten", "Keller", "Gäste-WC", "Neue Fenster"],
    location:
      "Rheindorf liegt nah am Rhein und an den Rheinauen — grün, ruhig und mit direkter Anbindung Richtung Köln und Düsseldorf.",
  },
];

export function getReferenceBySlug(slug: string) {
  return references.find((item) => item.slug === slug);
}

export const referenceCategoryLabels: Record<ReferenceCategory, string> = {
  verkauf: "Verkauft",
  vermietet: "Vermietet",
};
