import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { FacadeMotif } from "@/components/graphics/ArchMotif";
import { GrainOverlay } from "@/components/graphics/GrainOverlay";
import { trustRegions } from "@/data/site";

export function Hero() {
  return (
    <section className="relative flex min-h-[92vh] items-end overflow-hidden bg-ink pt-32">
      <div className="absolute inset-0 bg-[radial-gradient(120%_100%_at_85%_0%,#3a352c_0%,#15160F_55%)]" />
      <GrainOverlay />

      <div
        className="absolute inset-y-0 right-0 hidden w-[46%] text-accent/30 md:block"
        aria-hidden="true"
      >
        <FacadeMotif className="h-full w-full" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/40 to-transparent" />
      </div>

      <Container className="relative z-10 pb-20 pt-10 lg:pb-28">
        <div className="max-w-2xl fade-up">
          <Eyebrow light>Immobilienvermittlung im Rheinland</Eyebrow>
          <h1 className="mt-6 text-display-xl font-display font-bold text-white balance">
            Immobilien.
            <br />
            Persönlich vermittelt.
          </h1>
          <p className="mt-7 max-w-lg text-base leading-relaxed text-white/70 sm:text-lg">
            Persönliche Immobilienvermittlung mit Erfahrung, klarer Beratung und einem Anspruch,
            der über den erfolgreichen Abschluss hinausgeht.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button href="/verkaufen" variant="inverted">
              Immobilie verkaufen
            </Button>
            <Button href="/immobilien" variant="secondaryInverted" withArrow className="group">
              Immobilien entdecken
            </Button>
          </div>

          <p className="mt-14 text-xs uppercase tracking-[0.16em] text-white/40">
            {trustRegions.join(" · ")}
          </p>
        </div>
      </Container>
    </section>
  );
}
