# Phase 4 — Cookie notice fix and audit rerun

1 November 2026. Continues draft PR #11 from `f2cb8dc`. The only application edit is in `src/components/PolicyPage.astro`: conditionally omit the requested audit-style sentence when `title === 'Cookie Policy'`. Other policies still render it. No merge or deployment.

## Narrow-change verification

- The three Cookie HTML variants differ from the previous build **only by removal of that sentence and its leading space**. Their approved H1, sections, paragraphs, contact link, remaining draft notice, date and review labels are unchanged.
- The other **31 generated HTML pages are byte-for-byte unchanged**. This includes all nine Terms/Privacy/Disclaimer variants, which retain the sentence. Before/expected-after/actual hashes: [before-hashes.json](references/revision-4-cookie-fix/before-hashes.json), [html-scope-check.json](references/revision-4-cookie-fix/html-scope-check.json).
- Astro check: **89 files, zero errors/warnings/hints**. Build: **34 HTML pages**, sitemap, ten inline-script CSP hashes. Fresh Clients and policies verification scripts pass.

## Fresh Phase 4 audit results

| Criterion | Result | Evidence |
|---|---|---|
| (a) SILQ in Clients/Home; no status/engagement claim | PASS, approved industry caption retained | Fresh `clients-silq.json` / `home-silq.json`: 24 clients, SILQ in actual loop, no Home industry caption. |
| (b) Clients verification | PASS | `verify-clients.txt`: all three variants pass. |
| (c) Exact approved Cookie wording; audit sentence removed | PASS | Fresh `cookie-rendered.json`, source/build comparison of all three variants; other nine policy variants retain the sentence. |
| (d) Real About activities and no-JS readability | PASS — scripts blocked | Six fresh 375/768/1440px × light/dark cases; both original activity texts readable; native GeM anchor works. `about-script-blocked.json`. |
| (e) Contact Spotlight surfaces in both themes | PASS for measured rendering | Three static panels, positive widths, no clipping/glow/shadow in the repeated route/width checks. |
| (f) Review banners and draft labels unchanged | PASS | Exact comparison across all 34 pages; date preserved. |
| (g) Desktop/mobile layout, both themes | PASS for measured layout | 68 freshly repeated entry-URL/width cases, including explicit light/dark variants, no horizontal overflow; 1,304 internal link/fragment occurrences resolve. `all-route-layouts.json`. |

Evidence directory: [revision-4-cookie-fix](references/revision-4-cookie-fix/). Full machine-readable results: [acceptance-results.json](references/revision-4-cookie-fix/acceptance-results.json). The audit now accepts an evidence-directory argument so prior failure records remain intact. Rerun: `node scripts/verify-revision4-audit.mjs docs/references/revision-4-cookie-fix`. This validates source/build data and the saved fresh browser observations; it does not itself drive the browser.

No-JS method remains enforced HTTP `script-src 'none'`, not a changed browser-wide preference. Unthemed entry URLs may redirect to the saved themed equivalent; requested/actual paths are recorded. Browser: ChatGPT in-app browser; main layout widths 375/1440 CSS px. Results are local measurements, not production or complete accessibility certification.

**NOT TESTED remains unchanged:** actual screen-reader speech, physical touch, runtime OS/browser reduced-motion switching, browser-wide JS-off preference, contact-app launch/delivery, fresh Lighthouse/performance and production hosting. The prior Phase 3 reduced-motion item remains open. No effective date, publication approval or new business claim was added. Synced sources remain untouched. PR #11 stays draft; no merge/deploy.
