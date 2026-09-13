"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
} from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export type CarouselItem = {
  key: string;
  node: ReactNode;
};

/**
 * Horizontale Galerie im Stil der Apple-Produktreihen.
 *
 * Das Scrollen selbst übernimmt der Browser: `snap-x` rastet jede Karte
 * bündig ein, Touch-Geräte behalten ihren nativen Schwung. Dazu kommen
 * Maus-Drag, Pfeiltasten und zwei Glas-Chevrons, die an den Enden
 * verschwinden — mehr Steuerung braucht eine Galerie nicht.
 */
export function SnapCarousel({
  label,
  items,
  itemClassName = "basis-[84%] sm:basis-[46%] lg:basis-[31.5%]",
  gapClassName = "gap-4 lg:gap-5",
  peekClassName = "px-5 sm:px-8 lg:px-12",
  className = "",
}: {
  /** Zugänglicher Name der Scroll-Region. */
  label: string;
  items: CarouselItem[];
  /** Breite einer Karte — als Flex-Basis, damit sie mitwächst. */
  itemClassName?: string;
  gapClassName?: string;
  /** Innenabstand der Spur, damit die erste Karte am Raster beginnt. */
  peekClassName?: string;
  className?: string;
}) {
  const trackRef = useRef<HTMLUListElement | null>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(true);
  const [active, setActive] = useState(0);
  const [dragging, setDragging] = useState(false);

  const drag = useRef({ active: false, startX: 0, startScroll: 0, moved: false });

  /** Scroll-Position jeder Karte, bezogen auf den Scroll-Ursprung der Spur. */
  const offsets = useCallback(() => {
    const track = trackRef.current;
    if (!track) return [] as number[];
    const base = track.getBoundingClientRect().left - track.scrollLeft;
    return Array.from(track.children).map((child) => child.getBoundingClientRect().left - base);
  }, []);

  const sync = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const max = track.scrollWidth - track.clientWidth;
    setAtStart(track.scrollLeft <= 2);
    setAtEnd(track.scrollLeft >= max - 2);

    const positions = offsets();
    let nearest = 0;
    let best = Number.POSITIVE_INFINITY;
    positions.forEach((position, index) => {
      const distance = Math.abs(position - track.scrollLeft);
      if (distance < best) {
        best = distance;
        nearest = index;
      }
    });
    setActive(nearest);
  }, [offsets]);

  useLayoutEffect(sync, [sync, items.length]);

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
    window.addEventListener("resize", sync);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      track.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", sync);
    };
  }, [sync]);

  const scrollToIndex = useCallback(
    (index: number) => {
      const track = trackRef.current;
      if (!track) return;
      const positions = offsets();
      const target = positions[Math.max(0, Math.min(positions.length - 1, index))];
      if (target === undefined) return;
      track.scrollTo({ left: target, behavior: "smooth" });
    },
    [offsets]
  );

  const step = useCallback(
    (direction: 1 | -1) => {
      const track = trackRef.current;
      if (!track) return;
      const positions = offsets();
      const current = track.scrollLeft;
      const next =
        direction === 1
          ? positions.find((position) => position > current + 4)
          : [...positions].reverse().find((position) => position < current - 4);
      track.scrollTo({ left: next ?? (direction === 1 ? track.scrollWidth : 0), behavior: "smooth" });
    },
    [offsets]
  );

  // Maus-Drag. Touch bleibt dem Browser überlassen — der macht es besser.
  const onPointerDown = (event: ReactPointerEvent<HTMLUListElement>) => {
    if (event.pointerType !== "mouse" || event.button !== 0) return;
    const track = trackRef.current;
    if (!track || track.scrollWidth <= track.clientWidth) return;
    drag.current = { active: true, startX: event.clientX, startScroll: track.scrollLeft, moved: false };
    setDragging(true);
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLUListElement>) => {
    if (!drag.current.active) return;
    const track = trackRef.current;
    if (!track) return;
    const delta = event.clientX - drag.current.startX;
    if (Math.abs(delta) > 6) drag.current.moved = true;
    track.scrollLeft = drag.current.startScroll - delta;
  };

  const endDrag = () => {
    if (!drag.current.active) return;
    drag.current.active = false;
    setDragging(false);
    // Rastet auf die nächstgelegene Karte ein, sobald `snap` wieder greift.
    requestAnimationFrame(() => scrollToIndex(active));
  };

  /** Ein Zug über eine Karte darf nicht als Klick auf ihren Link zählen. */
  const onClickCapture = (event: ReactMouseEvent<HTMLUListElement>) => {
    if (!drag.current.moved) return;
    event.preventDefault();
    event.stopPropagation();
    drag.current.moved = false;
  };

  const scrollable = !atStart || !atEnd;

  return (
    <div className={`relative ${className}`}>
      <ul
        ref={trackRef}
        tabIndex={0}
        role="group"
        aria-label={label}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onPointerLeave={endDrag}
        onClickCapture={onClickCapture}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") {
            event.preventDefault();
            step(1);
          } else if (event.key === "ArrowLeft") {
            event.preventDefault();
            step(-1);
          }
        }}
        className={`no-scrollbar flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain scroll-smooth pb-1 ${gapClassName} ${peekClassName} ${
          dragging ? "cursor-grabbing snap-none select-none scroll-auto" : scrollable ? "lg:cursor-grab" : ""
        }`}
      >
        {items.map((item) => (
          <li key={item.key} className={`flex shrink-0 grow-0 snap-start ${itemClassName}`}>
            {item.node}
          </li>
        ))}
      </ul>

      {scrollable && (
        <>
          <CarouselButton side="left" hidden={atStart} onClick={() => step(-1)} />
          <CarouselButton side="right" hidden={atEnd} onClick={() => step(1)} />
        </>
      )}

      {items.length > 1 && (
        <div className="mt-6 flex items-center justify-center gap-2" aria-hidden="true">
          {items.map((item, index) => (
            <button
              key={item.key}
              type="button"
              tabIndex={-1}
              onClick={() => scrollToIndex(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ease-smooth ${
                index === active ? "w-6 bg-accent-deep" : "w-1.5 bg-border-strong hover:bg-text-subtle"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function CarouselButton({
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
      onClick={onClick}
      aria-label={side === "left" ? "Vorheriges Objekt" : "Nächstes Objekt"}
      aria-hidden={hidden}
      tabIndex={hidden ? -1 : 0}
      className={`absolute top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-white/80 text-ink shadow-lift backdrop-blur transition-all duration-300 ease-smooth hover:bg-white lg:flex ${
        side === "left" ? "left-2" : "right-2"
      } ${hidden ? "pointer-events-none scale-90 opacity-0" : "opacity-100"}`}
    >
      <Icon className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
    </button>
  );
}
