import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { DoorMotif } from "@/components/graphics/ArchMotif";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/data/site";

export function About() {
  return (
    <section className="py-24 lg:py-32">
      <Container className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
        <Reveal className="relative flex aspect-[4/5] items-end overflow-hidden rounded-lg border border-border bg-ink">
          <DoorMotif className="absolute inset-0 m-auto h-2/3 text-white/25" />
          <div className="relative z-10 p-8">
            <p className="font-display text-4xl font-semibold text-white">SA</p>
            <p className="mt-1 text-sm text-white/60">{site.owner}</p>
          </div>
        </Reveal>

        <Reveal delay={120} className="flex flex-col justify-center">
          <Eyebrow>Über mich</Eyebrow>
          <h2 className="mt-6 text-display-lg font-display font-semibold text-ink balance">
            Persönlich für
            <br />
            Ihre Immobilie da.
          </h2>
          <p className="mt-7 max-w-xl text-base leading-relaxed text-text-muted">
            Immobilienvermittlung ist für mich vor allem Vertrauenssache. Ich möchte nicht nur ein
            Haus oder eine Wohnung vermitteln, sondern Menschen langfristig begleiten und eine
            Zusammenarbeit schaffen, die in Erinnerung bleibt.
          </p>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-text-muted">
            Transparenz, Integrität und persönlicher Einsatz gehören für mich zu jedem Auftrag —
            unabhängig davon, welchen Wert eine Immobilie hat.
          </p>
          <Button href="/ueber-mich" variant="ghost" withArrow className="group mt-8 w-fit font-semibold text-ink">
            Mehr über mich
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
