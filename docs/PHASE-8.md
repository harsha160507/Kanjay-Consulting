# Phase 8 — Contact Us

31 October 2026. Draft implementation on `phase-8-contact`, based on Phase 7 commit `cddeb80`. No merge or deployment. The existing local preview at port 4337 remains running at the owner's request.

## Available page and visitor routes

The Contact placeholder is replaced at `/contact/`, `/theme/light/contact/` and `/theme/dark/contact/`. All essential content and actions are static HTML.

| Visitor action | Published detail / destination | Approval source |
| --- | --- | --- |
| Call our team | +91 89397 15152; `tel:+918939715152` | Owner's [contact details](references/phase8/contact-details.md) |
| Email our team | info@kanjayconsulting.com; `mailto:info@kanjayconsulting.com` | Same source; business enquiries for employers / HR and GeM sellers |
| Candidate recruitment enquiry | hr@kanjayconsulting.com; `mailto:hr@kanjayconsulting.com` | [Owner clarification](references/phase8/owner-clarifications.md) |
| LinkedIn | https://www.linkedin.com/company/kanjay-consulting/ | Owner contact details; existing canonical company URL, without source query parameter |
| Facebook | https://www.facebook.com/kanjayconsulting | Owner contact details |
| Public address | VILLA 12, Chettinadu Enclave, Near SG Swim School, Phase 2, S Kolathur Road, Narayanapuram, Pallikaranai, Chennai-600100, Tamil Nadu | Owner's public-address field and reconciled Phase 1 register |

“Verified” here means matched to the owner-supplied approval record and the existing shared contact data. It does not mean a call connected, an inbox delivered a message, a social destination was reachable, or the postal location was independently verified. No call, email or social message was sent. A configured calling/email app is required for native actions; selectable plain text remains available for copying when no handler is configured. There is no automatic confirmation or claim of receipt/delivery.

The page directs an initial enquiry to a brief description of the HR or GeM seller support needed. Following the [blueprint](blueprint/kanjay-redesign-blueprint-2.md), it asks visitors not to send confidential employee, payroll, identity or tender documents in an ordinary initial enquiry, and to ask the team about the appropriate document-transfer process first. No portal, secure-transfer service, retention promise or commercial obligation was invented. Service links reach the existing HR/GeM sections; employer and candidate email routes are separate.

## Component and scope decisions

Native static contact panels follow the Phase 3 restrained card decision, avoiding hydration and focus replacement. Actions reuse the supplied Uiverse button adaptation; social links reuse the supplied, named social-button treatment. Existing typography, tokens, navigation, theme links, skip link and footer remain. No dependency, animated effect or new image was introduced.

No contact form, database, message endpoint, API credential, enquiry dashboard or “message sent” confirmation exists. No copy widget is needed: the phone/email values are real selectable text beside their actions. No new public services claim, result or response guarantee was added. Other pages and the pending Services wording proposals were left unchanged.

## Omitted and awaiting input

- Hours, timezone/response expectations and Instagram are intentionally omitted under the owner's instructions; these are not repeated input requests.
- The address is approved for public text display. The exact map/directions destination remains unconfirmed, so neither a map embed nor a guessed GPS link is added. A verified destination is needed only if directions are wanted later.
- No appointment, walk-in availability or office network was inferred from the address.
- Contact operations and policy/ownership decisions remain deferred. No new policy or private commercial term was invented.
- Final owner review of the page presentation remains open. Core phone/email/candidate details do not await repeat approval.

## Validation and evidence

Acceptance for this phase: display only approved contact values; selectable text beside correctly labelled native phone/email actions; separate approved candidate route; initial-enquiry guidance; approved social/address only; valid page/fragment links and heading order; readable responsive static content in both themes; no form/storage/false confirmation. No release approval is implied.

| Check | Result and evidence |
| --- | --- |
| Astro/type check | PASS — 42 files; zero errors, warnings or hints |
| Production build | PASS — 34 existing routes |
| Existing checks | PASS — foundation (28), Home (3), About (3), Services (3), Clients (3), prototype (6), shared colour pairs |
| Contact static output | PASS — three variants: approved values, exact native contact destinations, one H1, sequential headings, unique IDs, valid internal/fragment targets, only two approved social URLs, no form/embed/island/confirmation. [Saved checks](references/phase8/static-checks.json) |
| Responsive layout | PASS — 375/768/1440px in light/dark: no horizontal overflow; one phone column, two tablet/desktop columns; all main actions at least 44 CSS px high. [Browser evidence](references/phase8/browser-checks.json) |
| Selectable contact text | PASS — three visible plain-text details use `user-select: text`; no image/canvas contact values. Clipboard copy/paste was not exercised |
| Without page JavaScript | PASS — `script-src 'none'` preview at port 4338; main text matches script-enabled preview in all six size/theme combinations; no horizontal overflow |
| Keyboard | PASS — with scripts blocked, light theme at all three widths: skip link focuses main; all seven main links reached in order with visible focus. HR link activated with Enter; GeM link with mouse, each reached its correct Services section. Native phone/mail actions were inspected, not invoked |
| Current page / colours | PASS — existing foundation current-page assertions; Contact indicated in header/footer. Existing colour verification: light minimum text contrast 5.43:1, dark 6.73:1; shared action pairs at least 4.5:1. This is palette verification, not a full automated accessibility audit |
| Screen-reader speech, physical touch, runtime reduced-motion | NOT TESTED — AX inspection/keyboard use is not reader speech. No new page motion introduced; OS preference switching was not exercised |
| Calling/mail handler launch, actual delivery, social reachability | NOT TESTED — values and hrefs checked, no external contact initiated |
| Performance | NOT TESTED this phase — no new dependencies or page script, but no Lighthouse run or performance-regression claim |

Saved viewport previews: [desktop opening](references/phase8/contact-desktop.png), [phone dark](references/phase8/contact-phone.png), [guidance/candidate route](references/phase8/contact-guidance.png), [address/social/footer](references/phase8/contact-address.png). These are viewport captures, not a full-page screenshot.

Synced `sources/` ZIP SHA-256 remains `c2601273dc9bfeca079c7f21e596d2fb7b7e06e9fbf8d0139b7e4135a1ae0606`. Source references were read only; the report includes working reference copies outside `sources/`. Evidence contains only the website and relevant loopback preview URLs, without credentials or personal filesystem details. No merge, publication or DNS change performed.
