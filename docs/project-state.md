# Sora House — Project State

Updated 30 October 2026, Vercel deployment preparation complete.

## Vercel deployment readiness

A dependency-free Node 24 production build is ready in dist. Root package.json,
package-lock.json and vercel.json configure the Other framework preset, npm run build,
dist output, clean URLs and a static custom 404. Fifteen visitor-facing pages are
published by the build; the sixteenth internal component page stays local.

The build fingerprints 68 runtime assets and validates its public graph. The final
output is about 7.42 MB. Original PNGs, retired variants, generation records, QA
images and internal documents are excluded. Social metadata uses a reviewed
1200×630 PNG derived from the brand SVG.

SITE_URL optionally supplies the production HTTPS origin. Otherwise Vercel system
variables supply it. Production canonical/share URLs and a twelve-entry sitemap
are generated when an origin is known; preview builds suppress indexing/sitemaps.
No placeholder domain is shipped by the normal local build.

Verified: npm run build, npm test, metadata environment cases and 60 production
page/viewport browser checks with the full targeted interaction suite. The original
64-page/viewport source checks remain a separate baseline. Production preview is
http://127.0.0.1:4174; the original design preview stays on port 4173.

Deployment instructions: README.md. No Vercel project was linked or published,
no account credentials were requested, and no Git commit was made. Reservation,
payment and enquiry delivery services remain separate integration work.

## Current phase

Working website: sixteen pages, shared brand system, responsive layouts, interactions and room planning. The user requires realistic professional project language. Their global preference is saved in `C:/Users/OWNER/.codex/AGENTS.md`; this project's AGENTS.md and brand principle are updated accordingly.

## Completed this pass

- Removed old project-status framing from public pages, navigation/footer, metadata, social-preview artwork and its generator, and runtime UI messages.
- Booking continues as room/date planning while online reservations are unavailable. Final action opens stay details and does not claim a booking. Contact submission explicitly reports that a message was not sent; no backend or payment was introduced.
- Produced 21 Higgsfield FLUX 3 images: 17 selected sources and four retired secondary views. Exterior master informed the main asset set; corrected room details use their own room-master references.
- The 17 selected sources have 52 responsive WebP derivatives, about 6.88 MB total across all sizes. Hero includes a 2736 px variant and cover-aware sizes; other scenes use 640/1120/1600 px variants.
- All 63 photographic image placements across generated pages now compile from the original art paths to WebP. Forty SVG art studies remain as source/archive; branding SVGs remain in use.
- Exterior and four labelled contact sheets reviewed in isolated contexts. Original secondary room views had continuity differences; four corrected details passed matching review and replaced those placements.
- Homepage desktop/mobile photography QA found no major layout defects. Stronger hero scrim addresses desktop contrast; larger source and corrected sizes address mobile softness. Dedicated changed-frame verification is logged separately.
- Updated active image-generation brief, handoff, asset provenance and visual QA records. No new dependencies or commits.

## Room browsing and planning-state follow-up

- Repaired a functional gap: all four room pages now include the shared lightbox fragment. Main and secondary image buttons open three-image groups, support arrows/Escape and restore focus.
- Room headings/rates now precede the gallery. Mobile galleries use one main image and two thumbnails on a shared row. Suite desktop/mobile and overlay states passed isolated visual review.
- Room overview and related cards, comparison table and mobile comparison cards are generated from canonical room data. At ≤640 px every comparison price and action is visible without horizontal scrolling. Reviewed mobile comparison cards pass.
- Expanded planning summaries now include arrival/departure. The booking review/expanded state passed sampled review before the date-row refinement; the added rows are functionally verified and recaptured.
- Reveal styling now enhances visible content when JavaScript runs; content and a useful notice remain readable with scripts disabled. Main is focusable for skip navigation.
- Lightbox backdrop increased to 98% opacity after a visible underlying menu icon was reported; changed mobile overlay was recaptured and verified fixed.
- Booking thumbnails now use actual 80/120 px size hints. Local measurements confirm 640 px candidates, no broken images and no external asset requests on the measured pages.
- Added page/design-system/creative-direction/accessibility-performance/report documentation, automated page-copy export, sixteen copy files and brand-voice reference. Existing handoff and motion guide updated.

## Validation

`node tools/build-prototype.mjs` generates all 16 pages. `node tools/validate-site.mjs --http` passes 64 page/viewport checks at 1440/768/390/360 px and targeted booking, capacity, date limits, price recomputation, room comparison, menu/lightbox, accordion and contact checks. It also rejects unwanted project framing, verifies unsent enquiry status, exercises each room lightbox, checks compact mobile gallery/comparison behaviour and tests content without JavaScript.

Latest browser results: `docs/visual-qa/browser-validation-2026-10-30.json`. New asset and page reports: `docs/visual-qa/asset-*.md`, `photography-index-*.md`, and `verification-photographic-hero-*.md`. Fresh capture/stitch tooling uses installed Chrome, recorded scroll offsets and browser canvas; no Python dependency.

## Important files

- Content/catalogue: `content/room-data/rooms.json`.
- Page sources: `design/prototypes/pages/`; generated pages: `design/prototypes/*.html`.
- CSS: `design/prototypes/css/tokens.css`, `sora.css`, `components.css`.
- Runtime: `design/prototypes/js/sora.js`; generated catalogue: `js/room-data.js`.
- Photography: `assets/photography/originals/`, `web/`, `qa/`.
- Provenance/prompts/jobs: `assets/photography/generation-journal.json`.
- Derivative sizes/bytes: `assets/photography/image-variants.json`.
- Original-art to photograph routing: `assets/photography/image-map.json`.
- Preview: `node tools/serve.mjs`, http://127.0.0.1:4173/design/prototypes/index.html.

## Outstanding / next action

1. Continue isolated visual review of remaining room-category crops, planning errors/final stage and filtered lightbox content. Reviewed Suite, comparison and planning-review areas are recorded in the latest QA log; do not duplicate them.
2. Complete manual accessibility evaluation and deployed performance/routing checks. The documentation and copy-export baseline is delivered; update it as remaining findings are resolved.
3. Online reservation/inventory, payment, enquiry delivery, CMS and deployment remain separate implementation work. Do not imply those services are connected.
4. Keep generated-media provenance internal and accurate; do not describe these assets as a real on-site photographic shoot. The earlier four secondary room views are retained but retired from site use.

Current local preview serves the updated files. This checkout is not a Git repository. No deployment occurred.

Final follow-up verification: the HTTP suite passes all 64 page/viewport checks and ten grouped behaviour checks. Native no-script enquiry disabling is checked alongside readable content. All four changed room routes, rooms overview, contact and newly supported planning/lightbox states have fresh capture/stitch outputs. Scoped visual acceptance is recorded in docs/visual-qa.md; remaining uninspected states stay in the outstanding list.
