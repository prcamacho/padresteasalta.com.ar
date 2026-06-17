export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      activities: {
        Row: {
          id: string;
          title: string;
          slug: string;
          summary: string;
          description: string | null;
          organizer_name: string | null;
          status: "draft" | "published" | "archived";
          starts_at: string | null;
          ends_at: string | null;
          location_name: string | null;
          address: string | null;
          modality: string;
          is_featured: boolean;
          registration_url: string | null;
          cover_media_id: string | null;
          created_by: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          summary: string;
          description?: string | null;
          organizer_name?: string | null;
          status?: "draft" | "published" | "archived";
          starts_at?: string | null;
          ends_at?: string | null;
          location_name?: string | null;
          address?: string | null;
          modality?: string;
          is_featured?: boolean;
          registration_url?: string | null;
          cover_media_id?: string | null;
          created_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          summary?: string;
          description?: string | null;
          organizer_name?: string | null;
          status?: "draft" | "published" | "archived";
          starts_at?: string | null;
          ends_at?: string | null;
          location_name?: string | null;
          address?: string | null;
          modality?: string;
          is_featured?: boolean;
          registration_url?: string | null;
          cover_media_id?: string | null;
          created_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      contact_inquiries: {
        Row: {
          id: string;
          type:
            | "orientation"
            | "activity_proposal"
            | "directory_submission"
            | "sponsorship"
            | "other";
          status: "new" | "in_review" | "responded" | "closed";
          priority: "normal" | "high" | "urgent";
          full_name: string;
          created_at: string;
          updated_at: string;
        };
        Insert: Record<string, never>;
        Update: Record<string, never>;
      };
      directory_entries: {
        Row: {
          id: string;
          category:
            | "therapy_center"
            | "professional"
            | "family_business"
            | "company"
            | "resource";
          name: string;
          slug: string;
          publication_status: "draft" | "published" | "archived";
          verification_status: "pending" | "verified" | "outdated" | "rejected";
          created_at: string;
          updated_at: string;
        };
        Insert: Record<string, never>;
        Update: Record<string, never>;
      };
      profiles: {
        Row: {
          id: string;
          display_name: string | null;
          phone: string | null;
          role: "member" | "editor" | "admin";
          created_at: string;
          updated_at: string;
        };
        Insert: Record<string, never>;
        Update: Record<string, never>;
      };
      sponsor_campaigns: {
        Row: {
          id: string;
          slot_id: string;
          sponsor_name: string;
          status: "draft" | "scheduled" | "active" | "expired" | "cancelled";
          starts_on: string | null;
          ends_on: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Record<string, never>;
        Update: Record<string, never>;
      };
      sponsor_slots: {
        Row: {
          id: string;
          placement: string;
          label: string;
          title: string;
          description: string;
          is_active: boolean;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          placement: string;
          label: string;
          title: string;
          description: string;
          is_active?: boolean;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          placement?: string;
          label?: string;
          title?: string;
          description?: string;
          is_active?: boolean;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      app_role: "member" | "editor" | "admin";
      directory_category:
        | "therapy_center"
        | "professional"
        | "family_business"
        | "company"
        | "resource";
      inquiry_priority: "normal" | "high" | "urgent";
      inquiry_status: "new" | "in_review" | "responded" | "closed";
      inquiry_type:
        | "orientation"
        | "activity_proposal"
        | "directory_submission"
        | "sponsorship"
        | "other";
      media_visibility: "public" | "private";
      publish_status: "draft" | "published" | "archived";
      sponsor_campaign_status:
        | "draft"
        | "scheduled"
        | "active"
        | "expired"
        | "cancelled";
      verification_status: "pending" | "verified" | "outdated" | "rejected";
    };
    CompositeTypes: Record<string, never>;
  };
};
