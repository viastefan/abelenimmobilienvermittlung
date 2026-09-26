"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { getSupabaseEnv } from "@/lib/supabase/env";
import { deutscheZahl, parseKeyValueList, parseLines, slugify } from "@/lib/admin/form";
import { ausweisarten, energieSchreiben, type Ausweisart } from "@/lib/admin/energie";
import { verschieben } from "@/lib/admin/reihenfolge";
import { fotosAufraeumen } from "@/lib/admin/speicher";
import { freieAdresse } from "@/lib/admin/adresse";
import { ABGELAUFEN, angemeldet } from "@/lib/admin/sitzung";
import type { FormularErgebnis } from "@/components/admin/Formular";

/**
 * Was die App auf dem Server tut.
 *
 * Fehlermeldungen sagen, was zu tun ist — nie, was in der Datenbank schief
 * lief. Das steht im Protokoll des Servers, wo es jemand lesen kann, der
 * damit etwas anfangen kann.
 */

const fehler = (text: string, feld?: string): FormularErgebnis => ({ ok: false, fehler: text, feld, zeit: Date.now() });
const NOCHMAL = "Das hat gerade nicht geklappt. Bitte versuchen Sie es in einem Moment noch einmal.";

function text(daten: FormData, name: string) {
  return String(daten.get(name) ?? "").trim();
}

/** App und Website neu aufbauen — die App vollständig, die Website dort, wo Objekte stehen. */
function allesAktualisieren(...pfade: string[]) {
  revalidatePath("/admin", "layout");
  revalidatePath("/");
  revalidatePath("/referenzen");
  revalidatePath("/kaufen");
  for (const pfad of pfade) revalidatePath(pfad);
}

/* ---------------------------------------------------------------- Zugang */

export async function signIn(formData: FormData) {
  const email = text(formData, "email");
  const password = String(formData.get("password") ?? "");
  const next = text(formData, "next") || "/admin";
  const zurueck = (meldung: string) =>
    redirect(`/admin/login?error=${encodeURIComponent(meldung)}&email=${encodeURIComponent(email)}`);

  if (!getSupabaseEnv()) {
    zurueck("Die Anmeldung ist gerade nicht erreichbar. Bitte versuchen Sie es in ein paar Minuten noch einmal.");
  }
  if (!email || !password) {
    zurueck("Bitte geben Sie Ihre E-Mail-Adresse und Ihr Passwort ein.");
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    if (error.status !== 400) console.error("Anmeldung fehlgeschlagen:", error.message);
    zurueck(
      error.status === 400
        ? "E-Mail-Adresse oder Passwort stimmen nicht. Bitte prüfen Sie beides."
        : "Die Anmeldung ist gerade nicht erreichbar. Bitte versuchen Sie es in ein paar Minuten noch einmal."
    );
  }

  redirect(next.startsWith("/admin") ? next : "/admin");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login?abgemeldet=1");
}

export async function passwortAendern(_vorher: FormularErgebnis, formData: FormData): Promise<FormularErgebnis> {
  const passwort = String(formData.get("passwort") ?? "");
  const wiederholung = String(formData.get("passwort_wiederholen") ?? "");

  if (passwort.length < 8) return fehler("Bitte wählen Sie mindestens acht Zeichen.", "passwort");
  if (passwort !== wiederholung) return fehler("Die beiden Eingaben sind nicht gleich.", "passwort_wiederholen");

  const supabase = await angemeldet();
  if (!supabase) return fehler(ABGELAUFEN);
  const { error } = await supabase.auth.updateUser({ password: passwort });

  if (error) {
    if (error.code === "same_password") return fehler("Das ist bereits Ihr Passwort.", "passwort");
    if (error.code === "weak_password") return fehler("Dieses Passwort ist zu leicht zu erraten. Bitte wählen Sie ein anderes.", "passwort");
    console.error("Passwort nicht geändert:", error.message);
    return fehler(NOCHMAL);
  }

  return { ok: true, zeit: Date.now(), meldung: "Ihr neues Passwort gilt ab sofort." };
}

/* --------------------------------------------------------------- Objekte */

const statusWerte = ["zu-verkaufen", "reserviert", "verkauft"] as const;
const hauptangaben = /^(wohnfläche|zimmer)$/i;

function objektDaten(formData: FormData) {
  const title = text(formData, "title").replace(/\s+/g, " ");
  const city = text(formData, "city");
  const price = deutscheZahl(formData.get("price"));
  const summary = text(formData, "summary");
  const status = text(formData, "status");
  const ausweis = text(formData, "energie_ausweis");

  if (!title) return { ok: false, fehler: "Bitte geben Sie dem Objekt einen Titel.", feld: "title" } as const;
  if (!city) return { ok: false, fehler: "Bitte nennen Sie den Ort des Objekts.", feld: "city" } as const;
  if (!price) return { ok: false, fehler: "Bitte tragen Sie den Kaufpreis ein.", feld: "price" } as const;
  if (!summary) return { ok: false, fehler: "Bitte schreiben Sie ein, zwei Sätze als Kurzbeschreibung.", feld: "summary" } as const;

  return {
    ok: true,
    daten: {
      title,
      city,
      price,
      status: (statusWerte as readonly string[]).includes(status) ? status : "zu-verkaufen",
      living_space: deutscheZahl(formData.get("living_space")) ?? 0,
      rooms: deutscheZahl(formData.get("rooms")) ?? 0,
      hero_note: text(formData, "hero_note") || null,
      summary,
      description: parseLines(formData.get("description")),
      location: text(formData, "location"),
      equipment: formData.getAll("equipment").map(String).filter(Boolean),
      images: formData.getAll("images").map(String).filter(Boolean),
      // Wohnfläche und Zimmer stehen in eigenen Feldern; doppelt geführt, liefen sie auseinander.
      features: parseKeyValueList(formData, "angabe_label", "angabe_wert").filter((eintrag) => !hauptangaben.test(eintrag.label)),
      energy: energieSchreiben({
        ausweis: ausweisarten.some((art) => art.value === ausweis) ? (ausweis as Ausweisart) : "",
        kennwert: text(formData, "energie_kennwert"),
        klasse: text(formData, "energie_klasse"),
        traeger: text(formData, "energie_traeger"),
        baujahr: text(formData, "energie_baujahr"),
        weitere: parseKeyValueList(formData, "energie_weitere_label", "energie_weitere_wert"),
      }),
      published: formData.get("published") === "on",
      featured: formData.get("featured") === "on",
    },
  } as const;
}

export async function objektAnlegen(_vorher: FormularErgebnis, formData: FormData): Promise<FormularErgebnis> {
  const ergebnis = objektDaten(formData);
  if (!ergebnis.ok) return fehler(ergebnis.fehler, ergebnis.feld);

  const supabase = await angemeldet();
  if (!supabase) return fehler(ABGELAUFEN);
  const slug = await freieAdresse(supabase, "properties", slugify(ergebnis.daten.title));
  // Neue Objekte stehen vorn — dort sucht man sie nach dem Anlegen.
  const { data: vorderstes } = await supabase
    .from("properties")
    .select("sort_order")
    .order("sort_order", { ascending: true })
    .limit(1)
    .maybeSingle();

  const { data, error } = await supabase
    .from("properties")
    .insert({
      ...ergebnis.daten,
      features: ergebnis.daten.features as never,
      energy: ergebnis.daten.energy as never,
      slug,
      sort_order: (vorderstes?.sort_order ?? 1) - 1,
    })
    .select("id")
    .single();

  if (error || !data) {
    console.error("Objekt nicht angelegt:", error?.message);
    return fehler(NOCHMAL);
  }

  allesAktualisieren(`/immobilien/${slug}`);
  redirect(`/admin/immobilien/${data.id}?angelegt=1`);
}

export async function objektSpeichern(id: string, _vorher: FormularErgebnis, formData: FormData): Promise<FormularErgebnis> {
  const ergebnis = objektDaten(formData);
  if (!ergebnis.ok) return fehler(ergebnis.fehler, ergebnis.feld);

  const supabase = await angemeldet();
  if (!supabase) return fehler(ABGELAUFEN);
  const { data: bisher } = await supabase.from("properties").select("slug, published, images").eq("id", id).maybeSingle();
  if (!bisher) return fehler("Dieses Objekt gibt es nicht mehr — vielleicht wurde es gerade gelöscht.");

  // Die Adresse folgt dem Titel, solange das Objekt nicht online ist. Danach
  // bleibt sie: Links in Mails, bei Google und in Portalen führen sonst ins Leere.
  const slug = bisher.published
    ? bisher.slug
    : await freieAdresse(supabase, "properties", slugify(ergebnis.daten.title), id);

  const { data: geaendert, error } = await supabase
    .from("properties")
    .update({
      ...ergebnis.daten,
      features: ergebnis.daten.features as never,
      energy: ergebnis.daten.energy as never,
      slug,
    })
    .eq("id", id)
    .select("id");

  if (error) {
    console.error("Objekt nicht gespeichert:", error.message);
    return fehler(NOCHMAL);
  }
  if (!geaendert?.length) return fehler(ABGELAUFEN);

  await fotosAufraeumen(supabase, bisher.images ?? [], ergebnis.daten.images);
  allesAktualisieren(`/immobilien/${bisher.slug}`, `/immobilien/${slug}`);

  return {
    ok: true,
    zeit: Date.now(),
    meldung: ergebnis.daten.published ? "Gespeichert — die Website ist aktuell." : "Gespeichert. Das Objekt ist noch offline.",
  };
}

export async function objektLoeschen(id: string) {
  const supabase = await angemeldet();
  if (!supabase) throw new Error("Nicht angemeldet");
  const { data: bisher } = await supabase.from("properties").select("slug, images").eq("id", id).maybeSingle();
  const { data: geloescht, error } = await supabase.from("properties").delete().eq("id", id).select("id");
  if (error) {
    console.error("Objekt nicht gelöscht:", error.message);
    throw new Error("Löschen fehlgeschlagen");
  }
  if (!geloescht?.length) throw new Error("Nichts gelöscht");

  if (bisher) await fotosAufraeumen(supabase, bisher.images ?? [], []);
  allesAktualisieren(bisher ? `/immobilien/${bisher.slug}` : "/");
  return { ok: true };
}

export async function objektOnline(id: string, online: boolean) {
  const supabase = await angemeldet();
  if (!supabase) throw new Error("Nicht angemeldet");
  const { data, error } = await supabase.from("properties").update({ published: online }).eq("id", id).select("slug").maybeSingle();
  if (error) {
    console.error("Sichtbarkeit nicht geändert:", error.message);
    throw new Error("Sichtbarkeit nicht geändert");
  }
  allesAktualisieren(data ? `/immobilien/${data.slug}` : "/");
}

export async function objektHervorheben(id: string, hervorheben: boolean) {
  const supabase = await angemeldet();
  if (!supabase) throw new Error("Nicht angemeldet");
  const { error } = await supabase.from("properties").update({ featured: hervorheben }).eq("id", id);
  if (error) {
    console.error("Hervorhebung nicht geändert:", error.message);
    throw new Error("Hervorhebung nicht geändert");
  }
  allesAktualisieren();
}

export async function objektVerschieben(id: string, richtung: -1 | 1) {
  const supabase = await angemeldet();
  if (!supabase) throw new Error("Nicht angemeldet");
  const { data, error } = await supabase
    .from("properties")
    .select("id, sort_order")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });
  if (error || !data) throw new Error("Reihenfolge nicht geladen");

  const neu = verschieben(
    data.map((zeile) => zeile.id),
    id,
    richtung
  );
  if (!neu) return;

  await Promise.all(
    neu.map((zeilenId, index) =>
      data.find((zeile) => zeile.id === zeilenId)?.sort_order === index
        ? null
        : supabase.from("properties").update({ sort_order: index }).eq("id", zeilenId)
    )
  );
  allesAktualisieren();
}
