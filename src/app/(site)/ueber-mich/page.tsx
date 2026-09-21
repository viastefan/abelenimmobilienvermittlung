import type { Metadata } from "next";
import { Check, Mail, Phone, Smartphone } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { SiteImage } from "@/components/graphics/SiteImage";
import { TrustBadges } from "@/components/home/TrustBadges";
import { CtaSection } from "@/components/home/CtaSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { pageSeo } from "@/lib/seo";
import { resolveImage } from "@/lib/imagery";
import { images } from "@/data/imagery";
import { regions, site } from "@/data/site";

export const metadata: Metadata = pageSeo({
  title: "Über uns — Silke Abelen",
  description:
    "Silke Abelen begleitet Eigentümerinnen und Eigentümer in Leverkusen und Umgebung — persönlich, transparent und mit langjähriger Erfahrung in Bewertung, Verkauf und Vermittlung.",
  path: "/ueber-mich",
});

const principles = [
  {
    title: "Persönlich",
    description: "Direkter Kontakt, feste Ansprechpartnerin — kein Callcenter, keine wechselnden Zuständigkeiten.",
  },
  {
    title: "Transparent",
    description: "Sie erfahren, wie eine Einschätzung zustande kommt und woran ein Verkauf gerade hängt.",
  },
  {
    title: "Integer",
    description: "Eine ehrliche Einschätzung ist mehr wert als ein Wunschpreis, der Monate kostet.",
  },
  {
    title: "Regional",
    description: "Fundierte Marktkenntnis in Leverkusen und den angrenzenden Städten des Bergischen Rheinlands.",
  },
];

export default function UeberMichPage() {
  const portrait = resolveImage(images.portrait);

  return (
    <>
      <PageHero
        eyebrow="Über uns"
        title={
          <>
            Ihre Ansprechpartnerin
            <br className="hidden sm:block" /> für Immobilien in Leverkusen
          </>
        }
        description={`${site.owner} — ${site.ownerRole} des Büros für Immobilien Bewertung & Vermittlung.`}
        breadcrumbs={[{ label: "Startseite", href: "/" }, { label: "Über uns" }]}
      />

      <section className="py-14 lg:py-20">
        <Container className="grid gap-12 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:items-start lg:gap-16">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden rounded-[24px] bg-surface-mist">
              <SiteImage
                src={portrait}
                sizes="(min-width: 1024px) 40vw, 100vw"
                label={site.owner}
                alt={`${site.owner}, ${site.ownerRole}`}
              />
            </div>
            <TrustBadges className="mt-7" />
          </Reveal>

          <Reveal delay={100}>
            <div className="space-y-6 text-[1.0625rem] leading-relaxed text-text-muted">
              <p className="pretty">
                Immobilienvermittlung ist für mich vor allem Vertrauenssache. Ich möchte nicht nur
                ein Haus oder eine Wohnung vermitteln, sondern Menschen durch eine Entscheidung
                begleiten, die selten allein finanziell ist.
              </p>
              <p className="pretty">
                Transparenz, Integrität und persönlicher Einsatz gehören für mich zu jedem Auftrag —
                unabhängig davon, welchen Wert eine Immobilie hat. Eine gute Vermittlung endet nicht
                mit der Unterschrift, sondern mit einer Empfehlung, die man gerne ausspricht.
              </p>
              <p className="pretty">
                Als selbstständige Immobilienberaterin kenne ich den lokalen Markt genau — von
                Leverkusen über Leichlingen und Solingen bis nach Wuppertal. Diese Nähe zur Region
                ist die Grundlage für eine realistische Einschätzung und eine ehrliche Beratung.
              </p>
            </div>

            <dl className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2">
              {principles.map((principle) => (
                <div key={principle.title}>
                  <dt className="flex items-center gap-2 font-display text-[1.0625rem] font-bold text-ink">
                    <Check className="h-4 w-4 text-accent-deep" strokeWidth={2.4} aria-hidden="true" />
                    {principle.title}
                  </dt>
                  <dd className="pretty mt-2 text-[0.9375rem] leading-relaxed text-text-muted">
                    {principle.description}
                  </dd>
                </div>
              ))}
            </dl>

            <Button href="/kontakt" variant="primary" withArrow className="mt-10">
              Persönliches Gespräch vereinbaren
            </Button>
          </Reveal>
        </Container>

        {/* Der direkte Draht steht nur hier. Silke Abelen arbeitet als
            Einzelne, nicht als Firma — ihre Nummer gehört deshalb nicht in
            Kopfzeile, Fußzeile und jede Objektseite.

            Er steht quer unter beiden Spalten, nicht in der linken: dort
            machte er die eine Spalte so viel länger als die andere, dass
            neben ihm eine leere Fläche über die halbe Seitenbreite blieb. */}
        <Container className="mt-14 lg:mt-16">
          <Reveal>
            <div className="rounded-[24px] bg-surface-warm p-7 lg:p-9">
              <p className="font-display text-[1.0625rem] font-bold text-ink">Direkter Draht</p>
              <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                <ContactLine
                  href={site.phoneHref}
                  icon={Smartphone}
                  label="Mobil"
                  value={site.phone}
                />
                <ContactLine
                  href={site.landlineHref}
                  icon={Phone}
                  label="Telefon"
                  value={site.landline}
                />
                <ContactLine
                  href={`mailto:${site.email}`}
                  icon={Mail}
                  label="E-Mail"
                  value={site.email}
                />
              </ul>
            </div>
          </Reveal>
        </Container>
      </section>


      <section className="bg-white py-14 lg:py-20">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Tätigkeitsgebiet"
              title="Wo wir für Sie unterwegs sind"
              description="Leverkusen ist unser Zuhause — vermittelt wird im gesamten Bergischen Rheinland und im angrenzenden Umland."
            />
            <ul className="mt-8 flex flex-wrap gap-3">
              {regions.map((region) => (
                <li
                  key={region}
                  className={`rounded-[14px] border px-5 py-2.5 text-[0.9375rem] ${
                    region === site.serviceArea
                      ? "border-accent bg-accent-soft font-bold text-ink"
                      : "border-border bg-white text-text-muted"
                  }`}
                >
                  {region}
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </section>

      <CtaSection
        title="Sprechen wir über Ihre Immobilie."
        description="Persönlich, unverbindlich und zu einem Zeitpunkt, der Ihnen passt."
        buttonLabel="Kontakt aufnehmen"
        href="/kontakt"
      />

      <JsonLd
        data={breadcrumbSchema([
          { name: "Start", path: "/" },
          { name: "Über uns", path: "/ueber-mich" },
        ])}
      />
    </>
  );
}

function ContactLine({
  href,
  icon: Icon,
  label,
  value,
}: {
  href: string;
  icon: typeof Phone;
  label: string;
  value: string;
}) {
  return (
    <li>
      <a href={href} className="group flex items-start gap-3.5 transition-colors hover:text-accent-deep">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px] bg-white text-accent-deep ring-1 ring-border">
          <Icon className="h-[18px] w-[18px]" strokeWidth={1.6} aria-hidden="true" />
        </span>
        <span className="min-w-0">
          <span className="block text-[0.75rem] font-medium text-text-subtle">{label}</span>
          <span className="mt-0.5 block truncate font-display text-[0.9375rem] font-bold text-ink group-hover:text-accent-deep">
            {value}
          </span>
        </span>
      </a>
    </li>
  );
}
