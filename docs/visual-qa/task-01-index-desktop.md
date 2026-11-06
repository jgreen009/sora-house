# Visual QA — index — desktop

Reviewer scope: frames f000–f004 of 11.
Source: tools/.frames/index-desktop/f000.png … f004.png (1440×900).

## Findings

| # | Frame | Element | Severity | Observation | Required change (selector) | Confidence |
|---|---|---|---|---|---|---|
| 1 | f000, f001 | `.site-header` / `.hero__inner` horizontal edges | Major | Header and hero sit on the raw 64 px `--gutter` (wordmark at x≈62 px, "Book your stay" CTA ending x≈1371 px) while every section uses `.container` (1360 px + 64 px padding → content edges x≈104/1330 px). The jump is visible where the hero meets the booking bar and where the header CTA overhangs the booking-bar button. | `sora.css:167` `.site-header` and `sora.css:264` `.hero__inner` — replace the inline `var(--gutter)` padding with `max(var(--gutter), calc((100vw - var(--container)) / 2 + var(--gutter)))`; set the same value for `.hero__marker` / `.hero__scroll` `left`/`right` (`sora.css:273,279`). | High |
| 2 | f003 | `.room-grid` cards 01 / 02 | Minor | "Atlantic Room" and "Dune Room" sit in the same grid row but their titles, spec rules and "View room" links are ~93 px apart vertically: `.room-card--feature .figure` (4:3, 709 px wide) is 532 px tall, `.room-card--side .figure` (4:5, 499 px wide) is 624 px tall, so the two image bottoms and every line below them are ragged. | `sora.css:356` `.room-grid` — add `align-items: end;` (both cards have identical text-block heights, so image bottoms, titles and spec rules will line up), or give `.room-card--feature .figure` and `.room-card--side .figure` a common fixed height. | Medium |
| 3 | f002, f003, f004 | `.room-card__spec` rate | Minor | Room-card rates (€310 / €180 / €230 / €430) are set in DM Sans 500, but design decisions §3 lists prices as Instrument Serif and every other price on the site (`.room-option__price b`, `.stay-card__row.total b`) uses the display face — the rate reads as a different kind of value on the home page. | `sora.css:365` — add `.room-card__spec span:last-child b { font-family: var(--font-display); font-weight: 400; }` so the rate only (not area or guest count) uses Instrument Serif, matching `.room-option__price b`. | Medium |
| 4 | f000 | `.hero__marker` vs `.hero__title` | Minor | The vertical marker (`.hero__marker`, `left: var(--gutter)`, `top: 50%`) occupies the same 64 px left edge and vertical band as the H1 ("Some places ask you / to slow down."), so its "38.7° N · 9.5° W" string runs into the first glyphs of both lines; only a bright ring is legible in the render. | `sora.css:272-277` `.hero__marker` — move it clear of the text column, e.g. `left: 20px;` (still inside the gutter band), or `display: none` below 1280 px. | Medium |
| 5 | f002 | `.section` → `.section--tight` boundary | Nit | The house figure ends at y≈65 px display and "Accommodation" only starts at y≈180 px: `.section` (128 px) and `.section--tight` (88 px) padding stack into a ~216 px empty ivory band before the first heading, breaking the 128 px section rhythm. | `sora.css:51` `.section--tight` — set `padding-top: 64px; padding-bottom: var(--space-section-sm);` so the gap between the previous section's content and this heading is ≈128 px. | Medium |

## Possible issues (low confidence)

- Inline margins in `index.body.html` use off-scale values (18 px, 22 px, 26 px, 38 px, 44 px), against the 4 px spacing unit in design decisions §4 — e.g. `style="margin-top:22px"` on `.room-card__title` (lines 98, 115, 132, 149) and `style="margin:18px 0 24px"` on the split H2s (lines 62, 229).
- `sora.css:146` `.figure { background: var(--c-sand) }` references an undefined token (`tokens.css` defines `--c-sandstone`), so no placeholder tone shows while a lazy image loads. Already noted in task-02; no figure rendered empty in f000–f004.

## Summary

- Blockers: 0
- Major: 1
- Minor: 3
- Nit: 1
- Highest-value fixes: Align `.site-header` and `.hero__inner` to the 1360 px `.container` edges so the hero/header no longer sit ~40 px outside every section's gutter.
- Highest-value fixes: Add `align-items: end` to `.room-grid` so the Atlantic and Dune card titles, spec rules and links share one baseline.
- Highest-value fixes: Set the home page room-card rate in Instrument Serif so prices are typographically consistent with the rest of the site.
- Clean areas: f001's booking bar (three fields, hairline separators, full-width action) and the house 6/5 split; f002's section-head grid (label / title / aside on the 12-column tracks) and the 4:3 / 4:5 image crops; f003's second row (03 / 04 at equal 6-column widths); f004's experience row grid (1/5/4) and hairline row rules; the fixed header switches correctly to a solid ivory band with the dark wordmark; no screen shows more than one sandstone surface or a second dark section; all reveals are fully settled in every frame.
