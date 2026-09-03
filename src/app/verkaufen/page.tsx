import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Process } from "@/components/home/Process";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { pageSeo } from "@/lib/seo";

export const metadata: Metadata = pageSeo({
  title: "Immobilie verkaufen in Leichlingen, Leverkusen & Solingen",
  description:
    "Sie möchten Ihre Immobilie verkaufen? Realistische Einschätzung, professionelle Vermarktung und persönliche Begleitung bis zum Notartermin — mit Silke Abelen.",
  path: "/verkaufen",
});

const benefits = [
  {
    title: "Realistische Einschätzung",
    description: "Eine fundierte Marktpreisermittlung, die auf echten Vergleichswerten aus der Region basiert.",
  },
  {
    title: "Hochwertige Präsentation",
    description: "Professionelle Aufbereitung Ihrer Immobilie für Exposé, Anzeigen und Besichtigungen.",
  },
  {
    title: "Geprüftes Interessentenmanagement",
    description: "Ich filtere ernsthafte Kaufinteressenten heraus und spare Ihnen unnötige Termine.",
  },
  {
    title: "Feste Ansprechpartnerin",
    description: "Ein Gesicht, ein direkter Draht — von der ersten Anfrage bis zur Schlüsselübergabe.",
  },
];

export default function VerkaufenPage() {
  return (
    <>
      <PageHero
        eyebrow="Immobilie verkaufen"
        title="Ihre Immobilie in guten Händen — von Anfang an."
        description="Sie haben einen festen Ansprechpartner — von der ersten Einschätzung bis zur Übergabe. Ich begleite den gesamten Verkaufsprozess Ihrer Immobilie persönlich."
      />

      <section className="py-20 lg:py-28">
        <Container>
          <SectionHeading
            eyebrow="Warum mit mir verkaufen"
            size="lg"
            title="Ein klarer Ablauf, keine Überraschungen."
          />
          <div className="mt-14 grid gap-10 sm:grid-cols-2">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="border-l border-border pl-6">
                <h3 className="font-display text-lg font-semibold text-ink">{benefit.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">{benefit.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <div className="border-t border-border">
        <Process />
      </div>

      <section className="bg-ink py-20 text-center lg:py-28">
        <Container className="max-w-2xl">
          <h2 className="balance text-display-md font-display font-semibold text-white">
            Lassen Sie uns über Ihre Immobilie sprechen.
          </h2>
          <p className="mt-5 text-base text-white/70">
            Unverbindlich, persönlich und ohne Verkaufsdruck.
          </p>
          <Button href="/kontakt?anliegen=verkaufen" variant="inverted" className="mt-8">
            Immobilie verkaufen
          </Button>
        </Container>
      </section>

      <JsonLd
        data={breadcrumbSchema([
          { name: "Start", path: "/" },
          { name: "Verkaufen", path: "/verkaufen" },
        ])}
      />
    </>
  );
}
