# Temporary cloud preview

Requested 1 November 2026 for a 30-minute viewing window. Separate owner-private Sites URL, not a launch or a change to the main domain. Original local preview and synced sources remain untouched.

This branch wraps the existing tested static build (application/report base `aac26c9`) in a standalone Worker. Static bytes are embedded in the Worker source so no separate public asset endpoint bypasses expiry. The normal Astro application and its policy drafts are unchanged.

After deployment succeeds, an absolute deadline exactly 30 minutes after link issuance is signed with an independent server-side secret. Every request validates that same signed deadline; invalid/expired requests return 410. Loading a valid signed URL sets a Secure/HttpOnly temporary access cookie and redirects to a clean URL so native navigation/assets work. Refreshing cannot extend the signed deadline. Responses use no-store, and the existing review security/noindex headers remain. The signing secret is stored only as a Sites runtime secret, never in source or browser code.

The preview banner explains the temporary cookie and expiry. This preview infrastructure is distinct from the earlier local storage inventory and is not a final production privacy-policy approval. The cloud resource may remain registered, but website/asset access stops at the signed deadline independently of this computer staying awake.

`node scripts/test-temporary-preview.mjs` passed: signed landing, ordinary asset/page navigation, 404, missing secret, invalid signatures, expired query links and expired cookies. `node scripts/build-temporary-preview.mjs` produces the standalone Worker artifact. No form, database or email send path was added. Access remains owner-private; no custom domain/DNS changes or PR merge.
