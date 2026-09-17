import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { HeadingRule } from "@/components/ui/HeadingRule";
import { whyAbelen } from "@/data/services";

/**
 * Die vier Zusagen auf der Dienstleistungsseite.
 *
 * Vorher standen sie als vier schmale Spalten mit einem Farbstrich links —
 * am Telefon wurde daraus eine Reihe angeschnittener Zeilen ohne Anfang und
 * ohne Ende. Jetzt tragen sie eine Überschrift und stehen als nummerierte
 * Liste: dieselbe Form auf jedem Gerät, nur der Satzspiegel wechselt.
 */
export function WhyAbelen() {
  return (
    <section className="bg-surface-warm py-14 lg:py-20">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:gap-20">
          <Reveal>
            <h2 className="balance font-display text-display-lg font-bold text-ink">
              Warum Silke Abelen
            </h2>
            <HeadingRule className="mt-5" />
          </Reveal>

          <Reveal delay={100}>
            <ol className="divide-y divide-border">
              {whyAbelen.map((item, index) => (
                <li
                  key={item.title}
                  className="grid gap-x-8 gap-y-2 py-6 first:pt-0 last:pb-0 sm:grid-cols-[auto_minmax(0,1fr)]"
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
        </div>
      </Container>
    </section>
  );
}
