"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { slugExists } from "@/lib/admin/properties-data";
import type { PropertyFeature } from "@/types/property";

export async function signIn(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const next = String(formData.get("next") ?? "/admin");

  if (!email || !password) {
    redirect(`/admin/login?error=${encodeURIComponent("Bitte E-Mail und Passwort eingeben.")}`);
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    redirect(`/admin/login?error=${encodeURIComponent("E-Mail oder Passwort ist falsch.")}`);
  }

  redirect(next.startsWith("/admin") ? next : "/admin");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

function parseLines(value: FormDataEntryValue | null): string[] {
  return String(value ?? "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function parseKeyValueList(formData: FormData, labelField: string, valueField: string): PropertyFeature[] {
  const labels = formData.getAll(labelField) as string[];
  const values = formData.getAll(valueField) as string[];
  const items: PropertyFeature[] = [];
  labels.forEach((label, index) => {
    const trimmedLabel = label.trim();
    const trimmedValue = (values[index] ?? "").trim();
    if (trimmedLabel && trimmedValue) items.push({ label: trimmedLabel, value: trimmedValue });
  });
  return items;
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-+|-+$)/g, "");
}

export type PropertyFormResult = { error?: string } | void;

function buildPropertyPayload(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const city = String(formData.get("city") ?? "").trim();
  const slugInput = String(formData.get("slug") ?? "").trim();
  const status = String(formData.get("status") ?? "zu-verkaufen");
  const price = Number(formData.get("price") ?? 0);
  const livingSpace = Number(formData.get("living_space") ?? 0);
  const rooms = Number(formData.get("rooms") ?? 0);
  const summary = String(formData.get("summary") ?? "").trim();
  const location = String(formData.get("location") ?? "").trim();
  const heroNote = String(formData.get("hero_note") ?? "").trim();
  const images = parseLines(formData.get("images"));
  const description = parseLines(formData.get("description"));
  const equipment = parseLines(formData.get("equipment"));
  const featured = formData.get("featured") === "on";
  const published = formData.get("published") === "on";
  const features = parseKeyValueList(formData, "feature_label", "feature_value");
  const energy = parseKeyValueList(formData, "energy_label", "energy_value");

  if (!title || !city || !summary) {
    return { error: "Titel, Ort und Zusammenfassung sind Pflichtfelder." } as const;
  }

  const slug = slugify(slugInput || title);
  if (!slug) {
    return { error: "Bitte einen gültigen Titel oder Slug angeben." } as const;
  }

  return {
    payload: {
      title,
      city,
      slug,
      status,
      price,
      living_space: livingSpace,
      rooms,
      summary,
      location,
      hero_note: heroNote || null,
      images,
      description,
      equipment,
      featured,
      published,
      features: features as unknown as never,
      energy: energy as unknown as never,
    },
  } as const;
}

export async function createProperty(_prevState: PropertyFormResult, formData: FormData): Promise<PropertyFormResult> {
  const result = buildPropertyPayload(formData);
  if ("error" in result) return { error: result.error };

  if (await slugExists(result.payload.slug)) {
    return { error: `Der Slug "${result.payload.slug}" wird bereits verwendet.` };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("properties").insert(result.payload);

  if (error) {
    return { error: `Speichern fehlgeschlagen: ${error.message}` };
  }

  revalidatePath("/admin/immobilien");
  revalidatePath("/immobilien");
  revalidatePath("/");
  redirect("/admin/immobilien");
}

export async function updateProperty(
  id: string,
  _prevState: PropertyFormResult,
  formData: FormData
): Promise<PropertyFormResult> {
  const result = buildPropertyPayload(formData);
  if ("error" in result) return { error: result.error };

  if (await slugExists(result.payload.slug, id)) {
    return { error: `Der Slug "${result.payload.slug}" wird bereits verwendet.` };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("properties").update(result.payload).eq("id", id);

  if (error) {
    return { error: `Speichern fehlgeschlagen: ${error.message}` };
  }

  revalidatePath("/admin/immobilien");
  revalidatePath("/immobilien");
  revalidatePath(`/immobilien/${result.payload.slug}`);
  revalidatePath("/");
  redirect("/admin/immobilien");
}

export async function deleteProperty(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("properties").delete().eq("id", id);

  if (error) {
    throw new Error(`Löschen fehlgeschlagen: ${error.message}`);
  }

  revalidatePath("/admin/immobilien");
  revalidatePath("/immobilien");
  revalidatePath("/");
}

export async function togglePublished(id: string, published: boolean) {
  const supabase = await createClient();
  const { error } = await supabase.from("properties").update({ published }).eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/immobilien");
  revalidatePath("/immobilien");
  revalidatePath("/");
}

export async function toggleFeatured(id: string, featured: boolean) {
  const supabase = await createClient();
  const { error } = await supabase.from("properties").update({ featured }).eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/immobilien");
  revalidatePath("/");
}
