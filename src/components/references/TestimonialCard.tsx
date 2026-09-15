import { Quote, Star, ThumbsUp } from "lucide-react";
import type { Testimonial } from "@/types/reference";

function formatRating(rating: number): string {
  return rating.toLocaleString("de-DE", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
}

/**
 * Kundenmeinung zu einem vermittelten Objekt.
 *
 * Die Sterne sind zwei übereinanderliegende Reihen: die graue trägt die Form,
 * die goldene wird auf den Bruchteil zugeschnitten. So stimmt 4,8 auch optisch,
 * ohne halbe Sterne zeichnen zu müssen.
 */
export function TestimonialCard({
  testimonial,
  author,
  className = "",
}: {
  testimonial: Testimonial;
  author?: string;
  className?: string;
}) {
  const { quote, rating, label, recommend } = testimonial;

  return (
    <figure
      className={`relative overflow-hidden rounded-[24px] bg-white shadow-soft p-7 shadow-card sm:p-9 ${className}`}
    >
      <Quote
        className="absolute -right-3 -top-3 h-24 w-24 text-accent-soft"
        strokeWidth={1.2}
        aria-hidden="true"
      />

      <div className="relative flex flex-wrap items-center gap-3">
        <span className="inline-flex items-center gap-2 rounded-full bg-accent-soft px-3.5 py-1.5 text-[0.8125rem] font-semibold text-accent-deep">
          <span className="h-1.5 w-1.5 rounded-full bg-accent-mid" aria-hidden="true" />
          Kundenmeinung
        </span>
        {recommend && (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-surface-cool px-3 py-1.5 text-[0.75rem] font-medium text-text-muted">
            <ThumbsUp className="h-3.5 w-3.5 text-accent-mid" strokeWidth={1.8} aria-hidden="true" />
            Weiterempfehlung
          </span>
        )}
      </div>

      {typeof rating === "number" && (
        <div className="relative mt-6 flex flex-wrap items-center gap-3">
          <Stars rating={rating} />
          <span className="font-display text-[1.375rem] font-bold tabular-nums text-ink">
            {formatRating(rating)}
          </span>
          {label && (
            <span className="rounded-full bg-surface-cool px-3 py-1 text-[0.75rem] font-medium text-text-muted">
              {label}
            </span>
          )}
        </div>
      )}

      <blockquote className="relative mt-6">
        <p className="pretty font-display text-[1.125rem] font-medium leading-relaxed text-ink sm:text-[1.25rem]">
          „{quote}“
        </p>
      </blockquote>

      {author && (
        <figcaption className="relative mt-6 text-[0.875rem] text-text-subtle">{author}</figcaption>
      )}
    </figure>
  );
}

function Stars({ rating }: { rating: number }) {
  const percent = Math.max(0, Math.min(1, rating / 5)) * 100;

  return (
    <span
      className="relative inline-flex"
      role="img"
      aria-label={`${formatRating(rating)} von 5 Sternen`}
    >
      <span className="flex gap-1" aria-hidden="true">
        {[0, 1, 2, 3, 4].map((position) => (
          <Star key={position} className="h-5 w-5 text-border" strokeWidth={1.4} fill="currentColor" />
        ))}
      </span>
      <span
        className="absolute inset-y-0 left-0 overflow-hidden"
        style={{ width: `${percent}%` }}
        aria-hidden="true"
      >
        <span className="flex gap-1">
          {[0, 1, 2, 3, 4].map((position) => (
            <Star
              key={position}
              className="h-5 w-5 shrink-0 text-amber-400"
              strokeWidth={1.4}
              fill="currentColor"
            />
          ))}
        </span>
      </span>
    </span>
  );
}
