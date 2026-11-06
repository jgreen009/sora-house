# Visual QA — Experiences & Gallery — Desktop (1440)

Reviewer scope: 5 frames — experiences-desktop f003–f004, gallery-desktop f000–f002.
Source: tools/.frames/experiences-desktop/f003.png, f004.png; tools/.frames/gallery-desktop/f000.png, f001.png, f002.png

## Findings

| # | Frame | Element | Severity | Observation | Required change (selector) | Confidence |
|---|---|---|---|---|---|---|
| 1 | f001, f002 | Gallery tile boxes (`.figure` in `.gallery-item`) | Major | Tiles render at the source SVG ratio, not the designed box ratio: items 03 (16/10), 04 (4/3) and 05 (4/3) all show identical 14:9 heights with captions on one baseline, and item 10 (4/3) shows its 4:5 source, ~1.5× taller than items 08/09 beside it. `.figure` is a `<span>` with no `display`, so `aspect-ratio`/`width` do not apply and `.figure img { height:100% }` resolves to auto. | `.figure` (sora.css:149) — add `display: block;`; add `.figure--16x10 { aspect-ratio: 16 / 10; }` (modifier used in gallery.html is currently undefined) | High |
| 2 | f001 | Gallery items 03 and 07 (`g05.svg` / `g12.svg`) | Major | "The long table" (03) and the wide tile below it, "Breakfast, late" (07), are the same artwork under two captions — `g05.svg` and `g12.svg` differ only in the turbulence seed. | `pages/gallery.body.html` item 07 — replace `../../assets/gallery/g12.svg` with a different study, or regenerate `assets/gallery/g12.svg` as a distinct breakfast scene | High |
| 3 | f002 | Gallery grid row 3 (items 08/09 vs 10) | Minor | Item 10's over-tall box leaves a ~250 px empty band beneath the captions of items 08 and 09, so the row reads as two short tiles plus a void. | `pages/gallery.body.html` item 09 — change `gallery-item--wide` / `figure--16x10` to `gallery-item--std` / `figure--4x3` so items 08–10 share one box ratio and their captions align | High |
| 4 | f001, f002 | Gallery tiles 04 and 12 (`g02.svg`, `g06.svg`) | Minor | At grid scale "Plaster, late light" (04) and "The quiet room" (12) read as near-empty pale boxes; both are the sparsest studies in the set. | `assets/gallery/g02.svg` and `assets/gallery/g06.svg` — add readable structure (shadow, edge, fall of light) or swap these two tiles' sources | Medium |
| 5 | f000 | `.filters` | Nit | Filter chips are separated by 10 px, off the 4 px spacing scale. | `.filters` (sora.css:416) — change `gap: 10px` to `gap: 8px` | High |
| 6 | f000, f001, f002 | `.gallery-grid` | Nit | Grid gap is `clamp(16px, 2vw, 28px)` → 28 px on desktop against the documented 24 px gutter, so tile gaps read wider than other 12-column grids. | `.gallery-grid` (sora.css:406) — use `gap: var(--grid-gap)` (24 px) | High |
| 7 | f004 | Closing dark section → footer | Nit | The coastal closing section runs straight into the coastal footer, so the CTA and the footer read as one unbroken dark block with ~230 px of empty coastal between them. | `.site-footer` (sora.css:426) — add `border-top: 1px solid var(--c-line-dark);` to separate the closing dark moment from the footer | Medium |

## Possible issues (check in code)

- f004 — the fixed ivory header band sits over the coastal section and clips the "All of this is included" heading in the stitched frame. Likely a fixed-header stitching artefact of `tools/shoot-frames.mjs`; if the header really overlaps, check `.site-header` (sora.css:168) against the section's top padding. Low confidence.

## Summary

- Blockers: 0
- Major: 2
- Minor: 2
- Nit: 3
- Highest-value fixes: Make `.figure` a block so gallery tiles crop to their designed 16/10, 4/3 and 3/4 boxes. Replace the duplicated `g12.svg` used for "Breakfast, late" with a distinct image. Even out the gallery's row ratios and gap so captions align and the void under items 08/09 closes.
- Clean areas: header alignment to the 1360 px container and wordmark/nav baseline; filter chip sizing, ink active state and label contrast; page-head type and grid alignment; experiences closing section (one dark moment, ivory-70 labels, `btn--light` contrast); footer hairline, legal line and 13 px footer text; section rhythm between stacked sections (no empty band); caption and index colour in `--c-ink-70`; experiences 4:5 figure crops.
