# Booking review and expanded summary — mobile production QA

Date: 30 October 2026. Page: book. Viewport: 390 × 844, DPR 2.

Evidence: `tools/.frames/book-review-mobile/capture.json` (review state, document 3012 px) and `tools/.frames/book-summary-expanded-mobile/capture.json` (summary-expanded state on room step, document 3423 px). Inspected f000, f001 and f002 from each set, exactly six images. No other images inspected. The final footer frames are outside this review.

## Findings

| Element / evidence | Observation | Severity | Required change / status |
|---|---|---|---|
| Review compact summary and progress, review f000 | Sora Suite and €1,290 fit beside Stay details without collision. Four progress labels remain on one line; Dates and Room show completion and Review is active. | Pass | Accepted at 390 px. |
| Review form, review f000–f001 | Heading, explanation and optional Name/Email fields have a clear hierarchy. Note textarea fits; optional contact details are explicitly described as not sent. | Pass | Accepted. |
| Stay review, review f001 | Arrival 30 Oct 2026, departure 2 Nov 2026, 3 nights, 3 guests, Sora Suite, €430/night and €1,290 total are mutually consistent and match canonical suite capacity/rate. Total label uses two natural lines without overlapping price. | Pass | Accepted. |
| Review action stack, review f001–f002 | Continue and Back occupy the same full content width. Labels remain single-line and have comfortable tap height. | Pass | Accepted. |
| Expanded disclosure, expanded f000 | Room, nights, guests, rate and total are legible with clean opposing alignment and a clear divider. No payment is taken is visible. Collapse indicator fits beside Stay details. Summary expansion moves progress below it without overlap. | Pass | Accepted visually; interaction/focus behaviour is not established by screenshots. |
| Expanded disclosure date visibility, expanded f000 | The expanded Stay details contains 3 nights but omits arrival/departure. On the room step, guests cannot visually confirm the actual selected dates from this summary. Review state does show both dates later. | Minor | Open usability refinement: add Arrival and Departure rows using existing data-summary-in/data-summary-out bindings, matching the review card. This needs markup/binding reuse rather than a CSS-only fix; retain .stay-card__row alignment and current spacing. |
| Room cards, expanded f001–f002 | Three incompatible rooms visibly explain Sleeps 2 · choose fewer guests. Sora Suite is clearly selected and shows 54 m², sleeps 3 and €430/night. Photo/text columns and wrapped courtyard metadata remain inside card boundaries. | Pass | Accepted. |
| Room-step action stack, expanded f002 | Review your stay and Back fit on one line in full-width separate buttons. Availability wording does not imply a confirmed booking or live inventory. | Pass | Accepted. |

## Result and limits

No blocker or major visual defects in the six inspected frames. One minor usability refinement is open: expose actual dates in expanded stay details. No CSS defect requires correction in the sampled states. This is a static visual review at 390 px only; it does not certify narrow 360 px rendering, keyboard/focus behaviour, transitions, validation/error states or the final footer frames.
