import type { Context } from "@netlify/edge-functions";

// Proxy anything that ISN'T a marketing page/asset to app.parallelbase.io,
// keeping the URL bar on parallelbase.io (this is a server-side fetch, so the
// address never changes). This is how realtor card URLs like
// parallelbase.io/lucasgomez transparently render the app's page.
//
// Why an edge function instead of a netlify.toml "/*" redirect: the Next.js
// plugin canonicalizes framework rules like /_next/image and forces them to the
// END of the redirect list — after any catch-all — so a redirect catch-all
// shadows the image optimizer and 502s every image. Edge functions run BEFORE
// all redirects, so here we can explicitly control what stays local vs proxies.

// Marketing pages served by THIS site. Add new marketing routes here.
// (The build guard in scripts/check-netlify-routes.mjs keeps this in sync with
// the pages under src/app and fails the build if one is missing.)
const LOCAL_PAGES = ["/", "/get-started", "/studio"];

// Path prefixes owned by this site — always served locally, never proxied.
// NOTE: /_next/ is deliberately NOT in this list — it needs the local-first
// fallback below because BOTH sites emit /_next/* assets (see comment there).
const LOCAL_PREFIXES = [
  "/_ipx/", // legacy image optimizer path
  "/.netlify/", // Netlify functions + Image CDN
  "/api/", // Next.js API routes (order bot, checkout, waitlist)
  "/images/", // static image assets
  "/fonts/", // self-hosted fonts
];

// Server-side proxy a request to the app, preserving method/body and stripping
// the incoming Host header so fetch sets the correct one for app.parallelbase.io.
function proxyToApp(request: Request, path: string, search: string) {
  const headers = new Headers(request.headers);
  headers.delete("host");
  const hasBody = request.method !== "GET" && request.method !== "HEAD";
  return fetch(`https://app.parallelbase.io${path}${search}`, {
    method: request.method,
    headers,
    body: hasBody ? request.body : undefined,
    redirect: "manual",
    // Required by Deno/Netlify when streaming a request body.
    // @ts-expect-error duplex is valid at runtime but missing from the DOM types
    duplex: hasBody ? "half" : undefined,
  });
}

export default async (request: Request, context: Context) => {
  const url = new URL(request.url);
  const path = url.pathname;

  // /_next/* — local-first, then fall back to proxying the app.
  // Both the marketing site and the app are Next.js and emit assets under
  // identical /_next/* paths but with different build hashes. This site's own
  // chunks/CSS/images exist locally; a proxied app page (e.g. /lucasgomez)
  // references the APP's chunks, which only exist on app.parallelbase.io. So we
  // try local first and only proxy to the app when the local file is missing
  // (404) — that way neither site's assets break.
  if (path.startsWith("/_next/")) {
    const local = await context.next();
    if (local.status !== 404) return local; // this site's own asset (or CDN image)
    return proxyToApp(request, path, url.search); // the app's asset
  }

  const isLocal =
    LOCAL_PAGES.includes(path) ||
    LOCAL_PREFIXES.some((prefix) => path.startsWith(prefix)) ||
    // Any request for a file with an extension (logo.png, favicon.svg/.ico,
    // robots.txt, sitemap.xml, etc.) is a local static asset.
    /\.[^/]+$/.test(path);

  if (isLocal) {
    // Let Netlify + the Next.js runtime handle it normally.
    return context.next();
  }

  // Everything else (realtor cards, app routes) -> proxy to the app.
  return proxyToApp(request, path, url.search);
};

export const config = { path: "/*" };
