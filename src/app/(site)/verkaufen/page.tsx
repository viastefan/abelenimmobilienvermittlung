import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Steps } from "@/components/ui/Steps";
import { Checklist } from "@/components/ui/Checklist";
import { Faq } from "@/components/ui/Faq";
import { CtaSection } from "@/components/home/CtaSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";
import { pageSeo } from "@/lib/seo";
import { resolveImage } from "@/lib/imagery";
import { images } from "@/data/imagery";
import { sellingSteps } from "@/data/process";
import { verkaufenFaq, verkaufsUnterlagen } from "@/data/faq";

export const metadata: Metadata = pageSeo({
  title: "Immobilie verkaufen in Leverkusen & Umgebung",
  description:
    "Ihre Immobilie verkaufen — persönlich begleitet von der ersten Einschätzung über die Vermarktung bis zum Notartermin. Büro für Immobilien Bewertung & Vermittlung, Silke Abelen.",
  path: "/verkaufen",
});

const benefits = [
  {
    title: "Realistische Einschätzung",
    description: "Eine fundierte Marktpreisermittlung auf Basis echter Vergleichswerte aus der Region — kein Wunschpreis.",
  },
  {
    title: "Hochwertige Präsentation",
    description: "Vollständige Unterlagen, klare Grundrisse und ein Exposé, das die Immobilie erklärt statt sie zu bewerben.",
  },
  {
    title: "Geprüfte Interessenten",
    description: "Wir filtern ernsthafte Käufer heraus und ersparen Ihnen Termine, die zu nichts führen.",
  },
  {
    title: "Eine feste Ansprechpartnerin",
    description: "Ein Gesicht, ein direkter Draht — von der ersten Anfrage bis zur Schlüsselübergabe.",
  },
];

export default function VerkaufenPage() {
  return (
    <>
      <PageHero
        eyebrow="Verkaufen"
        title={
          <>
            Ihre Immobilie verkaufen.
            <br className="hidden sm:block" /> Persönlich begleitet.
          </>
        }
        description="Vom ersten Gespräch bis zur Übergabe bleiben Sie bei derselben Ansprechpartnerin — mit einem Ablauf, der ohne Fachchinesisch auskommt."
        breadcrumbs={[{ label: "Startseite", href: "/" }, { label: "Verkaufen" }]}
        actions={
          <>
            <Button href="/bewertung" variant="primary" size="lg" withArrow>
              Immobilie bewerten
            </Button>
            <Button href="/kontakt?anliegen=verkaufen" variant="secondary" size="lg">
              Verkauf besprechen
            </Button>
          </>
        }
        withMedia
        image={resolveImage(images.verkaufen)}
        imageAlt="Reihenhäuser in Leverkusen — typisches Verkaufsobjekt"
      />

      <section className="py-16 lg:py-20">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Warum mit uns verkaufen"
              size="lg"
              title="Ein klarer Ablauf, keine Überraschungen."
            />
          </Reveal>

          <div className="mt-14 grid gap-x-12 gap-y-10 sm:grid-cols-2">
            {benefits.map((benefit, index) => (
              <Reveal key={benefit.title} delay={index * 80} className="border-l-2 border-accent-soft pl-6">
                <h3 className="font-display text-[1.0625rem] font-bold text-ink">{benefit.title}</h3>
                <p className="pretty mt-2 text-[0.9375rem] leading-relaxed text-text-muted">
                  {benefit.description}
                </p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <Steps
        eyebrow="Der Verkaufsprozess"
        title="In sieben Schritten zum Abschluss."
        description="So sieht ein Verkauf bei uns aus — verständlich erklärt und jederzeit nachvollziehbar."
        steps={sellingSteps}
      />

      <Checklist
        eyebrow="Unterlagen"
        title="Was wir für den Verkauf brauchen"
        description="Vollständige Unterlagen vor dem ersten Besichtigungstermin verkürzen den Verkauf spürbar. Was fehlt, beschaffen wir gemeinsam."
        groups={verkaufsUnterlagen}
      />

      <Faq title="Fragen zum Immobilienverkauf" items={verkaufenFaq} />

      <CtaSection
        title="Lassen Sie uns über Ihre Immobilie sprechen."
        description="Unverbindlich, persönlich und ohne Verkaufsdruck."
        buttonLabel="Immobilie bewerten"
        href="/bewertung"
      />

      <JsonLd
        data={breadcrumbSchema([
          { name: "Start", path: "/" },
          { name: "Verkaufen", path: "/verkaufen" },
        ])}
      />
      <JsonLd data={faqSchema(verkaufenFaq)} />
    </>
  );
}
