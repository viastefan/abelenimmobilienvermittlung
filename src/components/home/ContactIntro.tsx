import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { regions, site } from "@/data/site";

/** Text wörtlich von der Startseite des bisherigen Auftritts übernommen. */
export function ContactIntro() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <Container>
        <Reveal className="overflow-hidden rounded-[28px] bg-surface-warm p-6 sm:p-10 lg:p-14">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16">
            <div>
              <h2 className="balance font-display text-display-lg font-bold text-ink">
                Der Erste Schritt zur Kontaktaufnahme
              </h2>

              <div className="pretty mt-5 max-w-xl space-y-4 text-[0.9375rem] leading-relaxed text-text-muted">
                <p>
                  Starten Sie jetzt! Ein Anruf oder eine E-Mail genügt, um Ihre Immobilie
                  vorzustellen oder Ihre Immobilienwünsche im Detail persönlich mit uns zu
                  besprechen.
                </p>
                <p>
                  <span className="font-semibold text-ink">Für Immobilienverkäufer bedeutet das:</span>{" "}
                  Nach Ihrer kurzen Vorstellung des Objekts und der Adressangabe erfolgt die
                  Erstbesichtigung. Vor Ort gehen wir gemeinsam durch die Immobilie und klären
                  wichtige Details wie Wohnfläche, Baujahr, vorhandene Baugenehmigungen,
                  Eigentumsrechte oder letzte Renovierungen. Diese Informationen bilden die
                  Grundlage für eine erste Preisermittlung. Innerhalb von etwa einer Woche
                  erhalten Sie den ermittelten Marktpreis – entweder in einem persönlichen
                  Gespräch oder in Form einer übersichtlichen Präsentation per E-Mail.
                </p>
                <p>
                  <span className="font-semibold text-ink">Für Immobilienkäufer wiederum gilt:</span>{" "}
                  Sie sind auf der Suche nach einer Immobilie, die genau zu Ihnen passt? In
                  persönlichen Gesprächen finden wir heraus, welche Wünsche und Anforderungen Sie
                  haben. So stellen wir sicher, dass wir gemeinsam das passende Objekt für Sie
                  finden.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <div className="rounded-[18px] bg-white p-6 shadow-soft sm:p-7">
                <ul className="space-y-5">
                  <li>
                    <a
                      href={site.landlineHref}
                      className="group flex items-start gap-4 transition-colors hover:text-accent-deep"
                    >
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[12px] bg-accent-soft text-accent-deep">
                        <Phone className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
                      </span>
                      <span>
                        <span className="block text-[0.8125rem] font-medium text-text-subtle">Tel.</span>
                        <span className="mt-0.5 block font-display text-[1.0625rem] font-bold text-ink group-hover:text-accent-deep">
                          {site.landline}
                        </span>
                      </span>
                    </a>
                  </li>
                  <li>
                    <a
                      href={`mailto:${site.email}`}
                      className="group flex items-start gap-4 transition-colors hover:text-accent-deep"
                    >
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[12px] bg-accent-soft text-accent-deep">
                        <Mail className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
                      </span>
                      <span>
                        <span className="block text-[0.8125rem] font-medium text-text-subtle">E-Mail</span>
                        <span className="mt-0.5 block font-display text-[1.0625rem] font-bold text-ink group-hover:text-accent-deep">
                          {site.email}
                        </span>
                      </span>
                    </a>
                  </li>
                </ul>

                <p className="mt-6 flex items-start gap-3 rounded-[12px] border border-border bg-surface-warm p-4 text-[0.8125rem] leading-relaxed text-text-muted">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-accent-mid" strokeWidth={1.6} aria-hidden="true" />
                  Wir melden uns in der Regel innerhalb eines Werktages persönlich bei Ihnen zurück.
                </p>

                <Button href="/kontakt" variant="primary" withArrow className="mt-6 w-full sm:w-auto">
                  Kontaktformular
                </Button>
              </div>

              <div className="rounded-[18px] bg-white p-6 shadow-soft sm:p-7">
                <span className="inline-flex items-center gap-2 text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-accent-deep">
                  <MapPin className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
                  Tätigkeitsgebiet
                </span>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {regions.map((region) => (
                    <li
                      key={region}
                      className={`rounded-full border px-3.5 py-1.5 text-[0.8125rem] ${
                        region === site.serviceArea
                          ? "border-accent bg-accent-soft font-bold text-ink"
                          : "border-border bg-white text-text-muted"
                      }`}
                    >
                      {region}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
