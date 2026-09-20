import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { ExpertIntro } from "@/components/home/ExpertIntro";
import { PropertyShowcase } from "@/components/home/PropertyShowcase";
import { PersonalService } from "@/components/home/PersonalService";
import { ContactIntro } from "@/components/home/ContactIntro";
import { CtaSection } from "@/components/home/CtaSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { webPageSchema } from "@/lib/schema";
import { pageSeo } from "@/lib/seo";
import { site } from "@/data/site";

export const metadata: Metadata = pageSeo({
  title: "Immobilien in Leverkusen — Bewertung, Verkauf & Vermietung",
  description: site.description,
  path: "/",
});

export const revalidate = 60;

/**
 * Startseite.
 *
 * Die Abschnitte stehen in der Reihenfolge des bisherigen Auftritts und
 * tragen dessen Texte. Zwei Abschnitte, die hier einmal standen — eine
 * Leiste mit drei Zusagen und drei Leistungskacheln — hat es dort nie
 * gegeben; sie waren dazugeschrieben und sind entfallen.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <ExpertIntro />
      <PropertyShowcase />
      <PersonalService />
      <CtaSection
        title="Sie planen eine Immobilie zu verkaufen oder brauchen Hilfe das passende zu finden?"
        description={null}
        buttonLabel="Immobilie verkaufen"
        href="/verkaufen"
      />
      <ContactIntro />

      <JsonLd
        data={webPageSchema({
          name: "Immobilien in Leverkusen — Bewertung, Verkauf & Vermietung",
          description: site.description,
          path: "/",
        })}
      />
    </>
  );
}
