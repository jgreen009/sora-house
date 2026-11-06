# Visual QA — index — desktop (part 2)

Reviewer scope: frames f005–f009 of 11.
Source: tools/.frames/index-desktop/f005.png … f009.png (1440×900).

## Findings

| # | Frame | Element | Severity | Observation | Required change (selector) | Confidence |
|---|---|---|---|---|---|---|
| 1 | f006 | `.section--dark` H2 "Built from what the coast provides" | Minor | Heading wraps to a single-word widow: line 1 "Built from what the coast" (x105–527), line 2 "provides" alone (x104–247) in a 497 px column — the 133 px of unused width on that line reads as a break error. | `.section--dark .split__body .display-m { text-wrap: balance; }` in `sora.css` (or, if balance is unavailable, replace the space in that `<h2>` in `index.body.html:229` with `&nbsp;` so "coast provides" stays together). | High |
| 2 | f007 | `.stat-row` labels in the architecture section | Minor | Two of the four stat labels break with orphans because each `.stat` column is only ~103 px wide: "Minutes to the sea" → "Minutes to the" / "sea", and "Largest room, m²" → "Largest room," / "m²" (single character alone on line 2). | `sora.css:553-555` — `.stat-row { grid-template-columns: repeat(4, auto); justify-content: space-between; }` and add `.stat span { white-space: nowrap; }` so the labels set on one line. | High |
| 3 | f009 | Gallery CTA tile "Twenty-four more" | Nit | The inline `text-align:center` centres the "OPEN THE GALLERY →" link. Design decisions §4 permits centred type only in the hero, section titles and the confirmation summary; every other link on the page is left-aligned. | `index.body.html:287` — drop `text-align:center` from the tile's inline style and set `justify-items:start; text-align:left;` on it so the link aligns with the tile's left edge. | Medium |

## Possible issues (low confidence)

- `.figure { background: var(--c-sand); }` (`sora.css:146`) references a token that does not exist — `tokens.css` defines `--c-sandstone`, not `--c-sand`. The figure background therefore resolves to transparent, so any lazy-loaded image shows an empty ivory box instead of a placeholder. No figure rendered empty in f005–f009. Change to `var(--c-sandstone)`.
- Design decisions §4 specifies editorial splits of 5/7 and 7/5, but `.split--text-right .split__media { grid-column: 1 / span 6 }` and `.split--text-left .split__media { grid-column: 7 / span 6 }` (`sora.css:345-348`) implement 6/5, leaving a full empty column (105 px) between the two halves. The rendered result still alternates silhouette, so this may be intentional.

## Summary

- Blockers: 0
- Major: 0
- Minor: 2
- Nit: 1
- Highest-value fixes: Balance the dark-section H2 in f006 so "provides" is not left alone on line 2 (`.section--dark .split__body .display-m { text-wrap: balance; }`).
- Highest-value fixes: Stop the two orphaned stat labels in f007 by switching `.stat-row` to `auto` tracks with `justify-content: space-between` and `white-space: nowrap` on `.stat span`.
- Highest-value fixes: Left-align the "OPEN THE GALLERY →" link in the f009 CTA tile to comply with the centring rule in design decisions §4.
- Clean areas: f005 and f008 are clean — the three experience rows, their alternating 1/5/4 and 1/4/5 grids, the taupe row numerals, the hairline row rules, the 4:3 image crops and the gallery tile captions (all caption numbers flush to their image right edge) all check out. The fixed header is a correct 71 px solid ivory band with the dark wordmark and does not overlap content. f009 is otherwise clean: the 7/5 and 4/7 gallery rows, the sandstone "Your stay" section and its 128 px section rhythm all measure correctly, and no screen shows more than one sandstone surface.
