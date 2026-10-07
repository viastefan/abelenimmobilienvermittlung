import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SiteImage } from "@/components/graphics/SiteImage";
import { resolveImage } from "@/lib/imagery";
import { images } from "@/data/imagery";

/**
 * Inhaltlich der Text von der Startseite des bisherigen Auftritts — ohne
 * „wir“: Silke Abelen arbeitet allein.
 *
 * Der Verlauf steht dicht über der linken Seite, wo der Text liegt, und
 * verblasst nach rechts, bis das Foto offen liegt — so ist die Schrift zu
 * lesen, ohne das Bild überall zuzudecken. Der Abschluss der Startseite
 * steht nicht mehr hier, sondern als eigene Karte über der Fußzeile.
 */
export function PersonalService() {
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
        {/* Nach unten hin dunkelt das Foto leicht ab, damit der Abschnitt
            ruhig endet. */}
        <div className="absolute inset-0 bg-gradient-to-b from-ink-deep/10 via-ink-deep/25 to-ink-deep/70" />
      </div>

      <Container className="relative">
        <Reveal className="max-w-xl py-14 lg:py-20">
          <h2 className="balance font-display text-display-lg font-bold text-white">
            Persönlich, Verlässlich…
          </h2>

          <div className="pretty mt-6 space-y-4 text-[0.9375rem] leading-relaxed text-white/80">
            <p>
              …mit viel Erfahrung in der Immobilienvermarktung. Ein Vermittler, der den Erwerb
              oder Verkauf auch aus einer anderen Perspektive beleuchtet? Unbürokratisch und
              lösungsorientiert. Hört sich gut an? Ein Anruf genügt.
            </p>
            <p>
              <span className="font-semibold text-white">Persönlicher Service:</span> Sie
              stehen im Mittelpunkt, eine enge Zusammenarbeit ist dafür Voraussetzung. Ob Verkauf
              oder Suche — am Anfang steht das Verständnis für Ihre Bedürfnisse und Wünsche, um
              einen perfekten Käufer oder ein perfektes Zuhause für Sie zu finden.
            </p>
            <p>
              <span className="font-semibold text-white">Vertrauen und Integrität:</span>{" "}
              Transparenz und Integrität gelten bei jedem Auftrag. Sie können sich auf ehrliche
              und verlässliche Beratung und Unterstützung während des gesamten Kauf- oder
              Verkaufsprozesses verlassen.
            </p>
          </div>

          <Button href="/ueber-mich" variant="inverted" withArrow className="mt-8">
            Über mich
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
