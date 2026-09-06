import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] items-center py-20">
      <Container className="max-w-xl text-center">
        <p className="font-display text-label font-bold uppercase text-accent-deep">404</p>
        <h1 className="balance mt-4 font-display text-display-md font-bold text-ink">
          Diese Seite gibt es nicht (mehr).
        </h1>
        <p className="pretty mt-5 text-[1.0625rem] leading-relaxed text-text-muted">
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
