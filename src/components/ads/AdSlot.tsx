import Link from "next/link";

import type { SponsorSlot } from "@/data/site";

type AdSlotProps = {
  slot: SponsorSlot;
  compact?: boolean;
};

export function AdSlot({ slot, compact = false }: AdSlotProps) {
  return (
    <aside
      className={compact ? "ad-slot compact" : "ad-slot"}
      aria-label={slot.label}
    >
      <div>
        <p className="ad-label">{slot.label}</p>
        <h3>{slot.title}</h3>
        <p>{slot.description}</p>
      </div>

      <Link className="ad-action" href={slot.href}>
        {slot.actionLabel}
      </Link>
    </aside>
  );
}
