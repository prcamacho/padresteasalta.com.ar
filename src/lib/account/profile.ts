import { redirect } from "next/navigation";

import { createSupabaseAuthServerClient } from "@/lib/supabase/auth-server";
import type { Database } from "@/lib/supabase/types";

export type PublicProfile = Pick<
  Database["public"]["Tables"]["profiles"]["Row"],
  | "id"
  | "display_name"
  | "phone"
  | "role"
  | "account_type"
  | "locality"
  | "whatsapp_group_opt_in"
  | "privacy_terms_accepted_at"
  | "adult_confirmed_at"
>;

export const accountTypeLabels: Record<PublicProfile["account_type"], string> = {
  organization: "Organizacion",
  user: "Usuario"
};

export async function requireAccount(nextPath = "/mi-cuenta") {
  const supabase = await createSupabaseAuthServerClient();
  const {
    data: { user },
    error: userError
  } = await supabase.auth.getUser();

  if (userError || !user) {
    redirect(`/ingresar?next=${encodeURIComponent(nextPath)}`);
  }

  const { data } = await supabase
    .from("profiles")
    .select(
      "id, display_name, phone, role, account_type, locality, whatsapp_group_opt_in, privacy_terms_accepted_at, adult_confirmed_at"
    )
    .eq("id", user.id)
    .maybeSingle();

  if (!data) {
    redirect(`/ingresar?next=${encodeURIComponent(nextPath)}&error=profile`);
  }

  return {
    profile: data,
    supabase,
    user
  };
}
