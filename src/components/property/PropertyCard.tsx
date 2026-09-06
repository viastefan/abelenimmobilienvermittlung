import Link from "next/link";
import { CalendarRange, DoorOpen, Ruler } from "lucide-react";
import { SiteImage } from "@/components/graphics/SiteImage";
import { resolveFirstImage } from "@/lib/imagery";
import type { Property } from "@/types/property";

export function PropertyCard({ property }: { property: Property }) {
  const image = resolveFirstImage(property.images);

  return (
    <Link
      href={`/immobilien/${property.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-[16px] border border-border bg-white transition-all duration-300 ease-smooth hover:-translate-y-1 hover:border-accent-light hover:shadow-soft"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-surface-mist">
        <div className="h-full w-full transition-transform duration-700 ease-smooth group-hover:scale-[1.04]">
          <SiteImage
            src={image}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            label={property.city}
            alt={`${property.title} in ${property.city}`}
          />
        </div>
        <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-[0.6875rem] font-bold uppercase tracking-[0.1em] text-ink shadow-card backdrop-blur">
          {property.statusLabel}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-accent-deep">
          {property.city}
        </p>
        <h3 className="mt-2 font-display text-[1.125rem] font-bold leading-snug text-ink">
          {property.title}
        </h3>

        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-[0.8125rem] text-text-muted">
          <span className="inline-flex items-center gap-1.5">
            <Ruler className="h-4 w-4 text-accent-mid" strokeWidth={1.5} aria-hidden="true" />
            {property.livingSpace.toString().replace(".", ",")} m²
          </span>
          <span className="inline-flex items-center gap-1.5">
            <DoorOpen className="h-4 w-4 text-accent-mid" strokeWidth={1.5} aria-hidden="true" />
            {property.rooms} Zimmer
          </span>
          {property.features.find((feature) => feature.label.toLowerCase().includes("baujahr")) && (
            <span className="inline-flex items-center gap-1.5">
              <CalendarRange className="h-4 w-4 text-accent-mid" strokeWidth={1.5} aria-hidden="true" />
              Baujahr{" "}
              {property.features.find((feature) => feature.label.toLowerCase().includes("baujahr"))!.value}
            </span>
          )}
        </div>

        <p className="mt-auto pt-5 font-display text-[1.25rem] font-extrabold text-ink">
          {property.priceLabel}
        </p>
      </div>
    </Link>
  );
}
