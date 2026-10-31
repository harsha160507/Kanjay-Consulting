# Services — public scope revision and wording proposals

31 October 2026, Asia/Kolkata. Authority: the owner's latest feedback in this chat. Applies to all fourteen services in draft PR #6. This is a scope change, not delivery or approval of previously missing facts. No merge or deployment.

## Public scope applied

Public Services content is limited to approved high-level service identity, audience, purpose/activities, general service questions and enquiry routes. All seven HR and seven GeM services remain, with their existing IDs, group/index links, employer/candidate routing, service-specific email subjects and phone actions.

Removed from the website and active public service data:

- Detailed exclusions and questions about those exclusions.
- Client documents, access/authorisation, input/approval requirements and responsibility questions.
- Exact deliverable, handover, acceptance or responsibility terms and their pending placeholders.
- The fourteen unanswered commercial-detail FAQ prompts and the global notice asking for those details.

Approved high-level activity descriptions may still name documentation, payroll calculations, catalogues or similar service work. They do not list documents a client must provide, account-access requirements or contractual handovers. Fourteen approved-scope/routing general FAQ answers remain in native disclosure controls. No private commercial facts, policies or agreement terms were invented. No promise of a particular proposal process or terms was added to public copy.

Those details belong in private commercial discussions, proposals or agreements under Kanjay's new direction. They are no longer prerequisites for the public overview. This document does not assert that the details were settled privately, supplied, verified or approved.

The three flagged goal phrases remain exactly as before. No wording proposal or new catalogue-action limitation below has been applied. Existing GeM group-level outcome wording remains unchanged.

## Revised acceptance criteria

| Requirement | Current classification | Reason / verification meaning |
| --- | --- | --- |
| Approved name, audience, service identity and high-level work | IN SCOPE | Fourteen source-supported service overviews; no unsupported claims |
| General service/routing FAQs | IN SCOPE | Existing fourteen supported answers retained; native keyboard/no-script operation still required |
| Enquiry actions; employer/candidate distinction; seller-only GeM | IN SCOPE | Existing approved phone/email destinations and subjects retained |
| All navigation, Home/service anchors, headings, focus and responsive/no-script access | IN SCOPE | Existing requirements remain intact; no new service pages |
| Outcome accuracy and no guaranteed GeM outcomes | IN SCOPE | Existing boundary unchanged; three goal phrases and nearby placement remain for review |
| Detailed exclusions as public page content | **OUT OF SCOPE** | Owner moved this requirement to private commercial discussion; not PASS and not supplied |
| Client document/access/approval requirements and responsibility allocation as public content | **OUT OF SCOPE** | Same scope change; not PASS and not supplied |
| Exact deliverables, handover formats, acceptance and responsibility terms as public content | **OUT OF SCOPE** | Same scope change; not PASS and not supplied |
| FAQ answers disclosing those detailed commercial requirements | **OUT OF SCOPE** | Unanswered prompts removed from public view; no fabricated answers |

Verification that excluded material is absent can PASS as an implementation check. That does **not** mean an excluded business-content requirement passed. [Current per-service reclassification](references/phase6-public-scope/reclassification.json) explicitly records OUT OF SCOPE for each affected category on each service, with the original status and reason.

## Original findings preserved

The [original audit](PHASE-6-SERVICES-TEST.md), its FAIL/completeness matrix, [raw observations](references/phase6-audit/observations.json) and [original service results](references/phase6-audit/service-results.json) remain historical evidence. The audit and implementation reports only gain a dated pointer to this revision; their original findings are retained. Original raw JSON files are unchanged.

The prior findings were valid against the former publication criteria. They were reclassified because Kanjay changed what should be published, not because those facts became available. No original FAIL was silently overwritten as PASS. The revised scope supersedes the former requirement to obtain those details before publishing the high-level overview; it does not amend the reference blueprint/archive or erase its history.

## Wording proposals — NOT APPLIED

These are review proposals using only approved service activities. They add no success promise or commercial condition.

| Service | Current goal wording | Proposed replacement |
| --- | --- | --- |
| Recruitment & Talent Acquisition | “Find people who fit your roles and business needs.” | **“Support with candidate sourcing, screening and interview coordination.”** |
| Employee Engagement & Retention | “Build a workplace where employees feel heard, valued and connected.” | **“Support for employee feedback, recognition programmes and engagement activities.”** |
| Catalogue Approval / Rejection Support | “Resolve catalogue issues with a clear understanding of the required corrections.” | **“Review catalogue rejection remarks and assist with corrections and resubmission.”** |

Recruitment's proposal comes from the approved sourcing/screening/interview-coordination scope. Engagement's comes from the approved feedback/recognition/activity scope. Catalogue's comes from reviewing rejection remarks and assisting with updates/resubmission. These replace absolute-sounding desired outcomes with work Kanjay assists with; new editorial wording still needs owner review.

### Nearby catalogue-action boundary — proposal only

Recommendation: place a short outcome boundary near the catalogue enquiry action for clarity. In the revised layout, with that action focused at 320/1440px, the existing group notice ends approximately 4,388/2,664px above the viewport; a deep-link visitor can miss it. [Current browser evidence](references/phase6-public-scope/browser-checks.json).

Proposed note: **“We assist with catalogue updates and resubmission; catalogue approval is not guaranteed.”**

Basis: the catalogue's approved assistance scope plus the existing Phase 6 boundary that consulting assistance does not guarantee catalogue approval. This proposal introduces no new liability, refund, eligibility, timing, document, access, client-duty or agreement term; no approval authority or portal rule is inferred. The note and its placement await review and are **not applied**. The existing group-level boundary has not been expanded or replaced.

## Verification and remaining issues

- PASS: Astro/type checks, 38 files, zero errors/warnings/hints; build, 34 existing routes.
- PASS: revised Services verification in all three variants; all fourteen approved problem/scope paragraphs still match the source; private-detail fields/prompts absent from public data and rendered main content; fourteen general FAQs retained; all local targets resolve; no individual service pages added.
- PASS: Home, About, foundation and isolated prototype verification. Source IDs, public descriptions and approved enquiry routing remain intact. Source comparison confirms all fourteen public name/audience/problem/scope values are unchanged; the three proposals were not applied.
- PASS: browser at 320/768/1440px, both themes: fourteen services, zero private-detail UI blocks, no horizontal overflow, identical core text with page scripts blocked.
- PASS: forty-two keyboard FAQ opens with visible focus and readable answers on the script-blocked page. Existing contact action/candidate routing preserved; no call or email sent.
- Original technical findings not re-exercised here remain historical results, not newly measured passes. No new performance benchmark or performance-regression assertion was made.

**NOT TESTED:** actual screen-reader speech, physical touch, runtime reduced-motion preference, actual contact delivery and native phone/mail-handler launch. Other prior manual/cross-browser limits remain open. No automation score or removed content requirement is used to convert them to PASS.

Remaining review decisions are the three proposed goal replacements and the catalogue note/placement. General public copy still needs final presentation approval, and the manual checks above remain outstanding. Detailed commercial facts are outside the public-page acceptance gate and need not be invented or obtained to fill website gaps. No automatic release approval follows.

No unrelated content, styling, Home/About copy, dependencies or synced sources were changed. Prior evidence/source hashes and before/after checks are recorded in [baseline](references/phase6-public-scope/baseline.json) and [preservation verification](references/phase6-public-scope/preservation.json). Only public-scope removals, their verification and documentation are implemented.
