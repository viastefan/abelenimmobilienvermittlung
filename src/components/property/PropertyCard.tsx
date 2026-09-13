import Link from "next/link";
import { CalendarRange, DoorOpen, Ruler } from "lucide-react";
import { SiteImage } from "@/components/graphics/SiteImage";
import { resolveFirstImage } from "@/lib/imagery";
import type { Property } from "@/types/property";

export function PropertyCard({ property }: { property: Property }) {
  const image = resolveFirstImage(property.images);
  const year = property.features.find((feature) => feature.label.toLowerCase().includes("baujahr"));

  const meta = [
    { icon: Ruler, value: `${property.livingSpace.toString().replace(".", ",")} m²` },
    { icon: DoorOpen, value: `${property.rooms} Zimmer` },
    ...(year ? [{ icon: CalendarRange, value: `Baujahr ${year.value}` }] : []),
  ];

  return (
    <Link
      href={`/immobilien/${property.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-[12px] border border-border bg-white transition-all duration-300 ease-smooth hover:-translate-y-1 hover:border-accent-light hover:shadow-soft"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-surface-mist">
        <div className="h-full w-full transition-transform duration-700 ease-smooth group-hover:scale-[1.04]">
          <SiteImage
            src={image}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            label={property.city}
            alt={`${property.title} in ${property.city}`}
          />
        </div>
      </div>

      <div className="flex flex-1 flex-col px-5 py-4">
        <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-accent-deep">
          {property.city}
        </p>
        <h3 className="mt-1.5 font-display text-[0.9375rem] font-bold leading-snug text-ink">
          {property.title}
        </h3>

        <div className="mt-3 flex flex-wrap items-center text-[0.75rem] text-text-muted">
          {meta.map((item, index) => (
            <span key={item.value} className="inline-flex items-center">
              {index > 0 && <span className="mx-2.5 h-3 w-px bg-border" aria-hidden="true" />}
              <item.icon className="mr-1.5 h-3.5 w-3.5 text-accent-mid" strokeWidth={1.6} aria-hidden="true" />
              {item.value}
            </span>
          ))}
        </div>

        <p className="mt-auto border-t border-border pt-3.5 font-display text-[1.0625rem] font-extrabold text-ink">
          {property.priceLabel}
        </p>
      </div>
    </Link>
  );
}
