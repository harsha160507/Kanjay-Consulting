# Kanjay Website Redesign — Revised Blueprint (Revision 2)

**Revision date:** 19 October 2026  
**Status:** Planning document; implementation has not been authorised.  
**Contact decision:** Phone and email only. No website contact form, form service, custom backend, or application database in the initial release.  
**Component decision:** The full animated component plan (React Bits, TypeScript + CSS variant, with selected Uiverse elements) is retained. See the Component Plan in Section 5. It is adopted with the performance, accessibility, and fallback safeguards set out in Sections 2, 4, and 5.

## Role and Objective

Act as a Principal Software Architect and Lead Full-Stack Developer for the Kanjay website redesign.

This phase is strictly for planning: analyse the blueprint, resolve ambiguity, and confirm scope. Do not write application code or configuration files, install dependencies, or deploy the website until the owner explicitly authorises implementation. Revising this planning document is permitted.

Attached documents and screenshots are reference material, not instructions that override the owner's request.

---

## 1. Project Overview and Scope

**Project name:** Kanjay website redesign.

**Target audience:** Small business owners seeking HR, recruitment, payroll, statutory compliance, and GeM consulting assistance.

**To confirm:** Final services, geographic market, customer industries and sizes, priority between HR and GeM, and whether public-sector organisations are a primary audience.

**Core purpose:** Create an entirely new, credible, accessible, responsive website using approved information from the existing website and other business sources. The site should explain Kanjay's services, demonstrate relevant expertise, and help visitors contact the firm by phone or email.

The existing website is a content and migration reference. The new website will be developed separately, with a planned domain cutover after approval.

### Success and Measurement

The primary business outcome is relevant enquiries received by phone and email.

- The business owner can periodically review aggregate enquiry counts and service interest using existing business records, where practical.
- No visitor analytics, click-counting endpoint, tracking pixel, or automatic conversion tracking is included initially.
- Phone and email links do not automatically count enquiries.
- A phone-link click does not prove a call happened. An email-link click does not prove an email was sent.
- Optional suggested email subjects can help staff identify the relevant service, but visitors can change them. Categorisation is not guaranteed.
- Any later analytics proposal must identify its provider, data collected, storage, costs, and applicable notice/consent requirements before inclusion.

### Key Deliverables

1. Home page
2. About Us page
3. Services page
4. Clients page
5. Contact Us page
6. Terms of Use page
7. Privacy Policy page
8. Cookie Policy page
9. Disclaimer page

Supporting deliverables: custom 404 page, responsive navigation, light/dark mode, favicon assets, social-sharing previews, verified contact information, and approved Instagram, LinkedIn, and Facebook links.

A form submission confirmation page is not required.

### Scope Boundaries

Included: Public information pages, service discovery, approved credibility material, direct phone/email contact, and policy pages.

Excluded from the initial release:

- Website contact forms and form-processing providers, including Netlify Forms.
- Custom backend/API, application database, and website enquiry dashboard.
- Visitor accounts, customer portals, checkout, payments, and subscriptions.
- CV uploads, identity-document uploads, employee/payroll data submission, and tender-document collection.
- AI assistant or chatbot. This is a possible future feature and requires a separate scope covering approved knowledge, accuracy, provider costs, abuse controls, chat retention, and human handoff.
- Optional analytics, advertising pixels, social feeds, and embedded maps or videos.

### Navigation

- The logo links to Home.
- Top navigation: About Us, Services, Clients, Contact Us, plus an accessible theme switch.
- The main Services navigation item links directly to the dedicated Services page, consistently across all pages.
- Homepage service summaries link to the relevant Services page section.
- Optional homepage anchor links must be clearly labelled and must not replace direct access to the Services page.
- The shared footer provides page links, all four policy links, verified contact details, and approved social links.
- Include a keyboard-accessible skip link and an appropriate current-page indication.
- The header navigation is built with the Pill Nav component (Section 5). Its links must be real anchor links present in the static HTML, so navigation works before hydration and without JavaScript. If Pill Nav cannot meet the accessibility requirements, a native header replaces it.

### Client Presentation and Claims

Publish only verified names, logos, relationship descriptions, and assets approved for public display. Distinguish current clients from previous engagements. Use approved anonymised engagement summaries when public client material is insufficient.

Do not invent or reuse unverified testimonials, statistics, awards, certifications, client claims, or government-affiliation claims.

---

## 2. System Architecture and Tech Stack

**Front end:** Astro with TypeScript and scoped CSS, generating static HTML for the public pages.

Interactive and animated parts are delivered as React components used as Astro islands, following the Component Plan in Section 5. The rest of each page remains static HTML.

- Hydrate islands only when needed (for example when scrolled into view or when the browser is idle), not all at page load.
- All text, navigation links, and contact details must be present in the static HTML and remain readable and usable when JavaScript is unavailable, slow, or fails.
- Animation is progressive enhancement. Content must never stay hidden or invisible because an animation did not run.
- Theme selection and the mobile menu need only small amounts of script.

**Backend/API:** None required for the initial release.

**Database:** No custom application database. Enquiries take place through the business's existing phone and email systems, which may retain their own records.

**Contact mechanism:**

- Telephone links using `tel:`, with a verified full international number as the link target.
- Email links using `mailto:`, addressed to a verified business inbox.
- Readable, selectable phone numbers and email addresses alongside action buttons.
- Optional short, correctly encoded suggested email subjects for service-specific contact links.
- Links open the visitor's configured phone/email application; they do not place calls or send messages automatically.

**Authentication:** None for visitors. Hosting, source repository, registrar, DNS, and business-email accounts must have appropriate access restrictions and MFA where available.

**Hosting/deployment target:** Retain Netlify as the planned static hosting platform. Its use is independent of any form service. Netlify Forms must not be configured for this website.

The final account plan, limits, ownership, and operating budget must be checked before launch. There is no dedicated form-service subscription; domain, hosting, and business-email costs remain separate considerations.

**Source ownership:** Confirm the firm-owned or owner-approved repository, deployment account, billing contact, and recovery access. Give collaborators appropriate roles rather than sharing passwords.

**Content maintenance:** Developer-managed updates, appropriate for infrequent changes. Keep business copy and structured service/client content easy to update without duplicating information across pages.

### Existing UI Resources

Review the actual files or package names of any components, templates, and plugins proposed for reuse.

Astro can incorporate React components, and this project adopts them through the Component Plan in Section 5. The framework stays Astro; React is used only for the listed islands.

- Component source: React Bits, TypeScript + CSS variant, added one component at a time. Selected Uiverse elements are used in their HTML/CSS form.
- React Bits components typically depend on animation libraries such as GSAP or Motion. The exact dependencies are confirmed per component at implementation and recorded with versions and licences.
- Review each component's runtime, styling dependencies, accessibility, performance, and licence before use, including the licence and attribution terms of React Bits and each Uiverse element.
- Where a plain native element meets a requirement equally well, it may be used instead of a component.

An installed design plugin is not automatically a reusable component library.

---

## 3. Functional Requirements

### Core Feature 1 — Direct Contact

1. Prominent “Call our team” and “Email our team” actions.
2. A clear contact section on Home.
3. A dedicated Contact Us page.
4. Consistent phone and email access in the shared footer.
5. Verified Instagram, LinkedIn, and Facebook links where approved.

**General primary action:** “Talk to our team” may link to the Contact Us page or a clearly identified contact section. Buttons that launch another application should use the more specific “Call our team” or “Email our team” label.

**Contact behaviour:**

- Display approved public contact information as text, not only icons.
- Use international-format phone targets; the visible display may use readable local spacing.
- Make the email address easy to select and copy if the visitor has no configured email application.
- If a copy button is included, provide accessible feedback for success and failure, with selectable text as the fallback.
- Do not display “message sent”, “enquiry received”, or a similar confirmation after an email link is clicked.
- Do not claim the website can verify call connection, email delivery, or staff response.
- Show operating hours and response expectations only when confirmed by the firm.
- Give only verified social links; omit unavailable or unapproved profiles.

**Employer/job-seeker routing:** Confirm whether recruitment content is for employers, job seekers, or both. If this website is for business enquiries, say so clearly and provide a separate approved candidate contact route only if the firm has one.

### Core Feature 2 — Service Discovery

1. Concise Home summaries with clear HR and GeM visitor paths.
2. Detailed descriptions on the Services page.
3. Clear service deliverables, exclusions, prerequisites, and client responsibilities.
4. Service-specific phone/email invitations where useful.
5. Approved answers to real prospective-client questions.

Avoid presenting “end-to-end HR solutions” as a distinct detailed offering if it merely duplicates the listed HR services. It can serve as an introductory description when accurate.

### Core Feature 3 — Credibility and Working Approach

1. Approved current/past client presentation.
2. Verified team information and relevant credentials.
3. Approved case studies or anonymised engagement summaries when available.
4. A short “How we work” explanation, based on the real business process.
5. Core values supported by concrete behaviour.

A possible working-process outline is initial discussion → scope agreement → engagement → ongoing support. Publish only the steps that reflect Kanjay's actual practice.

### Core Feature 4 — Shared Usability

1. Responsive, keyboard-operable navigation.
2. Light and dark themes.
3. Consistent page structure and contact actions.
4. Clear access to policies.
5. A useful 404 page with navigation and contact options.

### Enquiry Handling Outside the Website

- The website does not collect enquiry fields or store messages in an application database.
- Staff receive direct calls and emails through existing business systems.
- Confirm who answers calls, checks the inbox, covers absences, and handles service-specific enquiries.
- Staff may manually classify enquiries if useful; no dashboard or automatic categorisation is included.
- Decide access, retention, deletion, and backup practices for email and any business contact records.
- Deleting an email from one inbox does not establish deletion from exports, backups, or other copies.
- Initial contact guidance should discourage sending confidential employee, payroll, identity, or tender documents through an ordinary initial enquiry. The firm can explain its approved document-transfer process after contact.

---

## 4. Non-Functional Requirements

### Performance

Target a Lighthouse Performance score above 90 on agreed representative pages under a documented mobile and desktop test setup.

- Optimise image dimensions, formats, and compression.
- Reserve image dimensions to reduce layout shifts.
- Lazy-load below-the-fold imagery; load a relevant hero image promptly.
- The animation libraries required by the Component Plan are accepted. Keep other JavaScript, dependencies, and font downloads to a minimum.
- Load animated components lazily (when visible or idle). The single hero background effect must not delay the main content or the first contact action.
- Use limited font weights and robust fallback fonts.
- Avoid unnecessary third-party scripts and heavy effects outside the Component Plan.
- Record the JavaScript transferred per representative page, and review it against the Lighthouse target.
- If the Component Plan prevents the target from being met, trim components in the order set out in Section 5 rather than lowering the target without owner approval.

Scores vary with testing conditions and are not a permanent guarantee.

### Security and Operations

1. HTTPS and an agreed set of appropriate security headers.
2. No secrets in browser-delivered code.
3. No contact-form endpoint, database credentials, or email-sending API keys in the initial architecture.
4. Maintained dependencies and restricted deployment access.
5. Review external links and permitted content sources.
6. Confirm who handles security updates, account recovery, backups, and rollback.
7. Disable unused form handling or integrations where relevant to the hosting configuration.

Public contact details are intentionally public. The firm's phone/email processes must handle unwanted contact; the website must not promise to eliminate spam.

### Accessibility

Target WCAG 2.2 AA.

- Semantic page structure, meaningful heading order, descriptive links, and appropriate text alternatives.
- Keyboard-operable navigation, theme controls, and contact actions.
- Visible focus, sensible focus order, and accessible mobile-menu behaviour.
- Readable contrast in both themes, including hover, focus, active, and disabled states where used.
- Text resizing and zoom without loss of essential content.
- Reduced-motion support and no reliance on animation to understand content.
- Every animated component must switch to a static or minimal presentation when the visitor prefers reduced motion.
- Animated text (Blur Text, Shiny Text, Gradient Text, Scroll Reveal) must expose the complete text to assistive technology and must not delay reading.
- Moving or looping content (Logo Loop, Carousel) must be pausable, or have a static alternative, and must not move for long periods without a user control.
- Decorative effects (Dot Grid, glow and shine effects) are hidden from assistive technology and carry no information.
- Hover effects (Spotlight Card, Glare Hover, Magnet) must have equivalent keyboard focus behaviour and never be the only way to reach content.
- Manual keyboard and screen-reader checks alongside automated checks.

Native HTML semantics first; ARIA only where needed. Automated tool scores alone do not establish accessibility conformance.

### SEO

1. Unique page titles and descriptions, descriptive URLs, and an approved canonical domain.
2. Sitemap, appropriate indexing controls, and suitable business structured data using verified facts.
3. Social-sharing previews, favicon assets, meaningful internal links, and approved redirects.
4. Useful service content tailored to the actual audience and locations.
5. A custom 404 page that returns the correct status.

Confirm service locations and business details before writing local-search content. Do not fabricate addresses or promise rankings.

Keep preview/staging deployments out of search indexing. A noindex directive is not access control; use available access restrictions when a preview contains material that should not be public.

### Responsiveness

- Mobile-first layouts from narrow phones to large desktops, with no unintended horizontal scrolling.
- Collapsible navigation, readable text, comfortable touch targets, and flexible service/client layouts.
- Phone/email actions that remain easy to use on small screens.
- Responsive images and content that works with long service names and contact details.

Verify on agreed representative phone, tablet, and desktop sizes and browsers.

### Cookies, Storage, and Tracking

Initial release: no optional analytics, advertising trackers, social feeds, or third-party embedded maps/videos. Use ordinary external links where appropriate.

- Inventory actual cookies, local storage, network requests, hosting services, and external services before finalising policy text.
- Theme preference storage must be documented accurately; “no cookies” is not equivalent to “no browser storage”.
- A cookie consent banner is conditional, not automatically included or automatically unnecessary.
- Assess the applicable jurisdictions and the purpose of each technology.
- If consent is required for an optional technology, block it until the appropriate choice is made and provide a usable way to change that choice.
- Do not show meaningless Accept/Reject controls for technologies the site does not use.
- Adding analytics, embeds, or a chatbot later requires a new review of the inventory, policies, and relevant controls.

---

## 5. UI/UX and Design Guidelines

**Design direction:** Clean, credible, corporate, and approachable. Use restrained logo-derived accents and balanced layouts. This blueprint's warm professional direction is the working design direction, subject to confirmation against the original logo and approved references.

Present GeM expertise clearly without implying government endorsement or affiliation unless verified.

### Colour Palette and Contrast Rules

Candidate brand palette:

| Colour | Intended role | Usage rule |
| --- | --- | --- |
| Slate `#25364A` | Primary text and strong brand surfaces | Suitable for text on the proposed cream background; verify other pairings. |
| Teal `#147D92` | Brand accent and selected actions | Normal-text contrast against cream is only just above the AA threshold; verify the exact rendered pairing and states. |
| Red `#C94A4A` | Restrained brand accent | Does not meet normal-text AA contrast against cream; use a darker text variant where needed. |
| Ochre `#D6AA32` | Decorative accent or suitable filled surface | Does not meet normal-text AA contrast against cream; do not use for essential text or low-contrast controls. |
| Cream `#FAF8F3` | Light background | Pair with verified text, border, and control colours. |

Define semantic colour roles and darker/lighter variants during design. Do not use every accent equally. Check text, button labels, borders, icons, focus indicators, and error/status colours against their actual backgrounds.

Create an independent dark-theme token set; do not simply invert colours. Verify every relevant dark-mode combination. Preserve the logo's approved appearance and provide an appropriate background treatment if needed.

### Typography

Manrope headings with Source Sans 3 body text. Use limited weights, readable body sizes, comfortable line spacing, and robust fallbacks.

Prefer locally served font files where licences permit. Confirm licensing and avoid unnecessary third-party font requests.

### Layout and Shared Components

Working layout: split hero, distinct HR/GeM service paths, working approach, values, approved credibility material, contact invitation, and footer.

Shared components:

- Header, mobile menu, skip link, and theme switch.
- Content containers and section headings.
- Service summaries, service details, FAQs, and approved client/engagement cards.
- Phone/email contact actions.
- Policy-page layout, 404 layout, and footer.
- Animated and interactive components from the Component Plan below, each built so the content works without the effect.

No contact form or form-control component is required.

### Component Plan

This plan retains the full set of selected components. Names were checked against the React Bits component listings when this plan was written. Because the library changes, re-confirm each name and its installation command before implementation.

**Sources and variants**

- **React Bits** (reactbits.dev): primary source, TypeScript + CSS variant, used as Astro React islands.
- **Uiverse** (uiverse.io): limited to the theme toggle, standard buttons, and social icons. Choose the HTML/CSS version. Uiverse elements have no fixed names, so they are selected by search term and approved individually by the owner after an accessibility check (labels, keyboard focus, contrast, licence).

**Navigation**

| Area | Component | Source | Purpose and rules |
| --- | --- | --- | --- |
| Header, desktop and mobile | Pill Nav | React Bits | Logo, About Us, Services, Clients, Contact Us. Real anchor links, current-page indication, keyboard-operable mobile menu. Any logo animation requires owner approval so the logo's approved appearance is preserved. |
| Mobile menu alternative | Staggered Menu | React Bits | Optional. Use only if Pill Nav's mobile menu does not meet the design. Choose one, not both. |
| Theme switch | Uiverse “toggle switch” or “dark mode toggle” | Uiverse | Accessible name and state. Works with the stored or device theme. |

**Home**

| Area | Component | Source | Purpose and rules |
| --- | --- | --- | --- |
| Hero headline | Blur Text | React Bits | Soft entrance. Full text present in the HTML. |
| Highlighted headline phrase | Gradient Text | React Bits | One phrase per page, using verified palette colours. |
| Hero tagline | Shiny Text | React Bits | Subtle emphasis only. |
| Hero background | Dot Grid | React Bits | The single background effect. Decorative and hidden from assistive technology. |
| Hero service icon cluster | Glass Icons | React Bits | Replaces the old coloured circles. Each icon needs a visible text label. |
| Primary action | Magnet | React Bits | Wraps the main “Talk to our team” action only. |
| Secondary action | Uiverse “button” (outline) | Uiverse | “Know more about us”. |
| HR/GeM service summaries | Spotlight Card | React Bits | Links to the matching Services page section. |
| Core values | Glare Hover | React Bits | Values shown only if approved. |
| Section reveals | Fade Content | React Bits | Used across sections. Content visible without JavaScript. |
| Client or engagement preview | Logo Loop | React Bits | Verified, approved logos only. Pausable. Static alternative available. |
| Contact invitation | Spotlight Card | React Bits | Holds “Call our team” and “Email our team” actions. |

**About Us**

| Area | Component | Source | Purpose and rules |
| --- | --- | --- | --- |
| Firm introduction | Scroll Reveal | React Bits | Full text readable at once for assistive technology and reduced motion. |
| How we work | Stepper | React Bits | Real process steps only. |
| Verified figures | Count Up | React Bits | Only with verified figures. Never invented statistics. |
| Team members | Tilted Card | React Bits | Only with verified, approved team information and photographs. |
| Values | Glare Hover | React Bits | Same treatment as Home. |

**Services**

| Area | Component | Source | Purpose and rules |
| --- | --- | --- | --- |
| Intro text | Blur Text | React Bits | Same rules as Home. |
| HR Services and GeM Services panels | Spotlight Card | React Bits | One panel per approved service group. |
| Entrance of services | Animated Content | React Bits | Staggered reveal. Content visible without JavaScript. |
| FAQs | Native HTML `<details>` and `<summary>` | None | Accessible by default. |

**Clients**

| Area | Component | Source | Purpose and rules |
| --- | --- | --- | --- |
| Approved client grid | Plain card grid with Fade Content | React Bits | Verified relationships only. |
| Logo strip | Logo Loop | React Bits | Approved logos only. Pausable. |
| Case summaries or testimonials | Carousel | React Bits | Approved or anonymised material only. Keyboard-operable with visible controls. |

**Contact Us and footer**

| Area | Component | Source | Purpose and rules |
| --- | --- | --- | --- |
| Phone, email, and social panels | Spotlight Card | React Bits | Contact is by phone and email only. No contact form. |
| “Call our team” and “Email our team” buttons | Uiverse “button” | Uiverse | Clear labels. Visible selectable contact text beside each. |
| Social links (Instagram, LinkedIn, Facebook) | Uiverse “social” icon buttons | Uiverse | Verified, approved profiles only. Accessible names. |
| Footer reveal | Fade Content | React Bits | Footer content visible without JavaScript. |

Removed because there is no contact form: the Uiverse input fields and submit button from the earlier component plan.

Policy pages and the 404 page use plain, readable styling with no animated components.

**Components deliberately excluded**

- Playful or heavy navigation: Gooey Nav, Bubble Menu, Flowing Menu, Infinite Menu.
- Heavy backgrounds and 3D: Galaxy, Aurora, Particles, Silk, Lanyard.
- Cursor effects: Click Spark, Target Cursor, Splash Cursor.

**Usage rules**

1. **Restraint:** One background effect (Dot Grid, hero only). Gradient Text once per page. Magnet on the primary action only. Fade Content and Spotlight Card are the main repeated effects. Other components appear only where listed above.
2. **Verified content only:** Count Up, Tilted Card, Logo Loop, and Carousel are used only with verified facts and approved assets.
3. **No-JavaScript content:** Animated and reveal components render their full content in the static HTML so nothing is hidden if scripts fail.
4. **Accessibility fallback:** If Pill Nav, Stepper, Logo Loop, or Carousel cannot meet keyboard and screen-reader checks, replace that component with a native equivalent.
5. **Prototype and measure first:** Before building every page, prototype the header, hero, service cards, and client strip, and measure JavaScript size, performance, and accessibility.
6. **Trim order if needed:** If the performance or accessibility targets are not met, remove or simplify in this order: Glass Icons, Shiny Text, Gradient Text, Blur Text, Magnet, Tilted Card, Dot Grid. Any change to this order or to the targets needs owner approval.
7. **Dependency record:** Keep a list of added packages, versions, and licences, and keep them maintained.

### Theme and Motion Behaviour

Follow device preference on first visit; offer a visible manual override. Remember the explicit choice when browser storage is available. Handle unavailable storage gracefully and avoid a distracting theme flash.

Motion is limited to the Component Plan above and should support understanding rather than decoration. Respect reduced-motion preferences, and avoid making content available only on hover.

---

## 6. Page and Content Map

### Home

Working section order:

Hero and contact action → HR/GeM service summaries → how we work → core values/differentiators → verified client or engagement preview → contact invitation → footer.

The opening message must explain whom Kanjay helps, the problems it handles, and its relevant market. Final copy must use approved business facts.

The client preview is conditional on available approved material; use authorised anonymised engagement summaries instead when appropriate.

Component assignments for each Home section are in the Component Plan in Section 5. The same applies to About Us, Services, Clients, Contact Us, and the footer.

### About Us

1. Firm introduction, intended customers, and service geography.
2. Relevant expertise and verified business history.
3. Core values and concrete working practices.
4. Verified team information and credentials, where approved.
5. Contact invitation.

Confirm whether Trust, Quality, and Support remain the firm's approved values.

### Services

Two primary groups: HR Services and GeM Services.

Candidate offerings from the reference material: recruitment, payroll, statutory compliance assistance, HR audit, GeM assistance, and registration/tender support. Confirm current offerings before writing final content.

For each approved service, explain:

- Intended customer and problem.
- Scope and deliverables.
- Exclusions and client responsibilities.
- Relevant prerequisites and process.
- Accurate timeline information, if the firm approves it.
- Pricing approach: public price, indicative range, or discussion-based quotation.
- Useful FAQs.
- A direct contact invitation.

Clarify employer versus candidate services. For GeM, clarify seller support versus any buyer-facing services and distinguish process assistance from guarantees of registration, approval, compliance outcomes, or tender awards.

Start with one substantial Services page. Add individual service pages only if the approved content and visitor needs justify them.

### Clients

Use verified current/past relationships and authorised assets. Include context about the type of engagement when approved.

Use approved anonymised summaries if public client evidence is insufficient. Do not publish an empty or misleading logo grid. Confirm the final content approach before launch.

### Contact Us

Phone/email contact panel with:

1. Verified public phone number and “Call our team” action.
2. Verified public business email and “Email our team” action.
3. Selectable contact details and optional accessible copy controls.
4. Approved hours and timezone.
5. Verified business address only if intended for public display.
6. Approved social links.
7. Appropriate initial-enquiry guidance and any approved employer/candidate routing.

No contact form. A map embed is excluded initially; an ordinary external map link may be added if the public address and destination are verified.

### Policy Pages

Four separate pages linked from every footer:

- **Terms of Use:** Website-use terms. Client-service contracts are outside the initial scope.
- **Privacy Policy:** Actual website, hosting, direct-contact, and business handling practices; do not describe a form database or chatbot that does not exist.
- **Cookie Policy:** Actual cookies and similar storage, including theme preference where used, and applicable controls.
- **Disclaimer:** Accurate limits on general website information and relevant service claims without contradicting the services being offered.

Use effective/revision dates, correct business identity, and a contact route. Final wording must be reviewed by the appropriate business/legal owner against the actual jurisdictions and practices.

### Supporting Pages and Footer

- Custom 404 page: helpful navigation and contact options.
- No dashboard, settings page, or form thank-you page.
- Theme selection lives in the shared header.
- Footer: page links, four policy links, verified phone/email, approved social links, and accurate copyright details.

---

## 7. Detailed Inputs Required Before Implementation

The owner may provide factual notes and source documents; polished website copy can be drafted from those facts for approval. Do not invent missing information.

| Area | Inputs required |
| --- | --- |
| Business identity | Exact public name, legal operating entity, approved description, tagline if any, establishment year if published, and website owner. |
| Audience and market | Customer types, company sizes, industries, locations, remote/onsite delivery, HR/GeM priority, and public-sector audience. |
| Services | Final list, scope, exclusions, deliverables, prerequisites, responsibilities, pricing approach, accurate timelines, and recurring/project engagement models. |
| Recruitment routing | Employer-only, candidate-only, or both; approved candidate route if needed. |
| Differentiation | Specific supported reasons to choose Kanjay, relevant experience, working approach, and approved evidence. |
| Existing material | Existing website URL, company profile, service documents, and permission to reuse relevant text/assets. |
| Brand assets | Original logo preferably as SVG, high-resolution alternatives, brand rules, approved variations, and dark-background treatment. |
| Visual references | Two or three examples with specific preferences, imagery direction, owner sign-off on the Component Plan in Section 5, the specific Uiverse elements chosen, and any additional component files proposed for reuse. |
| Team and imagery | Approved names/roles, credentials, biographies, photographs, and usage permissions. |
| Credibility | Approved client names/logos, relationship status/descriptions, testimonials, case studies, anonymised alternatives, and publication permissions. |
| Contact | Verified public phone/email, staff contact responsibilities, hours/timezone, public address if appropriate, social URLs, and approved response expectations. |
| Data handling | Email/phone providers, records retained, purpose, access, retention periods, deletion/backup practices, privacy contact, and applicable markets/jurisdictions. |
| Domain and email | Registrar, DNS provider, hosting, business-email provider, preferred canonical domain, important existing URLs/files, and authorised access roles. |
| Budget and ownership | Domain/hosting/email budget, account and repository ownership, billing contacts, and recovery responsibility. |
| Content operations | Update frequency, maintenance owner, approval owner for copy/design/policies, languages, launch target, and support expectations. |
| Test coverage | Representative browsers/devices, performance pages/settings, accessibility test approach, and launch acceptance owner. |

### Per-Service Content Brief

Before drafting each service, establish its exact name, intended customer, triggering problem, work performed, deliverables, exclusions, prerequisites, client responsibilities, engagement process, permitted timeline claims, pricing approach, and common questions.

### Existing Website and Domain Inventory

Identify the existing website, related domains, public downloads, important incoming links, and existing URLs that need redirects.

Document the current DNS and email setup, including MX, SPF, DKIM, and DMARC records where present. Domain migration must preserve business-email operation. Check inbound/outbound email before and after the change.

Confirm whether the old hosting also provides email or other business services before cancelling or changing it. Establish a cutover window and rollback responsibility.

---

## 8. Planning, Implementation Sequence, and Launch Acceptance

### Planning Completion

The current contact decision is settled: phone and email only.

Before implementation, resolve the material business/content gaps, confirm the design direction and assets, agree ownership/budget, and establish the migration requirements. Final policy wording follows confirmed data practices.

Implementation still requires explicit owner authorisation. Approval of this document alone does not authorise deployment.

### Implementation Sequence After Authorisation

1. Confirm approved content, assets, service scope, and contact details.
2. Prepare page structure, typography, accessible colour roles, and representative layouts for review.
3. Prototype the Component Plan on representative pages (header, hero, service cards, client strip). Measure JavaScript size, performance, and accessibility, and adjust before committing to every component.
4. Implement shared components, React islands, and all approved pages in Astro.
5. Add phone/email links, SEO metadata, favicon/sharing assets, policies, and a 404 page.
6. Verify content, functionality, accessibility (including reduced motion and no-JavaScript content), performance, responsive behaviour, and storage/network behaviour.
7. Prepare a review deployment, domain redirects, migration checks, and rollback procedure.
8. Obtain publication approval for the concrete reviewed site and carry out the agreed cutover.
9. Verify production pages, contact actions, and business email; hand over source, dependency list, and maintenance instructions.

### Launch Acceptance

| Area | Acceptance requirement |
| --- | --- |
| Content | All approved pages complete, business facts verified, service boundaries clear, no unresolved public placeholders. |
| Navigation | Direct Services navigation, Home links, footer links, mobile menu, skip link, and 404 route work. |
| Contact | Public phone/email accurate and selectable; phone/email actions tested on representative environments; no false message-sent confirmation. |
| Business workflow | Contact responsibilities and any published hours/response expectations confirmed; the business inbox can receive and reply to test email. |
| Client evidence | Relationships, claims, and asset permissions approved. |
| Themes | Light/dark presentation, manual selection, device preference, storage fallback, and readable branding checked. |
| Accessibility | Automated checks plus keyboard, zoom/text resize, screen-reader, focus, contrast, and reduced-motion checks completed; remaining findings resolved or explicitly reviewed. |
| Responsive behaviour | Agreed phone/tablet/desktop sizes and browsers checked, including long contact details and narrow screens. |
| Performance | Agreed representative pages tested under documented conditions; results recorded against the target, including JavaScript transferred. |
| Components and motion | Every component in the Component Plan checked for reduced-motion behaviour, no-JavaScript content visibility, keyboard operation, and pausable moving content. Excluded components are not present. Dependency and licence list recorded. |
| Privacy and storage | Actual network/storage inventory reviewed; policies match the deployed services and direct-contact practices; any necessary consent behaviour verified. |
| SEO and sharing | Titles, descriptions, canonical URLs, sitemap, structured data, favicon, social previews, indexing, and redirect behaviour verified. |
| Migration | Canonical domain/HTTPS correct; approved redirects work; DNS and business-email delivery verified; rollback available. |
| Handover | Firm/owner access confirmed; source, update instructions, account responsibilities, dependency maintenance, and recovery process documented. |

---

## 9. Revision Summary

### Revision 1

This revision:

- Replaces Netlify Forms with direct phone/email contact throughout.
- Removes form fields, submission processing, form storage, validation, spam-filtering requirements, and a submission confirmation page.
- Retains Netlify as an independent static-hosting choice, subject to account/budget checks.
- Defines manual business enquiry measurement and excludes automatic click/conversion tracking initially.
- Makes the main Services navigation link directly to the Services page.
- Clarifies contact-link limitations, external email/phone records, and retention responsibilities.
- Clarifies React-component compatibility with Astro.
- Adds actionable colour-contrast rules for the candidate palette and both themes.
- Adds specific business positioning, process, credibility, and FAQ requirements.
- Clarifies that a consent interface depends on actual technologies/jurisdictions, and that an AI assistant is outside the initial release.
- Expands owner inputs, migration requirements, testing, launch acceptance, and handover responsibilities.

### Revision 2

- Retains the full animated component plan (React Bits and selected Uiverse elements) instead of cutting it to a short list.
- Adds a Component Plan in Section 5, organised by page and area, with source, purpose, and usage rules for each component.
- Removes the form-related component choices (Uiverse input fields and submit button), since there is no contact form.
- Replaces the "minimal JavaScript" rules with progressive-enhancement rules: islands hydrate only when needed, and content works without JavaScript.
- Adds accessibility rules for animated text, looping content, hover effects, and reduced motion.
- Adds a prototype-and-measure step, an agreed trim order, and a Components and motion launch check, so the performance and accessibility targets stay protected.
- Excludes heavy or playful components (Gooey Nav, Bubble Menu, Flowing Menu, Infinite Menu, Galaxy, Aurora, Particles, Silk, Lanyard, and cursor effects).
