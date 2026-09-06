import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check, DoorOpen, Ruler } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SiteImage } from "@/components/graphics/SiteImage";
import { CtaSection } from "@/components/home/CtaSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, propertySchema } from "@/lib/schema";
import { pageSeo } from "@/lib/seo";
import { resolveFirstImage, resolveImage } from "@/lib/imagery";
import { getAllPropertySlugs, getPropertyBySlug } from "@/data/properties";
import { site } from "@/data/site";

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getAllPropertySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);
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
  const property = await getPropertyBySlug(slug);
  if (!property) notFound();

  const heroImage = resolveFirstImage(property.images);
  const gallery = property.images.slice(1).map(resolveImage).filter(Boolean) as string[];

  return (
    <>
      <section className="border-b border-border bg-surface-warm py-10 lg:py-14">
        <Container>
          <Link
            href="/immobilien"
            className="inline-flex items-center gap-2 text-sm font-semibold text-text-muted transition-colors hover:text-accent-deep"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Alle Immobilien
          </Link>

          <div className="mt-8 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <Eyebrow>{property.city}</Eyebrow>
              <h1 className="balance mt-4 font-display text-display-lg font-extrabold text-ink">
                {property.title}
              </h1>
              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.9375rem] text-text-muted">
                <span className="inline-flex items-center gap-2">
                  <Ruler className="h-4 w-4 text-accent-mid" strokeWidth={1.6} aria-hidden="true" />
                  {property.livingSpace.toString().replace(".", ",")} m²
                </span>
                <span className="inline-flex items-center gap-2">
                  <DoorOpen className="h-4 w-4 text-accent-mid" strokeWidth={1.6} aria-hidden="true" />
                  {property.rooms} Zimmer
                </span>
                <span className="rounded-full bg-white px-3 py-1 text-[0.6875rem] font-bold uppercase tracking-[0.1em] text-ink">
                  {property.statusLabel}
                </span>
              </div>
            </div>
            <p className="font-display text-display-md font-extrabold text-ink">{property.priceLabel}</p>
          </div>
        </Container>
      </section>

      <section className="pt-8">
        <Container>
          <div className="relative aspect-[16/9] overflow-hidden rounded-[20px] bg-surface-mist shadow-lift">
            <SiteImage
              src={heroImage}
              priority
              sizes="(min-width: 1024px) 90vw, 100vw"
              label={property.city}
              alt={`${property.title} in ${property.city}`}
            />
          </div>

          {gallery.length > 0 && (
            <div className="mt-3 grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6">
              {gallery.map((image, index) => (
                <div
                  key={image}
                  className="relative aspect-square overflow-hidden rounded-[12px] border border-border"
                >
                  <Image
                    src={image}
                    alt={`${property.title} — Bild ${index + 2}`}
                    fill
                    sizes="200px"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </Container>
      </section>

      <section className="py-16 lg:py-24">
        <Container className="grid gap-12 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-20">
          <div>
            {property.features.length > 0 && (
              <dl className="grid grid-cols-2 gap-6 border-y border-border py-8 sm:grid-cols-4">
                {property.features.map((feature) => (
                  <div key={feature.label}>
                    <dt className="text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-text-subtle">
                      {feature.label}
                    </dt>
                    <dd className="mt-1.5 font-display text-lg font-bold text-ink">{feature.value}</dd>
                  </div>
                ))}
              </dl>
            )}

            <div className="mt-12 space-y-5">
              <h2 className="font-display text-display-sm font-bold text-ink">Objektbeschreibung</h2>
              {property.description.map((paragraph, index) => (
                <p key={index} className="pretty text-[1.0625rem] leading-relaxed text-text-muted">
                  {paragraph}
                </p>
              ))}
            </div>

            {property.equipment.length > 0 && (
              <div className="mt-12">
                <h2 className="font-display text-display-sm font-bold text-ink">Ausstattung</h2>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {property.equipment.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-[0.9375rem] text-text-muted">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-deep" strokeWidth={2.2} aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-12">
              <h2 className="font-display text-display-sm font-bold text-ink">Lage</h2>
              <p className="pretty mt-5 text-[1.0625rem] leading-relaxed text-text-muted">{property.location}</p>
            </div>

            {property.energy.length > 0 && (
              <div className="mt-12">
                <h2 className="font-display text-display-sm font-bold text-ink">Energieinformationen</h2>
                <dl className="mt-5 grid gap-4 sm:grid-cols-2">
                  {property.energy.map((item) => (
                    <div key={item.label} className="rounded-[12px] border border-border p-5">
                      <dt className="text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-text-subtle">
                        {item.label}
                      </dt>
                      <dd className="mt-1.5 text-[0.9375rem] font-semibold text-ink">{item.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
          </div>

          <aside className="h-fit rounded-[20px] border border-border bg-surface-warm p-8 lg:sticky lg:top-32">
            <p className="font-display text-3xl font-extrabold text-ink">{property.priceLabel}</p>
            {property.heroNote && <p className="mt-2 text-sm text-text-muted">{property.heroNote}</p>}

            <div className="mt-8 border-t border-border pt-8">
              <p className="text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-text-subtle">
                Ihre Ansprechpartnerin
              </p>
              <p className="mt-2 font-display text-[1.0625rem] font-bold text-ink">{site.owner}</p>
              <a
                href={site.phoneHref}
                className="mt-2 block text-[0.9375rem] text-text-muted transition-colors hover:text-accent-deep"
              >
                {site.phone}
              </a>
              <a
                href={`mailto:${site.email}`}
                className="block text-[0.9375rem] text-text-muted transition-colors hover:text-accent-deep"
              >
                {site.email}
              </a>
            </div>

            <Button
              href={`/kontakt?anliegen=kaufen&objekt=${property.slug}`}
              variant="primary"
              withArrow
              className="mt-8 w-full"
            >
              Besichtigung anfragen
            </Button>
          </aside>
        </Container>
      </section>

      <CtaSection />

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
