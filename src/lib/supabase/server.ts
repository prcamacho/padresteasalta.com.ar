import { createClient } from "@supabase/supabase-js";

import { getSupabasePublicConfig } from "./config";
import type { Database } from "./types";

export function createSupabaseServerClient() {
  const config = getSupabasePublicConfig();

  if (!config) {
    return null;
  }

  return createClient<Database>(config.url, config.publishableKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
}
