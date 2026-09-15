import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { TrustBadges } from "@/components/home/TrustBadges";
import { SiteImage } from "@/components/graphics/SiteImage";
import { resolveImage } from "@/lib/imagery";
import { images } from "@/data/imagery";
import { site } from "@/data/site";

const ALT = "Hand mit einem Wohnungsschlüssel vor hellem Himmel";

/**
 * Aufmacher der Startseite.
 *
 * Das Schlüsselfoto trägt die ganze Fläche, wie im bisherigen Auftritt —
 * ohne verdunkelnden Verlauf davor, ebenfalls wie dort. Für Lesbarkeit auf
 * hellem Himmel sorgt stattdessen ein Schlagschatten auf der Schrift selbst.
 */
export function Hero() {
  const image = resolveImage(images.heroWohnstrasse);

  return (
    <section className="relative isolate overflow-hidden bg-ink-deep">
      <div className="absolute inset-0" aria-hidden="true">
        <SiteImage src={image} priority sizes="100vw" label="Leverkusen & Umgebung" alt="" />
      </div>

      <Container className="relative">
        <div className="flex min-h-[36rem] flex-col justify-center py-20 lg:min-h-[46rem] lg:max-w-[54rem] lg:py-28">
          <span className="inline-flex w-fit items-center gap-3 text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-accent-light [text-shadow:0_1px_10px_rgba(11,37,69,0.85)]">
            <span className="h-px w-8 bg-accent" aria-hidden="true" />
            Ihr Partner für Immobilienkauf und -verkauf
          </span>

          <h1 className="mt-7 break-words font-display text-[clamp(2.25rem,5.2vw,3.75rem)] font-extrabold leading-[1.12] tracking-[-0.02em] text-white [hyphens:auto] [text-shadow:0_2px_20px_rgba(11,37,69,0.9)]">
            {site.tagline}
          </h1>

          <p className="pretty mt-6 max-w-[32rem] text-[1.125rem] leading-relaxed text-white [text-shadow:0_1px_12px_rgba(11,37,69,0.9)]">
            Die Mehrheit der Immobilienbesitzer verkauft eine Immobilie häufig nur ein einziges Mal
            im Leben. Dabei geht es fast immer um hohe Werte.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <Button href="/bewertung" variant="primary" size="lg" withArrow className="w-full sm:w-auto">
              Immobilie bewerten
            </Button>
            <Button href="/immobilien" variant="secondaryInverted" size="lg" className="w-full sm:w-auto">
              Objekte ansehen
            </Button>
          </div>

          <TrustBadges className="mt-12" />

          {/* Auf dem Telefon liegt dasselbe Motiv hinter der Schrift — der
              Schlagschatten sorgt dort ebenso für Kontrast. */}
          <span className="sr-only">{ALT}</span>
        </div>
      </Container>
    </section>
  );
}
