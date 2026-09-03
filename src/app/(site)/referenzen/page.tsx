import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { PropertyPlaceholder } from "@/components/graphics/PropertyPlaceholder";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { pageSeo } from "@/lib/seo";
import { references } from "@/data/references";

export const metadata: Metadata = pageSeo({
  title: "Referenzen — erfolgreich vermittelte Immobilien",
  description:
    "Ein Einblick in die Objektarten, die Abelen Immobilien regelmäßig in Leichlingen, Leverkusen, Solingen und der Region erfolgreich vermittelt.",
  path: "/referenzen",
});

const sizeClasses: Record<string, string> = {
  tall: "row-span-2",
  wide: "sm:col-span-2",
  square: "",
};

export default function ReferenzenPage() {
  return (
    <>
      <PageHero
        eyebrow="Erfolgreich vermittelt"
        title="Vertrauen entsteht, wenn Ergebnisse sichtbar werden."
        description="Eine Auswahl der Objektarten, die wir regelmäßig in der Region begleiten — von der Eigentumswohnung bis zum Mehrfamilienhaus."
      />

      <section className="py-20 lg:py-28">
        <Container>
          <div className="grid auto-rows-[220px] grid-cols-2 gap-4 sm:grid-cols-3 lg:auto-rows-[260px]">
            {references.map((item) => (
              <div
                key={`${item.type}-${item.region}`}
                className={`group relative overflow-hidden rounded-md ${sizeClasses[item.size]}`}
              >
                <div className="absolute inset-0 transition-transform duration-700 ease-smooth group-hover:scale-105">
                  <PropertyPlaceholder label="" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/0 to-ink/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute inset-x-0 bottom-0 translate-y-2 p-5 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <p className="font-display text-sm font-semibold text-white">{item.type}</p>
                  <p className="text-xs text-white/70">{item.region} · Erfolgreich vermittelt</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <JsonLd
        data={breadcrumbSchema([
          { name: "Start", path: "/" },
          { name: "Referenzen", path: "/referenzen" },
        ])}
      />
    </>
  );
}
