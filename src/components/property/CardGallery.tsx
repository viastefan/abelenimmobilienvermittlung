"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Bildwechsler auf einer Objektkarte.
 *
 * Gescrollt wird vom Browser: jede Aufnahme rastet ein, auf dem Telefon
 * bleibt das Wischen mitsamt Schwung erhalten. Die Pfeile schieben nur weiter.
 *
 * Die Bedienelemente liegen über der Karte hinweg (`z-10`), damit der Link,
 * der die ganze Karte abdeckt, sie nicht verschluckt.
 */
export function CardGallery({
  images,
  alt,
  sizes,
  aspect = "aspect-[4/3]",
}: {
  images: string[];
  alt: string;
  sizes: string;
  aspect?: string;
}) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [index, setIndex] = useState(0);

  const sync = useCallback(() => {
    const track = trackRef.current;
    if (!track || track.clientWidth === 0) return;
    setIndex(Math.round(track.scrollLeft / track.clientWidth));
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        sync();
      });
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      track.removeEventListener("scroll", onScroll);
    };
  }, [sync]);

  const step = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const next = Math.max(0, Math.min(images.length - 1, index + direction));
    track.scrollTo({ left: next * track.clientWidth, behavior: "smooth" });
    setIndex(next);
  };

  return (
    <div className={`relative overflow-hidden bg-surface-mist ${aspect}`}>
      <div
        ref={trackRef}
        className="no-scrollbar flex h-full snap-x snap-mandatory overflow-x-auto overscroll-x-contain"
      >
        {images.map((image, position) => (
          <div key={image} className="relative h-full w-full shrink-0 grow-0 basis-full snap-center">
            <Image
              src={image}
              alt={position === 0 ? alt : ""}
              fill
              sizes={sizes}
              className="object-cover"
              priority={false}
            />
          </div>
        ))}
      </div>

      {images.length > 1 && (
        <>
          <GalleryArrow side="left" hidden={index === 0} onClick={() => step(-1)} />
          <GalleryArrow side="right" hidden={index === images.length - 1} onClick={() => step(1)} />

          <div className="pointer-events-none absolute inset-x-0 bottom-3 z-10 flex justify-center gap-1.5">
            {images.map((image, position) => (
              <span
                key={image}
                className={`h-1.5 rounded-full transition-all duration-300 ease-smooth ${
                  position === index ? "w-5 bg-white" : "w-1.5 bg-white/55"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function GalleryArrow({
  side,
  hidden,
  onClick,
}: {
  side: "left" | "right";
  hidden: boolean;
  onClick: () => void;
}) {
  const Icon = side === "left" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      aria-label={side === "left" ? "Vorheriges Bild" : "Nächstes Bild"}
      aria-hidden={hidden}
      tabIndex={hidden ? -1 : 0}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        onClick();
      }}
      className={`absolute top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-ink shadow-card backdrop-blur transition-all duration-300 ease-smooth hover:bg-white focus-visible:opacity-100 ${
        side === "left" ? "left-3" : "right-3"
      } ${hidden ? "pointer-events-none scale-90 opacity-0" : "opacity-0 group-hover:opacity-100 max-lg:opacity-100"}`}
    >
      <Icon className="h-4 w-4" strokeWidth={2.2} aria-hidden="true" />
    </button>
  );
}
