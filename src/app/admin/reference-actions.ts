"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { referenceSlugExists } from "@/lib/admin/references-data";
import { parseLines, parseNumber, parseOptionalNumber, slugify } from "@/lib/admin/form";

export type ReferenceFormResult = { error?: string } | void;

function revalidateReferences(slug?: string) {
  revalidatePath("/admin/referenzen");
  revalidatePath("/referenzen");
  revalidatePath("/");
  if (slug) revalidatePath(`/referenzen/${slug}`);
}

function buildReferencePayload(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const region = String(formData.get("region") ?? "").trim();
  const summary = String(formData.get("summary") ?? "").trim();
  const slugInput = String(formData.get("slug") ?? "").trim();
  const category = String(formData.get("category") ?? "verkauf");

  if (!title || !region || !summary) {
    return { error: "Titel, Ort und Kurzbeschreibung sind Pflichtfelder." } as const;
  }

  if (category !== "verkauf" && category !== "vermietet") {
    return { error: "Bitte Verkauf oder Vermietung auswählen." } as const;
  }

  const slug = slugify(slugInput || title);
  if (!slug) {
    return { error: "Bitte einen gültigen Titel oder Slug angeben." } as const;
  }

  return {
    payload: {
      slug,
      title,
      region,
      category,
      type_label: String(formData.get("type_label") ?? "").trim(),
      living_space: parseNumber(formData.get("living_space")),
      rooms: parseNumber(formData.get("rooms")),
      year: parseOptionalNumber(formData.get("year")),
      plot: parseOptionalNumber(formData.get("plot")),
      parking: parseOptionalNumber(formData.get("parking")),
      images: parseLines(formData.get("images")),
      summary,
      description: parseLines(formData.get("description")),
      equipment: parseLines(formData.get("equipment")),
      location: String(formData.get("location") ?? "").trim(),
      published: formData.get("published") === "on",
      sort_order: parseNumber(formData.get("sort_order")),
    },
  } as const;
}

export async function createReference(
  _prevState: ReferenceFormResult,
  formData: FormData
): Promise<ReferenceFormResult> {
  const result = buildReferencePayload(formData);
  if ("error" in result) return { error: result.error };

  if (await referenceSlugExists(result.payload.slug)) {
    return { error: `Der Slug "${result.payload.slug}" wird bereits verwendet.` };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("reference_objects").insert(result.payload);
  if (error) return { error: `Speichern fehlgeschlagen: ${error.message}` };

  revalidateReferences(result.payload.slug);
  redirect("/admin/referenzen");
}

export async function updateReference(
  id: string,
  _prevState: ReferenceFormResult,
  formData: FormData
): Promise<ReferenceFormResult> {
  const result = buildReferencePayload(formData);
  if ("error" in result) return { error: result.error };

  if (await referenceSlugExists(result.payload.slug, id)) {
    return { error: `Der Slug "${result.payload.slug}" wird bereits verwendet.` };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("reference_objects").update(result.payload).eq("id", id);
  if (error) return { error: `Speichern fehlgeschlagen: ${error.message}` };

  revalidateReferences(result.payload.slug);
  redirect("/admin/referenzen");
}

export async function deleteReference(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("reference_objects").delete().eq("id", id);
  if (error) throw new Error(`Löschen fehlgeschlagen: ${error.message}`);
  revalidateReferences();
}

export async function toggleReferencePublished(id: string, published: boolean) {
  const supabase = await createClient();
  const { error } = await supabase.from("reference_objects").update({ published }).eq("id", id);
  if (error) throw new Error(error.message);
  revalidateReferences();
}
