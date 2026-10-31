# Design revision — Phase 1

1 November 2026. Draft branch `design-revision-phase-1`, based on `phase-10-readiness` at `aac26c9d29365d94c39fe121eaa44e0e08b90c42`. Review only; no merge or deployment. Local preview: http://127.0.0.1:4337/ . This revision stops here for owner review.

## What changed

- Removed numbered and breadcrumb eyebrows from Home, About, Services, Clients, Contact, all four policies and 404, including the repeated service-card numbers. Retained small, sentence-case context labels for audiences, values, working approach, enquiry guidance and the address. The 404 retains the plain label “Page not found”. Adjusted first-heading margins.
- Removed both `.brand[aria-current]` decoration rules and current-page attributes from the two brand links and footer links. Logo artwork, wordmark, dimensions and lockup are unchanged. Current-page indication is confined to the desktop/mobile pill navigation. Home and policies have no matching pill item and consequently no selected indicator; no replacement breadcrumb or brand underline was introduced.
- Added smooth native anchor scrolling only under `prefers-reduced-motion: no-preference`. Anchor targets use an 8rem clearance, 7rem on narrow phones. No scrolling interception or sticky-header change.
- Removed decorative section rules, ruled service/history definition lists, list-row underlines, panel outlines and mobile-menu shadow. Separation now uses spacing, heading hierarchy and existing `--soft`/`--surface` colours. Header/footer boundary lines, focus outlines, native disclosure markers and the Uiverse arrow strokes remain functional. Inline link underlines remain useful link identification.
- Buttons and text links have background/colour/border-colour transitions with paired keyboard focus treatments. Arrows nudge 2px; arrow movement and transitions stop under reduced motion. Cards receive a background highlight without lift, scale, tilt, shadow or glow. Keyboard focus retains its outline.
- Added `FadeContent.astro` and a shared enhancement of existing section nodes, including Home hero and About introduction. Each section fades from 0.5 to 1 opacity and moves upward 8px over 320ms, once on entry. No hidden initial CSS, replacement DOM, stagger, blur, masks, particles or scroll listener. A focused section is skipped; focus entering an active animation cancels it. Reduced motion skips setup and cancels/disconnects on preference changes. Missing APIs or failed animation leave static content visible.
- Adaptation provenance: supplied `components/fade content/code.ts`, SHA-256 `7e74e05dcf110decd3502a832941027fe6a4da8ed10f0c4d7a4b5ad79aef4a46`. Its React/GSAP implementation initially returns `visibility: hidden`; the Astro adaptation intentionally removes that failure mode and adds no dependency. The reference was only read.
- Historical internal prototypes also obey the sitewide constraints: the hero renders plain text without Blur Text, Gradient Text or Magnet; background dots and Spotlight glow are disabled. Their reference/source implementations remain in the repository, unused by the hero. The opt-in Logo Loop/static grid is otherwise unchanged. Updated the existing prototype guard from four to three hydrated islands because the hero now requires no hydration.

## Acceptance criteria and results

Evidence below is in [references/revision-1](references/revision-1/). A PASS applies only to the stated check; automated and controlled-unit results are distinct from manual browser/OS tests.

| Acceptance criterion | Result | Evidence |
|---|---|---|
| Astro types and build succeed | PASS | `npm run check`: 63 files, zero errors/warnings/hints. `npm run build`: 34 HTML pages plus sitemap; review CSP regenerated with eight inline-script hashes. |
| Approved non-eyebrow text, facts, routes and assets preserved | PASS | `content-baseline.json` captured before edits; `verify-revision1.mjs` compares exact normalized main text on all 34 routes excluding old/new section labels. `revision-checks.json`. No data, metadata, public image or dependency changes. |
| No numbered/breadcrumb eyebrow or brand-current treatment | PASS | Generated-HTML guard on 34 routes; 54 browser observations show no `.eyebrow` or non-nav current marker. Existing foundation guard updated for the requested pill-only indication. |
| Public pages work at 375, 768 and 1440px in light/dark | PASS | `responsive-browser.json`: 9 routes × 3 widths × 2 themes, no horizontal overflow, hidden sections or decorative borders on inspected main section/article/list/definition/aside nodes. Representative screenshots included. |
| 404 is readable and unnumbered on all three widths | PASS | `404-browser.json`, default light/system presentation. Dark 404 via an actual OS colour-preference change was NOT TESTED; there is no separately generated themed 404 route. |
| Mouse/keyboard native navigation and FAQ remain operable with scripts blocked | PASS | `keyboard-anchor-browser.json`: Enter opens mobile menu, Services link navigates to `/theme/dark/services/` with the matching current item, Enter opens the HR audit FAQ. This was a desktop browser at phone width, not physical touch. |
| Focus visible and arrow movement restrained | PASS | Keyboard-focused Home services link: visible focus, computed outline 2.67px (CSS 3px), accent colour, exact `translateX(2px)` matrix. Service-card pointer hover: soft background, `transform: none`, `box-shadow: none`. Same evidence file. |
| Anchor heading clears the intended header allowance | PASS | Mouse activation of Home services link settled at 111.83px from the viewport top with a 112px phone scroll margin. Initial observations during smooth scrolling were excluded from the settled result. All fragment destinations checked statically. |
| Static HTML stays visible on script failure | PASS | `script-blocked-browser.json`: 18 phone observations (nine routes, both themes), all section opacity 1 and no hidden content/overflow. Port 4338 enforces `script-src 'none'`; native mobile menu, FAQ and theme-aware navigation also exercised. This is script blocking, not a claim that the browser's global JavaScript setting was changed. |
| Fade once, whole-section movement, no focus replacement, safe failures | PASS — controlled execution | `verify-revision1.mjs` executes the shipped TypeScript after transpilation with controlled observer/media/animation fixtures. Covers once-only, long sections, 320ms/8px, no retained fill, focus cancellation/skip, reduced-motion initial/change guards, missing APIs and animation errors. No hidden styles are emitted in HTML. |
| Reduced-motion rules and cancellation logic | PASS — source/unit checks | CSS gates smooth scrolling and disables transitions/arrow motion; controlled tests execute skip/cancel/disconnect paths. Actual OS preference switching and visual timing of the native fade were NOT TESTED; do that manual check before broader approval. |
| Contrast remains accessible in both palettes | PASS — calculation and automated samples | `verify-colours.mjs`: smallest text pairing 5.43:1 light, 6.73:1 dark across background/surface/soft; action labels ≥4.5:1. Four Lighthouse automated accessibility samples score 100. This does not replace assistive-technology testing. |
| Existing content and route safeguards still pass | PASS | `verify-foundation`, `verify-home`, `verify-about`, `verify-services`, `verify-clients`, `verify-policies`, `verify-phase3` and `verify-colours` all passed. Covers 28 main layout routes, 14 service scopes/FAQs, 23 approved client assets, policy drafts/404 and prototype fallbacks. |
| Synced references untouched | PASS | `sources/` contains the same ZIP, SHA-256 `c2601273dc9bfeca079c7f21e596d2fb7b7e06e9fbf8d0139b7e4135a1ae0606`, matching the pre-revision reference hash. No reference writes or tracked public-asset/data changes. |
| Actual screen-reader speech, physical touch, browser zoom, contact app launch/delivery | NOT TESTED | Not performed in this revision. No substitute automated-score approval. |

## Representative measurements

Same local, gzip-enabled, header-enforced port 4340 and Lighthouse 13.6.0 settings as the previous report: simulated mobile 412×823, 4× CPU, 150ms RTT/1638.4Kbps; desktop 1350×940, 1× CPU, 40ms RTT/10240Kbps. Mobile uses light routes, desktop dark. One sample per page/preset, not a production guarantee or controlled causal comparison.

| Page / preset | Performance | Automated accessibility | LCP now | Previous prelaunch LCP |
|---|---:|---:|---:|---:|
| Home / mobile | 97 | 100 | 1.099s | 0.974s |
| About / mobile | 99 | 100 | 1.554s | 0.915s |
| Home / desktop | 100 | 100 | 0.313s | 0.263s |
| About / desktop | 100 | 100 | 0.255s | 0.267s |

All four have **0 external JavaScript transfer bytes**. Executable inline JavaScript is **1,630 raw bytes**, previously 661: the fade adds 969 inline bytes inside the HTML response, not a separate transfer. Home also has 424 raw bytes of JSON-LD; About has none. Raw Lighthouse evidence is compressed in the four `.json.gz` files; configurations and `performance-summary.json` are included. Back/forward-cache diagnostic remains on the no-store local QA server. Mobile samples are slower than the historical readings, so no “no regression” claim is made.

## Review and remaining decisions

Review the spacing, retained plain labels, soft panels and fade restraint before Phase 2. No new business wording was supplied or applied. Prior Services wording decisions, policy business/legal approval, effective dates, production-host checks and other launch blockers remain as recorded in [PRELAUNCH-REPORT.md](PRELAUNCH-REPORT.md); this visual revision does not clear them. No deployment, merge, DNS, indexing or release approval occurred.

Evidence text and decompressed Lighthouse files were checked for local user paths, private keys and common credential/token patterns; none found. Screenshots show only local website content and browser viewport. Public, approved business contact details and localhost QA URLs are intentional.
