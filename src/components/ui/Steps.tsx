import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ProcessTimeline } from "@/components/ui/ProcessTimeline";
import type { Step } from "@/data/process";

/**
 * Der Ablauf — dasselbe Muster auf jeder Leistungsseite, damit „so läuft es
 * ab“ sofort wiedererkannt wird. Die Schritte selbst zeichnet
 * `ProcessTimeline` als Achse.
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

        <ProcessTimeline steps={steps} />
      </Container>
    </section>
  );
}
