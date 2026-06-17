import { readFileSync } from "node:fs";

process.noDeprecation = true;

function loadEnvFile() {
  try {
    const text = readFileSync(".env", "utf8");

    for (const line of text.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;

      const match = trimmed.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
      if (!match) continue;

      const [, key, rawValue] = match;
      if (process.env[key]) continue;

      process.env[key] = rawValue.replace(/^["']|["']$/g, "");
    }
  } catch {
    // Environment variables can also come from Railway, Vercel, or CI.
  }
}

loadEnvFile();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const publishableKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !publishableKey) {
  console.error(
    "Missing NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY."
  );
  process.exit(1);
}

const { createClient } = await import("@supabase/supabase-js");

const supabase = createClient(supabaseUrl, publishableKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

const { count, error } = await supabase
  .from("sponsor_slots")
  .select("id", { count: "exact", head: true });

if (error) {
  console.error(error.message);
  process.exit(1);
}

console.log(`Supabase connection OK. sponsor_slots=${count ?? 0}`);
