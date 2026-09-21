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
 * Das Foto liegt ganzflächig dahinter und bleibt ein Foto: kein heller
 * Schleier davor, der es wegwischt, sondern eine ruhige Abdunklung, die
 * gerade so weit geht, dass weiße Schrift sicher darauf steht. Die
 * Abdunklung ist neutral gehalten und nicht in der Markenfarbe — eine
 * eingefärbte Fläche legt sich über die Farben des Fotos, eine neutrale
 * nimmt ihnen nur Helligkeit.
 *
 * Unter dem Text liegt sie etwas dichter als am rechten Rand, damit das
 * Motiv dort offen bleibt.
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
          className="object-[68%_50%] lg:object-[60%_45%]"
        />

        {/* Eine gleichmäßige Abdunklung über das ganze Bild — kein Verlauf
            und keine Farbe. Übereinandergelegte Verläufe wirkten wie eine
            Einfärbung; schlicht dunkler bleibt das Foto ein Foto. */}
        <div className="absolute inset-0 bg-black/45" />
      </div>

      <Container className="relative">
        <div className="flex min-h-[32rem] max-w-[46rem] flex-col justify-center py-16 sm:min-h-[36rem] lg:min-h-[40rem] lg:py-20">
          <span className="text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-white/80">
            Ihr Partner für Immobilienkauf und -verkauf
          </span>

          {/* Der Umbruch steht fest hinter dem Komma: von selbst brach die
              Zeile hinter „die“, und ein Artikel am Zeilenende liest sich
              wie ein Stolperstein. Auf schmalen Geräten bricht sie frei. */}
          <h1 className="mt-5 font-display text-[clamp(2rem,5vw,3.5rem)] font-extrabold leading-[1.08] tracking-[-0.022em] text-white [hyphens:auto]">
            Immobilien&shy;vermittlung,
            <br className="hidden sm:block" /> die Werte schafft
          </h1>

          <p className="pretty mt-6 max-w-[34rem] text-[1.0625rem] leading-relaxed text-white/85 sm:text-[1.125rem]">
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
