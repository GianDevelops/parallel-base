import type { Context } from "@netlify/edge-functions";

// Proxy anything that ISN'T a marketing page/asset to app.parallelbase.io,
// keeping the URL bar on parallelbase.io (this is a server-side fetch, so the
// address never changes).
//
// Why an edge function instead of a netlify.toml "/*" redirect: the Next.js
// plugin canonicalizes framework rules like /_next/image and forces them to the
// END of the redirect list — after any catch-all we declare — so a redirect
// catch-all always shadows the image optimizer and 502s every image. Edge
// functions run BEFORE all redirects, so here we can explicitly let Next's own
// paths through and only proxy genuinely-unknown paths.

// Marketing pages served by THIS site. Add new marketing routes here.
// (The build guard in scripts/check-netlify-routes.mjs keeps this in sync with
// the pages under src/app and fails the build if one is missing.)
const LOCAL_PAGES = ["/", "/get-started", "/studio"];

// Path prefixes owned by this site / the Next.js runtime — never proxy these.
const LOCAL_PREFIXES = [
  "/_next/", // Next.js internals: static chunks + image optimizer
  "/_ipx/", // legacy image optimizer path
  "/.netlify/", // Netlify functions + Image CDN
  "/api/", // Next.js API routes (order bot, checkout, waitlist)
  "/images/", // static image assets
  "/fonts/", // self-hosted fonts
];

export default async (request: Request, context: Context) => {
  const url = new URL(request.url);
  const path = url.pathname;

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

  // Proxy to the app. Strip the incoming Host header so fetch sets the correct
  // one for app.parallelbase.io (avoids the origin seeing parallelbase.io).
  const target = `https://app.parallelbase.io${path}${url.search}`;
  const headers = new Headers(request.headers);
  headers.delete("host");

  const hasBody = request.method !== "GET" && request.method !== "HEAD";
  return fetch(target, {
    method: request.method,
    headers,
    body: hasBody ? request.body : undefined,
    redirect: "manual",
    // Required by Deno/Netlify when streaming a request body.
    // @ts-expect-error duplex is valid at runtime but missing from the DOM types
    duplex: hasBody ? "half" : undefined,
  });
};

export const config = { path: "/*" };
