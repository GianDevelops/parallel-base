// Guard: every marketing page under src/app must be listed as a local page in
// the proxy edge function (netlify/edge-functions/app-proxy.ts), otherwise that
// edge function would proxy it to app.parallelbase.io instead of serving it.
//
// This runs automatically before every build (see package.json "build" script).
// If you add a new marketing page and forget to whitelist it, the build fails
// here with instructions instead of silently proxying your new page away.
//
// To fix a failure: add the path to the LOCAL_PAGES array in
// netlify/edge-functions/app-proxy.ts, then rebuild.

import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const appDir = join(root, "src", "app");
const edgeFnPath = join(root, "netlify", "edge-functions", "app-proxy.ts");

// 1. Discover marketing page routes (directories with a page.tsx), skipping
//    /api routes and dynamic segments (which aren't simple marketing pages).
function findPageRoutes(dir, base = "") {
  const routes = [];
  for (const entry of readdirSync(dir)) {
    if (entry.startsWith(".")) continue;
    const full = join(dir, entry);
    if (!statSync(full).isDirectory()) continue;
    if (entry === "api") continue; // API routes are covered by the /api/ prefix
    if (entry.startsWith("[")) continue; // dynamic route — flag manually if added
    // Route groups like (marketing) don't add a URL segment
    const segment = entry.startsWith("(") && entry.endsWith(")") ? "" : entry;
    const routePath = segment ? `${base}/${segment}` : base;
    if (existsSync(join(full, "page.tsx"))) routes.push(routePath || "/");
    routes.push(...findPageRoutes(full, routePath));
  }
  return routes;
}

const routes = new Set();
if (existsSync(join(appDir, "page.tsx"))) routes.add("/");
for (const r of findPageRoutes(appDir)) routes.add(r);

// 2. Read the LOCAL_PAGES array from the edge function.
const edgeSrc = readFileSync(edgeFnPath, "utf8");
const arrayMatch = edgeSrc.match(/const\s+LOCAL_PAGES\s*=\s*\[([^\]]*)\]/);
if (!arrayMatch) {
  console.error(
    "\n\x1b[31m✗ Netlify route guard: could not find LOCAL_PAGES in app-proxy.ts.\x1b[0m\n"
  );
  process.exit(1);
}
const localPages = new Set(
  [...arrayMatch[1].matchAll(/["']([^"']+)["']/g)].map((m) => m[1])
);

// 3. Report any marketing page not listed in LOCAL_PAGES.
const missing = [...routes].filter((r) => !localPages.has(r));
if (missing.length > 0) {
  console.error("\n\x1b[31m✗ Netlify route guard failed.\x1b[0m");
  console.error(
    "These marketing pages exist in src/app but are not listed as local pages in"
  );
  console.error(
    "netlify/edge-functions/app-proxy.ts, so the proxy would send them to app.parallelbase.io:\n"
  );
  for (const r of missing) console.error(`  ${r}`);
  console.error(
    `\nAdd them to the LOCAL_PAGES array in netlify/edge-functions/app-proxy.ts:\n`
  );
  console.error(
    `  const LOCAL_PAGES = [${[...localPages, ...missing]
      .map((p) => `"${p}"`)
      .join(", ")}];\n`
  );
  process.exit(1);
}

console.log(
  `✓ Netlify route guard: ${routes.size} marketing page(s) all served locally.`
);
