import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PropertyPlaceholder } from "@/components/graphics/PropertyPlaceholder";
import type { Property } from "@/types/property";

export function PropertyCard({ property }: { property: Property }) {
  const image = property.images[0];

  return (
    <Link
      href={`/immobilien/${property.slug}`}
      className="group block overflow-hidden rounded-md border border-border bg-surface transition-shadow duration-500 ease-smooth hover:shadow-soft"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        {image ? (
          <Image
            src={image}
            alt={property.title}
            fill
            sizes="(min-width: 1024px) 33vw, 100vw"
            className="object-cover transition-transform duration-700 ease-smooth group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full transition-transform duration-700 ease-smooth group-hover:scale-105">
            <PropertyPlaceholder label={property.city} />
          </div>
        )}
        <span className="absolute left-4 top-4 rounded-sm bg-background/95 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.08em] text-ink">
          {property.statusLabel}
        </span>
      </div>

      <div className="flex items-start justify-between gap-4 p-6">
        <div>
          <h3 className="font-display text-lg font-semibold text-ink">{property.title}</h3>
          <p className="mt-1 text-sm text-text-muted">{property.city}</p>
          <p className="mt-4 text-sm text-text-muted">
            {property.rooms} Zimmer · ca. {property.livingSpace.toString().replace(".", ",")} m²
          </p>
        </div>
        <div className="flex flex-col items-end gap-3">
          <ArrowUpRight
            className="h-5 w-5 text-text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
            aria-hidden="true"
          />
          <span className="whitespace-nowrap font-display text-base font-semibold text-ink">
            {property.priceLabel}
          </span>
        </div>
      </div>
    </Link>
  );
}
