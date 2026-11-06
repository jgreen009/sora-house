# Visual QA — room detail & booking — desktop

Reviewer scope: room-atlantic f002–f005; book f000
Source: tools/.frames/room-atlantic-desktop/f002.png … f005.png; tools/.frames/book-desktop/f000.png

## Findings

| # | Frame | Element | Severity | Observation | Required change (selector) | Confidence |
|---|---|---|---|---|---|---|
| 1 | f002, f003, f004, f005, book f000 | Fixed header vs page grid | Major | The header is padded to the raw gutter (wordmark at x=64, "BOOK YOUR STAY" ending at x=1376) while `.container` (max-width 1360 + 64px padding, box centred in 1440) puts every body element at x=104–1336, so the wordmark and header CTA sit 40px outside the grid the copy, images and footer use. On the room page the wide gallery container starts at x=64 while all other sections start at x=104. | `sora.css` `.container { max-width: calc(var(--container) + var(--gutter) * 2); }` and `.container--wide { max-width: calc(var(--container-wide) + var(--gutter) * 2); }` (or set tokens to 1488px / 1728px) so header, gallery and sections share the same 64px edges; leave `.site-header { padding: 22px var(--gutter); }` unchanged. | High |
| 2 | book f000 | `.progress__step` | Major | Steps 2–4 (ROOM, REVIEW, CONFIRM) use `--c-ink-30` (#B3B0A2, ~1.9:1 on ivory), a token outside the approved palette; at 12px uppercase they are barely legible and the flow reads as one step only. | `sora.css` `.progress__step { color: var(--c-ink-50); }` and keep `.progress__step.is-current { color: var(--c-ink); }`; remove `--c-ink-30` from the stepper. | High |
| 3 | book f000 | `.site-header` height | Minor | The header is 87px tall at the top of interior pages (22px padding + 42px CTA) and drops to 71px when `is-scrolled`, against the specified fixed 72px; on a solid interior header the shrink has no purpose and the band jumps on scroll. | `sora.css` `.site-header { height: 72px; padding-block: 0; align-items: center; }` and `.site-header.is-scrolled { padding-block: 0; }` for a constant 72px band. | High |
| 4 | f002, f005 | Room availability panel vs footer | Minor | The room page shows coastal twice — the tall `--c-coastal` availability panel in the hero (the dark block at the top of f002) and the coastal footer (f005) — where the register allows one dark block per page. | `room.body.html` `.split__media .panel--dark` — restyle the availability panel as `.panel` (ivory, 1px `--c-line` border) so the coastal footer is the page's only dark block. | Medium |

## Possible issues (low confidence — check in code)

- Room section headings start at three different left edges (104px, 418px, 523px for "What you will find", "You might also like", "Stay in the Atlantic Room"). This may be the intended 5/7–7/5 alternation, but `.section-head__title { grid-column: 4 / span 6; }` and `.split-note__body { grid-column: 5 / span 6; }` disagree by one column.
- `assets/rooms/sora-suite-02.svg` (related Sora Suite card) repeats the bedroom composition of `courtyard-room-02.svg` rather than the "separate lounge" the card copy describes.

## Summary

- Blockers: 0
- Major: 2
- Minor: 2
- Nit: 0
- Highest-value fixes: Align the fixed header and the two container widths so the wordmark, CTA, gallery and body content share one horizontal grid — currently they differ by 40px on each side. Replace `--c-ink-30` on the booking progress steps with `--c-ink-50`, which restores three visible, legible step labels. Give the header a constant 72px height so it no longer jumps from 87px to 71px on scroll.
- Clean areas: no horizontal overflow on either page (scrollWidth 1440 = clientWidth 1440); booking grid is correct (main 104–813, sticky summary 941–1336, panel and stepper share an edge); field labels, date values (2026-11-06 to 2026-11-09) and guest copy are correct; sandstone appears once on the room page and the ivory panel on it is clean; footer columns, hairlines, spec strips, card images (3:2, equal baselines) and room data (32 m²/2/€230, 54 m²/3 guests/€430, Atlantic €310) all match the approved system; display/UI type pairing, uppercase eyebrows with 0.16em tracking and button styling are correct in every frame.
