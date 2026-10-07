"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { CircleAlert, CircleCheck } from "lucide-react";

/**
 * Kurze Rückmeldungen am unteren Rand: „Gespeichert — die Website ist
 * aktuell.“ Sie kommen von selbst und gehen von selbst. Wer nach dem
 * Speichern nichts sieht, speichert ein zweites Mal. Steht die Leiste
 * „Speichern“ im Bild, rücken sie darüber.
 */

type Meldung = { id: number; text: string; art: "gut" | "fehler" };

const ToastKontext = createContext<(text: string, art?: Meldung["art"]) => void>(() => {});

export function useToast() {
  return useContext(ToastKontext);
}

export function ToastBereich({ children }: { children: ReactNode }) {
  const [meldungen, setMeldungen] = useState<Meldung[]>([]);
  const zaehler = useRef(0);

  const zeigen = useCallback((text: string, art: Meldung["art"] = "gut") => {
    const id = ++zaehler.current;
    setMeldungen((jetzt) => [...jetzt.slice(-1), { id, text, art }]);
    window.setTimeout(() => setMeldungen((jetzt) => jetzt.filter((meldung) => meldung.id !== id)), art === "fehler" ? 7000 : 3200);
  }, []);

  return (
    <ToastKontext.Provider value={zeigen}>
      {children}
      <div
        aria-live="polite"
        className="pointer-events-none fixed inset-x-0 bottom-[calc(5.75rem+env(safe-area-inset-bottom))] z-[70] flex flex-col items-center gap-2 px-4 transition-[bottom] duration-300 ease-smooth lg:bottom-8 lg:left-[16.5rem] [:root:has([data-leiste])_&]:bottom-[calc(9.25rem+env(safe-area-inset-bottom))] lg:[:root:has([data-leiste])_&]:bottom-[6rem]"
      >
        {meldungen.map((meldung) => (
          <div
            key={meldung.id}
            role={meldung.art === "fehler" ? "alert" : "status"}
            className="toast-rein pointer-events-auto flex max-w-md items-center gap-3 rounded-[24px] bg-ink-deep py-3 pl-4 pr-5 text-[0.9375rem] font-medium text-white shadow-[0_12px_32px_-8px_rgba(11,37,69,0.45)]"
          >
            {meldung.art === "fehler" ? (
              <CircleAlert className="h-5 w-5 shrink-0 text-[#F2B37A]" strokeWidth={2} aria-hidden="true" />
            ) : (
              <CircleCheck className="h-5 w-5 shrink-0 text-accent" strokeWidth={2} aria-hidden="true" />
            )}
            {meldung.text}
          </div>
        ))}
      </div>
    </ToastKontext.Provider>
  );
}

/**
 * Meldung nach einer Weiterleitung. Nach dem Anlegen oder Löschen führt die
 * App auf eine andere Seite; die Nachricht reist als Adresszusatz mit und
 * wird hier gezeigt — danach verschwindet der Zusatz wieder aus der Adresse.
 */
export function MeldungAusAdresse({ texte }: { texte: Record<string, string> }) {
  const params = useSearchParams();
  const router = useRouter();
  const pfad = usePathname();
  const zeigen = useToast();
  const gezeigt = useRef(false);

  useEffect(() => {
    if (gezeigt.current) return;
    const schluessel = Object.keys(texte).find((key) => params.has(key));
    if (!schluessel) return;
    gezeigt.current = true;
    zeigen(texte[schluessel]!);
    router.replace(pfad, { scroll: false });
  }, [params, pfad, router, texte, zeigen]);

  return null;
}
