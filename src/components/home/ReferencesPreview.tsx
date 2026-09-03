import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { PropertyPlaceholder } from "@/components/graphics/PropertyPlaceholder";
import { references } from "@/data/references";

const sizeClasses: Record<string, string> = {
  tall: "row-span-2",
  wide: "sm:col-span-2",
  square: "",
};

export function ReferencesPreview() {
  return (
    <section className="border-y border-border bg-surface py-24 lg:py-32">
      <Container>
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Erfolgreich vermittelt"
            size="lg"
            title={
              <>
                Vertrauen entsteht,
                <br />
                wenn Ergebnisse sichtbar werden.
              </>
            }
            description="Eine Auswahl der Objektarten, die wir regelmäßig in der Region begleiten."
          />
          <Button href="/referenzen" variant="secondary" withArrow className="group shrink-0">
            Alle Referenzen
          </Button>
        </div>

        <div className="mt-14 grid auto-rows-[180px] grid-cols-2 gap-4 sm:grid-cols-3 lg:auto-rows-[220px]">
          {references.map((item, index) => (
            <div
              key={`${item.type}-${item.region}`}
              className={`group relative overflow-hidden rounded-md ${sizeClasses[item.size]}`}
            >
              <div className="absolute inset-0 transition-transform duration-700 ease-smooth group-hover:scale-105">
                <PropertyPlaceholder label="" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/0 to-ink/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="absolute inset-x-0 bottom-0 translate-y-2 p-5 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <p className="font-display text-sm font-semibold text-white">{item.type}</p>
                <p className="text-xs text-white/70">{item.region} · Erfolgreich vermittelt</p>
              </div>
              <span
                className="pointer-events-none absolute left-4 top-4 text-xs font-semibold uppercase tracking-[0.08em] text-text-muted"
                aria-hidden={index === 0 ? undefined : "true"}
              >
                {item.region}
              </span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
