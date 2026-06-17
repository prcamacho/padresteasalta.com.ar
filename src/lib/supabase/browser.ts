"use client";

import { createBrowserClient } from "@supabase/ssr";

import { getSupabasePublicConfig } from "./config";
import type { Database } from "./types";

let browserClient: ReturnType<typeof createBrowserClient<Database>> | null = null;

export function createSupabaseBrowserClient() {
  const config = getSupabasePublicConfig();

  if (!config) {
    throw new Error("Missing public Supabase configuration.");
  }

  browserClient ??= createBrowserClient<Database>(
    config.url,
    config.publishableKey
  );

  return browserClient;
}
