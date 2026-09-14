"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";

/** Wie lange ein Bild steht, bevor das nächste darüberblendet. */
const INTERVAL = 6000;

/**
 * Diashow hinter dem Aufmacher.
 *
 * Die Bilder liegen gestapelt übereinander; gewechselt wird allein über die
 * Deckkraft, damit nichts springt und der Text darüber ruhig stehen bleibt.
 *
 * Drei Bedingungen halten die Bewegung im Zaum: Wer „Bewegung reduzieren“
 * eingestellt hat, sieht nur das erste Bild. Liegt der Aufmacher außerhalb
 * des Sichtfelds oder ist der Tab im Hintergrund, läuft nichts weiter —
 * das spart Akku und verhindert, dass man nach dem Zurückscrollen ein
 * fremdes Bild vorfindet. Und die Schaltfläche hält sie ganz an.
 */
export function HeroSlideshow({ slides }: { slides: { src: string; alt: string }[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(true);
  const [reduced, setReduced] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(query.matches);
    apply();
    query.addEventListener("change", apply);
    return () => query.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry?.isIntersecting ?? true), {
      threshold: 0.1,
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const running = slides.length > 1 && !paused && !reduced && visible;

  useEffect(() => {
    if (!running) return;
    const timer = window.setInterval(() => setIndex((value) => (value + 1) % slides.length), INTERVAL);
    return () => window.clearInterval(timer);
  }, [running, slides.length]);

  const goTo = useCallback((next: number) => setIndex(next), []);

  return (
    <div ref={ref} className="absolute inset-0">
      {slides.map((slide, position) => (
        <div
          key={slide.src}
          className={`absolute inset-0 transition-opacity duration-[1400ms] ease-smooth motion-reduce:transition-none ${
            position === index ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden="true"
        >
          <Image
            src={slide.src}
            alt=""
            fill
            // Nur das erste Bild ist für den ersten Eindruck nötig; die
            // übrigen lädt der Browser nach, sonst konkurrieren fünf
            // Aufnahmen um dieselbe Leitung.
            priority={position === 0}
            loading={position === 0 ? undefined : "lazy"}
            sizes="100vw"
            className={`object-cover ${position === index ? "scale-[1.04]" : "scale-100"} transition-transform duration-[7000ms] ease-linear motion-reduce:transform-none`}
          />
        </div>
      ))}

      {/* Die Verläufe sind kein Effekt, sondern Bedingung: ohne sie stünde
          weiße Schrift auf hellem Himmel. Sie liegen über der Diashow,
          damit jeder Bildwechsel denselben Kontrast behält. */}
      <div className="absolute inset-0 bg-gradient-to-r from-ink-deep/90 via-ink-deep/70 to-ink-deep/35 lg:to-ink-deep/20" />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink-deep/70 to-transparent" />

      {slides.length > 1 && !reduced && (
        <div className="absolute bottom-5 right-5 z-10 flex items-center gap-3 lg:bottom-7 lg:right-8">
          <ul className="flex items-center gap-2" aria-label="Bildauswahl">
            {slides.map((slide, position) => (
              <li key={slide.src}>
                <button
                  type="button"
                  onClick={() => goTo(position)}
                  aria-label={`Bild ${position + 1} von ${slides.length}: ${slide.alt}`}
                  aria-current={position === index ? "true" : undefined}
                  className="group/dot flex h-9 w-4 items-center justify-center"
                >
                  <span
                    className={`block h-1.5 rounded-full transition-all duration-500 ease-smooth ${
                      position === index ? "w-6 bg-white" : "w-1.5 bg-white/45 group-hover/dot:bg-white/80"
                    }`}
                  />
                </button>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={() => setPaused((value) => !value)}
            aria-label={paused ? "Diashow fortsetzen" : "Diashow anhalten"}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white ring-1 ring-inset ring-white/25 backdrop-blur transition-colors hover:bg-white/25"
          >
            {paused ? (
              <Play className="h-3.5 w-3.5" fill="currentColor" strokeWidth={0} aria-hidden="true" />
            ) : (
              <Pause className="h-3.5 w-3.5" fill="currentColor" strokeWidth={0} aria-hidden="true" />
            )}
          </button>
        </div>
      )}
    </div>
  );
}
