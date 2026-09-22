import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SiteImage } from "@/components/graphics/SiteImage";
import { HouseDraw } from "@/components/graphics/HouseDraw";
import { resolveImage } from "@/lib/imagery";
import { images } from "@/data/imagery";

/**
 * Text wörtlich von der Startseite des bisherigen Auftritts übernommen.
 *
 * Der Abschnitt trägt den Abschluss der Startseite gleich mit. Vorher
 * standen hier zwei dunkle Blöcke untereinander — derselbe Farbton, aber
 * eine sichtbare Kante dazwischen, an der das Stadtbild abriss und flaches
 * Navy anfing. Das las sich wie ein Fehler. Jetzt ist es eine Fläche: das
 * Foto trägt den oberen Teil und läuft nach unten ins Navy aus, und der
 * Abschluss steht auf dem ruhigen Grund, den es dort hinterlässt.
 *
 * Der Verlauf steht dicht über der linken Seite, wo der Text liegt, und
 * verblasst nach rechts, bis das Foto offen liegt — so ist die Schrift zu
 * lesen, ohne das Bild überall zuzudecken.
 */
export function PersonalService({
  cta,
}: {
  /** Der Abschluss der Seite. Ohne ihn endet der Abschnitt nach dem Text. */
  cta?: { title: string; buttonLabel: string; href: string };
}) {
  const image = resolveImage(images.personalService);

  return (
    <section className="relative isolate overflow-hidden bg-ink-deep">
      <div className="absolute inset-0" aria-hidden="true">
        <SiteImage
          src={image}
          sizes="100vw"
          label="Leverkusen"
          alt=""
          tone="dark"
          className="object-[70%_50%] lg:object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-deep via-ink-deep/85 to-ink-deep/20" />
        {/* Nach unten hin geht das Foto in die Farbe über. Der Abschluss
            steht dadurch auf einer ruhigen Fläche, ohne dass eine Kante
            nötig wäre. */}
        <div className="absolute inset-0 bg-gradient-to-b from-ink-deep/25 via-ink-deep/55 to-ink-deep" />
      </div>

      <Container className="relative">
        <Reveal className="max-w-xl py-14 lg:py-20">
          <h2 className="balance font-display text-display-lg font-bold text-white">
            Persönlich, Verlässlich…
          </h2>

          <div className="pretty mt-6 space-y-4 text-[0.9375rem] leading-relaxed text-white/80">
            <p>
              …mit viel Erfahrung in der Immobilienvermarktung. Ein Vermittler, der den Erwerb
              oder Verkauf auch aus einer anderen Perspektive beleuchtet? Wir arbeiten
              unbürokratisch und lösungsorientiert. Hört sich gut an? Dann lassen Sie uns reden!
            </p>
            <p>
              <span className="font-semibold text-white">Persönlicher Service:</span> Bei uns
              stehen Sie im Mittelpunkt, eine enge Zusammenarbeit ist dafür Voraussetzung. Für
              Ihren Immobilienverkauf bzw. Immobiliensuche möchten wir Ihre Bedürfnisse und
              Wünsche verstehen, um einen perfekten Käufer oder ein perfektes Zuhause für Sie zu
              finden.
            </p>
            <p>
              <span className="font-semibold text-white">Vertrauen und Integrität:</span> Wir
              legen Wert auf Transparenz und Integrität in allem, was wir anfangen. Sie können
              sich darauf verlassen, dass wir Ihnen ehrliche und verlässliche Beratung und
              Unterstützung während des gesamten Kauf- oder Verkaufsprozesses bieten.
            </p>
          </div>

          <Button href="/ueber-mich" variant="inverted" withArrow className="mt-8">
            Über mich
          </Button>
        </Reveal>

        {cta && (
          /* Eine Haarlinie, kein Schnitt: sie gibt dem Abschluss seinen
             eigenen Stand, ohne die Fläche zu teilen. */
          <div className="border-t border-white/[0.09] py-12 lg:py-16">
            <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-16">
              <Reveal>
                <p className="balance font-display text-display-lg font-bold text-white">
                  {cta.title}
                </p>
                <Button
                  href={cta.href}
                  variant="inverted"
                  size="lg"
                  withArrow
                  className="mt-7 w-full sm:w-auto"
                >
                  {cta.buttonLabel}
                </Button>
              </Reveal>

              {/* Das Haus der Marke, Strich für Strich gezeichnet. */}
              <HouseDraw className="mx-auto h-40 w-auto text-accent/45 sm:h-48 lg:mx-0 lg:h-56" />
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}
