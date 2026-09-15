import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { resolveImages } from "@/lib/imagery";
import { getFeaturedActiveProperty } from "@/data/properties";
import { regions } from "@/data/site";
import { propertyFacts } from "@/lib/property-facts";
import { ExpertProperty, type ExpertPropertyData } from "@/components/home/ExpertProperty";

/**
 * Text und Regionenliste wörtlich von der Startseite des bisherigen
 * Auftritts übernommen — inklusive der doppelt genannten Rundum-Sorglos-
 * Formulierung, die dort ebenfalls zweimal steht.
 *
 * Daneben steht das aktuell angebotene Objekt, wie im alten Auftritt. Es ist
 * dasselbe, das `PropertyShowcase` weiter unten ausspart — so erscheint auf
 * der Startseite kein Objekt zweimal.
 */
export async function ExpertIntro() {
  const property = await getFeaturedActiveProperty();

  return (
    <section className="bg-white py-14 lg:py-20">
      <Container className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:gap-16">
        <Reveal>
          <Eyebrow>Über uns</Eyebrow>
          <h2 className="balance mt-4 font-display text-display-lg font-bold text-ink">
            Ihr Experte für Immobilien
          </h2>

          <p className="pretty mt-5 max-w-xl text-[1.0625rem] leading-relaxed text-text-muted">
            Das Büro für Immobilien Bewertung &amp; Vermittlung bietet Ihnen das{" "}
            <span className="font-semibold text-ink">Rundum-Sorglos-Paket</span>.
          </p>

          <div className="pretty mt-5 max-w-xl space-y-4 text-[0.9375rem] leading-relaxed text-text-muted">
            <p>
              Unser Ziel ist es, unseren Kunden den bestmöglichen Service zu bieten und dabei
              gemeinsam ein optimales Ergebnis zu erzielen. Zum erfolgreichen Verkauf gehören
              nicht nur professionelles Marketing, das Erstellen von Exposés und das Durchführen
              von Besichtigungsterminen.{" "}
              <span className="font-semibold text-ink">
                Das Büro für Immobilien Bewertung &amp; Vermittlung bietet Ihnen das
                Rundum-Sorglos-Paket.
              </span>{" "}
              Wir übernehmen für Sie die gesamte Kommunikation mit den Kaufinteressenten und
              präsentieren Ihnen am Ende unserer geordneten und jahrelang eingespielten Abläufe
              den richtigen Käufer.
            </p>
          </div>

          {/* Die Philosophie ist der Satz, an dem der Abschnitt hängt — er
              bekommt deshalb eine eigene Fläche statt einer Zeile im Fließtext. */}
          <blockquote className="mt-6 max-w-xl rounded-[16px] border-l-2 border-accent bg-accent-tint py-5 pl-6 pr-5">
            <p className="text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-accent-deep">
              Unsere Philosophie
            </p>
            <p className="pretty mt-2.5 font-display text-[1.0625rem] font-semibold leading-relaxed text-ink">
              „Wir möchten nicht nur Ihr Haus oder Ihre Wohnung verkaufen. Wichtig ist uns, Ihre
              langfristige und nachhaltige Empfehlung&rdquo;.
            </p>
          </blockquote>

          <div className="pretty mt-6 max-w-xl space-y-4 text-[0.9375rem] leading-relaxed text-text-muted">
            <p>
              Natürlich können Sie sich ebenfalls auf unsere Zuverlässigkeit und schnelle
              Reaktionszeiten verlassen. Wir gehen jeden Auftrag mit Engagement an, dabei spielt
              es keine Rolle, wie hoch der Preis Ihrer Immobilie ist.
            </p>
            <p>
              Bei uns stehen Sie im Mittelpunkt, eine enge Zusammenarbeit ist dafür
              Voraussetzung. Zudem legen wir Wert auf Transparenz und Integrität in allem, was wir
              anfangen. Ehrliche und verlässliche Beratung und Unterstützung während des gesamten
              Kauf- oder Verkaufsprozesses sind selbstverständlich.
            </p>
            <p>
              In den nachfolgenden Regionen sind wir tätig und freuen uns darauf, Ihnen mit
              unserem Service vor Ort zur Seite zu stehen:{" "}
              <span className="font-semibold text-ink">{regions.join(", ")}</span>.
            </p>
          </div>

          <Button href="/ueber-mich" variant="secondary" withArrow className="mt-7">
            Mehr über uns
          </Button>
        </Reveal>

        {/* Der Text ist lang, die Karte kurz: am großen Bildschirm läuft sie
            mit, statt nach dem ersten Absatz aus dem Blick zu geraten. */}
        {property && (
          <Reveal delay={120} className="lg:sticky lg:top-28">
            <ExpertProperty property={toCardData(property)} />
          </Reveal>
        )}
      </Container>
    </section>
  );
}

type FeaturedProperty = NonNullable<Awaited<ReturnType<typeof getFeaturedActiveProperty>>>;

/**
 * Die Bildpfade werden hier serverseitig aufgelöst, weil die Diashow im
 * Browser läuft und dort nicht ins Dateisystem sehen kann.
 */
function toCardData(property: FeaturedProperty): ExpertPropertyData {
  return {
    slug: property.slug,
    title: property.title,
    city: property.city,
    statusLabel: property.statusLabel,
    priceLabel: property.priceLabel,
    facts: propertyFacts(property),
    images: resolveImages(property.images),
  };
}
