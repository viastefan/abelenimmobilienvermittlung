import type { Metadata } from "next";
import { Clock, FileCheck, ShieldCheck, TrendingUp } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Steps } from "@/components/ui/Steps";
import { Faq } from "@/components/ui/Faq";
import { TrustBadges } from "@/components/home/TrustBadges";
import { CtaSection } from "@/components/home/CtaSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";
import { pageSeo } from "@/lib/seo";
import { resolveImage } from "@/lib/imagery";
import { images } from "@/data/imagery";
import { valuationSteps } from "@/data/process";
import { bewertungFaq, wertermittlungsverfahren } from "@/data/faq";

export const metadata: Metadata = pageSeo({
  title: "Immobilienbewertung in Leverkusen & Umgebung",
  description:
    "Professionelle Immobilienbewertung durch geprüfte Fachkompetenz — persönlich, transparent und marktgerecht. Marktpreiseinschätzung in der Regel innerhalb einer Woche.",
  path: "/bewertung",
});

const benefits = [
  {
    icon: TrendingUp,
    title: "Marktgerechte Einschätzung",
    description: "Fundierte Bewertung auf Basis aktueller Vergleichswerte aus Leverkusen und der Region.",
  },
  {
    icon: ShieldCheck,
    title: "Geprüfte Fachkompetenz",
    description: "Bewertung nach den Standards der Sprengnetter Akademie — geprüfter Immobilienbewerter.",
  },
  {
    icon: FileCheck,
    title: "Transparent & nachvollziehbar",
    description: "Sie erhalten eine verständliche Einschätzung als verlässliche Grundlage für Ihre Entscheidung.",
  },
  {
    icon: Clock,
    title: "Zügig & unverbindlich",
    description:
      "Nach Erstbesichtigung und Erfassung der Objektinformationen liegt die Marktpreiseinschätzung in der Regel innerhalb einer Woche vor.",
  },
];

export default function BewertungPage() {
  return (
    <>
      <PageHero
        eyebrow="Bewertung"
        title="Was ist Ihre Immobilie wert?"
        description="Eine realistische Immobilienbewertung ist die Grundlage für einen erfolgreichen Verkauf — und für jede Entscheidung, die davon abhängt."
        breadcrumbs={[{ label: "Startseite", href: "/" }, { label: "Bewertung" }]}
        actions={
          <>
            <Button href="/kontakt?anliegen=bewertung" variant="primary" size="lg" withArrow>
              Bewertung anfragen
            </Button>
            <Button href="/kontakt" variant="secondary" size="lg">
              Kontakt aufnehmen
            </Button>
          </>
        }
        withMedia
        image={resolveImage(images.bewertung)}
        imageAlt="Einfamilienhaus in Leverkusen — typisches Bewertungsobjekt"
      />

      <section className="py-14 lg:py-20">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Ihre Vorteile"
              size="lg"
              title="Fundiert bewertet, ehrlich beraten."
            />
          </Reveal>

          <div className="mt-14 grid gap-x-12 gap-y-10 sm:grid-cols-2">
            {benefits.map((benefit, index) => (
              <Reveal key={benefit.title} delay={index * 80} className="flex gap-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] bg-accent-soft text-accent-deep">
                  <benefit.icon className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-display text-[1.0625rem] font-bold text-ink">{benefit.title}</h3>
                  <p className="pretty mt-2 text-[0.9375rem] leading-relaxed text-text-muted">
                    {benefit.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={200}>
            <TrustBadges className="mt-14" />
          </Reveal>
        </Container>
      </section>

      <Steps
        eyebrow="So läuft es ab"
        title="In fünf Schritten zur Einschätzung."
        description="Kein Formularmarathon, kein Automatismus — sondern ein persönlicher Ablauf, den Sie jederzeit nachvollziehen können."
        steps={valuationSteps}
      />

      <section className="bg-surface-cool py-14 lg:py-20">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Wertermittlung"
              size="lg"
              title="Drei Verfahren, ein passendes."
              description="Welches Verfahren trägt, entscheidet die Immobilie — nicht die Gewohnheit. Die Grundlagen regelt die Immobilienwertermittlungsverordnung."
            />
          </Reveal>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {wertermittlungsverfahren.map((verfahren, index) => (
              <Reveal key={verfahren.name} delay={index * 90} className="h-full">
                <div className="flex h-full flex-col rounded-[14px] bg-white shadow-soft ring-1 ring-border p-6 lg:p-7">
                  <h3 className="font-display text-[1rem] font-bold text-ink">{verfahren.name}</h3>
                  <p className="mt-1.5 text-[0.8125rem] font-semibold text-accent-deep">
                    {verfahren.lead}
                  </p>
                  <p className="pretty mt-4 text-[0.875rem] leading-relaxed text-text-muted">
                    {verfahren.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <Faq title="Fragen zur Immobilienbewertung" items={bewertungFaq} />

      <CtaSection
        title="Bereit für eine belastbare Einschätzung?"
        description="Wir sehen uns Ihre Immobilie an und melden uns in der Regel innerhalb einer Woche."
        buttonLabel="Bewertung anfragen"
        href="/kontakt?anliegen=bewertung"
      />

      <JsonLd
        data={breadcrumbSchema([
          { name: "Start", path: "/" },
          { name: "Bewertung", path: "/bewertung" },
        ])}
      />
      <JsonLd data={faqSchema(bewertungFaq)} />
    </>
  );
}
