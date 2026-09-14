import Link from "next/link";
import { ArrowRight, CalendarRange, DoorOpen, Ruler } from "lucide-react";
import { SiteImage } from "@/components/graphics/SiteImage";
import { CardGallery } from "@/components/property/CardGallery";
import type { ReferenceObject } from "@/types/reference";

/**
 * Referenzkarte — eine Gestaltung für Übersicht und Startseiten-Galerie.
 * Das Bild wird als Prop übergeben, damit die Karte auch in
 * Client-Komponenten funktioniert (die Auflösung passiert serverseitig).
 */
export function ReferenceCard({
  reference,
  images = [],
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
  compact = false,
}: {
  reference: ReferenceObject;
  /** Bereits aufgelöste Bildpfade. Ab dem zweiten entsteht ein Wechsler. */
  images?: string[];
  sizes?: string;
  compact?: boolean;
}) {
  const facts = [
    { icon: Ruler, value: `${reference.livingSpace} m²` },
    { icon: DoorOpen, value: `${reference.rooms} Zimmer` },
    ...(reference.year ? [{ icon: CalendarRange, value: `${reference.year}` }] : []),
  ];

  return (
    <article className="group relative flex h-full w-full flex-col overflow-hidden rounded-[16px] border border-border bg-white transition-all duration-500 ease-smooth hover:-translate-y-1 hover:border-accent-light hover:shadow-lift">
      {images.length > 1 ? (
        <CardGallery
          images={images}
          alt={`${reference.typeLabel || reference.title} in ${reference.region}`}
          sizes={sizes}
          aspect={compact ? "aspect-[16/10]" : "aspect-[4/3]"}
        />
      ) : (
        <div className={`relative overflow-hidden bg-surface-mist ${compact ? "aspect-[16/10]" : "aspect-[4/3]"}`}>
          <div className="h-full w-full transition-transform duration-[900ms] ease-smooth group-hover:scale-[1.05]">
            <SiteImage
              src={images[0]}
              sizes={sizes}
              label={reference.region}
              alt={`${reference.typeLabel || reference.title} in ${reference.region}`}
            />
          </div>
        </div>
      )}

      <span className="pointer-events-none absolute left-4 top-4 z-10 rounded-full bg-white/90 px-3 py-1.5 text-[0.8125rem] font-semibold text-ink shadow-card backdrop-blur">
        {reference.categoryLabel}
      </span>

      <div className={`flex flex-1 flex-col ${compact ? "p-5" : "p-6"}`}>
        <span className="inline-flex w-fit items-center rounded-full bg-accent-soft px-2.5 py-1 text-[0.6875rem] font-semibold text-accent-deep">
          {reference.region}
        </span>

        <h3
          className={`mt-3 line-clamp-2 min-h-[2.75rem] font-display font-bold leading-snug text-ink ${
            compact ? "text-[1rem]" : "text-[1.125rem]"
          }`}
        >
          <Link href={`/referenzen/${reference.slug}`} className="after:absolute after:inset-0">
            {reference.title}
          </Link>
        </h3>

        <div className="mt-4 flex flex-wrap gap-2">
          {facts.map((fact) => (
            <span
              key={fact.value}
              className="inline-flex items-center gap-1.5 rounded-[10px] bg-surface-cool px-2.5 py-1.5 text-[0.75rem] font-medium text-text-muted"
            >
              <fact.icon className="h-3.5 w-3.5 text-accent-mid" strokeWidth={1.8} aria-hidden="true" />
              {fact.value}
            </span>
          ))}
        </div>

        <span className="mt-auto inline-flex items-center gap-2 pt-5 text-[0.8125rem] font-semibold text-accent-deep">
          Objekt ansehen
          <ArrowRight
            className="h-4 w-4 transition-transform duration-300 ease-smooth group-hover:translate-x-1"
            aria-hidden="true"
          />
        </span>
      </div>
    </article>
  );
}
