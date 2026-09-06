import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { PropertyCard } from "@/components/property/PropertyCard";
import { PropertyCtaCard } from "@/components/property/PropertyCtaCard";
import { getActiveProperties } from "@/data/properties";

export async function PropertiesPreview() {
  const properties = (await getActiveProperties()).slice(0, 3);
  if (properties.length === 0) return null;

  return (
    <section className="border-t border-border bg-white py-20 lg:py-28">
      <Container>
        <Reveal className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Aktuelle Angebote"
            size="lg"
            title={
              <>
                Immobilien in Leverkusen
                <br className="hidden sm:block" /> und Umgebung
              </>
            }
          />
          <Button href="/immobilien" variant="secondary" withArrow className="shrink-0">
            Alle Immobilien ansehen
          </Button>
        </Reveal>

        <div
          className={`mt-12 grid gap-6 sm:grid-cols-2 ${
            properties.length >= 3 ? "lg:grid-cols-3" : ""
          }`}
        >
          {properties.map((property, index) => (
            <Reveal key={property.slug} delay={index * 90} className="h-full">
              <PropertyCard property={property} />
            </Reveal>
          ))}

          {properties.length < 3 && (
            <Reveal delay={properties.length * 90} className="h-full">
              <PropertyCtaCard />
            </Reveal>
          )}
        </div>
      </Container>
    </section>
  );
}
