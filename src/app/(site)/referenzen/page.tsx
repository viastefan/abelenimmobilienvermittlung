import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { ReferenceGrid, type ReferenceCardItem } from "@/components/references/ReferenceGrid";
import { CtaSection } from "@/components/home/CtaSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { pageSeo } from "@/lib/seo";
import { getPublishedReferences } from "@/data/references";
import { resolveFirstImage, resolveImage } from "@/lib/imagery";
import { images } from "@/data/imagery";

export const metadata: Metadata = pageSeo({
  title: "Referenzen — erfolgreich vermittelte Immobilien",
  description:
    "Ein Auszug erfolgreich verkaufter und vermieteter Immobilien in Leverkusen und Umgebung — Einfamilienhäuser, Reihenhäuser, Wohnungen und Mehrfamilienhäuser.",
  path: "/referenzen",
});

export const revalidate = 60;

export default async function ReferenzenPage() {
  const references = await getPublishedReferences();
  const items: ReferenceCardItem[] = references.map((item) => ({
    ...item,
    resolvedImage: resolveFirstImage(item.images),
  }));

  return (
    <>
      <PageHero
        eyebrow="Referenzen"
        title={
          <>
            Erfolgreich vermittelte
            <br className="hidden sm:block" /> Immobilien
          </>
        }
        description="Ein Auszug unserer erfolgreich verkauften und vermieteten Immobilien in Leverkusen und Umgebung."
        breadcrumbs={[{ label: "Startseite", href: "/" }, { label: "Referenzen" }]}
        withMedia
        image={resolveImage(images.referenzen)}
        imageAlt="Wohnhäuser in Leverkusen, wie sie regelmäßig vermittelt werden"
      />

      <section className="py-14 lg:py-20">
        <Container>
          <ReferenceGrid references={items} />

          <p className="mt-14 max-w-2xl text-[0.8125rem] leading-relaxed text-text-subtle">
            Hinweis: Aus Rücksicht auf unsere Auftraggeberinnen und Auftraggeber zeigen wir
            Referenzobjekte ohne Adresse und ohne veröffentlichten Kaufpreis. Gerne sprechen wir im
            persönlichen Gespräch über vergleichbare Objekte in Ihrer Lage.
          </p>
        </Container>
      </section>

      <CtaSection
        title="Sie möchten Ihre Immobilie verkaufen oder vermieten?"
        description="Wir finden den passenden Käufer oder Mieter — persönlich und regional."
        buttonLabel="Immobilie bewerten"
        href="/bewertung"
      />

      <JsonLd
        data={breadcrumbSchema([
          { name: "Start", path: "/" },
          { name: "Referenzen", path: "/referenzen" },
        ])}
      />
    </>
  );
}
