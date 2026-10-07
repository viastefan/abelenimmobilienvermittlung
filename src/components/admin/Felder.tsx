"use client";

import { useRef, useState } from "react";
import { Plus, X } from "lucide-react";
import { useGeaendert } from "./Formular";
import { eingabeKompakt, eingabeZeile, klassen } from "./ui";
import { preisAnzeigen } from "@/lib/admin/form";

/**
 * Kaufpreis mit Tausenderpunkten, während man tippt: aus „395000“ wird
 * „395.000“. Große Zahlen ohne Gliederung verliest man leicht um eine
 * Stelle — beim Preis einer Immobilie sind das Hunderttausende.
 */
export function Preisfeld({ name, wert, id, required }: { name: string; wert?: number; id?: string; required?: boolean }) {
  const [text, setText] = useState(preisAnzeigen(wert));

  return (
    <div className="relative">
      <input
        id={id}
        name={name}
        inputMode="numeric"
        autoComplete="off"
        required={required}
        value={text}
        onChange={(event) => {
          const ziffern = event.target.value.replace(/\D/g, "").replace(/^0+/, "").slice(0, 10);
          setText(ziffern ? preisAnzeigen(Number(ziffern)) : "");
        }}
        placeholder="0"
        className={klassen(eingabeZeile, "pr-12 font-display text-[1.125rem] font-bold tabular-nums tracking-[-0.01em]")}
      />
      <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-[1rem] font-semibold text-text-subtle">
        €
      </span>
    </div>
  );
}

/**
 * Ausstattung als Liste kleiner Marken. Ein Merkmal eintippen, Eingabe —
 * es steht da. Antippen des Kreuzes nimmt es wieder heraus. Vorschläge
 * darunter ersparen das Tippen des Üblichen.
 */
export function Merkmale({
  name,
  anfangs,
  vorschlaege = [],
  platzhalter = "Merkmal hinzufügen",
}: {
  name: string;
  anfangs: string[];
  vorschlaege?: string[];
  platzhalter?: string;
}) {
  const [liste, setListe] = useState(anfangs);
  const [neu, setNeu] = useState("");
  const feld = useRef<HTMLInputElement>(null);
  const geaendert = useGeaendert();

  function hinzufuegen(text: string) {
    const sauber = text.trim().replace(/\s+/g, " ");
    if (!sauber) return;
    if (!liste.some((eintrag) => eintrag.toLowerCase() === sauber.toLowerCase())) {
      setListe((jetzt) => [...jetzt, sauber]);
      geaendert();
    }
    setNeu("");
  }

  const offen = vorschlaege.filter((vorschlag) => !liste.some((eintrag) => eintrag.toLowerCase() === vorschlag.toLowerCase()));

  return (
    <div>
      {liste.map((eintrag) => (
        <input key={eintrag} type="hidden" name={name} value={eintrag} />
      ))}

      {liste.length > 0 && (
        <ul className="mb-4 flex flex-wrap gap-2">
          {liste.map((eintrag) => (
            <li
              key={eintrag}
              className="inline-flex items-center gap-1 rounded-full bg-accent-soft py-1.5 pl-3.5 pr-1.5 text-[0.9375rem] font-medium text-ink ring-1 ring-inset ring-accent-light/60"
            >
              {eintrag}
              <button
                type="button"
                aria-label={`„${eintrag}“ entfernen`}
                onClick={() => {
                  setListe((jetzt) => jetzt.filter((wert) => wert !== eintrag));
                  geaendert();
                }}
                className="flex h-6 w-6 items-center justify-center rounded-full text-accent-dark transition-colors hover:bg-white hover:text-ink"
              >
                <X className="h-3.5 w-3.5" strokeWidth={2.4} aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="flex gap-2">
        <input
          ref={feld}
          value={neu}
          onChange={(event) => {
            // Erst ein hinzugefügtes Merkmal ist eine Änderung, nicht das Tippen.
            event.stopPropagation();
            const text = event.target.value;
            if (text.endsWith(",")) hinzufuegen(text.slice(0, -1));
            else setNeu(text);
          }}
          onInput={(event) => event.stopPropagation()}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              hinzufuegen(neu);
            }
          }}
          onBlur={() => hinzufuegen(neu)}
          placeholder={platzhalter}
          className={eingabeZeile}
          // Das Feld selbst gehört nicht ins Formular — nur die Marken darüber.
          form="__kein_formular__"
        />
        <button
          type="button"
          onClick={() => {
            hinzufuegen(neu);
            feld.current?.focus();
          }}
          aria-label="Hinzufügen"
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] bg-ink text-white transition-colors hover:bg-ink-soft active:scale-95"
        >
          <Plus className="h-5 w-5" strokeWidth={2.2} aria-hidden="true" />
        </button>
      </div>

      {offen.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {offen.map((vorschlag) => (
            <button
              key={vorschlag}
              type="button"
              onClick={() => hinzufuegen(vorschlag)}
              className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-border-strong px-3 py-1.5 text-[0.875rem] font-medium text-text-muted transition-colors hover:border-solid hover:bg-surface-cool hover:text-ink"
            >
              <Plus className="h-3.5 w-3.5" strokeWidth={2.2} aria-hidden="true" />
              {vorschlag}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

type Angabe = { schluessel: number; label: string; value: string };

/** „Stellplätze“ deckt den Vorschlag „Stellplatz“ ab, „Balkone“ den „Balkon“. */
function gleicheAngabe(a: string, b: string) {
  const grund = (text: string) =>
    text.trim().toLowerCase().replace(/ä/g, "a").replace(/ö/g, "o").replace(/ü/g, "u").replace(/ß/g, "ss");
  const [x, y] = [grund(a), grund(b)];
  return x !== "" && y !== "" && (x.startsWith(y) || y.startsWith(x));
}

/**
 * Weitere Eckdaten als Paare aus Bezeichnung und Angabe — „Grundstück:
 * ca. 373 m²“, „Stellplatz: 15.000 € zusätzlich“. Die üblichen stehen als
 * Vorschläge bereit; ein Antippen legt die Zeile an und setzt den Cursor
 * gleich in das Feld für die Angabe.
 */
export function WeitereAngaben({
  labelName,
  wertName,
  anfangs,
  vorschlaege,
}: {
  labelName: string;
  wertName: string;
  anfangs: { label: string; value: string }[];
  vorschlaege: { label: string; beispiel: string }[];
}) {
  const zaehler = useRef(anfangs.length);
  const [zeilen, setZeilen] = useState<Angabe[]>(anfangs.map((eintrag, index) => ({ schluessel: index, ...eintrag })));
  const geaendert = useGeaendert();
  const rahmen = useRef<HTMLDivElement>(null);

  function anlegen(label = "") {
    const schluessel = zaehler.current++;
    setZeilen((jetzt) => [...jetzt, { schluessel, label, value: "" }]);
    geaendert();
    // Nach dem Zeichnen: Fokus in die neue Zeile — auf die Angabe, wenn die Bezeichnung schon steht.
    requestAnimationFrame(() => {
      const ziel = rahmen.current?.querySelector<HTMLInputElement>(
        `[data-zeile="${schluessel}"] input[name="${label ? wertName : labelName}"]`
      );
      ziel?.focus();
    });
  }

  const offen = vorschlaege.filter((vorschlag) => !zeilen.some((zeile) => gleicheAngabe(zeile.label, vorschlag.label)));

  return (
    <div ref={rahmen}>
      {zeilen.length > 0 && (
        <ul className="mb-4 space-y-2.5">
          {zeilen.map((zeile) => {
            const beispiel = vorschlaege.find((vorschlag) => gleicheAngabe(vorschlag.label, zeile.label));
            return (
              <li
                key={zeile.schluessel}
                data-zeile={zeile.schluessel}
                className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)_2.25rem] items-center gap-2 sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)_2.5rem]"
              >
                <input
                  name={labelName}
                  defaultValue={zeile.label}
                  onChange={(event) => {
                    const label = event.target.value;
                    setZeilen((jetzt) => jetzt.map((eintrag) => (eintrag.schluessel === zeile.schluessel ? { ...eintrag, label } : eintrag)));
                  }}
                  placeholder="Bezeichnung"
                  aria-label="Bezeichnung"
                  className={klassen(eingabeKompakt, "font-medium")}
                />
                <input
                  name={wertName}
                  defaultValue={zeile.value}
                  placeholder={beispiel?.beispiel ?? "Angabe"}
                  aria-label="Angabe"
                  className={eingabeKompakt}
                />
                <button
                  type="button"
                  aria-label="Zeile entfernen"
                  onClick={() => {
                    setZeilen((jetzt) => jetzt.filter((eintrag) => eintrag.schluessel !== zeile.schluessel));
                    geaendert();
                  }}
                  className="flex h-12 w-full items-center justify-center rounded-[12px] text-text-subtle transition-colors hover:bg-warning-soft hover:text-warning"
                >
                  <X className="h-4 w-4" strokeWidth={2.2} aria-hidden="true" />
                </button>
              </li>
            );
          })}
        </ul>
      )}

      <div className="flex flex-wrap gap-2">
        {offen.map((vorschlag) => (
          <button
            key={vorschlag.label}
            type="button"
            onClick={() => anlegen(vorschlag.label)}
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[0.875rem] font-medium text-text-muted ring-1 ring-inset ring-border-strong transition-colors hover:bg-surface-cool hover:text-ink"
          >
            <Plus className="h-3.5 w-3.5" strokeWidth={2.2} aria-hidden="true" />
            {vorschlag.label}
          </button>
        ))}
        <button
          type="button"
          onClick={() => anlegen()}
          className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[0.875rem] font-semibold text-accent-deep transition-colors hover:bg-accent-soft"
        >
          <Plus className="h-3.5 w-3.5" strokeWidth={2.2} aria-hidden="true" />
          Eigene Angabe
        </button>
      </div>
    </div>
  );
}

/**
 * Freies Textfeld mit den üblichen Antworten darunter — antippen genügt,
 * Eigenes tippen geht immer.
 */
export function TextMitVorschlaegen({
  name,
  id,
  anfangs = "",
  vorschlaege,
  platzhalter,
}: {
  name: string;
  id?: string;
  anfangs?: string;
  vorschlaege: string[];
  platzhalter?: string;
}) {
  const [wert, setWert] = useState(anfangs);
  const geaendert = useGeaendert();

  return (
    <div>
      <input id={id} name={name} value={wert} onChange={(event) => setWert(event.target.value)} placeholder={platzhalter} className={eingabeZeile} />
      <div className="mt-2.5 flex flex-wrap gap-1.5">
        {vorschlaege.map((vorschlag) => (
          <button
            key={vorschlag}
            type="button"
            onClick={() => {
              setWert(vorschlag);
              geaendert();
            }}
            className={klassen(
              "rounded-full px-3 py-1 text-[0.8125rem] font-medium transition-colors",
              wert === vorschlag ? "bg-ink text-white" : "text-text-muted ring-1 ring-inset ring-border hover:bg-surface-cool hover:text-ink"
            )}
          >
            {vorschlag}
          </button>
        ))}
      </div>
    </div>
  );
}
