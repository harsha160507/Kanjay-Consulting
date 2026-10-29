# Kanjay Consulting

Phase 1 Astro foundation. Development only; no site has been published.

Start with [Phase 1 review and owner decisions](docs/PHASE-1.md), [validation](docs/VALIDATION.md) and the preserved [blueprint](docs/blueprint/kanjay-redesign-blueprint-2.md).

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

The nine page routes plus 404 are explicitly development shells. `src/data/site.ts` deliberately contains no approved contact details, client list or service copy. The intended existing folder structure is retained for later components/content/assets. References and approval registers live under `docs/`; nothing there is automatically shipped in the site.

The supplied Next.js archive is a reference, not the application framework. Raw source screenshots, component snippets and unapproved client assets remain in the sibling local `phase1-reference/` working copy. Never edit synced `sources/`.

No deployment automation or hosting connection is configured. Keep indexing protection until launch is approved; `noindex` is not privacy protection. The planned Netlify build command is `npm run build`, publish directory `dist`; configure it only during the authorised hosting phase. Do not enable Netlify Forms.
