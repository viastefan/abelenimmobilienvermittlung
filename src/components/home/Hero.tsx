import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { TrustBadges } from "@/components/home/TrustBadges";
import { SiteImage } from "@/components/graphics/SiteImage";
import { resolveImage } from "@/lib/imagery";
import { images } from "@/data/imagery";

const ALT = "Hand mit einem Wohnungsschlüssel vor hellem Himmel";

/**
 * Aufmacher der Startseite.
 *
 * Das Foto ist ein heller Himmel, und hell soll es bleiben — so steht es
 * auch im bisherigen Auftritt. Eine gleichmäßige Abdunklung lag hier einmal
 * darüber; sie machte aus dem Himmel eine graue Fläche und aus der Hand mit
 * dem Schlüssel, dem eigentlichen Motiv, einen Schatten.
 *
 * Lesbar bleibt die Schrift jetzt auf zwei Wegen: ein leichter Verlauf, der
 * nur über der linken Seite liegt und nach rechts ganz verschwindet, und
 * ein Schatten an den Buchstaben selbst. Beides zusammen wiegt weniger als
 * der Schleier vorher — das Bild behält seine Farbe, die Hand ihr Licht.
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
          tone="dark"
          className="object-[68%_50%] lg:object-[60%_45%]"
        />

        {/* Schmal: der Text steht über die ganze Breite, also liegt auch der
            Verlauf gleichmäßig — aber leicht. */}
        <div className="absolute inset-0 bg-black/30 lg:hidden" />
        {/* Breit: dicht genug unter der Schrift, offen dort, wo das Motiv
            liegt. */}
        <div className="absolute inset-0 hidden bg-gradient-to-r from-black/30 via-black/10 to-transparent lg:block" />
      </div>

      <Container className="relative">
        <div className="flex min-h-[32rem] max-w-[46rem] flex-col justify-center py-16 sm:min-h-[36rem] lg:min-h-[40rem] lg:py-20">
          {/* Der kurze Strich setzt die Marke an den Anfang der Zeile. */}
          <span className="flex items-center gap-3 text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-white">
            <span className="h-px w-8 bg-accent" aria-hidden="true" />
            <span className="on-photo">Ihr Partner für Immobilienkauf und -verkauf</span>
          </span>

          {/* Der Umbruch steht fest hinter dem Komma: von selbst brach die
              Zeile hinter „die“, und ein Artikel am Zeilenende liest sich
              wie ein Stolperstein. Auf schmalen Geräten bricht sie frei. */}
          <h1 className="on-photo mt-5 font-display text-[clamp(2rem,5vw,3.5rem)] font-extrabold leading-[1.08] tracking-[-0.022em] text-white [hyphens:auto]">
            Immobilien&shy;vermittlung,
            <br className="hidden sm:block" /> die Werte schafft
          </h1>

          <p className="on-photo pretty mt-6 max-w-[34rem] text-[1.0625rem] leading-relaxed text-white sm:text-[1.125rem]">
            Die Mehrheit der Immobilienbesitzer verkauft eine Immobilie häufig nur ein einziges Mal
            im Leben. Dabei geht es fast immer um hohe Werte.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <Button href="/bewertung" variant="primary" size="lg" withArrow className="w-full sm:w-auto">
              Immobilie bewerten
            </Button>
            <Button href="/referenzen" variant="inverted" size="lg" className="w-full sm:w-auto">
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
