import type { ReactNode } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  light?: boolean;
  size?: "md" | "lg";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  light = false,
  size = "md",
  className = "",
}: SectionHeadingProps) {
  return (
    <div className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""} ${className}`}>
      {eyebrow && (
        <Eyebrow light={light} className={align === "center" ? "mx-auto" : ""}>
          {eyebrow}
        </Eyebrow>
      )}
      <h2
        className={`balance mt-3 font-display font-bold ${
          size === "lg" ? "text-display-lg" : "text-display-md"
        } ${light ? "text-white" : "text-ink"}`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`pretty mt-4 text-[0.9375rem] leading-relaxed ${
            light ? "text-white/70" : "text-text-muted"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
