# Photography QA — home, mobile — 30 October 2026

Viewport: 390 × 844 CSS px; capture DSF 2. Reviewed six fresh frames from `tools/.frames/index-mobile/`: f000 (y=0), f002 (1544), f004 (3088), f007 (5404), f009 (6948), f011 (8492). These are the new photographic captures, not the earlier SVG implementation captures. Six-image context budget exhausted; no further images opened.

## Result

Sampled layout accepted with one minor photographic delivery defect and two minor copy/art-direction observations. No blocker, clipping, collision, broken gallery placement, or illegible text observed in these frames. This is sampled acceptance, not full-page or interaction acceptance.

| Frame | Element | Finding | Severity | Concrete action | Status |
|---|---|---|---|---|---|
| f000 | Hero photo | Architecture is visibly softer than the arrival and room photos in the following sampled frames. The panoramic 1920 × 1078 source fills a portrait 390 × 844 hero by a substantial centre crop. `sizes="100vw"` selects a resource for the viewport width despite cover requiring a much wider source, which can compound the enlargement. The crop still retains arches and readable text, but the property's first photographic impression loses texture. | Minor | Prefer a portrait hero derivative with the same approved architecture and composition. Alternatively make the hero's responsive resource sizing account for cover width and use the largest existing source at narrow portrait sizes. Re-capture f000 to confirm texture and retain the current readable scrim. | Open |
| f004 | Dune image caption | The visible outlook is natural dunes; “Garden outlook” is less specific than the image and room name. The source alt text calls it a dune garden, so this is an art-direction/copy consistency refinement rather than a factual contradiction. | Minor | Use “Dune outlook” for the Dune spread caption in the prototype generator/source. | Open, optional polish |
| f004 | Dune description | “The quietest place to sleep” is a comparative operational claim not established by the photograph or numerical room data. It is inherited from `content/room-data/rooms.json`, not introduced by this asset pass. | Minor | Verify the claim with the owner, or revise the canonical room short description and rebuild, for example “Our smallest rooms, with arched openings onto the dunes.” Keep all generated room descriptions in sync. | Open, content verification |

## Accepted sampled details

- f000: wordmark, menu, eyebrow, two-line title, body copy and both calls to action remain legible against the hero. The dominant arch is retained, and the marker stays above the viewport bottom. No overlap.
- f002: arrival image has convincing architectural/material detail, a useful approach crop, and an orderly caption. Intro prose is readable with consistent 20 px page gutters. The transition to rooms has deliberate breathing space without clipping.
- f004: bed, arched openings and dune context remain visible. The Dune specification strip is a coherent single row; 26 m², 2 guests and €180/night match canonical data. Room CTA fits the content width.
- f007: material images remain distinct and aligned to the mobile grid. Captions stack cleanly with room for both lines. Oak is visible at the right of the detail, though stone occupies more area; no corrective crop is required. The coastal image begins cleanly inside its dark chapter.
- f009: gallery is single-column, retains the path and horizon, and separates image captions clearly. The opening heading and supporting copy fit. The coastline image repeats the preceding coastal chapter intentionally; no automatic request to regenerate it.
- f011: closing invitation and booking CTA have clear hierarchy and contrast on sandstone. Visible copy is professional and contains no fictional/demo/project-status framing or invented credibility. It does not claim that a reservation has been completed.

## Limits

The assigned f009 is the gallery opening, not the body of the coastal chapter. f007 includes only the beginning of its coastal photograph. No acceptance is claimed for coastal body text, the uninspected booking bar, other room spreads, complete gallery sequence, footer, menu interactions or booking flow. Cut text at the top/bottom of scrolled frames is a capture boundary, not a layout defect. No code was edited and no images are forwarded.
