# Design revision — Phase 3

1 November 2026. Continues the existing `design-revision-phase-1` branch / draft PR #11 from `9b80e40`. No merge, deployment, new service pages or work on the next phase. Preview: http://127.0.0.1:4337/services/ .

## Implementation

- Used the supplied `ServiceCardPager.tsx`, `service-card-pager.css` and integration patch as the implementation basis. Exact input copies and hashes are retained in [supplied](references/revision-3/supplied/) and [supplied-provenance.json](references/revision-3/supplied-provenance.json). The patch was adapted to the current Services component, not applied to the older preview branch: existing Phase 1 fade attributes and de-lined headings remain, and old numbered eyebrows were not reintroduced.
- HR remains first, then GeM. Each has seven services, one active card, Previous/Next with wrapping, a native seven-option selector, a visual “Card n of 7” indicator and a separate accessible status. The existing index and full 14-card static list remain server-rendered. There are two `client:load` pager islands, wired to the supplied `staticListId` contract.
- Kept the supplied soft static elevation, borderless panel, bold small labels with accent underlines beneath their text, paragraphs below labels, inset native FAQ, pill controls and 280ms whole-card transition. Inter 700 is loaded from the already installed font package. Phase 1 card highlighting is retained; FAQ shading is adjusted during hover/focus so it remains a distinct inset. Shadow does not bloom or change on hover. Every hover treatment has a keyboard focus equivalent; directional arrows nudge only 2px.
- Added a small relevant inline SVG beside each title in both the pager and static cards: 32px, 1.5 stroke, brand accent, decorative/unfocusable, matching Home. No image/font icon dependency or independent icon animation.
- Full service data matches the pre-change snapshot exactly, including order, Who/Need/Scope and FAQ wording, **except the explicitly requested business-email replacement**. Recruitment retains “Employer enquiry by email” and its separate candidate action, correcting the supplied component's generic employer label. Other email labels and Back-to-index links remain. No service wording, exclusions, commercial terms or outcome guarantees were invented.
- The entire fallback remains operable until the pager has committed. Once active it is visually clipped, made inert and excluded from the accessibility tree to avoid duplicate invisible tab stops; the accessible pager offers every service. Cleanup restores the fallback. Activation is deferred if a visitor has already focused a fallback control, preserving that existing DOM/focus until they leave it. Actual cold pre-hydration focus timing was not tested.
- Deep links select the matching card. Index anchors remain real links; ordinary activation is enhanced to select/scroll to the right group instead of jumping into the clipped list. Modified clicks retain native behaviour. Same-fragment links, browser Back, encoded fragments and malformed-fragment handling are accounted for. Controls replace the fragment so copying the current URL retains the selected service; index navigation creates a history entry. No wheel interception, scroll hijacking, parallax or extra entrance library. Phase 1 CSS controls smooth/reduced-motion scrolling.
- Reduced motion removes the card animation through both a live media-query listener and CSS. Section entrances remain the existing Phase 1 Fade Content. No text splitting, Blur/Shiny Text, particles or background effects were added.

## Business email

The live website now uses **enquiry@kanjayconsulting.com** in shared business data, visible contact details, `mailto:` targets, recruitment FAQ text and Organization metadata. `hr@kanjayconsulting.com` is unchanged. A before/after comparison of all 34 generated HTML routes verifies that email-link subjects, bodies, ordering and candidate targets are preserved, with only the business mailbox replaced. Generated HTML and JavaScript contain no old business mailbox. Historical reports, screenshots, supplied references and the pre-change test snapshots remain historical evidence; they are not served website pages.

The new mailbox is owner-supplied. No email app was launched and no message or delivery verification was performed.

## Acceptance results

Evidence is under [references/revision-3](references/revision-3/). Results are scoped to the stated check; structural/automated checks are separate from actual assistive-technology or device use.

| Criterion | Result | Evidence |
|---|---|---|
| Build and type check | PASS | 34 HTML routes plus sitemap; nine inline-script CSP hashes prepared. Astro check: 80 files, zero errors/warnings/hints. |
| Two supplied pagers plus complete static HTML | PASS | Updated `verify-services.mjs` checks the two ServiceCardPager module references, two identified fallback lists, 14 cards/IDs/native FAQs and no individual service routes. |
| Preserve every service word and order | PASS | `service-baseline.json` → exact deep equality after the one approved email substitution. `runtime-content.json` records all 14 actual rendered names, three facts, FAQ question/answer and both recruitment actions; `verify-revision3.mjs` compares each against the data. |
| Previous/Next, wrapping, selector and visible position | PASS | `keyboard.json` includes 7→1 / 1→7 wrapping in both groups, correct position and keyboard focus on the new card. All 14 selectors were exercised while recording content. |
| Native FAQ and contact keyboard access | PASS | Enter opens FAQ. Tab reaches employer email, candidate email, Back-to-index and the next group's controls without entering the clipped fallback. New-card focus outline measured 2px; summary outline 2.67px. No contact link was activated. |
| Every index link and direct service URL | PASS | `index-navigation.json`: all 14 links at phone width select the exact service and focus its article. `cold-deep-links.json`: all 14 URLs after reload at 375px/dark and 1440px/light (28 cases), no wrong selection/overflow. `external-deep-links.json`: unprefixed `/services/#bid-search-analysis` and the actual Home link both open Bid Search & Analysis. |
| Browser Back selection | PASS | `history-back.json`: URL and HR selection restore to Payroll after navigating between groups. This is not a claim about screen-reader speech/focus restoration. |
| Responsive card/title/icon/label layout in both themes | PASS | `responsive-browser.json`: 375/768/1440px × light/dark, one pager card per group, no horizontal overflow, icons 32px with positive title gap, label weight 700/underline/no border, facts displayed as blocks. Screenshots included. |
| Static fallback and native links/FAQ without scripts | PASS | `script-blocked-browser.json`: all six size/theme cases on port 4338 (`script-src 'none'`) show 14 normal-flow cards, no pager or inactive-list marker, no inert state and no overflow. Native FAQ opens with Enter (`fallback-interaction.json`). Browser-wide JavaScript setting was not changed. |
| FAQ inset, focus and security policy | PASS for observed checks | `security-and-faq.json`: focused light card has soft background and a distinct white FAQ inset; native FAQ opens. No warning/error logs observed on the header-enforced local server. Production-host enforcement is not established. |
| Email replacement, metadata and exact subjects/bodies | PASS | `email-baseline.json` plus `revision-checks.json`: all 34 generated pages and JS chunks checked; all original mailto query strings/candidate links unchanged; Organization email updated. |
| Reduced-motion implementation | PASS — source/guard review; actual runtime mode NOT TESTED | Media-query change listener, animation-free reduced-motion class/CSS and Phase 1 scrolling rules retained. Actual OS/browser reduced-motion switching must still be checked on this build. The older preview's reported tests are not presented as current measurements. |
| Palette contrast / automated accessibility | PASS for tested checks | Existing palette calculator: text minimum 5.43:1 light / 6.73:1 dark. Icons/underlines use that accent; labels use the text colour. Lighthouse automated accessibility 100 in all four samples. This is not WCAG certification or a screen-reader test. |
| Synced references untouched | PASS | Source ZIP SHA-256 still `c2601273dc9bfeca079c7f21e596d2fb7b7e06e9fbf8d0139b7e4135a1ae0606`. Supplied Downloads files were only read/copied. |
| Actual screen-reader speech, physical touch, real OS reduced motion, cold pre-hydration focus timing, multi-browser release checks and mail delivery | NOT TESTED | No screen-reader/browser speech combination used. Phone widths were exercised in a desktop browser, not on a physical device. No app-launch/delivery claim. |

## Representative performance

Lighthouse 13.6.0, local gzip-enabled/header-enforced port 4340, same presets as earlier reports: mobile 412×823, simulated 150ms RTT / 1638.4Kbps / 4× CPU; desktop 1350×940, 40ms RTT / 10240Kbps / 1× CPU. Mobile light and desktop dark. These are development-machine samples, not isolated production measurements, field INP or a stability guarantee.

| Services sample | Performance | Automated accessibility | LCP | TBT | CLS |
|---|---:|---:|---:|---:|---:|
| Latest mobile | 100 | 100 | 1.117s | 46.5ms | 0.0019 |
| Latest desktop | 100 | 100 | 0.260s | 0ms | 0.0016 |
| Earlier mobile, before FAQ contrast refinement | 90 | 100 | 1.182s | 412.5ms | 0.0019 |
| Earlier desktop, before FAQ contrast refinement | 100 | 100 | 0.263s | 0ms | 0.0015 |

Both versions transferred **76,825 bytes of external JavaScript** and contained **6,661 raw bytes of executable inline script** within HTML; Services has no JSON-LD script. Shared React runtime is included. Raw inline bytes are not a separate network transfer. Reports/configs are retained in `performance-summary.json`, `performance-before-faq-contrast.json` and their four compressed raw reports. The no-store QA server reports a back/forward-cache diagnostic.

The latest samples exceed the existing above-90 target; the earlier mobile sample does not. **Consistency is not established.** The FAQ colour adjustment is not credited with the large blocking-time difference: JavaScript was unchanged, and machine load/measurement variance was not isolated. No “no performance regression” claim or static-control comparison is made. A quiet repeated mobile/production measurement remains a launch review item.

## Remaining review

Review the supplied-style pager, service icons and email change before the next phase. Run actual reduced-motion switching, screen-reader speech, physical touch and pre-hydration focus timing; investigate mobile performance consistency before launch. Previously flagged service wording and business/legal policy approvals remain pending; the service-wording preservation instruction was followed rather than rewriting those phrases. Production hosting, logging, redirects and other prior launch blockers are unchanged. Draft PR only; stop after this phase.

Manual motion check still needed: enable reduced motion, reload, use Previous/Next and the selector, then change the preference while the page is open. Confirm card changes have no animation and anchor scrolling is instant. Evidence text, supplied files and decompressed Lighthouse reports were checked for common credentials/private keys and unnecessary local user paths; none found (`evidence-review.json`). Screenshots show website viewports only.
