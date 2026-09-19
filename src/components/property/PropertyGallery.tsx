"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { ImagePlaceholder } from "@/components/graphics/ImagePlaceholder";
import { PhotoImage } from "@/components/graphics/PhotoImage";

/**
 * Bildergalerie eines Objekts.
 *
 * Die Streifenansicht rastet Bild für Bild ein, ein Klick öffnet die
 * Vollbildansicht. Dort übernimmt wieder der Browser das Wischen — die
 * Bilder liegen in einer Snap-Spur, die Pfeile scrollen sie nur weiter.
 */
export function PropertyGallery({
  images,
  title,
  city,
}: {
  images: string[];
  title: string;
  city: string;
}) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const restoreFocus = useRef<HTMLElement | null>(null);

  const openAt = (next: number) => {
    restoreFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setIndex(next);
    setOpen(true);
  };

  const close = useCallback(() => {
    setOpen(false);
    restoreFocus.current?.focus({ preventScroll: true });
  }, []);

  // Beim Öffnen direkt zum gewählten Bild springen, ohne Animation.
  useEffect(() => {
    if (!open) return;
    const track = trackRef.current;
    if (!track) return;
    track.scrollTo({ left: index * track.clientWidth, behavior: "instant" as ScrollBehavior });
  }, [open, index]);

  useEffect(() => {
    if (!open) return;
    const { body } = document;
    const previous = body.style.overflow;
    body.style.overflow = "hidden";
    return () => {
      body.style.overflow = previous;
    };
  }, [open]);

  const step = useCallback(
    (direction: 1 | -1) => {
      const track = trackRef.current;
      if (!track) return;
      const next = Math.max(0, Math.min(images.length - 1, Math.round(track.scrollLeft / track.clientWidth) + direction));
      track.scrollTo({ left: next * track.clientWidth, behavior: "smooth" });
      setIndex(next);
    },
    [images.length]
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close, step]);

  if (images.length === 0) return null;

  return (
    <>
      <ul className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain px-6 pb-1 scroll-pl-6 lg:gap-4 lg:px-10 lg:scroll-pl-10">
        {images.map((image, position) => (
          <li
            key={image}
            className="shrink-0 grow-0 basis-[84%] snap-start sm:basis-[46%] lg:basis-[31.5%]"
          >
            <button
              type="button"
              onClick={() => openAt(position)}
              aria-label={`Bild ${position + 1} von ${images.length} groß ansehen`}
              className="group relative block aspect-[4/3] w-full overflow-hidden rounded-[24px] bg-surface-mist"
            >
              <PhotoImage
                src={image}
                alt={`${title} in ${city} — Bild ${position + 1}`}
                fill
                sizes="(min-width: 1024px) 32vw, (min-width: 640px) 46vw, 84vw"
                className="object-cover transition-transform duration-[900ms] ease-smooth group-hover:scale-[1.05]"
                fallback={<ImagePlaceholder />}
              />
              <span
                className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/85 text-ink opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100"
                aria-hidden="true"
              >
                <Expand className="h-4 w-4" strokeWidth={1.8} />
              </span>
            </button>
          </li>
        ))}
      </ul>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Bildergalerie ${title}`}
          className="fixed inset-0 z-[95] flex flex-col bg-ink-deep/95 backdrop-blur-sm"
        >
          <div className="flex shrink-0 items-center justify-between px-5 py-4 text-white sm:px-8">
            <p className="text-[0.8125rem] font-semibold tabular-nums text-white/75">
              {index + 1} / {images.length}
            </p>
            <button
              type="button"
              autoFocus
              onClick={close}
              aria-label="Galerie schließen"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            >
              <X className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
            </button>
          </div>

          <div
            ref={trackRef}
            onScroll={(event) => {
              const element = event.currentTarget;
              setIndex(Math.round(element.scrollLeft / element.clientWidth));
            }}
            className="no-scrollbar flex min-h-0 flex-1 snap-x snap-mandatory overflow-x-auto overscroll-contain"
          >
            {images.map((image, position) => (
              <div key={image} className="relative h-full w-full shrink-0 grow-0 basis-full snap-center">
                <PhotoImage
                  src={image}
                  alt={`${title} in ${city} — Bild ${position + 1}`}
                  fill
                  sizes="100vw"
                  className="object-contain"
                  priority={position === index}
                  fallback={<ImagePlaceholder />}
                />
              </div>
            ))}
          </div>

          {images.length > 1 && (
            <div className="flex shrink-0 items-center justify-center gap-3 px-5 py-5 pb-safe">
              <button
                type="button"
                onClick={() => step(-1)}
                disabled={index === 0}
                aria-label="Vorheriges Bild"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 disabled:opacity-30"
              >
                <ChevronLeft className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                disabled={index === images.length - 1}
                aria-label="Nächstes Bild"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 disabled:opacity-30"
              >
                <ChevronRight className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
