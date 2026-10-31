# Kanjay Consulting

Phase 10 review build: Home, About, Services, Clients and Contact, with four policy drafts, 404 recovery and an isolated component prototype. Internal review only; no site has been published. See [Phase 10 results and launch blockers](docs/PHASE-10.md).

Start with [Phase 2 changes and checks](docs/PHASE-2.md), the [current facts register](docs/PHASE-1.md) and the preserved [blueprint](docs/blueprint/kanjay-redesign-blueprint-2.md). `docs/VALIDATION.md` records the original Phase 1 checks; Phase 2 checks supersede its script-free-foundation assertions.

For the latest prototype, read [Phase 3 measurements and recommendations](docs/PHASE-3.md). Build, run `npm run audit:prototype`, then open `/prototype/` and `/prototype/static/` on port 4337; port 4338 blocks page scripts. `npm run verify:prototype` checks all prototype variants. This isolated experiment remains separate from the business pages.

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

`src/data/site.ts` contains owner-confirmed contact details and the confirmed www domain. Main pages use supplied/approved content; policy review notes and the Services wording proposals remain pending. References and approval registers live under `docs/`; nothing there is automatically shipped in the site.

`npm run build` also generates hash-based review security headers in `dist/_headers`. Run `node scripts/verify-phase10.mjs` after building. `node scripts/serve-phase10-review.mjs` serves local QA on port 4340 with those headers enforced; the original 4337 preview does not enforce them. Both are local tools, not production-host verification.

Canonical metadata uses the confirmed www domain. Review builds retain noindex and robots Disallow. The sitemap contains only the five candidate business URLs; it is not submitted or advertised in review robots.txt. `_redirects` is a Netlify-compatible proposal, not evidence of live redirects. Production header/redirect behaviour, final policy approval and an explicit launch/indexing decision remain required.

The supplied Next.js archive is a reference, not the application framework. Raw source screenshots, component snippets and unapproved client assets remain in the sibling local `phase1-reference/` working copy. Never edit synced `sources/`.

No deployment automation or hosting connection is configured. Keep indexing protection until launch is approved; `noindex` is not privacy protection. The planned Netlify build command is `npm run build`, publish directory `dist`; configure it only during the authorised hosting phase. Do not enable Netlify Forms.
