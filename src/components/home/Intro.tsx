import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { KeyMotif } from "@/components/graphics/ArchMotif";

export function Intro() {
  return (
    <section className="py-24 lg:py-36">
      <Container className="grid gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-24">
        <SectionHeading
          title={
            <>
              Immobilienvermittlung,
              <br />
              die persönlich bleibt.
            </>
          }
          size="lg"
          description={
            <>
              Eine Immobilie zu verkaufen oder zu kaufen ist eine wichtige Entscheidung. Deshalb
              steht bei Abelen Immobilien nicht das Objekt, sondern der Mensch dahinter im
              Mittelpunkt.
              <br />
              <br />
              Persönliche Betreuung, transparente Kommunikation und eine verlässliche Begleitung
              von der ersten Beratung bis zum erfolgreichen Abschluss.
            </>
          }
        />

        <div className="relative flex items-center justify-center rounded-lg border border-border bg-surface-soft p-10">
          <KeyMotif className="h-auto w-full max-w-xs text-accent" />
        </div>
      </Container>
    </section>
  );
}
