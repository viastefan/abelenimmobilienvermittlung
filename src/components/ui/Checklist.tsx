import { Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export type ChecklistGroup = {
  title: string;
  items: readonly string[];
};

export function Checklist({
  eyebrow,
  title,
  description,
  groups,
  className = "",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  groups: readonly ChecklistGroup[];
  className?: string;
}) {
  return (
    <section className={`bg-surface-cool py-16 lg:py-20 ${className}`}>
      <Container>
        <Reveal>
          <SectionHeading eyebrow={eyebrow} title={title} description={description} />
        </Reveal>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {groups.map((group, index) => (
            <Reveal key={group.title} delay={index * 90} className="h-full">
              <div className="flex h-full flex-col rounded-[12px] border border-border bg-white p-6">
                <h3 className="font-display text-[0.9375rem] font-bold text-ink">{group.title}</h3>
                <ul className="mt-4 space-y-2.5">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-[0.8125rem] leading-relaxed text-text-muted">
                      <Check className="mt-[3px] h-3.5 w-3.5 shrink-0 text-accent-deep" strokeWidth={2.4} aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
