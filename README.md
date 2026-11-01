<p align="center">
  <img src="public/images/brand/kanjay-logo.png" alt="Kanjay Consulting" width="112" />
</p>

<h1 align="center">Kanjay Consulting</h1>

<p align="center">A considered business website for HR consulting and GeM seller support.</p>

<p align="center">
  <a href="#run-locally">Run locally</a> ·
  <a href="#pages">Pages</a> ·
  <a href="#project-structure">Project structure</a> ·
  <a href="#review-status">Review status</a>
</p>

> **In review.** Design revision Phases 1–4 are implemented on `design-revision-phase-1` in [draft PR #11](https://github.com/harsha160507/Kanjay-Consulting/pull/11). Publication and production indexing are not approved.

## The website

Built with **Astro, React and TypeScript**, the site delivers static HTML with selective enhancements. Its visual system pairs restrained typography, generous spacing and soft surfaces with light and dark themes.

- **Content first:** essential text and links remain available without JavaScript, including the full Services list and About activities.
- **Focused interactions:** service-card pagers, a client Logo Loop with pause controls, and an activity Stepper.
- **Direct contact:** selectable phone/email details and real `tel:` / `mailto:` links. No contact form or application database.
- **Documented decisions:** approved content, component provenance, phase reports and audit evidence live alongside the code.

The supplied Next.js starter informed the references. **The application in this repository runs on Astro.**

## Run locally

Requires **Node.js ≥ 22.23.4** and **npm ≥ 9.6.5**.

```sh
git clone --branch design-revision-phase-1 https://github.com/harsha160507/Kanjay-Consulting.git
cd Kanjay-Consulting
npm ci
npm run dev
```

Open the local address printed in the terminal. Development and preview servers bind to `127.0.0.1`. The current static application needs no API keys or environment variables to run locally.

To preview the built site, stop the development server and run:

```sh
npm run build
npm run preview
```

Build output is written to `dist/`. The build also prepares review security headers in `dist/_headers`.

## Pages

| Route | Content |
| --- | --- |
| `/` | HR and GeM paths, working approach, values, client logos and contact invitations |
| `/about/` | Company background, expertise, activities and values |
| `/services/` | Seven HR and seven GeM services, browsable cards, native FAQs and direct service links |
| `/clients/` | One grid of 24 approved client names/logos with industry captions, including SILQ |
| `/contact/` | Business and candidate contact routes, enquiry guidance and approved social links |
| `/terms-of-use/`, `/privacy-policy/`, `/cookie-policy/`, `/disclaimer/` | Policy drafts retained for review |
| `/404.html` | Recovery links for missing pages |

Business and policy pages also have explicit `/theme/light/` and `/theme/dark/` variants. With JavaScript enabled, the site remembers the theme using the browser's `kanjay-theme` local-storage item.

`/prototype/` and `/prototype/static/` are isolated component-review pages, separate from the business-page navigation.

## Checks and local QA

After installing dependencies:

```sh
npm run check
npm run build
npm run verify
node scripts/verify-clients.mjs
node scripts/verify-services.mjs
node scripts/verify-policies.mjs
```

For the latest Phase 4 audit assertions:

```sh
node scripts/verify-revision4-audit.mjs docs/references/revision-4-cookie-fix
```

The audit validates the build and **saved browser observations**; it does not collect fresh browser evidence automatically. See the [rerun report](docs/PHASE-REV-4-COOKIE-FIX.md) for methods and limits. Automated checks do not replace manual accessibility testing.

Optional QA tools, after building:

| Command | Purpose |
| --- | --- |
| `node scripts/serve-phase10-review.mjs` | Local build on **4340**, with generated security headers enforced |
| `npm run audit:prototype` | Local build on **4337**, plus a script-blocked version on **4338** |

Stop any existing server using those ports first. These tools do not emulate or verify production hosting.

## Project structure

```text
src/
  components/   Shared layout and page components
  data/         Business details, services, clients, industries and policy copy
  layouts/      Shared document shell and review presentation
  lib/          Routing, SEO and progressive enhancements
  pages/        Astro routes and static theme variants
  styles/       Visual system and page styles
public/         Logos, icons and static assets
scripts/        Build helpers, verification and local QA tools
docs/           Blueprint, phase reports, approvals and evidence
```

Start with [`src/data/site.ts`](src/data/site.ts) for shared business/contact details, [`services.ts`](src/data/services.ts) for service content, and [`clients.ts`](src/data/clients.ts) / [`client-industries.ts`](src/data/client-industries.ts) for client data. Build-time asset checks keep a missing SILQ logo out of both Home and Clients.

Use owner-approved copy and assets. Where a synced `sources/` folder is present in the local workspace, treat it as read-only reference material and work outside it. Generated builds and local credentials are excluded from Git. Component and font licence notices are retained under [`docs/references/`](docs/references/).

## Review status

The latest Phase 4 rerun passes its executed acceptance checks, including the Cookie-only notice correction. It does **not** establish production readiness or complete accessibility certification.

Still unperformed or pending: actual screen-reader speech, physical touch, runtime OS/browser reduced-motion switching, contact-app launch/delivery, production-host verification and outstanding business/legal decisions. The earlier Phase 3 runtime reduced-motion acceptance item remains open. Historical performance measurements are local samples, not production guarantees.

Review builds retain internal banners, draft policy labels, `noindex, nofollow` and a robots disallow rule. The confirmed `www` domain is used for canonical metadata; it is configuration, not evidence of deployment. Production headers, redirects, storage/network behaviour and a separate launch/indexing decision still need verification. Indexing controls are not access controls.

| Read next | Scope |
| --- | --- |
| [Design revision Phase 1](docs/PHASE-REV-1.md) | Layout, section entrances and interaction constraints |
| [Design revision Phase 2](docs/PHASE-REV-2.md) | Home components and logo treatments |
| [Design revision Phase 3](docs/PHASE-REV-3.md) | Service-card integration and measurements |
| [Phase 4 implementation](docs/PHASE-REV-4.md) | About, Contact, Clients and Cookie Policy changes |
| [SILQ follow-up](docs/PHASE-REV-4-SILQ-UPDATE.md) | Shared grid and approved industry caption |
| [Latest Phase 4 audit rerun](docs/PHASE-REV-4-COOKIE-FIX.md) | Current acceptance results and remaining untested checks |
| [Project blueprint](docs/blueprint/kanjay-redesign-blueprint-2.md) | Original project direction |

Earlier phase reports are historical records. Follow the latest revision and follow-up reports where decisions have changed.
