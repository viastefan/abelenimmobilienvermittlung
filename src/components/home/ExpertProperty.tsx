"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown, Plus } from "lucide-react";
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
  /** Die drei Angaben, die immer sichtbar sind. */
  facts: PropertyFact[];
  /** Alles Weitere — erscheint erst beim Aufklappen. */
  details: { label: string; value: string }[];
  equipment: string[];
  images: string[];
};

/**
 * Das aktuelle Angebot als Karte: oben die Aufnahmen als Diashow, darunter
 * die Eckdaten und die Anfrage. Die Karte zeigt bewusst nur ein Objekt —
 * die übrigen stehen weiter unten in ihrem eigenen Abschnitt, damit keines
 * zweimal auf der Seite erscheint.
 *
 * Drei Angaben stehen offen, der Rest liegt hinter dem vierten Feld. Ein
 * vollständiges Exposé neben dem Fließtext erschlüge beides.
 */
export function ExpertProperty({ property }: { property: ExpertPropertyData }) {
  const { trackRef, index, goTo, dragging, dragProps } = useSnapTrack<HTMLUListElement>(
    property.images.length
  );
  const [open, setOpen] = useState(false);
  const many = property.images.length > 1;
  const href = `/immobilien/${property.slug}`;
  const hasDetails = property.details.length > 0 || property.equipment.length > 0;

  return (
    <article className="overflow-hidden rounded-[24px] bg-white shadow-lift sm:rounded-[28px]">
      <div className="relative aspect-[4/3] bg-surface-mist">
        {property.images.length > 0 ? (
          <ul
            ref={trackRef}
            {...dragProps}
            className={`no-scrollbar flex h-full snap-x snap-mandatory overflow-x-auto overscroll-x-contain ${
              dragging ? "cursor-grabbing select-none" : many ? "lg:cursor-grab" : ""
            }`}
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

        <PropertyFacts
          facts={property.facts}
          className="mt-6"
          trailing={
            hasDetails ? (
              <button
                type="button"
                onClick={() => setOpen((value) => !value)}
                aria-expanded={open}
                aria-controls={`details-${property.slug}`}
                className="group flex items-start gap-3 text-left"
              >
                <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center text-accent-mid">
                  <Plus
                    className={`h-4 w-4 transition-transform duration-300 ease-smooth ${
                      open ? "rotate-45" : ""
                    }`}
                    strokeWidth={1.7}
                    aria-hidden="true"
                  />
                </span>
                <span className="min-w-0">
                  <span className="block text-[0.75rem] font-medium text-text-subtle">
                    {property.details.length} weitere
                  </span>
                  <span className="mt-0.5 flex items-center gap-1 font-display text-[0.9375rem] font-bold text-accent-deep transition-colors duration-300 group-hover:text-accent-dark">
                    {open ? "Weniger" : "Alle Details"}
                    <ChevronDown
                      className={`h-3.5 w-3.5 transition-transform duration-300 ease-smooth ${
                        open ? "rotate-180" : ""
                      }`}
                      strokeWidth={2.2}
                      aria-hidden="true"
                    />
                  </span>
                </span>
              </button>
            ) : undefined
          }
        />

        {hasDetails && (
          // Ausgeblendet über die Rasterhöhe: so lässt sich das Aufklappen
          // weich zeigen, ohne die Höhe des Inhalts vorher zu kennen.
          <div
            id={`details-${property.slug}`}
            className={`grid transition-all duration-500 ease-smooth ${
              open ? "mt-5 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="overflow-hidden">
              <div className="rounded-[24px] bg-surface-warm p-5">
                <dl className="grid gap-x-5 gap-y-3 sm:grid-cols-2">
                  {property.details.map((detail) => (
                    <div key={detail.label} className="flex justify-between gap-4">
                      <dt className="text-[0.8125rem] text-text-muted">{detail.label}</dt>
                      <dd className="text-right text-[0.8125rem] font-semibold text-ink">
                        {detail.value}
                      </dd>
                    </div>
                  ))}
                </dl>

                {property.equipment.length > 0 && (
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {property.equipment.map((item) => (
                      <li
                        key={item}
                        className="rounded-full bg-white px-3 py-1.5 text-[0.8125rem] text-text-muted"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 flex flex-wrap items-end justify-between gap-x-4 gap-y-2 pt-5">
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
            Zum Objekt
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
