# About Us — factual and accessibility audit

31 October 2026. Tested application commit `7ce853e0fa24ad534851b156411f9b5ab7dd8e14` in draft PR #5. Test-only follow-up: no application changes, merge or deployment.

## Criteria and evidence

Business assertions must map to owner-approved source material without adding figures, qualifications, historical coverage, promises or process stages. Image use must have owner authorization and appropriate descriptions. Page structure needs one H1 and no skipped heading levels; interactive elements need logical keyboard access/visible focus. Content must remain readable without page scripts and without horizontal overflow at 320/768/1440px in both themes. Actual reduced-motion preference testing must be distinguished from static/no-animation and stylesheet checks.

[Browser evidence](references/phase5-audit/observations.json) contains the rendered paragraph/list inventory, all headings, metadata, image paths/alternatives, complete Tab walks, service destinations, and script-enabled/blocked text. [Source index](references/phase5-audit/source-index.json) records hashes for the six owner archive documents and the exact brand asset. The source documents were read without modifying them. Owner approval is evidence of approved copy, not independent verification of business operations.

Source keys refer to the updated owner archive's `content/` files:

- **S1:** `company-information.md` — exact public/legal name, short introduction, establishment year, approved values, explicit GeM-since-2018 confirmation.
- **S2:** `existing-website.md` — owner identifies the retained About/values copy as still correct.
- **S3:** `services.md` — current approved HR and GeM seller service headings/paragraphs.
- **S4:** `service-confirmations.md` — all listed services currently offered; recruitment for both employers/candidates; GeM for sellers.
- **S5:** `Phase-1.md` — HR globally; GeM pan-India; seller-only clarification; candidate email.
- **S6:** `contact-details.md` — exact phone, public email and social profiles.
- **R1:** reconciled [Phase 1 register](PHASE-1.md) and prior owner chat decisions — brand treatment authorization, deliberate team omission and deferred policies/ownership.

## Statement-by-statement factual support

| Rendered assertion | Source / matching scope | Result |
| --- | --- | --- |
| About Kanjay Consulting; brand identity | S1 exact public/legal name | PASS |
| HR and GeM portal consulting for small and medium organisations | S1 short introduction; S3 current services | PASS |
| Works with businesses on people, HR processes and GeM seller requirements | S3 HR/GeM activities; S4/S5 seller clarification | PASS, faithful summary |
| HR support available globally; HR / Global support; footer HR support worldwide | S5 explicit HR globally | PASS |
| GeM consulting supports sellers across India; GeM / Sellers across India; footer same market | S5 explicit pan-India and seller-only clarification | PASS, current geography |
| 2014 — Kanjay Consulting established | S1 establishment year | PASS, not a claim of legal incorporation or individual staff experience |
| 2018 — GeM consulting began | S1 explicit confirmation of GeM consulting since 2018 | PASS |
| HR support for employers; recruitment also available to candidates | S3 recruitment; S4 both; S5 candidate process | PASS |
| HR audit, process setup, policies and documentation | S3 HR Audit & HR Process Setup; HR Policies & Documentation | PASS |
| Recruitment, payroll and applicable statutory compliance support | S3 Recruitment & Talent Acquisition; Payroll & Statutory Compliance | PASS, no specific jurisdiction or guaranteed outcome added |
| Performance management, engagement, onboarding and exit support | S3 PMS / KRA-KPI; Employee Engagement & Retention; Onboarding, Exit & Full & Final Settlement | PASS |
| Guidance on seller activities within Government e-Marketplace | S3 GeM service descriptions; S5 seller-only scope; blueprint's GeM context | PASS, no affiliation/endorsement claim |
| Seller registration, profile setup and catalogue support | S3 Seller Registration & Profile Setup; Product / Service Catalogue Upload; Catalogue Approval / Rejection Support | PASS |
| Bid reviews, tender participation and documentation support | S3 Bid Search & Analysis; Tender Participation & Support | PASS |
| OEM authorization, vendor assessment, order and contract support | S3 OEM Authorization & Vendor Assessment; Order & Contract Support | PASS |
| Candidate enquiries to hr@kanjayconsulting.com | S5 exact candidate email | PASS |
| Mutually agreed approach to needs; approaches agreed around business needs | S1/S2 explicitly say mutually agreed approaches to SME needs | PASS, not a verified sequence of engagement stages |
| HR process/record review, recruitment coordination, payroll inputs and documentation | S3 audit, recruitment, payroll and policy paragraphs | PASS |
| GeM document coordination, bid requirement review, portal submissions and follow-ups | S3 registration, bids/tenders, OEM, catalogue and order paragraphs | PASS |
| These are practical activities behind the consulting services | S3 supports the preceding activity list | PASS, editorial summary, not an extra deliverable |
| Trust, Quality, Support are core values | S1 explicit approval; S2 value descriptions | PASS |
| Trust as foundation of effective communication and client relationships | S2 Trust paragraph | PASS, paraphrase, not a confidentiality guarantee |
| Commitment to quality in the work | S2 Quality paragraph | PASS, principle, not a measured result |
| Focus on back-office support and long-term client relationships | S2 Support paragraph | PASS, paraphrase |
| Phone +91 89397 15152 and info@kanjayconsulting.com (main/footer links) | S6 exact values | PASS |
| Social profile destinations in footer | S6, normalized to approved profile paths in R1 | PASS |
| Metadata: Kanjay Consulting established in 2014; HR support globally | S1/S5 | PASS |
| Metadata: **“GeM seller consulting across India since 2018”** | S1 confirms the start year; S5 confirms current India-wide seller scope. Neither establishes that India-wide coverage existed throughout the period starting in 2018 | **FAIL — source precision / needs clarification** |

All factual paragraphs/list items in the rendered inventory are covered above. Section labels and invitations such as “Our company”, “Our areas of work”, “Our beginnings”, “For your organisation and its people”, “For businesses selling through GeM”, “Talk about your business”, “Explore HR support”, “Let’s discuss what your business needs”, and “Call us / Email us” are navigational/editorial copy, not extra credential or outcome claims. “Speak with us about HR support or GeM seller consulting” restates S3/S5 scope. Header/footer navigation, draft labels and generated current-year copyright text are interface/development context, not establishment dates; legal ownership remains deferred under the owner's prior instruction. The generic footer “Talk to our team” adds no team identity/count/qualification; S1 describes a group of HR/GeM professionals, while named team details remain deliberately omitted.

### Flag requiring clarification

In `src/pages/[page].astro`, the About description reads: **“Learn about Kanjay Consulting, established in 2014: HR support globally and GeM seller consulting across India since 2018.”** The last phrase can imply historical national coverage not explicitly approved. This is a wording/source-precision failure, not proof that the business assertion is false. It appears in metadata rather than the visible main-page history.

Recommended separation: “Kanjay Consulting was established in 2014, with GeM consulting since 2018. HR support globally; GeM seller support across India.” No application edit was made during this test. No other unsupported business assertion was found in the rendered copy. Final editorial approval of the new page remains distinct from approval of its underlying facts.

## Image permissions

PASS for owner-authorized use: the only image is the supplied `kanjay-logo-light-transparent.svg`, shown twice in the shared header/footer with `alt="Kanjay Consulting"`. Both instances loaded. R1 records authorization of the supplied SVG branding and white-backed treatment; the original artwork/colours were retained. There are no team photos, stock/generated people, client logos, new icons requiring separate image permission or fabricated visual credentials on About.

This confirms the owner's supplied-asset authorization record. It is not independent verification of artwork ownership or a legal chain-of-title opinion; those matters were deferred by the owner. No missing permission for a newly introduced About image was found because none was introduced.

## Accessibility and responsive results

| Check | Result | Observed evidence |
| --- | --- | --- |
| Heading structure | PASS | One H1. Main sequence 1→2→2→3→3→2→2→3→3→3→2; footer continues H2. Native definition list associates 2014/2018 with their meanings |
| Responsive layout | PASS | 320/768/1440px, both themes, no horizontal overflow; full text and history remain present |
| Keyboard / visible focus | PASS | Complete Tab walks: 25/25/28 stops after the skip link, no missing visible focus; no trap observed. Contact links remain reachable |
| Skip link | PASS | Enter focuses actual `MAIN#main` at each width |
| Mobile menu | PASS | At 320/768px, Space opens, Tab reaches About with visible focus; Escape closes and restores focus to SUMMARY with scripts enabled |
| Service paths without scripts | PASS | Both HR and GeM links activated with Enter at all three widths and reached matching Services group headings |
| Readable content without scripts | PASS | All six theme/width combinations retain identical 2,128-character main text compared with scripts enabled, zero hidden essential headings/paragraphs/list items/links, no overflow |
| Static motion treatment | PASS | No CSS keyframe animation assigned to About descendants in either theme; no React islands or entrance/loop effects |
| Reduced-motion stylesheet guard | PASS, source inspection only | Global `prefers-reduced-motion: reduce` rule disables transitions/animations; this is not a runtime media-preference test |
| Actual reduced-motion preference enabled | NOT TESTED | All browser readings were false. Available browser capabilities expose viewport/visibility only, no media override; system setting was not changed |

Page scripts were blocked by local CSP on port 4338, not globally disabled through browser settings. The test observer does not supply page functionality. `node scripts/verify-about.mjs` passed all three About variants, including link targets and heading/current-page checks.

Actual screen-reader speech, physical touch, native phone/mail-handler launch and delivery, cross-browser coverage and preference-enabled motion behaviour remain NOT TESTED. DOM headings, image alternatives and keyboard results are not substitutes for an actual reader session. No automated accessibility score was used to stand in for these checks. No new performance measurement was requested or made.

## Remaining decisions

1. Clarify/split the metadata's historical-geography wording before considering the copy fully source-precise.
2. Supply actual engagement stages, handoffs, responsibilities and permitted timeline statements only if a detailed process section is wanted. The current approved needs-based approach is supported.
3. Keep unverified credentials, figures, photos, testimonials, outcome claims and extra historical milestones omitted. Team remains intentionally omitted under the existing instruction, not a repeated request for biographies.
4. Complete actual reduced-motion and manual reader/device checks before release acceptance. Nothing here automatically approves release.

Only this report and evidence/source hashes changed. The original synced archive remains SHA-256 `c2601273dc9bfeca079c7f21e596d2fb7b7e06e9fbf8d0139b7e4135a1ae0606`. Evidence was checked for secret patterns and personal/local filesystem paths before upload; relevant loopback test URLs remain.
