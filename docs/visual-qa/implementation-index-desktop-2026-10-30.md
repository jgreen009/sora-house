# Homepage implementation — desktop visual review

Date: 30 October 2026. Viewport: 1440 × 900, device scale 1. Scope: index desktop only.

## Evidence

Fresh captures from `tools/.frames/index-desktop/`, with `capture.json` recording page height 9371 px and 72 px header. Six image inputs inspected: f000, f002, f004, f006, f008 and f011. No images forwarded to the parent session.

## Findings

| ID | Frame | Element | Severity | Observation and consequence | Required change | Status |
|---|---|---|---|---|---|---|
| IDX-D-01 | f008 | Transition from coastal scene to gallery | Minor | The coastal background ends at approximately viewport y580 and the gallery display heading starts approximately y586. The title appears pressed against the section boundary, unlike the generous spacing elsewhere. | Add `.coastal-scene + .section { padding-top: var(--space-section); }` or apply the existing `section--dark` class to the coastal scene. The general `.section + .section { padding-top: 0; }` currently wins because the custom dark section does not match the existing dark-section spacing restoration rule. Rebuild and recapture this boundary. | Open |

## Accepted sampled areas

- f000: hero copy and action hierarchy are clear; title, supporting copy, actions, folio and navigation do not overlap. Transparent-header text remains legible over the illustrated scene. Fictional-concept disclosure is visible in the hero folio.
- f002: the rooms chapter heading uses a controlled three-column structure and readable text measures. The transition into the Atlantic spread preserves the shared gutters.
- f004: alternating room image/body layout holds, with readable room details, prices and actions. The Dune/Courtyard transition has ample separation. No image-container clipping or text overflow observed.
- f006: the material composition uses offset images with clear caption hierarchy; text and image columns remain separate and well aligned.
- f008: dark-section copy and chapter links are readable. The hierarchy within the coastal section works; the issue is the following gallery's missing top spacing.
- f011: closing invitation and footer preserve legibility, aligned columns and visible fictional-booking boundaries. The footer legal lines fit without clipping.

## Verification limits

This is a six-frame sample of the new homepage, not complete frame coverage. f001, f003, f005, f007, f009 and f010 were not opened. In particular, the booking bar and full gallery interior are not freshly accepted by this task. Static captures do not establish animation timing, keyboard operation, focus behaviour or reduced-motion compliance. The illustrations remain placeholder art-direction assets; this review does not certify them as final photography.
