import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { FloorPlanMotif } from "@/components/graphics/ArchMotif";
import { PropertyPlaceholder } from "@/components/graphics/PropertyPlaceholder";
import { getFeaturedProperty } from "@/data/properties";

export function FeaturedProperty() {
  const property = getFeaturedProperty();
  if (!property) return null;

  return (
    <section className="bg-surface-soft py-24 lg:py-32">
      <Container>
        <Eyebrow>Aktuell im Verkauf</Eyebrow>

        <div className="mt-10 grid gap-10 overflow-hidden rounded-lg border border-border bg-surface lg:grid-cols-2">
          <div className="relative aspect-[4/3] lg:aspect-auto">
            {property.images[0] ? (
              // Replace with next/image once real listing photography is provided.
              <PropertyPlaceholder label={property.city} />
            ) : (
              <div className="relative h-full w-full bg-ink">
                <FloorPlanMotif className="absolute inset-0 h-full w-full p-10 text-white/40 sm:p-14" />
              </div>
            )}
          </div>

          <div className="flex flex-col justify-center p-8 sm:p-12">
            <h3 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
              {property.title}
            </h3>
            <p className="mt-3 text-text-muted">{property.summary}</p>

            <dl className="mt-8 grid grid-cols-2 gap-6 border-t border-border pt-8">
              <div>
                <dt className="text-xs uppercase tracking-[0.1em] text-text-muted">Zimmer</dt>
                <dd className="mt-1 font-display text-xl font-semibold text-ink">{property.rooms} Zimmer</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.1em] text-text-muted">Wohnfläche</dt>
                <dd className="mt-1 font-display text-xl font-semibold text-ink">
                  ca. {property.livingSpace.toString().replace(".", ",")} m²
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.1em] text-text-muted">Lage</dt>
                <dd className="mt-1 font-display text-xl font-semibold text-ink">{property.city}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.1em] text-text-muted">Kaufpreis</dt>
                <dd className="mt-1 font-display text-xl font-semibold text-ink">{property.priceLabel}</dd>
              </div>
            </dl>

            {property.heroNote && (
              <p className="mt-6 text-sm text-text-muted">{property.heroNote}</p>
            )}

            <Button href={`/immobilien/${property.slug}`} variant="primary" withArrow className="group mt-8 w-fit">
              Exposé ansehen
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
