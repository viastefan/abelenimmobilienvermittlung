import type { Metadata } from "next";
import { ShieldCheck, TrendingUp, FileCheck, Clock } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CtaSection } from "@/components/home/CtaSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { pageSeo } from "@/lib/seo";

export const metadata: Metadata = pageSeo({
  title: "Immobilienbewertung in Leverkusen & Umgebung",
  description:
    "Kostenlose und unverbindliche Immobilienbewertung durch geprüfte Fachkompetenz — fundiert, transparent und marktgerecht.",
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
    title: "Kostenlos & unverbindlich",
    description: "Die Bewertung ist für Sie kostenfrei — ganz ohne Verpflichtung zur Zusammenarbeit.",
  },
];

export default function BewertungPage() {
  return (
    <>
      <PageHero
        eyebrow="Immobilienbewertung"
        title="Was ist Ihre Immobilie wirklich wert?"
        description="Eine professionelle Bewertung ist die Grundlage für jede gute Entscheidung — ob Verkauf, Vermietung oder Nachlassregelung. Wir ermitteln den realistischen Marktwert Ihrer Immobilie."
      />

      <section className="py-20 lg:py-28">
        <Container>
          <SectionHeading eyebrow="Ihre Vorteile" size="lg" title="Fundiert bewertet, ehrlich beraten." />
          <div className="mt-14 grid gap-8 sm:grid-cols-2">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-surface-soft text-accent">
                  <benefit.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-display text-lg font-semibold text-ink">{benefit.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-muted">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CtaSection
        title="Jetzt kostenlose Bewertung anfragen"
        description="Unverbindlich, persönlich und ohne versteckte Kosten."
        buttonLabel="Bewertung anfragen"
        href="/kontakt?anliegen=bewertung"
      />

      <JsonLd
        data={breadcrumbSchema([
          { name: "Start", path: "/" },
          { name: "Bewertung", path: "/bewertung" },
        ])}
      />
    </>
  );
}
