import { NextResponse } from "next/server";
import { site } from "@/data/site";

export const runtime = "nodejs";

const interestLabels: Record<string, string> = {
  verkaufen: "Immobilie verkaufen",
  kaufen: "Immobilie kaufen",
  bewertung: "Immobilienbewertung",
  sonstiges: "Sonstiges",
};

type ContactPayload = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  interest?: string;
  message?: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let payload: ContactPayload;

  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ error: "Ungültige Anfrage." }, { status: 400 });
  }

  const { firstName, lastName, email, phone, interest, message } = payload;

  if (!firstName?.trim() || !lastName?.trim() || !message?.trim()) {
    return NextResponse.json(
      { error: "Bitte füllen Sie Vorname, Nachname und Nachricht aus." },
      { status: 400 }
    );
  }

  if (!email || !EMAIL_PATTERN.test(email)) {
    return NextResponse.json({ error: "Bitte geben Sie eine gültige E-Mail-Adresse an." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL ?? site.email;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !fromEmail) {
    console.error(
      "Kontaktformular: RESEND_API_KEY oder CONTACT_FROM_EMAIL ist nicht gesetzt. Anfrage wurde nicht versendet.",
      { firstName, lastName, email, phone, interest }
    );
    return NextResponse.json(
      { error: "Der E-Mail-Versand ist derzeit nicht verfügbar. Bitte kontaktieren Sie uns telefonisch." },
      { status: 503 }
    );
  }

  const interestLabel = interest ? interestLabels[interest] ?? interest : "Nicht angegeben";

  const emailBody = [
    `Neue Anfrage über das Kontaktformular von ${site.name}`,
    "",
    `Name: ${firstName} ${lastName}`,
    `E-Mail: ${email}`,
    `Telefon: ${phone || "Nicht angegeben"}`,
    `Interessiert an: ${interestLabel}`,
    "",
    "Nachricht:",
    message,
  ].join("\n");

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: toEmail,
        reply_to: email,
        subject: `Neue Anfrage: ${interestLabel} — ${firstName} ${lastName}`,
        text: emailBody,
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error("Resend-Fehler:", errorBody);
      return NextResponse.json({ error: "Ihre Anfrage konnte nicht gesendet werden." }, { status: 502 });
    }
  } catch (error) {
    console.error("Fehler beim Senden der Kontaktanfrage:", error);
    return NextResponse.json({ error: "Ihre Anfrage konnte nicht gesendet werden." }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
