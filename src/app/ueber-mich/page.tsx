import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Philosophy } from "@/components/home/Philosophy";
import { DoorMotif } from "@/components/graphics/ArchMotif";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { pageSeo } from "@/lib/seo";
import { site } from "@/data/site";

export const metadata: Metadata = pageSeo({
  title: "Über mich — Silke Abelen",
  description:
    "Silke Abelen begleitet Immobilienverkäufe und -käufe in Leichlingen, Leverkusen, Solingen und der Region — persönlich, transparent und mit langjähriger Erfahrung.",
  path: "/ueber-mich",
});

export default function UeberMichPage() {
  return (
    <>
      <PageHero
        eyebrow="Über mich"
        title="Eine feste Ansprechpartnerin für Ihre Immobilie."
        description={`${site.owner} — Inhaberin von ${site.legalName}.`}
      />

      <section className="py-20 lg:py-28">
        <Container className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          <div className="relative flex aspect-[4/5] items-end overflow-hidden rounded-lg border border-border bg-ink">
            <DoorMotif className="absolute inset-0 m-auto h-2/3 text-white/25" />
            <div className="relative z-10 p-8">
              <p className="font-display text-4xl font-semibold text-white">SA</p>
              <p className="mt-1 text-sm text-white/60">{site.owner}</p>
            </div>
          </div>

          <div className="space-y-6 text-base leading-relaxed text-text-muted">
            <p>
              Immobilienvermittlung ist für mich vor allem Vertrauenssache. Ich möchte nicht nur ein
              Haus oder eine Wohnung vermitteln, sondern Menschen langfristig begleiten und eine
              Zusammenarbeit schaffen, die in Erinnerung bleibt.
            </p>
            <p>
              Transparenz, Integrität und persönlicher Einsatz gehören für mich zu jedem Auftrag —
              unabhängig davon, welchen Wert eine Immobilie hat. Ich glaube daran, dass eine gute
              Vermittlung nicht mit der Unterschrift endet, sondern mit einer Empfehlung, die man
              gerne ausspricht.
            </p>
            <p>
              Als selbstständige Immobilienberaterin in der Region kenne ich den lokalen Markt genau
              — von Leichlingen über Leverkusen und Solingen bis nach Wuppertal. Diese Nähe zur
              Region ist die Grundlage für eine realistische Einschätzung und eine ehrliche Beratung.
            </p>
            <Button href="/kontakt" variant="primary" className="mt-2 w-fit">
              Persönliches Gespräch vereinbaren
            </Button>
          </div>
        </Container>
      </section>

      <Philosophy />

      <JsonLd
        data={breadcrumbSchema([
          { name: "Start", path: "/" },
          { name: "Über mich", path: "/ueber-mich" },
        ])}
      />
    </>
  );
}
