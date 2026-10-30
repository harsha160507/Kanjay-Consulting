# Phase 4 — Home page

31 October 2026. Draft implementation on `phase-4-home`, based on `phase-3-prototype` at `9f62029`. No merge, deployment, DNS change or publication. Synced `sources/` files remain read-only and unchanged.

## Exactly what is available

- Home at `/`, `/theme/light/` and `/theme/dark/`: opening message, two HR/GeM paths, six selected approved service summaries, working approach, three values, history/client credibility and phone/email invitation.
- Services at `/services/` and its light/dark equivalents now contain an explicitly labelled **interim section index**, not the full Services page. Six service sections and two group sections are the real targets of the eight Home links. The names and paragraphs are shared data, so names/IDs stay consistent.
- Home's selected HR services: HR Audit & HR Process Setup; Recruitment & Talent Acquisition; Payroll & Statutory Compliance. Selected GeM services: Seller Registration & Profile Setup; Bid Search & Analysis; Order & Contract Support.
- Phone `+91 89397 15152`, business email `info@kanjayconsulting.com` and separate candidate email `hr@kanjayconsulting.com` are native links. No contact form, backend, analytics or new integration.
- Five explicitly approved logos: Eaton, Aaviza Technologies, Deforay, Zuppa and Woyc::OD. These reuse existing Phase 3 assets. The grid remains cream in both themes, with a dark backing for WOYC. This is a selection, not a representation that these are the only approved clients.
- About, Clients, Contact and policies remain existing drafts. The isolated Phase 3 prototype remains unchanged. No full inner pages were built.

## Content provenance and approval treatment

The owner's updated archive extracts reviewed in Phase 1/2, the reconciled [facts register](PHASE-1.md), and explicit chat decisions supply the facts. Supplied document instructions were treated as reference material; the owner's current request authorizes this implementation. The blueprint's earlier planning-only status does not override that request.

| Home material | Approved source | Treatment |
| --- | --- | --- |
| Kanjay Consulting; small/medium business audience; established 2014 | `company-information.md`, `existing-website.md` | Plain introduction and history; no embellished expertise/success claims |
| HR globally; GeM pan-India for sellers; candidates also supported | `Phase-1.md`, `service-confirmations.md` | Separate paths and candidate email; no buyer consulting or implied foreign offices |
| Six service summaries | Updated `services.md` | Supplied paragraphs/extracts; exact service headings; no new deliverables or guarantees |
| Working approach | `company-information.md` / `existing-website.md` plus approved service activities | Mutually agreed approaches to business needs, with concrete HR/GeM examples. No invented step sequence, turnaround, onboarding promise or engagement model |
| Trust, Quality, Support | `company-information.md`, `existing-website.md` | Short editorial paraphrases of approved principles; no confidentiality guarantee or new policy commitment |
| GeM consulting since 2018 | `company-information.md`, reconciled register | Date only; no government affiliation or award claim |
| Five current client approvals | `client-approvals.md` | Static named images only; no engagement narratives, testimonials or results inferred |
| Phone/email | `contact-details.md`, `Phase-1.md` | Exact approved contact destinations; no response-time promise |

The Home wording and composition are a new editorial draft using those approved facts. Owner review of the final presentation is still needed before publication; this does not mean previously approved dates, markets, contacts, values or logo permissions are missing again.

## Phase 3 decisions applied

- Retained existing native Pill Nav/header/mobile disclosure and theme links.
- Static semantic H1 and single teal emphasis; no BlurText, animated gradient or Magnet on Home.
- Supplied Uiverse link styling adapted to native anchors with token colours and visible focus. Visual review caught a CSS precedence issue in the primary button; corrected with scoped selectors.
- Native static service-card treatment derived from the supplied Spotlight surface/focus styling. No React island or subtree replacement is needed on Home. Service links have a measured minimum height of 64px.
- Static approved client grid; no looping copies, Play/Pause or autoplay on Home. Dot Grid and Glass Icons remain excluded. No new component dependency or upstream component replacement.
- Existing font, component and asset notices remain. No new licence/provenance claim is made beyond Phase 3's review.

## Checks and saved previews

- `npm run check`: PASS, 33 files; zero errors, warnings or hints.
- `npm run build`: PASS, 34 existing routes, now rendering Home in three variants.
- `npm run verify`: PASS, existing shared route/navigation/contact protections.
- `npm run verify:prototype`: PASS, six unchanged isolated variants.
- `node scripts/verify-home.mjs`: PASS across three Home variants. All local links and fragment IDs resolve, including six service IDs plus two group IDs. Unique IDs, approved facts/assets, no hydrated islands/forms/embeds, and noindex checked.
- In-app browser at 375/768/1440px in light/dark: PASS, no horizontal overflow, complete heading, six sections, five client images, minimum service-link height 64px, cream client surface in dark mode. Client images were separately checked loaded with nonzero natural dimensions after scrolling.
- Script-blocked server (CSP `script-src 'none'`) at all three widths: PASS for sampled HR and GeM keyboard journeys. Tab visibly focuses the HR path; Enter on Recruitment and Seller Registration reaches the matching Services heading with its approved text. Static verification covers all eight fragment targets. This is page-script blocking, not a claim that browser JavaScript was globally disabled through settings.
- No phone call or email was sent; the approved `tel:`/`mailto:` destinations were inspected.
- Actual screen-reader speech, physical touchscreen, multi-browser coverage and real system reduced-motion settings: NOT TESTED. No Home animation was introduced; existing CSS reduced-motion rules remain. Automated scores do not substitute for those checks.

[Desktop](references/phase4/home-desktop.png), [mobile](references/phase4/home-mobile.png), [opening view](references/phase4/home-hero.png), [browser observations](references/phase4/browser-checks.json), [loaded-logo evidence](references/phase4/client-image-checks.json).

Local Lighthouse 13.6.0 / Headless Chrome 156, same Phase 3 gzip/no-cache server. One fresh run each: mobile 412×823 / simulated 150ms RTT / 1.638 Mbps / 4× CPU; desktop 1350×940 / 40ms / 10.24 Mbps / 1× CPU. [Summary/settings/hashes](references/phase4/performance-summary.json), [raw mobile](references/phase4/mobile.json.gz), [raw desktop](references/phase4/desktop.json.gz).

| Preset | Performance | Automated accessibility | LCP | External JS transfer | Raw inline script text |
| --- | ---: | ---: | ---: | ---: | ---: |
| Mobile | 98 | 100 | 1.010s | 0 B | 661 B |
| Desktop | 100 | 100 | 0.255s | 0 B | 661 B |

Inline scripts travel within compressed HTML; they are not separately measured network bytes. This is a native Home page with no hydrated React islands, not a zero-script document. These new-page measurements are not a controlled before/after performance-regression test, field data, accessibility certification or production guarantee.

Reference archive SHA-256 remains `c2601273dc9bfeca079c7f21e596d2fb7b7e06e9fbf8d0139b7e4135a1ae0606`. No secrets, personal filesystem paths or unrelated desktop content were found in the uploaded evidence review; relevant loopback URLs and measurement settings are retained.

## Content still requiring approval or detail

1. Review the new Home wording, selected six services, visual hierarchy and five-logo selection as a finished draft. The underlying facts and logo permissions above are already approved.
2. If a numbered “how we work” process is desired, supply the actual steps, handoffs, responsibilities and permitted timeline statements. Until then the page uses only the supported needs-based approach and supplied activities.
3. Full service scope, exclusions, prerequisites, responsibilities, jurisdiction-specific statutory details, engagement terms and FAQs remain for the Services phase. The index does not imply those are settled.
4. Testimonials, case studies, certifications, awards and outcome figures need explicit material/approval if desired; none were included. SILQ/Golden Works engagement descriptions/status remain unconfirmed and were not used. No unidentified or unapproved logos were added.

Team, hours, response promises, Instagram and buyer-facing GeM services remain intentionally omitted. Policy/ownership work remains deferred as requested, and no policy facts were invented. This completes the Home implementation scope, not launch approval.
