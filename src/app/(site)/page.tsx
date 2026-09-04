import { Hero } from "@/components/home/Hero";
import { Intro } from "@/components/home/Intro";
import { Services } from "@/components/home/Services";
import { About } from "@/components/home/About";
import { PropertiesPreview } from "@/components/home/PropertiesPreview";
import { CtaSection } from "@/components/home/CtaSection";

export const revalidate = 60;

export default function HomePage() {
  return (
    <>
      <Hero />
      <Intro />
      <Services />
      <About />
      <PropertiesPreview />
      <CtaSection />
    </>
  );
}
