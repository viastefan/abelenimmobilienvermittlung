"use client";

import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import type { Property } from "@/types/property";
import { energieLesen, leereEnergieangaben } from "@/lib/admin/energie";
import { zahlAnzeigen } from "@/lib/admin/form";
import { objektLoeschen } from "@/app/admin/actions";
import { Bestaetigen } from "./Bestaetigen";
import { EnergieFelder } from "./EnergieFelder";
import { Merkmale, Preisfeld, WeitereAngaben } from "./Felder";
import { Formular, Textfeld, Titelfeld, type FormularErgebnis } from "./Formular";
import { Fotos, type FotoSpeicher } from "./Fotos";
import { useToast } from "./Toast";
import { Auswahl, Feld, Karte, MitEinheit, Schalter, eingabeZeile, klassen, knopf, objektStatus } from "./ui";

const angabeVorschlaege = [
  { label: "Grundstück", beispiel: "z. B. ca. 373 m²" },
  { label: "Stellplatz", beispiel: "z. B. 15.000 € zusätzlich" },
  { label: "Balkon", beispiel: "z. B. Süd" },
  { label: "Terrasse", beispiel: "z. B. ca. 20 m²" },
  { label: "Garten", beispiel: "z. B. ca. 200 m²" },
  { label: "Baujahr", beispiel: "z. B. 1998" },
  { label: "Etage", beispiel: "z. B. 2. OG von 4" },
  { label: "Bezugsfrei ab", beispiel: "z. B. sofort" },
];

const ausstattungVorschlaege = [
  "Einbauküche",
  "Balkon",
  "Terrasse",
  "Garten",
  "Keller",
  "Aufzug",
  "Gäste-WC",
  "Fußbodenheizung",
  "Stellplatz",
  "Garage",
];

/**
 * Ein Objekt anlegen oder bearbeiten — alles auf einer Seite, von oben nach
 * unten in der Reihenfolge, in der man ein Exposé liest.
 */
export function PropertyEditor({
  objekt,
  aktion,
  speicher,
  ordner,
}: {
  objekt?: Property;
  aktion: (vorher: FormularErgebnis, daten: FormData) => Promise<FormularErgebnis>;
  speicher: FotoSpeicher;
  ordner: string;
}) {
  const router = useRouter();
  const zeigen = useToast();

  return (
    <Formular aktion={aktion} neu={!objekt} speichernLabel={objekt ? "Speichern" : "Objekt anlegen"}>
      <Karte titel="Fotos" beschreibung="Das erste Foto ist das Titelbild. Zum Sortieren ziehen — oder über das Menü am Foto.">
        <Fotos name="images" anfangs={objekt?.images ?? []} ordner={ordner} speicher={speicher} />
      </Karte>

      <Karte titel="Das Wichtigste">
        <div className="grid gap-6 sm:grid-cols-2">
          <Feld label="Titel" htmlFor="title" className="sm:col-span-2" hinweis="So steht das Objekt über dem Exposé und auf der Karte.">
            <Titelfeld defaultValue={objekt?.title} placeholder="z. B. Helle Doppelhaushälfte mit Garten" />
          </Feld>
          <Feld label="Ort" htmlFor="city">
            <input id="city" name="city" required defaultValue={objekt?.city} placeholder="z. B. Leverkusen-Opladen" className={eingabeZeile} />
          </Feld>
          <Feld label="Kaufpreis" htmlFor="price">
            <Preisfeld id="price" name="price" wert={objekt?.price} required />
          </Feld>
          <Feld label="Stand" className="sm:col-span-2">
            <Auswahl
              name="status"
              label="Stand"
              defaultValue={objekt?.status ?? "zu-verkaufen"}
              optionen={(["zu-verkaufen", "reserviert", "verkauft"] as const).map((wert) => ({
                value: wert,
                label: objektStatus[wert].label,
                punkt: objektStatus[wert].punkt,
              }))}
            />
          </Feld>
          <Feld
            label="Ergänzung zum Preis"
            htmlFor="hero_note"
            optional
            className="sm:col-span-2"
            hinweis="Steht klein neben dem Knopf „Besichtigung anfragen“."
          >
            <input
              id="hero_note"
              name="hero_note"
              defaultValue={objekt?.heroNote}
              placeholder="z. B. Stellplatz optional für 15.000 €"
              className={eingabeZeile}
            />
          </Feld>
        </div>
      </Karte>

      <Karte titel="Eckdaten" beschreibung="Wohnfläche und Zimmer stehen groß im Exposé, alles Weitere in der Liste darunter.">
        <div className="grid grid-cols-2 gap-4 sm:gap-6">
          <Feld label="Wohnfläche" htmlFor="living_space">
            <MitEinheit einheit="m²">
              <input
                id="living_space"
                name="living_space"
                inputMode="decimal"
                defaultValue={zahlAnzeigen(objekt?.livingSpace)}
                placeholder="z. B. 120"
                className={klassen(eingabeZeile, "pr-12 tabular-nums")}
              />
            </MitEinheit>
          </Feld>
          <Feld label="Zimmer" htmlFor="rooms">
            <input
              id="rooms"
              name="rooms"
              inputMode="decimal"
              defaultValue={zahlAnzeigen(objekt?.rooms)}
              placeholder="z. B. 3,5"
              className={klassen(eingabeZeile, "tabular-nums")}
            />
          </Feld>
        </div>

        <div className="mt-7 border-t border-border pt-6">
          <p className="mb-3 text-[0.875rem] font-semibold text-ink">Weitere Angaben</p>
          <WeitereAngaben
            labelName="angabe_label"
            wertName="angabe_wert"
            anfangs={(objekt?.features ?? []).filter((eintrag) => !/^(wohnfläche|zimmer)$/i.test(eintrag.label.trim()))}
            vorschlaege={angabeVorschlaege}
          />
        </div>
      </Karte>

      <Karte titel="Beschreibung">
        <div className="space-y-6">
          <Feld label="Kurzbeschreibung" htmlFor="summary" hinweis="Ein, zwei Sätze. Stehen auf der Karte in der Übersicht und neben dem Preis.">
            <Textfeld id="summary" name="summary" required minZeilen={2} defaultValue={objekt?.summary} />
          </Feld>
          <Feld label="Objektbeschreibung" htmlFor="description" hinweis="Jeder Absatz in einer eigenen Zeile.">
            <Textfeld id="description" name="description" minZeilen={6} defaultValue={objekt?.description.join("\n\n")} />
          </Feld>
          <Feld label="Lage" htmlFor="location">
            <Textfeld
              id="location"
              name="location"
              minZeilen={3}
              defaultValue={objekt?.location}
              placeholder="Stadtteil, Nahversorgung, Schulen, Anbindung …"
            />
          </Feld>
        </div>
      </Karte>

      <Karte titel="Ausstattung" beschreibung="Erscheint auf der Website als Liste mit Häkchen.">
        <Merkmale name="equipment" anfangs={objekt?.equipment ?? []} vorschlaege={ausstattungVorschlaege} />
      </Karte>

      <Karte titel="Energieausweis" beschreibung="Diese Angaben muss eine Immobilienanzeige nennen, sobald der Ausweis vorliegt.">
        <EnergieFelder anfangs={objekt ? energieLesen(objekt.energy) : leereEnergieangaben} />
      </Karte>

      <Karte titel="Sichtbarkeit">
        <div className="divide-y divide-border">
          <div className="pb-5">
            <Schalter
              name="published"
              label="Auf der Website zeigen"
              beschreibung="Solange das aus ist, sehen nur Sie das Objekt — hier in der App."
              defaultChecked={objekt?.published ?? false}
            />
          </div>
          <div className="pt-5">
            <Schalter
              name="featured"
              label="Groß auf der Startseite"
              beschreibung="Erscheint oben unter „Aktuell zum Verkauf“, solange es nicht verkauft ist."
              defaultChecked={objekt?.featured ?? false}
            />
          </div>
        </div>
      </Karte>

      {objekt && (
        <div className="flex justify-center pt-4">
          <Bestaetigen
            titel="Objekt löschen?"
            text={<>„{objekt.title}“ verschwindet von der Website und aus der App, mit allen Fotos. Das lässt sich nicht rückgängig machen.</>}
            bestaetigen="Endgültig löschen"
            aktion={async () => {
              await objektLoeschen(objekt.id);
              zeigen("Das Objekt wurde gelöscht.");
              router.push("/admin/immobilien");
            }}
            ausloeser={(oeffnen) => (
              <button type="button" onClick={oeffnen} className={knopf.gefahr}>
                <Trash2 className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
                Objekt löschen
              </button>
            )}
          />
        </div>
      )}
    </Formular>
  );
}
