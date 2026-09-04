import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import { ArrowRight } from "lucide-react";

const base =
  "inline-flex items-center justify-center gap-2 rounded-md px-6 py-3.5 text-sm font-semibold transition-all duration-300 ease-smooth focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none";

const variants = {
  primary: "bg-accent text-white hover:bg-accent-dark hover:-translate-y-0.5",
  dark: "bg-ink text-white hover:bg-ink-soft hover:-translate-y-0.5",
  // For use on dark (ink) backgrounds, e.g. the hero or CTA sections.
  inverted: "bg-white text-ink hover:bg-accent hover:text-white hover:-translate-y-0.5",
  secondary:
    "bg-transparent text-ink border border-border hover:border-ink hover:-translate-y-0.5",
  secondaryInverted:
    "bg-transparent text-white border border-white/30 hover:border-white hover:-translate-y-0.5",
  ghost: "bg-transparent text-ink px-0 py-0 hover:text-accent",
} as const;

type Variant = keyof typeof variants;

type CommonProps = {
  variant?: Variant;
  withArrow?: boolean;
  className?: string;
  children: React.ReactNode;
};

type ButtonAsLink = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

export function Button(props: ButtonAsLink | ButtonAsButton) {
  const { variant = "primary", withArrow = false, className = "", children, ...rest } = props;
  const classes = `${base} ${variants[variant]} ${className}`;

  if ("href" in props && props.href) {
    const { href, ...anchorRest } = rest as AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <Link href={props.href} className={classes} {...anchorRest}>
        {children}
        {withArrow && <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />}
      </Link>
    );
  }

  return (
    <button className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
      {withArrow && <ArrowRight className="h-4 w-4" aria-hidden="true" />}
    </button>
  );
}
