# Phase 7 — Clients page

31 October 2026, Asia/Kolkata. Draft implementation on `phase-7-clients`, based on Phase 6 commit `3e8a5fc`. No merge, deployment or change to synced references.

## What is available publicly in the draft

The Clients placeholder is replaced at `/clients/`, `/theme/light/clients/` and `/theme/dark/clients/` with an introduction, a **Current clients** gallery and a phone/email invitation. The gallery contains exactly the 23 names approved as current clients in the owner's `content/client-approvals.md`. Exact approved display names are retained, including “Shopup”, “Kaavian services” and “Woyc::OD”; asset filenames or older copy were not used to silently rename clients.

The only relationship description published for these organisations is **current client**. No client-specific HR/GeM service, project date, engagement duration, recommendation, outcome or endorsement was inferred from its name/logo or industry. General HR/GeM navigation remains separate from the client list.

### Approved names and relationship classification

| Approved name | Public relationship | Name/logo permission |
| --- | --- | --- |
| L&T | Current | Yes |
| Eaton | Current | Yes |
| Balmer Lawrie | Current | Yes |
| Benco Group | Current | Yes |
| CASOL | Current | Yes |
| Techno Products | Current | Yes |
| Hadron Infra | Current | Yes |
| Safe Tech Fire Solutions | Current | Yes |
| Sree Raghavendra Electric Services Pvt Ltd | Current | Yes |
| Madhavaa Crafts Pvt Ltd | Current | Yes |
| Aaviza Technologies | Current | Yes |
| Zuppa | Current | Yes |
| Shopup | Current | Yes |
| Vitamed | Current | Yes |
| Welona | Current | Yes |
| TTJ | Current | Yes |
| Sana’s Thinai Organics | Current | Yes |
| Sabari Musicals | Current | Yes |
| SRM Institute of Science and Technology | Current | Yes |
| Deforay | Current | Yes |
| Kaavian services | Current | Yes |
| Limpar | Current | Yes |
| Woyc::OD | Current | Yes |

All 23 entries have “Approved for website: Yes” and “Current” in the [owner's approval table](references/phase7/client-approvals.md). This is the supplied approval record, not an independently audited confirmation of business operations. [Asset provenance](references/phase7/asset-provenance.json) records approval source, original filename, public filename, original/web dimensions, processing notes and SHA-256 for each asset.

## Past relationships, stories and permissions

- **Past engagements:** no names are approved as past in the supplied table, so no past-client section or past label was invented. The page does not claim that Kanjay has never had past clients; it displays only the classified material available.
- **SILQ and Golden Works:** website/name/logo approval already exists in the owner's chat. Their current-versus-past status and engagement descriptions remain unconfirmed, so they are held out rather than mixed into the current grid. This is a classification gap, **not** a request to repeat their existing publication approval.
- **Unidentified black/gold mark:** intentionally excluded under the earlier owner decision. No filler logo, guessed name or pending public card was added.
- **Relationship narratives:** no approved service-to-client mapping or engagement description was supplied beyond current status. None was inferred from Kanjay's service list or the client-industry examples.
- **Testimonials:** no approved exact quotation, attribution or quote-publication permission was available. No quote cards or paraphrased recommendations were created from logo approval.
- **Case material and anonymised summaries:** none was supplied with approved facts and publication/anonymisation permission. No anonymous “manufacturing client” story, project scope or result was invented as a fallback. Approved anonymised summaries can be used later if actually provided; the lack of an approved narrative is not filled with illustrative client claims.
- **Figures/results:** none added. The gallery is not presented as proof of success rates, satisfaction, revenue, recruitment results, GeM awards or credentials.

What still needs input is classification for the two already-approved references, and approved wording/facts/permission for any future story, quote or anonymised summary. The 23 current names/logos do **not** await new permission in the supplied register. Final page presentation remains subject to owner review.

## Asset and component treatment

Uses the existing owner-approved cleaned lossless WebP package, copied without modifying image bytes. No logo was redrawn, generated, recoloured or replaced. All copied hashes match the package. File paths were renamed safely for web use while visible identities follow the approval table.

The Phase 3 static client-grid decision is retained: no autoplay or moving duplicate logos, no React island and no artificial logo tab stops. The gallery stays cream `#FAF8F3` in both themes; WOYC's white artwork has a dark backing. Image proportions and intrinsic dimensions are preserved with contain/max constraints; small images are not enlarged beyond their intrinsic web dimensions. Clear captions remain available even if a logo does not load.

Logo images intentionally have empty alt text because the adjacent native `figcaption` supplies the same client identity. This avoids duplicate names in the intended reading structure; it is not a claim of an actual screen-reader test. Header/footer brand alternatives remain unchanged. No client external website links were guessed.

The supplied native Pill Nav/theme/header/footer and Uiverse call-link adaptation remain. No new dependency, photo, testimonial component, form, backend or analytics was introduced. Original small-text/raster limitations remain; better originals would improve Balmer Lawrie, Kaavian and Hadron, and Golden Works if later classified/used. That is asset quality, not missing name/logo permission.

## Checks and saved previews

- PASS: final Astro/type check, 41 files; zero errors/warnings/hints. Build, 34 existing routes.
- PASS: foundation, Home, About, Services and isolated prototype checks. The old empty-client-folder guard now checks an exact approved asset allowlist; permission/source matching is verified independently against the approval table.
- PASS: `node scripts/verify-clients.mjs`, all three variants: exactly 23 approved current names, byte-identical authorised assets, readable captions, semantic headings/IDs, working local links/fragments and no unapproved/past/story/testimonial material.
- PASS: browser at 320/768/1440px, light/dark: 23 names, no horizontal overflow, 2/3/4 grid columns, cream gallery and dark WOYC backing.
- PASS: normal and page-script-blocked main text matches in all six size/theme combinations. Both service paths reach their matching Services headings by keyboard with scripts blocked.
- PASS: all 23 logo images loaded with nonzero natural dimensions; measured image boxes do not exceed their intrinsic dimensions.
- PASS: skip link focuses `main`; complete Tab walks at the three widths show 23/23/26 stops after the skip link, all with visible focus. Noninteractive client figures are read as content rather than made into fake controls.
- Native phone/business-email destinations are the existing approved values; no call or email was sent.

[Opening view](references/phase7/clients-opening.png), [gallery](references/phase7/clients-grid.png), [lower gallery](references/phase7/clients-grid-lower.png), [narrow-phone gallery](references/phase7/clients-phone.png), [browser evidence](references/phase7/browser-checks.json). Viewport captures were saved after full-page capture was unavailable; no full-page screenshot is claimed.

Actual screen-reader speech, physical touch, runtime reduced-motion preference, native contact-handler launch and actual contact delivery remain **NOT TESTED**. No automated score or static HTML inspection substitutes for those checks. The page has no new motion; cross-browser/manual release checks remain open.

## Local performance measurement

Lighthouse 13.6.0 / Headless Chrome 156, local production build with gzip and no cache, sequential runs after type checks completed and preview tabs closed. Mobile 412×823 / simulated 150ms RTT / 1.638 Mbps / 4× CPU; desktop 1350×940 / 40ms / 10.24 Mbps / 1× CPU. One run per preset.

| Preset | Performance | Automated accessibility | LCP | External JS transfer | Raw inline script text |
| --- | ---: | ---: | ---: | ---: | ---: |
| mobile | 100 | 100 | 0.932s | 0 B | 661 B |
| desktop | 100 | 100 | 0.471s | 0 B | 661 B |

[Summary/settings/hashes](references/phase7/performance-summary.json), [raw mobile](references/phase7/mobile.json.gz), [raw desktop](references/phase7/desktop.json.gz). Inline values are raw text inside compressed HTML, not separately measured transfer. Native lazy loading defers some below-fold images; this is not a total post-scroll image-transfer benchmark. Local runs are not production guarantees, controlled regression comparisons or screen-reader testing.

The source ZIP remains SHA-256 `c2601273dc9bfeca079c7f21e596d2fb7b7e06e9fbf8d0139b7e4135a1ae0606`. Evidence and assets were screened for credentials, personal filesystem paths and unrelated desktop content before upload. No existing Home/About/Services copy, public/private service-scope decision or pending Phase 6 wording proposal was changed. No release approval is implied.
