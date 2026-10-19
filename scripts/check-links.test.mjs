import assert from "node:assert/strict";
import test from "node:test";
import { checkLink } from "./check-links.mjs";

const checkResponse = (url, status) =>
  checkLink(["Example", url], {
    fetchImpl: async () => new Response(null, { status }),
  });

test("successful responses pass", async () => {
  const result = await checkResponse("https://example.com/", 200);
  assert.equal(result.status, "passed");
  assert.equal(result.httpStatus, 200);
});

for (const host of ["codeforces.com", "leetcode.com", "www.linkedin.com"]) {
  for (const status of [403, 429, 999]) {
    test(`${host} HTTP ${status} is unverified, not passed`, async () => {
      const result = await checkLink(["Profile", `https://${host}/profile`], {
        fetchImpl: async () => ({ ok: false, status }),
      });
      assert.equal(result.status, "unverified");
      assert.equal(result.httpStatus, status);
    });
  }
}

test("protected hosts with successful responses still pass", async () => {
  const result = await checkResponse("https://codeforces.com/profile/KRLX", 200);
  assert.equal(result.status, "passed");
});

for (const status of [403, 404, 429, 500]) {
  test(`ordinary sites returning HTTP ${status} fail`, async () => {
    const result = await checkResponse("https://example.com/", status);
    assert.equal(result.status, "failed");
    assert.equal(result.error, `HTTP ${status}`);
  });
}

test("missing profiles on protected hosts fail", async () => {
  const result = await checkResponse("https://leetcode.com/u/missing/", 404);
  assert.equal(result.status, "failed");
});

test("lookalike domains do not receive the protected-host exception", async () => {
  const result = await checkResponse("https://codeforces.com.example.com/", 403);
  assert.equal(result.status, "failed");
});

test("network failures are reported", async () => {
  const result = await checkLink(["Example", "https://example.com/"], {
    fetchImpl: async () => { throw new Error("Network unavailable"); },
  });
  assert.equal(result.status, "failed");
  assert.equal(result.error, "Network unavailable");
});

test("requests follow redirects and use the timeout signal", async () => {
  const result = await checkLink(["Example", "https://example.com/"], {
    fetchImpl: async (url, options) => {
      assert.equal(url, "https://example.com/");
      assert.equal(options.redirect, "follow");
      assert.ok(options.signal instanceof AbortSignal);
      return new Response(null, { status: 200 });
    },
  });
  assert.equal(result.status, "passed");
});

test("slow requests are aborted and reported as failures", async () => {
  const result = await checkLink(["Slow site", "https://example.com/"], {
    timeoutMs: 10,
    fetchImpl: (_url, { signal }) => new Promise((_resolve, reject) => {
      signal.addEventListener("abort", () => reject(signal.reason), { once: true });
    }),
  });
  assert.equal(result.status, "failed");
  assert.equal(result.error, "Timed out");
});
