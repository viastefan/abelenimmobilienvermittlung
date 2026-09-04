import Image from "next/image";
import Link from "next/link";
import { Ruler, DoorOpen } from "lucide-react";
import { PropertyPlaceholder } from "@/components/graphics/PropertyPlaceholder";
import type { Property } from "@/types/property";

export function PropertyCard({ property }: { property: Property }) {
  const image = property.images[0];
  const badgeLabel = property.featured ? "Neu im Angebot" : property.statusLabel;

  return (
    <Link
      href={`/immobilien/${property.slug}`}
      className="group block overflow-hidden rounded-lg border border-border bg-white transition-all duration-500 ease-smooth hover:-translate-y-1 hover:shadow-soft"
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
        <span
          className={`absolute left-4 top-4 rounded-sm px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.06em] text-white ${
            property.featured ? "bg-accent" : "bg-ink"
          }`}
        >
          {badgeLabel}
        </span>
      </div>

      <div className="p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.1em] text-accent">{property.city}</p>
        <h3 className="mt-2 font-display text-lg font-semibold text-ink">{property.title}</h3>

        <div className="mt-4 flex items-center gap-4 text-sm text-text-muted">
          <span className="inline-flex items-center gap-1.5">
            <Ruler className="h-4 w-4 text-accent" aria-hidden="true" />
            {property.livingSpace.toString().replace(".", ",")} m²
          </span>
          <span className="inline-flex items-center gap-1.5">
            <DoorOpen className="h-4 w-4 text-accent" aria-hidden="true" />
            {property.rooms} Zimmer
          </span>
        </div>

        <p className="mt-4 border-t border-border pt-4 font-display text-lg font-semibold text-ink">
          {property.priceLabel}
        </p>
      </div>
    </Link>
  );
}
