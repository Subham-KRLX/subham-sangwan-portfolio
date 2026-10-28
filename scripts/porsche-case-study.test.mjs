import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import test from "node:test";
import { runInNewContext } from "node:vm";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import ts from "typescript";

const pageUrl = new URL("../src/app/projects/porsche-911-studio/page.tsx", import.meta.url);
const require = createRequire(pageUrl);
const { outputText } = ts.transpileModule(readFileSync(pageUrl, "utf8"), {
  compilerOptions: {
    module: ts.ModuleKind.CommonJS,
    jsx: ts.JsxEmit.ReactJSX,
    esModuleInterop: true,
  },
});
const compiled = { exports: {} };
runInNewContext(outputText, { module: compiled, exports: compiled.exports, require });
const page = compiled.exports;
const markup = renderToStaticMarkup(createElement(page.default));

test("the Porsche case study has route-specific metadata and one main heading", () => {
  assert.equal(page.metadata.alternates.canonical, "/projects/porsche-911-studio");
  assert.equal(page.metadata.openGraph.url, page.metadata.alternates.canonical);
  assert.equal((markup.match(/<h1\b/g) || []).length, 1);
  assert.match(markup, /href="\/#projects"/);
});

test("the screenshot is a real PNG with the expected dimensions and descriptive alt text", () => {
  const png = readFileSync(new URL("../public/case-studies/porsche-studio.png", import.meta.url));
  assert.equal(png.subarray(0, 8).toString("hex"), "89504e470d0a1a0a");
  assert.equal(png.readUInt32BE(16), 1440);
  assert.equal(png.readUInt32BE(20), 1000);
  assert.match(markup, /alt="911 Studio showing a white Carrera GTS/);
});

test("the write-up preserves the important prototype limitations", () => {
  for (const text of [
    "not an official Porsche service",
    "do not sync to another device",
    "not a 3D scene",
    "They are not dealer quotes",
    "they do not produce a cabin preview",
    "service is outside my control",
  ]) assert.ok(markup.includes(text), `Missing limitation: ${text}`);
});

test("the source links are pinned and the new-tab links are protected", () => {
  const sourceLinks = [...markup.matchAll(/href="([^"]+\/blob\/[^"]+)"/g)];
  assert.equal(sourceLinks.length, 5);
  for (const [, href] of sourceLinks) assert.ok(href.includes("/blob/eb99d8b20cf2e33f394200df05ed288d1e665755/"));
  for (const [, attributes] of markup.matchAll(/<a\b([^>]+)>/g)) {
    if (attributes.includes('target="_blank"')) assert.ok(attributes.includes('rel="noopener noreferrer"'));
  }
});
