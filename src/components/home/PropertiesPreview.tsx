import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { PropertyCard } from "@/components/property/PropertyCard";
import { getActiveProperties } from "@/data/properties";

export function PropertiesPreview() {
  const propertiesList = getActiveProperties();
  if (propertiesList.length === 0) return null;

  return (
    <section className="py-24 lg:py-32">
      <Container>
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Immobilien"
            size="lg"
            title={
              <>
                Aktuelle Objekte
                <br />
                im Überblick.
              </>
            }
          />
          <Button href="/immobilien" variant="secondary" withArrow className="group shrink-0">
            Alle Immobilien
          </Button>
        </div>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {propertiesList.map((property) => (
            <PropertyCard key={property.slug} property={property} />
          ))}
        </div>
      </Container>
    </section>
  );
}
