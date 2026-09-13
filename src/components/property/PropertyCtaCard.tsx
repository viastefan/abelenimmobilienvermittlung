import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";

/**
 * Fills the listings grid when fewer objects are online than the grid has
 * columns — a useful next step instead of an empty column.
 */
export function PropertyCtaCard({
  title = "Sie suchen etwas Bestimmtes?",
  description = "Nicht jedes Objekt wird öffentlich beworben. Sagen Sie uns, wonach Sie suchen — wir melden uns, sobald etwas Passendes dabei ist.",
  href = "/kontakt?anliegen=kaufen",
  label = "Suchprofil hinterlegen",
}: {
  title?: string;
  description?: string;
  href?: string;
  label?: string;
}) {
  return (
    <Link
      href={href}
      className="group flex h-full min-h-[20rem] flex-col justify-center rounded-[16px] border border-dashed border-border-strong bg-surface-warm p-8 transition-all duration-300 ease-smooth hover:-translate-y-1 hover:border-accent hover:bg-accent-tint"
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-[12px] bg-white text-accent-deep">
        <Search className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
      </span>
      <h3 className="mt-6 font-display text-[1.125rem] font-bold text-ink">{title}</h3>
      <p className="pretty mt-3 text-[0.9375rem] leading-relaxed text-text-muted">{description}</p>
      <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent-deep">
        {label}
        <ArrowRight
          className="h-4 w-4 transition-transform duration-300 ease-smooth group-hover:translate-x-1"
          aria-hidden="true"
        />
      </span>
    </Link>
  );
}
