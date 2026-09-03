import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { pageSeo } from "@/lib/seo";
import { site } from "@/data/site";

export const metadata: Metadata = pageSeo({
  title: "Datenschutzerklärung",
  description: "Datenschutzerklärung von Abelen Immobilien gemäß Art. 13 DSGVO.",
  path: "/datenschutz",
});

export default function DatenschutzPage() {
  return (
    <>
      <PageHero eyebrow="Rechtliches" title="Datenschutzerklärung" />
      <section className="py-16 lg:py-24">
        <Container className="max-w-2xl space-y-10 text-sm leading-relaxed text-text-muted">
          <div>
            <h2 className="font-display text-lg font-semibold text-ink">1. Verantwortlicher</h2>
            <p className="mt-3">
              Verantwortlich für die Datenverarbeitung auf dieser Website ist:
              <br />
              {site.legalName}, {site.owner}
              <br />
              [Anschrift einfügen]
              <br />
              Telefon: {site.phone} · E-Mail: {site.email}
            </p>
          </div>

          <div>
            <h2 className="font-display text-lg font-semibold text-ink">2. Hosting</h2>
            <p className="mt-3">
              Diese Website wird bei Vercel Inc. gehostet. Beim Aufruf der Website werden durch den
              Hosting-Anbieter automatisch technische Verbindungsdaten (Server-Logfiles) verarbeitet,
              die zur technischen Bereitstellung der Website erforderlich sind, z. B. IP-Adresse,
              Datum und Uhrzeit des Zugriffs sowie aufgerufene Seite. Rechtsgrundlage ist Art. 6
              Abs. 1 lit. f DSGVO (berechtigtes Interesse an einer sicheren und funktionsfähigen
              Website).
            </p>
          </div>

          <div>
            <h2 className="font-display text-lg font-semibold text-ink">3. Kontaktformular</h2>
            <p className="mt-3">
              Wenn Sie uns über das Kontaktformular eine Anfrage zukommen lassen, werden Ihre Angaben
              aus dem Formular inklusive der von Ihnen dort angegebenen Kontaktdaten zum Zwecke der
              Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese
              Daten geben wir nicht ohne Ihre Einwilligung weiter, mit Ausnahme unseres
              E-Mail-Zustelldienstleisters, der die Nachricht in unserem Auftrag versendet.
              Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, da die Verarbeitung zur Bearbeitung
              Ihrer Anfrage erforderlich ist.
            </p>
          </div>

          <div>
            <h2 className="font-display text-lg font-semibold text-ink">4. Cookies und Analyse-Tools</h2>
            <p className="mt-3">
              Diese Website setzt aktuell keine Analyse- oder Tracking-Cookies ein. Sollte sich dies
              künftig ändern, wird diese Datenschutzerklärung entsprechend aktualisiert.
            </p>
          </div>

          <div>
            <h2 className="font-display text-lg font-semibold text-ink">5. Ihre Rechte</h2>
            <p className="mt-3">
              Sie haben jederzeit das Recht auf Auskunft, Berichtigung, Löschung oder Einschränkung
              der Verarbeitung Ihrer gespeicherten personenbezogenen Daten sowie ein Recht auf
              Datenübertragbarkeit und Widerspruch gegen die Verarbeitung. Wenden Sie sich hierzu
              gerne an die oben genannte Kontaktadresse. Ihnen steht zudem ein Beschwerderecht bei
              der zuständigen Datenschutzaufsichtsbehörde zu.
            </p>
          </div>

          <p className="rounded-md border border-border bg-surface-soft p-4 text-xs text-text-muted">
            Hinweis: Bitte ergänzen Sie die vollständige Anschrift sowie – sofern künftig eingesetzt
            – Angaben zu Analyse-Tools, Cookies oder weiteren Drittanbietern.
          </p>
        </Container>
      </section>
    </>
  );
}
