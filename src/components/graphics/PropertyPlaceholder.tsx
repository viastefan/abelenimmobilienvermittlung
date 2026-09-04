import { FacadeMotif } from "./ArchMotif";

/**
 * Art-directed stand-in shown until real listing photography is added for a
 * property. Deliberately not a stock photo: pairing invented imagery with a
 * real address/price would misrepresent the actual listing.
 */
export function PropertyPlaceholder({
  label,
  className = "",
}: {
  label: string;
  className?: string;
}) {
  return (
    <div
      className={`relative flex h-full w-full items-center justify-center overflow-hidden bg-gradient-to-br from-surface-soft to-accent-soft ${className}`}
    >
      <FacadeMotif className="absolute inset-y-0 right-[-10%] h-full w-2/3 text-ink/50" />
      <div className="absolute inset-0 bg-gradient-to-t from-surface-soft/90 via-transparent to-transparent" />
      <span className="relative z-10 px-4 text-center font-display text-sm font-medium uppercase tracking-[0.14em] text-text-muted">
        {label}
      </span>
    </div>
  );
}
