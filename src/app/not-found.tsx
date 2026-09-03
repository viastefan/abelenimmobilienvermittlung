import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center pt-24">
      <Container className="max-w-xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">404</p>
        <h1 className="mt-4 font-display text-display-md font-semibold text-ink">
          Diese Seite gibt es nicht (mehr).
        </h1>
        <p className="mt-5 text-base text-text-muted">
          Möglicherweise wurde die Immobilie bereits vermittelt oder die Seite wurde verschoben.
          Schauen Sie sich gerne unsere aktuellen Angebote an oder kontaktieren Sie uns direkt.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <Button href="/" variant="primary">
            Zur Startseite
          </Button>
          <Button href="/immobilien" variant="secondary">
            Immobilien ansehen
          </Button>
        </div>
      </Container>
    </section>
  );
}
