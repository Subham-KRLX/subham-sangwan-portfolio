import { spawn } from "node:child_process";
import { once } from "node:events";
import { createRequire } from "node:module";
import { pathToFileURL } from "node:url";

const expectedHeaders = new Map([
  ["x-content-type-options", "nosniff"],
  ["x-frame-options", "DENY"],
  ["referrer-policy", "strict-origin-when-cross-origin"],
  ["permissions-policy", "camera=(), geolocation=(), microphone=()"],
]);

export function verifySecurityHeaders(response) {
  if (response.status !== 200) {
    throw new Error(`Homepage returned HTTP ${response.status}, expected 200`);
  }
  if (!response.headers.get("content-type")?.includes("text/html")) {
    throw new Error("Homepage did not return HTML");
  }
  const failures = [];

  for (const [header, expectedValue] of expectedHeaders) {
    const actualValue = response.headers.get(header);
    if (actualValue !== expectedValue) {
      failures.push(`${header}: expected ${expectedValue}, received ${actualValue}`);
    }
  }

  if (failures.length > 0) {
    throw new Error(`Security header check failed:\n${failures.join("\n")}`);
  }
}

export function waitForServer(server, { timeoutMs = 15_000 } = {}) {
  return new Promise((resolve, reject) => {
    let output = "";
    const finish = (error, url) => {
      clearTimeout(timeout);
      server.stdout.off("data", onOutput);
      server.stderr.off("data", onErrorOutput);
      server.off("error", onError);
      server.off("exit", onExit);
      if (error) reject(error);
      else resolve(url);
    };
    const onOutput = (chunk) => {
      output = (output + chunk.toString()).slice(-8_000);
      const match = output.match(/http:\/\/127\.0\.0\.1:([1-9]\d*)(?=\s)/);
      if (match) finish(null, match[0]);
    };
    const onErrorOutput = (chunk) => {
      output = (output + chunk.toString()).slice(-8_000);
    };
    const onError = (error) => finish(error);
    const onExit = (code, signal) => finish(
      new Error(`Production server exited before startup (${signal ?? code}).\n${output}`),
    );
    const timeout = setTimeout(() => finish(
      new Error(`Production server did not start within ${timeoutMs}ms.\n${output}`),
    ), timeoutMs);
    server.stdout.on("data", onOutput);
    server.stderr.on("data", onErrorOutput);
    server.once("error", onError);
    server.once("exit", onExit);
  });
}

async function stopServer(server) {
  if (!server.pid || server.exitCode !== null || server.signalCode !== null) return;
  const exited = once(server, "exit");
  server.kill("SIGTERM");
  const timeout = setTimeout(() => server.kill("SIGKILL"), 3_000);
  timeout.unref();
  try {
    await exited;
  } finally {
    clearTimeout(timeout);
  }
}

async function checkProductionHeaders() {
  const require = createRequire(import.meta.url);
  const server = spawn(process.execPath, [
    require.resolve("next/dist/bin/next"), "start", "--hostname", "127.0.0.1", "--port", "0",
  ], {
    stdio: ["ignore", "pipe", "pipe"],
    env: { ...process.env, FORCE_COLOR: "0" },
  });

  try {
    const url = await waitForServer(server);
    const response = await fetch(url, {
      signal: AbortSignal.timeout(15_000),
      redirect: "error",
    });
    verifySecurityHeaders(response);
    await response.body?.cancel();
    console.log(`Verified homepage response and ${expectedHeaders.size} security headers.`);
  } finally {
    await stopServer(server);
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  await checkProductionHeaders();
}
