import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { createRequire } from "node:module";
import test from "node:test";
import { runInNewContext } from "node:vm";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import ts from "typescript";

const pageUrl = new URL("../src/app/projects/wine-quality-predictor/page.tsx", import.meta.url);
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
const report = JSON.parse(readFileSync(new URL("../src/data/wine-evaluation.json", import.meta.url), "utf8"));

test("the case study has its own canonical URL and a route back to projects", () => {
  assert.equal(page.metadata.alternates.canonical, "/projects/wine-quality-predictor");
  assert.equal(page.metadata.openGraph.url, page.metadata.alternates.canonical);
  assert.match(markup, /href="\/#projects"/);
  assert.equal((markup.match(/<h1\b/g) || []).length, 1);
});

test("every in-page navigation target exists", () => {
  for (const [, id] of markup.matchAll(/href="#([^"]+)"/g)) {
    assert.ok(markup.includes(`id="${id}"`), `Missing target ${id}`);
  }
});

test("benchmark figures are rendered from the saved report with the live-model caveat", () => {
  assert.equal(report.train_count + report.test_count, report.sample_count);
  assert.equal(Object.values(report.rating_counts).reduce((sum, count) => sum + count, 0), report.sample_count);
  for (const result of report.test_results) {
    assert.ok(markup.includes(result.name));
    assert.ok(markup.includes(result.mae.toFixed(3)));
    assert.ok(markup.includes(result.r2.toFixed(3)));
  }
  assert.match(markup, /not measured performance of the live backend/);
  assert.match(markup, /has not replaced the production Random Forest model/);
  assert.match(markup, /not an accuracy/);
});

test("the case study includes its screenshot, dataset attribution and pinned evidence", () => {
  assert.ok(existsSync(new URL("../public/case-studies/wine-prediction.png", import.meta.url)));
  assert.match(markup, /alt="VinoPredict prediction form/);
  assert.match(markup, /CC BY 4\.0/);
  assert.match(markup, /blob\/2c45b157821bf861d06631da1392e1fa59eb1f45\/frontend\/src\/data\/evaluation.json/);
  assert.match(report.dataset_sha256, /^[a-f0-9]{64}$/);
});
