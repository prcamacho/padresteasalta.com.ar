import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { join } from "node:path";

const routes = ["/", "/orientacion", "/actividades", "/directorio", "/colaborar", "/contacto"];
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

  for (const route of routes) {
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
} finally {
  server?.kill();
}
