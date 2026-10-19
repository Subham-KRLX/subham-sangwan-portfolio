import { pathToFileURL } from "node:url";

const links = [
  ["Portfolio", "https://subham-sangwan-portfolio-kappa.vercel.app/"],
  ["GitHub profile", "https://github.com/Subham-KRLX"],
  ["LinkedIn profile", "https://www.linkedin.com/in/subham-sangwan-592a0a316/"],
  ["Codeforces profile", "https://codeforces.com/profile/KRLX"],
  ["CodeChef profile", "https://www.codechef.com/users/krlx"],
  ["LeetCode profile", "https://leetcode.com/u/KRLX2005/"],
  ["Evolving Pointer demo", "https://subham-krlx.github.io/Evolving-Pointer/"],
  ["Evolving Pointer source", "https://github.com/Subham-KRLX/Evolving-Pointer"],
  ["Property Valuation Advisor health", "https://subham-property-advisor.streamlit.app/healthz"],
  ["Property Valuation Advisor source", "https://github.com/Subham-KRLX/property-valuation-agentic-advisor"],
  ["Porsche demo", "https://porsche-premium-car-experience-three.vercel.app/"],
  ["Porsche source", "https://github.com/Subham-KRLX/Porsche-premium-car-experience"],
  ["Wine Quality Predictor demo", "https://wine-quality-predictor-pi.vercel.app/"],
  ["Wine Quality Predictor source", "https://github.com/Subham-KRLX/Wine-quality-predictor-"],
  ["Airflow merged contribution", "https://github.com/apache/airflow/pull/68118"],
  ["VS Code C++ merged contribution", "https://github.com/microsoft/vscode-cpptools/pull/14108"],
  ["MIEngine merged contribution", "https://github.com/microsoft/MIEngine/pull/1529"],
];

const browserProtectedHosts = new Set([
  "codeforces.com",
  "leetcode.com",
  "www.linkedin.com",
]);

export async function checkLink(
  [name, url],
  { fetchImpl = fetch, timeoutMs = 15_000 } = {},
) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetchImpl(url, {
      headers: { "user-agent": "Mozilla/5.0 PortfolioLinkCheck/1.0" },
      redirect: "follow",
      signal: controller.signal,
    });
    const protectedResponse =
      browserProtectedHosts.has(new URL(url).hostname) &&
      [403, 429, 999].includes(response.status);

    if (!response.ok && !protectedResponse) {
      throw new Error(`HTTP ${response.status}`);
    }

    return {
      name,
      status: protectedResponse ? "unverified" : "passed",
      httpStatus: response.status,
    };
  } catch (error) {
    return {
      name,
      status: "failed",
      error: controller.signal.aborted ? "Timed out" : error.message,
    };
  } finally {
    clearTimeout(timeout);
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const results = await Promise.all(links.map((link) => checkLink(link)));
  const failures = results.filter((result) => result.status === "failed").length;
  const unverified = results.filter((result) => result.status === "unverified").length;
  const passed = results.length - failures - unverified;

  for (const result of results) {
    if (result.status === "failed") {
      console.error(`FAIL  ${result.name}: ${result.error}`);
    } else if (result.status === "unverified") {
      console.warn(`UNVERIFIED  ${result.httpStatus}  ${result.name} (browser check required)`);
    } else {
      console.log(`PASS  ${result.httpStatus}  ${result.name}`);
    }
  }

  console.log(`\nChecked ${links.length} external links: ${passed} passed, ${unverified} unverified, ${failures} failed.`);
  if (failures > 0) process.exitCode = 1;
}
