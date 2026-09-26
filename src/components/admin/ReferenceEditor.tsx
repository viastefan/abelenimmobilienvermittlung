"use client";

import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import type { ReferenceObject } from "@/types/reference";
import { zahlAnzeigen } from "@/lib/admin/form";
import { referenzLoeschen } from "@/app/admin/reference-actions";
import { Bestaetigen } from "./Bestaetigen";
import { Merkmale, TextMitVorschlaegen } from "./Felder";
import { Formular, Textfeld, Titelfeld, type FormularErgebnis } from "./Formular";
import { Fotos, type FotoSpeicher } from "./Fotos";
import { Sterne } from "./Sterne";
import { useToast } from "./Toast";
import { Auswahl, Feld, Karte, MitEinheit, Schalter, eingabeZeile, klassen, knopf } from "./ui";

const objektarten = ["Einfamilienhaus", "Doppelhaushälfte", "Reihenhaus", "Eigentumswohnung", "Etagenwohnung", "Mehrfamilienhaus"];

/**
 * Eine vermittelte Immobilie — der Beleg, dass Silke Abelen ihr Handwerk
 * versteht. Mit Kundenmeinung, wenn es eine gibt: sie wiegt auf der Website
 * mehr als jeder eigene Satz.
 */
export function ReferenceEditor({
  referenz,
  aktion,
  speicher,
  ordner,
}: {
  referenz?: ReferenceObject;
  aktion: (vorher: FormularErgebnis, daten: FormData) => Promise<FormularErgebnis>;
  speicher: FotoSpeicher;
  ordner: string;
}) {
  const router = useRouter();
  const zeigen = useToast();
  const meinung = referenz?.testimonial;

  return (
    <Formular aktion={aktion} neu={!referenz} speichernLabel={referenz ? "Speichern" : "Referenz anlegen"}>
      <Karte titel="Fotos" beschreibung="Das erste Foto ist das Titelbild. Zum Sortieren ziehen — oder über das Menü am Foto.">
        <Fotos name="images" anfangs={referenz?.images ?? []} ordner={ordner} speicher={speicher} />
      </Karte>

      <Karte titel="Das Wichtigste">
        <div className="grid gap-6 sm:grid-cols-2">
          <Feld label="Titel" htmlFor="title" className="sm:col-span-2">
            <Titelfeld defaultValue={referenz?.title} placeholder="z. B. 2-Zimmer-Wohnung in Haan" />
          </Feld>
          <Feld label="Ort" htmlFor="region" hinweis="Am besten mit Stadtteil — „Leverkusen – Opladen“.">
            <input id="region" name="region" required defaultValue={referenz?.region} placeholder="z. B. Leverkusen – Opladen" className={eingabeZeile} />
          </Feld>
          <Feld label="Ergebnis">
            <Auswahl
              name="category"
              label="Ergebnis"
              defaultValue={referenz?.category ?? "verkauf"}
              optionen={[
                { value: "verkauf", label: "Verkauft" },
                { value: "vermietet", label: "Vermietet" },
              ]}
            />
          </Feld>
          <Feld label="Objektart" htmlFor="type_label" className="sm:col-span-2">
            <TextMitVorschlaegen id="type_label" name="type_label" anfangs={referenz?.typeLabel} vorschlaege={objektarten} platzhalter="z. B. Etagenwohnung" />
          </Feld>
        </div>
      </Karte>

      <Karte titel="Eckdaten">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6">
          <Feld label="Wohnfläche" htmlFor="living_space">
            <MitEinheit einheit="m²">
              <input id="living_space" name="living_space" inputMode="decimal" defaultValue={zahlAnzeigen(referenz?.livingSpace)} className={klassen(eingabeZeile, "pr-12 tabular-nums")} />
            </MitEinheit>
          </Feld>
          <Feld label="Zimmer" htmlFor="rooms">
            <input id="rooms" name="rooms" inputMode="decimal" defaultValue={zahlAnzeigen(referenz?.rooms)} className={klassen(eingabeZeile, "tabular-nums")} />
          </Feld>
          <Feld label="Grundstück" htmlFor="plot" optional>
            <MitEinheit einheit="m²">
              <input id="plot" name="plot" inputMode="decimal" defaultValue={zahlAnzeigen(referenz?.plot)} className={klassen(eingabeZeile, "pr-12 tabular-nums")} />
            </MitEinheit>
          </Feld>
          <Feld label="Baujahr" htmlFor="year" optional>
            <input id="year" name="year" inputMode="numeric" maxLength={4} defaultValue={referenz?.year ?? ""} className={klassen(eingabeZeile, "tabular-nums")} />
          </Feld>
          <Feld label="Stellplätze" htmlFor="parking" optional>
            <input id="parking" name="parking" inputMode="numeric" defaultValue={referenz?.parking ?? ""} className={klassen(eingabeZeile, "tabular-nums")} />
          </Feld>
        </div>
      </Karte>

      <Karte titel="Beschreibung">
        <div className="space-y-6">
          <Feld label="Kurzbeschreibung" htmlFor="summary" hinweis="Ein, zwei Sätze. Stehen auf der Karte der Referenz.">
            <Textfeld id="summary" name="summary" required minZeilen={2} defaultValue={referenz?.summary} />
          </Feld>
          <Feld label="Objektbeschreibung" htmlFor="description" hinweis="Jeder Absatz in einer eigenen Zeile.">
            <Textfeld id="description" name="description" minZeilen={5} defaultValue={referenz?.description.join("\n\n")} />
          </Feld>
          <Feld label="Lage" htmlFor="location">
            <Textfeld id="location" name="location" minZeilen={3} defaultValue={referenz?.location} />
          </Feld>
        </div>
      </Karte>

      <Karte titel="Ausstattung">
        <Merkmale name="equipment" anfangs={referenz?.equipment ?? []} vorschlaege={["Einbauküche", "Balkon", "Garten", "Keller", "Aufzug", "Stellplatz"]} />
      </Karte>

      <Karte titel="Kundenmeinung" beschreibung="Was die Eigentümer über die Zusammenarbeit sagen. Ohne Zitat erscheint keine.">
        <div className="space-y-6">
          <Feld label="Zitat" htmlFor="meinung_zitat">
            <Textfeld
              id="meinung_zitat"
              name="meinung_zitat"
              minZeilen={3}
              defaultValue={meinung?.quote}
              placeholder="„Kompetent, zuverlässig und immer erreichbar …“"
              className="text-[1rem] italic"
            />
          </Feld>
          <div className="grid gap-6 sm:grid-cols-2">
            <Feld label="Bewertung">
              <Sterne name="meinung_sterne" anfangs={meinung?.rating} />
            </Feld>
            <Feld label="Kurzurteil" htmlFor="meinung_urteil" optional>
              <TextMitVorschlaegen id="meinung_urteil" name="meinung_urteil" anfangs={meinung?.label} vorschlaege={["Exzellent", "Sehr gut", "Gut"]} />
            </Feld>
          </div>
          <div className="border-t border-border pt-5">
            <Schalter name="meinung_empfehlung" label="Würde Sie weiterempfehlen" defaultChecked={meinung?.recommend ?? true} />
          </div>
        </div>
      </Karte>

      <Karte titel="Sichtbarkeit">
        <Schalter
          name="published"
          label="Auf der Website zeigen"
          beschreibung="Solange das aus ist, sehen nur Sie die Referenz — hier in der App."
          defaultChecked={referenz?.published ?? true}
        />
      </Karte>

      {referenz && (
        <div className="flex justify-center pt-4">
          <Bestaetigen
            titel="Referenz löschen?"
            text={<>„{referenz.title}“ verschwindet von der Website und aus der App, mit allen Fotos und der Kundenmeinung.</>}
            bestaetigen="Endgültig löschen"
            aktion={async () => {
              await referenzLoeschen(referenz.id);
              zeigen("Die Referenz wurde gelöscht.");
              router.push("/admin/referenzen");
            }}
            ausloeser={(oeffnen) => (
              <button type="button" onClick={oeffnen} className={knopf.gefahr}>
                <Trash2 className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
                Referenz löschen
              </button>
            )}
          />
        </div>
      )}
    </Formular>
  );
}
