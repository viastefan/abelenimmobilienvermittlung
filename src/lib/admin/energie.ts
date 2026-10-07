/**
 * Der Energieausweis als Formular.
 *
 * Auf der Website stehen die Angaben als Liste aus Bezeichnung und Wert —
 * so liegen sie auch in der Datenbank. Wer diese Liste von Hand füllt, muss
 * die Bezeichnungen kennen, die eine Immobilienanzeige nennen muss (§ 87
 * GEG): Art des Ausweises, Kennwert, Energieträger, Baujahr, Klasse. Die App
 * fragt sie deshalb einzeln ab und schreibt daraus die Liste. Einträge, die
 * sie nicht zuordnen kann, gehen dabei nicht verloren.
 */

export type Ausweisart = "" | "bedarf" | "verbrauch" | "vorbereitung";

export type Energieangaben = {
  ausweis: Ausweisart;
  /** Endenergie in kWh/(m²·a), wie eingegeben — „123,4“. */
  kennwert: string;
  /** A+ bis H. */
  klasse: string;
  /** Wesentlicher Energieträger der Heizung — „Gas“, „Fernwärme“. */
  traeger: string;
  /** Baujahr des Gebäudes laut Ausweis. */
  baujahr: string;
  weitere: { label: string; value: string }[];
};

export const effizienzklassen = ["A+", "A", "B", "C", "D", "E", "F", "G", "H"] as const;

export const ausweisarten: { value: Exclude<Ausweisart, "">; label: string }[] = [
  { value: "bedarf", label: "Bedarfsausweis" },
  { value: "verbrauch", label: "Verbrauchsausweis" },
  { value: "vorbereitung", label: "In Vorbereitung" },
];

export const EINHEIT = "kWh/(m²·a)";

export const leereEnergieangaben: Energieangaben = {
  ausweis: "",
  kennwert: "",
  klasse: "",
  traeger: "",
  baujahr: "",
  weitere: [],
};

function ausweisAus(value: string): Ausweisart {
  const text = value.toLowerCase();
  if (text.includes("bedarf")) return "bedarf";
  if (text.includes("verbrauch")) return "verbrauch";
  if (/vorbereitung|liegt (noch )?nicht vor|in arbeit|beantragt/.test(text)) return "vorbereitung";
  return "";
}

/** Liest die gespeicherte Liste zurück ins Formular. */
export function energieLesen(liste: { label: string; value: string }[]): Energieangaben {
  const angaben: Energieangaben = { ...leereEnergieangaben, weitere: [] };

  for (const eintrag of liste) {
    const label = eintrag.label.toLowerCase();
    const value = eintrag.value.trim();

    if (!angaben.ausweis && /ausweis/.test(label) && ausweisAus(value)) {
      angaben.ausweis = ausweisAus(value);
    } else if (!angaben.kennwert && /endenergie|kennwert|energiebedarf|energieverbrauch/.test(label)) {
      angaben.kennwert = value.replace(/\s*kwh.*$/i, "").trim();
      // Die Überschrift verrät die Art, falls sie nicht eigens genannt ist.
      if (!angaben.ausweis) angaben.ausweis = /verbrauch/.test(label) ? "verbrauch" : /bedarf/.test(label) ? "bedarf" : "";
    } else if (!angaben.klasse && /klasse/.test(label)) {
      angaben.klasse = value.toUpperCase().replace(/\s/g, "");
    } else if (!angaben.traeger && /träger|traeger|heizung|befeuerung/.test(label)) {
      angaben.traeger = value;
    } else if (!angaben.baujahr && /baujahr/.test(label)) {
      angaben.baujahr = value;
    } else if (eintrag.label.trim() && value) {
      angaben.weitere.push({ label: eintrag.label.trim(), value });
    }
  }

  return angaben;
}

/** Schreibt das Formular als Liste — in der Reihenfolge, in der eine Anzeige sie nennt. */
export function energieSchreiben(angaben: Energieangaben): { label: string; value: string }[] {
  const liste: { label: string; value: string }[] = [];
  const art = ausweisarten.find((eintrag) => eintrag.value === angaben.ausweis);

  if (art) liste.push({ label: "Energieausweis", value: art.label });

  const kennwert = angaben.kennwert.trim();
  if (kennwert && angaben.ausweis !== "vorbereitung") {
    liste.push({
      label: angaben.ausweis === "verbrauch" ? "Endenergieverbrauch" : "Endenergiebedarf",
      value: `${kennwert} ${EINHEIT}`,
    });
  }

  const klasse = angaben.klasse.trim();
  if (klasse && angaben.ausweis !== "vorbereitung") liste.push({ label: "Effizienzklasse", value: klasse });

  const traeger = angaben.traeger.trim();
  if (traeger) liste.push({ label: "Energieträger", value: traeger });

  const baujahr = angaben.baujahr.trim();
  if (baujahr) liste.push({ label: "Baujahr laut Ausweis", value: baujahr });

  for (const eintrag of angaben.weitere) {
    if (eintrag.label.trim() && eintrag.value.trim()) {
      liste.push({ label: eintrag.label.trim(), value: eintrag.value.trim() });
    }
  }

  return liste;
}
