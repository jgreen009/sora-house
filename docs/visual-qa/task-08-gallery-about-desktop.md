# Visual QA — Gallery & About — desktop (1440 px)

Reviewer scope: gallery-desktop f003–f004; about-desktop f000–f002.
Source: tools/.frames/gallery-desktop/f003.png, f004.png; tools/.frames/about-desktop/f000.png, f001.png, f002.png

## Findings

### gallery-desktop / f003

| # | Frame | Element | Severity | Observation | Required change (selector) | Confidence |
|---|---|---|---|---|---|---|
| 1 | f003 | `.gallery-item` tiles | Major | Every tile renders the browser default button chrome — 1 px `#767676` border and `#EFEFEF` fill, neither in the palette — and the 6 px UA padding insets each image ~8 px from its grid column (item 12 image x=532–1327 vs column x=524–1336). A grey box outline is visible around each tile. | `.gallery-item { border: 0; background: none; padding: 0; border-radius: 0; }` in `design/prototypes/css/sora.css` | High |
| 2 | f003 | `.gallery-item .figure` | Major | `.figure` is a `<span>` with no `display`, so the `aspect-ratio` on `.figure--16x10/--4x3/--3x4` never applies and tiles render at the source ratio (1.556). Measured, the 4-col tile of the last row ends at y=77 while the 8-col tile ends at y=352 — a 275 px void that the declared ratios would cut to ~215 px, leaving a large empty band beside the closing note. | `.gallery-item .figure { display: block; }` in `sora.css` | High |

### gallery-desktop / f004

No findings — frame clean.

### about-desktop / f000

| # | Frame | Element | Severity | Observation | Required change (selector) | Confidence |
|---|---|---|---|---|---|---|
| 3 | f000 | About dark sections | Major | Two `section--dark` blocks — "The idea" (this frame) and "What we do not do" — plus the coastal footer, so the page carries two dark moments; the palette allows the footer plus one. | `design/prototypes/pages/about.body.html`: change the "What we do not do" `<section class="section section--dark">` to `<section class="section">` so `.info-grid__item p` falls back to `--c-ink-70` | High |
| 4 | f000 | About sandstone sections | Minor | Sandstone appears twice on the page ("Hospitality" and "Your stay"), one more shift than the palette allows, and the mid-page block and the closing CTA read as the same gesture. | `about.body.html`: change the "Hospitality" `<section class="section section--sand">` to `<section class="section">`, keeping sandstone only for the closing CTA as on gallery | Medium |

### about-desktop / f001

No findings — frame clean.

### about-desktop / f002

| # | Frame | Element | Severity | Observation | Required change (selector) | Confidence |
|---|---|---|---|---|---|---|
| 5 | f002 | `.split__media .figure` (Surroundings) | Major | `g07.svg` is 1400×900 (3:2) but the media box is `.figure--4x5` (604×755), so `object-fit: cover` discards 49 % of the width and the sun disc ends ~1 px from the image's right edge; the upper two thirds of the frame is empty sky. | `about.body.html` line 62: change `<div class="figure figure--4x5">` to `<div class="figure figure--4x3">` (604×453) so the crop keeps the sun clear of the edge | High |

## Summary

- Blockers: 0
- Major: 4
- Minor: 1
- Nit: 0
- Highest-value fixes: Reset `.gallery-item` so the browser's grey button border, fill and 6 px padding stop framing every gallery image and pulling it off the 12-column grid. Make `.gallery-item .figure` a block so the declared tile ratios apply and the 275 px void in the last gallery row closes. Re-cut the about page's "Surroundings" image to a 3:2-friendly box so the sun is not sliced by the frame edge.
- Clean areas: f001 (Architecture split — 4:5 figure matches its 1400×1750 source, body on grid col 8, image optically above the eyebrow); f004 (footer — brand on col 1, link columns on col 6, hairline rule and bottom row on the 104/1336 container edges, ivory-70 labels pass AA); the f000 `.page-head` (h1 at x=104, aside on grid col 9 at x=942, bottoms aligned); all `.split-note__label` / `.split-note__body` columns (x=104 / x=418); label and body contrast throughout (ink-70 on ivory, ivory-70 on coastal). No stat rows appear in these frames.
