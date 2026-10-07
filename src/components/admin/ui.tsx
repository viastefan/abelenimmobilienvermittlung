import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { ArrowLeft } from "lucide-react";
import type { PropertyStatus } from "@/types/property";

/**
 * Bausteine der App.
 *
 * Die App hat genau eine Nutzerin, und die soll nie überlegen müssen, was
 * ein Knopf tut. Deshalb gibt es wenige Formen, und jede bedeutet immer
 * dasselbe: Marine heißt „das ist der nächste Schritt“, Weiß „auch möglich“,
 * Türkis „ist online“. Flächen sind weiß auf kühlem Grund, Kanten eine
 * Haarlinie, Schatten kaum zu sehen — ruhig, damit die Fotos der Objekte
 * die Farbe bringen.
 */

export function klassen(...teile: (string | false | null | undefined)[]): string {
  return teile.filter(Boolean).join(" ");
}

/* ------------------------------------------------------------------ Knöpfe */

const knopfBasis =
  "inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-[14px] text-[0.9375rem] font-semibold leading-none transition-[background-color,color,box-shadow,transform] duration-200 ease-smooth active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50";

export const knopf = {
  primaer: `${knopfBasis} h-12 px-5 bg-ink text-white shadow-[0_1px_2px_rgba(11,37,69,0.25),inset_0_1px_0_rgba(255,255,255,0.08)] hover:bg-ink-soft`,
  zweit: `${knopfBasis} h-12 px-5 bg-white text-ink ring-1 ring-inset ring-border hover:bg-surface-warm hover:ring-border-strong`,
  leise: `${knopfBasis} h-11 px-4 text-text-muted hover:bg-ink/[0.045] hover:text-ink`,
  gefahr: `${knopfBasis} h-11 px-4 text-warning hover:bg-warning-soft`,
  loeschen: `${knopfBasis} h-12 px-5 bg-warning text-white hover:bg-[#86470F]`,
  /** Auf der dunklen Speicherleiste. */
  hell: `${knopfBasis} h-11 px-5 bg-white text-ink hover:bg-accent-tint`,
  hellLeise: `${knopfBasis} h-11 px-4 text-white/75 hover:bg-white/10 hover:text-white`,
  rund: "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-text-muted transition-colors duration-200 hover:bg-ink/[0.05] hover:text-ink active:scale-95",
} as const;

export function KnopfLink({
  href,
  art = "primaer",
  className = "",
  children,
  ...rest
}: { href: string; art?: keyof typeof knopf; className?: string; children: ReactNode } & Omit<
  ComponentProps<typeof Link>,
  "href" | "children" | "className"
>) {
  return (
    <Link href={href} className={klassen(knopf[art], className)} {...rest}>
      {children}
    </Link>
  );
}

/* ------------------------------------------------------------------ Seiten */

export function Seitenkopf({
  titel,
  unterzeile,
  aktion,
  zurueck,
}: {
  titel: ReactNode;
  unterzeile?: ReactNode;
  aktion?: ReactNode;
  zurueck?: { href: string; label: string };
}) {
  return (
    <header className="mb-7 lg:mb-9">
      {zurueck && (
        <Link
          href={zurueck.href}
          className="-ml-2 mb-4 inline-flex items-center gap-1.5 rounded-full px-2 py-1.5 text-[0.875rem] font-semibold text-text-muted transition-colors hover:text-ink"
        >
          <ArrowLeft className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
          {zurueck.label}
        </Link>
      )}
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          <h1 className="balance font-display text-[1.75rem] font-extrabold leading-[1.1] tracking-[-0.028em] text-ink lg:text-[2rem]">
            {titel}
          </h1>
          {unterzeile && <div className="mt-2 text-[0.9375rem] leading-relaxed text-text-muted">{unterzeile}</div>}
        </div>
        {aktion && <div className="flex shrink-0 flex-wrap items-center gap-2">{aktion}</div>}
      </div>
    </header>
  );
}

export function Karte({
  titel,
  beschreibung,
  aktion,
  children,
  className = "",
  id,
}: {
  titel?: ReactNode;
  beschreibung?: ReactNode;
  aktion?: ReactNode;
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={klassen(
        "scroll-mt-28 rounded-[22px] bg-white p-5 shadow-[0_1px_2px_rgba(16,43,78,0.04)] ring-1 ring-[#E6EBEF] sm:p-7",
        className
      )}
    >
      {(titel || aktion) && (
        <header className="mb-5 flex items-start justify-between gap-4 sm:mb-6">
          <div>
            {titel && (
              <h2 className="font-display text-[1.0625rem] font-bold tracking-[-0.012em] text-ink">{titel}</h2>
            )}
            {beschreibung && <p className="mt-1 text-[0.875rem] leading-relaxed text-text-muted">{beschreibung}</p>}
          </div>
          {aktion}
        </header>
      )}
      {children}
    </section>
  );
}

/** Abschnittsüberschrift zwischen Karten, mit Verweis rechts. */
export function Abschnitt({ titel, mehr, children }: { titel: string; mehr?: { href: string; label: string }; children: ReactNode }) {
  return (
    <section className="mt-10 first:mt-0">
      <div className="mb-4 flex items-baseline justify-between gap-4">
        <h2 className="font-display text-[1.125rem] font-bold tracking-[-0.015em] text-ink">{titel}</h2>
        {mehr && (
          <Link href={mehr.href} className="text-[0.875rem] font-semibold text-accent-deep transition-colors hover:text-accent-dark">
            {mehr.label}
          </Link>
        )}
      </div>
      {children}
    </section>
  );
}

/* ------------------------------------------------------------------ Formular */

export const eingabe =
  "block w-full rounded-[14px] bg-white px-4 text-[0.9375rem] text-ink ring-1 ring-inset ring-border transition-shadow duration-200 placeholder:text-text-subtle/70 hover:ring-border-strong focus:outline-none focus:ring-2 focus:ring-accent-deep";

export const eingabeZeile = `${eingabe} h-12`;

/** Für Zeilen mit zwei Feldern nebeneinander — am Telefon mit weniger Innenabstand. */
export const eingabeKompakt =
  "block h-12 w-full rounded-[14px] bg-white px-3 text-[0.9375rem] text-ink ring-1 ring-inset ring-border transition-shadow duration-200 placeholder:text-text-subtle/70 hover:ring-border-strong focus:outline-none focus:ring-2 focus:ring-accent-deep sm:px-4";

export function Feld({
  label,
  hinweis,
  htmlFor,
  optional = false,
  children,
  className = "",
}: {
  label: string;
  hinweis?: ReactNode;
  htmlFor?: string;
  optional?: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="mb-2 flex items-baseline justify-between gap-3">
        <span className="text-[0.875rem] font-semibold text-ink">{label}</span>
        {optional && <span className="text-[0.8125rem] text-text-subtle">optional</span>}
      </label>
      {children}
      {hinweis && <p className="mt-2 text-[0.8125rem] leading-relaxed text-text-muted">{hinweis}</p>}
    </div>
  );
}

/** Eingabefeld mit Einheit am rechten Rand — „m²“, „€“, „Zimmer“. */
export function MitEinheit({ einheit, children }: { einheit: string; children: ReactNode }) {
  return (
    <div className="relative">
      {children}
      <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-[0.9375rem] font-medium text-text-subtle">
        {einheit}
      </span>
    </div>
  );
}

/**
 * Ein-/Aus-Schalter. Ein echtes Kontrollkästchen, nur anders gezeichnet —
 * es lässt sich mit der Tastatur bedienen und landet im Formular wie jedes
 * andere Feld.
 */
export function Schalter({
  name,
  label,
  beschreibung,
  defaultChecked,
  checked,
  onChange,
  disabled,
}: {
  name?: string;
  label: string;
  beschreibung?: ReactNode;
  defaultChecked?: boolean;
  checked?: boolean;
  onChange?: (an: boolean) => void;
  disabled?: boolean;
}) {
  return (
    <label className="group flex cursor-pointer items-start justify-between gap-5 py-1">
      <span className="min-w-0">
        <span className="block text-[0.9375rem] font-semibold text-ink">{label}</span>
        {beschreibung && <span className="mt-1 block text-[0.8125rem] leading-relaxed text-text-muted">{beschreibung}</span>}
      </span>
      <span className="relative mt-0.5 inline-flex shrink-0">
        <input
          type="checkbox"
          role="switch"
          name={name}
          defaultChecked={defaultChecked}
          checked={checked}
          onChange={onChange ? (event) => onChange(event.target.checked) : undefined}
          disabled={disabled}
          className="peer sr-only"
        />
        <span className="h-[1.75rem] w-[3rem] rounded-full bg-[#D3DCE3] transition-colors duration-200 ease-smooth peer-checked:bg-accent-deep peer-focus-visible:ring-2 peer-focus-visible:ring-accent-deep peer-focus-visible:ring-offset-2 peer-disabled:opacity-50" />
        <span className="absolute left-[0.1875rem] top-[0.1875rem] h-[1.375rem] w-[1.375rem] rounded-full bg-white shadow-[0_1px_3px_rgba(11,37,69,0.25)] transition-transform duration-200 ease-smooth peer-checked:translate-x-[1.25rem]" />
      </span>
    </label>
  );
}

/**
 * Auswahl aus wenigen Möglichkeiten, nebeneinander — wie in den
 * Einstellungen eines Telefons. Darunter liegen Optionsfelder.
 */
export function Auswahl<T extends string>({
  name,
  optionen,
  defaultValue,
  value,
  onChange,
  label,
}: {
  name: string;
  optionen: { value: T; label: string; punkt?: string }[];
  defaultValue?: T;
  value?: T;
  onChange?: (value: T) => void;
  label: string;
}) {
  return (
    <div role="radiogroup" aria-label={label} className="flex rounded-[15px] bg-surface-cool p-1 ring-1 ring-inset ring-[#E6EBEF]">
      {optionen.map((option) => (
        <label
          key={option.value}
          className="relative flex min-h-[2.75rem] flex-1 cursor-pointer items-center justify-center gap-2 rounded-[11px] px-1.5 text-center text-[0.8125rem] font-semibold sm:px-2 sm:text-[0.875rem] text-text-muted transition-all duration-200 ease-smooth hover:text-ink has-[:checked]:bg-white has-[:checked]:text-ink has-[:checked]:shadow-[0_1px_3px_rgba(11,37,69,0.12)] has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-accent-deep"
        >
          <input
            type="radio"
            name={name}
            value={option.value}
            defaultChecked={defaultValue === undefined ? undefined : defaultValue === option.value}
            checked={value === undefined ? undefined : value === option.value}
            onChange={onChange ? () => onChange(option.value) : undefined}
            className="sr-only"
          />
          {option.punkt && <span className={klassen("hidden h-2 w-2 shrink-0 rounded-full sm:block", option.punkt)} aria-hidden="true" />}
          <span className="leading-tight">{option.label}</span>
        </label>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ Zeichen */

export const objektStatus: Record<PropertyStatus, { label: string; chip: string; punkt: string }> = {
  "zu-verkaufen": { label: "Zu verkaufen", chip: "bg-accent-soft text-accent-dark", punkt: "bg-accent-deep" },
  reserviert: { label: "Reserviert", chip: "bg-warning-soft text-warning", punkt: "bg-[#D08A3E]" },
  verkauft: { label: "Verkauft", chip: "bg-[#EEF1F4] text-text-muted", punkt: "bg-text-subtle" },
};

export function StatusChip({ status, className = "" }: { status: PropertyStatus; className?: string }) {
  const art = objektStatus[status];
  return (
    <span className={klassen("inline-flex items-center rounded-full px-2.5 py-1 text-[0.75rem] font-semibold", art.chip, className)}>
      {art.label}
    </span>
  );
}

export function OnlineChip({ online, className = "" }: { online: boolean; className?: string }) {
  return (
    <span
      className={klassen(
        "inline-flex items-center gap-1.5 text-[0.8125rem] font-semibold",
        online ? "text-success" : "text-text-subtle",
        className
      )}
    >
      <span className="relative flex h-2 w-2" aria-hidden="true">
        {online && <span className="absolute inset-0 animate-ping rounded-full bg-success/40 [animation-duration:2.4s]" />}
        <span className={klassen("relative h-2 w-2 rounded-full", online ? "bg-success" : "bg-[#C4CDD5]")} />
      </span>
      {online ? "Online" : "Offline"}
    </span>
  );
}

export function Zaehler({ anzahl, className = "" }: { anzahl: number; className?: string }) {
  return (
    <span
      className={klassen(
        "inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-accent-deep px-1.5 text-[0.6875rem] font-bold tabular-nums text-white",
        className
      )}
    >
      {anzahl}
    </span>
  );
}

export function Leer({
  symbol,
  titel,
  text,
  aktion,
}: {
  symbol: ReactNode;
  titel: string;
  text: string;
  aktion?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center rounded-[22px] bg-white px-6 py-14 text-center ring-1 ring-[#E6EBEF]">
      <span className="flex h-14 w-14 items-center justify-center rounded-[18px] bg-accent-soft text-accent-deep">{symbol}</span>
      <p className="mt-5 font-display text-[1.0625rem] font-bold text-ink">{titel}</p>
      <p className="mt-2 max-w-sm text-[0.9375rem] leading-relaxed text-text-muted">{text}</p>
      {aktion && <div className="mt-7">{aktion}</div>}
    </div>
  );
}
