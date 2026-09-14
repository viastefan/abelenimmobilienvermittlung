import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Compact navy strip used at the foot of sub-pages — one message, one action.
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
    <section className="bg-ink-deep py-7">
      <Container>
        <Reveal className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div className="flex items-center gap-5">
                  <div>
              <p className="font-display text-[0.9375rem] font-bold text-white">{title}</p>
              {description && <p className="mt-1 text-[0.8125rem] text-white/65">{description}</p>}
            </div>
          </div>
          <Button href={href} variant="primary" className="w-full shrink-0 sm:w-auto">
            {buttonLabel}
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
