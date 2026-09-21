"use client";

import { useCallback, useEffect, useRef, useState, type PointerEvent as ReactPointerEvent, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

const EXIT_MS = 260;
const DISMISS_PX = 110;

/**
 * Sheet im Stil von iOS: auf dem Telefon fährt sie von unten herein und lässt
 * sich am Griff nach unten wegziehen, auf dem Desktop erscheint sie als
 * ruhiger Dialog in der Mitte. Fokus bleibt innen, Escape schließt, der
 * Hintergrund scrollt nicht mit.
 */
export function Sheet({
  open,
  onClose,
  title,
  eyebrow,
  children,
  footer,
  size = "md",
  closeLabel = "Schließen",
  focusKey,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  eyebrow?: string;
  children: ReactNode;
  footer?: ReactNode;
  size?: "md" | "lg";
  closeLabel?: string;
  /** Ändert sich der Wert, wird der Fokus neu gesetzt — etwa bei einem Ansichtswechsel. */
  focusKey?: string;
}) {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [shown, setShown] = useState(false);
  const [dragY, setDragY] = useState(0);

  const panelRef = useRef<HTMLDivElement | null>(null);
  const restoreFocus = useRef<HTMLElement | null>(null);
  const drag = useRef({ active: false, startY: 0 });

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (open) {
      setDragY(0);
      setVisible(true);
      const frame = requestAnimationFrame(() => setShown(true));
      return () => cancelAnimationFrame(frame);
    }

    setShown(false);
    const timer = setTimeout(() => setVisible(false), EXIT_MS);
    return () => clearTimeout(timer);
  }, [open]);

  // Fokus hinein und beim Schließen zurück auf das auslösende Element.
  useEffect(() => {
    if (!open) return;
    if (!restoreFocus.current) {
      restoreFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    }

    const frame = requestAnimationFrame(() => {
      const panel = panelRef.current;
      if (!panel) return;
      const target = panel.querySelector<HTMLElement>("[data-autofocus]") ?? panel;
      target.focus({ preventScroll: true });
    });

    return () => cancelAnimationFrame(frame);
  }, [open, focusKey]);

  useEffect(() => {
    if (open) return;
    restoreFocus.current?.focus({ preventScroll: true });
    restoreFocus.current = null;
  }, [open]);

  // Escape hört am Fenster mit: nach einem Ansichtswechsel kann der Fokus
  // kurzzeitig außerhalb der Sheet liegen, und dann käme kein Ereignis an.
  useEffect(() => {
    if (!open) return;
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, [open, onClose]);

  // Hintergrund friert ein, solange die Sheet offen ist.
  useEffect(() => {
    if (!visible) return;
    const { body } = document;
    const previousOverflow = body.style.overflow;
    const previousPadding = body.style.paddingRight;
    const gap = window.innerWidth - document.documentElement.clientWidth;
    body.style.overflow = "hidden";
    if (gap > 0) body.style.paddingRight = `${gap}px`;
    return () => {
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPadding;
    };
  }, [visible]);

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key !== "Tab") return;

      const panel = panelRef.current;
      if (!panel) return;
      const focusable = Array.from(
        panel.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      ).filter((node) => node.offsetParent !== null || node === document.activeElement);

      if (focusable.length === 0) {
        event.preventDefault();
        return;
      }

      const first = focusable[0]!;
      const last = focusable[focusable.length - 1]!;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    },
    []
  );

  const onGrabberDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    drag.current = { active: true, startY: event.clientY };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onGrabberMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!drag.current.active) return;
    setDragY(Math.max(0, event.clientY - drag.current.startY));
  };

  const onGrabberUp = () => {
    if (!drag.current.active) return;
    drag.current.active = false;
    if (dragY > DISMISS_PX) onClose();
    else setDragY(0);
  };

  if (!mounted || !visible) return null;

  return createPortal(
    <div className="fixed inset-0 z-[90] flex items-end justify-center sm:items-center" onKeyDown={onKeyDown}>
      <button
        type="button"
        tabIndex={-1}
        aria-hidden="true"
        onClick={onClose}
        className={`absolute inset-0 cursor-default bg-ink/30 backdrop-blur-[3px] transition-opacity duration-300 ease-smooth ${
          shown ? "opacity-100" : "opacity-0"
        }`}
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        style={dragY ? { transform: `translateY(${dragY}px)`, transition: "none" } : undefined}
        className={`relative flex max-h-[92dvh] w-full flex-col overflow-hidden rounded-t-[24px] bg-white shadow-[0_-10px_60px_-20px_rgba(16,43,78,0.45)] outline-none transition-all duration-[280ms] ease-smooth sm:max-h-[86dvh] sm:rounded-[24px] sm:shadow-[0_30px_90px_-30px_rgba(16,43,78,0.45)] ${
          size === "lg" ? "sm:max-w-[38rem]" : "sm:max-w-[30rem]"
        } ${shown ? "translate-y-0 opacity-100 sm:scale-100" : "translate-y-8 opacity-0 sm:translate-y-2 sm:scale-[0.97]"}`}
      >
        {/* Griff — nur auf dem Telefon, dort ist Wegziehen die Erwartung. */}
        <div
          onPointerDown={onGrabberDown}
          onPointerMove={onGrabberMove}
          onPointerUp={onGrabberUp}
          onPointerCancel={onGrabberUp}
          className="flex shrink-0 cursor-grab touch-none justify-center pb-1 pt-3 sm:hidden"
        >
          <span className="h-1.5 w-11 rounded-full bg-border-strong" aria-hidden="true" />
        </div>

        <div className="flex shrink-0 items-start justify-between gap-4 px-6 pb-4 pt-4 sm:pt-6">
          <div>
            {eyebrow && (
              <p className="text-[0.8125rem] font-semibold text-accent-deep">{eyebrow}</p>
            )}
            <h2 className="mt-1.5 font-display text-[1.25rem] font-extrabold leading-tight text-ink">{title}</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={closeLabel}
            className="-mr-1.5 -mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-surface-cool text-text-muted transition-colors duration-200 hover:bg-surface-mist hover:text-ink"
          >
            <X className="h-4 w-4" strokeWidth={2.2} aria-hidden="true" />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 pb-6 pt-1">{children}</div>

        {footer && <div className="shrink-0 bg-surface-warm px-6 py-4 pb-safe sm:pb-4">{footer}</div>}
      </div>
    </div>,
    document.body
  );
}
