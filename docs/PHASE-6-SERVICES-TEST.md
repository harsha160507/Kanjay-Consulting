# Services and Home-link audit — per-service results

31 October 2026. Tested application commit `11cc9028046b41ce3e7f1fc3f33e21d3010e98df`, draft PR #6. Documentation/evidence only; no application fixes, merge or deployment.

## Acceptance criteria and coverage

- Accuracy: service names, purpose/scope and FAQ answers must match approved service copy/confirmations, with editorial summaries adding no unsupported deliverable, duty or outcome promise.
- Exclusions completeness: actual approved boundaries must exist. A clearly labelled unanswered question is transparent draft handling, but does **not** pass completeness. The same distinction applies to client responsibilities and exact deliverable definitions.
- Home routing: existing direct links must reach matching service sections. For non-highlighted services, report direct-link absence as N/A and separately test the Home group route and Services index; do not pretend fourteen direct Home links exist.
- FAQ: keyboard Space opens, Enter closes, focus remains visible and the correct answer becomes readable without page scripts.
- Contact: service email recipient and decoded subject must be correct and keyboard-reachable; candidate routing must remain distinct. Actual external handler launch or delivery is separate.
- Layout: each service card must fit at 320/768/1440px, in both themes, without hidden core fields or horizontal overflow. This is browser viewport testing, not physical touch.
- Outcome claims: no explicit guaranteed hiring, registration, approval, compliance, retention, growth or tender result. Also review benefit wording in context and flag interpretation risks separately from unsupported factual claims.

Browser: ChatGPT in-app browser; local production build. The keyboard/link journeys below use port 4338 with CSP blocking all page scripts, a stricter fallback check than assuming native HTML will work. Port 4337 was used for normal light/dark layouts. No real call or email was initiated.

Evidence: [full observations](references/phase6-audit/observations.json), [per-service results/open details](references/phase6-audit/service-results.json). Scope reference: [approved source copy](references/phase6/approved-services.md) and [source hashes](references/phase6/source-index.json); routing confirmations remain in the owner-supplied `service-confirmations.md` and `Phase-1.md` plus the reconciled facts register. Owner-approved copy is not independent verification of operations.

## Per-service matrix

**D:** direct Home service link PASS. **G:** Home group route and subsequent Services-index link PASS; direct Home link N/A (not present). The six highlighted services were the Phase 4 selection. No missing direct link is reported as broken navigation.

“Outcomes PASS” means no explicit guarantee was found; † marks approved goal wording recommended for copy review. “Contact PASS” covers URI/subject and keyboard focus only.

| Service | Accuracy/source | Exclusions complete | FAQ keys | Contact | Mobile/layout | Home | Outcomes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| HR Audit & HR Process Setup | PASS | FAIL | PASS | PASS | PASS | D | PASS |
| Recruitment & Talent Acquisition | PASS | FAIL | PASS | PASS | PASS | D | PASS † |
| Payroll & Statutory Compliance | PASS | FAIL | PASS | PASS | PASS | D | PASS |
| HR Policies & Documentation | PASS | FAIL | PASS | PASS | PASS | G | PASS |
| PMS / KRA-KPI | PASS | FAIL | PASS | PASS | PASS | G | PASS |
| Employee Engagement & Retention | PASS | FAIL | PASS | PASS | PASS | G | PASS † |
| Onboarding, Exit & Full & Final Settlement | PASS | FAIL | PASS | PASS | PASS | G | PASS |
| Seller Registration & Profile Setup | PASS | FAIL | PASS | PASS | PASS | D | PASS |
| Product / Service Catalogue Upload | PASS | FAIL | PASS | PASS | PASS | G | PASS |
| Bid Search & Analysis | PASS | FAIL | PASS | PASS | PASS | D | PASS |
| Tender Participation & Support | PASS | FAIL | PASS | PASS | PASS | G | PASS |
| OEM Authorization & Vendor Assessment | PASS | FAIL | PASS | PASS | PASS | G | PASS |
| Catalogue Approval / Rejection Support | PASS | FAIL | PASS | PASS | PASS | G | PASS † |
| Order & Contract Support | PASS | FAIL | PASS | PASS | PASS | D | PASS |

**All fourteen also FAIL completeness of exact deliverables and client responsibilities.** They describe approved work/outputs but handover formats/acceptance criteria and client duties are still awaiting approval. Each has an additional unanswered FAQ visibly marked pending. FAQ operation passes; complete FAQ coverage does not. These are known input gaps, not evidence that the supplied scope is incorrect or that the draft invents contractual terms.

## Evidence by check

- Source consistency: reran `node scripts/verify-services.mjs` and `node scripts/verify-home.mjs`; all variants passed. All fourteen purpose + scope paragraphs exactly reconstruct the approved source paragraphs. Twelve displayed FAQ answers restate the approved scope; the recruitment and seller-registration answers use the explicit employer/candidate and seller-only confirmations. Audience/output summaries were reviewed against the same descriptions; no extra fixed handover package was presented as approved.
- Layout: each of fourteen cards checked in six width/theme combinations: 84 card observations, all fit, no card or page overflow, no hidden core field. Actual physical-device usability was not inferred from these measurements.
- FAQ controls: fourteen services × three widths = 42 complete Space-open/Enter-close journeys. Every opened answer matched its service and focus stayed visible. All were tested with page scripts blocked.
- Home journeys: fourteen services × three widths = 42 complete routes. Eighteen were direct (six services), twenty-four were group/index routes (eight services). Every final hash and heading matched the intended service. All back-to-index links were also exercised.
- Contacts: every service email recipient is `info@kanjayconsulting.com` with a decoded subject exactly matching the service name plus “enquiry”. Each was reached by Tab from that service's FAQ. All 22 main-page phone/email instances were inventoried. The recruitment candidate link separately reached `mailto:hr@kanjayconsulting.com` with visible focus; global phone remains `tel:+918939715152`.
- One immediate desktop observation for Order & Contract Support was inconclusive for contact/fragment completion. Its original record is retained. A standalone repeat of the Home-to-service, Tab-to-email and back-to-index journey with intervening state observations passed. No reproducible application failure was established; the report does not silently discard the first observation.
- The first long browser batch exceeded its execution window and lost its in-memory results. The tab was recovered and tests were rerun in smaller batches saved to disk; the report uses the saved completed observations, not unreturned partial results.

## Outcome-wording review

No explicit guarantee of hiring/placement, legal compliance, registration, catalogue acceptance, assessment approval, tender success, employee retention or business growth was found. The GeM group explicitly says assistance does not guarantee registration, catalogue approval, compliance outcomes or tender awards. Support verbs such as “assist”, “review” and “coordinate” are retained rather than asserting Kanjay controls decisions.

Three **source-approved goal phrases** deserve review for possible implied outcomes. They appear under “Need addressed”, which provides goal context; they are not unsupported new factual claims or proven guarantees:

| Service | Exact phrase | Risk / recommendation |
| --- | --- | --- |
| Recruitment | “Find people who fit your roles and business needs.” | Could read as a promised successful fit if isolated. Consider “Support your search for people who fit your roles and business needs.” Do not imply guaranteed placement or selection |
| Employee Engagement & Retention | “Build a workplace where employees feel heard, valued and connected.” | Describes a desired employee response that cannot be established by the service list alone. Consider framing this as supporting feedback/engagement efforts; no retention result or feeling is guaranteed |
| Catalogue Approval / Rejection Support | “Resolve catalogue issues with a clear understanding of the required corrections.” | “Resolve” can sound like a promised result. Consider “Review catalogue issues and support corrections and resubmission” |

The catalogue direct-anchor check positioned the article at about 32px from the viewport top while the group disclaimer was about 4,576px above it. Thus deep-link visitors can miss that disclaimer. Recommend making the assistance/outcome boundary available close to the relevant GeM service actions and softening the catalogue goal wording. This is a contextual copy recommendation, not a claim that the service currently explicitly guarantees approval. Approved service names containing “Approval”, “Recruitment” or “Retention” are not themselves treated as guarantees.

Other benefit wording was reviewed as source-supported purpose/assistance, not evidence of measurable success. No figures, fixed turnaround, response promise, filing duty, public price or formal report format was invented. The broad statutory service remains incomplete until jurisdictions and activities are confirmed.

## Blockers and limits

Before publishing, approve real exclusions, client responsibilities, exact deliverable boundaries and unanswered service-specific details for all fourteen entries. The [Phase 6 missing-detail register](PHASE-6.md#missing-details--all-fourteen-services-remain-draft-in-these-fields) and per-service JSON preserve the specific open questions. Review the three goal phrases and disclaimer proximity. Decide separately whether Home should gain direct links to all fourteen; the present six-highlight design has no broken link.

Actual phone/mail application launch/delivery, screen-reader speech, physical touch, real reduced-motion preference and cross-browser coverage are NOT TESTED. No new performance benchmark or automated accessibility score was used in this audit. No release approval follows from the passing technical checks.

No application, dependency or synced reference file changed. Only this report and reviewed evidence were uploaded. Evidence was screened for credentials and personal/local filesystem paths; relevant loopback URLs remain as test context. No merge or deployment occurred.
