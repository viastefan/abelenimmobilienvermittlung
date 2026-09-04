import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { DoorMotif } from "@/components/graphics/ArchMotif";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/data/site";

export function About() {
  return (
    <section className="bg-surface-soft py-24 lg:py-28">
      <Container className="grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
        <Reveal className="flex flex-col justify-center">
          <Eyebrow>Über uns</Eyebrow>
          <h2 className="mt-6 text-display-lg font-display font-semibold text-ink balance">
            Ihr Partner für Immobilien
            <br />
            in Leverkusen.
          </h2>
          <p className="mt-7 max-w-xl text-base leading-relaxed text-text-muted">
            Als inhabergeführtes Büro bieten wir Ihnen persönliche Beratung, fundiertes Fachwissen
            und eine ehrliche Einschätzung — für Ergebnisse, die überzeugen.
          </p>
          <Button href="/ueber-mich" variant="primary" className="mt-8 w-fit">
            Mehr erfahren
          </Button>
        </Reveal>

        <Reveal delay={120} className="relative flex aspect-[5/4] items-end overflow-hidden rounded-lg bg-ink">
          <DoorMotif className="absolute inset-0 m-auto h-2/3 text-white/20" />
          <div className="relative z-10 p-8">
            <p className="font-display text-4xl font-semibold text-white">SA</p>
            <p className="mt-1 text-sm text-white/60">{site.owner}</p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
