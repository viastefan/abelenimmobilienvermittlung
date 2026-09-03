type MotifProps = {
  className?: string;
};

/**
 * Abstract architectural line-art used across the site in place of stock
 * photography — a deliberate art-direction choice (see project notes) that
 * keeps the visual language consistent, brand-specific and dependency-free.
 */
export function FacadeMotif({ className = "" }: MotifProps) {
  const cols = 6;
  const rows = 8;
  const cells: { x: number; y: number; filled: boolean }[] = [];
  let seed = 7;
  const rand = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
  for (let r = 0; r < rows; r += 1) {
    for (let c = 0; c < cols; c += 1) {
      cells.push({ x: c, y: r, filled: rand() > 0.72 });
    }
  }

  return (
    <svg viewBox="0 0 320 420" className={className} aria-hidden="true" fill="none">
      <rect x="0.5" y="0.5" width="319" height="419" rx="2" stroke="currentColor" strokeOpacity="0.18" />
      {cells.map((cell, i) => {
        const w = 320 / cols;
        const h = 420 / rows;
        const pad = 6;
        return (
          <rect
            key={i}
            x={cell.x * w + pad / 2}
            y={cell.y * h + pad / 2}
            width={w - pad}
            height={h - pad}
            stroke="currentColor"
            strokeOpacity={cell.filled ? 0.55 : 0.14}
            fill={cell.filled ? "currentColor" : "none"}
            fillOpacity={cell.filled ? 0.12 : 0}
          />
        );
      })}
    </svg>
  );
}

export function FloorPlanMotif({ className = "" }: MotifProps) {
  return (
    <svg viewBox="0 0 400 300" className={className} aria-hidden="true" fill="none">
      <rect x="10" y="10" width="380" height="280" stroke="currentColor" strokeOpacity="0.4" />
      <line x1="10" y1="150" x2="230" y2="150" stroke="currentColor" strokeOpacity="0.4" />
      <line x1="230" y1="10" x2="230" y2="290" stroke="currentColor" strokeOpacity="0.4" />
      <line x1="230" y1="150" x2="390" y2="150" stroke="currentColor" strokeOpacity="0.4" />
      <line x1="120" y1="150" x2="120" y2="290" stroke="currentColor" strokeOpacity="0.25" />
      <path d="M120 290 A 40 40 0 0 0 160 250" stroke="currentColor" strokeOpacity="0.3" />
      <path d="M230 150 A 36 36 0 0 1 266 114" stroke="currentColor" strokeOpacity="0.3" />
      <rect x="30" y="30" width="60" height="10" stroke="currentColor" strokeOpacity="0.35" />
      <rect x="270" y="200" width="10" height="70" stroke="currentColor" strokeOpacity="0.35" />
    </svg>
  );
}

export function KeyMotif({ className = "" }: MotifProps) {
  return (
    <svg viewBox="0 0 200 120" className={className} aria-hidden="true" fill="none">
      <circle cx="34" cy="60" r="26" stroke="currentColor" strokeOpacity="0.7" strokeWidth="2.5" />
      <circle cx="34" cy="60" r="9" stroke="currentColor" strokeOpacity="0.7" strokeWidth="2.5" />
      <line x1="60" y1="60" x2="170" y2="60" stroke="currentColor" strokeOpacity="0.7" strokeWidth="2.5" />
      <line x1="130" y1="60" x2="130" y2="80" stroke="currentColor" strokeOpacity="0.7" strokeWidth="2.5" />
      <line x1="150" y1="60" x2="150" y2="88" stroke="currentColor" strokeOpacity="0.7" strokeWidth="2.5" />
      <line x1="170" y1="60" x2="170" y2="76" stroke="currentColor" strokeOpacity="0.7" strokeWidth="2.5" />
    </svg>
  );
}

export function DoorMotif({ className = "" }: MotifProps) {
  return (
    <svg viewBox="0 0 200 320" className={className} aria-hidden="true" fill="none">
      <rect x="20" y="12" width="160" height="296" rx="4" stroke="currentColor" strokeOpacity="0.4" />
      <rect x="40" y="32" width="120" height="256" rx="2" stroke="currentColor" strokeOpacity="0.55" />
      <circle cx="140" cy="164" r="3.5" fill="currentColor" fillOpacity="0.6" />
    </svg>
  );
}
