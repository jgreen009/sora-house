# Visual QA — Book & Experiences — desktop (1440 × 900)

Reviewer scope: book f001–f002, experiences f000–f002.
Source: tools/.frames/book-desktop/f001.png, f002.png; tools/.frames/experiences-desktop/f000.png, f001.png, f002.png.

## Findings

### book-desktop f001

| # | Frame | Element | Severity | Observation | Required change (selector) | Confidence |
|---|---|---|---|---|---|---|
| 1 | f001 | Stay summary | Major | `.booking-side` is 683 px = its grid row, so `sticky; top:104px` has zero travel; its clipped tail (coastal block + slice of the 16:9 image) hangs top-right over "Before you book" (x 941–1336, y 72–167). | `.booking-side .panel--dark` — remove its `.figure--16x9` block, set `.stay-card { gap:12px }` and `.booking-layout { min-height:100vh }` so the row outgrows the panel and it pins at 104 px | High |
| 2 | f001 | Gap above "Before you book" | Minor | 223 px blank ivory between the step-1 form (ends 938) and the heading (1195); the taller side column overhangs the form 129 px, leaving an asymmetric band holding the clipped stub. | `.section--tight` (booking section) — `padding-bottom: 96px`; with #1 the band closes to 128 px | High |

### experiences-desktop f000

| # | Frame | Element | Severity | Observation | Required change (selector) | Confidence |
|---|---|---|---|---|---|---|
| 3 | f000 (also f001, f002) | Experience images | Major | 1600×1200 assets cover-cropped into `.figure--4x5` (604×755): ~40 % of source width cut (table end, lamp) and the visible half near-blank cream — 49 % of pixels within 18 of ivory in f000, 86 % (lum 206–246) in f002. Sections 01 and 03 read as empty panels; only 02 has tone (3 %). | `.split__media .figure--4x5 { aspect-ratio: 4 / 3 }` in `pages/experiences.body.html`, or `.split__media .figure img { object-position: 50% 78% }` | High |
| 4 | f000 | Page-head → section 01 | Minor | 168 px gap (title ends 384, first image starts 552) against the 128 px token used between sections. | `.page-head + .section--tight { padding-top: 48px }` (80 + 48 = 128) | High |

### experiences-desktop f001

| # | Frame | Element | Severity | Observation | Required change (selector) | Confidence |
|---|---|---|---|---|---|---|
| 5 | f001 | Feature list | Nit | `.feature-list li` is 16 px, off scale (15 Body S / 17 Body). | `.feature-list li { font-size: var(--fs-body) }` | Medium |

### experiences-desktop f002

No further findings; the image defect is #3 (worst instance). Book f002 likewise clean: the heading clipping at the header edge is normal fixed-header scroll behaviour.

## Summary

- Blockers: 0
- Major: 2
- Minor: 2
- Nit: 1
- Highest-value fixes: make the booking summary stick (#1) and close the 223 px dead band it causes (#2); stop cover-cropping 4:3 artwork into 4:5 boxes (#3), which leaves two of three section images blank; even out the experiences page-head gap to 128 px (#4).
- Clean areas: header on the 1360 px container (x 104/1336) in all five frames; opaque header never bleeds over imagery; eyebrows 01/02/03 consistent in ink-70; split silhouettes alternate; footer type ivory-70 on coastal; progress steps and stay-summary rows on-token by DOM measurement.
- Notes: the experiences dark close falls in f003/f004 (not supplied) — metrics show one coastal band, 469 px, one dark moment. `.exp-row` CSS is unused. Book step 2 (room options) is `display:none`, so no frame captures it.
