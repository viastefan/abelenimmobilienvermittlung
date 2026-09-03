import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PropertyPlaceholder } from "@/components/graphics/PropertyPlaceholder";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, propertySchema } from "@/lib/schema";
import { pageSeo } from "@/lib/seo";
import { getProperty, properties } from "@/data/properties";
import { site } from "@/data/site";

export function generateStaticParams() {
  return properties.map((property) => ({ slug: property.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const property = getProperty(slug);
  if (!property) return {};

  return pageSeo({
    title: `${property.title} — ${property.priceLabel}`,
    description: property.summary,
    path: `/immobilien/${property.slug}`,
  });
}

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const property = getProperty(slug);
  if (!property) notFound();

  return (
    <>
      <div className="pt-24 lg:pt-28" />

      <section className="border-b border-border bg-surface-soft py-12 lg:py-16">
        <Container>
          <Eyebrow>{property.statusLabel}</Eyebrow>
          <h1 className="balance mt-5 text-display-lg font-display font-semibold text-ink">
            {property.title}
          </h1>
          <p className="mt-3 text-lg text-text-muted">{property.city}</p>
        </Container>
      </section>

      <section className="py-4">
        <Container>
          <div className="relative aspect-[16/9] overflow-hidden rounded-lg border border-border">
            {property.images[0] ? (
              <Image src={property.images[0]} alt={property.title} fill className="object-cover" priority />
            ) : (
              <PropertyPlaceholder label={property.city} />
            )}
          </div>
        </Container>
      </section>

      <section className="py-16 lg:py-24">
        <Container className="grid gap-16 lg:grid-cols-[1.5fr_1fr] lg:gap-20">
          <div>
            <dl className="grid grid-cols-2 gap-6 border-y border-border py-8 sm:grid-cols-3">
              {property.features.map((feature) => (
                <div key={feature.label}>
                  <dt className="text-xs uppercase tracking-[0.1em] text-text-muted">{feature.label}</dt>
                  <dd className="mt-1 font-display text-lg font-semibold text-ink">{feature.value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-12 space-y-5">
              <h2 className="font-display text-2xl font-semibold text-ink">Beschreibung</h2>
              {property.description.map((paragraph, index) => (
                <p key={index} className="text-base leading-relaxed text-text-muted">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-12">
              <h2 className="font-display text-2xl font-semibold text-ink">Ausstattung</h2>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {property.equipment.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-text">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-12">
              <h2 className="font-display text-2xl font-semibold text-ink">Lage</h2>
              <p className="mt-4 text-base leading-relaxed text-text-muted">{property.location}</p>
            </div>

            <div className="mt-12">
              <h2 className="font-display text-2xl font-semibold text-ink">Energieinformationen</h2>
              <dl className="mt-4 grid gap-4 sm:grid-cols-2">
                {property.energy.map((item) => (
                  <div key={item.label} className="rounded-md border border-border p-4">
                    <dt className="text-xs uppercase tracking-[0.1em] text-text-muted">{item.label}</dt>
                    <dd className="mt-1 text-sm font-medium text-ink">{item.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <aside className="h-fit rounded-lg border border-border bg-surface-soft p-8 lg:sticky lg:top-28">
            <p className="font-display text-3xl font-semibold text-ink">{property.priceLabel}</p>
            {property.heroNote && <p className="mt-2 text-sm text-text-muted">{property.heroNote}</p>}

            <div className="mt-8 border-t border-border pt-8">
              <p className="text-xs uppercase tracking-[0.1em] text-text-muted">Ansprechpartnerin</p>
              <p className="mt-2 font-display text-lg font-semibold text-ink">{site.owner}</p>
              <a href={site.phoneHref} className="block text-sm text-text-muted hover:text-accent">
                {site.phone}
              </a>
              <a href={`mailto:${site.email}`} className="block text-sm text-text-muted hover:text-accent">
                {site.email}
              </a>
            </div>

            <Button
              href={`/kontakt?anliegen=kaufen&objekt=${property.slug}`}
              variant="primary"
              className="mt-8 w-full"
            >
              Besichtigung anfragen
            </Button>
          </aside>
        </Container>
      </section>

      <JsonLd
        data={breadcrumbSchema([
          { name: "Start", path: "/" },
          { name: "Immobilien", path: "/immobilien" },
          { name: property.title, path: `/immobilien/${property.slug}` },
        ])}
      />
      <JsonLd data={propertySchema(property)} />
    </>
  );
}
