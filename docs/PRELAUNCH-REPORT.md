# Prelaunch test report — not cleared for launch

Finalised 1 November 2026, Asia/Kolkata. Application commit tested: `f700b740d14a6bf9d432051f056eaf4ea89bfaec` in draft PR #10. Tests began before the turn interruption; saved browser/performance results were retained and final build/evidence checks completed on resumption. No application code changed. No merge, deployment, indexing change or actual message transmission.

**Overall release gate: FAIL / NOT CLEARED.** The implemented local checks below pass, but required manual tests, business/legal approvals and production-host verification are incomplete. NOT TESTED never means PASS.

## Criteria and coverage

- All 34 generated HTML routes, including theme variants, four policy drafts, 404 asset and enhanced/static prototypes. Anchor/file/fragment/contact targets must be valid. A direct 404 asset can return 200; unknown paths must return 404.
- Browser viewports: phone 375×900, tablet 768×900, desktop 1440×900; script-enabled/header-enforced port 4340 compared with script-blocked port 4338. These are simulated sizes, not physical devices.
- Essential content/headings/navigation must survive no JavaScript; no horizontal overflow; visible keyboard focus and sensible disclosure/menu operation. Automated contrast checks supplement the existing palette check; they do not establish WCAG conformance.
- Blueprint performance target: Lighthouse Performance above 90 under documented representative presets. JavaScript transfer and inline bytes recorded separately. Actual screen-reader speech, real zoom and OS reduced-motion behaviour require their own evidence.
- Approved source facts and client permissions must be retained; unresolved copy and policy approvals must remain explicit. No local observation may be promoted to production evidence.

## Pass/fail table

| Check | Result | Evidence and practical limit |
| --- | --- | --- |
| Build/type checks | PASS | Final Astro check: 57 files, zero errors/warnings/hints. Build: 34 HTML routes plus sitemap. All 34 rebuilt HTML hashes match the tested files exactly. [Final checks](references/prelaunch/final-checks.json), [tested hashes](references/prelaunch/tested-html-hashes.json) |
| Routes and internal links | PASS locally | 34 routes, 1,364 anchor instances; all referenced local files/fragments exist, all 35 unique local target URLs return 200. Unknown base/themed paths return 404. Direct `/404.html` is correctly an HTTP 200 asset. [Complete inventory](references/prelaunch/routes-and-links.json) |
| Contact links | PASS for targets | 236 tel/mailto instances use approved phone/business/candidate values; mailto parameters limited to subjects, no added recipient/cc/bcc/body. Real app launch, connection, sending and receipt NOT TESTED |
| External social destinations | PASS for approved hrefs; live reachability NOT TESTED this run | Only approved LinkedIn/Facebook destinations present. The web fetch could not retrieve either profile. Earlier live checks are historical, not substituted for a fresh pass. [Content/method limits](references/prelaunch/content-review.json) |
| Responsive layout | PASS for simulated sizes | 34 routes × 3 widths = 102 size/route cases, including light/dark aliases. No horizontal overflow or broken loaded image reported. Lazy images not loaded by a particular viewport are not claimed as individually viewed. Physical touch NOT TESTED |
| No-JavaScript content | PASS | All 102 comparisons retain matching main text, essential headings and equivalent main link targets. Saved-theme URL prefixes are normalised for equivalence; base and themed pages intentionally use different URLs. [Browser evidence](references/prelaunch/browser-checks.json) |
| Keyboard / visible focus | PASS for tested routes/settings | All 34 routes on desktop plus ten base main/policy/404 pages on phone and tablet: 54 walks, zero missing visible controls or focus failures. Skip link focuses main; traversal returns to skip. Closed disclosure descendants are excluded until opened; checkbox inside prototype diagnostics was tested separately |
| FAQ / mobile menu | PASS | All 14 service FAQs opened/closed with Enter. Mobile menu opened with Enter and closed with Escape. [Browser evidence](references/prelaunch/browser-checks.json) |
| Logo Loop controls/static alternative | PASS for tested keyboard controls and no-JS comparison | Enhanced prototype switched Play → Pause → Play by keyboard. Static mode and fallback content remain available without scripts. No physical touch test performed |
| Screen-reader speech | **NOT TESTED** | No actual reader/browser speech session was performed; no reader name is claimed. Browser: ChatGPT in-app browser. Available controls did not expose speech testing. DOM/keyboard/Lighthouse results do not replace NVDA/VoiceOver/Narrator speech evidence |
| Actual browser zoom | **NOT TESTED** | Five Ctrl+plus shortcuts followed by Ctrl+0 did not change measured 1280×720 dimensions. Actual 200% zoom was not established; viewport reflow is not substituted for this check |
| Contrast | PASS for bounded palette/automated checks | Existing palette verifier: minimum normal text 5.43:1 light, 6.73:1 dark; action labels ≥4.5:1 and control boundaries ≥3:1. Color-contrast audit passed in all 25 fresh Lighthouse runs. This is not a complete manual audit of every hover/disabled/transparent state |
| Reduced motion | **NOT TESTED for actual OS preference** | Source/static fallbacks remain; prototype internal preview checkbox toggled reduced-preview true and was restored. Diagnostic reported actual prefersReducedMotion false. This simulation is not an OS preference switch or proof every effect responds correctly to it |
| Performance | PASS for measured target | 25 fresh runs, all performance >90; automated accessibility 100 throughout. Detailed results below. No field INP, production guarantee or controlled no-regression finding |
| Storage/network | PASS for observed local sample | Representative Home/Contact/Services/Clients/prototype loads: only kanjay-theme light/dark in localStorage; no visible cookies/sessionStorage/IndexedDB/Cache Storage/service workers. Observed resource origins local only. [Runtime inventory](references/prelaunch/storage-network.json). Not a fresh-profile, packet-capture or exhaustive post-scroll audit |
| Resource headers/assets | PASS locally | 42 requests covering observed resources plus robots/sitemap/icons/share image: HTTP 200, zero Set-Cookie; actual review headers recorded. [Headers/assets](references/prelaunch/assets-headers.json). HttpOnly/host-added production behaviour remains NOT TESTED |
| SEO/sharing metadata | PASS for local output | Reran Phase 10 verifier: page titles/descriptions, canonical mapping to approved www domain, review noindex, five-URL sitemap, approved Organization JSON, favicon/share assets, CSP hashes and local targets. Review robots intentionally blocks crawling; no production indexability or live social-card/rich-result validation claimed |
| Approved business facts and client assets | PASS against owner records | Home/About/Services/Clients/source guards rerun: approved identity/history/current geography, high-level services, contact routing, 23 current-client names and authorised asset hashes. No independently audited business investigation or legal permission clearance claimed |
| Claims/editorial release review | **FAIL / approval pending** | Three absolute-sounding Services goal phrases and the nearby catalogue boundary proposal remain unresolved, listed below. No invented testimonials, results, team, hours or case narratives were introduced |
| Policy release approval | **FAIL / approval pending** | All four policies remain clearly marked drafts; legal/business wording and effective dates unresolved. Privacy email clarification remains correctly applied. Formal legal suitability NOT TESTED |
| Dependency security | PASS for known-advisory scan | Fresh npm audit: zero known vulnerabilities. [Audit](references/prelaunch/npm-audit.json). This is not a penetration test or assurance that no vulnerabilities exist |
| Production integration | **NOT TESTED** | Host/CDN/email/DNS/TLS, real redirects, security/cache headers, logs/regions/retention, deployed storage/network, live schema/sharing, actual phone/mail handoff and delivery remain unverified |

The initial phone comparison used raw href equality, which incorrectly treated saved-theme prefixes as failures; equivalent destinations were compared and all widths rerun. The initial keyboard predicate counted a hidden prototype checkbox inside a closed disclosure; the predicate was corrected, affected walks repeated, and the checkbox explicitly exercised when open. Initial observations are retained in [initial phone](references/prelaunch/initial-phone-checks.json) and [initial keyboard](references/prelaunch/initial-keyboard-observations.json). These were test-method corrections, not application fixes.

## Fresh Lighthouse and JavaScript measurements

Lighthouse 13.6.0 / HeadlessChrome 156; sequential standard CLI audits of built files on the local header-enforced gzip/no-store server. Main-page mobile URLs use light theme; desktop uses dark. Configs, timestamps, raw compressed reports and hashes are retained with the [complete summary](references/prelaunch/performance-summary.json) and [measurement table](references/prelaunch/measurement-table.json).

| Preset and coverage | Performance | Automated accessibility | LCP range | External JS transfer |
| --- | --- | --- | --- | --- |
| Mobile 412×823; nine main/policy pages | 98–100 | 100 | 0.910–0.974s | 0 B each |
| Desktop 1350×940; nine main/policy pages | 100 | 100 | 0.250–0.271s | 0 B each |
| Tablet 768×1024; Home, Services, Clients | 100 | 100 | 0.931–1.007s | 0 B each |
| Enhanced prototype, mobile / desktop | 99 / 100 | 100 / 100 | 1.095s / 0.424s | 129,905 B each |
| Static prototype, mobile / desktop | 100 / 100 | 100 / 100 | 0.956s / 0.292s | 0 B each |

Mobile: simulated 150ms RTT / 1.638Mbps / 4× CPU. Tablet uses the same conservative mobile throttling with 768×1024 viewport and 1.5 device scale. Desktop: 40ms / 10.24Mbps / 1× CPU. Mobile device scale is 1.75, desktop 1. All configs are saved; these are not physical-device hardware measurements. Aliases/404 were covered by route/browser checks, not separately Lighthouse-audited at every alias. Tablet performance was measured on three representative pages, not extrapolated to all routes.

Raw inline executable script text: **661 B** on each main/policy page; Home has **424 B** additional non-executable JSON-LD. Enhanced prototype has **7,107 B** raw inline executable text; static prototype **1,513 B**. These inline values are inside compressed HTML, not separately measured network transfers. Resource Timing in the prototype diagnostic also records script transport/body sizes; those readings are a different context from the Lighthouse samples and not substituted for them.

All 25 runs passed the measured color-contrast audit; all automated accessibility scores were 100. No new binary failure appeared apart from **bf-cache**: the deliberate local Cache-Control:no-store main/script responses prevent back-forward caching. That diagnostic remains open for production caching verification; it is not marked fixed. No field INP result. Lazy-image transfers after arbitrary scrolling and complete warm-cache behaviours are not measured by these samples.

Measurements are single local samples; host background activity was not controlled. Build/type checks ran after sampling. Scores vary and are not production guarantees, WCAG certification, actual reader testing or a statistically controlled regression comparison.

## Open wording and release blockers

**Kanjay/business/legal decisions:**

- Review “Find people who fit your roles and business needs”, “Build a workplace where employees feel heard, valued and connected” and “Resolve catalogue issues with a clear understanding of the required corrections”. Approve/reject the less-absolute replacements and nearby catalogue non-guarantee note already proposed in [Phase 6](PHASE-6-PUBLIC-SCOPE.md). They were not silently applied during this test-only task.
- Approve final policy terms/disclaimer limitations, actual enquiry/candidate handling, retention/deletion/backups, privacy-request contact/procedure/rights, provider responsibilities and effective dates. See the specific questions in [Phase 9 clarification](PHASE-9-CLARIFICATION.md). No invented answers or automatic legal clearance.
- Supply legacy URL/download inventory and approve destinations; settle component revision/permalink/licence provenance and favicon/share presentation. SILQ/Golden Works classification is only needed if they are to be included; their existing publication permission is not reopened. Team/hours/Instagram remain intentional omissions.
- Detailed exclusions, client documents/access/approval and exact handover/responsibility terms are **OUT OF SCOPE** for public content, not missing supplied facts and not PASS requirements.

**Unperformed manual checks:**

- Use an actual screen reader and named browser: read page structure, current-page links, client captions, service action names, menus, FAQ state and policy contents. Record speech evidence separately from automation.
- Establish real 200% zoom/text resize and reflow; verify essential controls/content at that setting. Current shortcut attempt produced no measurable zoom.
- Switch an actual OS/browser reduced-motion preference and test normal pages and enhanced prototype, including Logo Loop default/static state and pause controls; do not substitute the preview checkbox.
- Check physical phone/tablet touch and representative additional browsers; authorise any later native app-handoff/delivery tests separately. No call/email was sent here.

**Chosen-production-host checks:**

- Verify DNS/TLS, www/HTTPS/index/legacy redirect status/path/query preservation/loops, actual security/cache headers, 404 behaviour, access restrictions and rollback/cutover readiness.
- Inventory actual deployed logs, storage/cookies (including HttpOnly), resource requests/third parties, processing regions/providers and retention. Verify caching/BFCache against real host settings. Local observations are not production evidence.
- Validate public canonical/sitemap/indexing decisions, structured data and social-card rendering only when the approved build is available at the intended domain. Keep review noindex/drafts until explicit launch approval.

## Handoff

The original local preview remains available at port 4337. Only the extra header-enforced test server is stopped after the audit. Temporary diagnostic HTML was removed from `dist/`; rebuilt output is byte-identical to tested pages. Synced source ZIP remains SHA-256 `c2601273dc9bfeca079c7f21e596d2fb7b7e06e9fbf8d0139b7e4135a1ae0606`.

The first final-check attempt was not executed because automatic approval review hit a usage limit. The user resumed the task; final checks subsequently executed and passed. That interrupted attempt is not counted as a test result. New report/evidence was screened for secrets and unnecessary personal/local-machine details before upload. No application changes, merge, deployment or release approval.
