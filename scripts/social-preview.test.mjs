import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import test from "node:test";
import { runInNewContext } from "node:vm";
import ts from "typescript";

const require = createRequire(import.meta.url);
const source = readFileSync(
  new URL("../src/app/opengraph-image.tsx", import.meta.url),
  "utf8",
);
const { outputText } = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.CommonJS,
    jsx: ts.JsxEmit.ReactJSX,
    esModuleInterop: true,
  },
});
const compiled = { exports: {} };
runInNewContext(outputText, { module: compiled, exports: compiled.exports, require });
const preview = compiled.exports;

test("the sharing image has descriptive alternative text and PNG metadata", () => {
  assert.match(preview.alt, /Subham Sangwan/);
  assert.equal(preview.contentType, "image/png");
  assert.equal(preview.size.width, 1200);
  assert.equal(preview.size.height, 630);
});

test("the sharing image renders a valid 1200 by 630 PNG without external assets", async () => {
  const response = preview.default();
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("content-type"), "image/png");
  const png = Buffer.from(await response.arrayBuffer());
  assert.equal(png.subarray(0, 8).toString("hex"), "89504e470d0a1a0a");
  assert.equal(png.readUInt32BE(16), 1200);
  assert.equal(png.readUInt32BE(20), 630);
  assert.ok(png.length < 5 * 1024 * 1024);
});
