"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import Link from "next/link";
import { contactInterests, defaultContactInterest } from "@/data/contact";

type Status = "idle" | "loading" | "success" | "error";

const fieldClass =
  "w-full rounded-[14px] bg-white px-4 py-3 text-[0.9375rem] text-ink shadow-soft outline-none transition-shadow duration-200 placeholder:text-text-subtle focus:ring-2 focus:ring-accent-deep";

/**
 * Anfrageformular — identisch auf der Kontaktseite und in der Kontakt-Sheet.
 * `objectRef` reist als Objektbezug mit, damit eine Anfrage von einer
 * Objektseite nicht ohne Kontext ankommt.
 */
export function InquiryForm({
  presetInterest,
  objectRef,
  compact = false,
  autoFocus = false,
}: {
  presetInterest?: string;
  objectRef?: string;
  compact?: boolean;
  autoFocus?: boolean;
}) {
  const [interest, setInterest] = useState<string>(
    contactInterests.some((item) => item.value === presetInterest) ? presetInterest! : defaultContactInterest
  );
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // Vorab festgehalten: `currentTarget` ist nach dem ersten `await` leer.
    const form = event.currentTarget;

    setStatus("loading");
    setErrorMessage(null);

    const formData = new FormData(form);
    const payload = {
      firstName: String(formData.get("firstName") ?? ""),
      lastName: String(formData.get("lastName") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      interest,
      message: String(formData.get("message") ?? ""),
      objectRef: objectRef ?? "",
      address: String(formData.get("address") ?? ""),
      // Honigtopf: echte Menschen füllen dieses Feld nie aus.
      company: String(formData.get("company") ?? ""),
    };

    try {
      const response = await fetch("/api/kontakt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error ?? "Ihre Anfrage konnte nicht gesendet werden.");
      }

      form.reset();
      setStatus("success");
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Unbekannter Fehler.");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-start gap-4 rounded-[24px] bg-accent-soft p-7">
        <CheckCircle2 className="h-8 w-8 text-accent-deep" aria-hidden="true" />
        <h3 className="font-display text-[1.125rem] font-bold text-ink">Vielen Dank für Ihre Anfrage.</h3>
        <p className="text-[0.9375rem] leading-relaxed text-text-muted">
          Wir melden uns in der Regel innerhalb eines Werktages persönlich bei Ihnen zurück.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={compact ? "space-y-5" : "space-y-8"} noValidate>
      {objectRef && (
        <p className="rounded-[14px] bg-surface-warm px-4 py-3 text-[0.8125rem] text-text-muted">
          Ihre Anfrage bezieht sich auf: <span className="font-semibold text-ink">{objectRef}</span>
        </p>
      )}

      <div className={`grid gap-4 ${compact ? "sm:grid-cols-2" : "gap-5 sm:grid-cols-2"}`}>
        <Field label="Vorname" name="firstName" autoComplete="given-name" required autoFocus={autoFocus} />
        <Field label="Nachname" name="lastName" autoComplete="family-name" required />
        <Field label="E-Mail" name="email" type="email" autoComplete="email" required />
        <Field label="Telefon" name="phone" type="tel" autoComplete="tel" />
      </div>

      {/* Die Adresse fragte schon das Formular des alten Auftritts ab: Ohne
          Lage lässt sich zu einer Immobilie wenig sagen. Freiwillig bleibt
          sie trotzdem — wer nur eine Frage hat, soll sie stellen können. */}
      <Field
        label="Adresse der Immobilie"
        name="address"
        autoComplete="street-address"
        hint="Optional — hilft uns bei einer Einschätzung."
      />

      <fieldset>
        <legend className="mb-3 text-sm font-semibold text-ink">Ich interessiere mich für</legend>
        <div className="flex flex-wrap gap-2">
          {contactInterests.map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => setInterest(item.value)}
              aria-pressed={interest === item.value}
              className={`rounded-[14px] px-4 py-2.5 text-[0.8125rem] font-semibold transition-all duration-200 ${
                interest === item.value
                  ? "bg-accent-deep text-white shadow-soft"
                  : "bg-white text-text-muted shadow-soft hover:text-accent-deep"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor="inquiry-message" className="mb-2 block text-sm font-semibold text-ink">
          Nachricht <span aria-hidden="true">*</span>
        </label>
        <textarea
          id="inquiry-message"
          name="message"
          rows={compact ? 4 : 5}
          required
          className={fieldClass}
          placeholder="Erzählen Sie uns kurz von Ihrer Immobilie oder Ihrem Anliegen."
        />
      </div>

      {/* Honigtopf gegen Formular-Spam — für Menschen unsichtbar. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="inquiry-company">Firma</label>
        <input id="inquiry-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <label className="flex items-start gap-3 text-[0.8125rem] leading-relaxed text-text-muted">
        <input
          type="checkbox"
          name="consent"
          required
          className="mt-0.5 h-5 w-5 shrink-0 rounded-[6px] border-border-strong text-accent-deep focus:ring-accent"
        />
        <span>
          Ich bin damit einverstanden, dass meine Angaben zur Bearbeitung meiner Anfrage verarbeitet
          werden. Hinweise dazu finden Sie in der{" "}
          <Link href="/datenschutz" className="font-semibold text-accent-deep underline underline-offset-2">
            Datenschutzerklärung
          </Link>
          .
        </span>
      </label>

      {status === "error" && errorMessage && (
        <p role="alert" className="rounded-[14px] bg-warning-soft px-4 py-3 text-sm text-warning">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex w-full items-center justify-center gap-2 rounded-[14px] bg-accent-deep px-8 py-4 text-[0.9375rem] font-semibold text-white transition-all duration-300 ease-smooth hover:bg-accent-dark disabled:pointer-events-none disabled:opacity-60 sm:w-auto"
      >
        {status === "loading" && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
        Anfrage senden
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  autoComplete,
  required,
  autoFocus,
  hint,
}: {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
  autoFocus?: boolean;
  hint?: string;
}) {
  const id = `inquiry-${name}`;
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-semibold text-ink">
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        required={required}
        aria-describedby={hint ? `${id}-hinweis` : undefined}
        {...(autoFocus ? { "data-autofocus": true } : {})}
        className={fieldClass}
      />
      {hint && (
        <p id={`${id}-hinweis`} className="mt-2 text-[0.8125rem] text-text-subtle">
          {hint}
        </p>
      )}
    </div>
  );
}
