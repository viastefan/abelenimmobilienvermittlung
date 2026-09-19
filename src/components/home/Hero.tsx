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
 * Das Foto liegt über die volle Breite dahinter. Lesbar wird die Schrift
 * nicht dadurch, dass das Bild abgedunkelt wird — das kostete Foto und
 * Stimmung zugleich —, sondern durch einen hellen Schleier, der nur dort
 * deckt, wo Text steht, und zur anderen Seite hin aufklart. Die Schrift
 * steht dunkel darauf: dunkel auf hell liest sich ruhiger als hell auf
 * dunkel, und das Foto bleibt ein Foto.
 *
 * Der Schleier läuft auf großen Schirmen nach rechts aus, auf dem Telefon
 * nach unten — dort steht der Text oben, und das Bild trägt die untere
 * Hälfte.
 */
export function Hero() {
  const image = resolveImage(images.heroWohnstrasse);

  return (
    <section className="relative isolate overflow-hidden bg-surface-sand">
      <div className="absolute inset-0" aria-hidden="true">
        <SiteImage
          src={image}
          priority
          sizes="100vw"
          label="Leverkusen & Umgebung"
          alt=""
          className="object-[72%_50%] lg:object-[62%_50%]"
        />

        {/* Telefon: von oben herab deckend. */}
        <div className="absolute inset-0 bg-gradient-to-b from-surface-sand via-surface-sand/90 to-surface-sand/30 lg:hidden" />
        {/* Ab groß: von links her deckend, nach rechts offen. */}
        <div className="absolute inset-0 hidden bg-gradient-to-r from-surface-sand from-25% via-surface-sand/85 via-65% to-transparent lg:block" />
        {/* Weicher Auslauf zur Kante, damit der Abschnitt nicht abgeschnitten wirkt. */}
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-surface-sand to-transparent" />
      </div>

      <Container className="relative">
        <div className="flex min-h-[34rem] max-w-[34rem] flex-col justify-center py-16 sm:min-h-[38rem] lg:min-h-[42rem] lg:max-w-[45rem] lg:py-20">
          <span className="inline-flex w-fit items-center rounded-full bg-white/85 px-4 py-2 text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-accent-deep shadow-soft backdrop-blur">
            Leverkusen &amp; Umgebung
          </span>

          <h1 className="mt-6 font-display text-[clamp(1.875rem,5vw,3.5rem)] font-extrabold leading-[1.1] tracking-[-0.022em] text-ink [hyphens:auto]">
            {site.taglineAufmacher}
          </h1>

          <p className="pretty mt-6 max-w-[32rem] text-[1.0625rem] font-medium leading-relaxed text-ink/75 sm:text-[1.125rem]">
            Die Mehrheit der Immobilienbesitzer verkauft eine Immobilie häufig nur ein einziges Mal
            im Leben. Dabei geht es fast immer um hohe Werte.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <Button href="/bewertung" variant="primary" size="lg" withArrow className="w-full sm:w-auto">
              Immobilie bewerten
            </Button>
            <Button href="/referenzen" variant="inverted" size="lg" className="w-full shadow-soft sm:w-auto">
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
