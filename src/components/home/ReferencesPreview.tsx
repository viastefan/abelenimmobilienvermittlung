import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SnapCarousel } from "@/components/ui/SnapCarousel";
import { ReferenceCard } from "@/components/references/ReferenceCard";
import { resolveImages } from "@/lib/imagery";
import { getPublishedReferences } from "@/data/references";

export async function ReferencesPreview() {
  const references = (await getPublishedReferences()).slice(0, 9);
  if (references.length === 0) return null;

  return (
    <section className="overflow-hidden bg-surface-warm py-16 lg:py-24">
      <Container>
        <Reveal className="relative">
          <SectionHeading
            eyebrow="Referenzen"
            align="center"
            title="Erfolgreich vermittelt"
            description="Ein Auszug aus den Objekten, die wir in Leverkusen und Umgebung begleitet haben."
          />
          <div className="mt-6 flex justify-center lg:absolute lg:right-0 lg:top-1/2 lg:mt-0 lg:-translate-y-1/2">
            <Button href="/referenzen" variant="secondary" className="text-[0.8125rem]">
              Alle Referenzen
            </Button>
          </div>
        </Reveal>
      </Container>

      {/* Eine Spur, die nicht scrollt, ist keine Galerie, sondern eine Karte
          mit Punkten darunter. Bis zu zwei Referenzen stehen deshalb als
          zentriertes Raster — die Diashow beginnt bei dreien. */}
      {references.length < 3 ? (
        <Container>
          <Reveal
            className={`mx-auto mt-10 grid gap-5 ${
              references.length === 1 ? "max-w-md" : "max-w-4xl sm:grid-cols-2"
            }`}
          >
            {references.map((reference) => (
              <ReferenceCard
                key={reference.slug}
                reference={reference}
                images={resolveImages(reference.images)}
                sizes="(min-width: 640px) 46vw, 90vw"
                compact
              />
            ))}
          </Reveal>
        </Container>
      ) : (
        <Reveal className="mx-auto mt-10 w-full max-w-content">
          <SnapCarousel
            label="Referenzobjekte"
            items={references.map((reference) => ({
              key: reference.slug,
              node: (
                <ReferenceCard
                  reference={reference}
                  images={resolveImages(reference.images)}
                  sizes="(min-width: 1024px) 32vw, (min-width: 640px) 46vw, 84vw"
                  compact
                />
              ),
            }))}
          />
        </Reveal>
      )}
    </section>
  );
}
