import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { PropertyCard } from "@/components/property/PropertyCard";
import { PropertyCtaCard } from "@/components/property/PropertyCtaCard";
import { getActiveProperties, getFeaturedActiveProperty } from "@/data/properties";

export async function PropertiesPreview() {
  const [active, featured] = await Promise.all([getActiveProperties(), getFeaturedActiveProperty()]);
  // The featured object already has its own block further up the page.
  const properties = active.filter((property) => property.slug !== featured?.slug).slice(0, 3);
  if (properties.length === 0) return null;

  return (
    <section className="bg-white py-16 lg:py-20">
      <Container>
        <Reveal className="relative">
          <SectionHeading eyebrow="Weitere Angebote" align="center" title="Weitere Immobilien" />
          <div className="mt-6 flex justify-center lg:absolute lg:right-0 lg:top-1/2 lg:mt-0 lg:-translate-y-1/2">
            <Button href="/immobilien" variant="secondary" className="text-[0.8125rem]">
              Alle Immobilien ansehen
            </Button>
          </div>
        </Reveal>

        <div
          className={`mt-10 grid gap-5 sm:grid-cols-2 ${
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
