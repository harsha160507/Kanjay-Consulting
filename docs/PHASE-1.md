# Phase 1 foundation and evidence review

Review date: 29 October 2026. Status: foundation implemented, no deployment or domain changes. The owner's Phase 1 request authorises setup despite the older blueprint's planning-only status. It does not approve missing business facts or launch.

## Evidence and working copies

The supplied `sources/kanjay website.zip` remains untouched. SHA-256: `c2601273dc9bfeca079c7f21e596d2fb7b7e06e9fbf8d0139b7e4135a1ae0606`. Selected reference files were copied to the sibling `phase1-reference/` directory outside `sources/` and outside this public Git repository. The clone is `kanjay-working/`, tracking `harsha160507/Kanjay-Consulting`, initially at `e9acf980003cb1974fb4e5cda72d500eff96201e`.

Reviewed: revised blueprint 2 (19 October), all eight screenshots embedded in `web.docx`, Next.js app/layout/styles and starter instructions, all supplied component imports and reveal behaviour, nested `LOGOS.zip`, and the existing local cleaned-logo package/readme/manifest/build notes. The live existing homepage at https://kanjayconsulting.com was also read as a migration reference. Existing publication is evidence of prior use, not fresh permission or factual verification.

The DOCX contains screenshots rather than useful paragraph text. Raw screenshots include unrelated browser chrome and are retained locally rather than committed to the public repository. The archive has 40,786 entries including generated framework output and dependencies; selective extraction avoids carrying caches, `.git`, dependency folders or obsolete framework instructions into the application. No root package manifest or lockfile is supplied in the archive.

## Approved direction versus business facts

| Area | Available evidence / decision | Status for new public site |
| --- | --- | --- |
| Project / repository | Kanjay Consulting; owner-selected GitHub repo with write access | Approved project identity and source destination; legal identity still missing |
| Architecture | Astro, TypeScript, scoped CSS; React islands for selected effects | Blueprint direction; installed foundation |
| Contact model | Direct phone/email; no contact form, backend or database | Settled blueprint decision; old screenshot form must not return |
| Page scope | Home, About, Services, Clients, Contact, four separate policies, custom 404 | Settled structure; shells only |
| Look and use | Professional business presentation; mobile through desktop; restrained brand accents | Owner direction; final design still to review |
| Themes / components | Light/dark, React Bits TS + CSS plan; selected Uiverse elements | Retained for prototype phase; no blanket approval of each source snippet |
| Logo section | Local build notes record cream `#FAF8F3` in both themes, balanced artwork sizes, WOYC dark backing | Carry forward layout decision; no client publication approval implied |
| Public business name | Kanjay Consulting appears in references | Source-supported candidate; confirm exact public/legal entity, website owner and copyright identity |
| Audience | Reference mentions SMEs and public sector; live title mentions Chennai | Candidate only; confirm industries, sizes, geography and remote/onsite service |
| Values | Trust, Quality, Support in screenshots | Confirm current values and concrete supporting practices |
| History / credentials | No approved founding year, biographies, credentials, quantified results or case studies supplied | Missing; footer copyright year is not founding evidence |

## Service inventory requiring confirmation

There is no final approved service brief. HR and GeM are the proposed top-level paths. Confirm active offerings, employer versus candidate routing and HR/GeM priority before copywriting.

| Candidate service | Reference coverage | Decisions still required |
| --- | --- | --- |
| HR support | “End to end HR solutions” introduction | Umbrella description or distinct offering; avoid duplicate detail |
| Recruitment | Employer-oriented candidate sourcing | Employer-only/both; candidate contact route, role types and limits |
| Payroll | Processing, reports, attendance and PF/ESI references | Deliverables, data responsibilities, boundaries and pricing |
| Statutory compliance assistance | Wage, benefits, tax and PF/ESIC topics in old copy | Exact supported jurisdictions and tasks; qualified reviewer; no guarantee |
| HR audit | Policies, procedures, documentation and systems review | Audit outputs, prerequisites, exclusions and process |
| GeM assistance | Registration, OEM/vendor assessment, listings, tender information/participation, technical support and training | Seller/buyer scope, actual steps and responsibility split; explain old “L1 Creation” wording before reuse |
| Other registration / tender support | Old card lists MSME/UAM, trademark, IndiaMART and government websites | Which are current and within competence; current terminology; decide whether in scope |

For each approved service provide intended customer/problem, exact work, deliverables, exclusions, prerequisites, client responsibilities, actual process, any permitted timeline, pricing approach and FAQs. Do not carry forward guarantees of accuracy, security, continued success, approval or tender awards. Do not imply government endorsement.

## Contact evidence

Screenshot 8 records `info@kanjayconsulting.com`, `+91-8939715152 / 9962215152`, and `www.kanjayconsulting.com`. Candidate international targets would be `+918939715152` and `+919962215152`; the second international prefix is inferred and must be confirmed. The live homepage still displays the two numbers. No calls or email tests have been performed.

Confirm which number(s) to publish, monitored inbox, contact staff and absence coverage, hours/timezone, any response promise, privacy contact, and whether an address is public. No verified address is supplied. Screenshot social icons do not establish approved profile URLs: Instagram, LinkedIn and Facebook URLs remain missing; WhatsApp appears in the old screenshot but is not part of the initial phone/email decision. No contact links or social profiles have been populated in application data.

## Assets and client permissions

The original Kanjay mark is visible in the screenshots: coloured symbol and white wordmark. No standalone authoritative brand SVG, high-resolution original, favicon or social-sharing asset was supplied. Do not crop/redraw the screenshot as an approved master. Request the original logo, permitted variants, clear space and dark/light background treatment. Manrope headings and Source Sans 3 body are the blueprint's typography direction; fonts and their licences remain to be sourced locally in the design phase. The foundation currently uses system fonts.

The nested ZIP supplies 26 raster logo files. A local cleaned package supplies 26 corresponding lossless WebPs, PNGs and native-resolution copies plus a manifest and proof. See `references/client-assets.json`. Low-resolution concerns are recorded for Balmer, Kaavian, Golden Works and Hadron; ask for better originals. The screenshot-named black/gold mark has no verified business identity. Other logos visible only in the old site's screenshots are not automatically part of the new approved set.

**No client has verified publication permission in the supplied evidence.** For every chosen client provide exact display name, current/past relationship, service/engagement context, authority to use its mark, approval evidence/date and any restrictions. If unavailable, supply approved anonymised summaries. Client images remain outside `public/` and no testimonials or figures were invented.

## Component compatibility and licensing

See `references/components.json` for supplied folders and imports. JSX is stored in `.ts` and `.txt` files; source CSS names sometimes contain selector syntax and do not match component imports. Adapt file names to `.tsx` and expected CSS paths when implementing each component. The snippets are references, not a drop-in library.

Fade Content and Animated Content return `visibility: hidden` before hydration, violating the blueprint's no-JavaScript content rule as supplied. Reveal wrappers must render visible content on the server and opt into effects only after successful enhancement. Review Pill Nav static anchors/focus/mobile behaviour, Stepper semantics, Logo Loop pause controls, animated-text reading order, reduced motion, and hover/focus equivalence. Do not use `client:only` for essential text.

Supplied dependencies include GSAP/ScrollTrigger, Motion, and Hugeicons React/free icons. The core shell does not install these yet; confirm exact component source/version, licence, attribution and runtime cost individually before integration. Uiverse CSS alone does not establish markup, original author or licence. Missing blueprint component sources include Dot Grid, Glare Hover, Tilted Card, Carousel and Glass Icons. These remain planned, conditional on content and prototype checks, not silently removed.

Keep the blueprint's trim order: Glass Icons, Shiny Text, Gradient Text, Blur Text, Magnet, Tilted Card, Dot Grid. Header/hero/service/client prototype comes before rolling components across all pages. Target WCAG 2.2 AA and Lighthouse >90 in agreed conditions; no Phase 1 score or compliance certification is claimed.

## Foundation changes

Added Astro static output, official React integration, strict TypeScript, scoped-component capacity, a shared semantic layout, global foundation styles, central approval-empty business data, nine intended page shells and a static 404. Added run/check/build/preview commands, a locked dependency tree, dependency/licence inventory and a build-output verification script. The shells are explicitly development content, not approved website copy or the final design.

No Next.js dependencies, starter branding, caches or archive agent instructions were migrated into executable source. The original starter is preserved in the external reference copy. React support is configured but no islands hydrate in Phase 1. No tracking, remote fonts, API, form, database or business-data collection was added. No Netlify connection, deployment workflow, site registration, DNS update or publication was performed. Robots metadata, robots.txt and an X-Robots-Tag header discourage indexing; these are not access controls. Raw unapproved evidence is kept out of the generated site and public repo.

## Domain and operational decisions before launch preparation

The observed existing domain is `kanjayconsulting.com`, with `www` shown in contact material. Neither variant is yet approved as canonical. Confirm registrar, DNS provider, domain/account ownership, Netlify owner/team/plan/budget, business-email provider, billing/recovery contacts and authorised collaborators. Do not share passwords; provide roles/access through the relevant service.

Before cutover, capture the actual DNS zone, especially MX, SPF, DKIM and DMARC, and determine whether old hosting supplies email or other services. Inventory old paths, anchors, downloads and important inbound links; prepare redirects only after target URLs are approved. Record current records/TTL, cutover window, HTTPS, rollback steps and owner, and test inbound/outbound business email before and after change. No DNS records, account access or email deliverability have been verified in Phase 1.

Confirm actual phone/email providers, access and retention/deletion/backup practices, document-transfer process and applicable markets/jurisdictions before drafting policies. Theme storage will need an accurate inventory once implemented; do not assume “no cookies” means no storage. Confirm maintenance and copy/design/policy approvers, language(s), budget and launch target. Do not enable analytics, feeds, maps or a chatbot without separate scope review.

## Verification and next gate

See `VALIDATION.md` for actual command results and limitations. No final visual design, responsive browser review, screen-reader review, Lighthouse run, telephone connection, inbox delivery, redirects or production checks are claimed at this foundation stage.

Before Phase 2 content/design: confirm business identity and audience, service briefs and recruitment routing, verified contact details, master brand assets, client permissions or anonymised alternative, preferred visual references/Uiverse choices and typography direction. Confirm representative devices/browsers and acceptance owner. These gaps do not block installing the foundation but do block final public content.

Before later release preparation: provide canonical domain/account/email/migration inputs, approved policies based on actual practices, operations responsibility and launch approval for the concrete reviewed site.
