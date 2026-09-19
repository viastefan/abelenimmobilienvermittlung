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
 * Das Foto stand hier einmal über die volle Breite, unter zwei dunkelblauen
 * Verläufen, die es so weit absenkten, dass weiße Schrift darauf hielt. Der
 * Preis dafür war hoch: eine schwere, kalte Fläche als erster Eindruck, ein
 * Foto, das man kaum noch sah, und Qualifikationsnachweise, die auf dem
 * dunklen Grund verschwanden.
 *
 * Jetzt teilen sich Text und Foto den Platz. Der Grund ist hell und warm,
 * die Schrift steht in Navy darauf, und das Foto muss nichts mehr tragen
 * außer sich selbst — es steht als eigene Fläche daneben, ungetrübt.
 *
 * Auf dem Telefon steht der Text oben und das Foto darunter: eine halbe
 * Spalte Bild neben einer halben Spalte Text wäre für beides zu wenig.
 */
export function Hero() {
  const image = resolveImage(images.heroWohnstrasse);

  return (
    <section className="relative isolate overflow-hidden bg-surface-sand">
      {/* Zwei sehr weiche Lichter statt einer flächigen Farbe: sie geben dem
          Grund Tiefe, ohne ihn zu färben. */}
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute -right-[10%] top-[-30%] h-[120%] w-[65%] rounded-full bg-accent-tint blur-3xl" />
        <div className="absolute -left-[15%] bottom-[-40%] h-[90%] w-[55%] rounded-full bg-white/70 blur-3xl" />
      </div>

      <Container className="relative">
        <div className="grid items-center gap-10 py-12 sm:py-14 lg:grid-cols-[1.08fr_0.92fr] lg:gap-14 lg:py-16">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-accent-deep shadow-soft backdrop-blur">
              Leverkusen &amp; Umgebung
            </span>

            <h1 className="mt-6 font-display text-[clamp(1.875rem,5vw,3.5rem)] font-extrabold leading-[1.1] tracking-[-0.022em] text-ink [hyphens:auto]">
              {site.taglineAufmacher}
            </h1>

            <p className="pretty mt-6 max-w-[34rem] text-[1.0625rem] leading-relaxed text-text-muted sm:text-[1.125rem]">
              Die Mehrheit der Immobilienbesitzer verkauft eine Immobilie häufig nur ein einziges Mal
              im Leben. Dabei geht es fast immer um hohe Werte.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <Button href="/bewertung" variant="primary" size="lg" withArrow className="w-full sm:w-auto">
                Immobilie bewerten
              </Button>
              <Button href="/referenzen" variant="secondary" size="lg" className="w-full sm:w-auto">
                Objekte ansehen
              </Button>
            </div>

            <TrustBadges className="mt-10" />
          </div>

          {/* Das Foto bekommt eine eigene Fläche statt der ganzen Breite. Sein
              Seitenverhältnis ist die Obergrenze für die Höhe des Aufmachers:
              wird das Bild höher, rutschen die Nachweise unter die Kante des
              Bildschirms, und der erste Eindruck verliert sie. */}
          <div className="relative">
            <div className="relative aspect-[5/4] overflow-hidden rounded-[28px] shadow-lift sm:aspect-[16/10] lg:aspect-[6/5] lg:rounded-[32px]">
              <SiteImage
                src={image}
                priority
                sizes="(min-width: 1024px) 46vw, 100vw"
                label="Leverkusen & Umgebung"
                alt={ALT}
                className="object-center"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
