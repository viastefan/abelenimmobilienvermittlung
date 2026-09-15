"use client";

import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SlideArrow } from "@/components/ui/SlideArrow";
import { SiteImage } from "@/components/graphics/SiteImage";
import { useSnapTrack } from "@/components/ui/useSnapTrack";
import { PropertyFacts, type PropertyFact } from "@/components/property/PropertyFacts";

export type ShowcaseSlide = {
  slug: string;
  title: string;
  city: string;
  statusLabel: string;
  priceLabel: string;
  facts: PropertyFact[];
  description: string[];
  image?: string;
};

/**
 * Die angebotenen Objekte als Diashow — Bild links, Text rechts, wie im
 * bisherigen Auftritt. Gewischt wird nativ (Scroll-Snap), die Pfeile
 * schieben nur weiter und laufen am Ende wieder von vorn los.
 *
 * Die Pfeile liegen in der Textspalte, nicht auf dem Bild: dort verdecken
 * sie keine Aufnahme und stehen bei Zähler und Angaben, zu denen sie gehören.
 */
export function PropertyShowcaseSlider({ slides }: { slides: ShowcaseSlide[] }) {
  const { trackRef, index, goTo, dragging, dragProps } = useSnapTrack<HTMLUListElement>(
    slides.length
  );
  const many = slides.length > 1;

  return (
    <section className="overflow-hidden bg-surface-cool py-14 lg:py-20">
      <Container>
        <Reveal>
          <ul
            ref={trackRef}
            {...dragProps}
            className={`no-scrollbar flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain ${
              dragging ? "cursor-grabbing select-none" : many ? "lg:cursor-grab" : ""
            }`}
            aria-label="Angebotene Objekte"
          >
            {slides.map((slide, position) => {
              const current = position === index;
              const href = `/immobilien/${slide.slug}`;
              return (
                <li key={slide.slug} className="w-full shrink-0 grow-0 basis-full snap-center">
                  <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-[24px] bg-surface-mist shadow-lift">
                      <SiteImage
                        src={slide.image}
                        sizes="(min-width: 1024px) 52vw, 100vw"
                        label={slide.city}
                        alt={`${slide.title} in ${slide.city}`}
                      />

                      <span className="pointer-events-none absolute left-5 top-5 z-10 rounded-full bg-white/95 px-3.5 py-1.5 text-[0.8125rem] font-semibold text-ink shadow-card backdrop-blur">
                        {slide.statusLabel}
                      </span>
                    </div>

                    <div>
                      {many && (
                        <div className="flex items-center justify-between gap-4">
                          <span className="text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-accent-deep">
                            Objekt {String(position + 1).padStart(2, "0")} /{" "}
                            {String(slides.length).padStart(2, "0")}
                          </span>
                          <div className="flex gap-2">
                            <SlideArrow
                              direction="prev"
                              subject="Objekt"
                              active={current}
                              onClick={() => goTo(position - 1)}
                            />
                            <SlideArrow
                              direction="next"
                              subject="Objekt"
                              active={current}
                              onClick={() => goTo(position + 1)}
                            />
                          </div>
                        </div>
                      )}

                      <h2 className={`balance font-display text-display-lg font-bold text-ink ${many ? "mt-5" : ""}`}>
                        Weiter Objekte zu verkaufen in {slide.city}
                      </h2>

                      <div className="pretty mt-4 space-y-4 text-[0.9375rem] leading-relaxed text-text-muted">
                        {slide.description.map((paragraph) => (
                          <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                        ))}
                      </div>

                      <PropertyFacts facts={slide.facts} className="mt-7" />

                      <div className="mt-7 flex flex-wrap items-end justify-between gap-x-4 gap-y-2">
                        <div>
                          <p className="text-[0.75rem] font-medium text-text-subtle">Kaufpreis</p>
                          <p className="mt-0.5 font-display text-display-md font-extrabold text-ink">
                            {slide.priceLabel}
                          </p>
                        </div>
                        <Link
                          href="/immobilien"
                          tabIndex={current ? undefined : -1}
                          className="text-[0.875rem] font-semibold text-accent-deep transition-colors duration-300 hover:text-accent-dark"
                        >
                          Alle Objekte &amp; Referenzen
                        </Link>
                      </div>

                      <Button
                        href={href}
                        variant="primary"
                        withArrow
                        tabIndex={current ? undefined : -1}
                        className="mt-5 w-full sm:w-auto"
                      >
                        Objekt ansehen
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
