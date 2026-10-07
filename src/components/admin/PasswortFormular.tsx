"use client";

import { useEffect, useRef, useState } from "react";
import { Eye, EyeOff, LoaderCircle } from "lucide-react";
import { passwortAendern } from "@/app/admin/actions";
import { useSpeichern } from "./Formular";
import { useToast } from "./Toast";
import { Feld, eingabeZeile, klassen, knopf } from "./ui";

/** Neues Passwort, zweimal eingetippt — mit Auge zum Nachsehen, was man getippt hat. */
export function PasswortFormular() {
  const [ergebnis, absenden, speichert] = useSpeichern(passwortAendern);
  const [sichtbar, setSichtbar] = useState(false);
  const formular = useRef<HTMLFormElement>(null);
  const zeigen = useToast();

  useEffect(() => {
    if (!ergebnis) return;
    if (ergebnis.ok) {
      formular.current?.reset();
      zeigen(ergebnis.meldung ?? "Gespeichert.");
    } else {
      zeigen(ergebnis.fehler, "fehler");
      if (ergebnis.feld) formular.current?.querySelector<HTMLInputElement>(`[name="${ergebnis.feld}"]`)?.focus();
    }
  }, [ergebnis, zeigen]);

  const art = sichtbar ? "text" : "password";

  return (
    <form ref={formular} onSubmit={absenden} className="space-y-5">
      <Feld label="Neues Passwort" htmlFor="passwort" hinweis="Mindestens acht Zeichen.">
        <div className="relative">
          <input
            id="passwort"
            name="passwort"
            type={art}
            autoComplete="new-password"
            required
            minLength={8}
            className={klassen(eingabeZeile, "pr-12")}
          />
          <button
            type="button"
            onClick={() => setSichtbar((jetzt) => !jetzt)}
            aria-label={sichtbar ? "Passwort verbergen" : "Passwort zeigen"}
            className="absolute inset-y-0 right-1 flex w-11 items-center justify-center rounded-[12px] text-text-subtle transition-colors hover:text-ink"
          >
            {sichtbar ? <EyeOff className="h-[1.125rem] w-[1.125rem]" strokeWidth={1.8} /> : <Eye className="h-[1.125rem] w-[1.125rem]" strokeWidth={1.8} />}
          </button>
        </div>
      </Feld>
      <Feld label="Noch einmal" htmlFor="passwort_wiederholen">
        <input
          id="passwort_wiederholen"
          name="passwort_wiederholen"
          type={art}
          autoComplete="new-password"
          required
          minLength={8}
          className={eingabeZeile}
        />
      </Feld>
      <button type="submit" disabled={speichert} className={knopf.primaer}>
        {speichert && <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />}
        Passwort speichern
      </button>
    </form>
  );
}
