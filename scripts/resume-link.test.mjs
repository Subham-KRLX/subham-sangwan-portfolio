import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import test from "node:test";
import { runInNewContext } from "node:vm";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import ts from "typescript";

const require = createRequire(import.meta.url);
const source = readFileSync(
  new URL("../src/components/ResumeLink.tsx", import.meta.url),
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
const markup = renderToStaticMarkup(createElement(compiled.exports.default));

test("the resume opens a local PDF in a protected new tab", () => {
  assert.match(markup, /target="_blank"/);
  assert.match(markup, /rel="noopener noreferrer"/);
  assert.match(markup, /aria-label="View resume \(PDF, opens in a new tab\)"/);
  assert.ok(!markup.includes("download="));
});

test("the linked resume exists and contains PDF data", () => {
  const href = markup.match(/href="([^"]+)"/)?.[1];
  assert.equal(href, "/Subham-Sangwan-Resume.pdf");
  const pdf = readFileSync(new URL(`../public${href}`, import.meta.url));
  assert.equal(pdf.subarray(0, 5).toString(), "%PDF-");
  assert.ok(pdf.length > 0);
});
