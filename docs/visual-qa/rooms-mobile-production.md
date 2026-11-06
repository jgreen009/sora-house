# Rooms mobile production review — 30 October 2026

Viewport: 390 × 844 CSS px, device scale 2. Evidence: fresh `tools/.frames/rooms-mobile/capture.json`, page height 7,763 px. Inspected six original viewport frames: f000 (y0), f002 (1544), f003 (2316), f005 (3860), f006 (4632), f007 (5404). No stitched image or additional preview opened. This is sampled visual acceptance, not an interaction audit or acceptance of the uninspected frames.

## Findings

| ID | Severity | Evidence | Finding | Recommended change | Status |
|---|---|---|---|---|---|
| RM-P01 | Minor | f006, comparison table | The viewport shows Room, Area and Guests, then cuts through the Outlook column at the right edge. Nightly rates and subsequent actions are entirely offscreen. There is no visible swipe instruction or persistent visual cue in the captured state. The source provides horizontal scrolling and an accessible region label, so this is discoverability rather than document overflow. | Add a concise visible instruction above the comparison, such as “Swipe to compare all details”, on small screens. A subtle trailing fade or sticky first column would also help maintain context. Keep the current semantic table and keyboard scroll region. | Open |
| RM-P02 | Minor, copy usability | f007, information section | “Arrival and departure” contains stay length and reservation availability, without arrival/departure guidance. “Children and dogs” contains capacity and a general requirements sentence, without a children or dogs policy. These headings promise more specific information than the text supplies. | Rename the headings to “Planning your stay” and “Guests and requirements”, or equivalent factual headings. Do not invent check-in times or children/pet policies. | Open |

## Accepted observations

- f000: the header, 20 px side margins, introductory type and full-bleed coastal photograph are clean. The heading fits on one line at this viewport, with no collision or clipping. The generous opening spacing is consistent with the editorial direction.
- f002–f003: Atlantic and Dune images retain a clear room subject and readable exterior context. The tall portrait treatment is intentional; no obvious accidental crop warrants replacement. The Atlantic arch is partially cropped at the edge, but the terrace and sea remain legible.
- f003 and f005–f006: the room metadata rows fit within the width. Area, capacity, price and count remain distinct, including the suite’s three guests and single room. View-room links are plainly visible and separated from the next entry.
- f005: the suite lounge is well framed; sea, seating, fireplace and table read clearly. The image does not imply an unreadable or unrelated room.
- f006: guest selector and result count are legible and spaced well. Table typography is readable in the visible columns.
- f007: coastal information section has clear hierarchy, comfortable line lengths and strong readable contrast. Its reservation wording accurately states that online reservations are not yet available.

## Limits and next verification

No blocker or major responsive defect appears in the sampled frames. Courtyard image, lower information/footer content and horizontally scrolled comparison states were not visually inspected. After changes, rebuild and recapture rooms mobile. Reinspect the comparison cue and renamed information headings in a fresh dedicated context. Do not reopen these accepted frames without changed content.
