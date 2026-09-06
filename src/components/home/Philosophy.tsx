import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { LogoMark } from "@/components/layout/Logo";
import { site } from "@/data/site";

export function Philosophy() {
  return (
    <section className="relative overflow-hidden bg-ink-deep py-24 lg:py-32">
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[460px] w-[760px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-3xl"
        aria-hidden="true"
      />
      <Container className="relative max-w-4xl text-center">
        <Reveal>
          <LogoMark className="mx-auto h-12 w-12 text-accent" />
          <blockquote className="mt-8">
            <p className="balance font-display text-2xl font-bold leading-snug text-white sm:text-[2.25rem] lg:text-[2.75rem]">
              „Ich möchte nicht nur Ihre Immobilie vermitteln.
              <br className="hidden sm:block" /> Ich möchte Ihre langfristige Empfehlung sein.“
            </p>
          </blockquote>
          <p className="mt-8 text-label font-bold uppercase text-white/50">{site.owner}</p>
        </Reveal>
      </Container>
    </section>
  );
}
