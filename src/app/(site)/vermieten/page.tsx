import type { Metadata } from "next";
import { Users, ClipboardCheck, KeyRound, MessagesSquare } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CtaSection } from "@/components/home/CtaSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { pageSeo } from "@/lib/seo";

export const metadata: Metadata = pageSeo({
  title: "Immobilie vermieten in Leverkusen & Umgebung",
  description:
    "Wir finden den passenden Mieter für Ihre Immobilie — schnell, sicher und unkompliziert, mit Bonitätsprüfung und persönlicher Begleitung.",
  path: "/vermieten",
});

const benefits = [
  {
    icon: Users,
    title: "Passende Mieter finden",
    description: "Wir prüfen Interessenten sorgfältig und stellen Ihnen nur passende Kandidaten vor.",
  },
  {
    icon: ClipboardCheck,
    title: "Bonitäts- & Unterlagenprüfung",
    description: "Schufa-Auskunft, Einkommensnachweise und Mietschuldenfreiheitsbescheinigung — vollständig geprüft.",
  },
  {
    icon: MessagesSquare,
    title: "Besichtigungen organisiert",
    description: "Wir übernehmen Terminkoordination und Durchführung der Besichtigungen für Sie.",
  },
  {
    icon: KeyRound,
    title: "Vom Vertrag bis zur Übergabe",
    description: "Rechtssicherer Mietvertrag und persönliche Begleitung bis zur Schlüsselübergabe.",
  },
];

export default function VermietenPage() {
  return (
    <>
      <PageHero
        eyebrow="Vermietung"
        title="Ihre Immobilie in verlässlichen Händen."
        description="Wir übernehmen die Vermietung Ihrer Immobilie — von der Mietersuche über die Bonitätsprüfung bis zur Schlüsselübergabe. Schnell, sicher und unkompliziert."
      />

      <section className="py-20 lg:py-28">
        <Container>
          <SectionHeading eyebrow="So läuft es ab" size="lg" title="Vermietung ohne Aufwand für Sie." />
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
        title="Sie möchten Ihre Immobilie vermieten?"
        description="Lassen Sie uns unverbindlich über Ihre Immobilie sprechen."
        buttonLabel="Kontakt aufnehmen"
        href="/kontakt?anliegen=vermieten"
      />

      <JsonLd
        data={breadcrumbSchema([
          { name: "Start", path: "/" },
          { name: "Vermieten", path: "/vermieten" },
        ])}
      />
    </>
  );
}
