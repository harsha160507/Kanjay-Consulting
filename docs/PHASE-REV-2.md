# Design revision — Phase 2

1 November 2026. Continues `design-revision-phase-1` and draft PR #11 from Phase 1 commit `61f15ff`. No merge, deployment or full-page expansion. Local preview remains http://127.0.0.1:4337/ . Stop here for owner review.

## Available now

- **Complete Home client treatment:** read the live `currentClients` data: 23 entries, 23 unique. Added the separately approved SILQ logo and deduplicated by ID, normalized name and asset URL: **24 Home logos**. The full manifest and sizing results are in [revision-checks.json](references/revision-2/revision-checks.json). No current/past classification, service mapping, testimonial or result is inferred for SILQ; the Clients page remains its existing 23 approved current relationships.
- **SILQ asset resolved:** the owner's attached `SILQ.png` was accessible and converted to lossless WebP at `public/images/clients/silq.webp`. Same 412×148 dimensions; alpha preserved, including 37,570 fully transparent pixels. Decoded comparison found zero alpha differences and zero visible colour differences. 20,858 bytes → 12,122 bytes, about 42% smaller. No resize, crop, recolouring, background flattening or generated replacement. The original attachment is unchanged. [Provenance and hashes](references/revision-2/silq-provenance.json). The committed asset is ready for Phase 4 reuse.
- **Supplied Logo Loop:** flat horizontal loop at 18px/s, visible Pause/Play command, immediate pause-on-hover, no coasting after pause. No dragging, scroll boost, introductory stagger, zoom, tilt, lens or edge fade. Initial React hydration reserves a 100px strip; the engine's layout work starts within 240px of the viewport rather than at first load. A separate, complete Astro grid remains in static HTML and accessible to assistive technology; visual looping copies are decorative. The grid stays visible when scripts fail or are blocked, and is restored for reduced motion. A real, theme-aware “View all clients” link was added; the previous Home markup did not actually contain that link.
- **Canonical artwork and sizing:** removed all five files under `/images/prototype-clients/` and updated the internal prototype to use canonical client assets too. Removed the old `.home-woyc` rule and hardcoded file-name branching. A shared tile uses proportional, equal-area sizing (target 6,000px², capped at 150×72px). Artwork is unchanged. Both website themes use a designed light client panel. Existing `darkBacking` metadata supplies a small contrasting tile only for reverse artwork with white lettering; other logos are not forced onto navy.
- **Hero:** supplied Gradient Text renders exactly “GeM seller guidance.” using the verified `--accent` and `--text` palette values. It is server-rendered and static: no animation loop, pointer-following, glow, border or extra text entrance. Includes clipping/forced-colour fallbacks. The only entrance remains Phase 1 Fade Content. No Blur Text, Shiny Text or word/letter animation is activated.
- **Call action:** only the primary Call link is wrapped in supplied Magnet. Maximum offset 2px, no scale/tilt, restrained spring, small interaction reach. Keyboard focus, coarse pointers and reduced motion suppress its transform. The real `tel:` anchor exists before hydration and with scripts blocked.
- **Spotlight Card:** the two service summaries and contact invitation use the supplied component in its **static surface mode**, with gentle native background hover and equivalent focus-within highlighting. Its light, grain, border-glow and shadow layers are disabled to honour Phase 1's no-glow rule. These content panels are not hydrated or replaced. Card wording is unchanged.
- **Two decorative icons:** custom inline line SVGs for HR and GeM, both 32px with 1.5 stroke and the brand accent. Hidden from assistive technology and unfocusable; no icon font, stock illustration or independent icon animation.

The supplied component implementations and existing `public/licenses/react-bits.txt` notices remain. React/React DOM were already installed; no package or lockfile changes, new dependency, external logo source, tracking or persistence feature was added.

## Acceptance criteria and checks

PASS applies to the stated observation, not to unperformed OS/device/assistive-technology checks. Evidence is under [references/revision-2](references/revision-2/).

| Criterion | Result | Evidence |
|---|---|---|
| Build/types succeed | PASS | Astro check: 74 files, zero errors/warnings/hints. Build: 34 HTML routes plus sitemap; review CSP prepared with eight inline-script hashes. |
| All approved live client entries plus SILQ, no duplicate or broken asset | PASS | `verify-revision2.mjs` executes the live client-set construction and dedupe helper; checks all files, three Home variants, 24 exact static list IDs and canonical image paths. Browser sees 24 moving-list entries. |
| SILQ preserves original appearance and transparency | PASS | Lossless decoded-pixel comparison in `silq-provenance.json`, plus browser natural size 412×148 on a light tile. No visible-colour/alpha differences. |
| Card/hero business wording and remaining main-page content preserved | PASS | `foundation-regression.json`: all 34 main text comparisons against pre-revision baseline, allowing contextual labels, framework styles and the new Clients link. Existing Home/service/contact fact and route safeguards also pass. |
| Both themes at phone, tablet and desktop widths | PASS | `responsive-browser.json`: Home at 375/768/1440px × light/dark; no horizontal overflow or broken loaded images, one gradient phrase, two decorative icons, three static Spotlight surfaces. Service cards stack on phone. Light client panel in both themes. |
| Complete readable fallback when scripts do not run | PASS | `script-blocked-browser.json`: six width/theme observations on port 4338 (`script-src 'none'`), all 24 logos in an unclipped static grid; gradient, Call link and Clients link remain. Browser global JavaScript setting was not changed. |
| Real Clients navigation without scripts | PASS | Enter on the Home link opens `/theme/dark/clients/`; native current-page state matches Clients. `focus-assets-browser.json`. No client-side navigation dependency. |
| Native links and keyboard focus preserved | PASS | Call link targets the approved number, with visible outline and stationary Magnet during keyboard focus. HR service link retains a visible outline; all three panels have no shadow/transform and hidden light layer. `focus-assets-browser.json`; pointer Magnet settles at exactly 2px and resets to none for keyboard focus in `magnet-browser.json`. |
| Pause/Play and hover pause work | PASS | `loop-controls-browser.json`: actual track-position comparisons, pointer-hover freeze, keyboard pause with visible focus and resume after hover is cleared. Static names remain accessible; no focusable moving logo duplicates. |
| Reduced-motion protection | PASS — source/SSR checks; runtime OS switch NOT TESTED | `useReduced` defaults to the safe server state, listens for preference changes and unmounts the loop. CSS independently restores the grid and disables Magnet transforms; Phase 1 fade guards remain and their controlled tests pass. Actual OS switching and visual verification under that setting still need a manual check. |
| Palette contrast and automated accessibility | PASS for tested checks | Existing palette calculation: minimum text contrast 5.43:1 light, 6.73:1 dark. Browser gradient uses those same accent/text endpoints. Final Home Lighthouse automated accessibility 100 on both presets. Not a screen-reader test or WCAG certification. |
| Existing routes, clients, policies and prototype safeguards | PASS | `verification-log.json`: all ten verification scripts pass. Existing approved client hashes unchanged; asset allowlist intentionally adds SILQ only. Historical reports retain their original evidence and old paths. |
| Synced source archive untouched | PASS | ZIP SHA-256 remains `c2601273dc9bfeca079c7f21e596d2fb7b7e06e9fbf8d0139b7e4135a1ae0606`; no writes under `sources/`. |
| Actual screen-reader speech, physical touch, OS motion switching, forced-colour runtime, contact-app launch or delivery | NOT TESTED | No reader/browser speech combination or physical device was used; no delivery claim. Desktop browser width changes do not simulate physical touch. |

## Measured cost

Lighthouse 13.6.0, local gzip/header-enforced port 4340, same prior presets: mobile 412×823 with simulated 150ms RTT / 1638.4Kbps / 4× CPU; desktop 1350×940, 40ms RTT / 10240Kbps / 1× CPU. Mobile light, desktop dark. One final sample each, not a production guarantee or a controlled causal comparison.

| Home | Performance | Automated accessibility | LCP | TBT | CLS |
|---|---:|---:|---:|---:|---:|
| Final mobile | 91 | 100 | 1.181s | 378ms | 0.0026 |
| Final desktop | 100 | 100 | 0.273s | 53ms | 0.0079 |
| Phase 1 mobile reference | 97 | 100 | 1.099s | 188ms | 0.0004 |
| Phase 1 desktop reference | 100 | 100 | 0.313s | 0ms | 0.0003 |

Both final performance scores exceed the existing **above-90** local target, but the mobile blocking time and script cost have increased. **Do not read this as no regression.** Final external JavaScript transfer is **88,020 bytes** (previously 0); executable inline scripts are **6,847 raw bytes** inside HTML (previously 1,630). Home JSON-LD remains 424 raw bytes and is not executable. Shared React runtime is included in the external total; no saving is attributed to any one component. Initial pre-deferral sample scored 89 mobile / 100 desktop; retained as `performance-before-defer.json` and the two `*-before-defer.json.gz` reports. The final files are `performance-summary.json`, two `.json.gz` reports and configurations. The local no-store server retains a back/forward-cache diagnostic.

These Lighthouse samples measure initial page load. The loop engine is deferred below the fold; they are not a full-cycle, battery, sustained FPS, physical-device or production benchmark. Operational scroll/pause checks are recorded separately.

## Review boundary

SILQ is included, not blocked or silently omitted. Its asset is ready for reuse; no new relationship classification has been invented. Review the 24-logo treatment, static gradient, restrained Magnet and surface-only Spotlight presentation before the next revision phase. The measured mobile JavaScript/blocking cost remains a review consideration. Prior business/legal wording approvals, production hosting checks and all unperformed manual accessibility checks remain pending. No merge or deployment; stop after this phase.

Evidence text and decompressed Lighthouse files were reviewed for common credential/private-key patterns and unnecessary local user paths; none found. Screenshots contain the website viewport only. Approved business contacts and localhost QA addresses are intentional. See `evidence-review.json`.

## Follow-up — SILQ on Clients

The owner requested SILQ on the Clients page as well. SILQ is now in the canonical client list and appears once on each Clients variant, with its approved logo and selectable name. Home consumes that same canonical list and still contains 24 unique logos. The original 23 assets and entries are unchanged. The earlier Phase 2 statement that the Clients page contained 23 entries describes the pre-follow-up state. No service description, testimonial or result was added.

Follow-up verification: build and Astro type check pass; Clients/Home/foundation/revision guards pass. SILQ loads once with its caption at 375, 768 and 1440px in both themes, without overflow (`silq-clients-browser.json`). No merge or deployment.
