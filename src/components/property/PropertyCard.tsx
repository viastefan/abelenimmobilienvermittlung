import Link from "next/link";
import { ArrowUpRight, CalendarRange, DoorOpen, Ruler } from "lucide-react";
import { SiteImage } from "@/components/graphics/SiteImage";
import { CardGallery } from "@/components/property/CardGallery";
import type { Property } from "@/types/property";
import { zusammenhalten } from "@/lib/typografie";

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
  images = [],
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
}: {
  property: Property;
  /** Bereits aufgelöste Bildpfade. Ab dem zweiten entsteht ein Wechsler. */
  images?: string[];
  sizes?: string;
}) {
  const year = property.features.find((feature) => feature.label.toLowerCase().includes("baujahr"));

  const meta = [
    { icon: Ruler, value: `${property.livingSpace.toString().replace(".", ",")} m²` },
    { icon: DoorOpen, value: `${property.rooms} Zimmer` },
    ...(year ? [{ icon: CalendarRange, value: `Baujahr ${year.value}` }] : []),
  ];

  return (
    <article className="group relative flex h-full w-full flex-col overflow-hidden rounded-[24px] bg-white shadow-soft ring-1 ring-border transition-all duration-500 ease-smooth hover:-translate-y-1 hover:ring-accent-light hover:shadow-lift">
      {images.length > 1 ? (
        <CardGallery
          images={images}
          alt={`${property.title} in ${property.city}`}
          sizes={sizes}
        />
      ) : (
        <div className="relative aspect-[4/3] overflow-hidden bg-surface-mist">
          <div className="h-full w-full transition-transform duration-[900ms] ease-smooth group-hover:scale-[1.05]">
            <SiteImage
              src={images[0]}
              sizes={sizes}
              label={property.city}
              alt={`${property.title} in ${property.city}`}
            />
          </div>
        </div>
      )}

      <span
        className={`pointer-events-none absolute left-4 top-4 z-10 rounded-full px-3 py-1.5 text-[0.8125rem] font-semibold shadow-card backdrop-blur ${
          statusTone[property.status] ?? "bg-white/90 text-ink"
        }`}
      >
        {property.statusLabel}
      </span>

      <div className="flex flex-1 flex-col p-5">
        <span className="inline-flex w-fit items-center rounded-full bg-accent-soft px-2.5 py-1 text-[0.6875rem] font-semibold text-accent-deep">
          {property.city}
        </span>

        {/* Zwei Zeilen fest eingeplant: sonst rutscht bei einem langen Titel
            alles Darunterliegende nach unten und die Karten stehen krumm. */}
        <h3 className="mt-3 line-clamp-2 min-h-[2.75rem] font-display text-[1.0625rem] font-bold leading-snug text-ink">
          {/* Der Link deckt die ganze Karte ab; die Pfeile der Galerie liegen
              mit z-10 darüber und bleiben anklickbar. */}
          <Link href={`/immobilien/${property.slug}`} className="after:absolute after:inset-0">
            {property.title}
          </Link>
        </h3>

        <div className="mt-4 flex flex-wrap gap-2">
          {meta.map((item) => (
            <span
              key={item.value}
              className="inline-flex items-center gap-1.5 rounded-[14px] bg-surface-cool px-2.5 py-1.5 text-[0.75rem] font-medium text-text-muted"
            >
              <item.icon className="h-3.5 w-3.5 text-accent-mid" strokeWidth={1.8} aria-hidden="true" />
              {zusammenhalten(item.value)}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-end justify-between gap-4 pt-5">
          <span>
            <span className="block text-[0.75rem] font-medium text-text-subtle">
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
    </article>
  );
}
