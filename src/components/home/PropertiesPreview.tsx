import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { PropertyCard } from "@/components/property/PropertyCard";
import { getActiveProperties } from "@/data/properties";

export async function PropertiesPreview() {
  const propertiesList = await getActiveProperties();
  if (propertiesList.length === 0) return null;

  return (
    <section className="bg-surface py-24 lg:py-28">
      <Container>
        <Reveal>
          <SectionHeading eyebrow="Aktuelle Angebote" size="lg" align="center" title="Aktuelle Immobilien" />
        </Reveal>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {propertiesList.slice(0, 3).map((property, index) => (
            <Reveal key={property.slug} delay={index * 80}>
              <PropertyCard property={property} />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 flex justify-center">
          <Button href="/immobilien" variant="secondary" withArrow className="group">
            Alle Immobilien ansehen
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
