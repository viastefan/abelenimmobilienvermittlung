import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { pageSeo } from "@/lib/seo";
import { site } from "@/data/site";

export const metadata: Metadata = pageSeo({
  title: "Allgemeine Geschäftsbedingungen",
  description: "Allgemeine Geschäftsbedingungen von Abelen Immobilien.",
  path: "/agb",
});

export default function AgbPage() {
  return (
    <>
      <PageHero eyebrow="Rechtliches" title="Allgemeine Geschäftsbedingungen" />
      <section className="py-16 lg:py-24">
        <Container className="max-w-2xl space-y-10 text-sm leading-relaxed text-text-muted">
          <div>
            <h2 className="font-display text-lg font-semibold text-ink">1. Geltungsbereich</h2>
            <p className="mt-3">
              Diese Allgemeinen Geschäftsbedingungen gelten für alle Maklerleistungen, die {site.owner}
              {" "}
              im Rahmen von {site.legalName} erbringt, insbesondere die Vermittlung und den Nachweis
              von Gelegenheiten zum Abschluss von Kauf-, Miet- und Pachtverträgen über Immobilien.
            </p>
          </div>

          <div>
            <h2 className="font-display text-lg font-semibold text-ink">2. Zustandekommen des Maklervertrags</h2>
            <p className="mt-3">
              Ein Maklervertrag kommt durch ausdrückliche oder stillschweigende Vereinbarung
              zustande, insbesondere durch die Inanspruchnahme von Nachweis- oder
              Vermittlungsleistungen in Kenntnis der Provisionspflicht.
            </p>
          </div>

          <div>
            <h2 className="font-display text-lg font-semibold text-ink">3. Maklerprovision</h2>
            <p className="mt-3">
              Die Höhe der Maklerprovision sowie die Verteilung zwischen Käufer- und Verkäuferseite
              richten sich nach den gesetzlichen Vorgaben, insbesondere §§ 656a ff. BGB zum
              Bestellerprinzip bei Vermittlung von Wohnimmobilien, und werden im Einzelfall vor
              Beauftragung in Textform vereinbart. [Konkrete Provisionshöhe je nach Objektart
              einfügen bzw. individuell vereinbaren.]
            </p>
          </div>

          <div>
            <h2 className="font-display text-lg font-semibold text-ink">4. Pflichten des Auftraggebers</h2>
            <p className="mt-3">
              Der Auftraggeber verpflichtet sich, alle ihm bekannten und für die Vermittlung oder den
              Nachweis relevanten Informationen wahrheitsgemäß und vollständig mitzuteilen.
            </p>
          </div>

          <div>
            <h2 className="font-display text-lg font-semibold text-ink">5. Haftung</h2>
            <p className="mt-3">
              Angaben zu Objekten beruhen auf den Informationen der Eigentümer bzw. Anbieter. Eine
              Haftung für die Richtigkeit und Vollständigkeit dieser Angaben wird, soweit gesetzlich
              zulässig, ausgeschlossen. Für Vorsatz und grobe Fahrlässigkeit sowie bei Verletzung
              wesentlicher Vertragspflichten bleibt die Haftung unberührt.
            </p>
          </div>

          <div>
            <h2 className="font-display text-lg font-semibold text-ink">6. Schlussbestimmungen</h2>
            <p className="mt-3">
              Es gilt das Recht der Bundesrepublik Deutschland. Sollte eine Bestimmung dieser AGB
              unwirksam sein, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt.
            </p>
          </div>

          <p className="rounded-md border border-border bg-surface-soft p-4 text-xs text-text-muted">
            Hinweis: Diese AGB ersetzen keine individuelle Rechtsberatung. Bitte lassen Sie die
            Provisionsregelung und die weiteren Klauseln vor Veröffentlichung rechtlich prüfen und
            ergänzen Sie die konkrete Provisionshöhe.
          </p>
        </Container>
      </section>
    </>
  );
}
