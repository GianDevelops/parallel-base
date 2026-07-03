# ⚠️ Read this before adding a new marketing page

This folder holds `app-proxy.ts`, the edge function that powers the
**parallelbase.io → app.parallelbase.io** proxy.

It proxies any path that _isn't_ a marketing page/asset to the app (e.g. realtor
card URLs like `parallelbase.io/lucasgomez`), keeping the URL bar on
parallelbase.io. To know which paths are "yours" (the marketing site) vs the
app, it uses the **`LOCAL_PAGES`** list inside `app-proxy.ts`.

**`/_next/*` is special.** Both this site and the app are Next.js and emit assets
under identical `/_next/*` paths with different build hashes. The edge function
serves `/_next/*` **local-first**: it tries this site's files, and only falls
back to proxying `app.parallelbase.io/_next/*` when the local file 404s. That
keeps the marketing homepage's assets working _and_ makes proxied app pages
(realtor cards) render fully styled. Don't move `/_next/` into `LOCAL_PREFIXES`
or the app's cards will lose their CSS/JS.

## 👉 When you add a new marketing page under `src/app`

Add its URL path to the `LOCAL_PAGES` array in `app-proxy.ts`. For example, if
you create `src/app/pricing/page.tsx`, add `"/pricing"`:

```ts
const LOCAL_PAGES = ["/", "/get-started", "/studio", "/pricing"];
```

**If you forget, that new page will be proxied to the app instead of showing
your marketing page.**

## Don't worry — the build will catch it

You don't have to remember this perfectly. A guard
(`scripts/check-netlify-routes.mjs`) runs automatically on every `npm run build`
and **fails the build with instructions** if a page in `src/app` is missing
from `LOCAL_PAGES`. So a forgotten page can't silently ship — the deploy just
won't build until you add it.
