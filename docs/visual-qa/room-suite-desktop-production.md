# Sora Suite — desktop production visual review

Date: 30 October 2026. Viewport: 1440 × 900, device scale 1.
Source: `tools/.frames/room-suite-desktop/capture.json` and all six fresh frames, `f000.png`–`f005.png`. Frame offsets: 0, 828, 1656, 2484, 3312 and 3562 px. Page height: 4462 px; fixed header: 72 px.

Reviewed against `AGENTS.md`, `docs/visual-qa.md`, `docs/design-decisions.md`, `design/brand/brand-identity.md` and `content/room-data/rooms.json`. Six images inspected in this isolated context; none forwarded.

## Result

**Pass / Accepted for the captured desktop state.** No blocker, major or actionable minor visual defect found. No source change required.

| Area | Evidence | Finding | Severity / action |
|---|---|---|---|
| Gallery composition and crops | f000 | The 8/4 composition reads clearly. Main scene keeps bedroom, lounge, fireplace and sea opening visible; upper companion presents the same furniture/material language from another crop. Lower architectural detail provides texture without breaking continuity. No image stretching, visible seam or clipped primary subject. | Pass; retain. |
| Header and gutters | f000–f005 | Solid ivory header remains legible; navigation, selected Stay underline and outlined booking action are aligned. Gallery, room content, related cards and footer share consistent side alignment. | Pass; retain. |
| Main heading, metadata and form | f000–f001 | Display heading and introductory copy have a clear hierarchy. Four metrics are separated and legible. Coastal availability panel gives fields and action sufficient contrast and spacing. The clipped top of the heading in f001 is normal scroll position under the fixed header, not page clipping. | Pass; retain. |
| Room facts and price | f001, f003–f005 | Suite shows 54 m², 3 guests, 1 room and €430 per night, matching canonical data. Repeated €430 CTA price agrees. Related Atlantic and Courtyard cards show 38 m² / 2 / €310 and 32 m² / 2 / €230 respectively. | Pass; retain. |
| Typography and spacing | f001–f003 | Serif introduction and DM Sans supporting copy remain readable. Narrative column has controlled measure. Sandstone amenities section separates the two lists cleanly; generous section spacing follows the approved calm editorial rhythm. No collision, orphaned control, broken rule or unintended wrap observed. | Pass; retain. |
| CTA hierarchy and service wording | f001, f003 | Light form action stands out on coastal; later ink action stands out on ivory. Header action remains secondary. The form visibly states “Online reservations are not yet available.” No project-status disclaimer or completed-reservation assertion appears in these frames. | Pass; retain. |
| Related rooms and footer | f003–f005 | Related cards use balanced photo widths, aligned headings/spec strips and clear room links. Footer columns and legal baseline fit without crowding or overlap. | Pass; retain. |

## Limits

This review accepts only the captured default desktop page. It does not verify hover/expanded gallery controls, lightbox, date validation, keyboard/focus states, form submission, motion or other viewports. It checks displayed facts against canonical room data, not the independent truth of operating or amenity claims. No images remain available in this review context for a further inspection.
