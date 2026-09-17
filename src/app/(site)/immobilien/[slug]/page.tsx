import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check, DoorOpen, Images, Mail, Ruler } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SiteImage } from "@/components/graphics/SiteImage";
import { PropertyGallery } from "@/components/property/PropertyGallery";
import { MobileActionBar } from "@/components/property/MobileActionBar";
import { ContactButton } from "@/components/contact/ContactButton";
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
  const gallery = property.images.map(resolveImage).filter(Boolean) as string[];
  const alt = `${property.title} in ${property.city}`;
  const objectRef = `${property.title}, ${property.city}`;

  // Fläche und Zimmerzahl stehen oft auch in den Objektdaten — in der
  // Eckdatenzeile soll jede Angabe trotzdem nur einmal auftauchen.
  const keyFacts: { label: string; value: string }[] = [];
  const seen = new Set<string>();
  for (const fact of [
    { label: "Kaufpreis", value: property.priceLabel },
    { label: "Wohnfläche", value: `${property.livingSpace.toString().replace(".", ",")} m²` },
    { label: "Zimmer", value: `${property.rooms}` },
    ...property.features,
  ]) {
    const key = fact.label.trim().toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    keyFacts.push(fact);
    if (keyFacts.length === 6) break;
  }

  return (
    <>
      {/* Kopfbereich über die ganze Breite — das Objekt zuerst, alles andere danach. */}
      <section className="relative">
        <div className="relative h-[62vh] min-h-[22rem] w-full overflow-hidden bg-surface-mist lg:max-h-[38rem]">
          <SiteImage src={heroImage} priority sizes="100vw" label={property.city} alt={alt} />
          <div
            className="absolute inset-0 bg-gradient-to-t from-ink-deep/90 via-ink-deep/55 to-ink-deep/20"
            aria-hidden="true"
          />

          <Container className="absolute inset-x-0 top-0 pt-6">
            <Link
              href="/referenzen"
              className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2.5 text-[0.8125rem] font-semibold text-white backdrop-blur transition-colors duration-200 hover:bg-white/20"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Alle Immobilien
            </Link>
          </Container>

          <Container className="absolute inset-x-0 bottom-0 pb-20 lg:pb-28">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-white px-3.5 py-1.5 text-[0.8125rem] font-semibold text-ink">
                {property.statusLabel}
              </span>
              <span className="text-[0.8125rem] font-semibold text-accent-light">
                {property.city}
              </span>
            </div>

            <h1 className="balance mt-4 max-w-3xl font-display text-display-xl font-extrabold text-white">
              {property.title}
            </h1>

            <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3 text-[0.9375rem] text-white/85">
              <span className="inline-flex items-center gap-2">
                <Ruler className="h-4 w-4 text-accent-light" strokeWidth={1.6} aria-hidden="true" />
                {property.livingSpace.toString().replace(".", ",")} m² Wohnfläche
              </span>
              <span className="inline-flex items-center gap-2">
                <DoorOpen className="h-4 w-4 text-accent-light" strokeWidth={1.6} aria-hidden="true" />
                {property.rooms} Zimmer
              </span>
              {gallery.length > 1 && (
                <a
                  href="#galerie"
                  className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3.5 py-2 font-semibold text-white backdrop-blur transition-colors duration-200 hover:bg-white/25"
                >
                  <Images className="h-4 w-4" strokeWidth={1.6} aria-hidden="true" />
                  Alle {gallery.length} Bilder
                </a>
              )}
            </div>
          </Container>
        </div>

        {/* Eckdaten überlappen den Kopfbereich — wie eine Karte auf dem Foto. */}
        <Container>
          <div className="relative -mt-10 rounded-[24px] bg-white shadow-soft ring-1 ring-border p-6 shadow-lift lg:-mt-14 lg:p-8">
            <dl className="grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-3 lg:grid-cols-6">
              {keyFacts.map((fact) => (
                <div key={fact.label}>
                  <dt className="text-[0.8125rem] font-medium text-text-subtle">
                    {fact.label}
                  </dt>
                  <dd className="mt-1.5 font-display text-[1.0625rem] font-extrabold leading-tight text-ink">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-7 flex flex-col gap-3 pt-6 sm:flex-row sm:items-center">
              <ContactButton
                options={{ interest: "kaufen", objectRef, view: "form", title: "Besichtigung anfragen" }}
                className="inline-flex items-center justify-center gap-2 rounded-[14px] bg-accent-deep px-6 py-3.5 text-[0.9375rem] font-semibold text-white transition-all duration-300 ease-smooth hover:-translate-y-0.5 hover:bg-accent-dark"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                Besichtigung anfragen
              </ContactButton>
              {property.heroNote && (
                <p className="text-[0.8125rem] leading-relaxed text-text-muted sm:ml-2">{property.heroNote}</p>
              )}
            </div>
          </div>
        </Container>
      </section>

      <section className="py-14 lg:py-20">
        <Container className="grid gap-12 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-20">
          <div>
            <h2 className="font-display text-display-sm font-bold text-ink">Objektbeschreibung</h2>
            <div className="mt-5 space-y-5">
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

            {property.features.length > 0 && (
              <div className="mt-12">
                <h2 className="font-display text-display-sm font-bold text-ink">Alle Objektdaten</h2>
                <dl className="mt-5 grid gap-x-8 gap-y-1 sm:grid-cols-2">
                  {property.features.map((feature) => (
                    <div
                      key={feature.label}
                      className="flex items-baseline justify-between gap-6 rounded-[14px] px-4 py-3.5 odd:bg-surface-warm"
                    >
                      <dt className="text-[0.9375rem] text-text-muted">{feature.label}</dt>
                      <dd className="text-right text-[0.9375rem] font-semibold text-ink">{feature.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}

            {property.energy.length > 0 && (
              <div className="mt-12">
                <h2 className="font-display text-display-sm font-bold text-ink">Energieinformationen</h2>
                <dl className="mt-5 grid gap-4 sm:grid-cols-2">
                  {property.energy.map((item) => (
                    <div key={item.label} className="rounded-[24px] bg-surface-warm p-5">
                      <dt className="text-[0.8125rem] font-medium text-text-subtle">
                        {item.label}
                      </dt>
                      <dd className="mt-1.5 text-[0.9375rem] font-semibold text-ink">{item.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
          </div>

          <aside className="h-fit rounded-[24px] bg-surface-warm p-7 lg:sticky lg:top-32">
            <p className="text-[0.8125rem] font-medium text-text-subtle">Kaufpreis</p>
            <p className="mt-1.5 font-display text-[1.875rem] font-extrabold leading-none text-ink">
              {property.priceLabel}
            </p>

            <p className="pretty mt-5 text-[0.9375rem] leading-relaxed text-text-muted">{property.summary}</p>

            <div className="mt-7 pt-7">
              <p className="text-[0.8125rem] font-medium text-text-subtle">
                Ihre Ansprechpartnerin
              </p>
              <p className="mt-2 font-display text-[1.0625rem] font-bold text-ink">{site.owner}</p>
              <a
                href={`mailto:${site.email}`}
                className="mt-2 block text-[0.9375rem] text-text-muted transition-colors hover:text-accent-deep"
              >
                {site.email}
              </a>
            </div>

            <ContactButton
              options={{ interest: "kaufen", objectRef, view: "form", title: "Besichtigung anfragen" }}
              className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-[14px] bg-accent-deep px-6 py-3.5 text-[0.9375rem] font-semibold text-white transition-all duration-300 ease-smooth hover:bg-accent-dark"
            >
              Besichtigung anfragen
            </ContactButton>
          </aside>
        </Container>
      </section>

      {gallery.length > 0 && (
        <section id="galerie" className="overflow-hidden bg-surface-warm py-14 lg:py-20">
          <Container>
            <h2 className="font-display text-display-sm font-bold text-ink">Bildergalerie</h2>
            <p className="mt-2 text-[0.9375rem] text-text-muted">
              {gallery.length === 1
                ? "Ein Bild — tippen für die Vollbildansicht."
                : `${gallery.length} Bilder — tippen oder wischen für die Vollbildansicht.`}
            </p>
          </Container>
          <div className="mx-auto mt-8 w-full max-w-content">
            <PropertyGallery images={gallery} title={property.title} city={property.city} />
          </div>
        </section>
      )}

      <CtaSection />

      <MobileActionBar priceLabel={property.priceLabel} objectRef={objectRef} />

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
