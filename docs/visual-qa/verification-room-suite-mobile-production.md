# Sora Suite mobile verification — 30 October 2026

Viewport: 390 × 844 CSS px, captured at 2× device scale. Three images inspected in an isolated context. No source changes.

| Evidence | Element | Finding | Severity | Required change / status |
|---|---|---|---|---|
| `tools/.frames/room-suite-mobile/f000.png` | Opening room identity and action | Sora Suite, €430 per night and Plan your stay appear before the gallery, fully within the opening viewport. The action fits on the same row as price without collision or clipping. | Pass | Verified. |
| Same frame | Main photograph and thumbnails | Main image is compact and preserves lounge, bed, fireplace and Atlantic outlook. Two thumbnails form a clean two-column row with equal dimensions and consistent gutters. Expand remains clear against its ivory panel. Gallery fits inside the first viewport. | Pass | Verified. |
| `tools/.frames/room-suite-mobile/f001.png` | Description, facts and availability fields | Heading and introductory copy wrap cleanly; 54 m², 3 guests, 1 room and €430 form a legible two-column fact grid. Availability panel and visible date fields fit the mobile gutter. | Pass | Accepted sampled area. Lower form fields and submission state are outside this capture. |
| `tools/.frames/room-suite-lightbox-mobile/f000.png` | Expanded image, caption and navigation | Expanded photograph is fully visible within the horizontal gutter. Caption and capacity sit below the photograph; previous/next arrows and 1 / 3 count sit near the bottom with clear spacing. No collision between lightbox image, caption or navigation controls. | Pass | Verified. |
| Same lightbox frame | Close control / background suppression | The page hamburger remains visibly behind the lightbox close X at the upper right. Underlying photograph, Expand button and thumbnails also remain strongly visible through the grey backdrop. Caption and controls remain readable, but the overlapping hamburger makes the close area visually untidy. | Minor | Increase lightbox backdrop opacity (for example ink at 0.96 or solid ink), so the underlying header/menu and page imagery do not compete with the active controls. Re-capture the lightbox frame after adjustment. |

Outcome: the mobile heading order and compact gallery changes pass. One minor lightbox backdrop issue remains; no blocker or major defect in these three frames. This is visual evidence only and does not certify keyboard behaviour or uninspected page states.
