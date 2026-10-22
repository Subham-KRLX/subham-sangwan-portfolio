import assert from "node:assert/strict";
import { EventEmitter } from "node:events";
import test from "node:test";
import { verifySecurityHeaders, waitForServer } from "./check-security-headers.mjs";

const headers = {
  "content-type": "text/html; charset=utf-8",
  "x-content-type-options": "nosniff",
  "x-frame-options": "DENY",
  "referrer-policy": "strict-origin-when-cross-origin",
  "permissions-policy": "camera=(), geolocation=(), microphone=()",
};

test("a successful HTML homepage with all security headers passes", () => {
  assert.doesNotThrow(() => verifySecurityHeaders(new Response(null, { headers })));
});

for (const status of [204, 301, 404, 500]) {
  test(`HTTP ${status} fails even when security headers are correct`, () => {
    assert.throws(
      () => verifySecurityHeaders(new Response(null, { status, headers })),
      new RegExp(`HTTP ${status}`),
    );
  });
}

test("a non-HTML response cannot pass as the homepage", () => {
  assert.throws(() => verifySecurityHeaders(new Response(null, {
    headers: { ...headers, "content-type": "application/json" },
  })), /did not return HTML/);
});

for (const header of Object.keys(headers).filter((name) => name !== "content-type")) {
  test(`a missing ${header} is reported`, () => {
    const missing = { ...headers };
    delete missing[header];
    assert.throws(
      () => verifySecurityHeaders(new Response(null, { headers: missing })),
      new RegExp(header),
    );
  });
}

test("incorrect security header values fail", () => {
  assert.throws(() => verifySecurityHeaders(new Response(null, {
    headers: { ...headers, "x-frame-options": "SAMEORIGIN" },
  })), /x-frame-options: expected DENY, received SAMEORIGIN/);
});

function child() {
  const server = new EventEmitter();
  server.stdout = new EventEmitter();
  server.stderr = new EventEmitter();
  return server;
}

function assertListenersRemoved(server) {
  assert.equal(server.stdout.listenerCount("data"), 0);
  assert.equal(server.stderr.listenerCount("data"), 0);
  assert.equal(server.listenerCount("error"), 0);
  assert.equal(server.listenerCount("exit"), 0);
}

test("startup uses the child's actual port and accepts split log chunks", async () => {
  const server = child();
  const ready = waitForServer(server);
  server.stdout.emit("data", Buffer.from("Local: http://127.0."));
  server.stdout.emit("data", Buffer.from("0.1:45"));
  server.stdout.emit("data", Buffer.from("678\nReady"));
  assert.equal(await ready, "http://127.0.0.1:45678");
  assertListenersRemoved(server);
});

test("startup failures report the child's diagnostic output", async () => {
  const server = child();
  const ready = waitForServer(server);
  server.stderr.emit("data", Buffer.from("No production build found"));
  server.emit("exit", 1, null);
  await assert.rejects(ready, /No production build found/);
  assertListenersRemoved(server);
});

test("spawn errors are reported rather than waiting for a timeout", async () => {
  const server = child();
  const ready = waitForServer(server);
  server.emit("error", new Error("Executable unavailable"));
  await assert.rejects(ready, /Executable unavailable/);
  assertListenersRemoved(server);
});

test("a server that never announces a listening port times out", async () => {
  const server = child();
  const ready = waitForServer(server, { timeoutMs: 10 });
  server.stdout.emit("data", Buffer.from("Starting"));
  await assert.rejects(ready, /did not start within 10ms/);
  assertListenersRemoved(server);
});
