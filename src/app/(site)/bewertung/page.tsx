import type { Metadata } from "next";
import { Clock, FileCheck, ShieldCheck, TrendingUp } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Steps } from "@/components/ui/Steps";
import { TrustBadges } from "@/components/home/TrustBadges";
import { ValuationCta } from "@/components/home/CtaSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { pageSeo } from "@/lib/seo";
import { resolveImage } from "@/lib/imagery";
import { images } from "@/data/imagery";
import { valuationSteps } from "@/data/process";

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

      <section className="py-20 lg:py-28">
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
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[12px] bg-accent-soft text-accent-deep">
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

      <ValuationCta />

      <JsonLd
        data={breadcrumbSchema([
          { name: "Start", path: "/" },
          { name: "Bewertung", path: "/bewertung" },
        ])}
      />
    </>
  );
}
