# Phase 9 — approved privacy wording clarification

Narrow follow-up to `PHASE-9-ACCEPTANCE.md`; historical findings there remain intact. The privacy email-prose failure is now resolved at implementation/wording level. Business/legal approval remains pending, and all policies and PR #9 remain draft.

## Change and verification

Replaced only the affected opening sentence in Privacy Policy → “When you contact the team” with the owner's exact text:

> Email links open your configured email app. The website does not send email or verify delivery.

Calls, the absence of an application message store, initial-enquiry guidance and owner-review notes are unchanged. The source was compared against the prior committed file with precisely this replacement; no other policy text changed. Existing base/light/dark privacy HTML preview outputs received the same literal replacement to keep port 4337 current **without running a rebuild**. These ignored preview outputs are not committed or deployed; a future normal build will regenerate them from the corrected source.

| Affected check | Result |
| --- | --- |
| Exact requested wording / preservation | PASS — source matches the prior version with only the specified replacement |
| Live privacy outputs | PASS — six HTTP 200 responses: base/light/dark on normal port 4337 and script-blocked port 4338; exact clarification present, old sentence absent, adjacent approved copy and draft status preserved |
| Implementation consistency | PASS — policy/shared/contact actions are native mailto anchors using approved data; no email-sending endpoint, submit action or delivery-checking handler is implemented. This describes link intent and site capability, not proof that a device has an email app configured |
| Email targets | PASS — all 168 rendered mailto instances across 34 built routes use info@kanjayconsulting.com or hr@kanjayconsulting.com; optional query parameters are only service subjects; no unexpected recipient/cc/bcc/body or line breaks |
| Policy guard | PASS — existing verifier: 34 footers, 12 policy variants, draft/date/heading/link checks and 404 redirect guard |
| Browser text | PASS — inspected corrected rendered paragraph and saved [viewport evidence](references/phase9-clarification/privacy-clarification.png) |
| App launch / sending / delivery | NOT TESTED — no email action invoked, message sent or receipt checked |
| Rebuild / type checks | NOT TESTED this follow-up — deliberately not rerun for this literal text replacement |
| Production behaviour / formal legal suitability | NOT TESTED — local checks are not production evidence or legal approval |
| Other manual/regression checks | NOT TESTED this follow-up — no fresh screen-reader speech, touch, performance, responsive, motion, browser-restart or cross-browser test |

[Saved wording and email-link checks](references/phase9-clarification/checks.json). Earlier policy/storage/404 evidence remains historical; it is not represented as newly rerun production testing. The verifier's 404 check here is static, not a fresh browser or HTTP status test.

## 1. Decisions or facts needed from Kanjay

Every item below remains **PENDING owner/business/legal approval**. The specific input required is a question, not an assumed answer.

| Blocker | Specific question to resolve |
| --- | --- |
| Final website terms | What final website-use terms should apply, including permitted use/content reuse, the enquiry-versus-service-agreement boundary, external links, applicable jurisdiction/dispute provisions and any statutory qualifications? Obtain approved wording; detailed commercial service terms remain private |
| Enquiry and candidate data | What data is actually received through business/candidate email and calls, for which purposes and lawful grounds? Who accesses it, which business providers/recipients receive it, and is it shared or handled internationally? |
| Retention and deletion | How long is each enquiry/candidate/contact record retained, why, and how are deletion, mailbox copies, backups and any required retention handled? Provide actual practices, not an invented website deadline |
| Privacy-request procedures | Which responsible business role/contact handles privacy/grievance requests? What identity checks, applicable rights, complaint/escalation routes and response procedures/times apply? Is any children's-data wording needed for actual practices? Public identity/email approval alone does not establish these roles |
| Disclaimer limitations | What reliance/advice, accuracy, availability, external-content/IP and liability wording is approved, with required legal qualifications? Preserve the approved GeM non-guarantee boundary and avoid contradicting actual services |
| Storage/legal notice decision | Based on the final host's measured behaviour, what storage classification, notice and consent controls, if any, does the legal reviewer require? No exemption or compliance conclusion is assumed |
| Effective dates and sign-off | Who gives final owner/legal approval for each policy, what wording is approved, and on what effective/revision dates should it take effect? Current draft revision dates are not effective dates |
| Provider choices and responsibilities | Which production hosting/CDN/email services will Kanjay choose, and who can provide their configuration/processing facts? Provider verification below depends on that choice; no passwords or private credentials belong in public policy copy |

## 2. Checks dependent on the chosen production hosting setup

Every check below is **NOT TESTED on production**. The deployed provider configuration and actual domain must be available before performing it; previous localhost observations do not satisfy it.

| Blocker | Specific verification required |
| --- | --- |
| Hosting/CDN/edge logging | Inspect actual provider settings and records: which request/IP/device/security metadata is logged, purposes, access, recipients, storage region, retention and deletion. Confirm whether edge/security services add separate logs |
| Cookies and browser storage | On the chosen HTTPS domain, inspect Set-Cookie including HttpOnly cookies, JS-visible cookies, local/session storage, IndexedDB, Cache Storage and service workers before/after navigation and theme selection. Verify expiry, direct themed-URL writes, clearing/blocking behaviour and any provider-added items |
| Network requests | Capture representative initial loads, navigation, scroll-triggered assets and theme changes on the production domain; identify all origins/endpoints, third-party resources or injected scripts and distinguish site loads from deliberate external social/email actions |
| Host response and security behaviour | Verify real response headers, cache behaviour, redirects, noindex during review and HTTP status/recovery for unknown base/themed URLs. A `_headers` file in Git is not proof the selected host applied it |
| Provider processing and email configuration | Confirm actual host/CDN/email-provider identities, locations, access/subprocessors and relevant retention/processing arrangements against Kanjay's business decisions. If app handoff or mailbox delivery is later tested with authorisation, record it separately; native href checks cannot establish receipt |
| Final policy reconciliation | Compare measured production facts with the drafts, resolve mismatches and submit final text to business/legal reviewers before replacing internal notes or making policies effective |

No new answers or operational promises were invented. No unrelated code/layout/content edits, source-reference changes, merge or deployment. The local preview remains running.
