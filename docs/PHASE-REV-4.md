# Design revision — Phase 4

1 November 2026. Continues the existing `design-revision-phase-1` branch / draft PR #11 from `88c7e0b`. Phase 4 only; no merge, deployment or launch approval. Synced reference files are read-only and were not changed.

## Implemented

### Clients and SILQ

- The owner-supplied `public/images/clients/silq.webp` exists and its provenance hash passes. The asset itself is unchanged. SILQ is now a **separate neutral name/logo listing under “Clients”**, outside the “Current clients” section. It has no current/past status, industry caption, engagement description, testimonial or results. Clients-page metadata was made neutral too.
- Removed SILQ's earlier `status: current` classification. The other **23 current clients retain their exact names, order, status and artwork**, verified against the original approvals/provenance. The canonical data separates `currentClients` and `neutralClients`; there is no duplicated SILQ record in the Home set.
- Home retains **24 unique approved logos including SILQ**, with no industry captions or relationship-status text added. The build-time public-client selection checks the supplied asset: if it is missing, SILQ is omitted from both pages. The missing/present branches of the actual selection module were tested in controlled fixtures without moving/deleting the real asset. This is a source-module test, not an end-to-end missing-file rebuild.
- `verify-clients.mjs` derives expected counts from the live data and available neutral asset, rather than a hardcoded number. It verifies current/neutral separation, approved captions, assets and safe links/headings. Associated Home/asset guards were adapted to the same live set.

### Industry captions

- Added one small caption under each existing current-client name, using only the company-to-industry mappings in the owner-identified **updated ZIP's `content/company-information.md`**. It is the same source file identified by SHA-256 `cbb192cfa33c5e9a9b59c5dc30acb66b9faf279d9baef6ca8c1a854a12aa8ae9`.
- Kept the approved display names **Safe Tech Fire Solutions**, **Shopup** and **Kaavian services**, while explicitly mapping the questionnaire's **Safe Tech Fire Solution**, **ShopUp** and **Kaaviyan services**. No silent renames. Other names are unchanged.
- Removed parenthetical taglines from the displayed captions. Only case normalization and two meaning-preserving shortenings were made: “global IT solutions and services company” → “Global IT solutions and services”; “Chemicals, provider of commercial cleaning, sanitation and hygiene solutions for business” → “Chemicals, commercial cleaning, sanitation and hygiene solutions”. Jewellery's material description was retained. No Kanjay service mapping was inferred.
- The exact industry-source excerpt, aliases and hash are retained in [questionnaire-industries.md](references/revision-4/questionnaire-industries.md) and [provenance.json](references/revision-4/provenance.json). SILQ intentionally has no industry caption. Home's loop is caption-free.

### About Stepper

- Adapted the supplied Stepper's track/pane/footer structure and soft controls into **native Astro HTML and a small progressive TypeScript enhancement**. Exact supplied TSX/CSS copies are under [supplied](references/revision-4/supplied/); the existing React Bits **MIT + Commons Clause** notice is retained in `docs/references/phase3-upstream/react-bits-LICENSE.md`.
- The two browsing choices are **HR work** and **GeM seller work**, containing the exact two activity sentences already on About. They are subjects, not invented sequential stages: no step numbers, completed stages, success state, onboarding form or invented process. Existing introduction/supporting approach paragraphs remain.
- Both activity panels and their real anchor links are server-rendered and visible without JavaScript. Enhancement switches panels in place, exposes Previous/Next, marks the current activity, updates the fragment and supports direct links/Back. It preserves existing DOM rather than replacing focused markup.
- An initial keyboard test found that attempting focus before revealing a hidden destination panel failed. Fixed the order: reveal the existing panel, focus it, then hide the other panel. Final keyboard tests show correct focused IDs and solid visible outlines. Before/after evidence is retained.
- Panel changes are intentionally instant for everyone; the supplied Stepper's slide/spring/glider/check-drawing effects and extra icon packages were omitted. Existing Phase 1 Fade Content remains the sole section entrance, including About's introduction. No word/letter effects or new motion library/dependency.

### Contact and Cookie Policy

- Phone, email and social panels now use the same **supplied Spotlight Card static-surface mode** as Home: disabled light/glow/grain/flare, no hydration, no content/focus replacement, gentle Phase 1 hover/focus highlighting. All existing contact wording and destinations are unchanged; phone/email remain selectable. No form or delivery message was added.
- Replaced Cookie Policy's entire substantive body with the supplied approved **Cookie & Browser Storage Policy**, verbatim. H1/H2/paragraph structure, existing policy layout, contents navigation and related-policy navigation remain. “Contact page” is a real theme-aware link within the exact approved final sentence. The former generic contact block/review-aside text was removed from this policy's body, avoiding extra unapproved text. Other policies are unchanged.
- The review banner, draft notice/date, footer links and **“Policy drafts”** labels remain unchanged. No effective date or legal/hosting approval was invented. The wording matches the implemented theme-only local-storage code; no new cookies, tracking or storage were added. Local observations still do not establish production-host behaviour.

## Checks and evidence

| Check | Result | Evidence |
|---|---|---|
| Astro type check and build | PASS | 88 files: zero errors/warnings/hints. 34 HTML pages and sitemap; ten executable inline-script CSP hashes prepared. |
| Verification scripts | PASS | 13 checks: foundation, Home, About, Services, Clients, policies, Phase 3 prototype, colours, revisions 1–4 and Phase 10. [verification-log.json](references/revision-4/verification-log.json). Historical evidence files were preserved; new results live in revision-4. |
| Review banners/footers unchanged | PASS | Exact before/after comparison on all 34 HTML routes, including all themed/policy variants. [before.json](references/revision-4/before.json), [implementation-checks.json](references/revision-4/implementation-checks.json). |
| Client names, status separation, industries and logo availability | PASS | Source/HTML guards, full mapping comparison, original asset hashes, live counts and controlled missing-asset fixture. No SILQ industry/status claim. Home retains 24 logos. |
| Approved Cookie body | PASS | Exact source and rendered heading/section/paragraph equality against [approved-cookie.txt](references/revision-4/approved-cookie.txt), root/light/dark variants. Contact link targets exist. |
| Phone/tablet/desktop, both themes | PASS for measured layout | 375/768/1440 CSS px × light/dark × four affected pages = **24 cases**, with actual viewport widths recorded and no horizontal overflow. [responsive-browser.json](references/revision-4/responsive-browser.json). Desktop screenshots are included; they are not evidence of a physical phone. |
| Stepper keyboard, visible focus, links and Back | PASS after focus fix | Previous/Next and activity links focus the correct existing article with a solid visible outline. Back restores HR selection/focus. Eight cold activity deep-link cases at 375/1440px in both themes select correctly. [stepper-keyboard.json](references/revision-4/stepper-keyboard.json), [stepper-deep-links.json](references/revision-4/stepper-deep-links.json). |
| No-JS content and native activity links | PASS — scripts blocked | Enforced HTTP `script-src 'none'` on the same build, 24 four-page size/theme cases. Both About activity panels remain visible, enhanced buttons absent; clients/captions, Contact links and Cookie body remain readable. Native GeM activity anchor works. [script-blocked-browser.json](references/revision-4/script-blocked-browser.json), [static-stepper-link.json](references/revision-4/static-stepper-link.json). Browser-wide JS setting was not changed. |
| Contact keyboard focus and targets | PASS for tested checks | Call, business email, candidate email, LinkedIn and Facebook retain correct URLs and solid visible outlines. [contact-focus.json](references/revision-4/contact-focus.json). Actions were not launched/submitted; no app-launch/delivery claim. |
| Phase 1 motion and visual constraints | PASS — implementation/guard review | Existing Fade Content guard fixtures pass, including reduced-motion skip/cancellation. New Stepper has no panel animation; Spotlight has no glow/active motion. No new entrance library, text splitting, scroll hijack, parallax or particle/background effects. Actual OS/browser reduced-motion switching remains NOT TESTED. |
| Synced ZIP unchanged | PASS | SHA-256 remains `c2601273dc9bfeca079c7f21e596d2fb7b7e06e9fbf8d0139b7e4135a1ae0606`. Updated Documents ZIP was only read; supplied components were copied outside `sources/`. |

Reproduction: run `npm run check`, `npm run build`, `node scripts/verify-clients.mjs` and `node scripts/verify-revision4.mjs` from the repository. The last script checks source/build data and saved browser observations; it does not itself perform browser or assistive-technology tests. Regression guards allow only the explicit new labels/captions and approved Cookie body, while retaining unchanged-copy checks for other routes. The Cookie contact-block replacement is the sole intentional additional mailto removal; other subjects, bodies and HR routes remain preserved. Old `info@` is absent from generated HTML/JS.

## Available previews and remaining review

Local: [Clients / SILQ](http://127.0.0.1:4337/theme/light/clients/#neutral-clients-title), [About activities](http://127.0.0.1:4337/theme/light/about/#working-title), [Contact](http://127.0.0.1:4337/theme/light/contact/), [Cookie Policy](http://127.0.0.1:4337/theme/light/cookie-policy/). Both static theme variants are built. The normal local server is left running; the temporary script-blocked test server is stopped after testing.

Review the neutral SILQ placement, the mapped captions and the restrained Stepper treatment. No asset/content blocker remains for these Phase 4 changes. SILQ's industry remains intentionally omitted until supplied. The earlier Phase 3 runtime reduced-motion acceptance check remains open; this phase does not silently close it. Actual screen-reader speech, physical touch, OS reduced-motion switching, contact-app launch/delivery and production hosting checks remain **NOT TESTED**. Performance was not remeasured and no no-regression/production guarantee is made. Other business/legal and launch blockers remain pending. Stop after this phase on the draft PR.
