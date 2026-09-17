"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";

/** Ab hier gilt der Zug als Abwurf, nicht als Verrutschen. */
const ABWURF = 120;

/**
 * Das Anfrageformular hebt sich auf dem Telefon vom Blatt ab.
 *
 * Sobald es beim Scrollen die Bildschirmmitte erreicht, wandert es in ein
 * Fenster am unteren Rand: volle Breite, Griff oben, der Rest der Seite
 * dahinter abgedunkelt. Am Griff lässt es sich wieder herunterziehen.
 *
 * Das Formular selbst bleibt dabei dieselbe Komponente an derselben Stelle
 * im Baum — nur seine Hülle wechselt zwischen „im Satz“ und „fixiert“. Ein
 * zweiter Zweig im JSX hätte es beim Abheben neu aufgebaut und alles
 * Getippte verworfen.
 *
 * Der Anker behält die Höhe des Formulars, während es schwebt. Ohne ihn
 * fiele die Seite in dem Moment zusammen, in dem das Fenster abhebt, und
 * spränge unter den Fingern weg.
 *
 * Es hebt nur ab, solange niemand darin schreibt: ein Feld, das mitsamt
 * Tastatur den Platz wechselt, verliert den Faden.
 */
export function ScrollSheet({ label, children }: { label: string; children: ReactNode }) {
  const ankerRef = useRef<HTMLDivElement>(null);
  const feldRef = useRef<HTMLDivElement>(null);

  const [amTelefon, setAmTelefon] = useState(false);
  const [offen, setOffen] = useState(false);
  const [hoehe, setHoehe] = useState(0);
  const [zug, setZug] = useState(0);
  const [ziehend, setZiehend] = useState(false);

  const griff = useRef({ aktiv: false, startY: 0 });
  // Wer das Fenster wegzieht, will es nicht zwei Zeilen später wiederhaben.
  const abgelegt = useRef(false);

  const schwebt = amTelefon && offen;

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    const pruefe = () => setAmTelefon(mq.matches);
    pruefe();
    mq.addEventListener("change", pruefe);
    return () => mq.removeEventListener("change", pruefe);
  }, []);

  // Die Höhe wird gemessen, solange das Formular noch im Satz steht.
  useEffect(() => {
    const feld = feldRef.current;
    if (!feld || schwebt) return;
    const beobachter = new ResizeObserver(() => setHoehe(feld.offsetHeight));
    beobachter.observe(feld);
    return () => beobachter.disconnect();
  }, [schwebt]);

  useEffect(() => {
    if (!amTelefon) {
      setOffen(false);
      return;
    }

    const anker = ankerRef.current;
    if (!anker) return;

    const pruefe = () => {
      const oben = anker.getBoundingClientRect().top;
      const schreibtJemand = anker.contains(document.activeElement);

      if (oben > window.innerHeight * 0.9) {
        abgelegt.current = false;
        setOffen(false);
        return;
      }
      if (!abgelegt.current && !schreibtJemand && oben < window.innerHeight * 0.55) {
        setOffen(true);
      }
    };

    pruefe();
    window.addEventListener("scroll", pruefe, { passive: true });
    window.addEventListener("resize", pruefe);
    return () => {
      window.removeEventListener("scroll", pruefe);
      window.removeEventListener("resize", pruefe);
    };
  }, [amTelefon]);

  const schliessen = useCallback(() => {
    abgelegt.current = true;
    setZug(0);
    setZiehend(false);
    setOffen(false);
  }, []);

  useEffect(() => {
    if (!schwebt) return;
    const aufEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") schliessen();
    };
    window.addEventListener("keydown", aufEscape);
    return () => window.removeEventListener("keydown", aufEscape);
  }, [schwebt, schliessen]);

  const zugStart = (event: ReactPointerEvent<HTMLDivElement>) => {
    griff.current = { aktiv: true, startY: event.clientY };
    setZiehend(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const zugLauf = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!griff.current.aktiv) return;
    setZug(Math.max(0, event.clientY - griff.current.startY));
  };

  const zugEnde = () => {
    if (!griff.current.aktiv) return;
    griff.current.aktiv = false;
    setZiehend(false);
    if (zug > ABWURF) schliessen();
    else setZug(0);
  };

  return (
    <div ref={ankerRef} style={schwebt && hoehe ? { height: hoehe } : undefined}>
      {schwebt && (
        <div
          className="fixed inset-0 z-[60] bg-ink-deep/45 backdrop-blur-[2px]"
          onClick={schliessen}
          aria-hidden="true"
        />
      )}

      <div
        ref={feldRef}
        {...(schwebt ? { role: "dialog" as const, "aria-label": label } : {})}
        style={schwebt ? { transform: `translateY(${zug}px)` } : undefined}
        className={
          schwebt
            ? `fixed inset-x-0 bottom-0 z-[61] max-h-[88vh] overflow-y-auto overscroll-contain rounded-t-[24px] bg-white pb-safe shadow-[0_-20px_60px_-28px_rgba(11,37,69,0.65)] ${
                ziehend ? "" : "transition-transform duration-300 ease-smooth"
              }`
            : "rounded-[24px] bg-surface-warm p-6 sm:p-8"
        }
      >
        {schwebt && (
          // Der Griff bleibt beim Blättern im Formular oben stehen.
          <div
            onPointerDown={zugStart}
            onPointerMove={zugLauf}
            onPointerUp={zugEnde}
            onPointerCancel={zugEnde}
            className="sticky top-0 z-10 flex h-10 cursor-grab touch-none items-center justify-center bg-white/80 backdrop-blur-xl active:cursor-grabbing"
          >
            <span className="h-1 w-10 rounded-full bg-border-strong" aria-hidden="true" />
            <button type="button" onClick={schliessen} className="sr-only">
              Formular schließen
            </button>
          </div>
        )}

        <div className={schwebt ? "px-5 pb-8 pt-3" : ""}>{children}</div>
      </div>
    </div>
  );
}
