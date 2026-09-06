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
    <ul className={`flex flex-wrap gap-3 ${className}`}>
      {trustBadges.map((badge, index) => {
        const Icon = icons[index % icons.length]!;
        return (
          <li
            key={badge.title}
            className="flex w-full items-center gap-3 rounded-[14px] border border-border bg-white/85 px-4 py-3 shadow-card backdrop-blur-sm sm:w-auto"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent-deep">
              <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
            </span>
            <span className="leading-snug sm:max-w-[11.5rem]">
              <span className="block text-[0.8125rem] font-bold text-ink">{badge.title}</span>
              <span className="block text-[0.75rem] text-text-muted">{badge.subtitle}</span>
              <span className="mt-0.5 block text-[0.625rem] font-bold uppercase tracking-[0.14em] text-accent-deep">
                {badge.issuer}
              </span>
            </span>
          </li>
        );
      })}
    </ul>
  );
}
