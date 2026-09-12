import { CalendarRange, DoorOpen, LandPlot, Ruler } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { SiteImage } from "@/components/graphics/SiteImage";
import { resolveFirstImage } from "@/lib/imagery";
import { getFeaturedActiveProperty } from "@/data/properties";

const factIcons = [Ruler, DoorOpen, LandPlot, CalendarRange];

/**
 * Das aktuell verfügbare Objekt, groß auf der Startseite. Gepflegt wird es
 * im Admin-Panel: veröffentlicht, Status nicht „verkauft“, optional als
 * hervorgehoben markiert.
 */
export async function FeaturedProperty() {
  const property = await getFeaturedActiveProperty();
  if (!property) return null;

  const image = resolveFirstImage(property.images);

  const facts = [
    { label: "Wohnfläche", value: `${property.livingSpace.toString().replace(".", ",")} m²` },
    { label: "Zimmer", value: String(property.rooms) },
    ...property.features
      .filter((feature) => !/wohnfläche|zimmer|kaufpreis|preis/i.test(feature.label))
      .slice(0, 2)
      .map((feature) => ({ label: feature.label, value: feature.value })),
  ];

  return (
    <section className="border-y border-border bg-surface-warm py-16 lg:py-20">
      <Container className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14">
        <Reveal>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[14px] bg-surface-mist">
            <SiteImage
              src={image}
              sizes="(min-width: 1024px) 52vw, 100vw"
              label={property.city}
              alt={`${property.title} in ${property.city}`}
            />
            <span className="absolute left-5 top-5 rounded-full bg-white/95 px-3.5 py-1.5 text-[0.6875rem] font-bold uppercase tracking-[0.1em] text-ink shadow-card backdrop-blur">
              {property.statusLabel}
            </span>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <Eyebrow>Aktuell zum Verkauf</Eyebrow>
          <h2 className="balance mt-3 font-display text-display-lg font-bold text-ink">{property.title}</h2>
          <p className="mt-2 text-[0.875rem] font-semibold uppercase tracking-[0.1em] text-text-subtle">
            {property.city}
          </p>

          <p className="pretty mt-5 max-w-lg text-[0.9375rem] leading-relaxed text-text-muted">
            {property.summary}
          </p>

          <dl
            className={`mt-7 grid grid-cols-2 gap-px overflow-hidden rounded-[12px] border border-border bg-border ${
              facts.length >= 4 ? "sm:grid-cols-4" : "sm:grid-cols-3"
            }`}
          >
            {facts.map((fact, index) => {
              const Icon = factIcons[index % factIcons.length]!;
              return (
                <div key={fact.label} className="bg-white px-4 py-4">
                  <dt className="flex items-center gap-1.5 text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-text-subtle">
                    <Icon className="h-3.5 w-3.5 text-accent-mid" strokeWidth={1.6} aria-hidden="true" />
                    {fact.label}
                  </dt>
                  <dd className="mt-1.5 font-display text-[0.9375rem] font-bold text-ink">{fact.value}</dd>
                </div>
              );
            })}
          </dl>

          <div className="mt-7 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-display text-display-md font-extrabold text-ink">{property.priceLabel}</p>
            <div className="flex flex-wrap gap-3">
              <Button href={`/immobilien/${property.slug}`} variant="primary" withArrow>
                Objekt ansehen
              </Button>
              <Button href={`/kontakt?anliegen=kaufen&objekt=${property.slug}`} variant="secondary">
                Besichtigung anfragen
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
