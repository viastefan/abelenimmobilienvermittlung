import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";

export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
}) {
  return (
    <section className="border-b border-border bg-surface-soft pb-16 pt-40 lg:pb-20 lg:pt-48">
      <Container className="max-w-3xl">
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h1 className="balance mt-6 text-display-lg font-display font-semibold text-ink">{title}</h1>
        {description && (
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-text-muted">{description}</p>
        )}
      </Container>
    </section>
  );
}
