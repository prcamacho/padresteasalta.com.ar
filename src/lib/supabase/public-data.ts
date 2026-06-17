import { sponsorSlots as fallbackSponsorSlots } from "@/data/site";
import type { SponsorSlot } from "@/data/site";

import { createSupabaseServerClient } from "./server";
import type { Database } from "./types";

type SponsorPlacement = SponsorSlot["placement"];
type SponsorSlotRow = Pick<
  Database["public"]["Tables"]["sponsor_slots"]["Row"],
  "id" | "placement" | "label" | "title" | "description"
>;

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
