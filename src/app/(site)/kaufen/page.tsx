import type { Metadata } from "next";
import { Check } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { PropertyCard } from "@/components/property/PropertyCard";
import { CtaSection } from "@/components/home/CtaSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { pageSeo } from "@/lib/seo";
import { resolveImages } from "@/lib/imagery";
import { getActiveProperties } from "@/data/properties";
import { fuerKaeufer, fuerVerkaeufer } from "@/data/services";

export const metadata: Metadata = pageSeo({
  title: "Für Käufer & Verkäufer",
  description:
    "Entdecken Sie, wie wir Ihnen dabei helfen können, stressfrei Ihre Traumimmobilie zu finden oder Ihre Immobilie zum besten Preis zu verkaufen.",
  path: "/kaufen",
});

export const revalidate = 60;

/**
 * „Für Käufer & Verkäufer“ — auf dem bisherigen Auftritt unter
 * `/dienstleistungen-kaufberatung-verkaufsberatung`.
 *
 * Texte, Überschriften und die beiden Leistungslisten sind von dort
 * übernommen. Die Listen standen dort als Kachelfeld ohne Beschreibung; sie
 * bleiben eine Aufzählung, weil jeder Eintrag für sich steht — dazuerfundene
 * Erklärsätze wären nicht von Silke Abelen.
 */
export default async function KaeuferVerkaeuferPage() {
  const activeProperties = await getActiveProperties();

  return (
    <>
      <PageHero
        eyebrow="Wir begleiten Sie mit Expertise und Leidenschaft."
        title="Für Käufer & Verkäufer"
        description="Entdecken Sie, wie wir Ihnen dabei helfen können, stressfrei Ihre Traumimmobilie zu finden oder Ihre Immobilie zum besten Preis zu verkaufen."
        breadcrumbs={[{ label: "Startseite", href: "/" }, { label: "Für Käufer & Verkäufer" }]}
      />

      <section className="py-14 lg:py-20">
        <Container className="grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-16">
          <Reveal>
            <SectionHeading
              eyebrow="Für Immobilienkäufer"
              size="lg"
              title="Ihr Weg zur Traumimmobilie"
              description="Die Suche nach der richtigen Immobilie ist eine der wichtigsten Entscheidungen im Leben. Wir verstehen, dass Sie dabei einen starken Partner an Ihrer Seite brauchen. Mit unserer professionellen Kaufbegleitung finden wir nicht nur Ihr Wunschobjekt, sondern sorgen auch für einen reibungslosen und sicheren Kaufprozess – von der ersten Besichtigung bis zur Schlüsselübergabe."
            />
          </Reveal>
          <Reveal delay={90}>
            <Leistungsliste eintraege={fuerKaeufer} />
          </Reveal>
        </Container>
      </section>

      <section className="bg-surface-cool py-14 lg:py-20">
        <Container className="grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-16">
          <Reveal>
            <SectionHeading
              eyebrow="Für Immobilienverkäufer"
              size="lg"
              title={
                <>
                  Ihr Immobilienverkauf
                  <br className="hidden sm:block" /> in besten Händen
                </>
              }
              description="Sie möchten Ihre Immobilie stressfrei und zum bestmöglichen Preis verkaufen? Setzen Sie auf unsere langjährige Expertise in der Vermarktung. Wir übernehmen alle Aufgaben, von der fundierten Marktpreisanalyse über die Erstellung hochwertiger Exposés bis hin zur gezielten Bewerbung. So stellen wir sicher, dass Ihre Immobilie die richtigen Käufer erreicht und Sie das beste Ergebnis erzielen."
            />
            <Button href="/anlagen" variant="secondary" withArrow className="mt-8">
              Unterlagen die benötigt werden
            </Button>
          </Reveal>
          <Reveal delay={90}>
            <Leistungsliste eintraege={fuerVerkaeufer} />
          </Reveal>
        </Container>
      </section>

      {activeProperties.length > 0 && (
        <section className="py-14 lg:py-20">
          <Container>
            <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
              <SectionHeading eyebrow="Aktuelle Objekte" size="lg" title="Verfügbare Immobilien" />
              <Button href="/referenzen" variant="secondary" withArrow className="shrink-0">
                Alle Objekte &amp; Referenzen
              </Button>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {activeProperties.slice(0, 3).map((property) => (
                <PropertyCard
                  key={property.slug}
                  property={property}
                  images={resolveImages(property.images)}
                />
              ))}
            </div>
          </Container>
        </section>
      )}

      <CtaSection
        title="Planen Sie, eine Immobilie zu kaufen oder zu verkaufen?"
        description={null}
        buttonLabel="Kontaktanfrage"
        href="/kontakt"
      />

      <JsonLd
        data={breadcrumbSchema([
          { name: "Start", path: "/" },
          { name: "Für Käufer & Verkäufer", path: "/kaufen" },
        ])}
      />
    </>
  );
}

/** Die Leistungen als Aufzählung — zwei Spalten, sobald Platz ist. */
function Leistungsliste({ eintraege }: { eintraege: readonly string[] }) {
  return (
    <ul className="grid gap-x-8 gap-y-1 sm:grid-cols-2">
      {eintraege.map((eintrag) => (
        <li
          key={eintrag}
          className="flex items-start gap-3 border-t border-border py-3.5 text-[0.9375rem] leading-relaxed text-ink"
        >
          <Check className="mt-[5px] h-4 w-4 shrink-0 text-accent-deep" strokeWidth={2.4} aria-hidden="true" />
          {eintrag}
        </li>
      ))}
    </ul>
  );
}
