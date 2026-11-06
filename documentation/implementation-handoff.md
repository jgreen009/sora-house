# Sora House — implementation handoff

Updated 30 October 2026.

## Run and edit

Node.js and installed Google Chrome are required. The existing tools dependency is playwright-core; no dependency was added.

- Build: `node tools/build-prototype.mjs`.
- Preview: `node tools/serve.mjs`; http://127.0.0.1:4173/design/prototypes/index.html.
- Validate: `node tools/validate-site.mjs`; add `--http` while preview is running.
- Capture: `node tools/shoot-frames.mjs index mobile`; comma-separated names select pages and `all` selects both viewports.
- Room-choice capture: `node tools/shoot-frames.mjs book mobile room-choice`.
- Copy exports: `node tools/export-copy.mjs` refreshes content/pages/*.md.
- Local asset diagnostics: `node tools/measure-performance.mjs` while the preview runs.
- Stitch: `node tools/stitch-frames.mjs index-mobile`; omit targets to process captures with recorded offsets.

Edit bodies in design/prototypes/pages/, not generated HTML. The builder generates sixteen pages and js/room-data.js. Keep room areas, capacity, counts and rates in content/room-data/rooms.json. Shared CSS loads tokens, base and components in that order.

## Photography

Higgsfield MCP / FLUX 3 Image produced the photographic library. Seventeen selected masters and fifty-two responsive WebP derivatives drive the current pages. Four earlier secondary views are retained but retired after continuity corrections. The hero uses a 2736 px variant and a cover-aware sizes expression for portrait screens.

assets/photography/image-map.json maps forty original vector paths to the selected photographs at build time, including room lightbox full-image paths. image-variants.json records dimensions, byte sizes and URLs. generation-journal.json preserves every prompt, reference and completed job. Original PNGs and vector studies remain intact. Small booking thumbnails use 80/120 px size hints. Use web/ derivatives in deployed page output; originals and production QA files are source material, not necessary runtime dependencies.

## Service behaviour and wording

Treat the site as real professional work and use production-facing copy. User preference is saved globally and in the project instructions. Do not reintroduce project-status labels. Keep factual accuracy: no invented staff, awards, service hours, testimonials or completed transactions.

Online reservations and enquiry delivery are not yet connected. Visitors can choose dates and a room and view stay details, without reserving inventory or making payment. The contact form reports that its message was not sent. The shared lightbox is compiled from pages/lightbox.fragment.html into the gallery and all four room routes. Room headings precede their images, mobile thumbnails share a row, and mobile comparison cards replace the wide table below 641 px. Both summary locations include dates.

Before activating either service, connect and verify the actual booking/enquiry backend and revise availability messages to match it.

Today's date uses Europe/Lisbon. Date-only arithmetic uses UTC. A stay is one to fourteen nights and one room, with two guests per room or three in the suite. Both summaries and the stay-details page derive rates from the catalogue. URL parameters contain room/dates/guest count/reference, with no personal details. Privacy copy explains browser-history behaviour.

## QA and next steps

Build and JavaScript syntax checks pass. Browser validation covers all sixteen pages at four widths, key state transitions, unwanted public framing and the unsent-contact status. Photographic asset review, matched room corrections, home desktop/mobile and hero correction reports are under docs/visual-qa/.

Page specifications, design-system implementation, interaction guide, accessibility/performance notes and all sixteen copy exports are now present. Complete remaining isolated page/state visual reviews and full accessibility/performance checks. CMS, reservation/inventory, payment, enquiry delivery, analytics and deployment remain separate work. No commit or deployment occurred.

No-script service guard: the enquiry fields and submit action are disabled in source HTML and enabled only by the local form handler. This prevents a native fallback submission when scripts are disabled. Public content remains readable.

## Vercel handoff

Root npm run build prepares dist with 15 public clean routes and hashed assets.
The original source build still generates 16 design pages, including components.
The Vercel build has no install dependencies or browser requirement. Node 24 is pinned.

Root npm test verifies packaged HTTP behaviour; npm run test:metadata validates
domain/preview metadata and restores the normal build. npm run test:browser runs
the browser suite against the production preview on port 4174. Full setup, optional
SITE_URL behaviour and deployment commands are in ../README.md.

No cloud deployment or backend activation was performed. The current reservation
and enquiry status messages remain accurate after publication of the static site.
