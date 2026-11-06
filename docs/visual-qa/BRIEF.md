# Sora House — Visual QA Brief (for delegated review agents)

You are reviewing rendered screenshots of the Sora House prototype for visual
defects. This is a review only: **do not modify any file except the single report
file named in your task.**

## What the project is

Sora House is a fictional twelve-room boutique hotel on the Atlantic coast of
Portugal. The site is editorial, calm and architectural: pale limestone, warm oak,
honest daylight, generous negative space. Twelve rooms, one shared booking bar,
one dark coastal section per page, no carousels, no masonry, no testimonials, no
glassmorphism, no rounded corners beyond 2 px.

## What to judge against

Read these first (text only, no images):

- `docs/design-decisions.md` — the approved rules: colour, type, layout, components,
  motion, responsive behaviour.
- `design/brand/brand-identity.md` — the full brand identity, especially §4 colour
  and contrast, §5 typography, §6 spacing and composition.
- `design/prototypes/css/tokens.css` — the exact token values.
- `design/prototypes/css/sora.css` and `components.css` — the implementation, if you
  need to name a selector for a fix.

## What counts as a defect

Look for:

1. **Layout breakage** — overlapping elements, content escaping its container,
   broken grids, columns that collapse wrongly, text clipped or cut off.
2. **Alignment** — elements off the container gutter, inconsistent left edges
   between stacked sections, misaligned baselines between paired headings and
   labels, image bottoms not lining up with adjacent rules.
3. **Spacing** — inconsistent gaps between repeating items (cards, list rows,
   gallery tiles), section padding that differs from the token scale, a cramped or
   empty band.
4. **Typography** — wrong family (serif where sans expected, or vice versa),
   wrong case (body copy in caps), broken line wrapping, orphan/widow lines,
   overlapping line-height, text touching the edge of its box, headings larger
   than the scale allows, inconsistent heading sizes for equal-level headings.
5. **Colour and contrast** — body copy in `--c-ink-50` (only legal for large text),
   text on imagery without a scrim, a second dark section on a page that should
   have one, Sandstone used twice on one screen, pure white or pure black.
6. **Component correctness** — the fixed header overlapping content when solid,
   the mobile menu state, the booking bar fields, the sticky booking summary on
   the booking page, accordion states, lightbox, gallery filters, form states.
7. **Responsive behaviour** — at mobile width, tap targets that are too small,
   text that is too small to read, horizontal overflow, tables that need a scroll
   affordance but do not have one.
8. **Image treatment** — wrong crop (the source SVGs are 4:5, 3:2, 4:3 or 16:9 and
   the boxes have their own aspect ratios; `object-fit: cover` should be cropping
   sensibly, not cutting a subject in half), placeholder SVGs rendering as broken
   or empty boxes, missing alt behaviour.
9. **Rhythm** — two consecutive sections with the same silhouette, a page with no
   dark moment, a page with two dark moments.

## What does NOT count as a defect

- Personal preference that contradicts the approved identity (e.g. wanting rounded
  corners, a different typeface, more colour, a carousell, centred body text).
- The fact that images are procedural SVG stand-ins for photography. Judge crop,
  scale and tone, not "this is not a real photo".
- Content preference. Copy is reviewed separately. Only report copy that is
  visibly broken (overlapping, truncated, wrong case).
- Missing photography that the Phase 1 brief does not require.

## Severity scale

- **Blocker** — the page is broken or a core task cannot be completed.
- **Major** — clearly visible defect that damages the brand or legibility.
- **Minor** — visible inconsistency or polish issue.
- **Nit** — barely visible, worth fixing in a cleanup pass.

## Report format

Write a markdown report with one table per inspected frame, then a summary. Use
this shape:

```markdown
# Visual QA — <page> — <viewport>

Reviewer scope: frames f001–f004 of 7.
Source: tools/.frames/<dir>/f001.png …

## Findings

| # | Frame | Element | Severity | Observation | Required change (selector) | Confidence |
|---|---|---|---|---|---|---|
| 1 | f002 | Booking bar fields | Major | Labels overlap the date inputs on the right column | `.booking-bar__field` — stack fields below 900px, set `.booking-bar` to `grid-template-columns: 1fr 1fr` | High |

## Summary

- Blockers: 0
- Major: 1
- Minor: 2
- Nit: 0
- Highest-value fixes: <two or three sentences>
- Clean areas: <what was correct, so the main session does not re-check it>
```

Rules for the report:
- One row per distinct issue, not per pixel. If the same issue repeats across
  frames, list it once and note the frames it appears in.
- Every "Required change" must name a concrete CSS selector or element and a
  concrete change, so the main session can apply it without another screenshot.
- If a frame is clean, say so in the summary rather than inventing findings.
- State your confidence: High / Medium / Low. Low confidence means "possible issue,
  worth checking in code" — put those in a separate list at the end.
- Keep the whole report under about 400 words unless there are many findings.

## Output

Save the report to the exact path given in your task, then reply with only:
the file path, the severity counts, and the three highest-value fixes as one
sentence each. Do not paste the table back.
