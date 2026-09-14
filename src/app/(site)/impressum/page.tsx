import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { pageSeo } from "@/lib/seo";
import { site } from "@/data/site";

export const metadata: Metadata = pageSeo({
  title: "Impressum",
  description: "Impressum von Silke Abelen, Büro für Immobilien Bewertung & Vermittlung, gemäß § 5 DDG.",
  path: "/impressum",
});

/**
 * Impressum.
 *
 * Inhaltlich der bisherige Auftritt, Angabe für Angabe. Was dort steht, ist
 * rechtsverbindlich erklärt worden — hier wird nichts ergänzt und nichts
 * weggelassen.
 */
export default function ImpressumPage() {
  return (
    <>
      <PageHero
        title="Impressum"
        breadcrumbs={[{ label: "Startseite", href: "/" }, { label: "Impressum" }]}
      />
      <section className="py-14 lg:py-20">
        <Container className="max-w-2xl space-y-10 text-[0.9375rem] leading-relaxed text-text-muted">
          <div>
            <h2 className="font-display text-lg font-bold text-ink">
              Verantwortlich im Sinne des § 5 DDG
            </h2>
            <p className="mt-3">
              {site.owner}
              <br />
              {site.legal.profession}
            </p>
          </div>

          <div>
            <h2 className="font-display text-lg font-bold text-ink">Kontakt</h2>
            <p className="mt-3">
              {site.address.street}
              <br />
              {site.address.postalCode} {site.address.locality}
              <br />
              <br />
              Telefon: <a href={site.landlineHref} className="link-underline">{site.landline}</a>
              <br />
              Telefax: {site.fax}
              <br />
              E-Mail:{" "}
              <a href={`mailto:${site.email}`} className="link-underline">
                {site.email}
              </a>
            </p>
          </div>

          <div>
            <h2 className="font-display text-lg font-bold text-ink">Steuer-Nr.</h2>
            <p className="mt-3">{site.legal.taxNumber}</p>
          </div>

          <div>
            <h2 className="font-display text-lg font-bold text-ink">Berufsaufsichtsbehörde</h2>
            <p className="mt-3">
              Nach § 34c Gewerbeordnung (GewO)
              <br />
              {site.legal.supervisoryAuthority}
              <br />
              {site.legal.supervisoryAuthorityAddress}
            </p>
          </div>

          <div>
            <h2 className="font-display text-lg font-bold text-ink">Berufsrechtliche Regelungen</h2>
            <p className="mt-3">
              Die berufsrechtlichen Regelungen, insbesondere § 34c Gewerbeordnung (GewO), sind über
              die Internetseite des Bundesamtes für Justiz einsehbar unter{" "}
              <a
                href="https://www.gesetze-im-internet.de/gewo/__34c.html"
                className="link-underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                gesetze-im-internet.de
              </a>
              .
            </p>
          </div>

          <div>
            <h2 className="font-display text-lg font-bold text-ink">Bildnachweise</h2>
            <p className="mt-3">
              Alle auf dieser Webseite verwendeten Bilder sind urheberrechtlich geschützt. Die
              Bildrechte liegen bei der Inhaberin {site.owner} der Webseite, soweit die Bilder privat
              aufgenommen wurden. Alle anderen Bilder stammen von der Bilddatenbank Wix.com oder von
              Freepik. Sie werden hier unter der jeweiligen Lizenz der Anbieter genutzt.
            </p>
          </div>

          <div>
            <h2 className="font-display text-lg font-bold text-ink">Berufshaftpflichtversicherung</h2>
            <p className="mt-3">
              Berufshaftpflichtversicherung: {site.legal.liabilityInsurer}
              <br />
              Räumlicher Geltungsbereich: {site.legal.liabilityScope}
            </p>
          </div>

          <div>
            <h2 className="font-display text-lg font-bold text-ink">
              Verbraucherstreitbeilegung (Online-Streitbeilegung &amp; VSBG)
            </h2>
            <p className="mt-3">
              Verbraucherstreitbeilegung / Universalschlichtungsstelle: Die Europäische Kommission
              stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{" "}
              <a
                href="https://ec.europa.eu/consumers/odr"
                className="link-underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                ec.europa.eu/consumers/odr
              </a>
              . Unsere E-Mail-Adresse finden Sie oben im Impressum. Wir sind nicht bereit oder
              verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
              teilzunehmen.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
