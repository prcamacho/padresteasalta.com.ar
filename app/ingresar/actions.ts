"use server";

import { redirect } from "next/navigation";

import { getSafeNextPath } from "@/lib/account/redirects";
import { createSupabaseAuthServerClient } from "@/lib/supabase/auth-server";

function getString(formData: FormData, key: string) {
  const value = formData.get(key);

  return typeof value === "string" ? value.trim() : "";
}

export async function publicLoginAction(formData: FormData) {
  const email = getString(formData, "email").toLowerCase();
  const password = getString(formData, "password");
  const next = getSafeNextPath(formData.get("next"));

  if (!email || !password) {
    redirect(`/ingresar?error=missing-fields&next=${encodeURIComponent(next)}`);
  }

  const supabase = await createSupabaseAuthServerClient();
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    redirect(
      `/ingresar?error=invalid-credentials&next=${encodeURIComponent(next)}`
    );
  }

  redirect(next);
}

export async function publicLogoutAction() {
  const supabase = await createSupabaseAuthServerClient();
  await supabase.auth.signOut();
  redirect("/");
}
