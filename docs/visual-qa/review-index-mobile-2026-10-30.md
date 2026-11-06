# Home page — mobile visual review

Reviewed 2026-10-30. Viewport 390 × 844, device scale 2. Existing capture frames reviewed: f000, f002, f004, f007, f010, f013 (six images). This is a sampled review of existing captures, not a fresh capture or interactive verification.

## Findings

| ID | Element / evidence | Severity | Finding | Required change | Status |
|---|---|---|---|---|---|
| HM-01 | Home gallery, f010; `components.css` final media query | Major | Desktop asymmetric columns remain on a 390 px viewport. Images are narrow and separated by an empty column. The mobile `.page-home .gallery-grid > *` selector loses to the more specific desktop `:nth-child()` selectors. | Match desktop specificity inside the mobile breakpoint, for example `.page-home .gallery-grid > :nth-child(n) { grid-column: 1 / -1; }`. Apply the equivalent correction to the gallery page; recapture both. | Open |
| HM-02 | Dark-section → gallery boundary, f010 | Minor | Gallery eyebrow begins immediately against the previous dark section, weakening the intended section rhythm. Source confirms `.section + .section { padding-top: 0; }` affects sections after a colour change as well as same-surface neighbours. | Restore mobile top padding after dark and sandstone sections, using a later, equally or more specific adjacent-section rule. Keep the spacing token consistent across pages. | Open |
| HM-03 | Room-card specifications, f004 | Minor | Dune rate sits slightly below area and guest metadata. Mixed serif/sans typography is appropriate, but the row lacks a consistent baseline. | Use baseline alignment for `.room-card__spec` and explicit price line-height; preserve serif rates. | Open |

## Accepted observations

- Hero headline and both calls to action fit. Logo and menu are clear, with generous touch areas; menu behaviour was not tested.
- Main prose has comfortable width and readable line height. Section headings wrap naturally without clipped glyphs.
- Room imagery and descriptions fit the viewport with consistent 20 px gutters.
- Coastal statistics form a readable two-column grid; footer links and fictional-concept disclosure remain legible.
- The fixed header obscures content at arbitrary scroll positions in f010/f013; this alone is not a defect because these are viewport frames at intermediate scroll offsets.

## Development opportunities

1. Replace the procedural room/architecture studies with a coherent set of photographic concept images. The current studies establish palette and shape, but they supply little material detail or spatial depth.
2. Reduce repeated tall image → paragraph → text-link sequences on mobile. Introduce compact room previews and a concise selected-room summary while keeping all four room types discoverable.
3. Add coordinated hero text entrances, short image-reveal masks, animated link rules, and deliberate menu staging. Keep native scrolling, honour reduced motion, and retain the existing prohibition on parallax and autoplay video.
4. Animate gallery layout changes only after correcting the responsive cascade, with a static reduced-motion path and stable focus.

No application source was changed. Fresh captures are required after fixes before marking any finding verified.
