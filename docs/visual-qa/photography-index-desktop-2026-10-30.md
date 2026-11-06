# Homepage photography — desktop visual review

Date: 30 October 2026. Viewport: 1440 × 900, device scale 1. Scope: fresh homepage photography and customer-facing copy.

## Evidence

Inspected exactly six images from `tools/.frames/index-desktop/`: f000, f002, f004, f006, f008 and f010. Current `capture.json` records total height 9571 px and header 72 px; f000 file timestamp is 30 October 2026 16:27:20. This is a new photographic capture, distinct from the earlier 9371 px illustrated-page review. No images forwarded and no source files changed.

## Findings

| ID | Evidence | Element | Severity | Observation | Concrete fix | Status |
|---|---|---|---|---|---|---|
| PHOTO-IDX-D-01 | f000, title around x420–650 / y315–535 | Hero title over pale stone | Minor | The right ends of “closer” and italic “less” cross the illuminated masonry. Their pale strokes have noticeably less separation than the left side of the title. The text remains decipherable at this size, but the photographic background weakens the principal heading's consistency. No numeric contrast compliance claim is made from this visual observation. | Extend the stronger horizontal scrim across the actual title width: in `.hero__scrim`, trial `.42` opacity at 46% and fade to transparent at 72%, retaining the dark left edge. Preserve the clear architecture on the right; recapture f000 to verify the title and image balance. | Open |

## Accepted sampled areas

- f000: the wide exterior crop retains the sea at left and repeating stone arches at right. Architecture fills the viewport without stretched geometry or an obviously broken join. Header, title, body copy, actions and folio remain separated. No project-status label appears in the visible customer copy.
- f002: exterior-to-rooms transition retains shared gutters and generous separation. The room chapter heading, comparison action and Atlantic image introduction fit their columns. The top of the Atlantic image is coherent; its complete crop is outside this frame.
- f004: Dune image tail and Courtyard room image form a coherent material family. The courtyard arch frames the olive tree naturally, with credible bed, chair and lamp proportions. Canonical visible data is correct: Dune 26 m² / 2 guests / €180; Courtyard 32 m² / 2 guests / €230. Captions, metadata and rules do not collide.
- f006: offset plaster and stone/oak detail crops carry the same warm light and restrained colour as the room photographs. No visible texture tiling, stretched arch or floating edge. The three-column material composition leaves clear separation between type and images.
- f008: coastal chapter type and links are legible on the dark surface. The gallery heading now has substantial space after the dark boundary, so the earlier boundary-crowding defect is visually resolved in this capture. No new overlap or inconsistent gutter is visible.
- f010: visible dining-table crop is coherent with the oak palette. Gallery caption and link fit, followed by a clean sandstone invitation with readable heading, paragraph and action. No fictional/demo framing or false success statement is visible in this sample.

## Verification limits

The six-image budget is exhausted. No additional images opened. This sample does not certify the complete coastal photograph, the full gallery composition, the complete Atlantic/Suite crops, booking bar or footer; their uninspected areas fall in other frames. Static frames cannot verify focus states, lightbox behaviour, motion, accessibility compliance, or factual operating claims beyond the visible canonical room data. The report evaluates visible crop, tonal continuity, contrast and geometry; it does not independently verify that generated imagery depicts a built property.
