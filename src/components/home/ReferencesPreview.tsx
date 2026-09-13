import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SiteImage } from "@/components/graphics/SiteImage";
import { resolveFirstImage } from "@/lib/imagery";
import { getPublishedReferences } from "@/data/references";

export async function ReferencesPreview() {
  const references = (await getPublishedReferences()).slice(0, 3);
  if (references.length === 0) return null;

  return (
    <section className="bg-white py-16 lg:py-20">
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

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {references.map((reference, index) => (
            <Reveal key={reference.slug} delay={index * 90} className="h-full">
              <Link
                href={`/referenzen/${reference.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-[12px] border border-border bg-white transition-all duration-300 ease-smooth hover:-translate-y-1 hover:border-accent-light hover:shadow-soft"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-surface-mist">
                  <div className="h-full w-full transition-transform duration-700 ease-smooth group-hover:scale-[1.04]">
                    <SiteImage
                      src={resolveFirstImage(reference.images)}
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      label={reference.region}
                      alt={`${reference.typeLabel || reference.title} in ${reference.region}`}
                    />
                  </div>
                  <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-[0.6875rem] font-bold uppercase tracking-[0.1em] text-ink shadow-card backdrop-blur">
                    {reference.categoryLabel}
                  </span>
                </div>

                <div className="flex flex-1 flex-col px-5 py-4">
                  <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-accent-deep">
                    {reference.region}
                  </p>
                  <h3 className="mt-1.5 font-display text-[0.9375rem] font-bold leading-snug text-ink">
                    {reference.title}
                  </h3>
                  <p className="mt-1 text-[0.75rem] text-text-muted">{reference.typeLabel}</p>
                  <span className="mt-auto inline-flex items-center gap-2 pt-4 text-[0.8125rem] font-semibold text-accent-deep">
                    Objekt ansehen
                    <ArrowRight
                      className="h-3.5 w-3.5 transition-transform duration-300 ease-smooth group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
