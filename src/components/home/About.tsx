import { Check, MapPin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SiteImage } from "@/components/graphics/SiteImage";
import { resolveImage } from "@/lib/imagery";
import { images } from "@/data/imagery";
import { regions, site } from "@/data/site";

/**
 * Was drei Sätze vorher nicht leisteten: sagen, mit wem man es zu tun hat.
 *
 * Der Satz im Zitat stammt aus dem Text der Seite „Über uns“ — dieselbe
 * Stimme, nur an der Stelle, an der die meisten Besucherinnen und Besucher
 * bleiben. Darunter das Tätigkeitsgebiet, denn die zweite Frage nach „wer?“
 * ist immer „und wo?“.
 */
const principles = [
  "Feste Ansprechpartnerin — kein Callcenter",
  "Ehrliche Einschätzung statt Wunschpreis",
  "Fundierte Marktkenntnis in der Region",
];

export function About() {
  const portrait = resolveImage(images.portrait);

  return (
    <section className="bg-white py-16 lg:py-20">
      <Container className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
        <Reveal>
          <Eyebrow>Über uns</Eyebrow>
          <h2 className="balance mt-4 font-display text-display-lg font-bold text-ink">
            Ihr Partner für Immobilien
            <br />
            in Leverkusen
          </h2>

          <blockquote className="mt-6 border-l-2 border-accent pl-5">
            <p className="pretty font-display text-[1.0625rem] font-medium leading-relaxed text-ink">
              „Immobilienvermittlung ist für mich vor allem Vertrauenssache — ich begleite Menschen
              durch eine Entscheidung, die selten allein finanziell ist.“
            </p>
            <footer className="mt-3 text-[0.875rem] text-text-subtle">
              {site.owner}, {site.ownerRole}
            </footer>
          </blockquote>

          <ul className="mt-7 space-y-3">
            {principles.map((principle) => (
              <li key={principle} className="flex items-start gap-3 text-[0.9375rem] text-text-muted">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-deep" strokeWidth={2.4} aria-hidden="true" />
                {principle}
              </li>
            ))}
          </ul>

          <Button href="/ueber-mich" variant="primary" withArrow className="mt-8">
            Mehr über uns
          </Button>
        </Reveal>

        <Reveal delay={120}>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[14px] border border-border bg-surface-mist sm:aspect-[16/10] lg:aspect-[4/3]">
            <SiteImage
              src={portrait}
              sizes="(min-width: 1024px) 46vw, 100vw"
              label={site.owner}
              alt={`${site.owner}, ${site.ownerRole} des Büros für Immobilien Bewertung & Vermittlung`}
            />
          </div>

          <div className="mt-6 rounded-[14px] border border-border bg-surface-warm p-6">
            <p className="flex items-center gap-2 font-display text-[0.9375rem] font-bold text-ink">
              <MapPin className="h-4 w-4 text-accent-mid" strokeWidth={1.8} aria-hidden="true" />
              Tätigkeitsgebiet
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {regions.map((region) => (
                <li
                  key={region}
                  className={`rounded-[9px] border px-3 py-1.5 text-[0.8125rem] ${
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
        </Reveal>
      </Container>
    </section>
  );
}
