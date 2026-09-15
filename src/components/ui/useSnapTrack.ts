"use client";

import { useCallback, useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";

/** Kurz und weich auslaufend — der Browser-Standard wirkt daneben zäh. */
const DAUER = 380;

/**
 * Eine Spur, in der jede Aufnahme die volle Breite einnimmt und einrastet.
 *
 * Gewischt wird nativ: auf dem Telefon übernimmt der Browser das Scrollen
 * samt Schwung. Am Rechner lässt sich die Spur mit der Maus ziehen, und die
 * Pfeile schieben weiter.
 *
 * Geschoben wird von Hand statt mit `scrollTo({ behavior: "smooth" })`: das
 * Einrasten hält die eigene Animation des Browsers unterwegs an, und ihre
 * Dauer lässt sich nicht bestimmen. Während der Bewegung ist das Einrasten
 * deshalb abgeschaltet und rastet erst am Ziel wieder ein.
 */
export function useSnapTrack<T extends HTMLElement>(count: number) {
  const trackRef = useRef<T | null>(null);
  const [index, setIndex] = useState(0);
  const [dragging, setDragging] = useState(false);

  const frame = useRef(0);
  const drag = useRef({ active: false, startX: 0, startScroll: 0, moved: false });

  const sync = useCallback(() => {
    const track = trackRef.current;
    if (!track || track.clientWidth === 0) return;
    setIndex(Math.round(track.scrollLeft / track.clientWidth));
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let pending = 0;
    const onScroll = () => {
      if (pending) return;
      pending = requestAnimationFrame(() => {
        pending = 0;
        sync();
      });
    };

    track.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      if (pending) cancelAnimationFrame(pending);
      track.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", sync);
    };
  }, [sync]);

  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  const glide = useCallback((track: T, to: number) => {
    cancelAnimationFrame(frame.current);
    const from = track.scrollLeft;
    const weg = to - from;
    if (Math.abs(weg) < 1) return;

    const schonDa = track.style.scrollSnapType;
    track.style.scrollSnapType = "none";
    const start = performance.now();

    const schritt = (jetzt: number) => {
      const t = Math.min(1, (jetzt - start) / DAUER);
      track.scrollLeft = from + weg * (1 - Math.pow(1 - t, 3));
      if (t < 1) {
        frame.current = requestAnimationFrame(schritt);
      } else {
        track.style.scrollSnapType = schonDa;
      }
    };

    frame.current = requestAnimationFrame(schritt);
  }, []);

  /** Läuft am Ende wieder von vorn — eine Diashow soll nicht anstoßen. */
  const goTo = useCallback(
    (next: number) => {
      const track = trackRef.current;
      if (!track || count === 0) return;
      const ziel = ((next % count) + count) % count;
      setIndex(ziel);
      glide(track, ziel * track.clientWidth);
    },
    [count, glide]
  );

  // Ziehen mit der Maus. Touch bleibt dem Browser überlassen — der macht es
  // besser, mit Schwung und Gummiband an den Enden.
  const onPointerDown = (event: ReactPointerEvent<T>) => {
    if (event.pointerType !== "mouse" || event.button !== 0) return;
    const track = trackRef.current;
    if (!track || track.scrollWidth <= track.clientWidth) return;
    cancelAnimationFrame(frame.current);
    track.style.scrollSnapType = "none";
    drag.current = { active: true, startX: event.clientX, startScroll: track.scrollLeft, moved: false };
    setDragging(true);
  };

  const onPointerMove = (event: ReactPointerEvent<T>) => {
    if (!drag.current.active) return;
    const track = trackRef.current;
    if (!track) return;
    const weg = event.clientX - drag.current.startX;
    if (Math.abs(weg) > 6) drag.current.moved = true;
    track.scrollLeft = drag.current.startScroll - weg;
  };

  const endDrag = () => {
    if (!drag.current.active) return;
    drag.current.active = false;
    setDragging(false);
    const track = trackRef.current;
    if (!track || track.clientWidth === 0) return;
    // Auf die nächstgelegene Aufnahme einrasten, bevor `snap` wieder greift.
    const ziel = Math.max(0, Math.min(count - 1, Math.round(track.scrollLeft / track.clientWidth)));
    setIndex(ziel);
    glide(track, ziel * track.clientWidth);
  };

  /** Ein Zug über eine Karte darf nicht als Klick auf ihren Link zählen. */
  const onClickCapture = (event: { preventDefault: () => void; stopPropagation: () => void }) => {
    if (!drag.current.moved) return;
    event.preventDefault();
    event.stopPropagation();
    drag.current.moved = false;
  };

  return {
    trackRef,
    index,
    goTo,
    dragging,
    /** Auf die Spur legen, damit sie sich mit der Maus ziehen lässt. */
    dragProps: {
      onPointerDown,
      onPointerMove,
      onPointerUp: endDrag,
      onPointerCancel: endDrag,
      onPointerLeave: endDrag,
      onClickCapture,
    },
  };
}
