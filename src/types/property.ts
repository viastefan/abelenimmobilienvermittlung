import type { Database } from "@/lib/supabase/database.types";

export type PropertyStatus = "verkauft" | "reserviert" | "zu-verkaufen";

export type PropertyFeature = {
  label: string;
  value: string;
};

export type Property = {
  id: string;
  slug: string;
  title: string;
  city: string;
  status: PropertyStatus;
  statusLabel: string;
  price: number;
  priceLabel: string;
  livingSpace: number;
  rooms: number;
  images: string[];
  heroNote?: string;
  summary: string;
  description: string[];
  features: PropertyFeature[];
  equipment: string[];
  location: string;
  energy: {
    label: string;
    value: string;
  }[];
  featured: boolean;
  published: boolean;
};

const statusLabels: Record<PropertyStatus, string> = {
  "zu-verkaufen": "Zu verkaufen",
  reserviert: "Reserviert",
  verkauft: "Verkauft",
};

export function formatPrice(price: number) {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(price);
}

function isPropertyStatus(value: string): value is PropertyStatus {
  return value === "verkauft" || value === "reserviert" || value === "zu-verkaufen";
}

type PropertyRow = Database["public"]["Tables"]["properties"]["Row"];

export function mapRowToProperty(row: PropertyRow): Property {
  const status = isPropertyStatus(row.status) ? row.status : "zu-verkaufen";
  const features = Array.isArray(row.features) ? (row.features as unknown as PropertyFeature[]) : [];
  const energy = Array.isArray(row.energy) ? (row.energy as unknown as { label: string; value: string }[]) : [];

  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    city: row.city,
    status,
    statusLabel: statusLabels[status],
    price: Number(row.price),
    priceLabel: formatPrice(Number(row.price)),
    livingSpace: Number(row.living_space),
    rooms: Number(row.rooms),
    images: row.images ?? [],
    heroNote: row.hero_note ?? undefined,
    summary: row.summary,
    description: row.description ?? [],
    features,
    equipment: row.equipment ?? [],
    location: row.location,
    energy,
    featured: row.featured,
    published: row.published,
  };
}
