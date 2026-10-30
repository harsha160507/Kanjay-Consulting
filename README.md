# Kanjay Consulting

Phase 3 isolated component prototype alongside the Phase 2 shared layout. Internal review only; no site has been published.

Start with [Phase 2 changes and checks](docs/PHASE-2.md), the [current facts register](docs/PHASE-1.md) and the preserved [blueprint](docs/blueprint/kanjay-redesign-blueprint-2.md). `docs/VALIDATION.md` records the original Phase 1 checks; Phase 2 checks supersede its script-free-foundation assertions.

For the latest prototype, read [Phase 3 measurements and recommendations](docs/PHASE-3.md). Build, run `npm run audit:prototype`, then open `/prototype/` and `/prototype/static/` on port 4337; port 4338 blocks page scripts. `npm run verify:prototype` checks all prototype variants. This does not expand the unfinished business pages.

## Local use

Requires Node >=22.23.4 and npm >=9.6.5.

```sh
npm ci
npm run dev
npm run check
npm run build
npm run verify
npm run preview
```

The dev and preview servers bind to the local computer. Build output is `dist/`. Astro generates static HTML; React is available for later progressive-enhancement islands. No server adapter is needed for the planned static release.

The homepage is an internal visual-system specimen. All other routes use the shared layout with marked draft content. `src/data/site.ts` contains owner-confirmed contact details. Client/service page content remains for later phases. References and approval registers live under `docs/`; nothing there is automatically shipped in the site.

The supplied Next.js archive is a reference, not the application framework. Raw source screenshots, component snippets and unapproved client assets remain in the sibling local `phase1-reference/` working copy. Never edit synced `sources/`.

No deployment automation or hosting connection is configured. Keep indexing protection until launch is approved; `noindex` is not privacy protection. The planned Netlify build command is `npm run build`, publish directory `dist`; configure it only during the authorised hosting phase. Do not enable Netlify Forms.
