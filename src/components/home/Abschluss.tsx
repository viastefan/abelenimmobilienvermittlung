import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { HouseDraw } from "@/components/graphics/HouseDraw";

/**
 * Der letzte Satz der Startseite, direkt über der Fußzeile.
 *
 * Eine breite Karte, keine Fläche bis an den Rand: Sie steht auf dem Grund
 * der Seite wie die Abschnitte darüber und schließt die Seite ab, statt mit
 * dem dunklen Abschnitt weiter oben zu einem Block zu verschmelzen. Rechts
 * das Haus der Marke, das sich zeichnet, sobald die Karte ins Bild kommt.
 */
export function Abschluss({ title, buttonLabel, href }: { title: string; buttonLabel: string; href: string }) {
  return (
    <section className="bg-white pb-14 lg:pb-20">
      <Container>
        <Reveal className="relative isolate overflow-hidden rounded-[28px] bg-ink-deep px-6 py-10 sm:px-10 sm:py-12 lg:px-14 lg:py-14">
          {/* Ein Schimmer in der Farbe der Marke hinter dem Haus. */}
          <div
            className="pointer-events-none absolute -right-24 -top-28 -z-10 h-[26rem] w-[26rem] rounded-full bg-accent/[0.14] blur-3xl"
            aria-hidden="true"
          />
          <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-16">
            <div className="max-w-3xl">
              <p className="balance font-display text-display-lg font-bold text-white">{title}</p>
              <Button href={href} variant="inverted" size="lg" withArrow className="mt-7 w-full sm:w-auto">
                {buttonLabel}
              </Button>
            </div>
            <HouseDraw className="hidden h-44 w-auto text-accent/55 sm:mx-auto sm:block lg:mx-0 lg:h-52" />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
