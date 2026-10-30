# Phase 3 component prototype and measured recommendations

30 October 2026. Scope: one isolated component test and its static comparison. No full pages were built, no merge or site publication occurred. Phase 2 pages retain their shared layout. The only shared corrections are an optional review-banner label and brand text spacing to make its visible text match its accessible name.

## Working prototype

- `/prototype/`: four experiments: supplied Pill Nav; Blur Text + Gradient Text hero with Magnet primary link and supplied Uiverse secondary link; Spotlight Card; opt-in Logo Loop with permanent static client grid.
- `/prototype/static/`: the same content rendered without hydrated React islands. It still has small shared inline scripts; it is not described as a zero-JavaScript document.
- Light/dark equivalents under `/theme/light/prototype/`, `/theme/dark/prototype/` and their `/static/` variants.
- All are marked internal review and noindex. Run `npm ci`, `npm run build`, `npm run audit:prototype`; open `http://127.0.0.1:4337/prototype/`. The same build under port 4338 blocks every page script for testing. Stop the audit server when finished.
- [Saved preview](references/phase3-prototype.png). The sample is a test surface, not the proposed final homepage composition; the extra experimental navigation and measurement panel are review tools.

Only confirmed business facts and the supplied approved service copy were used. Five approved client assets form the test subset: Eaton, Aaviza Technologies, Deforay, Zuppa and Woyc::OD. Their colours/proportions are preserved; the strip/grid stays cream in both themes and WOYC has a dark backing. No unsupported testimonials, figures, credentials or government endorsement.

## Source names, dependencies and licence review

| Component | Verified primary catalogue entry | Actual supplied-code dependencies | Prototype adaptation |
| --- | --- | --- | --- |
| Pill Nav / `PillNav` | [Official page](https://reactbits.dev/components/pill-nav) | React; supplied version has no GSAP/router imports | Scoped CSS to avoid shared-header collisions; real anchors; no intro; wrapped links; removed clipped rolling duplicate; one readable label and focus/hover colour pair; native fallback |
| Blur Text / `BlurText` | [Official page](https://reactbits.dev/text-animations/blur-text) | React + `motion/react` | SSR starts fully readable, opacity remains 1, short 2px blur only after hydration; full accessible text; no animation for reduced motion |
| Gradient Text / `GradientText` | [Official catalogue](https://reactbits.dev/llms.txt) | React only | One phrase; semantic palette; static accent under reduced motion/no JS |
| Magnet | [Official page](https://reactbits.dev/animations/magnet) | React only | Primary link only, bounded 3px movement, no tilt/scale; native link in fallback |
| Spotlight Card / `SpotlightCard` | [Official page](https://reactbits.dev/components/spotlight-card) | React only | Low intensity, no ambient/flare/grain, theme surfaces, keyboard focus emphasis, plain article fallback |
| Logo Loop / `LogoLoop` | [Official page](https://reactbits.dev/animations/logo-loop) | React only | No autoplay or intro; visible Play/Pause control, hover pause, no dragging; moving copy decorative, permanent named static grid |
| Uiverse secondary button | Supplied CSS credit: `thewizardofzen`; [official collection](https://github.com/uiverse-io/galaxy) | CSS only | Scoped original button CSS to real navigation anchors; focus state; no form/submit semantics |

The names and four variant families (including TypeScript + CSS) were checked against the official catalogue/pages. Current upstream examples can differ from the enhanced, unversioned ZIP snippets. The supplied files' imports, not a generic install recipe, determined dependencies. Added Motion **14.9.0**; React/React DOM remain **19.3.1**. Lighthouse **13.6.0** is a development measurement tool, not shipped application code. No GSAP, router, Three.js, icon package or additional UI library was added.

[React Bits licence](https://raw.githubusercontent.com/DavidHDev/react-bits/main/LICENSE.md) is **MIT plus Commons Clause**, not plain MIT: retain notices, use within an application/website/product, and do not sell/redistribute the components as a standalone component product. [Uiverse collection licence](https://raw.githubusercontent.com/uiverse-io/galaxy/main/LICENSE) is MIT with notice retention. Motion/React package licence metadata is MIT; Lighthouse is Apache-2.0. Licence files are retained in `docs/references/phase3-upstream/` and public application notices in `/licenses/`; code credits and supplied source hashes are recorded.

**Provenance limit before wider use:** the ZIP does not identify upstream commit revisions or the original Uiverse element permalink. The names, imports and library-level terms are checked; exact snippet authorship/revision cannot be independently certified. Registry JSON URLs returned HTTP errors, so no unverified installer was run. This is a conditional provenance finding, not blanket legal clearance of every supplied modification. Obtain/record the original source links before wider release. [Verification record](references/phase3-upstream/verification.json), [source fingerprints](references/phase3-source-inventory.json), [dependency inventory](references/dependencies.json).

Dot Grid and Glass Icons names exist upstream, but their source files are absent from the supplied ZIP. To respect the owner's supplied-component restriction, neither was fetched or substituted from another library. A decorative **static CSS dot treatment** is the explicit Dot Grid fallback; hero labels replace an icon experiment for now. Shiny Text was inspected but is not activated in this prototype. These are deferred experiments, not silent deletion of the blueprint's full component plan.

## Measurements of the corrected build

| Final acceptance run | Performance | Automated accessibility | FCP | LCP | TBT | CLS | External JS transferred |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Enhanced mobile | 100 | 100 | 0.92s | 1.75s | 0ms | 0.043 | 125,825 B / 122.9 KiB |
| Enhanced desktop | 100 | 100 | 0.25s | 0.40s | 0ms | 0.052 | 125,825 B / 122.9 KiB |
| Static mobile comparison | 100 | 100 | 0.93s | 0.93s | 9ms | 0.038 | 0 external script bytes |

Enhanced HTML additionally contains **7,107 raw inline-script bytes** (Astro hydration/shared controls/internal measurement code). Static comparison contains **1,513 raw inline-script bytes**. These bytes travel inside compressed HTML; the external-script column is not a claim of total all-source JavaScript bytes or zero-JS baseline. Per-script decoded initial payload totals 386,092 B. A separate browser observation after scrolling the deferred card/client experiments into view measured **7 scripts, 137,951 B transferred / 135,851 B compressed bodies / 413,323 B decoded bodies**. Transfer totals include browser-reported protocol overhead and can vary by client. The byte counter is internal, local-only, and sends/retains no readings.

Final raw reports (compressed without changing their JSON) and settings: [summary](references/phase3-performance/summary.json), [mobile](references/phase3-performance/accepted-mobile.json.gz), [desktop](references/phase3-performance/accepted-desktop.json.gz), [baseline](references/phase3-performance/accepted-static.json.gz). Report hashes are recorded in the summary.

### Conditions and interpretation

Lighthouse 13.6.0, headless Chrome 156 on Windows, production `dist/` served locally with gzip and cache disabled. Mobile preset: 412 x 823 viewport, simulated 150ms RTT / 1.638 Mbps throughput / 4x CPU slowdown; desktop used Lighthouse's desktop preset. Runs were sequential with fresh temporary browser profiles. Final acceptance table is **one post-correction run per scenario**, not an average. Earlier repeated mobile iterations ranged 93–100 performance and exposed an accessibility score of 96 before the duplicate-label/brand-name fixes; those were not presented as final passing audits.

All final scores exceed the blueprint's >90 performance target in these conditions. Local simulated tests do not include production TLS/CDN latency, real mobile hardware, future page content or a sustained battery/interaction benchmark. Automated accessibility 100 is not WCAG certification or a screen-reader test. A small hydration layout shift remains (CLS below 0.1); native navigation/hero simplification would reduce moving parts further. No exact byte saving per effect is claimed: React/Motion and module chunks are shared, and the two pages are aggregate comparisons.

## Accessible fallbacks and checks

- **PASS:** Astro/TypeScript: zero errors/warnings/hints; 34 routes build (six prototype variants plus previous routes).
- **PASS:** `npm run verify:prototype`: all six prototype variants contain complete static headline, service text, contacts/links and approved client image alternatives; no hidden essential server content, `client:only`, forms or embeds. Baseline has no hydrated islands; enhanced has four.
- **PASS:** existing 28-route verification and colour-token tests remain passing. Actual Pill Nav colours/focus were manually inspected in both themes; inherited dark tiles and alpha focus ring were corrected.
- **PASS:** browser checks at 375, 768 and 1440px, no horizontal overflow; real prototype nav links operate with keyboard; focus remains visible; client surface remains cream in dark mode; service destination is the real Services page.
- **PASS:** unchanged built HTML under CSP `script-src 'none'` retained headline opacity 1, all service text, five named client images and native links at all three widths. This is a script-blocked browser test, not a global browser-engine disable setting.
- **PASS:** Logo Loop starts paused; Play moves its transform; Enter on Pause returns pressed state to false. The moving duplicate is aria-hidden and contains no focusable links; the named grid is never hidden.
- **PASS:** reduced-motion preview uses the same hook fallback as `prefers-reduced-motion`: full plain headline, native navigation, plain service card, no moving loop. The hook also listens for actual preference changes and unmounts effects. OS preference itself was not changed during testing; this is not claimed as a physical-device media-setting test. Global CSS independently removes transitions for reduced motion.
- Server rendering begins in the static state, so slow/failed hydration never hides content. Card/client hydration is view-triggered; hero/navigation hydration is idle-triggered. Source snippets that start invisible were not used as-is.
- Synced archive SHA-256 remains `c2601273dc9bfeca079c7f21e596d2fb7b7e06e9fbf8d0139b7e4135a1ae0606`.

[Browser observations](references/phase3-browser-tests.json). Broader screen-reader, touch-hardware and multi-engine checks remain for a later release review.

## Recommendations before wider use

| Treatment | Recommendation | Reason |
| --- | --- | --- |
| Navigation | **Proceed with native Phase 2 header/mobile menu; simplify Pill Nav to its static pill/hover treatment** | Real links already work. The supplied spring/measurement engine and rolling copies add complexity; duplicates needed removal for contrast. Prototype remains available for review, not installed site-wide |
| Hero text | **Simplify** | Static comparison reaches LCP about 0.93s vs enhanced 1.75s and avoids React/Motion transfer. Keep full text readable; prefer one restrained static accent or a brief CSS enhancement rather than making Motion a default requirement |
| Gradient/Shiny/Glass effects | **Static gradient; defer shine/glass** | Gradient is legible but its continuous loop is decorative. No measured business benefit justifies layering effects. Missing Glass Icons source needs provenance review. This is a recommendation, not an authorised change to the blueprint trim order |
| Primary action | **Native anchor preferred; Magnet optional and bounded** | The destination never depends on pointer movement. Keep only if the owner prefers its 3px movement after review |
| Spotlight Card | **Proceed conditionally, simplified** | Clear static content and focus outline, no ambient or flare. Lazy React island can be retained if its effect is worth the runtime; native border/focus equivalent is cheaper |
| Clients | **Proceed with static cream grid; keep Logo Loop optional, opt-in and pausable** | Every approved client remains identifiable without motion/JS. No auto-loop is needed for credibility; WOYC backing and useful image resolutions are preserved |
| Dot Grid | **Use static fallback for now** | Component source missing from owner's ZIP. No outside replacement or heavy background added |

No full-page rollout follows this phase. Before wider use: choose preferred treatments, resolve source revision/Uiverse permalink provenance, and test the selected design on representative browsers/screen readers. The blueprint's targets and trim order remain unchanged; no claim is made that every planned effect has been tested by this representative prototype.
