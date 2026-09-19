import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SiteImage } from "@/components/graphics/SiteImage";
import { HeadingRule } from "@/components/ui/HeadingRule";
import { resolveImage } from "@/lib/imagery";
import { images } from "@/data/imagery";

/**
 * Text wörtlich von der Startseite des bisherigen Auftritts übernommen.
 *
 * Das Stadtbild trägt wieder die ganze Fläche. Der Verlauf steht dicht über
 * der linken Seite, wo der Text liegt, und verblasst nach rechts, bis das
 * Foto offen liegt — so ist die Schrift zu lesen, ohne das Bild überall
 * zuzudecken.
 */
export function PersonalService() {
  const image = resolveImage(images.personalService);

  return (
    <section className="relative isolate overflow-hidden bg-ink-deep py-16 lg:py-24">
      <div className="absolute inset-0" aria-hidden="true">
        <SiteImage
          src={image}
          sizes="100vw"
          label="Leverkusen"
          alt=""
          className="object-[70%_50%] lg:object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-deep via-ink-deep/85 to-ink-deep/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-deep/55 via-transparent to-ink-deep/25" />
      </div>

      <Container className="relative">
        <Reveal className="max-w-xl">
          <h2 className="balance font-display text-display-lg font-bold text-white">
            Persönlich, Verlässlich…
          </h2>
          <HeadingRule light className="mt-5" />

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
      </Container>
    </section>
  );
}
