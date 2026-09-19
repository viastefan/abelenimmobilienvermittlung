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
      className={`relative overflow-hidden rounded-[24px] bg-white p-6 shadow-soft ring-1 ring-border ${className}`}
    >
      {/* Die Kopfzeile traegt Bewertung und Hinweise in einer Reihe — vorher
          standen Plakette, Sterne und Zahl untereinander und machten aus drei
          Saetzen Zitat einen halben Bildschirm. */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        {typeof rating === "number" && (
          <span className="flex items-center gap-2">
            <Stars rating={rating} />
            <span className="font-display text-[0.9375rem] font-bold tabular-nums text-ink">
              {formatRating(rating)}
            </span>
          </span>
        )}
        {label && <span className="text-[0.75rem] text-text-subtle">{label}</span>}
        {recommend && (
          <span className="inline-flex items-center gap-1.5 text-[0.75rem] font-medium text-accent-deep">
            <ThumbsUp className="h-3.5 w-3.5" strokeWidth={1.8} aria-hidden="true" />
            Weiterempfehlung
          </span>
        )}
      </div>

      <blockquote className="mt-4">
        <Quote className="h-5 w-5 text-accent-light" strokeWidth={1.6} aria-hidden="true" />
        <p className="pretty mt-2 text-[0.9375rem] leading-relaxed text-text-muted">{quote}</p>
      </blockquote>

      {author && (
        <figcaption className="mt-4 text-[0.8125rem] text-text-subtle">{author}</figcaption>
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
          <Star key={position} className="h-4 w-4 text-border" strokeWidth={1.4} fill="currentColor" />
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
              className="h-4 w-4 shrink-0 text-amber-400"
              strokeWidth={1.4}
              fill="currentColor"
            />
          ))}
        </span>
      </span>
    </span>
  );
}
