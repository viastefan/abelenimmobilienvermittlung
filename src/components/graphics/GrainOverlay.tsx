export function GrainOverlay({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`pointer-events-none absolute inset-0 h-full w-full opacity-[0.05] mix-blend-multiply ${className}`}
      aria-hidden="true"
    >
      <filter id="abelen-grain">
        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#abelen-grain)" />
    </svg>
  );
}
