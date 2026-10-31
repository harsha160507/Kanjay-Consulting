# Phase 10 — SEO and site readiness review

31 October 2026. Draft branch `phase-10-readiness`, based on Phase 9 clarification commit `3484a04`. No merge, deployment, indexing authorisation, DNS or email configuration change. This is a completed local implementation/review with remaining launch blockers, not release approval.

## Implemented

- Nine distinct main-page title/description pairs, without the old development title suffix; explicit descriptions/titles for the two internal prototype modes. Existing internal-review banners remain.
- Canonicals use the already owner-confirmed `https://www.kanjayconsulting.com`. Light/dark copies point to the corresponding base URL. No canonical is emitted for 404 or internal prototypes. This is configured URL intent, not proof the future domain serves this build.
- `/sitemap.xml` contains only Home, About, Services, Clients and Contact. Draft policies, theme duplicates, prototypes and 404 are excluded. No fabricated lastmod dates. It is a candidate business sitemap, not a search submission or indexability claim.
- Review indexing remains closed: HTML noindex/nofollow, robots Disallow, generated X-Robots-Tag. Review robots does not advertise the sitemap. The sitemap itself receives the review noindex header in the header-enforced server. Robots/noindex are not access control; hosting access restrictions must be chosen for any externally shared draft.
- Homepage Organization JSON-LD uses approved name, confirmed domain, public phone/email, approved social URLs and the supplied-logo derivative. The same organization appears on themed home copies. No ratings, reviews, awards, service outcomes, hours, team, invented dates or branch/location claims. JSON syntax, expected fields and local logo asset are checked; Google rich-result validation and search display are NOT TESTED.
- SVG/32px PNG favicon, 180px Apple icon, 512px PNG organization logo and 1200×630 PNG share card derived from the approved, unchanged logo artwork. Share card adds only business name and approved service labels. Open Graph/Twitter title, description, canonical URL and large-image metadata added. Asset dimensions and local responses checked; external social-platform rendering is NOT TESTED and visual acceptance remains owner review.
- Netlify-compatible `_redirects` proposal for HTTP/non-www → confirmed HTTPS www and known index.html equivalents. No blanket SPA 200 rewrite. No legacy routes guessed: supplied legacy field is blank, and the existing website could not be inventoried with the web tool. Rules are prepared, not verified on a production host; aliases/TLS/query preservation/loop behaviour need host testing.
- Build-generated security headers: hashed executable inline scripts, no script unsafe-inline/unsafe-eval, self-hosted resources, no objects/base/forms/framing, restrictive camera/microphone/geolocation policy, nosniff and referrer policy. Inline styles remain allowed for existing component styles. HSTS is not enabled without verified production TLS/subdomain readiness. `npm run build` regenerates `dist/_headers` hashes; manual post-build script edits require a rebuild/recheck.
- Separate local header-enforced server on 4340 for QA. The original 4337/4338 preview remains running; it does not apply generated header rules. This local server does not emulate production domain redirects. Host enforcement is still NOT TESTED.

Implementation references: [Astro site configuration](https://docs.astro.build/en/guides/configuring-astro/), [Google Organization markup](https://developers.google.com/search/docs/appearance/structured-data/organization), [Google robots directives](https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag), [Netlify redirect rules](https://docs.netlify.com/manage/routing/redirects/redirect-options/). These are implementation references, not claims of search inclusion or live-host behaviour.

## Failures fixed within scope

| Finding | Fix and rerun |
| --- | --- |
| Home direct-call label was “Let’s talk” | Changed to “Call our team”; native approved phone destination retained |
| About direct-email label was generic | Changed to “Email our team”; native approved email retained |
| Home combined current pan-India seller coverage with the 2018 start date | Kept facts separate: “GeM consulting since 2018. Current GeM seller support across India.” No historical geography inferred |
| Services accessible names omitted visible link text | Each of 14 service email names now starts with its actual visible label and adds the service name. No service scope/recipient/subject changed. Initial Lighthouse label-content-name-mismatch finding preserved; both affected audits repeated and warning absent |
| Five moderate dependency findings in the development audit chain | Scoped override to glob 14.0.3 under @sentry/bundler-plugins, bringing minimatch to 11.0.3. Kept Lighthouse 13.6.0 and application dependencies. Final npm audit reports zero known vulnerabilities; not a guarantee of security. [Audit](references/phase10/npm-audit.json), [glob advisory](https://github.com/advisories/GHSA-3g3m-2fjr-6pw4), [minimatch advisory](https://github.com/advisories/GHSA-g3hv-75wg-m249) |
| Stale current-facts/docs said explicit-choice-only storage and public commercial details missing | Working documentation now reflects actual themed-URL storage and Phase 6 OUT OF SCOPE commercial-detail decision; synced sources untouched |

## Acceptance and results

Local review criteria: metadata/canonical/schema fields must match approved facts; noindex must remain while drafts are unapproved; native links/essential text must work without scripts; tested layouts must not overflow; keyboard controls must be reachable/visibly focused; agreed palette must retain contrast; Lighthouse Performance target is **above 90** under the documented presets. No automated score substitutes for screen-reader speech or production verification.

| Area | Result and evidence |
| --- | --- |
| Build/type checks | PASS — final check 53 files, zero errors/warnings/hints; build 34 HTML routes plus sitemap |
| Metadata/indexing/structure | PASS locally — `node scripts/verify-phase10.mjs`, all 34 HTML outputs: titles/descriptions, canonical mapping, assets/share metadata, approved Organization JSON, script hashes, local targets and candidate sitemap. [Inventory](references/phase10/seo-security-checks.json) |
| Existing page/content guards | PASS — foundation, Home, About, Services, Clients, policy and isolated-prototype checks. Fourteen approved service scopes/routing/FAQs remain; 23 approved current-client identities/assets match records. All policy drafts, approved contact values and corrected privacy email sentence retained |
| Factual/editorial review | PASS for implemented facts with open approval items below — identity/history/geography/contact/values against Phase 1 and owner references; services against approved high-level source; clients against approval/provenance table; policy drafts remain expressly unapproved. No testimonials/results/team/hours invented. The three Services proposals and nearby catalogue boundary are intentionally not applied without requested review |
| Responsiveness / no-JS | PASS for tested browser layouts — nine pages × light/dark × 320/768/1440px = 54 comparisons; no horizontal overflow, identical main text against script-blocked port 4338, no broken loaded images. 404 also checked at 320/1440px. [Browser evidence](references/phase10/browser-checks.json), [404/final labels](references/phase10/final-focused-checks.json) |
| Keyboard and focus | PASS — 18 full main/footer walks, nine pages at 320px light and 1440px dark; skip focuses main, expected links/controls reached with visible outlines. All 14 FAQs open/close with Enter; mobile menu opens with Enter and closes with Escape. The saved theme redirected an ordinary About visit correctly under enforced CSP |
| Colour contrast | PASS for existing verified palette pairs — light text minimum 5.43:1, dark 6.73:1; action labels at least 4.5:1 and control boundaries at least 3:1. Automated audits supplement, not replace, the limits of this palette check |
| Image alternatives | PASS for inspected source/automated checks — named brand/Home logo alternatives; Clients empty image alt intentionally paired with visible figcaption, no duplicate fabricated announcement. Not an actual screen-reader confirmation |
| Local security | PASS for bounded checks — final npm audit zero known advisories; review CSP hashes cover all executable inline scripts; actual response headers present on 4340; tested traversal rejected 403 without exposing package.json; no source secrets/form/database/email API introduced. Source/network inspection is not a penetration test. [HTTP/assets](references/phase10/http-assets.json), [final HTTP](references/phase10/final-http-security.json) |
| Runtime console | PASS in focused header-enforced FAQ/menu/theme session — no new error/warning logs captured. Broader script-blocked-preview CSP messages are expected and were not counted as application failures |
| 404 | PASS locally — missing path returns HTTP 404, keeps requested URL with saved theme, no canonical, valid Home/Services/Contact recovery. Home recovery was repeated with explicit navigation/heading waits after an early observation sampled the old document during theme navigation; no application change was needed |
| License/provenance | NOT fully cleared — existing licence notices retained, no fetched replacement effects. Earlier exact React Bits revision/Uiverse permalink provenance gaps remain for owner review; this phase does not certify legal reuse |
| Manual accessibility | NOT TESTED — actual screen-reader speech (no reader/browser speech combination used), physical touch, real browser text zoom/reflow at 200%, OS reduced-motion switching, multi-browser release testing. No new motion added, existing reduced-motion CSS retained. These remain release checks rather than inferred passes |
| Production/third parties | NOT TESTED — DNS/TLS, deployed redirects/headers/logging/storage/network/caching, external sharing cards, Google rich-result/search tests, actual calling/email app launch or message delivery. No publication performed |

Fresh storage inspection was not repeated in this phase. Phase 9 local storage/request evidence remains historical; source review finds no new storage API or optional tracking integration, and theme behaviour was exercised under CSP. It does not prove production storage behaviour.

## Measured performance

Lighthouse 13.6.0 / HeadlessChrome 156, local built files, gzip/no-store, sequential final runs after type/build checks and closing owned review tabs. Presets copied from Phase 7: mobile 412×823, 150ms RTT / 1.638Mbps / 4× CPU; desktop 1350×940, 40ms / 10.24Mbps / 1× CPU. Mobile pages use light URLs; desktop pages use dark URLs. Full settings and emulated user agent are recorded in [summary/configs](references/phase10/performance-summary.json). Only performance/accessibility categories were measured; no automated SEO/security score is claimed.

| Page | Mobile LCP | Desktop LCP | Performance / automated accessibility |
| --- | ---: | ---: | --- |
| Home | 0.918s | 0.255s | 100 / 100 on both |
| About | 0.914s | 0.252s | 100 / 100 on both |
| Services (after label fix) | 1.035s | 0.253s | 100 / 100 on both |
| Clients | 0.942s | 0.274s | 100 / 100 on both |
| Contact | 0.913s | 0.252s | 100 / 100 on both |
| Terms of Use | 0.911s | NOT TESTED | 100 / 100 mobile |
| Privacy Policy | 0.910s | NOT TESTED | 100 / 100 mobile |
| Cookie Policy | 0.915s | NOT TESTED | 100 / 100 mobile |
| Disclaimer | 0.910s | NOT TESTED | 100 / 100 mobile |

Every measured page transferred **0 B external JavaScript**. Each has **661 raw bytes of executable inline script** inside its HTML; Home additionally has **424 raw bytes of non-executable JSON-LD**. These raw inline bytes are not independent network-transfer measurements. Maximum measured CLS was 0.037; TBT was at most 90ms. TBT is not a field INP result. Lazy images are not a total post-scroll transfer benchmark.

All final binary diagnostics except `bf-cache` pass. Its reasons explicitly identify the local server's deliberate no-store response policy, including a no-store script resource; it is not silently counted as fixed. Real production cache headers/back-forward behaviour must be checked on the chosen host. No-store remains intentional for local reviews.

An initial all-category headless attempt ended with Connection closed; a successful exploratory retry preceded the final sequence using explicit headless settings and the prior two audit categories. Initial Services reports and [initial summary](references/phase10/initial-performance-summary.json) preserve the label warning. Only the three Services HTML outputs changed during that fix; [hash comparison](references/phase10/label-fix-output-diff.json) proves all other measured page HTML byte-identical. Services was rerun on both presets; final summary contains those replacement results. Compressed raw reports, settings and hashes are saved per run. These are single local samples, not production guarantees, field data, a statistically controlled regression comparison or WCAG conformance.

## Remaining launch blockers

1. **Business/legal approval:** resolve the specific Kanjay questions in [Phase 9 clarification](PHASE-9-CLARIFICATION.md): final terms/disclaimer limitations and statutory qualifications, actual enquiry/candidate handling and retention/deletion/backups, privacy-request responsibilities/procedures, provider decisions, storage notices and real effective dates. All four policies remain drafts.
2. **Services editorial decisions:** approve/reject the three less-absolute phrases and nearby catalogue limitation in [Phase 6 proposals](PHASE-6-PUBLIC-SCOPE.md). Exact private exclusions/documents/access/approval/handover terms remain OUT OF SCOPE, not missing public facts. No guarantees or new commercial terms invented.
3. **Migration inventory:** supply existing URL/download inventory and confirm intended destinations/retired routes. Confirm known-host/index redirect proposal, then verify actual 301 paths, query retention, HTTPS/www aliases and loops on the selected host. No broad unknown-path redirects or invented legacy aliases.
4. **Production operations:** choose/configure host/CDN/email setup and account roles; verify live TLS, logs/regions/retention/providers, cookie/storage/network inventory, security/cache headers, 404 status, DNS/email continuity and authorised backup/rollback/cutover. Review local BFCache limitation against actual production caching. No credentials needed in public source or chat.
5. **Manual release checks:** screen-reader speech with named reader/browser, physical phone touch, browser zoom/text reflow, OS reduced motion, representative browsers and authorised app-handoff/delivery checks. Automated 100 scores are insufficient for this approval.
6. **Provenance and presentation:** resolve earlier component source/permalink/licence review; approve favicon/share treatment and any improved small client-logo originals if desired. SILQ/Golden Works stay omitted until relationship classification is supplied; new permission is not being requested. Team/hours/Instagram remain deliberate omissions.
7. **Launch/indexing authorisation:** after content/policies/hosting are approved, review the final build, replace internal notes, decide treatment of internal prototypes/theme variants, verify public structured data/share cards, update indexing directives and final sitemap, then explicitly authorise publication/search submission. This phase intentionally does none of those release actions.

Sources remain untouched. The synced source ZIP SHA-256 remains `c2601273dc9bfeca079c7f21e596d2fb7b7e06e9fbf8d0139b7e4135a1ae0606`. New evidence/source scanned for secrets and unnecessary local/personal details before upload. Relevant loopback URLs retained. The original local preview remains running; the extra 4340 QA server can be stopped after this review without affecting it.
