import type { Database } from "@/lib/supabase/database.types";

export type ReferenceCategory = "verkauf" | "vermietet";

/** Kundenmeinung zu einem vermittelten Objekt. */
export type Testimonial = {
  quote: string;
  rating?: number;
  label?: string;
  recommend?: boolean;
};

export type ReferenceObject = {
  id: string;
  slug: string;
  title: string;
  /** Ort im Format „Leverkusen – Stadtteil“. */
  region: string;
  category: ReferenceCategory;
  categoryLabel: string;
  typeLabel: string;
  livingSpace: number;
  rooms: number;
  year?: number;
  plot?: number;
  parking?: number;
  images: string[];
  summary: string;
  description: string[];
  equipment: string[];
  location: string;
  published: boolean;
  sortOrder: number;
  testimonial?: Testimonial;
};

export const referenceCategoryLabels: Record<ReferenceCategory, string> = {
  verkauf: "Verkauft",
  vermietet: "Vermietet",
};

/** Nimmt nur an, was mindestens ein Zitat trägt — alles andere wäre leer. */
function toTestimonial(value: unknown): Testimonial | undefined {
  if (typeof value !== "object" || value === null) return undefined;
  const record = value as Record<string, unknown>;
  if (typeof record.quote !== "string" || record.quote.trim() === "") return undefined;

  return {
    quote: record.quote,
    rating: typeof record.rating === "number" ? record.rating : undefined,
    label: typeof record.label === "string" ? record.label : undefined,
    recommend: typeof record.recommend === "boolean" ? record.recommend : undefined,
  };
}

function isReferenceCategory(value: string): value is ReferenceCategory {
  return value === "verkauf" || value === "vermietet";
}

type ReferenceRow = Database["public"]["Tables"]["reference_objects"]["Row"];

export function mapRowToReference(row: ReferenceRow): ReferenceObject {
  const category = isReferenceCategory(row.category) ? row.category : "verkauf";

  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    region: row.region,
    category,
    categoryLabel: referenceCategoryLabels[category],
    typeLabel: row.type_label,
    livingSpace: Number(row.living_space),
    rooms: Number(row.rooms),
    year: row.year ?? undefined,
    plot: row.plot === null ? undefined : Number(row.plot),
    parking: row.parking ?? undefined,
    images: row.images ?? [],
    summary: row.summary,
    description: row.description ?? [],
    equipment: row.equipment ?? [],
    location: row.location,
    published: row.published,
    sortOrder: row.sort_order,
    testimonial: toTestimonial(row.testimonial),
  };
}
