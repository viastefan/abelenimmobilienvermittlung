import { Award, ShieldCheck } from "lucide-react";
import { trustBadges } from "@/data/site";

const icons = [ShieldCheck, Award];

/**
 * Qualification badges. Deliberately typeset in the site's own type rather
 * than imitating the issuers' logos — it states the qualification without
 * reproducing third-party branding.
 */
export function TrustBadges({ className = "" }: { className?: string }) {
  return (
    <ul className={`flex flex-col gap-2.5 sm:flex-row sm:flex-wrap ${className}`}>
      {trustBadges.map((badge, index) => {
        const Icon = icons[index % icons.length]!;
        return (
          <li
            key={badge.title}
            className="flex w-full items-center gap-3 rounded-[12px] border border-border bg-white px-4 py-3 shadow-card sm:w-auto"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent-deep">
              <Icon className="h-4 w-4" aria-hidden="true" />
            </span>
            <span className="leading-snug sm:max-w-[11.5rem]">
              <span className="block text-[0.8125rem] font-bold leading-tight text-ink">{badge.title}</span>
              <span className="mt-0.5 block text-[0.6875rem] leading-snug text-text-muted">{badge.subtitle}</span>
            </span>
          </li>
        );
      })}
    </ul>
  );
}
