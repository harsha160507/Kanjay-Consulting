# Phase 3 prototype acceptance audit

31 October 2026 (Asia/Kolkata). Tested application commit `7abfa4b4dcc91f68589e455b44a66a693e269925` in draft [PR #3](https://github.com/harsha160507/Kanjay-Consulting/pull/3). Scope: Pill Nav sample, hero effects/links, Spotlight Card, Logo Loop and permanent static client grid. Dot Grid and Glass Icons are excluded because their sources were not supplied. No application fixes, full-page implementation, merge or publication were performed in this audit. The PR update contains documentation and test evidence only.

## Acceptance criteria, established before judging results

1. **Keyboard/focus:** actionable controls must be reachable in a sensible Tab order, activate through native keys (Enter for links; Enter/Space for buttons), have visible focus, and retain focus while enhancements load. Static images do not need artificial tab stops.
2. **Actual screen reader:** a named reader/browser session must confirm meaningful headings, link/control names, state announcements, logical reading order and absence of redundant animated-logo/label announcements. DOM inspection and automated accessibility results cannot satisfy this criterion. Without an observable reader session, record NOT TESTED.
3. **Reduced motion:** animation must be removed or stopped while text, links and client names remain available. Test the internal preview separately from a real operating-system/browser reduced-motion preference; source-code support alone does not prove the latter.
4. **Logo Loop:** start paused, offer a keyboard-operable named Play/Pause control with state, stop movement after pausing, and retain a readable static alternative. Record any settling after pause. Other components have no play/pause requirement.
5. **JavaScript disabled:** with page scripts blocked, essential text, client identities and real destination links must remain usable. Unavailable enhancement controls must not become dead controls.
6. **Layout/touch:** no horizontal overflow or clipped essential content at 320, 375, 768 and 1440 CSS pixels. Record real touch separately from mouse/keyboard and viewport emulation; do not infer touch success from responsive screenshots.
7. **Performance:** exceed the blueprint's performance score target of 90 in the same local Lighthouse mobile/desktop presets as the Phase 3 report. Record LCP and externally transferred JavaScript, with raw inline script bytes separately. No maximum JavaScript byte budget has been approved. Compare the complete prototype with its static counterpart, without claiming isolated per-effect costs.

PASS means the stated exercised check met its criterion; it is not certification of every possible state. NOT TESTED means evidence is unavailable. N/A means no applicable behaviour/control exists.

## Evidence and method

- **E1 — keyboard/focus:** [browser observations](references/phase3-acceptance/browser-observations.json), fields `keyboard`, `spotlightFocusEvidence`, `settledSpotlight`. Tab/Enter journeys at 375/768/1440 pixels in the ChatGPT in-app browser, including real About, Contact and Services destinations. Comparison screenshots: [static card retains focus](references/phase3-acceptance/static-card-focus.png), [enhanced card loses focus](references/phase3-acceptance/enhanced-card-focus.png). These screenshots supplement the active-element observations; they are not screen-reader evidence.
- **E2 — loop:** the same observations, `loop` and `grid`: keyboard control activation, `aria-pressed`, timed transforms, static names and decorative moving region.
- **E3 — reduced-motion preview:** `reducedPreview` and `reducedCardFocus`: internal preview checkbox exercised. Actual media query was **false**, preview override **true**. This is explicitly not a real system-preference test.
- **E4 — scripts blocked:** `noJavaScript`: same production build served locally with CSP `script-src 'none'; object-src 'none'` on port 4338. Checked at 375/768/1440, including keyboard navigation to destination pages. Browser JavaScript was not globally disabled through browser settings; CSP blocked all page scripts. The observing test harness does not provide page functionality.
- **E5 — layout:** `layout`: four viewport widths, dark themed prototype, all components loaded. Light themed keyboard/no-script checks were also performed. No physical touchscreen was used.
- **E6 — performance/automation:** [machine-readable summary/settings/hashes](references/phase3-acceptance/performance-summary.json), unchanged raw Lighthouse JSON archives: [enhanced mobile](references/phase3-acceptance/enhanced-mobile.json.gz), [static mobile](references/phase3-acceptance/static-mobile.json.gz), [enhanced desktop](references/phase3-acceptance/enhanced-desktop.json.gz), [static desktop](references/phase3-acceptance/static-desktop.json.gz).
- **E7 — unavailable manual coverage:** `screenReader` and `touch`. Narrator's executable exists on Windows; NVDA was not found in standard installation locations. No reader was used: this session did not provide reliable speech-output observation. Browser for other UI checks: ChatGPT in-app browser. Performance browser: Headless Chrome 156. Neither constitutes a screen-reader session.

## Component results

| Component | Keyboard operation / visible focus | Actual screen reader | Scripts blocked: content / navigation | Responsive layout | Physical touch |
| --- | --- | --- | --- | --- | --- |
| Pill Nav | **PASS**, E1: sampled About link receives Tab focus, 2px teal outline, Enter reaches themed About page at all three tested keyboard widths | **NOT TESTED**, E7 | **PASS**, E4: native pill fallback and real links remain | **PASS**, E5: wraps within all four widths; link height 44px | **NOT TESTED**, E7 |
| Hero effects and links | **PASS**, E1: primary/secondary links receive visible ~2.67px outlines; Enter reaches Contact/About at all three widths | **NOT TESTED**, E7 | **PASS**, E4: complete heading, service copy and both real links visible; heading opacity 1 | **PASS**, E5: readable within all widths; primary target ~58.4px high | **NOT TESTED**, E7 |
| Spotlight Card | **FAIL**, E1: first Tab arrival during lazy loading loses focus to BODY at 375/768/1440. Already-loaded card has visible link/card focus, but that does not repair first arrival | **NOT TESTED**, E7 | **PASS**, E4: plain article, full copy and Services link work | **PASS**, E5: fits all widths. Link height only ~19.3px; touch comfort remains a concern | **NOT TESTED**, E7 |
| Logo Loop | **PASS**, E2: native button receives visible ~2.67px outline; Space plays and Enter pauses; label/state update | **NOT TESTED**, E7 | **PASS**, E4: motion and its control absent, permanent named grid remains | **PASS**, E5: strip/control fit all widths; control ~59.7px high | **NOT TESTED**, E7 |
| Static client grid | **N/A**, E2: noninteractive logo images, no fake tab stops | **NOT TESTED**, E7: actual reading of five names still required | **PASS**, E4: all five named logos remain visible | **PASS**, E5: grid stays within all widths; cream surface retained in dark theme | **N/A** for controls; real phone scrolling **NOT TESTED** |

The raw Pill Nav `textContent` includes the alternate rolling label; that copy is hidden/marked decorative in the implementation. This audit does not infer what a reader speaks from raw text or an accessibility tree.

| Component | Internal reduced-motion preview | Real system/browser reduced-motion setting | Play / pause | Static fallback |
| --- | --- | --- | --- | --- |
| Pill Nav | **PASS**, E3: native static fallback replaces effect | **NOT TESTED**, E7 | **N/A** | **PASS**, E3/E4: real links retained |
| Hero | **PASS**, E3: plain complete H1, opacity 1, gradient removed | **NOT TESTED**, E7 | **N/A** | **PASS**, E3/E4: text and links retained |
| Spotlight Card | **PASS**, E3: plain article, no spotlight; link focus visible in preview | **NOT TESTED**, E7 | **N/A** | **PASS**, E3/E4: article and Services link retained |
| Logo Loop | **PASS**, E3: loop and its motion control removed; grid retained | **NOT TESTED**, E7 | **PASS**, E2, with easing caveat below | **PASS**, E2/E3/E4: permanent grid of five clients |
| Static grid | **N/A**, already static; observed to remain visible in E3 | **N/A**, no animation | **N/A** | **PASS**, E2/E3/E4 |

Logo Loop was initially paused (`aria-pressed=false`). Playing changed its label to Pause and its track position from -1191.87px to -1195.08px between samples. After pausing, state returned to false; positions were -1201.67px at 1.2 seconds, -1201.69px at 2.2 seconds, and unchanged at 2.8 seconds. It stops, but eases down instead of stopping immediately. The moving region is decorative (`aria-hidden`) with no focusable links. The permanent grid contains Eaton, Aaviza Technologies, Deforay, Zuppa and Woyc::OD. Actual reader confirmation of the intended single set of announcements remains NOT TESTED.

## Measured focus failure

The enhanced card's first Tab arrival left `document.activeElement` as BODY with no link href and no visible focus. Its static comparison retained the Services anchor and visible focus. Once hydration had settled, the enhanced card also retained the anchor, a ~2.67px link outline and 2px card outline. A direct locator activation can force focus back to a link; it does not demonstrate an uninterrupted keyboard journey.

Source inspection explains the observed failure: `useReduced` initially returns true, then updates after mounting. `PrototypeService` switches from an article to `SpotlightCard` (a different root component), replacing the focused subtree. This explanation is a code-based diagnosis supported by the observed before/after states; no application fix was made. Keep the same link/DOM structure throughout hydration and add decoration around it, then repeat cold keyboard arrivals and preference-change checks.

## Performance compared with static

Same Phase 3 server/presets: production `dist/`, loopback only, gzip, `Cache-Control: no-store`, Lighthouse 13.6.0 / Headless Chrome 156 on Windows. Sequential runs with fresh Lighthouse browser profiles and no competing animated preview tab. Mobile: 412×823, simulated 150ms RTT / 1.638 Mbps / 4× CPU slowdown. Desktop: 1350×940, simulated 40ms RTT / 10.24 Mbps / 1× CPU. One new run per scenario; these are not averages or selected best runs. UTC timestamps in raw files fall on 30 October; local audit date is 31 October.

| Version / preset | Performance | LCP | Total blocking time | External JS transfer | Raw inline JS |
| --- | ---: | ---: | ---: | ---: | ---: |
| Enhanced / mobile | **94 — PASS** | **0.987s** | 284.5ms | **125,825 B** (122.9 KiB) | **7,107 B** |
| Static / mobile | **97 — PASS** | **1.160s** | 175.5ms | **0 B** | **1,513 B** |
| Enhanced / desktop | **100 — PASS** | **0.403s** | 0ms | **125,825 B** (122.9 KiB) | **7,107 B** |
| Static / desktop | **100 — PASS** | **0.265s** | 0ms | **0 B** | **1,513 B** |

Inline values are raw script text inside HTML, which is compressed as a whole. They are not separately measured network transfer bytes and must not be added to compressed external transfers as if equivalent. The static comparison has inline shared scripts; it is not a zero-JavaScript document. Enhanced externally decoded script bodies total 386,092 B in these navigation runs.

A separate in-app browser observation after deferred card/client components loaded recorded seven scripts, **137,951 B transferred**, 135,851 B encoded bodies and 413,323 B decoded bodies (E3 metrics). Thus navigation-only Lighthouse totals do not describe every script fetched after scrolling. This observation uses a different browser workload; it is not an extra Lighthouse run or a causal per-component allocation. Shared React/Motion chunks prevent assigning the aggregate cost to each effect from this comparison.

In these samples the enhanced desktop LCP is ~137ms slower than static; enhanced mobile LCP is ~174ms faster, while mobile blocking time is 109ms greater and score three points lower. These are measured sample differences, not proof that effects improve mobile loading. No agreed byte cap exists, so JavaScript budget acceptance is **NOT TESTED / not specified**, with measured costs above. Local simulation is not a production guarantee: no real mobile CPU/touch, production TLS/CDN, full future content or sustained interaction/battery measurement is represented.

**Automated accessibility: PASS for the checks run, score 100 in all four scenarios. Actual screen-reader testing: NOT TESTED for every component.** Automation missed the cold-hydration focus failure and cannot replace manual reader use.

## Repository and build checks

- `npm run check`: **PASS**, 30 checked files; zero errors, warnings or hints.
- `npm run build`: **PASS**, existing 34 routes compiled. This verifies the existing prototype, not implementation of new full pages.
- `npm run verify:prototype`: **PASS**, six prototype/theme variants retain expected server-rendered text and links.
- Application source/dependency diff during audit: empty. Only this audit report and its evidence files are included in the upload.
- Pre-upload privacy review: scanned the report, browser observations, summary and decompressed Lighthouse reports for credentials and personal filesystem paths; visually inspected both focus screenshots. No secrets, personal paths, account/session details or unrelated desktop content were found. Loopback test URLs and browser/OS/performance settings are retained to identify the measured setup; screenshots show the prototype only.
- `sources/kanjay website.zip`: **PASS**, SHA-256 still `c2601273dc9bfeca079c7f21e596d2fb7b7e06e9fbf8d0139b7e4135a1ae0606`, matching the pre-audit reference. No synced reference was edited, renamed, moved or deleted.

## Remaining blockers and recommendations

1. **Blocker: fix Spotlight Card's first-hydration focus loss** before wider use. Retest cold Tab navigation at phone/tablet/desktop widths, then preference changes while its link is focused.
2. **Manual coverage remains open:** conduct a real, observable session with NVDA + Chrome or Narrator + Edge (suggested combinations, neither used here). Read landmarks and headings; verify the H1 and nav labels once; follow links; check the card retains focus; confirm Play/Pause name and pressed-state announcements; read each of the five static client names once without animated clones being announced. Record actual reader/browser versions and outcomes.
3. Exercise the real OS/browser reduced-motion setting on initial load and live changes; then use a physical phone to check taps, scrolling, wrapping and focus/menu behaviour. Preview and viewport results do not close these checks.
4. Enlarge the service link's ~19.3px-high hit area for touch comfort. Consider an immediate stop on Pause rather than the measured easing. These recommendations are distinct from the confirmed focus failure.
5. Prefer native navigation, restrained/static hero treatment and the static grid for wider use. Reconsider optional Spotlight/Logo Loop only after the focus blocker and manual checks are resolved. The prior report's exact supplied-source revision/Uiverse permalink provenance gap also remains open before wider reuse.

This is a prototype test report, not release approval. The PR remains a draft; nothing was merged or published.
