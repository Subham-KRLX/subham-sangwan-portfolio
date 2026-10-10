import { spawn } from "node:child_process";

const port = 3210;
const server = spawn("npm", ["run", "start", "--", "-p", String(port)], {
  stdio: "ignore",
});

const expectedHeaders = new Map([
  ["x-content-type-options", "nosniff"],
  ["x-frame-options", "DENY"],
  ["referrer-policy", "strict-origin-when-cross-origin"],
  ["permissions-policy", "camera=(), geolocation=(), microphone=()"],
]);

async function waitForServer() {
  for (let attempt = 0; attempt < 30; attempt += 1) {
    try {
      return await fetch(`http://localhost:${port}`);
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  }

  throw new Error("Production server did not start within 15 seconds");
}

try {
  const response = await waitForServer();
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

  console.log(`Verified ${expectedHeaders.size} security headers.`);
} finally {
  server.kill("SIGTERM");
}
