import { Mail, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SiteImage } from "@/components/graphics/SiteImage";
import { resolveImage } from "@/lib/imagery";
import { images } from "@/data/imagery";
import { site } from "@/data/site";

/** Text wörtlich von der Startseite des bisherigen Auftritts übernommen. */
export function ContactIntro() {
  const image = resolveImage(images.contactIntro);

  return (
    <section className="bg-surface-warm py-16 lg:py-20">
      <Container className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
        <Reveal>
          <div className="relative aspect-[4/5] overflow-hidden rounded-[14px] bg-surface-mist">
            <SiteImage
              src={image}
              sizes="(min-width: 1024px) 34vw, 100vw"
              label="Kontakt"
              alt="Arbeitsplatz mit Laptop — der erste Schritt zur Kontaktaufnahme"
            />
          </div>
        </Reveal>

        <Reveal delay={120}>
          <h2 className="balance font-display text-display-lg font-bold text-ink">
            Der Erste Schritt zur Kontaktaufnahme
          </h2>

          <div className="pretty mt-5 max-w-xl space-y-4 text-[0.9375rem] leading-relaxed text-text-muted">
            <p>
              Starten Sie jetzt! Ein Anruf oder eine E-Mail genügt, um Ihre Immobilie
              vorzustellen oder Ihre Immobilienwünsche im Detail persönlich mit uns zu besprechen.
            </p>
            <p>
              <span className="font-semibold text-ink">Für Immobilienverkäufer bedeutet das:</span>{" "}
              Nach Ihrer kurzen Vorstellung des Objekts und der Adressangabe erfolgt die
              Erstbesichtigung. Vor Ort gehen wir gemeinsam durch die Immobilie und klären
              wichtige Details wie Wohnfläche, Baujahr, vorhandene Baugenehmigungen,
              Eigentumsrechte oder letzte Renovierungen. Diese Informationen bilden die Grundlage
              für eine erste Preisermittlung. Innerhalb von etwa einer Woche erhalten Sie den
              ermittelten Marktpreis – entweder in einem persönlichen Gespräch oder in Form einer
              übersichtlichen Präsentation per E-Mail.
            </p>
            <p>
              <span className="font-semibold text-ink">Für Immobilienkäufer wiederum gilt:</span>{" "}
              Sie sind auf der Suche nach einer Immobilie, die genau zu Ihnen passt? In
              persönlichen Gesprächen finden wir heraus, welche Wünsche und Anforderungen Sie
              haben. So stellen wir sicher, dass wir gemeinsam das passende Objekt für Sie finden.
            </p>
          </div>

          <ul className="mt-7 flex flex-wrap gap-x-8 gap-y-3">
            <li>
              <a
                href={site.landlineHref}
                className="group flex items-center gap-2.5 text-[0.9375rem] font-semibold text-ink transition-colors hover:text-accent-deep"
              >
                <Phone className="h-4 w-4 text-accent-mid" strokeWidth={1.8} aria-hidden="true" />
                {site.landline}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${site.email}`}
                className="group flex items-center gap-2.5 text-[0.9375rem] font-semibold text-ink transition-colors hover:text-accent-deep"
              >
                <Mail className="h-4 w-4 text-accent-mid" strokeWidth={1.8} aria-hidden="true" />
                {site.email}
              </a>
            </li>
          </ul>

          <Button href="/kontakt" variant="primary" withArrow className="mt-7">
            Kontaktformular
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
