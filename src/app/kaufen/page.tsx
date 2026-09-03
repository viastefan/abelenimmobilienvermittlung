import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { PropertyCard } from "@/components/property/PropertyCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { pageSeo } from "@/lib/seo";
import { getActiveProperties } from "@/data/properties";

export const metadata: Metadata = pageSeo({
  title: "Immobilien kaufen in Leverkusen, Leichlingen & Solingen",
  description:
    "Auf der Suche nach der passenden Immobilie? Ich berate Sie ehrlich und begleite Sie von der ersten Besichtigung bis zur Übergabe.",
  path: "/kaufen",
});

const steps = [
  {
    title: "Bedarf klären",
    description: "Gemeinsam definieren wir, was Ihnen wirklich wichtig ist — Lage, Zuschnitt, Budget, Zeithorizont.",
  },
  {
    title: "Passende Objekte",
    description: "Sie erhalten Angebote, die tatsächlich zu Ihren Kriterien passen — keine Streuware.",
  },
  {
    title: "Besichtigung mit Einschätzung",
    description: "Ich begleite Besichtigungen und gebe eine ehrliche fachliche Einschätzung zu Zustand und Preis.",
  },
  {
    title: "Sicher zum Abschluss",
    description: "Von der Reservierung bis zum Notartermin stehe ich Ihnen als feste Ansprechpartnerin zur Seite.",
  },
];

export default function KaufenPage() {
  const activeProperties = getActiveProperties();

  return (
    <>
      <PageHero
        eyebrow="Immobilie kaufen"
        title="Die richtige Immobilie beginnt mit dem richtigen Gespräch."
        description="Gemeinsam finden wir heraus, welche Immobilie wirklich zu Ihren Vorstellungen und Bedürfnissen passt — mit ehrlicher Beratung statt Verkaufsdruck."
      />

      <section className="py-20 lg:py-28">
        <Container>
          <SectionHeading eyebrow="So gehen wir vor" size="lg" title="Klar, ehrlich, persönlich." />
          <div className="mt-14 grid gap-x-10 gap-y-12 border-t border-border pt-12 sm:grid-cols-2">
            {steps.map((step, index) => (
              <div key={step.title} className="flex gap-5">
                <span className="font-display text-2xl font-semibold text-border">
                  0{index + 1}
                </span>
                <div>
                  <h3 className="font-display text-lg font-semibold text-ink">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-muted">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {activeProperties.length > 0 && (
        <section className="border-t border-border bg-surface py-20 lg:py-28">
          <Container>
            <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
              <SectionHeading eyebrow="Aktuelle Objekte" size="lg" title="Verfügbare Immobilien" />
              <Button href="/immobilien" variant="secondary" withArrow className="group shrink-0">
                Alle Immobilien
              </Button>
            </div>
            <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {activeProperties.map((property) => (
                <PropertyCard key={property.slug} property={property} />
              ))}
            </div>
          </Container>
        </section>
      )}

      <section className="bg-ink py-20 text-center lg:py-28">
        <Container className="max-w-2xl">
          <h2 className="balance text-display-md font-display font-semibold text-white">
            Erzählen Sie mir, wonach Sie suchen.
          </h2>
          <Button href="/kontakt?anliegen=kaufen" variant="inverted" className="mt-8">
            Immobilie finden
          </Button>
        </Container>
      </section>

      <JsonLd
        data={breadcrumbSchema([
          { name: "Start", path: "/" },
          { name: "Kaufen", path: "/kaufen" },
        ])}
      />
    </>
  );
}
