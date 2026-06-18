import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { join } from "node:path";

const publicRoutes = [
  "/",
  "/orientacion",
  "/actividades",
  "/directorio",
  "/colaborar",
  "/contacto",
  "/privacidad"
];
const authRoutes = ["/ingresar", "/registro"];
const adminProtectedRoutes = [
  "/admin",
  "/admin/actividades",
  "/admin/actividades/nueva",
  "/admin/actividades/smoke-test-id"
];
const accountProtectedRoutes = ["/mi-cuenta"];
const nextBin = join(process.cwd(), "node_modules", "next", "dist", "bin", "next");
const mode = process.argv.includes("--start") ? "start" : "dev";
const host = "127.0.0.1";
const port = process.env.SMOKE_PORT || "3015";
const baseUrl = process.env.SMOKE_BASE_URL || `http://${host}:${port}`;

if (!existsSync(nextBin) && !process.env.SMOKE_BASE_URL) {
  console.error("Next.js is not installed. Run npm install before smoke testing.");
  process.exit(1);
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForServer(url, logs) {
  const startedAt = Date.now();

  while (Date.now() - startedAt < 60000) {
    try {
      const response = await fetch(url);
      if (response.ok) return;
    } catch {
      await wait(800);
    }
  }

  throw new Error(`Server did not become ready at ${url}.\n${logs()}`);
}

async function checkRoutes() {
  const results = [];

  for (const route of publicRoutes) {
    const response = await fetch(`${baseUrl}${route}`);
    const html = await response.text();
    const hasHeading = /<h1[\s>]/.test(html);
    const hasNavigation = html.includes("Navegacion principal");

    results.push(`${route} status=${response.status} h1=${hasHeading} nav=${hasNavigation}`);

    if (!response.ok || !hasHeading || !hasNavigation) {
      throw new Error(`Smoke check failed for ${route}: ${results.at(-1)}`);
    }
  }

  console.log(results.join("\n"));
}

async function checkAuthRoutes() {
  const results = [];

  for (const route of authRoutes) {
    const response = await fetch(`${baseUrl}${route}`);
    const html = await response.text();
    const hasHeading = /<h1[\s>]/.test(html);

    results.push(`${route} status=${response.status} h1=${hasHeading}`);

    if (!response.ok || !hasHeading) {
      throw new Error(`Auth route check failed for ${route}: ${results.at(-1)}`);
    }
  }

  console.log(results.join("\n"));
}

async function checkRedirects(routes, expectedLoginPath) {
  const results = [];

  for (const route of routes) {
    const response = await fetch(`${baseUrl}${route}`, {
      redirect: "manual"
    });
    const location = response.headers.get("location") ?? "";
    const redirectsToLogin =
      response.status >= 300 &&
      response.status < 400 &&
      location.includes(expectedLoginPath);

    results.push(
      `${route} status=${response.status} redirectsToLogin=${redirectsToLogin}`
    );

    if (!redirectsToLogin) {
      throw new Error(`Protected route check failed for ${route}: ${results.at(-1)}`);
    }
  }

  console.log(results.join("\n"));
}

let server;
let output = "";

try {
  if (!process.env.SMOKE_BASE_URL) {
    server = spawn(process.execPath, [nextBin, mode, "--hostname", host, "--port", port], {
      stdio: ["ignore", "pipe", "pipe"],
      env: {
        ...process.env,
        NEXT_TELEMETRY_DISABLED: process.env.NEXT_TELEMETRY_DISABLED || "1"
      }
    });

    server.stdout.on("data", (chunk) => {
      output += chunk.toString();
    });

    server.stderr.on("data", (chunk) => {
      output += chunk.toString();
    });

    await waitForServer(baseUrl, () => output);
  }

  await checkRoutes();
  await checkAuthRoutes();
  await checkRedirects(adminProtectedRoutes, "/admin/login");
  await checkRedirects(accountProtectedRoutes, "/ingresar");
} finally {
  server?.kill();
}
