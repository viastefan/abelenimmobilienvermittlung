import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { ConsentSettingsLink } from "@/components/consent/ConsentSettingsLink";
import { pageSeo } from "@/lib/seo";
import { site } from "@/data/site";

export const metadata: Metadata = pageSeo({
  title: "Datenschutzerklärung",
  description:
    "Wie wir mit Ihren Daten umgehen: verantwortliche Stelle, Ihre Rechte, Server-Protokolle, Einwilligung und Kontaktformular.",
  path: "/datenschutz",
});

/**
 * Datenschutzerklärung.
 *
 * Aufbau, Rechtsbelehrungen und verantwortliche Stelle stammen aus dem
 * bisherigen Auftritt. Die Abschnitte über eingesetzte Werkzeuge sind
 * dagegen neu geschrieben — die alte Fassung nannte Cookiebot, YouTube und
 * Google Maps, die es hier nicht gibt. Eine Datenschutzerklärung, die
 * Dienste aufzählt, die gar nicht laufen, ist schlechter als keine.
 */
export default function DatenschutzPage() {
  return (
    <>
      <PageHero
        title="Datenschutzerklärung"
        breadcrumbs={[{ label: "Startseite", href: "/" }, { label: "Datenschutz" }]}
      />
      <section className="py-14 lg:py-20">
        <Container className="max-w-2xl space-y-12 text-[0.9375rem] leading-relaxed text-text-muted">
          <div className="space-y-6">
            <h2 className="font-display text-xl font-bold text-ink">
              1. Allgemeine Hinweise und Pflichtinformationen
            </h2>

            <div>
              <h3 className="font-display text-base font-bold text-ink">Datenschutz</h3>
              <p className="mt-3">
                Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst.
                Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der
                gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung. Wenn Sie
                diese Webseite benutzen, werden verschiedene personenbezogene Daten erhoben.
                Personenbezogene Daten sind Daten, mit denen Sie persönlich identifiziert werden
                können. Die vorliegende Datenschutzerklärung erläutert, welche Daten wir erheben und
                wofür wir sie nutzen.
              </p>
            </div>

            <div>
              <h3 className="font-display text-base font-bold text-ink">
                Hinweis zur verantwortlichen Stelle
              </h3>
              <p className="mt-3">
                {site.owner}
                <br />
                {site.address.street}
                <br />
                {site.address.postalCode} {site.address.locality}
                <br />
                E-Mail:{" "}
                <a href={`mailto:${site.email}`} className="link-underline">
                  {site.email}
                </a>
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="font-display text-xl font-bold text-ink">2. Ihre Rechte</h2>

            <div>
              <h3 className="font-display text-base font-bold text-ink">
                Widerruf Ihrer Einwilligung zur Datenverarbeitung
              </h3>
              <p className="mt-3">
                Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen Einwilligung
                möglich. Sie können eine bereits erteilte Einwilligung jederzeit widerrufen. Dazu
                reicht eine formlose Mitteilung per E-Mail an uns. Die Rechtmäßigkeit der bis zum
                Widerruf erfolgten Datenverarbeitung bleibt vom Widerruf unberührt.
              </p>
            </div>

            <div>
              <h3 className="font-display text-base font-bold text-ink">
                Beschwerderecht bei der zuständigen Aufsichtsbehörde
              </h3>
              <p className="mt-3">
                Im Falle datenschutzrechtlicher Verstöße steht Ihnen als Betroffenen ein
                Beschwerderecht bei der zuständigen Aufsichtsbehörde zu. Zuständige Aufsichtsbehörde
                in datenschutzrechtlichen Fragen ist der Landesdatenschutzbeauftragte des
                Bundeslandes, in dem unser Unternehmen seinen Sitz hat. Eine Liste der
                Datenschutzbeauftragten sowie deren Kontaktdaten können Sie unter diesem Link
                einsehen:{" "}
                <a
                  href="https://www.ldi.nrw.de/"
                  className="link-underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ldi.nrw.de
                </a>
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="font-display text-xl font-bold text-ink">
              3. Datenerfassung auf unserer Webseite
            </h2>

            <div>
              <h3 className="font-display text-base font-bold text-ink">Server-Log-Dateien</h3>
              <p className="mt-3">
                Der Provider der Seiten erhebt und speichert automatisch Informationen in so
                genannten Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies
                sind: Browsertyp und Browserversion, verwendetes Betriebssystem, Referrer URL,
                Hostname des zugreifenden Rechners, Uhrzeit der Serveranfrage und IP-Adresse. Eine
                Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen. Die
                Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO.
              </p>
              <p className="mt-3">
                Diese Webseite wird bei der Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723,
                USA, betrieben. Mit Vercel besteht ein Vertrag über die Auftragsverarbeitung. Die
                Serverfunktionen laufen im Rechenzentrum Frankfurt am Main (Region „fra1“); die
                statischen Dateien liefert das weltweite Netz von Vercel vom jeweils nächsten
                Standort aus.
              </p>
            </div>

            <div>
              <h3 className="font-display text-base font-bold text-ink">
                Cookies und Ihre Einwilligung
              </h3>
              <p className="mt-3">
                Diese Webseite setzt <strong className="font-semibold text-ink">keine Cookies</strong>{" "}
                zu Werbe- oder Analysezwecken. Ihre Entscheidung aus dem Einwilligungsdialog wird
                ausschließlich lokal in Ihrem Browser gespeichert (im sogenannten Local Storage) und
                zu keinem Zeitpunkt an uns oder an Dritte übertragen. Löschen Sie die Daten Ihres
                Browsers, ist auch Ihre Entscheidung gelöscht und wir fragen erneut.
              </p>
              <p className="mt-3">
                Statistik und externe Inhalte laden wir ausschließlich nach Ihrer ausdrücklichen
                Einwilligung (Art. 6 Abs. 1 lit. a DSGVO). Sie können Ihre Auswahl jederzeit ändern:{" "}
                <ConsentSettingsLink className="link-underline" />.
              </p>
            </div>

            <div>
              <h3 className="font-display text-base font-bold text-ink">Kontaktformular</h3>
              <p className="mt-3">
                Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus
                dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks
                Bearbeitung der Anfrage bei uns gespeichert. Die Verarbeitung der in das
                Kontaktformular eingegebenen Daten erfolgt somit ausschließlich auf Grundlage Ihrer
                Einwilligung (Art. 6 Abs. 1 lit. a DSGVO).
              </p>
              <p className="mt-3">
                Die Anfragen werden bei der Supabase Inc. in einem Rechenzentrum in Frankfurt am
                Main gespeichert; der Versand der Benachrichtigung erfolgt über die Resend, Inc. Mit
                beiden Anbietern bestehen Verträge über die Auftragsverarbeitung. Wir bewahren Ihre
                Anfrage auf, bis sie abschließend bearbeitet ist und keine gesetzlichen
                Aufbewahrungspflichten entgegenstehen; danach löschen wir sie. Sie können die
                Löschung jederzeit formlos per E-Mail verlangen.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="font-display text-xl font-bold text-ink">
              4. Schriften, Bilder und externe Dienste
            </h2>

            <div>
              <h3 className="font-display text-base font-bold text-ink">Schriftarten</h3>
              <p className="mt-3">
                Diese Webseite nutzt zur einheitlichen Darstellung von Schriftarten die Schrift
                Manrope. Sie ist lokal installiert und wird von unserem eigenen Server ausgeliefert.
                Es erfolgt keine Verbindung zu Servern von Google.
              </p>
            </div>

            <div>
              <h3 className="font-display text-base font-bold text-ink">Bilder</h3>
              <p className="mt-3">
                Ein Teil der Objektfotos liegt noch in der Mediathek des bisherigen Auftritts bei
                Wix.com. Diese Bilder werden von unserem eigenen Server abgerufen und an Sie
                ausgeliefert — Ihr Browser baut dabei keine Verbindung zu Wix.com auf, Ihre
                IP-Adresse wird dorthin nicht übermittelt.
              </p>
            </div>

            <div>
              <h3 className="font-display text-base font-bold text-ink">
                Karten, Videos und soziale Netzwerke
              </h3>
              <p className="mt-3">
                Diese Webseite bindet weder Google Maps noch YouTube noch Schaltflächen sozialer
                Netzwerke ein. Die Verweise auf unsere Profile in den sozialen Netzwerken sind
                gewöhnliche Links: Eine Verbindung entsteht erst, wenn Sie einen davon anklicken.
              </p>
            </div>

            <div>
              <h3 className="font-display text-base font-bold text-ink">Reichweitenmessung</h3>
              <p className="mt-3">
                Zurzeit ist keine Reichweitenmessung im Einsatz. Sollte sich das ändern, wird sie
                erst nach Ihrer Einwilligung geladen und an dieser Stelle beschrieben.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="font-display text-xl font-bold text-ink">
              5. Hinweis zur Nutzung von Siegeln und Icons
            </h2>
            <p>
              Auf dieser Website verwenden wir das ImmoScout24 Bronze Makler-Icon. Dieses Siegel
              zeigt unsere vertrauensvolle Partnerschaft mit ImmoScout24, dem führenden
              Immobilienportal in Deutschland. Es kennzeichnet uns als professionellen und
              verlässlichen Immobilienvermittler. Daneben führen wir das Siegel „Geprüfte Kompetenz
              in der Immobilienbewertung“ der Sprengnetter-Akademie.
            </p>
            <p>
              Die übrigen Symbole auf dieser Webseite stammen aus der Sammlung Lucide und werden
              gemäß deren ISC-Lizenz verwendet. Beide Siegel und alle Symbole werden von unserem
              eigenen Server ausgeliefert.
            </p>
          </div>

          <div className="rounded-[24px] bg-surface-warm p-6 text-[0.875rem]">
            <p>
              Fragen zum Umgang mit Ihren Daten beantworten wir gern —{" "}
              <a href={`mailto:${site.email}`} className="link-underline">
                {site.email}
              </a>{" "}
              oder über das{" "}
              <Link href="/kontakt" className="link-underline">
                Kontaktformular
              </Link>
              .
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
