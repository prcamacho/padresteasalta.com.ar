"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import {
  getAvailableActivitySlug,
  type AdminActivityInsert,
  type AdminActivityUpdate
} from "@/lib/admin/activities";
import { requireAdmin } from "@/lib/supabase/auth-server";
import type { Database } from "@/lib/supabase/types";

type ActivityStatus =
  Database["public"]["Tables"]["activities"]["Row"]["status"];

const validStatuses = new Set<ActivityStatus>([
  "draft",
  "published",
  "archived"
]);

const validModalities = new Set([
  "to_confirm",
  "in_person",
  "online",
  "hybrid"
]);

function getString(formData: FormData, key: string) {
  const value = formData.get(key);

  return typeof value === "string" ? value.trim() : "";
}

function getNullableString(formData: FormData, key: string) {
  const value = getString(formData, key);

  return value.length > 0 ? value : null;
}

function getStatus(formData: FormData): ActivityStatus {
  const value = getString(formData, "status");

  return validStatuses.has(value as ActivityStatus)
    ? (value as ActivityStatus)
    : "draft";
}

function getModality(formData: FormData) {
  const value = getString(formData, "modality");

  return validModalities.has(value) ? value : "to_confirm";
}

function redirectWithFormError(formPath: string, error: string) {
  redirect(`${formPath}?error=${error}`);
}

function getArgentinaTimestamp(
  formData: FormData,
  key: string,
  formPath: string
) {
  const value = getString(formData, key);

  if (!value) {
    return null;
  }

  if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(value)) {
    redirectWithFormError(formPath, "invalid-date");
  }

  const timestamp = `${value}:00-03:00`;

  if (Number.isNaN(new Date(timestamp).getTime())) {
    redirectWithFormError(formPath, "invalid-date");
  }

  return timestamp;
}

function getRegistrationUrl(formData: FormData, formPath: string) {
  const value = getNullableString(formData, "registration_url");

  if (!value) {
    return null;
  }

  try {
    const url = new URL(value);

    if (url.protocol === "http:" || url.protocol === "https:") {
      return url.toString();
    }
  } catch {
    redirectWithFormError(formPath, "invalid-url");
  }

  redirectWithFormError(formPath, "invalid-url");
}

function getActivityFields(formData: FormData, formPath: string) {
  const title = getString(formData, "title");
  const summary = getString(formData, "summary");

  if (!title || !summary) {
    redirectWithFormError(formPath, "missing-required");
  }

  const startsAt = getArgentinaTimestamp(formData, "starts_at", formPath);
  const endsAt = getArgentinaTimestamp(formData, "ends_at", formPath);

  if (startsAt && endsAt && new Date(endsAt) < new Date(startsAt)) {
    redirectWithFormError(formPath, "invalid-range");
  }

  return {
    title,
    summary,
    description: getNullableString(formData, "description"),
    organizer_name: getNullableString(formData, "organizer_name"),
    status: getStatus(formData),
    starts_at: startsAt,
    ends_at: endsAt,
    location_name: getNullableString(formData, "location_name"),
    address: getNullableString(formData, "address"),
    modality: getModality(formData),
    is_featured: formData.get("is_featured") === "on",
    registration_url: getRegistrationUrl(formData, formPath)
  };
}

export async function createActivityAction(formData: FormData) {
  const { supabase, user } = await requireAdmin();
  const formPath = "/admin/actividades/nueva";
  const fields = getActivityFields(formData, formPath);

  const activity: AdminActivityInsert = {
    ...fields,
    slug: await getAvailableActivitySlug(supabase, fields.title),
    created_by: user.id
  };

  const { error } = await supabase.from("activities").insert(activity);

  if (error) {
    redirectWithFormError(formPath, "save-failed");
  }

  revalidatePath("/admin/actividades");
  revalidatePath("/actividades");
  revalidatePath("/");

  redirect("/admin/actividades?created=1");
}

export async function updateActivityAction(
  activityId: string,
  formData: FormData
) {
  const { supabase } = await requireAdmin();
  const formPath = `/admin/actividades/${activityId}`;
  const fields = getActivityFields(formData, formPath);
  const { data: currentActivity, error: currentError } = await supabase
    .from("activities")
    .select("id, title, slug")
    .eq("id", activityId)
    .maybeSingle();

  if (currentError || !currentActivity) {
    redirect("/admin/actividades?error=not-found");
  }

  const activity: AdminActivityUpdate = {
    ...fields,
    slug:
      currentActivity.title === fields.title
        ? currentActivity.slug
        : await getAvailableActivitySlug(supabase, fields.title, activityId)
  };

  const { error } = await supabase
    .from("activities")
    .update(activity)
    .eq("id", activityId);

  if (error) {
    redirectWithFormError(formPath, "save-failed");
  }

  revalidatePath("/admin/actividades");
  revalidatePath(`/admin/actividades/${activityId}`);
  revalidatePath("/actividades");
  revalidatePath("/");

  redirect("/admin/actividades?updated=1");
}
