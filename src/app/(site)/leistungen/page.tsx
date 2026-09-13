import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { WhyAbelen } from "@/components/home/WhyAbelen";
import { Faq } from "@/components/ui/Faq";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";
import { pageSeo } from "@/lib/seo";
import { services } from "@/data/services";

export const metadata: Metadata = pageSeo({
  title: "Leistungen — Verkauf, Kauf & Immobilienbewertung",
  description:
    "Alle Leistungen im Überblick: Immobilienbewertung, Immobilienverkauf und Vermietung in Leverkusen und Umgebung.",
  path: "/leistungen",
});

const faqItems = [
  {
    question: "Was kostet eine Immobilienbewertung?",
    answer:
      "Eine erste Einschätzung im Rahmen eines persönlichen Gesprächs ist unverbindlich. Sprechen Sie uns gerne direkt an.",
  },
  {
    question: "In welchen Regionen sind Sie tätig?",
    answer:
      "Schwerpunkt ist Leverkusen. Dazu kommen Leichlingen, Solingen, Wuppertal, Burscheid, Remscheid, Wermelskirchen, Düsseldorf und der Kreis Mettmann.",
  },
  {
    question: "Wie läuft der Verkauf meiner Immobilie ab?",
    answer:
      "Vom Erstgespräch über Besichtigung, Marktpreisermittlung und Vermarktung bis zum Notartermin begleiten wir Sie persönlich durch jeden Schritt.",
  },
];

export default function LeistungenPage() {
  return (
    <>
      <PageHero
        eyebrow="Leistungen"
        title="Vom ersten Gespräch bis zum erfolgreichen Abschluss."
        description="Ob Bewertung, Verkauf oder Vermietung — jede Leistung beginnt mit einem persönlichen Gespräch."
        breadcrumbs={[{ label: "Startseite", href: "/" }, { label: "Leistungen" }]}
      />

      <section className="py-16 lg:py-20">
        <Container>
          <div className="divide-y divide-border border-t border-border">
            {services.map((service) => (
              <div key={service.slug} className="grid gap-6 py-12 md:grid-cols-[80px_1fr_auto] md:gap-10">
                <span className="font-display text-sm font-bold tabular-nums text-accent-light">{service.number}</span>
                <div>
                  <h2 className="font-display text-display-md font-bold text-ink">{service.title}</h2>
                  <p className="pretty mt-4 max-w-2xl text-[1.0625rem] leading-relaxed text-text-muted">
                    {service.description}
                  </p>
                </div>
                <Link
                  href={service.href}
                  className="group mt-2 inline-flex h-fit items-center gap-2 text-sm font-semibold text-accent-deep md:mt-0"
                >
                  {service.cta}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <WhyAbelen />

      <Faq title="Häufige Fragen" items={faqItems} />

      <JsonLd
        data={breadcrumbSchema([
          { name: "Start", path: "/" },
          { name: "Leistungen", path: "/leistungen" },
        ])}
      />
      <JsonLd data={faqSchema(faqItems)} />
    </>
  );
}
