# Sora House — Asset Manifest

Updated 30 October 2026.

Room-gallery follow-up: no assets were generated or replaced in the subsequent UX pass.
Room overview/related cards now use primary room images; compact mobile gallery crops
and the Suite desktop/mobile layout were reviewed. Booking thumbnails request smaller
responsive candidates. Full asset provenance and selection remain unchanged.

Deployment asset addition: assets/branding/social-preview.png is a 1200×630 raster
export of social-preview.svg, 31,127 bytes, produced with the existing Chrome
renderer and accepted in social-preview-png-deployment.md. It is a derived brand
asset, not a new generated photographic scene. The production build copies only
referenced assets, adds content hashes and records all 68 output URLs/sizes/source
paths in tools/.build/manifest.json; that build record is not publicly deployed.

## Current photographic library

Higgsfield MCP / FLUX 3 Image generated 21 image masters. Seventeen are selected for the site; four earlier secondary views are retired after room-pair continuity review. The selected set has 52 WebP derivatives (6,875,710 bytes across all sizes). The hero includes a 2736 px cover-aware variant. All 63 public photographic placements compile through the image map; the brand SVGs remain in use.

These images are AI-generated production assets, not an on-location photographic shoot. This provenance is internal production information. Full prompts, reference images, completed job IDs and source URLs are in assets/photography/generation-journal.json. Exact dimensions and byte sizes are in assets/photography/image-variants.json. Site routing is in assets/photography/image-map.json. Originals and retired assets are preserved.

The following paths are relative to assets/photography/.

| Asset | Original | Responsive derivatives | Higgsfield job | Usage | Review status |
|---|---|---|---|---|---|
| house-exterior | originals/house-exterior.png | web/house-exterior-640.webp<br>web/house-exterior-1120.webp<br>web/house-exterior-1920.webp<br>web/house-exterior-2736.webp | 03c3bfb1-edce-4a4a-912d-935a34e8ff01 | Home hero; house exterior | Accepted at review scale; active |
| room-dune | originals/room-dune.png | web/room-dune-640.webp<br>web/room-dune-1120.webp<br>web/room-dune-1600.webp | 5f4ad937-f6fe-450e-b42b-bb9294eecd89 | Dune Room primary | Accepted at review scale; active |
| room-courtyard | originals/room-courtyard.png | web/room-courtyard-640.webp<br>web/room-courtyard-1120.webp<br>web/room-courtyard-1600.webp | 35ed9bfd-d315-438f-a3ef-7ac0ba0b5088 | Courtyard Room primary | Accepted at review scale; active |
| room-atlantic | originals/room-atlantic.png | web/room-atlantic-640.webp<br>web/room-atlantic-1120.webp<br>web/room-atlantic-1600.webp | 72ce077b-f504-4a5d-8b15-27d110498c45 | Atlantic Room primary and gallery outlook | Accepted at review scale; active |
| room-suite | originals/room-suite.png | web/room-suite-640.webp<br>web/room-suite-1120.webp<br>web/room-suite-1600.webp | 2652fa55-f9a3-427d-96c5-dcbf8fc52de9 | Sora Suite primary | Accepted at review scale; active |
| detail-dune | originals/detail-dune.png | web/detail-dune-640.webp<br>web/detail-dune-1120.webp<br>web/detail-dune-1600.webp | 74c9433f-2b9c-417b-a859-776cb68d307c | Retired secondary view: continuity corrected in v2 | Retired; retained for provenance |
| detail-courtyard | originals/detail-courtyard.png | web/detail-courtyard-640.webp<br>web/detail-courtyard-1120.webp<br>web/detail-courtyard-1600.webp | e56e78fb-d53e-4c79-a0c0-2681833706eb | Retired secondary view: continuity corrected in v2 | Retired; retained for provenance |
| detail-atlantic | originals/detail-atlantic.png | web/detail-atlantic-640.webp<br>web/detail-atlantic-1120.webp<br>web/detail-atlantic-1600.webp | 2a15ebfd-37ea-4cde-9c19-3c227cd43247 | Retired secondary view: continuity corrected in v2 | Retired; retained for provenance |
| detail-suite | originals/detail-suite.png | web/detail-suite-640.webp<br>web/detail-suite-1120.webp<br>web/detail-suite-1600.webp | dff70d19-2621-4d26-bb7d-316a3aa4267f | Retired secondary view: continuity corrected in v2 | Retired; retained for provenance |
| dining-table | originals/dining-table.png | web/dining-table-640.webp<br>web/dining-table-1120.webp<br>web/dining-table-1600.webp | b1afc1f0-c978-47b4-a721-6ea4cb5e8799 | Dining room and gallery | Accepted at review scale; active |
| quiet-bath | originals/quiet-bath.png | web/quiet-bath-640.webp<br>web/quiet-bath-1120.webp<br>web/quiet-bath-1600.webp | 141a97f5-0e28-419e-8899-cfbb1c0502b2 | Slow Rituals and gallery | Accepted at review scale; active |
| coastal-path | originals/coastal-path.png | web/coastal-path-640.webp<br>web/coastal-path-1120.webp<br>web/coastal-path-1600.webp | 7334319b-7f38-499d-9bd5-3f9836f90c2d | Coastal scenes, paths and room outlook | Accepted at review scale; active |
| lime-plaster | originals/lime-plaster.png | web/lime-plaster-640.webp<br>web/lime-plaster-1120.webp<br>web/lime-plaster-1600.webp | ac84723c-7d86-469a-87ed-8bbd3cf2ed24 | Material composition, gallery and room detail | Accepted at review scale; active |
| arrival-path | originals/arrival-path.png | web/arrival-path-640.webp<br>web/arrival-path-1120.webp<br>web/arrival-path-1600.webp | b1dbd255-700f-4511-9098-100e03d3c4e0 | Arrival, room banner, gallery and contact | Accepted at review scale; active |
| facade-detail | originals/facade-detail.png | web/facade-detail-640.webp<br>web/facade-detail-1120.webp<br>web/facade-detail-1600.webp | 27097652-7ed0-458b-86be-af16352ccb0f | Story architecture and gallery | Accepted at review scale; active |
| oak-detail | originals/oak-detail.png | web/oak-detail-640.webp<br>web/oak-detail-1120.webp<br>web/oak-detail-1600.webp | 558fc5ef-b0b2-4d92-874c-a942fc06d0c0 | Material composition and room/gallery detail | Accepted at review scale; active |
| linen-detail | originals/linen-detail.png | web/linen-detail-640.webp<br>web/linen-detail-1120.webp<br>web/linen-detail-1600.webp | 3682149d-cbe2-483f-aade-65ca59c0ba1c | Linen composition and gallery | Accepted at review scale; active |
| detail-dune-v2 | originals/detail-dune-v2.png | web/detail-dune-v2-640.webp<br>web/detail-dune-v2-1120.webp<br>web/detail-dune-v2-1600.webp | 6a5fcb28-4fb8-47a4-9726-a4e4c03662ce | Dune Room matched detail | Accepted at review scale; active |
| detail-courtyard-v2 | originals/detail-courtyard-v2.png | web/detail-courtyard-v2-640.webp<br>web/detail-courtyard-v2-1120.webp<br>web/detail-courtyard-v2-1600.webp | 4e4b538b-5faa-4895-92e1-aedbde458997 | Courtyard Room matched detail and gallery | Accepted at review scale; active |
| detail-atlantic-v2 | originals/detail-atlantic-v2.png | web/detail-atlantic-v2-640.webp<br>web/detail-atlantic-v2-1120.webp<br>web/detail-atlantic-v2-1600.webp | 1876cebc-164b-4bdd-aab7-fb8a6949ef4e | Atlantic Room matched detail | Accepted at review scale; active |
| detail-suite-v2 | originals/detail-suite-v2.png | web/detail-suite-v2-640.webp<br>web/detail-suite-v2-1120.webp<br>web/detail-suite-v2-1600.webp | dd652340-b782-415c-bfaa-a94f265397ae | Sora Suite matched lounge | Accepted at review scale; active |

### Production records and review assets

- generation-journal.json: model, prompts, references and job provenance for all 21 masters. Four unsubmitted requests returned busy/rate-limit errors and were retried; the completed IDs identify the actual outputs.
- image-variants.json: all 64 exported WebP files, original dimensions, source URLs and byte sizes; includes 12 retired derivatives.
- image-map.json: 40 legacy art-source paths routed to 17 selected photographic assets.
- qa/asset-sheet-1.jpg, qa/asset-sheet-2.jpg, qa/asset-sheet-3.jpg, qa/asset-sheet-4.jpg: first 16 generated support images, reviewed at contact-sheet resolution.
- qa/asset-sheet-5.jpg: four corrected room details, accepted against their corresponding masters.
- docs/visual-qa/asset-house-exterior-2026-10-30.md, asset-library-2026-10-30.md and asset-room-corrections-2026-10-30.md record the written findings.

Review is sufficient for the selected website compositions at the inspected scale. Native-resolution hardware/fixture inspection and all remaining page/state crops are not claimed complete. Keep the four retired secondary views out of the active mapping.

## Original branding, vector studies and fonts

The inventory below preserves the original assets and their historical replacement notes. All 40 procedural vector studies are now archived sources: active page output uses the photographic mapping above. Historical notes about replacing those studies have been fulfilled by that mapping; they are not current outstanding production tasks.

## 1. Branding — `assets/branding/`

| File | Usage | Provenance | Description | Status | Known defects / replacement |
|---|---|---|---|---|---|
| `wordmark-horizontal-ink.svg` | Header and footer on light surfaces | HAND-BUILT-SVG | "SORA HOUSE" in Instrument Serif, wide tracking, dark ink | Reviewed | Convert type to outlines for print handover |
| `wordmark-horizontal-ivory.svg` | Header and footer over imagery | HAND-BUILT-SVG | Same lockup, ivory | Reviewed | As above |
| `wordmark-stacked-ink.svg` | Brand board, print, large lockups | HAND-BUILT-SVG | "SORA" over "HOUSE" with optical indent | Reviewed | As above |
| `wordmark-stacked-ivory.svg` | Dark-surface stacked lockup | HAND-BUILT-SVG | Same, ivory | Reviewed | As above |
| `mark-horizon-ink.svg` | Favicon, footer signature, booking states | HAND-BUILT-SVG | Circle cut by a broken horizon line | Reviewed | Minimum size 20 px |
| `mark-horizon-ivory.svg` | Mark on dark surfaces | HAND-BUILT-SVG | Same, ivory | Reviewed | Minimum size 20 px |
| `favicon.svg` | Browser tab | HAND-BUILT-SVG | Mark inside a coastal square | Reviewed | Verify at 32 px in browser chrome |
| `social-preview.png` | Production Open Graph / social image | DERIVED-RASTER | 1200 × 630 export of the brand SVG | Reviewed | Generated once with the existing browser renderer; regenerate after brand edits |
| `social-preview.svg` | Social share card (1200×630) | HAND-BUILT-SVG | Wordmark, mark, ivory field, tagline | Reviewed | Regenerate if the tagline changes |

## 2. Architecture — `assets/architecture/`

| File | Usage | Provenance | Description | Status | Known defects / replacement |
|---|---|---|---|---|---|
| `hero-exterior.svg` | Home hero (1920×1080) | PROCEDURAL-SVG | Low limestone house with a run of six arches against sea and sky | Archived source | Replace with photograph: late-afternoon arrival, low sun raking the facade |
| `arrival.svg` | Approach sequence, 4:3 portrait | PROCEDURAL-SVG | Exterior with four arches, closer crop | Archived source | Replace with the arrival walk: gravel, olive shadow, open door |
| `exterior-detail.svg` | Portrait detail of one arch bay | PROCEDURAL-SVG | Two arches, wall texture, raking light | Archived source | Replace with material detail: lime plaster and shadow |
| `landscape-wide.svg` | Rooms page banner (1920×900) | PROCEDURAL-SVG | Wide horizon without the building; dune and sea bands | Archived source | Replace with the landscape the house sits in, no building in frame |
| `landscape-coast.svg` | Coastal context image | PROCEDURAL-SVG | Dune curve meeting the Atlantic | Archived source | Replace with the path down to the water |

## 3. Rooms — `assets/rooms/`

| File | Usage | Provenance | Description | Status | Known defects / replacement |
|---|---|---|---|---|---|
| `dune-room-main.svg` | Dune main view (4:5) | PROCEDURAL-SVG | Interior with an arched opening to sand and sea | Archived source | Photograph: bed, arched window, low afternoon light |
| `dune-room-02.svg` | Dune secondary | PROCEDURAL-SVG | Rectangular interior with bed and window | Archived source | Photograph: bed detail and linen |
| `dune-room-03.svg` | Dune detail | PROCEDURAL-SVG | Linen and shadow study | Archived source | Photograph: linen, shadow line, oak edge |
| `courtyard-room-main.svg` | Courtyard main view (4:5) | PROCEDURAL-SVG | Interior with arched opening onto a walled courtyard | Archived source | Photograph: courtyard light through an arch |
| `courtyard-room-02.svg` | Courtyard secondary | PROCEDURAL-SVG | Rectangular interior, bed and square window | Archived source | Photograph: square window, courtyard wall |
| `courtyard-room-03.svg` | Courtyard detail | PROCEDURAL-SVG | Plaster and light study | Archived source | Photograph: lime plaster texture |
| `atlantic-room-main.svg` | Atlantic main view (4:5) | PROCEDURAL-SVG | Wide interior with a long horizon window | Archived source | Photograph: sea horizon through the room's only window |
| `atlantic-room-02.svg` | Atlantic secondary | PROCEDURAL-SVG | Bed with a framed sea view | Archived source | Photograph: bed and sea in one frame |
| `atlantic-room-03.svg` | Atlantic detail | PROCEDURAL-SVG | Dune and sea study | Archived source | Photograph: the coast from the terrace |
| `sora-suite-main.svg` | Suite main view (4:5) | PROCEDURAL-SVG | Larger interior with an arched opening and a low table | Archived source | Photograph: suite living space, morning light |
| `sora-suite-02.svg` | Suite secondary | PROCEDURAL-SVG | Arched interior with seating | Archived source | Photograph: seating corner and reading light |
| `sora-suite-03.svg` | Suite detail | PROCEDURAL-SVG | Oak and stone detail study | Archived source | Photograph: oak joinery |

## 4. Experiences — `assets/experiences/`

| File | Usage | Provenance | Description | Status | Known defects / replacement |
|---|---|---|---|---|---|
| `sora-table.svg` | Dining image (4:3) | PROCEDURAL-SVG | Long table with chairs in a light room | Archived source | Photograph: the table set for two, no people |
| `sora-table-detail.svg` | Table detail; gallery tile 07 | PROCEDURAL-SVG | Oak and stone study | Archived source | Photograph: place setting, oak grain |
| `coastal-paths.svg` | Coastal path image (4:3) | PROCEDURAL-SVG | Path along the dune toward the sea | Archived source | Photograph: path, marram grass, sea |
| `coastal-detail.svg` | Coastal detail | PROCEDURAL-SVG | Dune curve and water | Archived source | Photograph: dune grass against the Atlantic |
| `slow-rituals.svg` | Wellness / slow rituals image (4:3) | PROCEDURAL-SVG | Bath, stone and steam study in soft light | Archived source | Photograph: stone bath, low light |

## 5. Story — `assets/story/`

| File | Usage | Provenance | Description | Status | Known defects / replacement |
|---|---|---|---|---|---|
| `architecture.svg` | About page, architecture movement (4:5) | PROCEDURAL-SVG | Exterior with three arches, closer crop | Archived source | Photograph: the facade in morning light |
| `materials.svg` | Materials chapter | PROCEDURAL-SVG | Plaster and light study | Archived source | Photograph: lime plaster, oak, stone samples in situ |
| `lights.svg` | Light chapter | PROCEDURAL-SVG | Ring-light study | Archived source | Photograph: late light across a wall |
| `morning.svg` | Morning chapter | PROCEDURAL-SVG | Interior with arched opening in early light | Archived source | Photograph: breakfast table, early light |
| `oak-detail.svg` | Oak chapter | PROCEDURAL-SVG | Oak joinery detail | Archived source | Photograph: oak handrail or joinery |

## 6. Gallery — `assets/gallery/`

| File | Usage | Provenance | Description | Status | Known defects / replacement |
|---|---|---|---|---|---|
| `g01.svg` | Gallery tile, exterior | PROCEDURAL-SVG | Three-arch exterior, portrait | Archived source | Photograph: facade |
| `g02.svg` | Gallery tile, plaster detail | PROCEDURAL-SVG | Plaster texture, landscape | Archived source | Photograph: plaster |
| `g03.svg` | Gallery tile, coastal path | PROCEDURAL-SVG | Path to the sea | Archived source | Photograph: path |
| `g04.svg` | Gallery tile, interior | PROCEDURAL-SVG | Interior with square window | Archived source | Photograph: room interior |
| `g05.svg` | Gallery tile, dining | PROCEDURAL-SVG | Long table | Archived source | Photograph: table |
| `g06.svg` | Gallery tile, wellness | PROCEDURAL-SVG | Bath and steam | Archived source | Photograph: bath |
| `g07.svg` | Gallery tile, landscape | PROCEDURAL-SVG | Horizon without the building | Archived source | Photograph: the view |
| `g08.svg` | Gallery tile, linen | PROCEDURAL-SVG | Linen study | Archived source | Photograph: linen |
| `g09.svg` | Gallery tile, exterior portrait | PROCEDURAL-SVG | Five-arch facade, close crop | Archived source | Photograph: arches |
| `g10.svg` | Gallery tile, interior with arch | PROCEDURAL-SVG | Arched interior | Archived source | Photograph: room interior |
| `g11.svg` | Gallery tile, dune and sea | PROCEDURAL-SVG | Dune curve and water | Archived source | Photograph: coast |
| `g12.svg` | Retained unused study | PROCEDURAL-SVG | Table in warm light | Archived source | Duplicates g05 composition; replaced in gallery tile 07 by sora-table-detail.svg |

## 7. Booking — `assets/booking/`

| File | Usage | Provenance | Description | Status | Known defects / replacement |
|---|---|---|---|---|---|
| `booking-visual.svg` | Booking page and contact page side image | PROCEDURAL-SVG | Exterior with four arches, close crop | Archived source | Photograph: the door at arrival |

## 8. Fonts — `assets/fonts/`

| File | Usage | Provenance | Description | Status |
|---|---|---|---|---|
| `fonts.css` | `@font-face` declarations for both families | — | Self-hosted Instrument Serif and DM Sans | Reviewed |
| `google-fonts.css` | Reference stylesheet kept for provenance | — | Upstream Google Fonts CSS | Reference only |
| `jizBRFtNs2ka5fXjeivQ4LroWlx-6zsTjmbI.woff2` | Instrument Serif regular | FONT | latin subset | Reviewed |
| `jizBRFtNs2ka5fXjeivQ4LroWlx-6zUTjg.woff2` | Instrument Serif italic | FONT | latin subset | Reviewed |
| `jizHRFtNs2ka5fXjeivQ4LroWlx-6zAjgn7MsNo.woff2` | DM Sans 300 | FONT | latin subset | Reviewed |
| `jizHRFtNs2ka5fXjeivQ4LroWlx-6zAjjH7M.woff2` | DM Sans 400 | FONT | latin subset | Reviewed |
| `rP2Hp2ywxg089UriCZ2IHSeH.woff2` | DM Sans 500 | FONT | latin subset | Reviewed |
| `rP2Hp2ywxg089UriCZOIHQ.woff2` | DM Sans 700 | FONT | latin subset | Reviewed |

Font licences are distributed with the files under the SIL Open Font License.

## 9. Assets referenced in the prototype but not yet in `assets/`

| Needed | Used by | Status |
|---|---|---|
| Room main image for Dune / Courtyard / Atlantic / Suite on the four room pages | `room.body.html` via `rooms.json` gallery entries | Resolved — the builder maps `gallery[0].file` per room; confirm each slug resolves to the matching file |
| `assets/video/` folder | Video documentation | Empty — reserved for Phase 2 motion |

## 10. Phase 2 replacement brief (summary)

Every placeholder follows the same rules, stated in full in
`prompts/imagery/` and `documentation/creative-direction.md`:

1. Real light, not studio light. One clear hour per day.
2. Materials from the house: lime plaster, oak, linen, stone, seawater.
3. No people in staged poses; hands and working are acceptable.
4. No drone shots, no stock drone coastline, no "luxury" styling cues.
5. Colour: ivory, sandstone, taupe, coastal green, ink. Nothing saturated.
6. Composition leaves room for the house's grid: prefer horizontal structure and
   a single clear horizon.
