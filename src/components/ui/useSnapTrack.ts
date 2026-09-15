"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Eine Spur, in der jede Aufnahme die volle Breite einnimmt und einrastet.
 *
 * Gescrollt wird vom Browser selbst — dadurch bleibt das Wischen auf dem
 * Telefon samt Schwung erhalten, ohne dass hier eine eigene Gestensteuerung
 * nachgebaut werden müsste. Die Pfeile schieben nur weiter.
 */
export function useSnapTrack<T extends HTMLElement>(count: number) {
  const trackRef = useRef<T | null>(null);
  const [index, setIndex] = useState(0);

  const sync = useCallback(() => {
    const track = trackRef.current;
    if (!track || track.clientWidth === 0) return;
    setIndex(Math.round(track.scrollLeft / track.clientWidth));
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Das Scroll-Ereignis feuert pro Bildlaufschritt. Ein Bild pro Bildlauf
    // genügt, um den Zähler nachzuführen.
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        sync();
      });
    };

    track.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      track.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", sync);
    };
  }, [sync]);

  /** Läuft am Ende wieder von vorn — eine Diashow soll nicht anstoßen. */
  const goTo = useCallback(
    (next: number) => {
      const track = trackRef.current;
      if (!track || count === 0) return;
      const target = ((next % count) + count) % count;
      track.scrollTo({ left: target * track.clientWidth, behavior: "smooth" });
      setIndex(target);
    },
    [count]
  );

  return { trackRef, index, goTo };
}
