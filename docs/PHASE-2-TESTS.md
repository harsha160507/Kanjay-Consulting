# Phase 2 browser audit

**Latest result:** [fresh test 2 rerun](PHASE-2-TEST2-RERUN.md) passes the requested checks after the fixes.

**Follow-up:** the two reported issues are now fixed. See [fix validation](PHASE-2-FIXES.md). The table below records the original pre-fix audit, not the current result.

Tested 30 October 2026 against commit `4ce83b94c2dde7309b2775ba2359645d42a7eaeb`. Phone 375 x 900, tablet 768 x 900, desktop 1440 x 900; additional tablet screenshot at 768 x 1024. These are browser viewport tests, not physical-device or multi-engine certification. No application fixes, merge or deployment performed.

## Results

| Check | Phone | Tablet | Desktop | Evidence |
| --- | --- | --- | --- | --- |
| Responsive layout | PASS | PASS | PASS | scrollWidth did not exceed innerWidth; native menu on phone/tablet, pill navigation on desktop |
| Mouse navigation | PASS | PASS | PASS | Menu click where needed, followed Services; correct destination and heading |
| Keyboard navigation | PASS | PASS | PASS | Tab reached real links; Enter followed About with scripts blocked; skip link focused main. With scripts enabled, mobile Enter/Escape opened/closed menu and Escape returned focus to summary |
| Current-page indication | FAIL | FAIL | FAIL | About/Services/Clients/Contact each have correct aria-current and styling in the applicable header nav. Home and all four policy draft pages have no aria-current anywhere or selected link styling |
| Theme selection | PASS | PASS | PASS | Unchecking selected cream/light, keyboard Space selected slate/dark; actual body backgrounds rgb(250,248,243) and rgb(21,35,50) |
| Theme persistence with JS | PASS | PASS | PASS | Dark survived reload; light survived navigating to Contact |
| Focus visibility | PASS | PASS | PASS | Keyboard-focused link/menu/main outline visible; computed outline approx 2.67 CSS px in this browser scaling, teal in light and pale teal in dark. Screenshot shows tablet menu-link focus |
| Colour contrast | PASS | PASS | PASS | Shared palette tests: text minimum 5.43:1 light, 6.73:1 dark; action labels >=4.5:1; tested control boundaries >=3:1 |
| Links/content with scripts blocked | PASS | PASS | PASS | Native menu opened, About link navigated, heading/footer contacts remained readable, skip link focused main; CSS checkbox changed theme; no overflow |

The current-page result is a specific incomplete feature, not a failure of navigation. On the four main inner pages, two aria-current attributes exist in source because both desktop and mobile nav are rendered, with one hidden by the breakpoint; this is intentional. Home and policy-page counts are zero.

## No-JavaScript method

Served unchanged production `dist/` bytes from an audit-only local server on port 4334. Every response enforced `Content-Security-Policy: script-src 'none'; object-src 'none'`. Header was independently read and confirmed. Page JS did not execute: data-theme stayed absent across navigation, unlike the JS-enabled pages where the script sets it. Tested interactive native controls and links in the actual script-blocked page at each width.

This blocks all page scripts; it is not a global browser setting that turns off its JavaScript engine. Read-only browser inspection remains available to the testing tool. JS-enabled interaction tests used the local Astro dev server on port 4333. No scripts were stripped from files or application code modified for these tests.

Without scripts, theme follows system preference initially; the native checkbox changes the current page via CSS. It does not persist across page navigation/reload, and script-enhanced Escape/click-outside behaviours are absent. Those are progressive-enhancement limits; the essential menu still opens/closes with its native summary and real links work. Persistent no-JS theme choice would need a separate server/path-based design, outside the current static layout. Phone/email href values were checked; no call or email was initiated.

## Fix needed

Add current-page semantics and a visible state for Home (for example on the Home brand link and footer Home link), and for each matching policy footer link. Keep links as real anchors. Add a regression check covering `/` and the four policy paths, including scripts blocked. A 404 should not falsely mark any page current.

No business-fact input is needed for this correction. Theme persistence without JS is a documented limitation, not a blocker to ordinary no-JS links/content.

## Evidence and limits

- [Browser observations](references/phase2-browser-tests.json) records requested/actual widths, overflow, destinations, current-page values, focus outlines, theme reload/navigation and no-JS results.
- [Tablet focus screenshot](references/phase2-tablet-focus.png).
- `node scripts/verify-colours.mjs` and `npm run verify` both passed in this audit. Contrast calculations cover the shared token pairs, not every future component or any certification of WCAG conformance.
- Source inspection confirms the missing Home/policy aria-current state; static built files show count zero for these five routes, two for each main inner page.
- Initial extra keyboard-test attempt targeted a nonselected tab after changing another tab's viewport and failed to find the visible mobile menu. Repeated on a fresh selected tab with actual viewport widths recorded; the corrected tests passed. One shell evidence command had quoting errors and was rerun successfully; neither failed attempt counts as a product result.
- Full screen-reader testing, alternative browser engines, touch hardware and storage-blocked preference tests remain outside this audit. No application fixes were made; only this audit and evidence were saved.

Overall: shared-layout interactions pass, with one incomplete current-page feature requiring correction before the Phase 2 test can fully pass.
