import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SiteImage } from "@/components/graphics/SiteImage";
import { resolveImage } from "@/lib/imagery";
import { images } from "@/data/imagery";
import { regions, site } from "@/data/site";

/**
 * Text und Regionenliste wörtlich von der Startseite des bisherigen
 * Auftritts übernommen — inklusive der doppelt genannten Rundum-Sorglos-
 * Formulierung, die dort ebenfalls zweimal steht.
 */
export function About() {
  const portrait = resolveImage(images.portrait);

  return (
    <section className="bg-white py-14 lg:py-20">
      <Container className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-16">
        <Reveal>
          <Eyebrow>Über uns</Eyebrow>
          <h2 className="balance mt-4 font-display text-display-lg font-bold text-ink">
            Ihr Experte für Immobilien
          </h2>

          <div className="pretty mt-5 max-w-2xl space-y-4 text-[0.9375rem] leading-relaxed text-text-muted">
            <p>
              Das Büro für Immobilien Bewertung &amp; Vermittlung bietet Ihnen das
              Rundum-Sorglos-Paket.
            </p>
            <p>
              Unser Ziel ist es, unseren Kunden den bestmöglichen Service zu bieten und dabei
              gemeinsam ein optimales Ergebnis zu erzielen. Zum erfolgreichen Verkauf gehören
              nicht nur professionelles Marketing, das Erstellen von Exposés und das Durchführen
              von Besichtigungsterminen. Das Büro für Immobilien Bewertung &amp; Vermittlung
              bietet Ihnen das Rundum-Sorglos-Paket. Wir übernehmen für Sie die gesamte
              Kommunikation mit den Kaufinteressenten und präsentieren Ihnen am Ende unserer
              geordneten und jahrelang eingespielten Abläufe den richtigen Käufer.
            </p>
            <p>
              <span className="font-semibold text-ink">Unsere Philosophie:</span> „Wir möchten
              nicht nur Ihr Haus oder Ihre Wohnung verkaufen. Wichtig ist uns, Ihre langfristige
              und nachhaltige Empfehlung&rdquo;. Natürlich können Sie sich ebenfalls auf unsere
              Zuverlässigkeit und schnelle Reaktionszeiten verlassen. Wir gehen jeden Auftrag mit
              Engagement an, dabei spielt es keine Rolle, wie hoch der Preis Ihrer Immobilie ist.
            </p>
            <p>
              Bei uns stehen Sie im Mittelpunkt, eine enge Zusammenarbeit ist dafür
              Voraussetzung. Zudem legen wir Wert auf Transparenz und Integrität in allem, was wir
              anfangen. Ehrliche und verlässliche Beratung und Unterstützung während des gesamten
              Kauf- oder Verkaufsprozesses sind selbstverständlich.
            </p>
            <p>
              In den nachfolgenden Regionen sind wir tätig und freuen uns darauf, Ihnen mit
              unserem Service vor Ort zur Seite zu stehen: {regions.join(", ")}.
            </p>
          </div>

          <Button href="/ueber-mich" variant="primary" className="mt-7">
            Mehr über uns
          </Button>
        </Reveal>

        <Reveal delay={120}>
          <div className="relative aspect-[4/5] overflow-hidden rounded-[14px] bg-surface-mist">
            <SiteImage
              src={portrait}
              sizes="(min-width: 1024px) 34vw, 100vw"
              label={site.owner}
              alt={`${site.owner}, ${site.ownerRole} des Büros für Immobilien Bewertung & Vermittlung`}
            />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
