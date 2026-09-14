import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SiteImage } from "@/components/graphics/SiteImage";
import { resolveImage } from "@/lib/imagery";
import { images } from "@/data/imagery";

/** Text wörtlich von der Startseite des bisherigen Auftritts übernommen. */
export function PersonalService() {
  const image = resolveImage(images.personalService);

  return (
    <section className="bg-ink-deep py-20 lg:py-28">
      <Container className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16">
        <Reveal>
          <h2 className="balance font-display text-display-lg font-bold text-white">
            Persönlich, Verlässlich…
          </h2>

          <div className="pretty mt-5 max-w-xl space-y-4 text-[0.9375rem] leading-relaxed text-white/75">
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

        <Reveal delay={120}>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[14px] bg-white/5">
            <SiteImage
              src={image}
              sizes="(min-width: 1024px) 45vw, 100vw"
              label="Silke Abelen"
              alt="Schlüsselübergabe — persönliche Begleitung durch Silke Abelen"
            />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
