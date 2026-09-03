import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/data/site";

export function Philosophy() {
  return (
    <section className="bg-ink py-28 lg:py-40">
      <Container className="max-w-4xl text-center">
        <Reveal>
          <blockquote>
            <p className="balance font-display text-2xl font-medium leading-snug text-white sm:text-4xl lg:text-5xl">
              „Ich möchte nicht nur Ihre Immobilie verkaufen.
              <br className="hidden sm:block" /> Ich möchte Ihre langfristige Empfehlung sein.“
            </p>
          </blockquote>
          <p className="mt-8 text-sm uppercase tracking-[0.14em] text-white/50">{site.owner}</p>
        </Reveal>
      </Container>
    </section>
  );
}
