"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { SlideArrow } from "@/components/ui/SlideArrow";
import { SiteImage } from "@/components/graphics/SiteImage";
import { useSnapTrack } from "@/components/ui/useSnapTrack";
import { PropertyFacts, type PropertyFact } from "@/components/property/PropertyFacts";

export type ExpertPropertyData = {
  slug: string;
  title: string;
  city: string;
  statusLabel: string;
  priceLabel: string;
  facts: PropertyFact[];
  images: string[];
};

/**
 * Das aktuelle Angebot als Karte: oben die Aufnahmen als Diashow, darunter
 * die Eckdaten und die Anfrage. Die Karte zeigt bewusst nur ein Objekt —
 * die übrigen stehen weiter unten in ihrem eigenen Abschnitt, damit keines
 * zweimal auf der Seite erscheint.
 */
export function ExpertProperty({ property }: { property: ExpertPropertyData }) {
  const { trackRef, index, goTo } = useSnapTrack<HTMLUListElement>(property.images.length);
  const many = property.images.length > 1;
  const href = `/immobilien/${property.slug}`;

  return (
    <article className="overflow-hidden rounded-[24px] bg-white shadow-lift ring-1 ring-border sm:rounded-[28px]">
      <div className="relative aspect-[4/3] bg-surface-mist">
        {property.images.length > 0 ? (
          <ul
            ref={trackRef}
            className="no-scrollbar flex h-full snap-x snap-mandatory overflow-x-auto overscroll-x-contain"
            aria-label={`Aufnahmen: ${property.title}`}
          >
            {property.images.map((image, position) => (
              <li key={image} className="relative h-full w-full shrink-0 grow-0 basis-full snap-center">
                <SiteImage
                  src={image}
                  sizes="(min-width: 1024px) 44vw, 100vw"
                  label={property.city}
                  alt={position === 0 ? `${property.title} in ${property.city}` : ""}
                />
              </li>
            ))}
          </ul>
        ) : (
          <SiteImage label={property.city} alt={`${property.title} in ${property.city}`} />
        )}

        <span className="pointer-events-none absolute left-4 top-4 z-10 rounded-full bg-white/95 px-3.5 py-1.5 text-[0.8125rem] font-semibold text-ink shadow-card backdrop-blur">
          {property.statusLabel}
        </span>

        {many && (
          <>
            <div className="pointer-events-none absolute bottom-4 left-4 z-10 flex gap-1.5">
              {property.images.map((image, position) => (
                <span
                  key={image}
                  className={`h-1.5 rounded-full transition-all duration-300 ease-smooth ${
                    position === index ? "w-5 bg-white" : "w-1.5 bg-white/55"
                  }`}
                />
              ))}
            </div>

            <div className="absolute bottom-4 right-4 z-10 flex gap-2">
              <SlideArrow direction="prev" subject="Bild" onClick={() => goTo(index - 1)} />
              <SlideArrow direction="next" subject="Bild" onClick={() => goTo(index + 1)} />
            </div>
          </>
        )}
      </div>

      <div className="p-5 sm:p-7">
        <p className="text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-accent-deep">
          Aktuelles Angebot
        </p>
        <h3 className="balance mt-2 font-display text-display-md font-bold text-ink">
          <Link href={href} className="transition-colors duration-300 hover:text-accent-deep">
            {property.title}
          </Link>
        </h3>

        <PropertyFacts facts={property.facts} className="mt-6" />

        <div className="mt-6 flex flex-wrap items-end justify-between gap-x-4 gap-y-2 border-t border-border pt-5">
          <div>
            <p className="text-[0.75rem] font-medium text-text-subtle">Kaufpreis</p>
            <p className="mt-0.5 font-display text-display-md font-extrabold text-ink">
              {property.priceLabel}
            </p>
          </div>
          <Link
            href={href}
            className="text-[0.875rem] font-semibold text-accent-deep transition-colors duration-300 hover:text-accent-dark"
          >
            Alle Details
          </Link>
        </div>

        <Button
          href={`/kontakt?anliegen=kaufen&objekt=${property.slug}`}
          variant="primary"
          withArrow
          className="mt-5 w-full"
        >
          Immobilie anfragen
        </Button>
      </div>
    </article>
  );
}
