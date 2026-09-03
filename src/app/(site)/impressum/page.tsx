import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { pageSeo } from "@/lib/seo";
import { site } from "@/data/site";

export const metadata: Metadata = pageSeo({
  title: "Impressum",
  description: "Impressum von Abelen Immobilien gemäß § 5 TMG.",
  path: "/impressum",
});

export default function ImpressumPage() {
  return (
    <>
      <PageHero eyebrow="Rechtliches" title="Impressum" />
      <section className="py-16 lg:py-24">
        <Container className="max-w-2xl space-y-10 text-sm leading-relaxed text-text-muted">
          <div>
            <h2 className="font-display text-lg font-semibold text-ink">Angaben gemäß § 5 TMG</h2>
            <p className="mt-3">
              {site.legalName}
              <br />
              {site.owner}
              <br />
              [Straße und Hausnummer einfügen]
              <br />
              [Postleitzahl und Ort einfügen]
            </p>
          </div>

          <div>
            <h2 className="font-display text-lg font-semibold text-ink">Kontakt</h2>
            <p className="mt-3">
              Telefon: {site.phone}
              <br />
              E-Mail: {site.email}
            </p>
          </div>

          <div>
            <h2 className="font-display text-lg font-semibold text-ink">
              Berufsbezeichnung und berufsrechtliche Regelungen
            </h2>
            <p className="mt-3">
              Berufsbezeichnung: Immobilienmaklerin
              <br />
              Zuständige Erlaubnisbehörde: [zuständige Behörde gemäß § 34c GewO einfügen]
              <br />
              Es gelten die gesetzlichen Regelungen der Gewerbeordnung (§ 34c GewO), einsehbar unter{" "}
              <a href="https://www.gesetze-im-internet.de/gewo/" className="link-underline">
                gesetze-im-internet.de
              </a>
              .
            </p>
          </div>

          <div>
            <h2 className="font-display text-lg font-semibold text-ink">Umsatzsteuer-ID</h2>
            <p className="mt-3">[Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG einfügen, sofern vorhanden]</p>
          </div>

          <div>
            <h2 className="font-display text-lg font-semibold text-ink">
              Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV
            </h2>
            <p className="mt-3">
              {site.owner}
              <br />
              [Anschrift wie oben]
            </p>
          </div>

          <div>
            <h2 className="font-display text-lg font-semibold text-ink">EU-Streitschlichtung</h2>
            <p className="mt-3">
              Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{" "}
              <a
                href="https://ec.europa.eu/consumers/odr/"
                className="link-underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                ec.europa.eu/consumers/odr
              </a>
              . Wir sind nicht verpflichtet und nicht bereit, an einem Streitbeilegungsverfahren vor
              einer Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </div>

          <p className="rounded-md border border-border bg-surface-soft p-4 text-xs text-text-muted">
            Hinweis: Die in eckigen Klammern gekennzeichneten Angaben müssen vor Veröffentlichung der
            Website mit den vollständigen, rechtsverbindlichen Daten ergänzt werden.
          </p>
        </Container>
      </section>
    </>
  );
}
