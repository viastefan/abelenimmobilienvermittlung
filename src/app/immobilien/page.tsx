import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { PropertyCard } from "@/components/property/PropertyCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { pageSeo } from "@/lib/seo";
import { properties } from "@/data/properties";

export const metadata: Metadata = pageSeo({
  title: "Immobilien in Leichlingen, Leverkusen & Solingen",
  description:
    "Aktuelle Immobilienangebote von Abelen Immobilien in Leichlingen, Leverkusen, Solingen und der Region — persönlich betreut von Silke Abelen.",
  path: "/immobilien",
});

export default function ImmobilienPage() {
  return (
    <>
      <PageHero
        eyebrow="Immobilien"
        title="Aktuelle Objekte in der Region."
        description="Eine Auswahl aktueller Immobilienangebote — persönlich geprüft und betreut. Neue Objekte werden fortlaufend ergänzt."
      />

      <section className="py-20 lg:py-28">
        <Container>
          {properties.length > 0 ? (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {properties.map((property) => (
                <PropertyCard key={property.slug} property={property} />
              ))}
            </div>
          ) : (
            <p className="text-text-muted">
              Aktuell sind keine Objekte online. Sprechen Sie mich gerne direkt an — ich berate Sie
              auch zu Immobilien, die noch nicht veröffentlicht sind.
            </p>
          )}
        </Container>
      </section>

      <JsonLd
        data={breadcrumbSchema([
          { name: "Start", path: "/" },
          { name: "Immobilien", path: "/immobilien" },
        ])}
      />
    </>
  );
}
