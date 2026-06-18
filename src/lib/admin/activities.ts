import type { SupabaseClient } from "@supabase/supabase-js";

import type { Database } from "@/lib/supabase/types";

export type AdminActivity =
  Database["public"]["Tables"]["activities"]["Row"];
export type AdminActivityInsert =
  Database["public"]["Tables"]["activities"]["Insert"];
export type AdminActivityUpdate =
  Database["public"]["Tables"]["activities"]["Update"];

type ActivityStatusMeta = {
  label: string;
  tone: "muted" | "success" | "warning";
};

const activityStatusMeta = {
  draft: {
    label: "Borrador",
    tone: "muted"
  },
  published: {
    label: "Publicada",
    tone: "success"
  },
  archived: {
    label: "Archivada",
    tone: "warning"
  }
} satisfies Record<AdminActivity["status"], ActivityStatusMeta>;

const modalityLabels: Record<string, string> = {
  hybrid: "Hibrida",
  in_person: "Presencial",
  online: "Virtual",
  to_confirm: "A confirmar"
};

const scheduleFormatter = new Intl.DateTimeFormat("es-AR", {
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  month: "short",
  timeZone: "America/Argentina/Buenos_Aires",
  year: "numeric"
});

const shortDateFormatter = new Intl.DateTimeFormat("es-AR", {
  day: "numeric",
  month: "short",
  timeZone: "America/Argentina/Buenos_Aires",
  year: "numeric"
});

const adminActivitySelect =
  "id, title, slug, summary, description, organizer_name, status, starts_at, ends_at, location_name, address, modality, is_featured, registration_url, cover_media_id, created_by, created_at, updated_at" as const;

export async function getAdminActivities(
  supabase: SupabaseClient<Database>
): Promise<{ activities: AdminActivity[]; errorMessage: string | null }> {
  const { data, error } = await supabase
    .from("activities")
    .select(adminActivitySelect)
    .order("starts_at", { ascending: true, nullsFirst: false })
    .order("created_at", { ascending: false });

  if (error) {
    return {
      activities: [],
      errorMessage:
        "No pudimos cargar las actividades. Revisa la conexion con Supabase."
    };
  }

  return {
    activities: data ?? [],
    errorMessage: null
  };
}

export async function getAdminActivityById(
  supabase: SupabaseClient<Database>,
  id: string
) {
  const { data, error } = await supabase
    .from("activities")
    .select(adminActivitySelect)
    .eq("id", id)
    .maybeSingle();

  if (error) {
    return {
      activity: null,
      errorMessage:
        "No pudimos cargar la actividad. Revisa la conexion con Supabase."
    };
  }

  return {
    activity: data,
    errorMessage: null
  };
}

export async function getAvailableActivitySlug(
  supabase: SupabaseClient<Database>,
  title: string,
  excludeActivityId?: string
) {
  const baseSlug = slugifyActivityTitle(title);
  let query = supabase
    .from("activities")
    .select("slug")
    .like("slug", `${baseSlug}%`);

  if (excludeActivityId) {
    query = query.neq("id", excludeActivityId);
  }

  const { data, error } = await query;

  if (error || !data) {
    return baseSlug;
  }

  const usedSlugs = new Set(data.map((activity) => activity.slug));

  if (!usedSlugs.has(baseSlug)) {
    return baseSlug;
  }

  let suffix = 2;
  let candidate = `${baseSlug}-${suffix}`;

  while (usedSlugs.has(candidate)) {
    suffix += 1;
    candidate = `${baseSlug}-${suffix}`;
  }

  return candidate;
}

export function slugifyActivityTitle(title: string) {
  const slug = title
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);

  return slug || "actividad";
}

export function getAdminActivityStatus(activity: AdminActivity) {
  return activityStatusMeta[activity.status];
}

export function formatAdminActivitySchedule(activity: AdminActivity) {
  if (!activity.starts_at) {
    return "Fecha a confirmar";
  }

  const start = scheduleFormatter.format(new Date(activity.starts_at));

  if (!activity.ends_at) {
    return start;
  }

  return `${start} a ${scheduleFormatter.format(new Date(activity.ends_at))}`;
}

export function formatAdminActivityLocation(activity: AdminActivity) {
  const place = [activity.location_name, activity.address]
    .filter(Boolean)
    .join(" - ");

  return place || modalityLabels[activity.modality] || activity.modality;
}

export function formatAdminActivityModality(activity: AdminActivity) {
  return modalityLabels[activity.modality] || activity.modality;
}

export function formatAdminShortDate(value: string) {
  return shortDateFormatter.format(new Date(value));
}

export function formatAdminDateTimeLocal(value: string | null) {
  if (!value) {
    return "";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  const argentinaDate = new Date(date.getTime() - 3 * 60 * 60 * 1000);

  return argentinaDate.toISOString().slice(0, 16);
}
