import { readFileSync } from "node:fs";

const defaultEmail = "test@padresteasalta.com.ar";
const defaultPassword = "PadresTea123";
const defaultRole = "member";
const validRoles = new Set(["member", "admin"]);

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

function getConfig() {
  const email = process.argv[2] || defaultEmail;
  const password = process.argv[3] || defaultPassword;
  const role = process.argv[4] || defaultRole;

  if (!validRoles.has(role)) {
    throw new Error("Role must be member or admin.");
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const publishableKey =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const connectionString =
    process.env.MIGRATION_DATABASE_URL ||
    process.env.DIRECT_URL ||
    process.env.DATABASE_URL;

  if (!supabaseUrl || !publishableKey) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY."
    );
  }

  if (!connectionString) {
    throw new Error("Missing MIGRATION_DATABASE_URL, DIRECT_URL or DATABASE_URL.");
  }

  return {
    connectionString,
    email,
    password,
    publishableKey,
    role,
    supabaseUrl
  };
}

function getDisplayName(role) {
  return role === "admin" ? "Admin Test" : "Usuario Test";
}

function getMetadata(role) {
  return {
    account_type: "user",
    adult_confirmed: true,
    display_name: getDisplayName(role),
    full_name: getDisplayName(role),
    locality: "Salta Capital",
    phone: "3870000000",
    privacy_terms_accepted: true,
    whatsapp_group_opt_in: false
  };
}

async function signUpIfNeeded({
  email,
  password,
  publishableKey,
  role,
  supabaseUrl
}) {
  const { createClient } = await import("@supabase/supabase-js");
  const supabase = createClient(supabaseUrl, publishableKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: getMetadata(role)
    }
  });

  if (error && !/already|registered|exists/i.test(error.message)) {
    throw error;
  }
}

async function normalizeAuthUser({ connectionString, email, password, role }) {
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
    const metadata = getMetadata(role);
    const existing = await client.query(
      `
        select id
        from auth.users
        where lower(email) = lower($1)
        limit 1
      `,
      [email]
    );

    let userId = existing.rows[0]?.id;

    if (!userId) {
      const inserted = await client.query(
        `
          insert into auth.users (
            instance_id,
            id,
            aud,
            role,
            email,
            encrypted_password,
            email_confirmed_at,
            raw_app_meta_data,
            raw_user_meta_data,
            created_at,
            updated_at
          )
          values (
            '00000000-0000-0000-0000-000000000000',
            gen_random_uuid(),
            'authenticated',
            'authenticated',
            lower($1),
            crypt($2, gen_salt('bf')),
            now(),
            '{"provider":"email","providers":["email"]}'::jsonb,
            $3::jsonb,
            now(),
            now()
          )
          returning id
        `,
        [email, password, JSON.stringify(metadata)]
      );

      userId = inserted.rows[0].id;
    } else {
      await client.query(
        `
          update auth.users
          set
            encrypted_password = crypt($2, gen_salt('bf')),
            email_confirmed_at = coalesce(email_confirmed_at, now()),
            raw_app_meta_data = '{"provider":"email","providers":["email"]}'::jsonb,
            raw_user_meta_data = coalesce(raw_user_meta_data, '{}'::jsonb) || $3::jsonb,
            updated_at = now()
          where id = $1
        `,
        [userId, password, JSON.stringify(metadata)]
      );
    }

    await client.query(
      `
        insert into public.profiles (
          id,
          display_name,
          phone,
          role,
          account_type,
          locality,
          whatsapp_group_opt_in,
          privacy_terms_accepted_at,
          adult_confirmed_at
        )
        values (
          $1,
          $2,
          $3,
          $5,
          'user',
          $4,
          false,
          now(),
          now()
        )
        on conflict (id) do update
        set
          display_name = excluded.display_name,
          phone = excluded.phone,
          role = excluded.role,
          account_type = excluded.account_type,
          locality = excluded.locality,
          whatsapp_group_opt_in = excluded.whatsapp_group_opt_in,
          privacy_terms_accepted_at = coalesce(public.profiles.privacy_terms_accepted_at, excluded.privacy_terms_accepted_at),
          adult_confirmed_at = coalesce(public.profiles.adult_confirmed_at, excluded.adult_confirmed_at),
          updated_at = now()
      `,
      [userId, metadata.display_name, metadata.phone, metadata.locality, role]
    );

    return userId;
  } finally {
    await client.end();
  }
}

async function verifyLogin({ email, password, publishableKey, supabaseUrl }) {
  const { createClient } = await import("@supabase/supabase-js");
  const supabase = createClient(supabaseUrl, publishableKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error || !data.user) {
    throw new Error(error?.message ?? "Login verification failed.");
  }

  await supabase.auth.signOut();
}

loadEnvFile();

const config = getConfig();

await signUpIfNeeded(config);
const userId = await normalizeAuthUser(config);
await verifyLogin(config);

console.log(`Test user ready: ${config.email}`);
console.log(`Role: ${config.role}`);
console.log(`Auth id: ${userId}`);
