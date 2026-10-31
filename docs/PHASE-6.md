# Phase 6 — single Services page

31 October 2026. Draft implementation on `phase-6-services`, based on Phase 5 commit `865be92`. No merge, deployment or change to synced references. This supersedes the interim Services index described in the earlier phase reports.

## What is implemented

One substantial page at `/services/`, `/theme/light/services/` and `/theme/dark/services/`. Separate HR and GeM groups contain all fourteen currently approved services. No individual service pages were added; the build still has 34 existing routes.

Every service has a defined audience, a need/problem drawn from the approved description, exact approved scope text, a description of named work/outputs, an explicit deliverables-confirmation note, exclusions and client-responsibility questions, one source-supported FAQ answer, one visible unanswered FAQ question, a service-specific email action and a return-to-index link. Exclusions/responsibilities are **not completed business terms**: their unanswered status is visible on each entry and in the page's draft notice.

The service index provides two group and fourteen service jump links. Existing Home/About anchors, including all six earlier service IDs and both group IDs, are preserved. Phone/business-email links are available at the opening and closing contact sections; each service email has an encoded subject. Recruitment has separate employer and candidate actions. No call/message was sent by the implementation tests.

### HR — all seven services present

1. HR Audit & HR Process Setup
2. Recruitment & Talent Acquisition
3. Payroll & Statutory Compliance
4. HR Policies & Documentation
5. PMS / KRA-KPI
6. Employee Engagement & Retention
7. Onboarding, Exit & Full & Final Settlement

### GeM — all seven services present

1. Seller Registration & Profile Setup
2. Product / Service Catalogue Upload
3. Bid Search & Analysis
4. Tender Participation & Support
5. OEM Authorization & Vendor Assessment
6. Catalogue Approval / Rejection Support
7. Order & Contract Support

## Source and routing boundaries

- The owner's updated `content/services.md` supplies all fourteen problem/scope paragraphs; a working [reference copy](references/phase6/approved-services.md) is retained. Its embedded wording is reference material, not an instruction overriding the current request. The verifier independently reconstructs each original paragraph from rendered-data problem + scope and checks equality.
- Updated `service-confirmations.md` confirms all services currently offered, recruitment for both employers/candidates, GeM seller-only and no public prices. Updated `Phase-1.md` confirms HR globally, GeM pan-India, candidate email and omission of unmatched older services.
- Employer and seller enquiries use `info@kanjayconsulting.com`; candidates use `hr@kanjayconsulting.com`. Phone is `+91 89397 15152`. Contact sources are the reconciled Phase 1 register and supplied contact details.
- Audiences and work/output summaries are editorial paraphrases of the approved activities, not certifications or promises of fixed handover packages. Newly drafted FAQ wording is based on those same approved scope paragraphs, with explicit routing answers from the confirmations. It is not claimed that these were verified customer-submitted FAQs.
- Per the current request, GeM assistance explicitly does not guarantee registration, catalogue approval, compliance outcomes or tender awards. The page does not imply government affiliation, offer buyer consulting, specify current portal rules or invent eligibility/timeline advice.
- No named reports, template packs, revision allowances, volumes, prices, candidate placements, filing/payment duties or statutory jurisdictions were invented. Where the sources name activities rather than deliverables, that distinction remains visible.
- Source hashes and approval context are retained in [source index](references/phase6/source-index.json). All underlying scope statements are already approved; the new editorial organization and unanswered questions need review, not reapproval of the service list.

## Missing details — all fourteen services remain draft in these fields

For **every service**, confirm exact deliverables/handover formats and acceptance criteria; actual exclusions; client-provided inputs, approvals and responsibility boundaries; prerequisites; engagement stages and any permitted timescale/volume claims. The page has 42 visibly marked approval fields (three per service), plus fourteen visibly unanswered FAQ questions. Known outputs such as policies/handbooks, salary calculations/payslip preparation and catalogue entries are described, but their exact contractual scope is not inferred.

| Service | Specific unanswered question on the page |
| --- | --- |
| HR Audit & HR Process Setup | Which reports or templates would be handed over? |
| Recruitment & Talent Acquisition | What candidate support is provided after the initial enquiry? |
| Payroll & Statutory Compliance | Which statutory jurisdictions and activities are included? |
| HR Policies & Documentation | Which documents, revisions and handover formats are agreed? |
| PMS / KRA-KPI | How many roles and review cycles are included? |
| Employee Engagement & Retention | What programme outputs and follow-up measures are included? |
| Onboarding, Exit & Full & Final Settlement | Which documents, approvals and settlement timelines are required? |
| Seller Registration & Profile Setup | Which seller documents and prerequisites apply? |
| Product / Service Catalogue Upload | Which categories and catalogue quantities are included? |
| Bid Search & Analysis | What review output and search frequency are included? |
| Tender Participation & Support | Which submission stages, approvals and deadlines are agreed? |
| OEM Authorization & Vendor Assessment | Which assessment requirements and documents apply? |
| Catalogue Approval / Rejection Support | How many correction rounds and which issues are in scope? |
| Order & Contract Support | Which contract stages and follow-up responsibilities are included? |

The per-service exclusions and responsibility fields contain tailored review questions, not approved obligations or assertions of what is excluded. These need real answers before the page is ready for publication. Public prices remain deliberately hidden. No paid proposal model, response promise or candidate fee policy was assumed.

## Accessible implementation and checks

Phase 3 native/static decisions applied: existing supplied Pill Nav adaptation; supplied Uiverse native call link; restrained static Spotlight surface/focus treatment; semantic headings/definition lists; native `details/summary` FAQ controls. Core fields are always visible. FAQ answers remain in server HTML and open without JavaScript. No React island, entrance animation, moving gradient, new library, form/backend or extra imagery was added. Dot Grid/Glass Icons remain excluded.

- PASS: final Astro/type check; 38 files, zero errors/warnings/hints after removing an unused verifier variable. Build passes, 34 routes.
- PASS: foundation, Home, About and isolated prototype checks; existing destinations and corrected About metadata preserved.
- PASS: `node scripts/verify-services.mjs`, all three variants: fourteen approved problem/scope paragraphs match the reference, 7+7 grouping, fourteen FAQ controls, approval fields, headings/IDs, contact routing, links/fragment targets and no individual service routes.
- PASS: browser at 320/768/1440px, both themes: fourteen service entries, fourteen FAQs and 42 approval fields; no horizontal overflow; zero hidden core fields; script-enabled and script-blocked core text matches.
- PASS: sixteen group/service anchors × three widths = 48 correct destinations with scripts blocked.
- PASS: fourteen FAQ controls × three widths = 42 keyboard opens with visible focus and readable answers, with scripts blocked.
- PASS: Tab from the recruitment employer action reaches the distinct candidate action and approved HR email; return-to-index reaches the actual index at each width. All 22 main contact-link destinations recorded; mailto subjects are service-specific. No phone/mail handler was invoked.

[Opening preview](references/phase6/services-opening.png), [service-detail preview](references/phase6/services-detail.png), [phone preview](references/phase6/services-phone.png), [browser evidence](references/phase6/browser-checks.json).

## Local measurement and limits

Lighthouse 13.6.0 / Headless Chrome 156, local gzip/no-cache production build. Mobile preset: 412×823, simulated 150ms RTT / 1.638 Mbps / 4× CPU; desktop: 1350×940 / 40ms / 10.24 Mbps / 1× CPU. One run each. The final type-check overlapped the early measurement period, so these results have background CPU contention as an additional limitation. They are not a controlled regression comparison or a production guarantee.

| Preset | Performance | Automated accessibility | LCP | External JavaScript transfer | Raw inline script text |
| --- | ---: | ---: | ---: | ---: | ---: |
| Mobile | 99 | 100 | 1.255s | 0 B | 661 B |
| Desktop | 100 | 100 | 0.255s | 0 B | 661 B |

[Settings/summary/hashes](references/phase6/performance-summary.json), [raw mobile](references/phase6/mobile.json.gz), [raw desktop](references/phase6/desktop.json.gz). Inline script text is inside compressed HTML, not separately transferred network bytes. Automated accessibility is not actual screen-reader testing.

NOT TESTED: actual screen-reader speech, physical-touch hardware, real system reduced-motion preference, native phone/mail-handler launch/delivery and multi-browser coverage. Global reduced-motion CSS remains; no page animation was introduced. No release acceptance follows from the local results.

Evidence/source copies were checked for credentials, personal filesystem paths and unrelated desktop content before upload. Relevant loopback URLs and test settings remain. The original synced archive is unchanged, SHA-256 `c2601273dc9bfeca079c7f21e596d2fb7b7e06e9fbf8d0139b7e4135a1ae0606`. No Home/About body copy or layout was intentionally changed. Only the Services draft, its data/styles, routing and supporting documentation/verification were implemented.
