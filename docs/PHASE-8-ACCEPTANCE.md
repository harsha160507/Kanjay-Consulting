# Contact page and sitewide contact audit

31 October 2026. Tested application commit `cee117c0ebd8c3d71f76e2a49dcac0cbf336dbc8`, draft PR #8. Test-only follow-up: no application, content or layout fixes applied. Initial implementation findings in `PHASE-8.md` are preserved; actual clipboard copying and social reachability were performed in this later audit and supersede those earlier NOT TESTED entries only.

## Acceptance criteria

1. Phone display `+91 89397 15152` and target `tel:+918939715152`; business email `info@kanjayconsulting.com`; candidate route `hr@kanjayconsulting.com`. Match owner records, not independently verified telephone/inbox operations.
2. Native email targets contain only approved recipients and optional correctly encoded service subjects; no unexpected cc/bcc/body recipients. Contact details remain selectable text, including without scripts.
3. All contact/social links are keyboard reachable with visible focus. App-launch actions identify calling or email, as the blueprint requires; generic “Talk…” labels do not satisfy this criterion.
4. At narrow phone, phone, tablet and desktop widths, Contact content wraps without horizontal overflow; its main actions are at least 44 CSS px high. Sitewide inline contact links remain readable and separated. This is browser layout/input testing, not physical touch testing or a full WCAG conformance audit.
5. Social links match owner-approved URLs and open the expected Kanjay destinations. Third-party sign-in barriers are disclosed, not bypassed.
6. No form, enquiry storage flow, or false receipt/delivery confirmation; initial-enquiry guidance and separate business/candidate routing remain available without JavaScript.

## Results

| Check | Result | Evidence and limits |
| --- | --- | --- |
| Displayed details | PASS | Contact phone and both emails match the [approved contact record](references/phase8/contact-details.md) and [candidate clarification](references/phase8/owner-clarifications.md). Public address exactly matches the approved Chennai string. Across all 34 built routes, visible phone/email references and shared footer values are consistent |
| All phone/email targets | PASS | 210 rendered link instances across all 34 routes, including themes, policy drafts, 404 and prototypes: zero unapproved phone numbers or recipients. Optional Services subjects decode cleanly; no cc/bcc/body parameters. [Exhaustive target inventory](references/phase8-audit/sitewide-targets.json) records every instance and built HTML hash |
| Copyability | PASS | Contact phone, business email and candidate email individually selected with triple-click and copied using Ctrl+C with scripts blocked; clipboard values exactly match the three approved values after trimming paragraph whitespace. All 210 sitewide contact anchors also expose selectable text in mobile DOM inspection; none uses `user-select: none`. Actual clipboard copying was representative, not repeated for every duplicate. [Browser/clipboard evidence](references/phase8-audit/browser-checks.json), [candidate selection screenshot](references/phase8-audit/candidate-copy.png) |
| Keyboard reach and focus | PASS | Full Tab walk on every one of 34 routes at 1440px, with page scripts blocked: all 284 contact/social instances reached and visibly focused, zero traps or missing targets. Additional Contact walks at 320/375/768px in both themes reached all seven main links with visible focus. Native call/mail handlers were not invoked |
| Action labels | **FAIL — two existing actions** | Home’s “Let’s talk” links directly to `tel:+918939715152`; About’s “Talk about your business” links directly to `mailto:info@kanjayconsulting.com`. Both destinations are correct but labels do not identify the app action. Each repeats in base/light/dark routes (six instances). Contact’s “Call our team” and “Email our team” PASS |
| Contact responsive/mobile layout | PASS for tested browser layout | 320/375/768/1440px × light/dark: no horizontal overflow, visible wrapping details, minimum main-action height 44px, identical main text with scripts blocked. [320px dark capture](references/phase8-audit/contact-320-dark.png). Physical touch and mobile OS app handoff NOT TESTED |
| Sitewide mobile layout/contact spacing | PASS for tested browser layout | All 34 routes at 375px had no horizontal overflow. Inline text-link rectangles can be as short as 16px; these are not claimed to be 44px buttons. A geometric 24px spacing check of all 117 small contact-link instances found no intersecting neighbouring target circles/rectangles. This limited geometry check is not a complete accessibility audit or touch test |
| Approved social targets | PASS | All 74 rendered social links use only the approved LinkedIn company URL or Facebook `/kanjayconsulting` URL. The LinkedIn source's `originalSubdomain=in` query is omitted without changing company identity; Instagram/WhatsApp remain absent |
| Live social navigation | PASS with platform limitation | Followed the Contact links. LinkedIn loaded “Kanjay Consulting \| LinkedIn” at the exact approved company URL; Facebook loaded “Kanjay (@kanjayconsulting)…” with public heading Kanjay at the approved URL. Both showed sign-in overlays, which were dismissed without authentication. Visitor access to full profile content can depend on the platform; no login, follow or message performed |
| No form/false confirmation | PASS | All 34 built routes contain no `<form>` or “message sent”, “enquiry received”, “email delivered” or “call connected” confirmation. Source inspection shows native `tel:`/`mailto:` links, no contact submit/delivery handler. This static check does not claim actual delivery testing |
| Initial guidance and no-JS content | PASS | Contact guidance discourages confidential employee/payroll/identity/tender documents in an initial enquiry; business and candidate routes remain distinct. Main text matched with scripts blocked in all eight Contact size/theme combinations |
| OS calling/email app launch and delivery | NOT TESTED | No call placed, email sent, or calling/mail application invoked. Native href correctness and keyboard focus cannot prove connection, receipt or staff response |
| Actual screen-reader speech, physical touch, runtime reduced-motion | NOT TESTED | No screen reader or physical mobile device used; no runtime OS motion preference switching. These are not replaced by DOM or keyboard evidence |

Browser: ChatGPT in-app browser on the local production build, port 4337. Port 4338 applies `script-src 'none'` to block page scripts. The same built output was tested throughout; no performance run was requested or claimed. A stale preview-control binding was recovered by creating a fresh test tab; the user’s original tab and server were retained.

## Fixes recommended, not applied

- Change the Home direct-call button label to **“Call our team”**, retaining its existing phone target.
- Change the About direct-email button label to **“Email our team”**, retaining its existing business email target.

These two source-label corrections would cover the six themed/base instances. No fact or destination correction is needed. Remaining release/manual checks are listed above; this audit does not automatically approve release.

Hours, response promises and Instagram remain intentionally omitted. Map directions still require a verified destination if wanted; the approved address is already shown as text. No missing core contact approval was inferred.

Application code, dependencies and synced `sources/` were unchanged. Source ZIP SHA-256 remains `c2601273dc9bfeca079c7f21e596d2fb7b7e06e9fbf8d0139b7e4135a1ae0606`. New evidence was screened for credentials, personal/local-machine details and unrelated account content before upload; only public website/contact values, public social titles and relevant loopback URLs are retained. No merge, deployment or message transmission performed. Local preview remains running as requested.
