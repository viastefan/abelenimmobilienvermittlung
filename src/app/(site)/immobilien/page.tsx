import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { PropertyCard } from "@/components/property/PropertyCard";
import { PropertyCtaCard } from "@/components/property/PropertyCtaCard";
import { CtaSection } from "@/components/home/CtaSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { pageSeo } from "@/lib/seo";
import { resolveFirstImage } from "@/lib/imagery";
import { getPublishedProperties } from "@/data/properties";

export const metadata: Metadata = pageSeo({
  title: "Aktuelle Immobilien in Leverkusen & Umgebung",
  description:
    "Aktuelle Immobilienangebote in Leverkusen und Umgebung — persönlich geprüft und betreut vom Büro für Immobilien Bewertung & Vermittlung, Silke Abelen.",
  path: "/immobilien",
});

export const revalidate = 60;

export default async function ImmobilienPage() {
  const properties = await getPublishedProperties();

  return (
    <>
      <PageHero
        eyebrow="Aktuelle Angebote"
        title={
          <>
            Immobilien in Leverkusen
            <br className="hidden sm:block" /> und Umgebung
          </>
        }
        description="Eine Auswahl aktueller Immobilienangebote — persönlich geprüft und betreut. Neue Objekte ergänzen wir fortlaufend."
        breadcrumbs={[{ label: "Startseite", href: "/" }, { label: "Immobilien" }]}
      />

      <section className="py-14 lg:py-20">
        <Container>
          <h2 className="sr-only">Aktuelle Angebote</h2>
          {properties.length > 0 ? (
            <div
              className={`grid gap-6 sm:grid-cols-2 ${
                properties.length >= 3 ? "lg:grid-cols-3" : ""
              }`}
            >
              {properties.map((property) => (
                <PropertyCard
                  key={property.slug}
                  property={property}
                  image={resolveFirstImage(property.images)}
                />
              ))}
              {properties.length < 3 && <PropertyCtaCard />}
            </div>
          ) : (
            <div className="rounded-[20px] border border-dashed border-border bg-surface-warm p-12 text-center">
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

      <CtaSection />

      <JsonLd
        data={breadcrumbSchema([
          { name: "Start", path: "/" },
          { name: "Immobilien", path: "/immobilien" },
        ])}
      />
    </>
  );
}
