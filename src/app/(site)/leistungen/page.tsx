import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Home, Network, Search } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { WhyAbelen } from "@/components/home/WhyAbelen";
import { CtaSection } from "@/components/home/CtaSection";
import { ContactButton } from "@/components/contact/ContactButton";
import { JsonLd } from "@/components/seo/JsonLd";
import { SiteImage } from "@/components/graphics/SiteImage";
import { breadcrumbSchema } from "@/lib/schema";
import { pageSeo } from "@/lib/seo";
import { resolveImage } from "@/lib/imagery";
import { images } from "@/data/imagery";
import { dienstleistungen, services } from "@/data/services";

export const metadata: Metadata = pageSeo({
  title: "Dienstleistungen — Immobilienverkauf und Kauf",
  description:
    "Immobiliensuche, Beratung und Bewertung, Netzwerk: Wir begleiten Sie sicher und kompetent durch Kauf und Verkauf Ihrer Immobilie.",
  path: "/leistungen",
});

const icons = { search: Search, home: Home, network: Network } as const;

/**
 * Dienstleistungen.
 *
 * Wortlaut des bisherigen Auftritts unter `/dienstleistungen`. Die Seite
 * heißt hier `/leistungen`; die alte Adresse leitet dorthin weiter.
 */
export default function LeistungenPage() {
  return (
    <>
      <PageHero
        title={
          <>
            Immobilienverkauf? Kauf?
            <br className="hidden sm:block" /> Wir begleiten Sie sicher und kompetent.
          </>
        }
        breadcrumbs={[{ label: "Startseite", href: "/" }, { label: "Dienstleistungen" }]}
        withMedia
        image={resolveImage(images.leistungen)}
      />

      {/* Überschrift links, Fließtext rechts. Über die volle Breite gesetzt
          bliebe rechts neben dem Textblock die halbe Seite leer; in voller
          Breite gesetzt würden die Zeilen zu lang zum Lesen. */}
      <section className="py-12 lg:py-16">
        <Container className="grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
          <div>
            <Eyebrow>Warum Begleitung</Eyebrow>
            <h2 className="balance mt-3 font-display text-display-lg font-bold text-ink">
              Kauf und Verkauf sind Entscheidungen, die man selten trifft
            </h2>
          </div>

          <div className="space-y-6 text-[1.0625rem] leading-relaxed text-text-muted">
            <p className="pretty">
              Die Statistik zeigt: Die Mehrheit der Menschen kauft oder verkauft nur wenige Male, oft
              sogar nur ein einziges Mal im Leben, eine Immobilie. Fast immer geht es dabei um sehr
              hohe Werte. Es ist daher absolut verständlich, dass viele Immobilienkäufer und
              -verkäufer unsicher sind.
            </p>
            <p className="pretty">
              Der Verkauf von Immobilien ist ein Vollzeitjob, der professionelles Marketing, die
              Erstellung von Exposés und die Durchführung von Besichtigungsterminen erfordert. Bei
              der Preisgestaltung, den Verkaufsverhandlungen und Notarterminen sind zudem
              Praxiserfahrung sowie spezielles Fachwissen in regionalen und formalen Abläufen
              unerlässlich. Wir unterstützen Sie beim Verkauf Ihrer Immobilie, sei es ein
              Zweifamilienhaus, Einfamilienhaus, eine Doppelhaushälfte, ein Reihenhaus, ein
              Reiheneckhaus oder eine Wohnung, und begleiten Sie persönlich durch den gesamten
              Prozess.
            </p>
            <p className="pretty">
              Doch auch der Kauf einer Immobilie ist eine große Herausforderung. Wir stehen Ihnen bei
              der Suche nach Ihrer Traumimmobilie zur Seite, helfen Ihnen bei der Auswahl, stellen
              alle notwendigen Unterlagen für Finanzierungen zusammen und beraten Sie bei jedem
              Schritt.
            </p>
          </div>
        </Container>
      </section>

      <section className="bg-surface-cool py-12 lg:py-16">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16">
            <Reveal>
              <SectionHeading
                eyebrow="Meine Dienstleistungen"
                size="lg"
                title="Eine Übersicht — von der ersten Beratung bis zur Vermittlung"
                description="Der Kauf oder Verkauf einer Immobilie ist eine der wichtigsten Entscheidungen in Ihrem Leben. Hier finden Sie eine Übersicht unserer professionellen Dienstleistungen, die Sie bei jedem Schritt unterstützen – von der ersten Beratung über die Preisgestaltung bis zur erfolgreichen Vermittlung."
              />
            </Reveal>
            <Reveal delay={100}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-[24px] bg-surface-mist">
                <SiteImage
                  src={resolveImage(images.leistungenNetzwerk)}
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  label="Netzwerk"
                  alt="Handschlag zwischen Geschäftspartnern vor einem modernen Gebäude"
                />
              </div>
            </Reveal>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {dienstleistungen.map((item, index) => {
              const Icon = icons[item.icon];
              return (
                <Reveal key={item.title} delay={index * 90} className="h-full">
                  <article className="flex h-full flex-col rounded-[24px] bg-white shadow-soft ring-1 ring-border p-7">
                    <span className="flex items-center gap-3.5">
                      <Icon className="h-7 w-7 shrink-0 text-accent-mid" strokeWidth={1.4} aria-hidden="true" />
                      <h2 className="font-display text-[1.125rem] font-bold text-ink">{item.title}</h2>
                    </span>

                    <p className="pretty mt-5 flex-1 text-[0.9375rem] leading-relaxed text-text-muted">
                      {item.body}
                    </p>

                    {item.href && (
                      <Link
                        href={item.href}
                        className="group mt-6 inline-flex w-fit items-center gap-2 rounded-[14px] bg-surface-mist px-4 py-3 text-sm font-semibold text-accent-deep transition-all duration-300 ease-smooth hover:-translate-y-0.5 hover:bg-accent-soft"
                      >
                        {item.cta}
                        <ArrowRight
                          className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                          aria-hidden="true"
                        />
                      </Link>
                    )}
                  </article>
                </Reveal>
              );
            })}
          </div>

          <div className="mt-10">
            <ContactButton
              options={{ title: "Kontakt aufnehmen" }}
              className="inline-flex w-full items-center justify-center gap-2 rounded-[14px] bg-accent-deep px-6 py-3.5 text-[0.9375rem] font-semibold text-white transition-all duration-300 ease-smooth hover:-translate-y-0.5 hover:bg-accent-dark sm:w-auto"
            >
              Jetzt Kontakt aufnehmen
            </ContactButton>
          </div>
        </Container>
      </section>

      {/* Die drei eigenen Seiten — sie führen den obigen Überblick aus. */}
      <section className="py-14 lg:py-20">
        <Container>
          <h2 className="balance font-display text-display-lg font-bold text-ink">Im Einzelnen</h2>
          <div className="mt-8 space-y-3">
            {services.map((service) => (
              <div key={service.slug} className="grid gap-5 rounded-[24px] bg-surface-warm p-6 md:grid-cols-[1fr_auto] md:items-center md:gap-10 md:p-8">
                <div>
                  <h3 className="font-display text-[1.125rem] font-bold text-ink">{service.title}</h3>
                  <p className="pretty mt-2 max-w-2xl text-[0.9375rem] leading-relaxed text-text-muted">
                    {service.description}
                  </p>
                </div>
                <Link
                  href={service.href}
                  className="group inline-flex h-fit w-fit items-center gap-2 rounded-[14px] bg-white px-4 py-3 text-sm font-semibold text-accent-deep shadow-soft transition-all duration-300 ease-smooth hover:-translate-y-0.5"
                >
                  {service.cta}
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <WhyAbelen />

      <CtaSection
        title="Planen Sie, eine Immobilie zu kaufen oder zu verkaufen?"
        description="Schreiben Sie uns — wir melden uns in der Regel innerhalb eines Werktages persönlich zurück."
        buttonLabel="Kontakt aufnehmen"
        href="/kontakt"
      />

      <JsonLd
        data={breadcrumbSchema([
          { name: "Start", path: "/" },
          { name: "Dienstleistungen", path: "/leistungen" },
        ])}
      />
    </>
  );
}
