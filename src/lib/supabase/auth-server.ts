import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { getSupabasePublicConfig } from "./config";
import type { Database } from "./types";

type AdminProfile = {
  id: string;
  display_name: string | null;
  role: "member" | "editor" | "admin";
};

export async function createSupabaseAuthServerClient() {
  const config = getSupabasePublicConfig();

  if (!config) {
    throw new Error("Missing public Supabase configuration.");
  }

  const cookieStore = await cookies();

  return createServerClient<Database>(config.url, config.publishableKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // Server Components cannot set cookies; middleware/server actions handle refresh writes.
        }
      }
    }
  });
}

export async function requireAdmin() {
  const supabase = await createSupabaseAuthServerClient();
  const {
    data: { user },
    error: userError
  } = await supabase.auth.getUser();

  if (userError || !user) {
    redirect("/admin/login");
  }

  const { data } = await supabase
    .from("profiles")
    .select("id, display_name, role")
    .eq("id", user.id)
    .maybeSingle();
  const profile = data as AdminProfile | null;

  if (profile?.role !== "admin") {
    await supabase.auth.signOut();
    redirect("/admin/login?error=not-authorized");
  }

  return {
    supabase,
    user,
    profile
  };
}
