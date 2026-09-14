import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { pageSeo } from "@/lib/seo";
import { site } from "@/data/site";

export const metadata: Metadata = pageSeo({
  title: "Allgemeine Geschäftsbedingungen",
  description:
    "Allgemeine Geschäftsbedingungen des Büros für Immobilienvermittlung Silke Abelen — Vertraulichkeit, Haftung, Provision, Laufzeit.",
  path: "/agb",
});

/**
 * Allgemeine Geschäftsbedingungen — wörtlich der bisherige Auftritt.
 *
 * Nur die Trennstriche aus dem alten Satz sind entfernt („Objekt- nachweise“
 * → „Objektnachweise“); am Wortlaut ändert das nichts.
 */
const sections = [
  {
    title: "Vertraulichkeit",
    body: [
      "Alle durch uns erteilten Informationen und Unterlagen inkl. unserer Objektnachweise sind ausschließlich für unseren Kunden bestimmt und dürfen nur mit schriftlicher Einwilligung des Büros für Immobilienvermittlung Silke Abelen an Dritte weitergegeben werden. Zuwiderhandlungen verpflichten ggf. den Weitergebenden im Falle des Zustandekommens eines Hauptvertrages (Miet-/Kaufvertrag) mit Dritten, zur Zahlung der Provision in der ursprünglich vereinbarten Höhe.",
    ],
  },
  {
    title: "Datenschutz",
    body: [
      "Der Auftraggeber erklärt sich ausdrücklich damit einverstanden, dass das Büro für Immobilienvermittlung Silke Abelen zur Erfüllung ihrer Pflichten befugt ist, die notwendigen personenbezogenen Daten des Auftraggebers nach Maßgabe der gesetzlichen Regelungen zu bearbeiten.",
    ],
  },
  {
    title: "Haftungsbeschränkung",
    body: [
      "Wir weisen darauf hin, dass die von uns weitergegebenen Objektinformationen, Unterlagen, Pläne, etc. vom Veräußerer bzw. Vermieter stammen. Eine Haftung für die Richtigkeit und Vollständigkeit der Angaben übernehmen wir daher nicht. Es obliegt daher auch unserem Kunden, die darin enthaltenen Objektinformationen und Angaben auf ihre Richtigkeit zu überprüfen. Im Übrigen haftet das Büro für Immobilienvermittlung Silke Abelen nur bei Vorsatz, grober Fahrlässigkeit, dem Fehlen garantierter Eigenschaften oder bei schuldhafter Verletzung einer Kardinalpflicht und nicht für leichte Fahrlässigkeit und Folgeschäden. Ansonsten nach den gesetzlichen Bestimmungen.",
    ],
  },
  {
    title: "Drittanbieter",
    body: [
      "Der Auftraggeber ist nicht berechtigt, während der Laufzeit des Hauptvertrages mit uns – andere Makler mit Nachweis- oder Vermittlungstätigkeit, betreffend das Vertragsobjekt, zu beauftragen. Bei schuldhaftem Verstoß gegen diese Regelung haftet der Kunde, gegenüber dem Büro für Immobilienvermittlung Silke Abelen, für die hierdurch entstehenden Schäden. Der Kunde ist verpflichtet, uns unverzüglich mitzuteilen, wenn und zu welchem Entgelt und mit welchen Beteiligten der Hauptvertrag geschlossen wurde. Die Auskunftsverpflichtung wird nicht dadurch berührt, dass der Hauptvertrag unter einer aufschiebenden Bedingung steht und diese noch nicht eingetreten ist.",
    ],
  },
  {
    title: "Vertragsabschluss",
    body: [
      "Der Provisionsanspruch des Maklers entsteht mit Abschluss des rechtswirksamen Hauptvertrages. Die Provision ist verdient und fällig, sobald der Hauptvertrag (Miet-/Kaufvertrag) zustande gekommen ist. Sie ist innerhalb von 10 Tagen nach Rechnungsstellung zahlbar. Sollte durch unsere Nachweis- oder Vermittlungstätigkeit der gewünschte Hauptvertrag zustande kommen, ist eine Provision vom Auftraggeber an das Büro für Immobilienvermittlung Silke Abelen zu zahlen. Sowohl die Höhe der Provision, als auch die jeweilige Zahlung des Auftraggebers richtet sich nach der im Auftrag ausdrücklich genannten Provision.",
    ],
  },
  {
    title: "Doppeltätigkeit",
    body: [
      "Das Büro für Immobilienvermittlung ist berechtigt, auch für beide Vertragspartner provisionspflichtig zu werden.",
    ],
  },
  {
    title: "Folgegeschäft",
    body: [
      "Ein Provisionsanspruch des Büros für Immobilienvermittlung Silke Abelen besteht auch bei Folgegeschäften, die innerhalb eines zeitlichen und wirtschaftlichen Zusammenhangs seit dem Ursprungsvertrag abgeschlossen werden. Ein Folgegeschäft liegt dabei vor, wenn eine Erweiterung oder Veränderung der abgeschlossenen Vertragsgelegenheit eintritt.",
    ],
  },
  {
    title: "Gerichtsstand",
    body: [
      `Der Gerichtsstand für alle Streitigkeiten ist ${site.legal.jurisdiction}, Deutschland. Es gilt deutsches Recht. Wir nehmen nicht an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teil.`,
    ],
  },
  {
    title: "Laufzeit",
    body: [
      "Der Maklervertrag zwischen dem Kunden und uns kommt entweder durch schriftliche Vereinbarung oder durch die Inanspruchnahme unserer Maklertätigkeit auf der Grundlage bzw. in Kenntnis der für die erfolgreiche Vermittlung-/Nachweistätigkeit anfallenden Provisionsforderung zustande. Ergibt sich nicht aus den Umständen oder abweichenden Vereinbarungen etwas anderes, hat der Vertrag eine Laufzeit von sechs Monaten und verlängert sich jeweils automatisch um einen weiteren Monat, wenn nicht eine Vertragspartei mit einer Frist von einem Monat vor Vertragsende gekündigt hat.",
    ],
  },
  {
    title: "Salvatorische Klausel",
    body: [
      "Sollten eine oder mehrere der vorstehenden Bestimmungen ungültig sein oder werden, so soll die Wirksamkeit der übrigen Bestimmungen hiervon nicht berührt werden. Die unwirksame Bestimmung soll zwischen den Parteien durch eine Regelung ersetzt werden, die den wirtschaftlichen Interessen der Vertragsparteien am nächsten kommt und im Übrigen den vertraglichen Vereinbarungen nicht zuwiderläuft.",
    ],
  },
] as const;

export default function AgbPage() {
  return (
    <>
      <PageHero
        title="Allgemeine Geschäftsbedingungen"
        description="Rechtliche Hinweise zur Zusammenarbeit mit dem Büro für Immobilienvermittlung Silke Abelen."
        breadcrumbs={[{ label: "Startseite", href: "/" }, { label: "AGB" }]}
      />
      <section className="py-14 lg:py-20">
        <Container className="max-w-2xl">
          <div className="space-y-10 text-[0.9375rem] leading-relaxed text-text-muted">
            {sections.map((section) => (
              <div key={section.title}>
                <h2 className="font-display text-lg font-bold text-ink">{section.title}</h2>
                {section.body.map((paragraph) => (
                  <p key={paragraph} className="pretty mt-3">
                    {paragraph}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
