import { readFileSync } from "node:fs";

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

const email = process.argv[2];

if (!email) {
  console.error("Usage: npm run admin:promote -- email@example.com");
  process.exit(1);
}

const connectionString =
  process.env.MIGRATION_DATABASE_URL ||
  process.env.DIRECT_URL ||
  process.env.DATABASE_URL;

if (!connectionString) {
  console.error("Missing MIGRATION_DATABASE_URL, DIRECT_URL or DATABASE_URL.");
  process.exit(1);
}

const pg = await import("pg");
const { Client } = pg.default ?? pg;
const connectionUrl = new URL(connectionString);

const client = new Client({
  connectionString,
  ssl:
    process.env.PGSSLMODE === "disable"
      ? false
      : {
          rejectUnauthorized: false,
          servername: connectionUrl.hostname
        }
});

await client.connect();

try {
  const result = await client.query(
    `
      update public.profiles
      set role = 'admin', updated_at = now()
      where id = (
        select id
        from auth.users
        where lower(email) = lower($1)
        limit 1
      )
      returning id, display_name, role
    `,
    [email]
  );

  if (result.rowCount === 0) {
    throw new Error(`No auth user found for ${email}. Create the user first in Supabase Auth.`);
  }

  console.log(`Promoted ${email} to admin.`);
} finally {
  await client.end();
}
