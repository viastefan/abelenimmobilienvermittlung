import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SnapCarousel } from "@/components/ui/SnapCarousel";
import { PropertyCard } from "@/components/property/PropertyCard";
import { PropertyCtaCard } from "@/components/property/PropertyCtaCard";
import { getActiveProperties, getFeaturedActiveProperty } from "@/data/properties";
import { resolveImages } from "@/lib/imagery";

export async function PropertiesPreview() {
  const [active, featured] = await Promise.all([getActiveProperties(), getFeaturedActiveProperty()]);
  // Das hervorgehobene Objekt hat weiter oben seinen eigenen Block.
  const properties = active.filter((property) => property.slug !== featured?.slug);
  if (properties.length === 0) return null;

  const items = [
    ...properties.map((property) => ({
      key: property.slug,
      node: <PropertyCard property={property} images={resolveImages(property.images)} />,
    })),
    { key: "__suchprofil", node: <PropertyCtaCard /> },
  ];

  return (
    <section className="overflow-hidden bg-white py-14 lg:py-20">
      <Container>
        <Reveal className="relative">
          <SectionHeading eyebrow="Weitere Angebote" align="center" title="Weitere Immobilien" />
          <div className="mt-6 flex justify-center lg:absolute lg:right-0 lg:top-1/2 lg:mt-0 lg:-translate-y-1/2">
            <Button href="/immobilien" variant="secondary" className="text-[0.8125rem]">
              Alle Immobilien ansehen
            </Button>
          </div>
        </Reveal>
      </Container>

      <Reveal className="mx-auto mt-10 w-full max-w-content">
        <SnapCarousel
          label="Weitere Immobilien"
          items={items}
          itemClassName="basis-[84%] sm:basis-[46%] lg:basis-[31.5%]"
        />
      </Reveal>
    </section>
  );
}
