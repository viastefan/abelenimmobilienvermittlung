import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { WhyAbelen } from "@/components/home/WhyAbelen";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";
import { pageSeo } from "@/lib/seo";
import { services } from "@/data/services";

export const metadata: Metadata = pageSeo({
  title: "Leistungen — Verkauf, Kauf & Immobilienbewertung",
  description:
    "Alle Leistungen von Abelen Immobilien im Überblick: Immobilie verkaufen, Immobilie kaufen und professionelle Immobilienbewertung in Leverkusen und Umgebung.",
  path: "/leistungen",
});

const faqItems = [
  {
    question: "Was kostet eine Immobilienbewertung bei Abelen Immobilien?",
    answer:
      "Eine erste Einschätzung im Rahmen eines persönlichen Gesprächs ist unverbindlich und kostenfrei. Sprechen Sie mich gerne direkt an.",
  },
  {
    question: "In welchen Regionen ist Abelen Immobilien tätig?",
    answer:
      "Schwerpunkte sind Leichlingen, Leverkusen, Solingen und Wuppertal sowie Burscheid, Remscheid, Wermelskirchen, Düsseldorf und der Kreis Mettmann.",
  },
  {
    question: "Wie läuft der Verkauf meiner Immobilie ab?",
    answer:
      "Vom Erstgespräch über Besichtigung, Marktpreisermittlung und Vermarktung bis zum Notartermin begleite ich Sie persönlich durch jeden Schritt.",
  },
];

export default function LeistungenPage() {
  return (
    <>
      <PageHero
        eyebrow="Leistungen"
        title="Vom ersten Gespräch bis zum erfolgreichen Abschluss."
        description="Ob Verkauf, Kauf oder Bewertung — jede Leistung beginnt mit einem persönlichen Gespräch und endet erst, wenn Sie zufrieden sind."
      />

      <section className="py-20 lg:py-28">
        <Container>
          <div className="divide-y divide-border border-t border-border">
            {services.map((service) => (
              <div key={service.slug} className="grid gap-6 py-12 md:grid-cols-[80px_1fr_auto] md:gap-10">
                <span className="font-display text-sm text-text-muted">{service.number}</span>
                <div>
                  <h2 className="font-display text-3xl font-semibold text-ink">{service.title}</h2>
                  <p className="mt-4 max-w-2xl text-base leading-relaxed text-text-muted">
                    {service.description}
                  </p>
                </div>
                <Link
                  href={service.href}
                  className="group mt-2 inline-flex h-fit items-center gap-2 text-sm font-semibold text-ink md:mt-0"
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

      <section className="py-20 lg:py-28">
        <Container className="max-w-3xl">
          <h2 className="font-display text-2xl font-semibold text-ink">Häufige Fragen</h2>
          <div className="mt-8 divide-y divide-border border-t border-border">
            {faqItems.map((item) => (
              <div key={item.question} className="py-6">
                <h3 className="font-display text-lg font-medium text-ink">{item.question}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">{item.answer}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

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
