import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import { ArrowRight } from "lucide-react";

const base =
  "group/btn inline-flex items-center justify-center gap-2 rounded-[10px] px-5 py-3 text-[0.875rem] font-semibold leading-none tracking-[-0.005em] transition-all duration-300 ease-smooth focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50";

const variants = {
  /** Turquoise — the one primary action per section. */
  primary: "bg-accent-deep text-white hover:bg-accent-dark hover:-translate-y-0.5",
  dark: "bg-ink text-white hover:bg-ink-soft hover:-translate-y-0.5",
  /** For navy surfaces. */
  inverted: "bg-white text-ink hover:bg-accent-soft hover:-translate-y-0.5",
  secondary: "border border-border-strong bg-white text-ink hover:border-accent hover:text-accent-deep hover:-translate-y-0.5",
  secondaryInverted: "border border-white/30 bg-transparent text-white hover:border-white hover:bg-white/10",
  ghost: "px-0 py-0 text-accent-deep hover:text-accent-dark",
} as const;

type Variant = keyof typeof variants;
type Size = "md" | "lg";

const sizes: Record<Size, string> = {
  md: "",
  lg: "px-6 py-3.5 text-[0.9375rem]",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  withArrow?: boolean;
  className?: string;
  children: React.ReactNode;
};

type ButtonAsLink = CommonProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };
type ButtonAsButton = CommonProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

export function Button(props: ButtonAsLink | ButtonAsButton) {
  const { variant = "primary", size = "md", withArrow = false, className = "", children, ...rest } = props;
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;
  const arrow = withArrow ? (
    <ArrowRight
      className="h-4 w-4 transition-transform duration-300 ease-smooth group-hover/btn:translate-x-1"
      aria-hidden="true"
    />
  ) : null;

  if ("href" in props && props.href) {
    const { href: _href, ...anchorRest } = rest as AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <Link href={props.href} className={classes} {...anchorRest}>
        {children}
        {arrow}
      </Link>
    );
  }

  return (
    <button className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
      {arrow}
    </button>
  );
}
