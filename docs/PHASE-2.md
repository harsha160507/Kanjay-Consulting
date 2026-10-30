# Phase 2 visual system and shared layout

**Follow-up:** [current-page and no-JS theme fixes](PHASE-2-FIXES.md) supersede the original toggle and nonpersistent no-JS behaviour described below. There are now 28 generated routes, including static light/dark variants.

30 October 2026. Scope complete: shared visual system only. No homepage marketing content, service detail pages, client strip or animation rollout was built. Nothing merged or published.

## What changed

- Supplied light-transparent Kanjay SVG on a white backing in header/footer, keeping the original artwork and palette; remaining supplied variants retained unchanged. Brand link points Home. The adjacent name is accessible through the link label without duplicate screen-reader text.
- Manrope 600/700 and Inter 400/500, self-hosted through pinned Fontsource packages. Font OFL licences retained under `docs/references/`. No remote font requests.
- Semantic light/dark colour tokens, responsive spacing/type scale, visible keyboard focus, reduced-motion transition removal and a reserved cream client-section token for a later phase.
- Native adaptation of supplied Pill Nav: rounded track, pill items, current-page styling, real server-rendered anchors. Mobile uses native details/summary and ordinary links; it does not need hydration to open or navigate. Escape and click-outside behaviour are optional script enhancements.
- Supplied Uiverse JkHuger toggle redesigned for the palette, native checkbox and visible focus. Removed full-screen blend overlay. Device preference is the default; explicit choice persists in `localStorage` under `kanjay-theme`, guarded for unavailable storage. An inline head script applies stored choice early. Without JS, CSS follows system preference and the checkbox can invert it for the current page; persistence needs JS. Requires modern CSS `:has()` for this no-JS override.
- Supplied Uiverse social-button treatment by david-mohseni adapted to always-visible LinkedIn/Facebook names, theme colours and keyboard focus rather than tooltip-only icons. No additional UI library introduced. Layout uses native semantic Astro elements under the owner's permission to redesign supplied components.
- Shared footer has real site links, approved phone/business/candidate email links, social links and clearly marked policy drafts. No invented address/directions destination, response promise, team, testimonials or statistics.
- Skip link focuses the main region. Every page has an internal-review banner and noindex; policy pages explicitly say review is deferred.
- Phase 1 facts register reconciled with newer owner archive/chat. Original report preserved as historical evidence; source references untouched.

## Pages and preview

`/` is the visual-system review. `/about/`, `/services/`, `/clients/`, `/contact/`, `/terms-of-use/`, `/privacy-policy/`, `/cookie-policy/`, `/disclaimer/` are marked page shells using the layout. `/404.html` uses it too. These are not finished business pages.

Local preview: `npm run dev -- --port 4332`, then `http://127.0.0.1:4332/`. No Netlify connection or review deployment created. No production canonical tags/sitemap are emitted for this draft.

## Checks and evidence

| Check | Result |
| --- | --- |
| Astro / TypeScript | PASS: 12 files; 0 errors, warnings or hints |
| Static build | PASS: 10 pages generated |
| Built route/link checks | PASS: all 10 pages have static headings/skip links/noindex/native mobile disclosure, approved contacts and policy-draft links; local href targets exist; no forms, iframes or hydrated React islands |
| Colour pairs | PASS: `node scripts/verify-colours.mjs`; light minimum 5.43:1, dark minimum 6.73:1 for tested text/background tokens; control borders >=3:1 and action labels >=4.5:1 |
| Browser responsive checks | PASS: in-app browser at 1440, 375 and 320px; no measured horizontal overflow; light/dark inspected; loaded Manrope/Inter confirmed through document.fonts |
| Keyboard and navigation | PASS: Enter opens mobile disclosure, Services link navigates, aria-current matches, Escape closes and restores summary focus; skip link focuses #main; Space toggles theme |
| Preference persistence | PASS: dark selection survived reload and route navigation |
| No-JS basis | Static HTML inspection confirms real anchors and native details/checkbox. No essential content is hydration-dependent. A separate browser session with JS disabled was not available; no full JS-disabled browser certification claimed |
| Source preservation | PASS: synced archive SHA-256 remains c2601273dc9bfeca079c7f21e596d2fb7b7e06e9fbf8d0139b7e4135a1ae0606 |
| Install audit | npm reported zero vulnerabilities after adding two font packages; this is a point-in-time installation result |

The dev toolbar is disabled. Drafts have no form, cookie, analytics, embed or backend. System preference uses matchMedia; explicit theme choice is the only new persistent browser data. No other personal data is stored.

## Open decisions and limits

Review the white-backed supplied logo, Manrope/Inter typography, palette and redesigned supplied controls. This phase does not seek approval of final marketing copy. Per-element Uiverse/React Bits licence provenance still needs clearance before launch; author credit is retained and unverified source snippets are not copied wholesale. Broader screen-reader, browser/device, high zoom and release performance testing remain later checks, not certified here. A screenshot capture of the light desktop specimen is available; additional screenshot captures encountered preview-tool errors, though DOM and interactive checks completed.

Unresolved business facts and omitted/deferred items are listed in `PHASE-1.md`. Hosting/DNS/email migration, policy review and publication remain out of this phase. The branch is based on the Phase 1 branch so its review diff can stay limited to Phase 2 changes. Stop here before further page implementation.
