import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SiteImage } from "@/components/graphics/SiteImage";
import { resolveImage } from "@/lib/imagery";
import { images } from "@/data/imagery";

/**
 * Text wörtlich von der Startseite des bisherigen Auftritts übernommen.
 *
 * Vollflächiges Foto statt Karte neben Text — dieselbe Bildsprache wie im
 * Hero, damit die Seite an dieser Stelle nicht wie ein zweiter, kleinerer
 * Aufmacher wirkt, sondern wie eine bewusste Wiederholung desselben Motivs.
 */
export function PersonalService() {
  const image = resolveImage(images.personalService);

  return (
    <section className="relative isolate overflow-hidden bg-ink-deep py-20 lg:py-28">
      <div className="absolute inset-0" aria-hidden="true">
        <SiteImage src={image} sizes="100vw" label="Leverkusen" alt="" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-deep via-ink-deep/85 to-ink-deep/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-deep/40 via-transparent to-ink-deep/20" />
      </div>

      <Container className="relative">
        <Reveal className="max-w-xl">
          <h2 className="balance font-display text-display-lg font-bold text-white">
            Persönlich, Verlässlich…
          </h2>

          <div className="pretty mt-5 space-y-4 text-[0.9375rem] leading-relaxed text-white/80">
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

          <Button href="/ueber-mich" variant="inverted" className="mt-7">
            Über mich
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
