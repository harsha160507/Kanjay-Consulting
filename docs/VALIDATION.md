# Phase 1 validation

Date: 29 October 2026. Environment: Windows, Node 26.8.2, npm 11.19.1.

| Check | Result |
| --- | --- |
| Repository baseline | Existing skeleton preserved; no existing application to overwrite; changes isolated on `phase-1-foundation` |
| Synced source integrity | Original ZIP SHA-256 before/after matches `c2601273dc9bfeca079c7f21e596d2fb7b7e06e9fbf8d0139b7e4135a1ae0606` |
| Dependency installation | 272 packages installed; npm installation audit reported zero vulnerabilities at this time |
| Version control | Direct dependency versions pinned; npm lockfile records dependency graph/integrity |
| Type / Astro checks | `npm run check`: 0 errors, 0 warnings, 0 hints |
| Production build | `npm run build`: static output; 10 pages built successfully |
| Build-output checks | `npm run verify`: all 10 routes have static headings, skip links and noindex metadata; no scripts, islands, forms, iframes or unapproved phone/email links |
| Client assets | `public/images/clients/` contains only original `.gitkeep`; raw evidence and client images excluded from output |
| Indexing controls | robots.txt and `_headers` present in `dist/`; metadata on every generated route |

The first local attempt could not write Astro's user configuration directory under the restricted execution environment. The checks were rerun successfully with required system access and `ASTRO_TELEMETRY_DISABLED=1`. A dependent verification attempt before the first successful build had no output directory; it passed after the build. These are resolved execution issues, not passing results from the failed attempts.

Dependency/licence metadata is captured in `references/dependencies.json`; licence metadata is an inventory, not clearance for future third-party snippets. No GSAP, Motion, Hugeicons, Uiverse source, webfont or client asset has been added to the live application.

The site is not deployed. Browser layout/mobile/desktop QA, keyboard/screen-reader/zoom checks, reduced-motion/theme behaviour, performance measurements and JavaScript transfer budgets belong to the representative component prototype and finished-page phases. No Lighthouse or WCAG conformance result is claimed. Static 404 output exists; actual host HTTP status awaits hosting tests. Netlify header application, account costs, domain/DNS configuration, redirects and business email delivery remain unverified. No consent or policy conclusions have been invented.

## Setup references checked

- [Astro installation](https://docs.astro.build/en/install-and-setup/)
- [Official React integration](https://docs.astro.build/en/guides/integrations-guide/react/)
- Current package metadata from npm for Astro 7.4.4 and `@astrojs/react` 7.1.2; the installed Node version satisfies their declared runtime requirement.
