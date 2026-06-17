import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";

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
    // .env is optional; Railway and CI can provide variables directly.
  }
}

async function main() {
  loadEnvFile();

  const connectionString =
    process.env.MIGRATION_DATABASE_URL ||
    process.env.DIRECT_URL ||
    process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("Missing MIGRATION_DATABASE_URL, DIRECT_URL or DATABASE_URL.");
  }

  const pg = await import("pg");
  const { Client } = pg.default ?? pg;
  const connectionUrl = new URL(connectionString);
  const clientConfig = process.env.PGHOSTADDR
    ? {
        user: decodeURIComponent(connectionUrl.username),
        password: decodeURIComponent(connectionUrl.password),
        host: process.env.PGHOSTADDR,
        port: Number(connectionUrl.port || 5432),
        database: decodeURIComponent(connectionUrl.pathname.slice(1)),
        ssl:
          process.env.PGSSLMODE === "disable"
            ? false
            : {
                rejectUnauthorized: false,
                servername: connectionUrl.hostname
              }
      }
    : {
        connectionString,
        ssl:
          process.env.PGSSLMODE === "disable"
            ? false
            : { rejectUnauthorized: false }
      };

  const client = new Client(clientConfig);

  await client.connect();

  try {
    await client.query(`
      create table if not exists public.schema_migrations (
        version text primary key,
        name text not null,
        checksum text not null,
        applied_at timestamptz not null default now()
      )
    `);

    const migrationsDir = join(process.cwd(), "supabase", "migrations");
    const files = (await readdir(migrationsDir))
      .filter((file) => file.endsWith(".sql"))
      .sort();

    for (const file of files) {
      const version = file.split("_")[0];
      const sql = await readFile(join(migrationsDir, file), "utf8");
      const checksum = createHash("sha256").update(sql).digest("hex");
      const existing = await client.query(
        "select checksum from public.schema_migrations where version = $1",
        [version]
      );

      if (existing.rowCount > 0) {
        if (existing.rows[0].checksum !== checksum) {
          throw new Error(`Migration ${file} changed after being applied.`);
        }

        console.log(`skip ${file}`);
        continue;
      }

      console.log(`apply ${file}`);
      await client.query("begin");
      try {
        await client.query(sql);
        await client.query(
          "insert into public.schema_migrations (version, name, checksum) values ($1, $2, $3)",
          [version, file, checksum]
        );
        await client.query("commit");
      } catch (error) {
        await client.query("rollback");
        throw error;
      }
    }
  } finally {
    await client.end();
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
