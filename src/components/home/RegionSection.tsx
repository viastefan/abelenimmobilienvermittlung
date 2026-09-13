import { MapPin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { regions, site } from "@/data/site";

export function RegionSection() {
  return (
    <section className="border-t border-border bg-surface-warm py-16 lg:py-20">
      <Container className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center lg:gap-20">
        <Reveal>
          <SectionHeading
            eyebrow="Vor Ort für Sie da"
            size="md"
            title={
              <>
                Zuhause in Leverkusen.
                <br />
                Tätig im ganzen Bergischen Rheinland.
              </>
            }
            description="Marktkenntnis entsteht durch Nähe. Wir betreuen Eigentümerinnen und Eigentümer in Leverkusen und den angrenzenden Städten — dort, wo wir die Straßen, die Lagen und die Preise kennen."
          />
        </Reveal>

        <Reveal delay={120}>
          <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-[16px] border border-border bg-border sm:grid-cols-3">
            {regions.map((region) => {
              const isHome = region === site.address.locality;
              return (
                <li
                  key={region}
                  className={`flex items-center gap-2.5 bg-white px-5 py-5 text-[0.9375rem] ${
                    isHome ? "font-bold text-ink" : "text-text-muted"
                  }`}
                >
                  <MapPin
                    className={`h-4 w-4 shrink-0 ${isHome ? "text-accent-deep" : "text-border-strong"}`}
                    strokeWidth={1.6}
                    aria-hidden="true"
                  />
                  {region}
                </li>
              );
            })}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
