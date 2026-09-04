import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { ReferenceGrid } from "@/components/references/ReferenceGrid";
import { CtaSection } from "@/components/home/CtaSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { pageSeo } from "@/lib/seo";
import { references } from "@/data/references";

export const metadata: Metadata = pageSeo({
  title: "Referenzen — erfolgreich vermittelte Immobilien",
  description:
    "Eine Auswahl erfolgreich vermittelter Immobilien in Leverkusen und Umgebung — verkauft und vermietet.",
  path: "/referenzen",
});

export default function ReferenzenPage() {
  return (
    <>
      <section className="bg-ink pb-16 pt-40 lg:pb-20 lg:pt-48">
        <Container className="max-w-3xl">
          <h1 className="balance font-display text-display-lg font-semibold text-white">Unsere Referenzen</h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/70">
            Eine Auswahl erfolgreich vermittelter Immobilien in Leverkusen und Umgebung.
          </p>
        </Container>
      </section>

      <section className="py-16 lg:py-24">
        <Container>
          <ReferenceGrid references={references} />
        </Container>
      </section>

      <CtaSection
        title="Sie möchten Ihre Immobilie verkaufen oder vermieten?"
        description="Wir finden den passenden Käufer oder Mieter für Ihre Immobilie."
        buttonLabel="Kontakt aufnehmen"
        href="/kontakt"
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
