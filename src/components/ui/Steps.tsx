import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import type { Step } from "@/data/process";

/**
 * Numbered process list — the same quiet pattern on every service page, so
 * visitors recognise "so läuft es ab" instantly.
 */
export function Steps({
  eyebrow,
  title,
  description,
  steps,
  className = "",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  steps: Step[];
  className?: string;
}) {
  return (
    <section className={`bg-surface-warm py-14 lg:py-20 ${className}`}>
      <Container>
        <Reveal>
          <SectionHeading eyebrow={eyebrow} size="lg" title={title} description={description} />
        </Reveal>

        <ol className="mt-14 grid gap-x-10 gap-y-10 pt-12 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, index) => (
            <Reveal as="li" key={step.number} delay={index * 60} className="flex gap-5">
              <span className="font-display text-[1.375rem] font-extrabold tabular-nums text-accent-light">
                {step.number}
              </span>
              <div>
                <h3 className="font-display text-[1.0625rem] font-bold text-ink">{step.title}</h3>
                <p className="pretty mt-2 text-[0.9375rem] leading-relaxed text-text-muted">
                  {step.description}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
