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
  new URL("../src/components/ErrorReporter.tsx", import.meta.url),
  "utf8",
);
const { outputText } = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.CommonJS,
    jsx: ts.JsxEmit.ReactJSX,
    esModuleInterop: true,
  },
});

function renderError(environment, error) {
  const compiled = { exports: {} };
  runInNewContext(outputText, {
    module: compiled,
    exports: compiled.exports,
    require,
    process: { env: { NODE_ENV: environment } },
    console,
  });
  return renderToStaticMarkup(
    createElement(compiled.exports.default, { error, reset: () => {} }),
  );
}

test("the global error fallback has a document language and retry button", () => {
  const markup = renderError("production", new Error("Private failure"));
  assert.match(markup, /<html lang="en">/);
  assert.match(markup, /<button type="button"/);
  assert.match(markup, /Try again/);
});

test("production does not expose the error message, stack or digest", () => {
  const error = new Error("Private failure");
  error.stack = "private-server-path";
  error.digest = "private-digest";
  const markup = renderError("production", error);
  for (const privateValue of [error.message, error.stack, error.digest]) {
    assert.ok(!markup.includes(privateValue));
  }
  assert.ok(!markup.includes("<details"));
});

test("development details are escaped text rather than nested HTML in pre", () => {
  const error = new Error("<script>private</script>");
  error.stack = "stack <path>";
  error.digest = "example-digest";
  const markup = renderError("development", error);
  assert.match(markup, /&lt;script&gt;private&lt;\/script&gt;/);
  assert.match(markup, /stack &lt;path&gt;/);
  assert.match(markup, /Digest: example-digest/);
  const pre = markup.match(/<pre[^>]*>([\s\S]*?)<\/pre>/)?.[1];
  assert.ok(pre);
  assert.ok(!pre.includes("<div"));
});

test("development handles errors without a stack or digest", () => {
  const error = new Error("Example failure");
  error.stack = undefined;
  const markup = renderError("development", error);
  assert.match(markup, /Example failure/);
  assert.ok(!markup.includes("undefined"));
  assert.ok(!markup.includes("Digest:"));
});
