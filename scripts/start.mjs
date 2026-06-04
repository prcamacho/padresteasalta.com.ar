import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { join } from "node:path";

const nextBin = join(process.cwd(), "node_modules", "next", "dist", "bin", "next");
const host = process.env.HOST || "0.0.0.0";
const port = process.env.PORT || "3000";

if (!existsSync(nextBin)) {
  console.error("Next.js is not installed. Run npm install before starting.");
  process.exit(1);
}

const child = spawn(process.execPath, [nextBin, "start", "--hostname", host, "--port", port], {
  stdio: "inherit",
  env: {
    ...process.env,
    NEXT_TELEMETRY_DISABLED: process.env.NEXT_TELEMETRY_DISABLED || "1"
  }
});

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }

  process.exit(code ?? 0);
});
