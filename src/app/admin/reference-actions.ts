"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { deutscheZahl, parseLines, slugify } from "@/lib/admin/form";
import { verschieben } from "@/lib/admin/reihenfolge";
import { fotosAufraeumen } from "@/lib/admin/speicher";
import { freieAdresse } from "@/lib/admin/adresse";
import { ABGELAUFEN, angemeldet } from "@/lib/admin/sitzung";
import type { FormularErgebnis } from "@/components/admin/Formular";

const fehler = (text: string, feld?: string): FormularErgebnis => ({ ok: false, fehler: text, feld, zeit: Date.now() });
const NOCHMAL = "Das hat gerade nicht geklappt. Bitte versuchen Sie es in einem Moment noch einmal.";

function text(daten: FormData, name: string) {
  return String(daten.get(name) ?? "").trim();
}

function ganzeZahl(daten: FormData, name: string): number | null {
  const zahl = deutscheZahl(daten.get(name));
  return zahl === null ? null : Math.round(zahl);
}

function allesAktualisieren(...pfade: string[]) {
  revalidatePath("/admin", "layout");
  revalidatePath("/");
  revalidatePath("/referenzen");
  for (const pfad of pfade) revalidatePath(pfad);
}

/**
 * Kundenmeinung aus dem Formular. Ohne Zitat gibt es keine — Sterne allein
 * ohne ein Wort dazu wären auf der Website ein leerer Rahmen.
 */
function meinung(formData: FormData) {
  const quote = text(formData, "meinung_zitat");
  if (!quote) return null;
  const rating = deutscheZahl(formData.get("meinung_sterne"));
  const label = text(formData, "meinung_urteil");
  return {
    quote,
    ...(rating ? { rating: Math.min(5, Math.max(1, rating)) } : {}),
    ...(label ? { label } : {}),
    recommend: formData.get("meinung_empfehlung") === "on",
  };
}

function referenzDaten(formData: FormData) {
  const title = text(formData, "title").replace(/\s+/g, " ");
  const region = text(formData, "region");
  const summary = text(formData, "summary");
  const category = text(formData, "category") === "vermietet" ? "vermietet" : "verkauf";

  if (!title) return { ok: false, fehler: "Bitte geben Sie der Referenz einen Titel.", feld: "title" } as const;
  if (!region) return { ok: false, fehler: "Bitte nennen Sie den Ort.", feld: "region" } as const;
  if (!summary) return { ok: false, fehler: "Bitte schreiben Sie ein, zwei Sätze als Kurzbeschreibung.", feld: "summary" } as const;

  return {
    ok: true,
    daten: {
      title,
      region,
      category,
      type_label: text(formData, "type_label"),
      living_space: deutscheZahl(formData.get("living_space")) ?? 0,
      rooms: deutscheZahl(formData.get("rooms")) ?? 0,
      year: ganzeZahl(formData, "year"),
      plot: deutscheZahl(formData.get("plot")),
      parking: ganzeZahl(formData, "parking"),
      images: formData.getAll("images").map(String).filter(Boolean),
      summary,
      description: parseLines(formData.get("description")),
      equipment: formData.getAll("equipment").map(String).filter(Boolean),
      location: text(formData, "location"),
      published: formData.get("published") === "on",
      testimonial: meinung(formData),
    },
  } as const;
}

export async function referenzAnlegen(_vorher: FormularErgebnis, formData: FormData): Promise<FormularErgebnis> {
  const ergebnis = referenzDaten(formData);
  if (!ergebnis.ok) return fehler(ergebnis.fehler, ergebnis.feld);

  const supabase = await angemeldet();
  if (!supabase) return fehler(ABGELAUFEN);
  const slug = await freieAdresse(supabase, "reference_objects", slugify(ergebnis.daten.title));
  const { data: vorderste } = await supabase
    .from("reference_objects")
    .select("sort_order")
    .order("sort_order", { ascending: true })
    .limit(1)
    .maybeSingle();

  const { data, error } = await supabase
    .from("reference_objects")
    .insert({ ...ergebnis.daten, slug, sort_order: (vorderste?.sort_order ?? 1) - 1 })
    .select("id")
    .single();

  if (error || !data) {
    console.error("Referenz nicht angelegt:", error?.message);
    return fehler(NOCHMAL);
  }

  allesAktualisieren(`/referenzen/${slug}`);
  redirect(`/admin/referenzen/${data.id}?angelegt=1`);
}

export async function referenzSpeichern(id: string, _vorher: FormularErgebnis, formData: FormData): Promise<FormularErgebnis> {
  const ergebnis = referenzDaten(formData);
  if (!ergebnis.ok) return fehler(ergebnis.fehler, ergebnis.feld);

  const supabase = await angemeldet();
  if (!supabase) return fehler(ABGELAUFEN);
  const { data: bisher } = await supabase.from("reference_objects").select("slug, published, images").eq("id", id).maybeSingle();
  if (!bisher) return fehler("Diese Referenz gibt es nicht mehr — vielleicht wurde sie gerade gelöscht.");

  const slug = bisher.published
    ? bisher.slug
    : await freieAdresse(supabase, "reference_objects", slugify(ergebnis.daten.title), id);

  const { data: geaendert, error } = await supabase.from("reference_objects").update({ ...ergebnis.daten, slug }).eq("id", id)
    .select("id");
  if (error) {
    console.error("Referenz nicht gespeichert:", error.message);
    return fehler(NOCHMAL);
  }
  if (!geaendert?.length) return fehler(ABGELAUFEN);

  await fotosAufraeumen(supabase, bisher.images ?? [], ergebnis.daten.images);
  allesAktualisieren(`/referenzen/${bisher.slug}`, `/referenzen/${slug}`);

  return {
    ok: true,
    zeit: Date.now(),
    meldung: ergebnis.daten.published ? "Gespeichert — die Website ist aktuell." : "Gespeichert. Die Referenz ist noch offline.",
  };
}

export async function referenzLoeschen(id: string) {
  const supabase = await angemeldet();
  if (!supabase) throw new Error("Nicht angemeldet");
  const { data: bisher } = await supabase.from("reference_objects").select("slug, images").eq("id", id).maybeSingle();
  const { data: geloescht, error } = await supabase.from("reference_objects").delete().eq("id", id).select("id");
  if (error) {
    console.error("Referenz nicht gelöscht:", error.message);
    throw new Error("Löschen fehlgeschlagen");
  }
  if (!geloescht?.length) throw new Error("Nichts gelöscht");

  if (bisher) await fotosAufraeumen(supabase, bisher.images ?? [], []);
  allesAktualisieren(bisher ? `/referenzen/${bisher.slug}` : "/referenzen");
  return { ok: true };
}

export async function referenzOnline(id: string, online: boolean) {
  const supabase = await angemeldet();
  if (!supabase) throw new Error("Nicht angemeldet");
  const { data, error } = await supabase
    .from("reference_objects")
    .update({ published: online })
    .eq("id", id)
    .select("slug")
    .maybeSingle();
  if (error) {
    console.error("Sichtbarkeit nicht geändert:", error.message);
    throw new Error("Sichtbarkeit nicht geändert");
  }
  allesAktualisieren(data ? `/referenzen/${data.slug}` : "/referenzen");
}

export async function referenzVerschieben(id: string, richtung: -1 | 1) {
  const supabase = await angemeldet();
  if (!supabase) throw new Error("Nicht angemeldet");
  const { data, error } = await supabase
    .from("reference_objects")
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
        : supabase.from("reference_objects").update({ sort_order: index }).eq("id", zeilenId)
    )
  );
  allesAktualisieren();
}
