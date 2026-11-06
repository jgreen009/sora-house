# Visual QA — index & rooms — desktop

Reviewer scope: index f010; rooms f000–f003
Source: tools/.frames/index-desktop/f010.png; tools/.frames/rooms-desktop/f000.png … f003.png

## Findings

### index f010

| # | Frame | Element | Severity | Observation | Required change (selector) | Confidence |
|---|---|---|---|---|---|---|
| 1 | f010 | Footer legal line and footer column headings | Minor | `.site-footer__bottom` (13px) and `.site-footer__cols h3` (11px) sit in `--c-ivory-50` on `--c-coastal` = 4.3:1, below AA 4.5:1 for text under 19px. The copyright/fictional-property notice is the least legible text in the frame. | `.site-footer__bottom` and `.site-footer__cols h3` — set `color: var(--c-ivory-70)` (7.1:1, listed as passing in brand-identity §4) | High |

### rooms f000

| # | Frame | Element | Severity | Observation | Required change (selector) | Confidence |
|---|---|---|---|---|---|---|
| 2 | f000 | Eyebrow "STAY" | Minor | 12px eyebrow in `--c-ink-50` on ivory = 3.5:1; illegible at that size/tracking. brand-identity §4 requires label text at ink-70 or darker, but design-decisions.md allows ink-50 for metadata — needs a ruling. | `.eyebrow` — change `color: var(--c-ink-50)` to `var(--c-ink-70)`; same swap for `.field label`, `.room-card__index`, `.compare-table thead th`, and the non-`b` text in `.room-card__spec` | Medium |

### rooms f001

| # | Frame | Element | Severity | Observation | Required change (selector) | Confidence |
|---|---|---|---|---|---|---|
| 2 | f001 | Eyebrow "THE COLLECTION"; booking-bar field labels (11px) | Minor | Same muted-label token as f000: `--c-ink-50` at 11–12px on ivory = 3.5:1. | as f000 (`.eyebrow`, `.field label`) | Medium |

### rooms f002

| # | Frame | Element | Severity | Observation | Required change (selector) | Confidence |
|---|---|---|---|---|---|---|
| 2 | f002 | Room card indices "01 · Atlantic", "02 · Dune" (11px) | Minor | Same muted-label token as f000: `--c-ink-50` at 11px on ivory = 3.5:1. | as f000 (`.room-card__index`) | Medium |

### rooms f003

| # | Frame | Element | Severity | Observation | Required change (selector) | Confidence |
|---|---|---|---|---|---|---|
| 3 | f003 | Compare table, action column | Nit | The last column shows "VIEW →" links under a blank header cell — the heading is `<span class="sr-only">Action</span>`, so the column reads as unlabelled. | `rooms.body.html` — `<th scope="col"><span class="sr-only">Action</span></th>` → `<th scope="col">Action</th>` (or add `.compare-table thead th:last-child { text-align: right; }` if the column should stay implicit) | High |

## Summary

- Blockers: 0
- Major: 0
- Minor: 2 (one finding #2 repeated across f000–f003, counted once)
- Nit: 1
- Highest-value fixes: Move every 11–15px label from `--c-ink-50` to `--c-ink-70` in `.eyebrow`, `.field label`, `.room-card__index` and `.compare-table thead th` so muted text reaches 6.4:1. Move `.site-footer__bottom` and `.site-footer__cols h3` to `--c-ivory-70` so the footer legal line clears 4.5:1. Give the compare table's action column a visible "Action" heading.
- Clean areas: fixed header (ivory, dark lockup, active "Stay" underline) renders correctly in all frames; no overlap, clipping or overflow from the header; 12-column gutters and card grid columns line up on both pages; room-card image boxes hold their aspect ratios with sensible crops; type families, weights and case are correct (Instrument Serif display, DM Sans body, uppercase tracked labels/buttons); one dark coastal footer only, sandstone used once per screen; no broken images, tables or form states.

## Possible issues (low confidence — worth a code check, not counted above)

- rooms f002: row 1 cards sit at different heights because `.room-card--feature .figure` is 4/3 and `.room-card--side .figure` is 4/5 (sora.css:367-372), so titles and spec strips do not align across the row. This looks deliberate (same rule on index) but confirm it is intended.
- rooms f000: the `.image-band` crop leaves roughly the top 45% of the frame as flat sky; check the `landscape-wide.svg` crop if a fuller horizon is wanted.
