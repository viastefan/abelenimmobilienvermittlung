"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { ArrowRight, ChevronRight, Mail, MessageSquare, Phone } from "lucide-react";
import { Sheet } from "@/components/ui/Sheet";
import { InquiryForm } from "@/components/contact/InquiryForm";
import { site } from "@/data/site";

export type ContactSheetOptions = {
  /** Vorausgewähltes Anliegen, z. B. "kaufen". */
  interest?: string;
  /** Objektbezug, der mit der Anfrage verschickt wird. */
  objectRef?: string;
  /** "form" springt direkt ins Formular. */
  view?: "menu" | "form";
  /** Überschreibt die Überschrift der Sheet. */
  title?: string;
};

type ContactSheetApi = {
  open: (options?: ContactSheetOptions) => void;
  close: () => void;
};

const ContactSheetContext = createContext<ContactSheetApi | null>(null);

/** Gibt `null` zurück, wenn kein Provider über dem Baum liegt. */
export function useContactSheet() {
  return useContext(ContactSheetContext);
}

export function ContactSheetProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<ContactSheetOptions>({});
  const [view, setView] = useState<"menu" | "form">("menu");

  const api = useMemo<ContactSheetApi>(
    () => ({
      open: (next = {}) => {
        setOptions(next);
        setView(next.view ?? "menu");
        setOpen(true);
      },
      close: () => setOpen(false),
    }),
    []
  );

  const close = useCallback(() => setOpen(false), []);

  // Eine mitgegebene Überschrift gilt für die Ansicht, für die sie gedacht war.
  // Wer vom Menü ins Formular wechselt, bekommt die Überschrift des Formulars.
  const defaultTitle = view === "form" ? "Anfrage senden" : "Kontakt aufnehmen";
  const title = view === (options.view ?? "menu") ? options.title ?? defaultTitle : defaultTitle;

  return (
    <ContactSheetContext.Provider value={api}>
      {children}

      <Sheet
        open={open}
        onClose={close}
        eyebrow={site.owner}
        title={title}
        size={view === "form" ? "lg" : "md"}
        focusKey={view}
        footer={
          view === "menu" ? (
            <p className="text-[0.8125rem] leading-relaxed text-text-muted">
              Wir melden uns in der Regel innerhalb eines Werktages persönlich zurück.
            </p>
          ) : (
            <button
              type="button"
              onClick={() => setView("menu")}
              className="text-[0.8125rem] font-semibold text-text-muted transition-colors hover:text-accent-deep"
            >
              ← Andere Kontaktwege
            </button>
          )
        }
      >
        {view === "menu" ? (
          <div className="space-y-2.5">
            {options.objectRef && (
              <p className="rounded-[12px] border border-border bg-surface-warm px-4 py-3 text-[0.8125rem] text-text-muted">
                Zum Objekt: <span className="font-semibold text-ink">{options.objectRef}</span>
              </p>
            )}

            <ContactRow
              href={`mailto:${site.email}`}
              icon={Mail}
              label="E-Mail schreiben"
              value={site.email}
              autofocus
            />

            <button
              type="button"
              onClick={() => setView("form")}
              className="group flex w-full items-center gap-4 rounded-[14px] bg-accent-deep px-4 py-4 text-left text-white transition-colors duration-200 hover:bg-accent-dark"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[11px] bg-white/15">
                <MessageSquare className="h-[18px] w-[18px]" strokeWidth={1.8} aria-hidden="true" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[0.9375rem] font-semibold leading-tight">Anfrage schreiben</span>
                <span className="mt-0.5 block truncate text-[0.8125rem] text-white/75">
                  Formular — Antwort innerhalb eines Werktages
                </span>
              </span>
              <ArrowRight
                className="h-4 w-4 shrink-0 transition-transform duration-300 ease-smooth group-hover:translate-x-1"
                aria-hidden="true"
              />
            </button>
          </div>
        ) : (
          <InquiryForm
            compact
            autoFocus
            presetInterest={options.interest}
            objectRef={options.objectRef}
          />
        )}
      </Sheet>
    </ContactSheetContext.Provider>
  );
}

function ContactRow({
  href,
  icon: Icon,
  label,
  value,
  autofocus = false,
}: {
  href: string;
  icon: typeof Phone;
  label: string;
  value: string;
  autofocus?: boolean;
}) {
  return (
    <a
      href={href}
      {...(autofocus ? { "data-autofocus": true } : {})}
      className="group flex items-center gap-4 rounded-[14px] border border-border bg-white px-4 py-4 transition-all duration-200 hover:border-accent-light hover:bg-accent-tint"
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[11px] bg-accent-soft text-accent-deep">
        <Icon className="h-[18px] w-[18px]" strokeWidth={1.8} aria-hidden="true" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[0.9375rem] font-semibold leading-tight text-ink">{label}</span>
        <span className="mt-0.5 block truncate text-[0.8125rem] text-text-muted">{value}</span>
      </span>
      <ChevronRight
        className="h-4 w-4 shrink-0 text-text-subtle transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-accent-deep"
        aria-hidden="true"
      />
    </a>
  );
}
