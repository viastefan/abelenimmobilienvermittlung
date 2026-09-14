import Link from "next/link";
import { ArrowRight, CalendarRange, DoorOpen, Ruler } from "lucide-react";
import { SiteImage } from "@/components/graphics/SiteImage";
import type { ReferenceObject } from "@/types/reference";

/**
 * Referenzkarte — eine Gestaltung für Übersicht und Startseiten-Galerie.
 * Das Bild wird als Prop übergeben, damit die Karte auch in
 * Client-Komponenten funktioniert (die Auflösung passiert serverseitig).
 */
export function ReferenceCard({
  reference,
  image,
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
  compact = false,
}: {
  reference: ReferenceObject;
  image?: string;
  sizes?: string;
  compact?: boolean;
}) {
  return (
    <Link
      href={`/referenzen/${reference.slug}`}
      className="group flex h-full w-full flex-col overflow-hidden rounded-[16px] border border-border bg-white transition-all duration-500 ease-smooth hover:-translate-y-1 hover:border-accent-light hover:shadow-lift"
    >
      <div className={`relative overflow-hidden bg-surface-mist ${compact ? "aspect-[16/10]" : "aspect-[4/3]"}`}>
        <div className="h-full w-full transition-transform duration-[900ms] ease-smooth group-hover:scale-[1.05]">
          <SiteImage
            src={image}
            sizes={sizes}
            label={reference.region}
            alt={`${reference.typeLabel || reference.title} in ${reference.region}`}
          />
        </div>
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-[0.6875rem] font-bold uppercase tracking-[0.1em] text-ink shadow-card backdrop-blur">
          {reference.categoryLabel}
        </span>
      </div>

      <div className={`flex flex-1 flex-col ${compact ? "px-5 py-5" : "p-6"}`}>
        <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-accent-deep">
          {reference.region}
        </p>
        <h3
          className={`mt-2 font-display font-bold leading-snug text-ink ${
            compact ? "text-[1rem]" : "text-[1.125rem]"
          }`}
        >
          {reference.title}
        </h3>
        <p className="mt-1 text-[0.8125rem] text-text-muted">{reference.typeLabel}</p>

        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-[0.8125rem] text-text-muted">
          <span className="inline-flex items-center gap-1.5">
            <Ruler className="h-4 w-4 text-accent-mid" strokeWidth={1.5} aria-hidden="true" />
            {reference.livingSpace} m²
          </span>
          <span className="inline-flex items-center gap-1.5">
            <DoorOpen className="h-4 w-4 text-accent-mid" strokeWidth={1.5} aria-hidden="true" />
            {reference.rooms} Zimmer
          </span>
          {reference.year && (
            <span className="inline-flex items-center gap-1.5">
              <CalendarRange className="h-4 w-4 text-accent-mid" strokeWidth={1.5} aria-hidden="true" />
              {reference.year}
            </span>
          )}
        </div>

        <span className="mt-auto inline-flex items-center gap-2 pt-5 text-[0.8125rem] font-semibold text-accent-deep">
          Objekt ansehen
          <ArrowRight
            className="h-4 w-4 transition-transform duration-300 ease-smooth group-hover:translate-x-1"
            aria-hidden="true"
          />
        </span>
      </div>
    </Link>
  );
}
