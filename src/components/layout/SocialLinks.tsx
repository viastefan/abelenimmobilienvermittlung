import { Linkedin, Instagram, Facebook } from "lucide-react";
import { socials } from "@/data/site";

const icons = { linkedin: Linkedin, instagram: Instagram, facebook: Facebook } as const;

/** Renders only profiles that actually have a URL configured. */
export function SocialLinks({ className = "", iconClassName = "h-4 w-4" }: { className?: string; iconClassName?: string }) {
  const available = socials.filter((item) => item.href.trim().length > 0);
  if (available.length === 0) return null;

  return (
    <ul className={`flex items-center gap-3 ${className}`}>
      {available.map((item) => {
        const Icon = icons[item.icon];
        return (
          <li key={item.label}>
            <a
              href={item.href}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={item.label}
              className="inline-flex text-current opacity-70 transition-opacity duration-200 hover:opacity-100"
            >
              <Icon className={iconClassName} aria-hidden="true" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
