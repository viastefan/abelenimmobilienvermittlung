import { CheckCircle2, Home } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { LogoMark } from "@/components/layout/Logo";

/**
 * Compact navy strip used at the foot of sub-pages — one message, one action.
 */
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
    <section className="bg-ink-deep py-7">
      <Container>
        <Reveal className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div className="flex items-center gap-5">
            <LogoMark className="hidden h-10 w-10 shrink-0 text-accent sm:block" />
            <div>
              <p className="font-display text-[0.9375rem] font-bold text-white">{title}</p>
              <p className="mt-1 text-[0.8125rem] text-white/65">{description}</p>
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

const points = ["Persönlich", "Unverbindlich", "Regional"];

/**
 * The site's principal call to action: the valuation offer, on navy.
 */
export function ValuationCta() {
  return (
    <section className="relative overflow-hidden bg-ink-deep py-20 lg:py-28">
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-accent/10 blur-3xl"
        aria-hidden="true"
      />
      <Container className="relative">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="inline-flex h-14 w-14 items-center justify-center rounded-[16px] bg-white/10 text-accent">
            <Home className="h-6 w-6" strokeWidth={1.5} aria-hidden="true" />
          </span>

          <h2 className="balance mt-7 font-display text-display-lg font-bold text-white">
            Was ist Ihre Immobilie wert?
          </h2>
          <p className="pretty mx-auto mt-5 max-w-xl text-[1.0625rem] leading-relaxed text-white/70">
            Erhalten Sie eine professionelle und unverbindliche Einschätzung Ihrer Immobilie —
            fundiert ermittelt und verständlich erklärt.
          </p>

          <Button href="/bewertung" variant="primary" size="lg" withArrow className="mt-9">
            Immobilie bewerten
          </Button>

          <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-white/60">
            {points.map((point) => (
              <li key={point} className="inline-flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-accent" strokeWidth={1.6} aria-hidden="true" />
                {point}
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
