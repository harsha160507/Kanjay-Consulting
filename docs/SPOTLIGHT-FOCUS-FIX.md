# Spotlight first-load focus fix — PR #3

31 October 2026. Follow-up to the [acceptance audit](PHASE-3-ACCEPTANCE-2026-10-31.md), based on application commit `b4d7e15`. Only the prototype Spotlight implementation and supporting test evidence change. No new pages, dependency changes, merge or deployment.

## Cause and change

`PrototypeService` previously returned an article while `useReduced()` was initially true. After hydration resolved the real preference, it returned a different `SpotlightCard` component root. React replaced the focused Services anchor with that subtree.

It now always renders `SpotlightCard`, with the same content/link nodes in server HTML, first React render and subsequent preference states. A `disabled` prop gates only the decoration: no animation listeners are installed while disabled, and CSS hides the decorative spans/shadow for SSR, no-script and reduced-motion states. Enabling decoration reads an already-focused descendant to position its glow; it never moves focus. No `focus()` call, autofocus or unrelated focus destination is used.

## Acceptance criteria and keyboard evidence

The original server-rendered anchor must stay connected and be the same DOM object after hydration; focus and a visible ring must remain on that anchor. Enter must still reach Services. With scripts blocked, content and native navigation must remain available.

[Recorded observations](references/spotlight-fix/keyboard-observations.json) and [desktop focus screenshot](references/spotlight-fix/desktop-focus.png).

| Width | Focus before hydration | Same connected anchor after hydration | Focus retained / visible | Enter destination | Scripts blocked |
| --- | --- | --- | --- | --- | --- |
| 375px | PASS, server island still has `ssr` | PASS | PASS, zero focus-loss events, ~2.67px teal outline | PASS, themed Services | PASS, full copy/link, decoration hidden |
| 768px | PASS, server island still has `ssr` | PASS | PASS, zero focus-loss events, ~2.67px teal outline | PASS, themed Services | PASS, full copy/link, decoration hidden |
| 1440px | PASS, server island still has `ssr` | PASS | PASS, zero focus-loss events, ~2.67px teal outline | PASS, themed Services | PASS, full copy/link, decoration hidden |

ChatGPT in-app browser, height 823px. Tab from the preceding hero secondary link reaches the service anchor. Ordinary first-load/no-store journeys also passed at all three widths after hydration, with focus on the Services anchor. No-script checks use the existing CSP script-blocking server, not an inferred static HTML result.

To reliably exercise the race, the separate [local fixture](references/spotlight-fix/cold-hydration-server.mjs) serves the same built HTML on loopback port 4339 with no caching, delays only the service JavaScript module by 15 seconds and adds an observation probe. The probe captures the original anchor reference before hydration, counts its focus-out events and exposes read-only test results in data attributes. It does not repair focus or change application content. Observations explicitly record first focus before hydration and completion afterward. The ordinary server is unchanged; this delay/probe is excluded from performance runs and production files. This is a controlled cold-module race, not a claim that the entire browser profile/cache was cleared through browser settings.

## Type/build and performance

- `npm run check`: PASS, 30 files, no errors/warnings/hints.
- `npm run build`: PASS, existing 34 routes compiled for testing; no new full pages implemented.
- `npm run verify:prototype`: PASS, six variants retain server-rendered text, client names and valid links.

Same local gzip/no-store server and Lighthouse 13.6.0 / Headless Chrome 156 as the acceptance audit. Sequential fresh Lighthouse profiles, one run per scenario. Mobile: 412×823, simulated 150ms RTT, 1.638 Mbps, 4× CPU. Desktop: 1350×940, 40ms RTT, 10.24 Mbps, 1× CPU. No play action was initiated on Logo Loop. [Summary/settings/hashes](references/spotlight-fix/performance-summary.json); four unchanged raw reports are gzip archived alongside it.

| Scenario | Prior → fresh performance | Prior → fresh LCP | Prior → fresh external JS | Fresh raw inline scripts |
| --- | --- | --- | --- | --- |
| Enhanced mobile | 94 → 100 | 0.987s → **1.389s** | 125,825 → 125,825 B | 7,107 B |
| Static mobile | 97 → 100 | 1.160s → **0.918s** | 0 → 0 B | 1,513 B |
| Enhanced desktop | 100 → 100 | 0.403s → **0.404s** | 125,825 → 125,825 B | 7,107 B |
| Static desktop | 100 → 100 | 0.265s → **0.264s** | 0 → 0 B | 1,513 B |

Fresh enhanced mobile LCP is about 402ms slower than the prior sample and 470ms slower than its fresh static comparison. Desktop enhanced LCP is about 140ms slower than fresh static. Fresh enhanced total blocking time is 0ms on both presets, versus 284.5ms mobile / 0ms desktop previously. All fresh performance scores exceed 90. These samples do **not** demonstrate no regression: mobile LCP worsened even though the score improved; one run cannot attribute that difference to the fix versus local variation.

Inline figures are raw script text inside compressed HTML, not separately transferred bytes. External totals are navigation-audit measurements and exclude some deferred post-scroll downloads; they do not establish unchanged total interaction JavaScript. No fresh post-scroll transfer comparison was performed. Shared modules prevent assigning aggregate costs to Spotlight alone. Local simulation is not a production guarantee. Automated accessibility scored 100 in all four runs; it is not a screen-reader result.

## Limits and remaining work

This retest closes the specifically reproduced cold first-load keyboard failure in the exercised cases. Actual screen-reader speech, physical touchscreen behaviour, real system reduced-motion changes and focus across live preference toggles were **NOT TESTED** in this follow-up. Earlier acceptance gaps remain open; the historical report's other findings are not superseded. No broader accessibility or release approval is claimed. The existing small link hit area and Loop pause easing were intentionally left unchanged.

Privacy review covered the report, observations, decompressed Lighthouse evidence and screenshot: no credentials, personal filesystem paths or unrelated desktop content were found. Loopback URLs and relevant browser/performance setup remain as measurement context. Synced `sources/` files were not modified.
