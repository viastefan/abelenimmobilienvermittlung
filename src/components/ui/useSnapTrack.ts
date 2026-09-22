"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from "react";

/** Kurz und weich auslaufend — der Browser-Standard wirkt daneben zäh. */
const DAUER = 420;

/**
 * Eine Spur, in der jede Aufnahme die volle Breite einnimmt.
 *
 * Die Spur scrollt nicht mehr, sie wird geschoben. Eine eigene Scrollfläche
 * mitten in der Seite nimmt am Rechner den seitlichen Anteil jeder
 * Trackpad-Geste auf: man scrollt die Seite hinunter, und das Objekt wandert
 * dabei zur Seite — man blättert, ohne es zu wollen. Die Spur liegt
 * stattdessen als Ganzes hinter einem Ausschnitt und rückt um genau eine
 * Breite weiter, wenn jemand sie weiterrückt: mit den Pfeilen, mit gezogener
 * Maus oder mit dem Finger.
 *
 * `touch-action: pan-y` lässt dem Browser die senkrechte Bewegung. Auf dem
 * Telefon scrollt die Seite also weiter wie überall sonst; waagerecht zieht
 * die Spur, und erst ab einer klaren Richtung übernimmt sie.
 */
export function useSnapTrack<T extends HTMLElement>(count: number) {
  const trackRef = useRef<T | null>(null);
  const [index, setIndex] = useState(0);
  const [dragging, setDragging] = useState(false);
  /** Versatz in Pixeln, solange der Finger auf der Spur liegt. */
  const [shift, setShift] = useState(0);

  const zug = useRef({
    id: -1,
    startX: 0,
    startY: 0,
    achse: "" as "" | "x" | "y",
    breite: 1,
  });
  /** Ein Zug über eine Karte darf nicht als Klick auf ihren Link zählen. */
  const gezogen = useRef(false);

  /** Läuft am Ende wieder von vorn — eine Diashow soll nicht anstoßen. */
  const goTo = useCallback(
    (next: number) => {
      if (count === 0) return;
      setShift(0);
      setIndex(((next % count) + count) % count);
    },
    [count]
  );

  // Fällt ein Objekt weg, während die Spur hinten steht, darf sie nicht ins
  // Leere zeigen.
  useEffect(() => {
    setIndex((jetzt) => (jetzt > count - 1 ? Math.max(0, count - 1) : jetzt));
  }, [count]);

  const onPointerDown = (event: ReactPointerEvent<T>) => {
    if (count < 2) return;
    if (event.pointerType === "mouse" && event.button !== 0) return;
    const track = trackRef.current;
    if (!track) return;
    zug.current = {
      id: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      achse: "",
      breite: track.clientWidth || 1,
    };
  };

  const onPointerMove = (event: ReactPointerEvent<T>) => {
    const z = zug.current;
    if (z.id !== event.pointerId) return;

    const weg = event.clientX - z.startX;
    const hoch = event.clientY - z.startY;

    if (z.achse === "") {
      // Erst ab einer deutlichen Bewegung entscheidet sich die Richtung.
      if (Math.abs(weg) < 8 && Math.abs(hoch) < 8) return;
      z.achse = Math.abs(weg) > Math.abs(hoch) ? "x" : "y";
      if (z.achse !== "x") return;
      event.currentTarget.setPointerCapture(event.pointerId);
      setDragging(true);
    }
    if (z.achse !== "x") return;

    gezogen.current = true;
    // An den Enden zäher: die Spur gibt nach, läuft aber nicht ins Leere.
    const amRand = (index === 0 && weg > 0) || (index === count - 1 && weg < 0);
    setShift(amRand ? weg * 0.3 : weg);
  };

  const endDrag = (event: ReactPointerEvent<T>) => {
    const z = zug.current;
    if (z.id !== event.pointerId) return;
    z.id = -1;
    if (z.achse !== "x") return;

    setDragging(false);
    const weg = event.clientX - z.startX;
    const schwelle = Math.min(120, z.breite * 0.18);
    setShift(0);
    if (weg <= -schwelle && index < count - 1) setIndex(index + 1);
    else if (weg >= schwelle && index > 0) setIndex(index - 1);
  };

  const onClickCapture = (event: { preventDefault: () => void; stopPropagation: () => void }) => {
    if (!gezogen.current) return;
    event.preventDefault();
    event.stopPropagation();
    gezogen.current = false;
  };

  const style: CSSProperties = {
    transform: `translate3d(calc(${-index * 100}% + ${shift}px), 0, 0)`,
    transition: dragging ? "none" : `transform ${DAUER}ms cubic-bezier(0.22, 1, 0.36, 1)`,
    touchAction: "pan-y",
  };

  return {
    trackRef,
    index,
    goTo,
    dragging,
    /**
     * Auf die Spur legen. Der Ausschnitt darüber — das Elternelement —
     * braucht `overflow-hidden`, sonst steht die Spur über ihrem Platz
     * hinaus in der Seite.
     */
    dragProps: {
      style,
      onPointerDown,
      onPointerMove,
      onPointerUp: endDrag,
      onPointerCancel: endDrag,
      onClickCapture,
    },
  };
}
