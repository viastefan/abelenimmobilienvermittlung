"use client";

import { useRef, useState, useTransition, type ReactNode } from "react";
import { LoaderCircle } from "lucide-react";
import { knopf } from "./ui";

type Rueckfrage = {
  titel: string;
  text: ReactNode;
  bestaetigen: string;
  aktion: () => Promise<unknown>;
};

/**
 * Rückfrage vor allem, was sich nicht rückgängig machen lässt.
 *
 * Ein echtes `<dialog>`: es fängt den Fokus, schließt mit Escape und liegt
 * über allem — ohne das graue Fenster des Browsers, das auf dem Telefon
 * aussieht wie eine Fehlermeldung. Als Hook, damit auch ein Menüpunkt die
 * Rückfrage öffnen kann, nicht nur ein Knopf.
 */
export function useRueckfrage({ titel, text, bestaetigen, aktion }: Rueckfrage) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [laeuft, starten] = useTransition();
  const [fehler, setFehler] = useState(false);

  function schliessen() {
    if (!laeuft) dialog.current?.close();
  }

  const element = (
    <dialog
      ref={dialog}
      onClick={(event) => event.target === dialog.current && schliessen()}
      className="dialog-rein m-auto w-[min(26rem,calc(100vw-2rem))] rounded-[24px] bg-white p-0 text-ink shadow-[0_24px_64px_-16px_rgba(11,37,69,0.45)] backdrop:bg-ink-deep/40 backdrop:backdrop-blur-[3px]"
    >
      <div className="p-6 sm:p-7">
        <h2 className="font-display text-[1.1875rem] font-bold tracking-[-0.015em]">{titel}</h2>
        <div className="mt-2.5 text-[0.9375rem] leading-relaxed text-text-muted">{text}</div>
        {fehler && (
          <p role="alert" className="mt-4 rounded-[12px] bg-warning-soft px-3.5 py-2.5 text-[0.875rem] text-warning">
            Das hat gerade nicht geklappt. Bitte versuchen Sie es gleich noch einmal.
          </p>
        )}
        <div className="mt-7 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button type="button" onClick={schliessen} className={knopf.zweit}>
            Abbrechen
          </button>
          <button
            type="button"
            disabled={laeuft}
            onClick={() =>
              starten(async () => {
                try {
                  await aktion();
                  dialog.current?.close();
                } catch {
                  setFehler(true);
                }
              })
            }
            className={knopf.loeschen}
          >
            {laeuft && <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />}
            {bestaetigen}
          </button>
        </div>
      </div>
    </dialog>
  );

  return {
    oeffnen: () => {
      setFehler(false);
      dialog.current?.showModal();
    },
    dialog: element,
  };
}

/** Dasselbe als Baustein mit eigenem Auslöser. */
export function Bestaetigen({ ausloeser, ...rueckfrage }: Rueckfrage & { ausloeser: (oeffnen: () => void) => ReactNode }) {
  const { oeffnen, dialog } = useRueckfrage(rueckfrage);
  return (
    <>
      {ausloeser(oeffnen)}
      {dialog}
    </>
  );
}
