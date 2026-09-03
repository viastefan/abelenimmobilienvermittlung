import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { processSteps } from "@/data/process";

export function Process() {
  return (
    <section className="py-24 lg:py-32">
      <Container>
        <SectionHeading
          eyebrow="Ablauf"
          size="lg"
          title={
            <>
              Klarer Prozess.
              <br />
              Persönliche Begleitung.
            </>
          }
        />

        <div className="mt-16 grid gap-x-10 gap-y-12 border-t border-border pt-12 sm:grid-cols-2 lg:grid-cols-3">
          {processSteps.map((step) => (
            <div key={step.number} className="flex gap-5">
              <span className="font-display text-2xl font-semibold text-border">{step.number}</span>
              <div>
                <h3 className="font-display text-lg font-semibold text-ink">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
