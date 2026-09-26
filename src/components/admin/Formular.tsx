"use client";

import {
  createContext,
  useActionState,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
  type TextareaHTMLAttributes,
} from "react";
import { LoaderCircle } from "lucide-react";
import { useToast } from "./Toast";
import { eingabe, klassen, knopf } from "./ui";

/**
 * Das Gerüst jedes Bearbeitungsformulars der App.
 *
 * Es merkt sich, ob etwas geändert wurde, und zeigt erst dann die Leiste
 * „Speichern“ — sie steht damit genau dann im Blick, wenn sie gebraucht wird.
 * Nach dem Speichern bleibt die Seite offen und meldet kurz, dass die
 * Website aktuell ist. Strg/⌘ + S speichert am Rechner, und wer das Fenster
 * mit ungespeicherten Änderungen schließen will, wird vorher gefragt.
 */

export type FormularErgebnis = { ok: true; zeit: number; meldung?: string } | { ok: false; fehler: string; feld?: string; zeit: number } | null;

const GeaendertKontext = createContext<() => void>(() => {});

/** Für Bausteine, deren Änderung kein Eingabeereignis auslöst — Fotos, Merkmale. */
export function useGeaendert() {
  return useContext(GeaendertKontext);
}

export function Formular({
  aktion,
  children,
  neu = false,
  speichernLabel = "Speichern",
  gespeichertMeldung = "Gespeichert — die Website ist aktuell.",
}: {
  aktion: (vorher: FormularErgebnis, daten: FormData) => Promise<FormularErgebnis>;
  children: ReactNode;
  /** Ein neues Objekt hat noch nichts zu verwerfen — die Leiste steht von Anfang an da. */
  neu?: boolean;
  speichernLabel?: string;
  gespeichertMeldung?: string;
}) {
  const [fassung, setFassung] = useState(0);
  const [geaendert, setGeaendert] = useState(false);
  const [ergebnis, absenden, speichert] = useActionState(aktion, null);
  const formular = useRef<HTMLFormElement>(null);
  const zeigen = useToast();
  const markieren = useCallback(() => setGeaendert(true), []);

  useEffect(() => {
    if (!ergebnis) return;
    if (ergebnis.ok) {
      setGeaendert(false);
      zeigen(ergebnis.meldung ?? gespeichertMeldung);
      return;
    }
    zeigen(ergebnis.fehler, "fehler");
    if (ergebnis.feld) {
      const feld = formular.current?.querySelector<HTMLElement>(`[name="${ergebnis.feld}"]`);
      feld?.focus();
      feld?.scrollIntoView({ block: "center", behavior: "smooth" });
    }
  }, [ergebnis, gespeichertMeldung, zeigen]);

  useEffect(() => {
    const taste = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "s") {
        event.preventDefault();
        formular.current?.requestSubmit();
      }
    };
    window.addEventListener("keydown", taste);
    return () => window.removeEventListener("keydown", taste);
  }, []);

  useEffect(() => {
    if (!geaendert || speichert) return;
    const warnen = (event: BeforeUnloadEvent) => {
      event.preventDefault();
    };
    window.addEventListener("beforeunload", warnen);
    return () => window.removeEventListener("beforeunload", warnen);
  }, [geaendert, speichert]);

  const leisteSichtbar = neu || geaendert || speichert;

  return (
    <GeaendertKontext.Provider value={markieren}>
      <form
        key={fassung}
        ref={formular}
        action={absenden}
        onInput={markieren}
        onChange={markieren}
        noValidate={false}
        className="space-y-5 pb-36 lg:space-y-6"
      >
        {children}

        <div
          className={klassen(
            "fixed inset-x-0 bottom-[calc(4.75rem+env(safe-area-inset-bottom))] z-50 flex justify-center px-3 transition-all duration-300 ease-smooth lg:bottom-6 lg:left-[16.5rem] lg:px-8",
            leisteSichtbar ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
          )}
        >
          <div className="flex w-full max-w-[40rem] items-center gap-2 rounded-[20px] bg-ink-deep p-2 pl-5 text-white shadow-[0_18px_48px_-12px_rgba(11,37,69,0.55)]">
            <p className="flex min-w-0 flex-1 items-center gap-2 truncate text-[0.9375rem] font-medium text-white/85">
              {!speichert && <span className="h-2 w-2 shrink-0 rounded-full bg-accent" aria-hidden="true" />}
              {/* Am Telefon teilen sich drei Dinge die Leiste — dort reicht das kurze Wort. */}
              <span className="sm:hidden">{speichert ? "Speichert …" : neu ? "Neu" : "Geändert"}</span>
              <span className="hidden sm:inline">
                {speichert ? "Wird gespeichert …" : neu ? "Noch nicht gespeichert" : "Ungespeicherte Änderungen"}
              </span>
            </p>
            {!neu && (
              <button
                type="button"
                disabled={speichert}
                onClick={() => {
                  setFassung((jetzt) => jetzt + 1);
                  setGeaendert(false);
                }}
                className={knopf.hellLeise}
              >
                Verwerfen
              </button>
            )}
            <button type="submit" disabled={speichert} className={knopf.hell}>
              {speichert && <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />}
              {speichernLabel}
            </button>
          </div>
        </div>
      </form>
    </GeaendertKontext.Provider>
  );
}

/**
 * Mehrzeiliges Feld, das mit dem Text wächst — kein Rollbalken in einem
 * Kästchen, man sieht immer alles, was man geschrieben hat.
 */
export function Textfeld({ className = "", minZeilen = 3, ...rest }: TextareaHTMLAttributes<HTMLTextAreaElement> & { minZeilen?: number }) {
  const feld = useRef<HTMLTextAreaElement>(null);

  const anpassen = useCallback(() => {
    const element = feld.current;
    if (!element) return;
    element.style.height = "auto";
    element.style.height = `${element.scrollHeight + 2}px`;
  }, []);

  useLayoutEffect(anpassen, [anpassen]);

  return (
    <textarea
      ref={feld}
      rows={minZeilen}
      onInput={anpassen}
      className={klassen(eingabe, "resize-none py-3 leading-relaxed", className)}
      {...rest}
    />
  );
}

/**
 * Titel eines Objekts: eine Zeile, die umbricht statt abzuschneiden — am
 * Telefon sähe man von „Helle individuelle Doppelhaushälfte mit viel
 * Potenzial“ sonst nur den Anfang. Die Eingabetaste bricht nicht um.
 */
export function Titelfeld({ defaultValue, placeholder }: { defaultValue?: string; placeholder?: string }) {
  return (
    <Textfeld
      id="title"
      name="title"
      required
      minZeilen={1}
      defaultValue={defaultValue}
      placeholder={placeholder}
      onKeyDown={(event) => event.key === "Enter" && event.preventDefault()}
      className="font-semibold"
    />
  );
}
