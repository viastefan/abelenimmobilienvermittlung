import { Hero } from "@/components/home/Hero";
import { Intro } from "@/components/home/Intro";
import { Services } from "@/components/home/Services";
import { FeaturedProperty } from "@/components/home/FeaturedProperty";
import { PropertiesPreview } from "@/components/home/PropertiesPreview";
import { ReferencesPreview } from "@/components/home/ReferencesPreview";
import { About } from "@/components/home/About";
import { Philosophy } from "@/components/home/Philosophy";
import { RegionSection } from "@/components/home/RegionSection";
import { Process } from "@/components/home/Process";
import { WhyAbelen } from "@/components/home/WhyAbelen";
import { CtaSection } from "@/components/home/CtaSection";

export const revalidate = 60;

export default function HomePage() {
  return (
    <>
      <Hero />
      <Intro />
      <Services />
      <FeaturedProperty />
      <PropertiesPreview />
      <ReferencesPreview />
      <About />
      <Philosophy />
      <RegionSection />
      <Process />
      <WhyAbelen />
      <CtaSection />
    </>
  );
}
