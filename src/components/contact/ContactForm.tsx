"use client";

import { useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { Loader2, CheckCircle2 } from "lucide-react";

const interests = [
  { value: "verkaufen", label: "Immobilie verkaufen" },
  { value: "kaufen", label: "Immobilie kaufen" },
  { value: "bewertung", label: "Immobilienbewertung" },
  { value: "sonstiges", label: "Sonstiges" },
];

type Status = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const searchParams = useSearchParams();
  const presetInterest = searchParams.get("anliegen");
  const [interest, setInterest] = useState(
    interests.some((i) => i.value === presetInterest) ? presetInterest! : "verkaufen"
  );
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setErrorMessage(null);

    const formData = new FormData(event.currentTarget);
    const payload = {
      firstName: String(formData.get("firstName") ?? ""),
      lastName: String(formData.get("lastName") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      interest,
      message: String(formData.get("message") ?? ""),
    };

    try {
      const response = await fetch("/api/kontakt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.error ?? "Ihre Anfrage konnte nicht gesendet werden.");
      }

      setStatus("success");
      event.currentTarget.reset();
      setInterest("verkaufen");
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Unbekannter Fehler.");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-start gap-4 rounded-lg border border-border bg-surface-soft p-10">
        <CheckCircle2 className="h-8 w-8 text-accent" aria-hidden="true" />
        <h3 className="font-display text-xl font-semibold text-ink">Vielen Dank für Ihre Anfrage.</h3>
        <p className="text-sm text-text-muted">
          Ich melde mich in der Regel innerhalb eines Werktages persönlich bei Ihnen zurück.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8" noValidate>
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Vorname" name="firstName" autoComplete="given-name" required />
        <Field label="Nachname" name="lastName" autoComplete="family-name" required />
        <Field label="E-Mail" name="email" type="email" autoComplete="email" required />
        <Field label="Telefon" name="phone" type="tel" autoComplete="tel" />
      </div>

      <fieldset>
        <legend className="mb-3 text-sm font-medium text-ink">Ich interessiere mich für</legend>
        <div className="flex flex-wrap gap-2">
          {interests.map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => setInterest(item.value)}
              aria-pressed={interest === item.value}
              className={`rounded-md border px-4 py-2.5 text-sm font-medium transition-colors duration-200 ${
                interest === item.value
                  ? "border-ink bg-ink text-white"
                  : "border-border bg-surface text-text-muted hover:border-ink hover:text-ink"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-medium text-ink">
          Nachricht
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="w-full rounded-md border border-border bg-surface px-4 py-3 text-sm text-ink placeholder:text-text-muted/60 focus-visible:border-ink"
          placeholder="Erzählen Sie mir kurz von Ihrer Immobilie oder Ihrem Anliegen."
        />
      </div>

      {status === "error" && errorMessage && (
        <p role="alert" className="text-sm text-red-700">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex items-center gap-2 rounded-md bg-ink px-8 py-3.5 text-sm font-semibold text-white transition-all duration-300 ease-smooth hover:bg-accent-dark hover:-translate-y-0.5 disabled:opacity-60 disabled:pointer-events-none"
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
}: {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-sm font-medium text-ink">
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        autoComplete={autoComplete}
        required={required}
        className="w-full rounded-md border border-border bg-surface px-4 py-3 text-sm text-ink placeholder:text-text-muted/60 focus-visible:border-ink"
      />
    </div>
  );
}
