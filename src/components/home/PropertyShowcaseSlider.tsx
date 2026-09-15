"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, DoorOpen, Ruler } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SiteImage } from "@/components/graphics/SiteImage";

export type ShowcaseSlide = {
  slug: string;
  title: string;
  city: string;
  statusLabel: string;
  priceLabel: string;
  livingSpace: string;
  rooms: string;
  description: string[];
  image?: string;
};

/**
 * Die angebotenen Objekte als Diashow — Bild links, Text rechts, wie im
 * bisherigen Auftritt. Gewischt wird nativ (Scroll-Snap), die Pfeile
 * schieben nur weiter und laufen am Ende wieder von vorn los.
 */
export function PropertyShowcaseSlider({ slides }: { slides: ShowcaseSlide[] }) {
  const trackRef = useRef<HTMLUListElement | null>(null);
  const [index, setIndex] = useState(0);
  const many = slides.length > 1;

  const sync = useCallback(() => {
    const track = trackRef.current;
    if (!track || track.clientWidth === 0) return;
    setIndex(Math.round(track.scrollLeft / track.clientWidth));
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

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
      if (!track) return;
      const target = (next + slides.length) % slides.length;
      track.scrollTo({ left: target * track.clientWidth, behavior: "smooth" });
      setIndex(target);
    },
    [slides.length]
  );

  return (
    <section className="overflow-hidden bg-surface-cool py-14 lg:py-20">
      <Container>
        <Reveal>
          <ul
            ref={trackRef}
            className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain scroll-smooth"
            aria-label="Angebotene Objekte"
          >
            {slides.map((slide, position) => {
              const current = position === index;
              return (
                <li key={slide.slug} className="w-full shrink-0 grow-0 basis-full snap-center">
                  <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14">
                    <div className="group relative aspect-[4/3] overflow-hidden rounded-[24px] bg-surface-mist shadow-lift">
                      <SiteImage
                        src={slide.image}
                        sizes="(min-width: 1024px) 52vw, 100vw"
                        label={slide.city}
                        alt={`${slide.title} in ${slide.city}`}
                      />

                      <span className="pointer-events-none absolute left-5 top-5 z-10 rounded-full bg-white/95 px-3.5 py-1.5 text-[0.8125rem] font-semibold text-ink shadow-card backdrop-blur">
                        {slide.statusLabel}
                      </span>

                      {many && (
                        <div className="absolute bottom-4 right-4 z-10 flex gap-2">
                          <SlideArrow
                            direction="prev"
                            active={current}
                            onClick={() => goTo(position - 1)}
                          />
                          <SlideArrow
                            direction="next"
                            active={current}
                            onClick={() => goTo(position + 1)}
                          />
                        </div>
                      )}
                    </div>

                    <div>
                      {many && (
                        <span className="text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-accent-deep">
                          Objekt {String(position + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
                        </span>
                      )}

                      <h2 className={`balance font-display text-display-lg font-bold text-ink ${many ? "mt-3" : ""}`}>
                        Weiter Objekte zu verkaufen in {slide.city}
                      </h2>

                      <div className="pretty mt-5 space-y-4 text-[0.9375rem] leading-relaxed text-text-muted">
                        {slide.description.map((paragraph) => (
                          <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                        ))}
                      </div>

                      <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
                        <span className="font-display text-display-md font-extrabold text-ink">
                          {slide.priceLabel}
                        </span>
                        <span className="flex flex-wrap gap-2">
                          <Fact icon={Ruler} value={slide.livingSpace} />
                          <Fact icon={DoorOpen} value={slide.rooms} />
                        </span>
                      </div>

                      <Button
                        href="/immobilien"
                        variant="primary"
                        withArrow
                        tabIndex={current ? undefined : -1}
                        className="mt-8"
                      >
                        Objekte &amp; Referenzen
                      </Button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}

function Fact({ icon: Icon, value }: { icon: typeof Ruler; value: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-[10px] bg-white px-3 py-1.5 text-[0.8125rem] font-medium text-text-muted">
      <Icon className="h-3.5 w-3.5 text-accent-mid" strokeWidth={1.8} aria-hidden="true" />
      {value}
    </span>
  );
}

/**
 * Nur die Pfeile der sichtbaren Aufnahme liegen in der Tabreihenfolge — die
 * übrigen stehen zwar im Baum, sind aber nicht erreichbar.
 */
function SlideArrow({
  direction,
  active,
  onClick,
}: {
  direction: "prev" | "next";
  active: boolean;
  onClick: () => void;
}) {
  const Icon = direction === "prev" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={onClick}
      tabIndex={active ? 0 : -1}
      aria-label={direction === "prev" ? "Vorheriges Objekt" : "Nächstes Objekt"}
      className="flex h-11 w-11 items-center justify-center rounded-full bg-white/85 text-ink shadow-lift backdrop-blur transition-all duration-300 ease-smooth hover:scale-105 hover:bg-white active:scale-95"
    >
      <Icon className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
    </button>
  );
}
