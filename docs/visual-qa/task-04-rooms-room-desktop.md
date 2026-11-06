# Visual QA — rooms & room detail — desktop

Reviewer scope: rooms f004–f006; room-atlantic f000–f001.
Source: tools/.frames/rooms-desktop/f004.png, f005.png, f006.png; tools/.frames/room-atlantic-desktop/f000.png, f001.png

## Findings

| # | Frame | Element | Severity | Observation | Required change (selector) | Confidence |
|---|---|---|---|---|---|---|
| 1 | f001 (room-atlantic) | Dark "Availability" panel — eyebrow and field labels | Major | "AVAILABILITY" and "ARRIVAL / DEPARTURE / GUESTS" render in `--c-ink-50` (#82806F) on `--c-coastal` (#304444) — about 2.6:1. `.panel--dark` sets `color: var(--c-ivory)` but `.eyebrow` (sora.css:81) and `.field--inline label` (sora.css:479) both force `--c-ink-50`, and no `.panel--dark` override exists. Labels are visibly dim against the panel. Same bug affects the panels in book.html, contact.html and room-dune/courtyard/suite.html. | `.panel--dark` — add `.panel--dark .eyebrow, .panel--dark .field--inline label { color: var(--c-ivory-50); }` in sora.css beside the `.panel--dark` rule (line 472). Use `--c-ivory-50` (#A9A79A, 4.3:1) for the eyebrow and `--c-ivory-70` (#CFCABB) for the 11px field labels if 4.5:1 is required. | High |
| 2 | f004 (rooms) | Demo disclaimer notice in "Before you arrive" | Minor | The `.notice--demo` paragraph sets as a single ~170-character line across the full 1360 px container, far exceeding the 62-character maximum measure for body copy and reading as one stretched line. | `.notice--demo` — set `max-width: 62ch;` in components.css (or `.section--dark .notice--demo { max-width: 72ch; }` for the dark variant), so the disclaimer wraps to two short lines inside the bordered box. | High |
| 3 | f005, f006 (rooms) | Footer metadata | Nit | `.site-footer__cols h3` and `.site-footer__bottom` use `--c-ivory-50` (#A9A79A) on `--c-coastal` (#304444) — about 4.3:1, marginally under 4.5:1 for the 11 px column labels and 13 px legal line. | `.site-footer__cols h3, .site-footer__bottom` — change `color` from `var(--c-ivory-50)` to `var(--c-ivory-70)` in sora.css (lines 418, 425). | Medium |

## Possible issues (low confidence — worth checking in code)

- **f000 (room-atlantic), main gallery image.** `assets/rooms/atlantic-room-main.svg` is a 4:5 portrait source (1400×1750) rendered into `.room-gallery__main .figure { aspect-ratio: 4 / 3 }`, so `object-fit: cover` discards the top and bottom ~20 % of the artwork. The visible crop still reads as a room, but check that the window and the sea (the image's stated subject) survive the crop; if not, set `.room-gallery__main .figure { aspect-ratio: 4 / 5 }` or swap in a landscape asset.

## Summary

- Blockers: 0
- Major: 1
- Minor: 1
- Nit: 1
- Highest-value fixes: Give `.panel--dark` its own label and eyebrow colour so the room-page booking panel stops using `--c-ink-50` on Coastal. Cap `.notice--demo` at 62ch so the fictional-property disclaimer stops running the full width of the container. Lift the footer metadata to `--c-ivory-70` for a safe contrast ratio.
- Clean areas: f000 (gallery 8/4 split, crop, side-column alignment) and f005/f006 (sandstone closing band, footer grid and legal row, section spacing) show no layout, alignment or spacing defects. The heading clipped by the header in f006 is normal fixed-header scroll behaviour, not a defect. Room spec strip values (38 m², 2 guests, 4 rooms, €310) match `content/room-data/rooms.json`.
