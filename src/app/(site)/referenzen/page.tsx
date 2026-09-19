import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { PropertyCard } from "@/components/property/PropertyCard";
import { PropertyCtaCard } from "@/components/property/PropertyCtaCard";
import { ReferenceGrid, type ReferenceCardItem } from "@/components/references/ReferenceGrid";
import { TestimonialCard } from "@/components/references/TestimonialCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CtaSection } from "@/components/home/CtaSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { pageSeo } from "@/lib/seo";
import { getPublishedReferences } from "@/data/references";
import { getPublishedProperties } from "@/data/properties";
import { resolveImages, resolveImage } from "@/lib/imagery";
import { images } from "@/data/imagery";

export const metadata: Metadata = pageSeo({
  title: "Objekte & Referenzen — aktuelle Angebote und vermittelte Immobilien",
  description:
    "Aktuelle Immobilienangebote und ein Auszug erfolgreich vermittelter Objekte in Leverkusen und Umgebung — persönlich geprüft und betreut.",
  path: "/referenzen",
});

export const revalidate = 60;

/**
 * Objekte und Referenzen auf einer Seite, wie im bisherigen Auftritt: oben
 * das, was zu haben ist, darunter das, was vermittelt wurde. Wer sucht,
 * sieht beides in einem Zug — getrennte Seiten zwangen zum Hin und Her.
 *
 * `/immobilien` leitet hierher; die Objektseiten darunter bleiben, wo sie
 * sind.
 */
export default async function ObjekteUndReferenzenPage() {
  const [references, properties] = await Promise.all([
    getPublishedReferences(),
    getPublishedProperties(),
  ]);

  const items: ReferenceCardItem[] = references.map((item) => ({
    ...item,
    resolvedImages: resolveImages(item.images),
  }));

  // Kundenmeinungen hängen am jeweiligen Objekt — hier gesammelt, damit sie
  // nicht erst auf der Detailseite auftauchen.
  const testimonials = references.flatMap((item) =>
    item.testimonial ? [{ slug: item.slug, title: item.title, testimonial: item.testimonial }] : []
  );

  return (
    <>
      <PageHero
        title={
          <>
            Objekte
            <br className="hidden sm:block" /> &amp; Referenzen
          </>
        }
        description="Aktuelle Angebote und ein Auszug erfolgreich verkaufter und vermieteter Immobilien in Leverkusen und Umgebung."
        breadcrumbs={[{ label: "Startseite", href: "/" }, { label: "Objekte & Referenzen" }]}
        withMedia
        image={resolveImage(images.referenzen)}
        imageAlt="Wohnhäuser in Leverkusen, wie sie regelmäßig vermittelt werden"
      />

      <section id="angebote" className="py-14 lg:py-20">
        <Container>
          <SectionHeading
            size="lg"
            title="Aktuell im Angebot"
            description="Persönlich geprüft und betreut. Neue Objekte ergänzen wir fortlaufend."
          />

          {properties.length > 0 ? (
            <div
              className={`mt-10 grid gap-6 sm:grid-cols-2 ${
                properties.length >= 3 ? "lg:grid-cols-3" : ""
              }`}
            >
              {properties.map((property) => (
                <PropertyCard
                  key={property.slug}
                  property={property}
                  images={resolveImages(property.images)}
                />
              ))}
              {properties.length < 3 && <PropertyCtaCard />}
            </div>
          ) : (
            <div className="mt-10 rounded-[24px] bg-surface-warm p-10 text-center">
              <p className="mx-auto max-w-lg text-[1.0625rem] leading-relaxed text-text-muted">
                Aktuell ist kein Objekt online. Sprechen Sie uns gerne direkt an — wir beraten Sie
                auch zu Immobilien, die noch nicht veröffentlicht sind.
              </p>
              <Button href="/kontakt" variant="primary" withArrow className="mt-8">
                Kontakt aufnehmen
              </Button>
            </div>
          )}
        </Container>
      </section>

      <section id="referenzen" className="bg-surface-warm py-14 lg:py-20">
        <Container>
          <SectionHeading
            size="lg"
            title="Erfolgreich vermittelt"
            description="Ein Auszug unserer verkauften und vermieteten Immobilien in Leverkusen und Umgebung."
          />
          <div className="mt-10">
            <ReferenceGrid references={items} />
          </div>
        </Container>
      </section>

      {testimonials.length > 0 && (
        <section className="py-14 lg:py-20">
          <Container>
            <SectionHeading
              size="lg"
              title="Was Auftraggeberinnen und Auftraggeber sagen"
              description="Rückmeldungen aus abgeschlossenen Vermittlungen — unverändert übernommen."
            />
            <div className="mt-10 grid gap-5 lg:grid-cols-2">
              {testimonials.map((item) => (
                <TestimonialCard
                  key={item.slug}
                  testimonial={item.testimonial}
                  author={`Zur Vermittlung: ${item.title}`}
                />
              ))}
            </div>
          </Container>
        </section>
      )}

      <CtaSection
        title="Sie möchten Ihre Immobilie verkaufen oder vermieten?"
        description="Wir finden den passenden Käufer oder Mieter — persönlich und regional."
        buttonLabel="Immobilie bewerten"
        href="/bewertung"
      />

      <JsonLd
        data={breadcrumbSchema([
          { name: "Start", path: "/" },
          { name: "Objekte & Referenzen", path: "/referenzen" },
        ])}
      />
    </>
  );
}
