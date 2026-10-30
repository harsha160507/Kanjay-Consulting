# Phase 2 fixes and regression results

30 October 2026. Resolves the current-page and no-JavaScript theme findings in the original browser audit. No business content or policy text added, no merge or publication.

## Changes

- Home brand links and the footer Home link now expose aria-current=page. The active logo has a visible teal outline even where its adjacent text is hidden on mobile. Matching footer page/policy links now show a strong underline and weight, with aria-current=page.
- Shared navigation understands the logical page independently of its selected-theme URL. The 404 does not falsely mark Home current.
- The supplied Uiverse control is redesigned into a two-position Light/Dark link control, using the same pill treatment. Each choice is an ordinary link, selected state has a visible filled pill and an accessible selected label. Keyboard activation uses Enter, as appropriate for links.
- Static light/dark variants of the nine page routes carry their theme in the HTML data-theme attribute. All header, footer, page-index and return links retain the selected variant. No-JS selection therefore survives ordinary navigation, reload, history and bookmarks without a server, cookie or database. Added 18 variants, giving 28 generated routes including the original 404.
- With JS enabled, explicit URL selection is remembered in localStorage and restored when visiting an unthemed address. The explicit URL wins over an older saved preference. With no explicit URL or saved preference, device colours apply.

Without JS, reopening an unthemed address in a fresh visit follows device preference. To retain a manual choice for such visits, bookmark the themed URL. No browser storage is written without JS. Both variants remain noindex drafts; production canonical/sitemap work must consolidate theme variants to the agreed business-page canonical before any launch.

## Verification

| Check | Result / evidence |
| --- | --- |
| Type checks | PASS: 15 files, zero errors/warnings/hints |
| Static build | PASS: 28 pages |
| Route and current-page regression | PASS: matching footer aria-current on every non-404 route, including all policy drafts and both theme variants; no current page on 404; local href targets exist |
| Script-blocked browser tests | PASS at 320, 375, 768 and 1440px: choose Dark, follow Privacy Policy, reload, choose Light with Enter, follow Home; correct theme stays across each navigation/reload; matching policy/Home state present; no horizontal overflow |
| JS preference | PASS: after choosing Dark, opening bare /services/ restored /theme/dark/services/ with dark theme |
| Contrast | PASS: unchanged token pairs; minimum text contrast 5.43:1 light / 6.73:1 dark; boundaries >=3:1 |

Script-blocked tests used unchanged built pages under CSP script-src none, not merely static inspection and not a global browser-engine setting. Initial checks caught a TypeScript prop mismatch and an invalid theme destination on 404; both were corrected before the passing final run.

Evidence: [browser results](references/phase2-fix-browser-tests.json), [fixed theme/policy preview](references/phase2-fixes.png). The previous audit remains a historical record with a resolution link. Native menu and skip-link structure are unchanged. Full multi-engine/screen-reader certification is not claimed.
