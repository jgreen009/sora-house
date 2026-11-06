# Booking mobile visual review

Reviewed 30 October 2026. Page: `book.html`. Viewport: 390 × 844, device scale 2. Sources: existing `tools/.frames/book-mobile/f000.png` through `f003.png`, captured 28 October. Four images inspected; no images forwarded. This reviews the captured starting state only, not later booking steps or live interactions.

## Findings

| Element | Finding and impact | Severity | Required change | Status |
|---|---|---|---|---|
| Booking progress | Steps 1–3 occupy the first row, while step 4 wraps onto the right of a long disconnected rule. The visual sequence appears broken at this viewport. | Major | Under the mobile breakpoint, use a four-column grid with each number above its label, hide the flexible separator elements, and keep all four steps in one explicit row. Verify at 320, 360 and 390 px. | Open |
| Starting-state summary | A large dark summary appears below the form, but room, nights, rate and total are all dashes despite visible prefilled dates. It consumes much of a screen without helping the current task. | Minor | Hydrate nights immediately from initial dates. On mobile introduce a compact expandable stay summary, revealing rate/total once a room is selected. Preserve the full desktop summary. | Open |
| Form action | The first primary action is right aligned and narrower than the field column. It is usable but visually inconsistent with the broad mobile fields. | Minor | Make the primary action full width at the mobile breakpoint; for later steps use an explicit back/next layout with the primary action clearly dominant. | Open |
| Page opening | The space between the header and page eyebrow is substantial, followed by an explanatory paragraph before the progress and form. Dates start near the bottom of the initial screen. This slows a task-led page. | Minor | Add booking-specific mobile page-head spacing and shorten the introductory copy while retaining the clear demonstration notice. | Open |
| Typography, palette and gutters | Display serif, readable body copy, 20 px outer gutters, clear date inputs and contrasting coastal summary maintain the established identity. No visible horizontal clipping in these frames. | Pass | Preserve. | Accepted |
| Fictional booking disclosure | Opening copy and footer make the demonstration status clear. | Pass | Preserve disclosure through all booking states. | Accepted |

## Compatible improvement direction

- Treat mobile booking as a compact task surface: coherent progress, one active panel, clear primary action, and an expandable summary.
- Animate panel changes with a short opacity/vertical transition and animate the summary total only when its value actually changes; respect reduced motion.
- Keep native date inputs and the established straight-edged material palette. No carousel, parallax or autoplay video is needed.
- Later-step room cards, validation errors, focus movement, confirmation and keyboard behaviour require fresh state-specific verification. The existing screenshots cannot establish those behaviours.

## Verification limit

These are findings from the existing four frame captures, supported by the current CSS selectors `.progress`, `.progress__bar`, `.booking-side`, `.step-actions` and `.page-head`. No fixes have been applied or re-captured in this review.
