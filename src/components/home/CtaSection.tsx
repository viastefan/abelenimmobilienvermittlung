import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SkylineMark } from "@/components/graphics/SkylineMark";

/**
 * Der Abschluss einer Seite — eine Aussage, eine Handlung.
 *
 * Die Zeile trägt den Schluss der Seite und ist deshalb eine Überschrift,
 * keine Bildunterschrift.
 */
export function CtaSection({
  title = "Sie möchten wissen, was Ihre Immobilie wert ist?",
  // Kein Preisversprechen: Was eine Bewertung kostet, sagt Silke Abelen im
  // Gespräch — nicht die Website.
  description = "Sprechen Sie uns an — wir schätzen ein, was in Ihrer Immobilie steckt.",
  buttonLabel = "Jetzt bewerten",
  href = "/bewertung",
}: {
  title?: string;
  description?: string | null;
  buttonLabel?: string;
  href?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-ink-deep py-14 lg:py-20">
      {/* Die Häuserzeile steht hinter dem Knopf und gibt der Fläche einen
          Gegenstand. Auf dem Telefon bleibt sie weg: dort liegt sie unter
          dem Text statt neben ihm und macht ihn nur unruhig. */}
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[42%] items-center justify-end overflow-hidden py-6 pr-8 lg:flex" aria-hidden="true">
        <SkylineMark className="h-full max-h-[11rem] w-auto text-accent/20" />
      </div>
      {/* Zur Textseite hin ausblenden, damit die Zeichnung die Schrift nicht
          anschneidet. */}
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[46%] bg-gradient-to-r from-ink-deep via-ink-deep/55 to-transparent lg:block" aria-hidden="true" />

      <Container className="relative">
        <Reveal className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center lg:gap-14">
          <div className="max-w-2xl">
            <p className="balance font-display text-display-lg font-bold text-white">{title}</p>
            {description && (
              <p className="pretty mt-3 text-[0.9375rem] leading-relaxed text-white/70">
                {description}
              </p>
            )}
          </div>
          <Button
            href={href}
            variant="inverted"
            size="lg"
            withArrow
            className="w-full shrink-0 sm:w-auto"
          >
            {buttonLabel}
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
