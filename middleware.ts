import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

import type { Database } from "@/lib/supabase/types";

type ProfileRole = {
  role: "member" | "editor" | "admin";
};

function getSupabaseConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const publishableKey =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !publishableKey) {
    return null;
  }

  return {
    url,
    publishableKey
  };
}

export async function middleware(request: NextRequest) {
  const config = getSupabaseConfig();
  const loginUrl = new URL("/admin/login", request.url);
  const isLoginRoute = request.nextUrl.pathname === "/admin/login";

  if (!config) {
    if (isLoginRoute) return NextResponse.next();
    loginUrl.searchParams.set("error", "missing-config");
    return NextResponse.redirect(loginUrl);
  }

  const response = NextResponse.next({
    request
  });

  const supabase = createServerClient<Database>(
    config.url,
    config.publishableKey,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet, headers) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value);
            response.cookies.set(name, value, options);
          });

          Object.entries(headers).forEach(([key, value]) => {
            response.headers.set(key, value);
          });
        }
      }
    }
  );

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    if (isLoginRoute) return response;

    loginUrl.searchParams.set("next", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  const { data } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();
  const profile = data as ProfileRole | null;

  if (profile?.role !== "admin") {
    if (isLoginRoute) return response;

    loginUrl.searchParams.set("error", "not-authorized");
    return NextResponse.redirect(loginUrl);
  }

  if (isLoginRoute) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*"]
};
