export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "14.5";
  };
  public: {
    Tables: {
      properties: {
        Row: {
          city: string;
          created_at: string;
          description: string[];
          energy: Json;
          equipment: string[];
          featured: boolean;
          features: Json;
          hero_note: string | null;
          id: string;
          images: string[];
          living_space: number;
          location: string;
          price: number;
          published: boolean;
          rooms: number;
          slug: string;
          sort_order: number;
          status: string;
          summary: string;
          title: string;
          updated_at: string;
        };
        Insert: {
          city: string;
          created_at?: string;
          description?: string[];
          energy?: Json;
          equipment?: string[];
          featured?: boolean;
          features?: Json;
          hero_note?: string | null;
          id?: string;
          images?: string[];
          living_space?: number;
          location?: string;
          price?: number;
          published?: boolean;
          rooms?: number;
          slug: string;
          sort_order?: number;
          status?: string;
          summary?: string;
          title: string;
          updated_at?: string;
        };
        Update: {
          city?: string;
          created_at?: string;
          description?: string[];
          energy?: Json;
          equipment?: string[];
          featured?: boolean;
          features?: Json;
          hero_note?: string | null;
          id?: string;
          images?: string[];
          living_space?: number;
          location?: string;
          price?: number;
          published?: boolean;
          rooms?: number;
          slug?: string;
          sort_order?: number;
          status?: string;
          summary?: string;
          title?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: { [_ in never]: never };
    Functions: { [_ in never]: never };
    Enums: { [_ in never]: never };
    CompositeTypes: { [_ in never]: never };
  };
};
