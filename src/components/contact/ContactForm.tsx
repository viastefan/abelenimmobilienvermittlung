"use client";

import { useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, Loader2 } from "lucide-react";
import { contactInterests, defaultContactInterest } from "@/data/contact";

type Status = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const searchParams = useSearchParams();
  const preset = searchParams.get("anliegen");
  const [interest, setInterest] = useState<string>(
    contactInterests.some((item) => item.value === preset) ? preset! : defaultContactInterest
  );
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // Captured up front: `currentTarget` is cleared once the handler yields.
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
      setInterest(defaultContactInterest);
      setStatus("success");
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Unbekannter Fehler.");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-start gap-4 rounded-[16px] border border-accent-light bg-accent-soft p-10">
        <CheckCircle2 className="h-8 w-8 text-accent-deep" aria-hidden="true" />
        <h3 className="font-display text-xl font-bold text-ink">Vielen Dank für Ihre Anfrage.</h3>
        <p className="text-[0.9375rem] text-text-muted">
          Wir melden uns in der Regel innerhalb eines Werktages persönlich bei Ihnen zurück.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Vorname" name="firstName" autoComplete="given-name" required />
        <Field label="Nachname" name="lastName" autoComplete="family-name" required />
        <Field label="E-Mail" name="email" type="email" autoComplete="email" required />
        <Field label="Telefon" name="phone" type="tel" autoComplete="tel" />
      </div>

      <fieldset>
        <legend className="mb-3 text-sm font-semibold text-ink">Ich interessiere mich für</legend>
        <div className="flex flex-wrap gap-2">
          {contactInterests.map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => setInterest(item.value)}
              aria-pressed={interest === item.value}
              className={`rounded-[11px] border px-4 py-2.5 text-sm font-semibold transition-all duration-200 ${
                interest === item.value
                  ? "border-accent-deep bg-accent-deep text-white"
                  : "border-border bg-white text-text-muted hover:border-accent hover:text-accent-deep"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-semibold text-ink">
          Nachricht <span aria-hidden="true">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="w-full rounded-[11px] border border-border bg-white px-4 py-3 text-[0.9375rem] text-ink placeholder:text-text-subtle focus:border-accent focus:outline-none"
          placeholder="Erzählen Sie uns kurz von Ihrer Immobilie oder Ihrem Anliegen."
        />
      </div>

      {status === "error" && errorMessage && (
        <p role="alert" className="rounded-[11px] bg-warning-soft px-4 py-3 text-sm text-warning">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex items-center gap-2 rounded-[11px] bg-accent-deep px-8 py-4 text-base font-semibold text-white transition-all duration-300 ease-smooth hover:-translate-y-0.5 hover:bg-accent-dark disabled:pointer-events-none disabled:opacity-60"
      >
        {status === "loading" && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
        Anfrage senden
      </button>

      <p className="text-[0.8125rem] leading-relaxed text-text-subtle">
        Mit dem Absenden stimmen Sie der Verarbeitung Ihrer Angaben zur Bearbeitung Ihrer Anfrage zu.
        Weitere Informationen finden Sie in unserer Datenschutzerklärung.
      </p>
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
      <label htmlFor={name} className="mb-2 block text-sm font-semibold text-ink">
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        autoComplete={autoComplete}
        required={required}
        className="w-full rounded-[11px] border border-border bg-white px-4 py-3 text-[0.9375rem] text-ink placeholder:text-text-subtle focus:border-accent focus:outline-none"
      />
    </div>
  );
}
