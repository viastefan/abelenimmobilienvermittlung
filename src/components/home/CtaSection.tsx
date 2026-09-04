import { Home } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function CtaSection({
  title = "Sie möchten wissen, was Ihre Immobilie wert ist?",
  description = "Wir bewerten Ihre Immobilie kostenlos und unverbindlich.",
  buttonLabel = "Jetzt bewerten",
  href = "/bewertung",
}: {
  title?: string;
  description?: string;
  buttonLabel?: string;
  href?: string;
}) {
  return (
    <section className="bg-ink py-10">
      <Container>
        <Reveal className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div className="flex items-center gap-5">
            <span className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/10 text-white sm:flex">
              <Home className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <p className="font-display text-lg font-semibold text-white">{title}</p>
              <p className="mt-1 text-sm text-white/70">{description}</p>
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
