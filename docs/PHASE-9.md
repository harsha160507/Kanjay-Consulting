# Phase 9 — Policy drafts and 404

31 October 2026. Branch `phase-9-policies`, based on Phase 8 audit commit `764c2a2`. These pages are internal drafts, not effective legal terms. No merge, publication, production hosting or DNS change authorised/performed.

## Complete in the working site

- Four substantial static drafts: `/terms-of-use/`, `/privacy-policy/`, `/cookie-policy/`, `/disclaimer/`, with light/dark variants, contents links, related policies, revision date and verified business contact routes.
- Every draft prominently states **owner and legal review required**, **not yet effective or approved for publication**. Individual review panels identify proposed legal/business wording and missing practices. The date is a draft revision date, not an invented effective date.
- All four policy links remain in every footer, with current-page indication. Footer wording now says drafts are for owner/legal review rather than review being deferred.
- Useful 404 at `/404.html`, served for unknown URLs by the local preview: Home, Services, Contact, phone and email recovery. It suppresses saved-theme URL redirection, preventing repeated redirects of missing addresses. It uses the browser/system palette and valid root links rather than claiming to preserve a missing route's theme.
- Existing static/native layout, typography, tokens and links retained. No dependency, analytics, cookie banner, form, database, legal acceptance checkbox or commercial terms added.

## Inspect first: actual local implementation

The earlier native-browser inspection stopped before implementation. On resumption, the in-app browser worked, but its read-only DOM evaluator did not expose storage or Performance APIs. A temporary **local diagnostic HTML page** therefore rendered the actual same-origin storage and Resource Timing observations into visible text while loading representative built pages in a same-origin iframe. CUA read that rendered output. It did not clear storage or read other origins. The harness is retained as evidence under `docs/references/phase9/inspection-harness.html`, is not under public/src, and was removed from `dist/` after the checks. The verifier guards against shipping it. Its iframe is test instrumentation, not an application embed.

This inspection is scoped to a local browser profile/origin and representative page loads, not packet capture, a fresh-profile audit or proof of absence on every production device. Cache/storage inspection used the diagnostic page's local origin. Browser HTTP caching is distinct from Cache Storage; an empty Cache Storage list does not mean browsers never cache files. No unrelated browser/account details were retained.

| Area | Observation and policy treatment |
| --- | --- |
| Actual serving environment | Local Node static server (`scripts/serve-phase3-audit.mjs`) serves built `dist/`, gzip, no-store, ports 4337/4338. Port 4338 blocks page scripts for tests. Astro output is static. No production-host configuration/account was verified; planned hosting is not treated as actual hosting |
| Browser network before drafting | Home, Contact, Services, Clients, prototype: observed resource URLs stayed on `http://127.0.0.1:4337`. Includes local styles/fonts/images/scripts. No observed remote font, social widget, ad or analytics resource. [Before evidence](references/phase9/runtime-before.json) |
| Browser network after implementation | Four policy drafts and 404: same local-origin-only observation. [After evidence](references/phase9/runtime-after.json). This does not describe network activity after following external social links or using a calling/email app |
| Cookies/HTTP | No JavaScript-visible cookie names observed. Independent HTTP reads of the observed local URLs plus two missing paths: 44 responses, zero Set-Cookie headers. [HTTP observations](references/phase9/http-observations.json). This does not establish production HttpOnly cookie behaviour |
| localStorage | Only key observed: `kanjay-theme`, values `light`/`dark`; observed value changed with the themed page loaded. Source shows that any themed URL writes the value with JS, including direct visits—not only explicit switch clicks. Ordinary routes read it for theme redirection. No expiry is set by application code |
| Other storage | No sessionStorage entries, IndexedDB database names, Cache Storage names or service-worker registrations observed in the inspected local origin, before or after |
| Actual headers | Local no-store behaviour confirmed. `public/_headers` is a hosting-format instruction file; the simple local server does not apply its X-Robots-Tag/Referrer-Policy entries. Do not claim those HTTP protections were active locally. HTML still contains noindex metadata. Final host must be checked separately |
| Enquiries | Native phone/email destinations only; no form endpoint or application message store. Actual inbox, call records, providers, retention and business handling cannot be inferred from frontend code and remain owner review items |

The Cookie Policy distinguishes localStorage from cookies, records key/value/purpose, lack of application expiry, direct-URL writes, JS-disabled URL theming and browser clearing/blocking controls. Clearing storage is not promised to persist if a themed URL is subsequently visited. It does not call theme storage a consent record or claim an exemption from consent rules. Technical background: [MDN localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage). Legal reviewer reference only: [MeitY data-protection rules and enforcement resources](https://www.meity.gov.in/documents/act-and-policies/digital-personal-data-protection-rules-2025-gDOxUjMtQWa?pageTitle=Digital-Personal-Data-Protection-Rules-2025); no conclusion about applicable obligations, commencement or legal compliance is asserted from this implementation.

## Formal approval and missing facts

All four drafts require owner/legal approval before publication. Inline review notes are deliberately visible in the unpublished site and must be resolved into approved public wording, not silently hidden while gaps remain.

| Decision | Required input |
| --- | --- |
| Terms / Disclaimer | Applicability, responsible-use and reuse permissions, reliance boundaries, external-content wording, statutory qualifications, any liability wording, jurisdiction/disputes if appropriate. No blanket logo ownership, waiver, indemnity or liability cap invented |
| Business privacy practices | Enquiry/candidate data and purposes, lawful grounds, access, providers/recipients, sharing, international handling, retention/deletion/backups and safeguards |
| Privacy responsibilities | Confirm responsible business role and privacy/grievance contact/process, applicable rights/complaints, children’s-data treatment and response obligations. Existing public business identity/contact values are retained, not reopened as missing facts |
| Hosting | Actual host/CDN/email provider, processing locations, access/security logging and retention, provider-added storage, applicable notice/consent controls. Obtain real configuration facts; never share credentials in policy copy |
| Effective date / release | Approve final wording and effective date; re-inspect final domain requests, cookies, storage, headers and unknown-route HTTP status after hosting is configured |

The approved GeM non-guarantee boundary is preserved; no service guarantee, government affiliation, case result or public commercial responsibility term was invented. Previous Home/About contact-label failures and pending Services wording proposals remain unchanged and open outside this phase.

## Verification

- PASS — Astro/type check: zero errors/warnings/hints; production build 34 routes.
- PASS — existing foundation/Home/About/Services/Clients/prototype checks and shared palette verification.
- PASS — `node scripts/verify-policies.mjs`: all 34 footers link all four policies; 12 policy variants have draft status, revision date, review panels, sequential headings/unique IDs and valid local/fragment targets; no forms/islands/embeds; 404 has no automatic location.replace and has all recovery destinations; diagnostic page absent from build.
- PASS — 24 policy layout combinations: four policies × light/dark × 320/768/1440px. No horizontal overflow; main text matches script-blocked versions.
- PASS — 10 keyboard walks on policies/404 at 320px light and 1440px dark, scripts blocked: skip link focuses main, expected main/footer links reached with visible focus and traversal returns to skip. The initial test incorrectly classified the browser-chrome focus boundary as an app control; it was corrected and all walks repeated without application changes. [Browser evidence](references/phase9/browser-checks.json).
- PASS — actual contents link and footer link activated with Enter; matching policy/section reached without page JS.
- PASS — unknown base and themed URLs return HTTP 404 locally; saved theme does not change the requested missing URL or cause a redirect loop. Direct `/404.html` is an asset request (HTTP 200), not the unknown-route status check.
- NOT TESTED — production deployment/host logs, formal legal suitability, actual screen-reader speech, physical touch, OS reduced-motion switching, call/email delivery and cross-browser release testing. No Lighthouse run or performance-regression claim this phase.

Previews: [Cookie draft desktop](references/phase9/cookie-draft.png), [404 narrow phone](references/phase9/404-phone.png). Viewport captures only. Local preview remains running at the owner's request.

Synced `sources/` ZIP SHA-256 remains `c2601273dc9bfeca079c7f21e596d2fb7b7e06e9fbf8d0139b7e4135a1ae0606`. Evidence screened for credentials and unnecessary personal/local-machine details; relevant loopback URLs and public website values retained. No release approval implied.
