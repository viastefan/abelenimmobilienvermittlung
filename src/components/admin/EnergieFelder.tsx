"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { useGeaendert } from "./Formular";
import { Feld, MitEinheit, eingabeZeile, klassen } from "./ui";
import { ausweisarten, effizienzklassen, EINHEIT, type Energieangaben } from "@/lib/admin/energie";

/** Die Farben des Energieausweises, von A+ (grün) bis H (rot). */
const klassenFarbe: Record<string, string> = {
  "A+": "#1A9A4B",
  A: "#4DB150",
  B: "#9DC73F",
  C: "#D7DB35",
  D: "#F5CF2E",
  E: "#F2A93B",
  F: "#EC7A32",
  G: "#E1462C",
  H: "#C22A25",
};

const traegerVorschlaege = ["Gas", "Fernwärme", "Wärmepumpe", "Öl", "Pellets", "Strom"];

/**
 * Der Energieausweis, Feld für Feld — was eine Anzeige nennen muss, fragt
 * die App einzeln ab. Steht der Ausweis noch aus, verschwinden Kennwert und
 * Klasse: es gibt sie dann nicht.
 */
export function EnergieFelder({ anfangs }: { anfangs: Energieangaben }) {
  const [ausweis, setAusweis] = useState(anfangs.ausweis);
  const [klasse, setKlasse] = useState(anfangs.klasse);
  const [traeger, setTraeger] = useState(anfangs.traeger);
  const geaendert = useGeaendert();
  const mitWerten = ausweis === "bedarf" || ausweis === "verbrauch";

  return (
    <div className="space-y-6">
      <input type="hidden" name="energie_ausweis" value={ausweis} />
      <input type="hidden" name="energie_klasse" value={mitWerten ? klasse : ""} />
      {anfangs.weitere.map((eintrag) => (
        <span key={eintrag.label}>
          <input type="hidden" name="energie_weitere_label" value={eintrag.label} />
          <input type="hidden" name="energie_weitere_wert" value={eintrag.value} />
        </span>
      ))}

      <Feld label="Art des Ausweises">
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          {ausweisarten.map((art) => {
            const gewaehlt = ausweis === art.value;
            return (
              <button
                key={art.value}
                type="button"
                aria-pressed={gewaehlt}
                onClick={() => {
                  setAusweis(gewaehlt ? "" : art.value);
                  geaendert();
                }}
                className={klassen(
                  "flex h-12 items-center justify-between gap-2 rounded-[14px] px-4 text-left text-[0.9375rem] font-semibold transition-all duration-200",
                  gewaehlt
                    ? "bg-ink text-white shadow-[0_2px_6px_rgba(11,37,69,0.2)]"
                    : "bg-white text-ink ring-1 ring-inset ring-border hover:ring-border-strong"
                )}
              >
                {art.label}
                {gewaehlt && <Check className="h-4 w-4 text-accent" strokeWidth={2.6} aria-hidden="true" />}
              </button>
            );
          })}
        </div>
      </Feld>

      {mitWerten && (
        <div className="grid gap-6 sm:grid-cols-[minmax(0,14rem)_minmax(0,1fr)]">
          <Feld label={ausweis === "verbrauch" ? "Endenergieverbrauch" : "Endenergiebedarf"} htmlFor="energie_kennwert">
            <MitEinheit einheit={EINHEIT}>
              <input
                id="energie_kennwert"
                name="energie_kennwert"
                inputMode="decimal"
                defaultValue={anfangs.kennwert}
                placeholder="z. B. 123,4"
                className={klassen(eingabeZeile, "pr-28 tabular-nums")}
              />
            </MitEinheit>
          </Feld>

          <Feld label="Effizienzklasse">
            <div className="flex flex-wrap gap-1.5" role="radiogroup" aria-label="Effizienzklasse">
              {effizienzklassen.map((wert) => {
                const gewaehlt = klasse === wert;
                return (
                  <button
                    key={wert}
                    type="button"
                    role="radio"
                    aria-checked={gewaehlt}
                    onClick={() => {
                      setKlasse(gewaehlt ? "" : wert);
                      geaendert();
                    }}
                    style={{ backgroundColor: klassenFarbe[wert] }}
                    className={klassen(
                      "relative flex h-12 min-w-[2.75rem] items-center justify-center rounded-[12px] px-2 font-display text-[0.9375rem] font-extrabold text-white transition-all duration-200 [text-shadow:0_1px_1px_rgba(0,0,0,0.25)]",
                      gewaehlt ? "scale-105 ring-2 ring-ink ring-offset-2" : klasse ? "opacity-35 hover:opacity-70" : "hover:scale-105"
                    )}
                  >
                    {wert}
                  </button>
                );
              })}
            </div>
          </Feld>
        </div>
      )}

      {ausweis !== "" && (
        <div className="grid gap-6 sm:grid-cols-[minmax(0,1fr)_minmax(0,14rem)]">
          <Feld label="Wesentlicher Energieträger" htmlFor="energie_traeger">
            <input
              id="energie_traeger"
              name="energie_traeger"
              value={traeger}
              onChange={(event) => setTraeger(event.target.value)}
              placeholder="z. B. Gas"
              className={eingabeZeile}
            />
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {traegerVorschlaege.map((vorschlag) => (
                <button
                  key={vorschlag}
                  type="button"
                  onClick={() => {
                    setTraeger(vorschlag);
                    geaendert();
                  }}
                  className={klassen(
                    "rounded-full px-3 py-1 text-[0.8125rem] font-medium transition-colors",
                    traeger === vorschlag ? "bg-ink text-white" : "text-text-muted ring-1 ring-inset ring-border hover:bg-surface-cool hover:text-ink"
                  )}
                >
                  {vorschlag}
                </button>
              ))}
            </div>
          </Feld>

          <Feld label="Baujahr laut Ausweis" htmlFor="energie_baujahr">
            <input
              id="energie_baujahr"
              name="energie_baujahr"
              inputMode="numeric"
              maxLength={4}
              defaultValue={anfangs.baujahr}
              placeholder="z. B. 1998"
              className={klassen(eingabeZeile, "tabular-nums")}
            />
          </Feld>
        </div>
      )}
    </div>
  );
}
