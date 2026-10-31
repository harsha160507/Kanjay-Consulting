# Home test — Phase 4

31 October 2026. Tested application commit `06274ddd578e52e91d7faeced340021141b6b9ba` on `phase-4-home`, draft PR #4. This follow-up changes test documentation/evidence only; no application fix, merge or deployment.

## Criteria and method

Before judging: use 320px narrow phone, 768px tablet and 1440px desktop (900px height), with an additional 375px layout check. Message and paths must remain readable without horizontal overflow; internal links must reach their intended route/fragment; contact destinations must match the approved values; headings must have one H1 and no skipped levels; informative images must have meaningful descriptions; keyboard controls must retain visible focus; all essential content/navigation must work with page scripts blocked. Reduced-motion testing must distinguish observed motion/source inspection from an actual preference-enabled run.

Browser: ChatGPT in-app browser on the local production build. Port 4337 serves normal scripts; port 4338 applies CSP `script-src 'none'; object-src 'none'`. This blocks page scripts rather than changing the global browser JavaScript setting. No calls or emails were sent. An internal link reaching a clearly labelled draft passes navigation, not completeness of that destination.

[Detailed observations](references/phase4-home-test/observations.json) include the complete link inventory, every result, full Tab walks, headings, image alternatives, contact destinations and script-blocked text. Existing `node scripts/verify-home.mjs` also passed all three Home variants and all eight Services fragment targets. No new build was required for a documentation-only test.

## Results

| Check | Narrow phone 320px | Tablet 768px | Desktop 1440px | Evidence |
| --- | --- | --- | --- | --- |
| Opening message / audience / markets | PASS | PASS | PASS | Full HR/GeM heading and small/medium-business introduction remain readable; HR global, GeM seller support across India, no buyer-service claim |
| Service paths and approved summaries | PASS | PASS | PASS | Two path anchors; six named summaries; six service and two group destinations reach matching Services index sections |
| Responsive layout | PASS | PASS | PASS | No horizontal overflow in either theme; same result at additional 375px. Six Home sections remain present. Service-link targets at least 64px high |
| Every unique internal link, page scripts blocked | PASS | PASS | PASS | 22 destinations × 3 widths = 66 successful activations with Enter; expected path/hash and fragment existence verified |
| Script-enabled internal links | Covered by keyboard/menu checks | Covered by keyboard/menu checks | PASS, all 22 | Additional full 22-link run with page scripts enabled at desktop: no mismatched destinations |
| Contact markup and keyboard reachability | PASS | PASS | PASS | All eight contact-link instances reachable with visible focus; only three unique approved destinations: `tel:+918939715152`, `mailto:info@kanjayconsulting.com`, `mailto:hr@kanjayconsulting.com` |
| Heading hierarchy | PASS | PASS | PASS | One H1; main sequence 1→2→3→3→2→2→3→3→3→2→3→2; footer resumes H2. No skipped level |
| Image descriptions | PASS | PASS | PASS | Two brand images describe Kanjay Consulting; five client alternatives name Eaton, Aaviza Technologies, Deforay, Zuppa and Woyc::OD. All seven loaded after scrolling; no empty/missing descriptions |
| Skip link | PASS | PASS | PASS | Enter places actual focus on `MAIN#main` |
| Full Tab order / visible focus | PASS | PASS | PASS | 35/35/38 stops after the skip link; no missing focus indicators; all eight contact instances reached; no trap observed |
| Mobile menu keyboard operation | PASS | PASS | N/A | Space opens; Tab reaches About with visible focus. With scripts, Escape closes and returns focus to SUMMARY. With scripts blocked, Space/Tab/Enter still navigates to About |
| Script-blocked essential reading | PASS | PASS | PASS | Dark Home has 2,882 characters of main text at each width, no hidden essential headings/text/links and no overflow. Text exactly matches normal dark Home. Light script-blocked routes and fragments exercised in the 66-link run |
| Static/no-autoplay motion treatment | PASS | PASS | PASS | No CSS keyframe animation assigned to Home content in either theme; no hydrated islands. No moving logo loop, blur or magnet on Home |
| Real reduced-motion preference enabled | NOT TESTED | NOT TESTED | NOT TESTED | Browser reported `prefers-reduced-motion: false`. Available automation has no supported media-preference override; system preference was not changed. Static inspection confirms the global reduce rule disables transitions/animations, but that is not a runtime preference test |

Heading and image checks examine the same responsive DOM; they are not three separate screen-reader sessions. The DOM has native line breaks in multiline headings; `innerText`/visible heading readings retain the separation.

The 22 unique internal destinations are the skip target, Home, About, Services, Clients, Contact, dark Home, three Home section anchors, eight Services section/group anchors, and four policy drafts. Duplicate header/footer link instances share those destinations; their focus reachability was covered in the Tab walks. Facebook/LinkedIn are external links, not internal/contact actions, and were not opened in this audit.

**No functional failures were observed in the exercised checks.** This does not turn untested conditions into passes. Actual OS phone/mail-handler launch, completed call/email delivery, actual screen-reader speech, physical touch hardware and preference-enabled reduced motion remain NOT TESTED. Phone/email tests verify native link destinations and focus, not an external app or delivery. Actual reader review is still needed for speech, reading order and announcements; DOM/alternative inspection is not a substitute.

## Content gaps versus deliberate choices

- No required approved Home fact from the Phase 4 brief was found missing: name, audience, markets, 2014 establishment, GeM since 2018, three values, supported working approach, selected approved clients, business contacts and candidate email are present. New editorial wording/composition still awaits owner acceptance; this does not reopen approval of underlying facts.
- Home intentionally highlights six of the fourteen approved services. The interim Services index also contains only those six. The other eight already-approved services still need the later Services implementation: HR Policies & Documentation; PMS / KRA-KPI; Employee Engagement & Retention; Onboarding, Exit & Full & Final Settlement; Product / Service Catalogue Upload; Tender Participation & Support; OEM Authorization & Vendor Assessment; Catalogue Approval / Rejection Support. These are **available approved content**, not information the owner must resupply or reapprove. Their absence is not a broken Home link because Home does not link to them yet.
- More approved client logos exist than the five selected for Home. A selected grid is intentional; a full Clients page is still a draft. No extra client permission is needed for the already-approved material, but no case-study narrative can be inferred from logo permission.
- Detailed real process stages, handoffs/timelines, service exclusions, prerequisites, responsibilities, statutory jurisdictions, engagement terms and FAQs remain unconfirmed. The Home uses the supplied mutually agreed needs-based approach rather than inventing a sequence.
- Testimonials, outcome figures, awards, certifications and case-study text have not been supplied/approved; omitted. They are optional, not a reason to invent content. SILQ/Golden Works descriptions/current-versus-past status remain unresolved and are not used here.
- About, Contact, Clients and policies remain clearly labelled draft destinations. Team, hours, response promises, Instagram and buyer-facing GeM work remain intentionally omitted; policies/ownership are deferred as requested.

## Next checks

Run a real reduced-motion preference-enabled check for both themes, including hover transitions. Complete a named reader/browser session, physical-phone interaction check and native phone/mail-handler check before release acceptance. Build the remaining inner pages in their authorised phases. This test does not approve release.

Application and dependency files are unchanged in this follow-up. The synced reference archive remains SHA-256 `c2601273dc9bfeca079c7f21e596d2fb7b7e06e9fbf8d0139b7e4135a1ae0606`.
