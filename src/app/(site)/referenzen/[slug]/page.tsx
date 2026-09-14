import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Car, CalendarRange, Check, DoorOpen, Images, LandPlot, MapPin, Ruler } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SiteImage } from "@/components/graphics/SiteImage";
import { PropertyGallery } from "@/components/property/PropertyGallery";
import { TestimonialCard } from "@/components/references/TestimonialCard";
import { CtaSection } from "@/components/home/CtaSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { pageSeo } from "@/lib/seo";
import { getAllReferenceSlugs, getReferenceBySlug } from "@/data/references";
import { resolveFirstImage, resolveImages } from "@/lib/imagery";

type Params = { params: Promise<{ slug: string }> };

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getAllReferenceSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const item = await getReferenceBySlug(slug);
  if (!item) return {};

  return pageSeo({
    title: `${item.title} — ${item.region}`,
    description: item.summary,
    path: `/referenzen/${item.slug}`,
  });
}

export default async function ReferenceDetailPage({ params }: Params) {
  const { slug } = await params;
  const item = await getReferenceBySlug(slug);
  if (!item) notFound();

  const statusLabel = item.categoryLabel;
  const gallery = resolveImages(item.images);
  const heroImage = resolveFirstImage(item.images);
  const alt = `${item.typeLabel} in ${item.region}`;

  const facts = [
    { icon: Ruler, label: "Wohnfläche", value: `${item.livingSpace} m²` },
    { icon: DoorOpen, label: "Zimmer", value: `${item.rooms}` },
    ...(item.year ? [{ icon: CalendarRange, label: "Baujahr", value: `${item.year}` }] : []),
    ...(item.plot ? [{ icon: LandPlot, label: "Grundstück", value: `${item.plot} m²` }] : []),
    ...(item.parking ? [{ icon: Car, label: "Stellplätze", value: `${item.parking}` }] : []),
  ];

  return (
    <>
      {/* Gleicher Auftakt wie bei den Objekten: erst das Haus, dann die Zahlen. */}
      <section className="relative">
        <div className="relative h-[54vh] min-h-[20rem] w-full overflow-hidden bg-surface-mist lg:max-h-[34rem]">
          <SiteImage src={heroImage} priority sizes="100vw" label={item.region} alt={alt} />
          <div
            className="absolute inset-0 bg-gradient-to-t from-ink-deep/90 via-ink-deep/55 to-ink-deep/20"
            aria-hidden="true"
          />

          <Container className="absolute inset-x-0 top-0 pt-6">
            <Link
              href="/referenzen"
              className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-[0.8125rem] font-semibold text-white backdrop-blur transition-colors duration-200 hover:bg-white/20"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Alle Referenzen
            </Link>
          </Container>

          <Container className="absolute inset-x-0 bottom-0 pb-20 lg:pb-28">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-[0.8125rem] font-semibold text-ink">
                <Check className="h-3.5 w-3.5 text-accent-deep" strokeWidth={2.4} aria-hidden="true" />
                {statusLabel}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3.5 py-1.5 text-[0.8125rem] font-medium text-white backdrop-blur">
                <MapPin className="h-3.5 w-3.5 text-accent-light" strokeWidth={1.8} aria-hidden="true" />
                {item.region}
              </span>
            </div>

            <h1 className="balance mt-4 max-w-3xl font-display text-display-xl font-extrabold text-white">
              {item.title}
            </h1>

            {gallery.length > 1 && (
              <a
                href="#galerie"
                className="mt-5 inline-flex items-center gap-2 text-[0.9375rem] font-semibold text-white transition-colors hover:text-accent-light"
              >
                <Images className="h-4 w-4" strokeWidth={1.6} aria-hidden="true" />
                Alle {gallery.length} Bilder
              </a>
            )}
          </Container>
        </div>

        <Container>
          <div className="relative -mt-10 rounded-[18px] border border-border bg-white p-6 shadow-lift lg:-mt-14 lg:p-8">
            <dl className="grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-3 lg:grid-cols-5">
              {facts.map((fact) => (
                <div key={fact.label}>
                  <dt className="flex items-center gap-2 text-[0.8125rem] font-medium text-text-subtle">
                    <fact.icon className="h-4 w-4 text-accent-mid" strokeWidth={1.6} aria-hidden="true" />
                    {fact.label}
                  </dt>
                  <dd className="mt-1.5 font-display text-[1.0625rem] font-extrabold leading-tight text-ink">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>

            <p className="pretty mt-7 border-t border-border pt-6 text-[0.9375rem] leading-relaxed text-text-muted">
              {item.summary}
            </p>
          </div>
        </Container>
      </section>

      <section className="py-14 lg:py-20">
        <Container className="grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-20">
          <div>
            <h2 className="font-display text-display-sm font-bold text-ink">Objektbeschreibung</h2>
            <div className="mt-5 space-y-5 text-[1.0625rem] leading-relaxed text-text-muted">
              {item.description.map((paragraph) => (
                <p key={paragraph} className="pretty">
                  {paragraph}
                </p>
              ))}
            </div>

            <h2 className="mt-12 font-display text-display-sm font-bold text-ink">Lage</h2>
            <p className="pretty mt-5 flex gap-3 text-[1.0625rem] leading-relaxed text-text-muted">
              <MapPin className="mt-1 h-5 w-5 shrink-0 text-accent-mid" strokeWidth={1.6} aria-hidden="true" />
              {item.location}
            </p>

            {item.testimonial && (
              <TestimonialCard
                testimonial={item.testimonial}
                author={`Verkäuferin bzw. Verkäufer — ${item.title}`}
                className="mt-12"
              />
            )}
          </div>

          <aside>
            <div className="rounded-[16px] border border-border bg-surface-warm p-7">
              <h2 className="font-display text-display-sm font-bold text-ink">Ausstattung</h2>
              <ul className="mt-5 space-y-3">
                {item.equipment.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-[0.9375rem] text-text-muted">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-deep" strokeWidth={2.2} aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap gap-2 border-t border-border pt-6">
                <span className="inline-flex items-center gap-1.5 rounded-[10px] bg-white px-2.5 py-1.5 text-[0.75rem] font-medium text-text-muted">
                  {statusLabel}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-[10px] bg-white px-2.5 py-1.5 text-[0.75rem] font-medium text-text-muted">
                  {item.typeLabel}
                </span>
              </div>
            </div>
          </aside>
        </Container>
      </section>

      {gallery.length > 0 && (
        <section id="galerie" className="overflow-hidden border-t border-border bg-surface-warm py-14 lg:py-20">
          <Container>
            <h2 className="font-display text-display-sm font-bold text-ink">Bildergalerie</h2>
            <p className="mt-2 text-[0.9375rem] text-text-muted">
              {gallery.length === 1
                ? "Ein Bild — tippen für die Vollbildansicht."
                : `${gallery.length} Bilder — tippen oder wischen für die Vollbildansicht.`}
            </p>
          </Container>
          <div className="mx-auto mt-8 w-full max-w-content">
            <PropertyGallery images={gallery} title={item.title} city={item.region} />
          </div>
        </section>
      )}

      <CtaSection
        title="Sie möchten Ihre Immobilie ebenfalls verkaufen?"
        description="Wir starten mit einer fundierten Einschätzung — persönlich und unverbindlich."
        buttonLabel="Immobilie bewerten"
        href="/bewertung"
      />

      <JsonLd
        data={breadcrumbSchema([
          { name: "Start", path: "/" },
          { name: "Referenzen", path: "/referenzen" },
          { name: item.title, path: `/referenzen/${item.slug}` },
        ])}
      />
    </>
  );
}
