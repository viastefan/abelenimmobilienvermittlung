import { Award, Home, Users } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { BrandWaveRule } from "@/components/graphics/BrandWave";
import { featureStrip } from "@/data/site";

const icons = { users: Users, award: Award, home: Home } as const;

/**
 * Die drei Zusagen unter dem Aufmacher.
 *
 * Ohne Karten, ohne Kacheln um die Symbole: drei gleiche Kästchen
 * nebeneinander sehen aus wie auf jeder zweiten Website. Hier trägt die
 * Schrift, und darunter läuft die Welle aus der Bildmarke über die ganze
 * Breite — das Zeichen, das nur zu diesem Haus gehört.
 */
export function TrustStrip() {
  return (
    <section className="bg-surface-warm py-12 lg:py-16">
      <Container>
        <ul className="grid gap-8 sm:grid-cols-3 sm:gap-12">
          {featureStrip.map((item, index) => {
            const Icon = icons[item.icon];
            return (
              <Reveal as="li" key={item.title} delay={index * 90}>
                <Icon className="h-6 w-6 text-accent-mid" strokeWidth={1.4} aria-hidden="true" />
                <p className="mt-4 font-display text-display-sm font-bold text-ink">{item.title}</p>
                <p className="pretty mt-2 text-[0.9375rem] leading-relaxed text-text-muted">
                  {item.description}
                </p>
              </Reveal>
            );
          })}
        </ul>

        <Reveal delay={280}>
          <BrandWaveRule className="mt-10 text-accent/45 lg:mt-14" />
        </Reveal>
      </Container>
    </section>
  );
}
