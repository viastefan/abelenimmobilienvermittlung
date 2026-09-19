import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { whyAbelen } from "@/data/services";

/**
 * Die vier Zusagen auf der Dienstleistungsseite.
 *
 * Vorher standen sie als vier schmale Spalten mit einem Farbstrich links —
 * am Telefon wurde daraus eine Reihe angeschnittener Zeilen ohne Anfang und
 * ohne Ende. Dann standen sie als Liste rechts neben der Überschrift, und
 * weil eine Überschrift kurz ist und vier Zusagen lang sind, blieb neben
 * ihnen eine leere Fläche über die halbe Seitenbreite stehen.
 *
 * Jetzt steht die Überschrift über allem und die Zusagen darunter, zu
 * zweit nebeneinander: dieselbe Form auf jedem Gerät, keine Spalte, die
 * früher endet als die andere.
 */
export function WhyAbelen() {
  return (
    <section className="bg-surface-warm py-14 lg:py-20">
      <Container>
        <Reveal>
          <h2 className="balance max-w-2xl font-display text-display-lg font-bold text-ink">
            Warum Silke Abelen
          </h2>
        </Reveal>

        <Reveal delay={100}>
          <ol className="mt-10 grid gap-x-16 gap-y-2 sm:grid-cols-2 lg:mt-12">
            {whyAbelen.map((item, index) => (
              <li
                key={item.title}
                className="grid gap-x-6 gap-y-2 border-t border-border py-7 sm:grid-cols-[auto_minmax(0,1fr)]"
              >
                <span className="font-display text-[0.8125rem] font-bold tabular-nums text-accent-deep sm:pt-1">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-display text-display-sm font-bold text-ink">{item.title}</h3>
                  <p className="pretty mt-2 text-[0.9375rem] leading-relaxed text-text-muted">
                    {item.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
      </Container>
    </section>
  );
}
