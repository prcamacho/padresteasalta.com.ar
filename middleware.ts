import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

import type { Database } from "@/lib/supabase/types";

type ProfileRole = {
  role: "member" | "editor" | "admin";
};

function isAdminRoute(pathname: string) {
  return pathname.startsWith("/admin");
}

function isAdminLoginRoute(pathname: string) {
  return pathname === "/admin/login";
}

function isAccountRoute(pathname: string) {
  return pathname === "/mi-cuenta" || pathname.startsWith("/mi-cuenta/");
}

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
  const pathname = request.nextUrl.pathname;
  const nextPath = `${request.nextUrl.pathname}${request.nextUrl.search}`;
  const adminLoginUrl = new URL("/admin/login", request.url);
  const accountLoginUrl = new URL("/ingresar", request.url);

  if (!config) {
    if (isAdminLoginRoute(pathname)) return NextResponse.next();

    const loginUrl = isAdminRoute(pathname) ? adminLoginUrl : accountLoginUrl;
    loginUrl.searchParams.set("error", "missing-config");
    loginUrl.searchParams.set("next", nextPath);
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
    if (isAdminLoginRoute(pathname)) return response;

    const loginUrl = isAdminRoute(pathname) ? adminLoginUrl : accountLoginUrl;
    loginUrl.searchParams.set("next", nextPath);
    return NextResponse.redirect(loginUrl);
  }

  if (isAccountRoute(pathname)) {
    return response;
  }

  const { data } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();
  const profile = data as ProfileRole | null;

  if (profile?.role !== "admin") {
    if (isAdminLoginRoute(pathname)) return response;

    adminLoginUrl.searchParams.set("error", "not-authorized");
    return NextResponse.redirect(adminLoginUrl);
  }

  if (isAdminLoginRoute(pathname)) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*", "/mi-cuenta/:path*"]
};
