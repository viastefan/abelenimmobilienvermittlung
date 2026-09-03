import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RegionMap } from "@/components/graphics/RegionMap";
import { Reveal } from "@/components/ui/Reveal";
import { regionMapPoints } from "@/data/region-map";

export function RegionSection() {
  return (
    <section className="bg-surface-soft py-24 lg:py-32">
      <Container className="grid gap-16 lg:grid-cols-2 lg:items-center lg:gap-24">
        <Reveal>
          <SectionHeading
            eyebrow="Vor Ort für Sie da"
            size="lg"
            title={
              <>
                Immobilien in Ihrer Region.
                <br />
                Persönlich betreut.
              </>
            }
          />
          <ul className="mt-10 grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3">
            {regionMapPoints.map((region) => (
              <li key={region.label} className="flex items-center gap-2 text-sm text-text">
                <span className={`h-1.5 w-1.5 rounded-full ${region.home ? "bg-accent" : "bg-text-muted/40"}`} />
                {region.label}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={150} className="rounded-lg border border-border bg-surface p-8">
          <RegionMap className="h-auto w-full text-ink" />
        </Reveal>
      </Container>
    </section>
  );
}
