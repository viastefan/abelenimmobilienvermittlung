import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { TrustStrip } from "@/components/home/TrustStrip";
import { Services } from "@/components/home/Services";
import { About } from "@/components/home/About";
import { FeaturedProperty } from "@/components/home/FeaturedProperty";
import { ReferencesPreview } from "@/components/home/ReferencesPreview";
import { PropertiesPreview } from "@/components/home/PropertiesPreview";
import { PersonalService } from "@/components/home/PersonalService";
import { ContactIntro } from "@/components/home/ContactIntro";
import { CtaSection } from "@/components/home/CtaSection";
import { pageSeo } from "@/lib/seo";
import { site } from "@/data/site";

export const metadata: Metadata = pageSeo({
  title: "Immobilien in Leverkusen — Bewertung, Verkauf & Vermietung",
  description: site.description,
  path: "/",
});

export const revalidate = 60;

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <Services />
      <FeaturedProperty />
      <About />
      <PropertiesPreview />
      <ReferencesPreview />
      <PersonalService />
      <ContactIntro />
      <CtaSection
        title="Sie planen eine Immobilie zu verkaufen oder brauchen Hilfe das passende zu finden?"
        description={null}
        buttonLabel="Immobilie verkaufen"
        href="/verkaufen"
      />
    </>
  );
}
