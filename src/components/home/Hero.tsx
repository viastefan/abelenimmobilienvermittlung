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
 * Der Kontrast kommt aus einem Verlauf über dem Foto, nicht aus einem
 * Schlagschatten auf der Schrift: ein Schatten legt sich um jeden Buchstaben
 * und macht die Zeile unruhig, der Verlauf senkt nur den Grund.
 *
 * Auf dem Telefon rückt der Bildausschnitt nach rechts. Das Motiv sitzt dort
 * und bliebe bei mittiger Ausrichtung im Hochformat außerhalb des Bildes.
 */
export function Hero() {
  const image = resolveImage(images.heroWohnstrasse);

  return (
    <section className="relative isolate overflow-hidden bg-ink-deep">
      <div className="absolute inset-0" aria-hidden="true">
        <SiteImage
          src={image}
          priority
          sizes="100vw"
          label="Leverkusen & Umgebung"
          alt=""
          className="object-[68%_50%] sm:object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-ink-deep/90 via-ink-deep/65 to-ink-deep/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-deep/70 via-transparent to-ink-deep/35" />
      </div>

      <Container className="relative">
        <div className="flex min-h-[32rem] flex-col justify-center py-16 sm:min-h-[38rem] lg:min-h-[44rem] lg:max-w-[54rem] lg:py-24">
          <h1 className="font-display text-[clamp(1.875rem,5.4vw,3.75rem)] font-extrabold leading-[1.12] tracking-[-0.02em] text-white [hyphens:auto]">
            {site.taglineAufmacher}
          </h1>

          <p className="pretty mt-6 max-w-[32rem] text-[1.0625rem] leading-relaxed text-white/85 sm:text-[1.125rem]">
            Die Mehrheit der Immobilienbesitzer verkauft eine Immobilie häufig nur ein einziges Mal
            im Leben. Dabei geht es fast immer um hohe Werte.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <Button href="/bewertung" variant="primary" size="lg" withArrow className="w-full sm:w-auto">
              Immobilie bewerten
            </Button>
            <Button href="/referenzen" variant="secondaryInverted" size="lg" className="w-full sm:w-auto">
              Objekte ansehen
            </Button>
          </div>

          <TrustBadges className="mt-10" />

          <span className="sr-only">{ALT}</span>
        </div>
      </Container>
    </section>
  );
}
