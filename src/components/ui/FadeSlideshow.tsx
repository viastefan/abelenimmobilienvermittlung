"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export type FadeSlide = {
  key: string;
  node: ReactNode;
  /** Kurzer Name für die Punktnavigation und die Sprachausgabe. */
  label: string;
};

/**
 * Diashow, die überblendet statt zu scrollen.
 *
 * Alle Folien liegen in derselben Rasterzelle übereinander — dadurch ist das
 * Feld so hoch wie die höchste Folie und springt beim Wechsel nicht. Gewechselt
 * wird über die Deckkraft; die verdeckten Folien sind mit `inert` aus
 * Tabreihenfolge und Vorlesereihenfolge genommen, sonst landete der Fokus in
 * einem unsichtbaren Zitat.
 *
 * Steht der Zeiger auf der Diashow, liegt sie außerhalb des Sichtfelds oder
 * ist „Bewegung reduzieren“ gesetzt, läuft nichts von allein weiter.
 */
export function FadeSlideshow({
  slides,
  label,
  interval = 7000,
  className = "",
}: {
  slides: FadeSlide[];
  /** Zugänglicher Name der Diashow. */
  label: string;
  interval?: number;
  className?: string;
}) {
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
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
      threshold: 0.25,
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const count = slides.length;
  const step = useCallback(
    (direction: 1 | -1) => setIndex((value) => (value + direction + count) % count),
    [count]
  );

  useEffect(() => {
    if (count < 2 || hovered || reduced || !visible) return;
    const timer = window.setInterval(() => setIndex((value) => (value + 1) % count), interval);
    return () => window.clearInterval(timer);
  }, [count, hovered, reduced, visible, interval]);

  if (count === 0) return null;

  return (
    <div
      ref={ref}
      className={className}
      role="group"
      aria-roledescription="Diashow"
      aria-label={label}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setHovered(true)}
      onBlurCapture={() => setHovered(false)}
    >
      <div className="grid">
        {slides.map((slide, position) => (
          <div
            key={slide.key}
            inert={position !== index}
            aria-hidden={position !== index}
            className={`col-start-1 row-start-1 transition-opacity duration-700 ease-smooth motion-reduce:transition-none ${
              position === index ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            {slide.node}
          </div>
        ))}
      </div>

      {count > 1 && (
        <div className="mt-7 flex items-center justify-center gap-2">
          <SlideButton side="left" onClick={() => step(-1)} />

          <ul className="flex items-center gap-1">
            {slides.map((slide, position) => (
              <li key={slide.key}>
                <button
                  type="button"
                  onClick={() => setIndex(position)}
                  aria-label={`${slide.label} — ${position + 1} von ${count}`}
                  aria-current={position === index ? "true" : undefined}
                  className="group/dot flex h-9 items-center px-1"
                >
                  <span
                    className={`block h-1.5 rounded-full transition-all duration-500 ease-smooth ${
                      position === index
                        ? "w-6 bg-accent-deep"
                        : "w-1.5 bg-border-strong group-hover/dot:bg-text-subtle"
                    }`}
                  />
                </button>
              </li>
            ))}
          </ul>

          <SlideButton side="right" onClick={() => step(1)} />
        </div>
      )}
    </div>
  );
}

function SlideButton({ side, onClick }: { side: "left" | "right"; onClick: () => void }) {
  const Icon = side === "left" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={side === "left" ? "Vorherige Folie" : "Nächste Folie"}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white text-ink transition-colors duration-200 hover:border-border-strong hover:bg-surface-cool"
    >
      <Icon className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
    </button>
  );
}
