import Link from "next/link";
import type { ReactNode } from "react";

/** Gemeinsame Bausteine des Admin-Panels — ruhig, flach, ohne Zierrat. */

export const inputClass =
  "w-full rounded-[14px] bg-white shadow-soft px-3.5 py-2.5 text-[0.875rem] text-ink transition-colors placeholder:text-text-subtle focus:border-accent focus:outline-none";

export const selectClass = `${inputClass} appearance-none bg-[length:16px] bg-[right_0.85rem_center] bg-no-repeat pr-10`;

export function Field({
  label,
  children,
  hint,
  htmlFor,
}: {
  label: string;
  children: ReactNode;
  hint?: string;
  htmlFor?: string;
}) {
  return (
    <label className="block" htmlFor={htmlFor}>
      <span className="mb-1.5 block text-[0.8125rem] font-semibold text-ink">{label}</span>
      {children}
      {hint && <span className="mt-1.5 block text-[0.75rem] leading-relaxed text-text-subtle">{hint}</span>}
    </label>
  );
}

export function Panel({
  title,
  description,
  children,
  className = "",
}: {
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`rounded-[24px] bg-white shadow-soft p-6 ${className}`}>
      {title && (
        <header className="mb-5">
          <h2 className="font-display text-[0.9375rem] font-bold text-ink">{title}</h2>
          {description && <p className="mt-1 text-[0.8125rem] text-text-muted">{description}</p>}
        </header>
      )}
      {children}
    </section>
  );
}

export function AdminPageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
      <div>
        <h1 className="font-display text-[1.375rem] font-extrabold tracking-[-0.015em] text-ink">{title}</h1>
        {description && <p className="mt-1 text-[0.8125rem] text-text-muted">{description}</p>}
      </div>
      {action}
    </div>
  );
}

const buttonBase =
  "inline-flex items-center justify-center gap-2 rounded-[14px] px-4 py-2.5 text-[0.8125rem] font-semibold leading-none transition-all duration-200 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50";

export const adminButton = {
  primary: `${buttonBase} bg-accent-deep text-white hover:bg-accent-dark`,
  secondary: `${buttonBase} border border-border-strong bg-white text-ink hover:border-accent hover:text-accent-deep`,
  ghost: `${buttonBase} text-text-muted hover:bg-surface-cool hover:text-ink`,
  danger: `${buttonBase} bg-white shadow-soft text-warning hover:border-warning hover:bg-warning-soft`,
} as const;

export function AdminLink({
  href,
  variant = "primary",
  children,
  ...rest
}: {
  href: string;
  variant?: keyof typeof adminButton;
  children: ReactNode;
} & Omit<React.ComponentProps<typeof Link>, "href" | "children">) {
  return (
    <Link href={href} className={adminButton[variant]} {...rest}>
      {children}
    </Link>
  );
}

export function StatusPill({ published }: { published: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.6875rem] font-bold uppercase tracking-[0.08em] ${
        published ? "bg-success-soft text-success" : "bg-surface-cool text-text-muted"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${published ? "bg-success" : "bg-text-subtle"}`}
        aria-hidden="true"
      />
      {published ? "Live" : "Entwurf"}
    </span>
  );
}

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="rounded-[24px] border border-dashed border-border-strong bg-white p-10 text-center">
      <p className="font-display text-[0.9375rem] font-bold text-ink">{title}</p>
      <p className="mx-auto mt-2 max-w-sm text-[0.8125rem] leading-relaxed text-text-muted">{description}</p>
      {action && <div className="mt-6 flex justify-center">{action}</div>}
    </div>
  );
}
