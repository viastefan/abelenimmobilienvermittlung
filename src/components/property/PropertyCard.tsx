import Link from "next/link";
import { ArrowUpRight, CalendarRange, DoorOpen, Ruler } from "lucide-react";
import { SiteImage } from "@/components/graphics/SiteImage";
import type { Property } from "@/types/property";

const statusTone: Record<string, string> = {
  "zu-verkaufen": "bg-white/90 text-ink",
  reserviert: "bg-warning-soft text-warning",
  verkauft: "bg-ink/85 text-white",
};

/**
 * Objektkarte. Das Bild wird als Prop übergeben, damit die Karte auch in
 * Client-Kontexten (Galerie) funktioniert.
 */
export function PropertyCard({
  property,
  image,
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
}: {
  property: Property;
  image?: string;
  sizes?: string;
}) {
  const year = property.features.find((feature) => feature.label.toLowerCase().includes("baujahr"));

  const meta = [
    { icon: Ruler, value: `${property.livingSpace.toString().replace(".", ",")} m²` },
    { icon: DoorOpen, value: `${property.rooms} Zimmer` },
    ...(year ? [{ icon: CalendarRange, value: `Baujahr ${year.value}` }] : []),
  ];

  return (
    <Link
      href={`/immobilien/${property.slug}`}
      className="group flex h-full w-full flex-col overflow-hidden rounded-[16px] border border-border bg-white transition-all duration-500 ease-smooth hover:-translate-y-1 hover:border-accent-light hover:shadow-lift"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-surface-mist">
        <div className="h-full w-full transition-transform duration-[900ms] ease-smooth group-hover:scale-[1.05]">
          <SiteImage src={image} sizes={sizes} label={property.city} alt={`${property.title} in ${property.city}`} />
        </div>
        <span
          className={`absolute left-4 top-4 rounded-full px-3 py-1.5 text-[0.6875rem] font-bold uppercase tracking-[0.1em] shadow-card backdrop-blur ${
            statusTone[property.status] ?? "bg-white/90 text-ink"
          }`}
        >
          {property.statusLabel}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-accent-deep">
          {property.city}
        </p>
        <h3 className="mt-2 font-display text-[1.0625rem] font-bold leading-snug text-ink">
          {property.title}
        </h3>

        <div className="mt-4 flex flex-wrap items-center text-[0.8125rem] text-text-muted">
          {meta.map((item, index) => (
            <span key={item.value} className="inline-flex items-center">
              {index > 0 && <span className="mx-2.5 h-3 w-px bg-border" aria-hidden="true" />}
              <item.icon className="mr-1.5 h-4 w-4 text-accent-mid" strokeWidth={1.5} aria-hidden="true" />
              {item.value}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-end justify-between gap-4 border-t border-border pt-5">
          <span>
            <span className="block text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-text-subtle">
              Kaufpreis
            </span>
            <span className="mt-1 block font-display text-[1.25rem] font-extrabold leading-none text-ink">
              {property.priceLabel}
            </span>
          </span>
          <span
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-soft text-accent-deep transition-all duration-300 ease-smooth group-hover:bg-accent-deep group-hover:text-white"
            aria-hidden="true"
          >
            <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
          </span>
        </div>
      </div>
    </Link>
  );
}
