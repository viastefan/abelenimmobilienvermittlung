import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  light?: boolean;
  size?: "md" | "lg";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  light = false,
  size = "md",
}: SectionHeadingProps) {
  return (
    <div className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {eyebrow && (
        <p
          className={`mb-4 text-xs font-semibold uppercase tracking-[0.18em] ${
            light ? "text-white/60" : "text-accent"
          } ${align === "center" ? "flex items-center justify-center gap-2" : "flex items-center gap-2"}`}
        >
          <span className={`h-px w-6 ${light ? "bg-white/40" : "bg-accent"}`} aria-hidden="true" />
          {eyebrow}
        </p>
      )}
      <h2
        className={`balance font-display font-semibold ${
          size === "lg" ? "text-display-lg" : "text-display-md"
        } ${light ? "text-white" : "text-ink"}`}
      >
        {title}
      </h2>
      {description && (
        <p className={`mt-5 text-base leading-relaxed ${light ? "text-white/70" : "text-text-muted"}`}>
          {description}
        </p>
      )}
    </div>
  );
}
