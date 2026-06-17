"use server";

import { redirect } from "next/navigation";

import { createSupabaseAuthServerClient } from "@/lib/supabase/auth-server";

type ProfileRole = {
  role: "member" | "editor" | "admin";
};

function getString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export async function loginAction(formData: FormData) {
  const email = getString(formData, "email").toLowerCase();
  const password = getString(formData, "password");

  if (!email || !password) {
    redirect("/admin/login?error=missing-fields");
  }

  const supabase = await createSupabaseAuthServerClient();
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    redirect("/admin/login?error=invalid-credentials");
  }

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login?error=invalid-session");
  }

  const { data } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();
  const profile = data as ProfileRole | null;

  if (profile?.role !== "admin") {
    await supabase.auth.signOut();
    redirect("/admin/login?error=not-authorized");
  }

  redirect("/admin");
}

export async function logoutAction() {
  const supabase = await createSupabaseAuthServerClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}
