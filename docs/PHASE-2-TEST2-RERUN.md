# Phase 2 test 2 rerun

Fresh run on 30 October 2026 against application commit `5871694ee54cb058d76148c418d61ffec90eaf9b`. Both browser sessions used freshly built static output, not the development server. Viewports: phone 375 x 900, tablet 768 x 900, desktop 1440 x 900. Browser viewport checks do not constitute physical-device or multi-engine certification.

## Pass and fail results

| Check | Phone | Tablet | Desktop | Fresh evidence |
| --- | --- | --- | --- | --- |
| Layout / no horizontal overflow | PASS | PASS | PASS | Actual viewport widths recorded; scrollWidth never exceeded innerWidth on tested routes |
| Mouse navigation | PASS | PASS | PASS | Opened mobile menu where applicable and followed Services; correct heading, path and active footer link |
| Keyboard navigation | PASS | PASS | PASS | Enter opened native menu and activated About; keyboard skip link focused main. With JS, Escape closed mobile menu and returned focus to summary |
| Current-page indication | PASS | PASS | PASS | Services and About correct; each of Terms, Privacy, Cookie and Disclaimer had matching aria-current and 3px underline; Home brand and footer marked current |
| Theme selection | PASS | PASS | PASS | Light selected by click; Dark selected by Enter; server HTML/body colours matched the chosen theme |
| Theme persistence through navigation/reload | PASS | PASS | PASS | Light persisted through Services/About/all policy routes; Dark persisted after reload and following Home; repeated with all page scripts blocked |
| Saved JS preference for return visits | PASS | PASS | PASS | Shared browser preference restored bare root to /theme/dark/; preference is width-independent |
| Focus visibility | PASS | PASS | PASS | :focus-visible true; computed outline approximately 2.67 CSS px at browser scaling; light teal rgb(18,103,120), dark pale teal rgb(131,214,221) |
| Colour contrast | PASS | PASS | PASS | Fresh token-pair check: minimum 5.43:1 light / 6.73:1 dark; tested action labels >=4.5:1 and control boundaries >=3:1 |
| Links and essential content with scripts blocked | PASS | PASS | PASS | Same mouse/keyboard navigation, policy headings, footer contacts and skip link usable; selected theme carried in real URLs |

No failures or additional application fixes were identified in this rerun. The two previous findings remain resolved.

## Build and supporting checks

- `npm run check`: 15 files, zero errors/warnings/hints.
- `npm run build`: 28 static pages successfully generated.
- `npm run verify`: all 28 routes pass internal link, matching current-page, static heading, contact, indexing and native-menu checks; no false current marker on 404.
- `node scripts/verify-colours.mjs`: passed. Colour-token calculations are not a claim of complete WCAG conformance for every possible future element.
- Manrope and Inter loaded successfully in the browser. No phone call or email was initiated; contact targets were inspected only.

## Script-blocking method and remaining limits

Local port 4335 served built pages normally. Port 4336 served the same unmodified built files with `Content-Security-Policy: script-src 'none'; object-src 'none'`, preventing every page script from executing. This is a real script-blocked browser test, not source inspection; the browser's global JavaScript engine was not disabled. Read-only test inspection remains available.

Without JS, theme persistence is URL-based: it survives following the site's theme-aware links, reloading, history and bookmarked theme URLs. A fresh unthemed address uses device preference; it cannot recall browser-storage preferences without JS. This is expected and not a remaining defect in no-JS navigation. Both themes use real native links, activated with Enter rather than the previous checkbox's Space action.

Full screen-reader testing, alternate browser engines, physical touch devices and a global browser-JS-off setting are not claimed. Policy routes remain explicitly internal drafts. No publication, merge, new page content or application changes were made during this test run.

Raw observations: [rerun JSON](references/phase2-test2-rerun.json). Earlier audits are historical; this is the current post-fix test result.
