import type { Metadata } from "next";
import { ClipboardCheck, KeyRound, MessagesSquare, Users } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Steps } from "@/components/ui/Steps";
import { Faq } from "@/components/ui/Faq";
import { CtaSection } from "@/components/home/CtaSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";
import { pageSeo } from "@/lib/seo";
import { resolveImage } from "@/lib/imagery";
import { images } from "@/data/imagery";
import { rentingSteps } from "@/data/process";
import { vermietenFaq } from "@/data/faq";

export const metadata: Metadata = pageSeo({
  title: "Immobilie vermieten in Leverkusen & Umgebung",
  description:
    "Wir finden den passenden Mieter für Ihre Immobilie — schnell, sicher und unkompliziert, inklusive Bonitätsprüfung und persönlicher Begleitung bis zur Schlüsselübergabe.",
  path: "/vermieten",
});

const benefits = [
  {
    icon: Users,
    title: "Passende Mieter finden",
    description: "Wir prüfen Interessenten sorgfältig und stellen Ihnen nur Kandidaten vor, die wirklich passen.",
  },
  {
    icon: ClipboardCheck,
    title: "Unterlagen vollständig geprüft",
    description: "Selbstauskunft, Einkommensnachweise und Bonitätsauskunft liegen vor, bevor Sie entscheiden.",
  },
  {
    icon: MessagesSquare,
    title: "Besichtigungen organisiert",
    description: "Terminkoordination und Durchführung übernehmen wir vollständig — Sie müssen nicht vor Ort sein.",
  },
  {
    icon: KeyRound,
    title: "Vom Vertrag bis zur Übergabe",
    description: "Rechtssicherer Mietvertrag, Übergabeprotokoll und Schlüsselübergabe — sauber dokumentiert.",
  },
];

export default function VermietenPage() {
  return (
    <>
      <PageHero
        eyebrow="Vermieten"
        title={
          <>
            Ihre Immobilie vermieten.
            <br className="hidden sm:block" /> Ohne Aufwand für Sie.
          </>
        }
        description="Von der Mietpreiseinschätzung über die Auswahl der Mietpartei bis zur Schlüsselübergabe — wir übernehmen den gesamten Ablauf."
        breadcrumbs={[{ label: "Startseite", href: "/" }, { label: "Vermieten" }]}
        actions={
          <>
            <Button href="/kontakt?anliegen=vermieten" variant="primary" size="lg" withArrow>
              Vermietung anfragen
            </Button>
            <Button href="/bewertung" variant="secondary" size="lg">
              Mietpreis einschätzen
            </Button>
          </>
        }
        withMedia
        image={resolveImage(images.vermieten)}
        imageAlt="Mehrfamilienhaus mit Mietwohnungen in Leverkusen"
      />

      <section className="py-14 lg:py-20">
        <Container>
          <Reveal>
            <SectionHeading eyebrow="Ihre Vorteile" size="lg" title="Vermietung ohne Aufwand für Sie." />
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
        </Container>
      </section>

      <Steps
        eyebrow="So läuft es ab"
        title="Von der Einschätzung bis zum Mietvertrag."
        steps={rentingSteps}
      />

      <Faq title="Fragen zur Vermietung" items={vermietenFaq} />

      <CtaSection
        title="Sie möchten Ihre Immobilie vermieten?"
        description="Sprechen wir unverbindlich über Ihre Immobilie und den passenden Mietpreis."
        buttonLabel="Vermietung anfragen"
        href="/kontakt?anliegen=vermieten"
      />

      <JsonLd
        data={breadcrumbSchema([
          { name: "Start", path: "/" },
          { name: "Vermieten", path: "/vermieten" },
        ])}
      />
      <JsonLd data={faqSchema(vermietenFaq)} />
    </>
  );
}
