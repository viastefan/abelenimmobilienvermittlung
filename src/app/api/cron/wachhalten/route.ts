import { NextResponse } from "next/server";
import { supabasePublic } from "@/lib/supabase/public";

export const dynamic = "force-dynamic";

/**
 * Hält die Datenbank wach.
 *
 * Supabase legt Projekte im kostenlosen Tarif nach sieben Tagen ohne Zugriff
 * schlafen. Dann nimmt die Website keine Anfragen mehr an, die App meldet
 * niemanden mehr an, und das Projekt muss von Hand wieder angeworfen werden.
 * Eine ruhige Woche ohne Besucher reicht dafür.
 *
 * Vercel ruft diese Adresse deshalb jeden Morgen auf (`vercel.json`). Eine
 * einzige Leseanfrage genügt, damit das Projekt als benutzt gilt. Gelesen
 * wird mit dem öffentlichen Schlüssel — dieselbe Anfrage, die jeder Besucher
 * der Startseite stellt; die Adresse gibt nichts preis.
 *
 * Ist bei Vercel `CRON_SECRET` gesetzt, schickt Vercel ihn mit, und nur
 * dieser Aufruf wird angenommen.
 */
export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (secret && request.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const client = supabasePublic();
  if (!client) {
    return NextResponse.json({ ok: false, grund: "Datenbank nicht verbunden" }, { status: 503 });
  }

  const { error } = await client.from("properties").select("id").limit(1);
  if (error) {
    console.error("Wachhalten: Datenbank antwortet nicht:", error.message);
    return NextResponse.json({ ok: false }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
