import {
  activities as fallbackActivities,
  sponsorSlots as fallbackSponsorSlots
} from "@/data/site";
import type { ActivityItem, SponsorSlot } from "@/data/site";

import { createSupabaseServerClient } from "./server";
import type { Database } from "./types";

type SponsorPlacement = SponsorSlot["placement"];
type SponsorSlotRow = Pick<
  Database["public"]["Tables"]["sponsor_slots"]["Row"],
  "id" | "placement" | "label" | "title" | "description"
>;
type PublicActivityRow = Pick<
  Database["public"]["Tables"]["activities"]["Row"],
  | "title"
  | "summary"
  | "description"
  | "organizer_name"
  | "starts_at"
  | "ends_at"
  | "location_name"
  | "address"
  | "modality"
  | "is_featured"
  | "registration_url"
>;

const publicActivitySelect =
  "title, summary, description, organizer_name, starts_at, ends_at, location_name, address, modality, is_featured, registration_url" as const;

const activityDateFormatter = new Intl.DateTimeFormat("es-AR", {
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  month: "short",
  timeZone: "America/Argentina/Buenos_Aires",
  year: "numeric"
});

const modalityLabels: Record<string, string> = {
  hybrid: "Hibrida",
  in_person: "Presencial",
  online: "Virtual",
  to_confirm: "A confirmar"
};

function getFallbackActivities(limit?: number): ActivityItem[] {
  const activities = fallbackActivities.map((activity) => ({
    ...activity,
    source: "fallback" as const
  }));

  return typeof limit === "number" ? activities.slice(0, limit) : activities;
}

function formatActivityDate(activity: PublicActivityRow) {
  if (!activity.starts_at) {
    return "Fecha a confirmar";
  }

  const start = activityDateFormatter.format(new Date(activity.starts_at));

  if (!activity.ends_at) {
    return start;
  }

  return `${start} a ${activityDateFormatter.format(new Date(activity.ends_at))}`;
}

function formatActivityPlace(activity: PublicActivityRow) {
  const place = [activity.location_name, activity.address]
    .filter(Boolean)
    .join(" - ");

  return place || modalityLabels[activity.modality] || activity.modality;
}

function mapPublicActivity(activity: PublicActivityRow): ActivityItem {
  const meta = [formatActivityDate(activity), formatActivityPlace(activity)]
    .filter(Boolean)
    .join(" - ");

  return {
    title: activity.title,
    meta,
    description: activity.summary || activity.description || "",
    status: activity.is_featured
      ? "Destacada"
      : modalityLabels[activity.modality] || "Actividad",
    registrationUrl: activity.registration_url,
    source: "database"
  };
}

export async function getSponsorSlots(): Promise<
  Record<SponsorPlacement, SponsorSlot>
> {
  const supabase = createSupabaseServerClient();

  if (!supabase) {
    return fallbackSponsorSlots;
  }

  const result = await supabase
    .from("sponsor_slots")
    .select("id, placement, label, title, description, is_active, sort_order")
    .eq("is_active", true)
    .order("sort_order", { ascending: true })
    .then(
      (response) => response,
      () => null
    );

  const data = result?.data as SponsorSlotRow[] | null | undefined;

  if (!result || result.error || !data) {
    return fallbackSponsorSlots;
  }

  const slots = { ...fallbackSponsorSlots };

  for (const item of data) {
    const placement = item.placement as SponsorPlacement;
    const fallback = fallbackSponsorSlots[placement];

    if (!fallback) continue;

    slots[placement] = {
      ...fallback,
      id: item.id,
      label: item.label,
      title: item.title,
      description: item.description
    };
  }

  return slots;
}

export async function getPublicActivities(options?: {
  limit?: number;
}): Promise<ActivityItem[]> {
  const supabase = createSupabaseServerClient();

  if (!supabase) {
    return getFallbackActivities(options?.limit);
  }

  const query = supabase
    .from("activities")
    .select(publicActivitySelect)
    .eq("status", "published")
    .order("is_featured", { ascending: false })
    .order("starts_at", { ascending: true, nullsFirst: false })
    .order("created_at", { ascending: false });

  const result =
    typeof options?.limit === "number" ? await query.limit(options.limit) : await query;

  if (result.error || !result.data || result.data.length === 0) {
    return getFallbackActivities(options?.limit);
  }

  return result.data.map(mapPublicActivity);
}
