import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

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
    <section className="bg-ink-deep py-10 lg:py-14">
      <Container>
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
