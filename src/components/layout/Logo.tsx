export function LogoMark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden="true">
      <path
        d="M6 20 L20 7 L34 20"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 17.5V33.5H30V17.5"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.55"
      />
      <path
        d="M17 33.5V24.5H23V33.5"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <LogoMark className="h-8 w-8 shrink-0 text-accent sm:h-9 sm:w-9" />
      <span className="flex flex-col leading-[1.15]">
        <span className="text-[11px] font-semibold uppercase tracking-[0.08em]">
          Büro für Immobilien
          <br />
          Bewertung &amp; Vermittlung
        </span>
        <span className="mt-0.5 text-sm font-bold uppercase tracking-[0.06em]">Silke Abelen</span>
      </span>
    </span>
  );
}
