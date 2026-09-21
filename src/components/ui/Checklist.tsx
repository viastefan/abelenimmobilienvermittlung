"use client";

import { useMemo, useState } from "react";
import { Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export type ChecklistGroup = {
  title: string;
  /** Ein Satz, der sagt, wofür die Gruppe gebraucht wird. */
  lead?: string;
  items: readonly string[];
};

/**
 * Die Unterlagenliste — zum Abhaken.
 *
 * Wer diese Seite aufruft, sucht seine Unterlagen zusammen. Eine Liste zum
 * Lesen hilft dabei wenig: nach dem dritten Dokument weiß man nicht mehr,
 * was schon im Ordner liegt. Angehakt wird daraus eine Arbeitsliste, und
 * der Ring oben sagt auf einen Blick, wie weit die Mappe ist.
 *
 * Die Haken bleiben in der geöffneten Seite und werden nirgends
 * gespeichert: Sie sind eine Hilfe beim Sortieren, kein Vorgang, den die
 * Website über den Besuch hinaus festhalten müsste — und so braucht es
 * dafür auch keine Einwilligung.
 */
export function Checklist({
  eyebrow,
  title,
  description,
  groups,
  className = "",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  groups: readonly ChecklistGroup[];
  className?: string;
}) {
  const [erledigt, setErledigt] = useState<ReadonlySet<string>>(new Set());

  const gesamt = useMemo(() => groups.reduce((summe, g) => summe + g.items.length, 0), [groups]);
  const anteil = gesamt === 0 ? 0 : erledigt.size / gesamt;

  const umschalten = (schluessel: string) =>
    setErledigt((vorher) => {
      const naechste = new Set(vorher);
      if (naechste.has(schluessel)) naechste.delete(schluessel);
      else naechste.add(schluessel);
      return naechste;
    });

  // Ring: Umfang eines Kreises mit r=26.
  const umfang = 2 * Math.PI * 26;

  return (
    <section className={`bg-surface-cool py-14 lg:py-20 ${className}`}>
      <Container>
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow={eyebrow} title={title} description={description} />

          <div className="flex items-center gap-3.5">
            <span className="relative flex h-16 w-16 shrink-0 items-center justify-center">
              <svg viewBox="0 0 64 64" className="h-16 w-16 -rotate-90" aria-hidden="true">
                <circle cx="32" cy="32" r="26" fill="none" stroke="#E2E9ED" strokeWidth="5" />
                <circle
                  cx="32"
                  cy="32"
                  r="26"
                  fill="none"
                  stroke="#1C8480"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeDasharray={umfang}
                  strokeDashoffset={umfang * (1 - anteil)}
                  className="transition-[stroke-dashoffset] duration-500 ease-smooth motion-reduce:transition-none"
                />
              </svg>
              <span className="absolute font-display text-[0.8125rem] font-extrabold tabular-nums text-ink">
                {erledigt.size}
              </span>
            </span>
            <span className="text-[0.875rem] leading-snug text-text-muted">
              von {gesamt} Unterlagen
              <br />
              <span className="text-[0.8125rem] text-text-subtle">zusammengesucht</span>
            </span>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {groups.map((group, index) => (
            <Reveal key={group.title} delay={index * 90} className="h-full">
              <div className="flex h-full flex-col rounded-[14px] bg-white shadow-soft ring-1 ring-border p-6">
                <h3 className="font-display text-[0.9375rem] font-bold text-ink">{group.title}</h3>
                {group.lead && (
                  <p className="pretty mt-2.5 text-[0.8125rem] leading-relaxed text-text-muted">
                    {group.lead}
                  </p>
                )}
                <ul className="mt-4 space-y-1">
                  {group.items.map((item) => {
                    const schluessel = `${group.title}::${item}`;
                    const an = erledigt.has(schluessel);
                    return (
                      <li key={item}>
                        <button
                          type="button"
                          onClick={() => umschalten(schluessel)}
                          aria-pressed={an}
                          className="group/haken -mx-2 flex w-[calc(100%+1rem)] items-start gap-2.5 rounded-[10px] px-2 py-1.5 text-left transition-colors duration-200 hover:bg-accent-tint"
                        >
                          <span
                            className={`mt-[1px] flex h-[1.125rem] w-[1.125rem] shrink-0 items-center justify-center rounded-[6px] transition-all duration-200 ${
                              an
                                ? "bg-accent-deep text-white"
                                : "ring-1 ring-border-strong group-hover/haken:ring-accent"
                            }`}
                          >
                            <Check
                              className={`h-3 w-3 transition-transform duration-200 ${
                                an ? "scale-100" : "scale-0"
                              }`}
                              strokeWidth={3}
                              aria-hidden="true"
                            />
                          </span>
                          <span
                            className={`text-[0.8125rem] leading-relaxed transition-colors duration-200 ${
                              an ? "text-text-subtle line-through" : "text-text-muted"
                            }`}
                          >
                            {item}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <p className="mt-6 text-[0.8125rem] text-text-subtle">
          Zum Abhaken beim Zusammensuchen. Die Haken bleiben in dieser Seite und werden nicht
          gespeichert.
        </p>
      </Container>
    </section>
  );
}
