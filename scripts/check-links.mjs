const links = [
  ["Portfolio", "https://subham-sangwan-portfolio-kappa.vercel.app/"],
  ["GitHub profile", "https://github.com/Subham-KRLX"],
  ["LinkedIn profile", "https://www.linkedin.com/in/subham-sangwan-592a0a316/"],
  ["Codeforces profile", "https://codeforces.com/profile/KRLX"],
  ["CodeChef profile", "https://www.codechef.com/users/krlx"],
  ["LeetCode profile", "https://leetcode.com/u/KRLX2005/"],
  ["Evolving Pointer demo", "https://subham-krlx.github.io/Evolving-Pointer/"],
  ["Evolving Pointer source", "https://github.com/Subham-KRLX/Evolving-Pointer"],
  ["Property Valuation Advisor health", "https://property-valuation-agentic-advisor-xvfy6pzq5caq72fmxlzrak.streamlit.app/healthz"],
  ["Property Valuation Advisor source", "https://github.com/Subham-KRLX/property-valuation-agentic-advisor"],
  ["Porsche source", "https://github.com/Subham-KRLX/Porsche-premium-car-experience"],
  ["Wine Quality Predictor demo", "https://wine-quality-predictor-pi.vercel.app/"],
  ["Wine Quality Predictor source", "https://github.com/Subham-KRLX/Wine-quality-predictor-"],
  ["Apache Sedona fork", "https://github.com/Subham-KRLX/sedona"],
  ["VS Code C++ tools fork", "https://github.com/Subham-KRLX/vscode-cpptools"],
  ["OpenSeadragon site build", "https://github.com/openseadragon/site-build"],
  ["MIEngine fork", "https://github.com/Subham-KRLX/MIEngine"],
  ["Apache Airflow fork", "https://github.com/Subham-KRLX/airflow"],
];

const browserProtectedHosts = new Set([
  "codeforces.com",
  "leetcode.com",
  "www.linkedin.com",
]);

async function checkLink([name, url]) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15_000);

  try {
    const response = await fetch(url, {
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

    const status = protectedResponse ? `${response.status} (browser protected)` : response.status;
    console.log(`PASS  ${status}  ${name}`);
    return true;
  } catch (error) {
    console.error(`FAIL  ${name}: ${error.message}`);
    return false;
  } finally {
    clearTimeout(timeout);
  }
}

const results = await Promise.all(links.map(checkLink));
const failures = results.filter((result) => !result).length;

console.log(`\nChecked ${links.length} external links: ${links.length - failures} passed, ${failures} failed.`);
if (failures > 0) process.exitCode = 1;
