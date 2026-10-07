import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { resolveImages } from "@/lib/imagery";
import { getFeaturedActiveProperty } from "@/data/properties";
import { regions } from "@/data/site";
import { ServiceAreaMap } from "@/components/map/ServiceAreaMap";
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
 *
 * Der Abschnitt steht auf `isolate`: die mitlaufende Karte ist ein
 * positioniertes Element und würde sonst über den Grund des nächsten
 * Abschnitts malen.
 */
export async function ExpertIntro() {
  const property = await getFeaturedActiveProperty();

  return (
    <section className="isolate bg-white py-14 lg:py-20">
      <Container className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:gap-16">
        <Reveal>
          <h2 className="balance font-display text-display-lg font-bold text-ink">
            Ihr Experte für Immobilien
          </h2>

          <p className="pretty mt-5 max-w-xl text-[1.0625rem] leading-relaxed text-text-muted">
            Das Büro für Immobilien Bewertung &amp; Vermittlung bietet Ihnen das{" "}
            <span className="font-semibold text-ink">Rundum-Sorglos-Paket</span>.
          </p>

          <div className="pretty mt-5 max-w-xl space-y-4 text-[0.9375rem] leading-relaxed text-text-muted">
            <p>
              Ziel ist es, jedem Kunden den bestmöglichen Service zu bieten und dabei gemeinsam
              ein optimales Ergebnis zu erzielen. Zum erfolgreichen Verkauf gehören
              nicht nur professionelles Marketing, das Erstellen von Exposés und das Durchführen
              von Besichtigungsterminen.{" "}
              <span className="font-semibold text-ink">
                Das Büro für Immobilien Bewertung &amp; Vermittlung bietet Ihnen das
                Rundum-Sorglos-Paket.
              </span>{" "}
              Die gesamte Kommunikation mit den Kaufinteressenten liegt in einer Hand, und am
              Ende geordneter, über Jahre eingespielter Abläufe steht der richtige Käufer.
            </p>
          </div>

          {/* Die Philosophie ist der Satz, an dem der Abschnitt hängt — er
              bekommt deshalb eine eigene Fläche statt einer Zeile im Fließtext. */}
          <blockquote className="mt-6 max-w-xl rounded-[24px] border-l-2 border-accent bg-accent-tint py-5 pl-6 pr-5">
            <p className="text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-accent-deep">
              Die Philosophie
            </p>
            <p className="pretty mt-2.5 font-display text-[1.0625rem] font-semibold leading-relaxed text-ink">
              „Nicht nur Ihr Haus oder Ihre Wohnung verkaufen — sondern Ihre langfristige und
              nachhaltige Empfehlung gewinnen.&ldquo;
            </p>
          </blockquote>

          <div className="pretty mt-6 max-w-xl space-y-4 text-[0.9375rem] leading-relaxed text-text-muted">
            <p>
              Natürlich können Sie sich auch auf Zuverlässigkeit und schnelle Reaktionszeiten
              verlassen. Jeder Auftrag bekommt dasselbe Engagement — ganz gleich, wie hoch der
              Preis Ihrer Immobilie ist.
            </p>
            <p>
              Sie stehen im Mittelpunkt, eine enge Zusammenarbeit ist dafür Voraussetzung.
              Transparenz und Integrität gelten bei jedem Schritt. Ehrliche und verlässliche Beratung und Unterstützung während des gesamten
              Kauf- oder Verkaufsprozesses sind selbstverständlich.
            </p>
            <p>
              Tätig in den folgenden Regionen — mit persönlichem Service direkt vor Ort:{" "}
              <span className="font-semibold text-ink">{regions.join(", ")}</span>.
            </p>
          </div>

          {/* Die Karte steht hier, weil der Satz darüber neun Orte aufzählt:
              als Aufzählung muss man sie kennen, um sie einordnen zu können,
              als Fläche sieht man auf einen Blick, wie weit das Gebiet
              reicht. Sie wiederholt den Text nicht, sie zeigt ihn. */}
          <ServiceAreaMap className="mt-8 max-w-xl" />

          <Button href="/ueber-mich" variant="secondary" withArrow className="mt-7">
            Mehr über Silke Abelen
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
  // Drei Angaben stehen offen, alles Weitere liegt hinter dem Aufklapper.
  const facts = propertyFacts(property, 3);
  const schonSichtbar = new Set(facts.map((fact) => fact.label.toLowerCase()));

  return {
    slug: property.slug,
    title: property.title,
    city: property.city,
    statusLabel: property.statusLabel,
    priceLabel: property.priceLabel,
    facts,
    // Was oben schon steht, wird unten nicht wiederholt.
    details: [...property.features, ...property.energy]
      .filter((entry) => !schonSichtbar.has(entry.label.toLowerCase()))
      .map((entry) => ({ label: entry.label, value: entry.value })),
    equipment: property.equipment,
    images: resolveImages(property.images),
  };
}
