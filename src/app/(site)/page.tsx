import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { ExpertIntro } from "@/components/home/ExpertIntro";
import { PropertyShowcase } from "@/components/home/PropertyShowcase";
import { PersonalService } from "@/components/home/PersonalService";
import { ContactIntro } from "@/components/home/ContactIntro";
import { Abschluss } from "@/components/home/Abschluss";
import { JsonLd } from "@/components/seo/JsonLd";
import { webPageSchema } from "@/lib/schema";
import { pageSeo } from "@/lib/seo";
import { site } from "@/data/site";

export const metadata: Metadata = pageSeo({
  title: "Immobilien in Leverkusen — Bewertung, Verkauf & Vermittlung",
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
      <ContactIntro />
      {/* Der Abschluss steht ganz unten, als breite Karte über der Fußzeile —
          direkt unter „Persönlich, Verlässlich…“ las er sich wie ein zweiter
          Gedanke im selben Abschnitt. */}
      <Abschluss
        title="Sie planen eine Immobilie zu verkaufen oder brauchen Hilfe, das Passende zu finden?"
        buttonLabel="Immobilie verkaufen"
        href="/verkaufen"
      />

      <JsonLd
        data={webPageSchema({
          name: "Immobilien in Leverkusen — Bewertung, Verkauf & Vermittlung",
          description: site.description,
          path: "/",
        })}
      />
    </>
  );
}
