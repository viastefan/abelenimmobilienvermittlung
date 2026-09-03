export type PropertyStatus = "verkauft" | "reserviert" | "zu-verkaufen";

export type PropertyFeature = {
  label: string;
  value: string;
};

export type Property = {
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
  featured?: boolean;
};
