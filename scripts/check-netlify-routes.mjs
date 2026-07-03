// Guard: every marketing page in src/app must be "kept local" in netlify.toml,
// otherwise the catch-all proxy rule would send it to app.parallelbase.io.
//
// This runs automatically before every build (see package.json "build" script).
// If you add a new marketing page and forget to whitelist it, the build fails
// here with instructions instead of silently proxying your new page away.
//
// To fix a failure: add a keep-local rule to netlify.toml, e.g.
//   [[redirects]]
//     from = "/your-new-page"
//     to = "/your-new-page"
//     status = 200
// placed ABOVE the "/*" catch-all proxy rule.

import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const appDir = join(root, "src", "app");
const tomlPath = join(root, "netlify.toml");

// 1. Discover marketing page routes (directories with a page.tsx), skipping
//    /api routes and dynamic segments (which aren't simple marketing pages).
function findPageRoutes(dir, base = "") {
  const routes = [];
  for (const entry of readdirSync(dir)) {
    if (entry.startsWith(".")) continue;
    const full = join(dir, entry);
    if (!statSync(full).isDirectory()) continue;
    if (entry === "api") continue; // API routes are handled by their own rule
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

// 2. Parse netlify.toml for keep-local rules (redirects whose target is NOT an
//    external URL). Collect exact paths and prefix ("/x/*") paths.
const toml = readFileSync(tomlPath, "utf8");
const blocks = toml.split(/\[\[redirects\]\]/).slice(1);
const exact = new Set();
const prefixes = [];
for (const block of blocks) {
  const from = block.match(/from\s*=\s*"([^"]+)"/)?.[1];
  const to = block.match(/to\s*=\s*"([^"]+)"/)?.[1];
  if (!from || !to) continue;
  if (/^https?:\/\//.test(to)) continue; // this is a proxy rule, not keep-local
  if (from.endsWith("/*")) prefixes.push(from.slice(0, -2));
  else exact.add(from);
}

const isCovered = (route) =>
  exact.has(route) || prefixes.some((p) => route === p || route.startsWith(p + "/"));

// 3. Report any marketing page not covered by a keep-local rule.
const missing = [...routes].filter((r) => !isCovered(r));
if (missing.length > 0) {
  console.error("\n[31m✗ Netlify route guard failed.[0m");
  console.error(
    "These marketing pages exist in src/app but have no keep-local rule in netlify.toml,"
  );
  console.error("so the \"/*\" catch-all would proxy them to app.parallelbase.io:\n");
  for (const r of missing) {
    console.error(`  ${r}`);
    console.error(`      [[redirects]]`);
    console.error(`        from = "${r}"`);
    console.error(`        to = "${r}"`);
    console.error(`        status = 200\n`);
  }
  console.error(
    "Add the block(s) above to netlify.toml (before the \"/*\" rule), then rebuild.\n"
  );
  process.exit(1);
}

console.log(`✓ Netlify route guard: ${routes.size} marketing page(s) all kept local.`);
