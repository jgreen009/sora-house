# Home mobile — implementation review, 30 October 2026

## Scope and evidence

Fresh implementation capture: `tools/.frames/index-mobile/capture.json`, 390 × 844 CSS pixels, device scale 2, document height 10098 px. Inspected exactly six frames: f000, f002, f004, f007, f010, f012. No older screenshots were reopened. Assessed against the brand identity and design decisions register. No source changes made.

## Verdict

Pass with one minor responsive typography defect. No blocker or major layout defect in the inspected frames. This is representative coverage, not acceptance of all thirteen frames or interactive states.

| ID | Frame / element | Observation | Severity | Suggested fix | Status |
|---|---|---|---|---|---|
| IM-01 | f007, material figure captions | Two caption spans compete for roughly 158 px columns. The oak caption breaks its numbered name into `02 ·` and `Oak`, while `Warm to the touch` remains unbroken beside it. The plaster caption also splits its material name. This makes a deliberate material index look cramped and disconnects the numbering from the material. | Minor | Under the mobile breakpoint, set `.material-story .caption` to a column layout with `align-items: flex-start` and a small gap; keep each material name intact. Alternatively use one caption line for the material and a separate smaller description underneath. Scope the change to material captions so room/gallery folios retain their aligned opposing edges. | Open |

## Accepted observations

- f000: hero title, room CTA, secondary anchor and concept disclosure fit the viewport; no clipping. Portrait crop retains an identifiable architectural motif. Large open space above the content belongs to the full-height hero composition and is not logged as a defect.
- f002: intro image, caption, editorial copy and story link have consistent 20 px gutters. Hairline and annotation remain legible. Copy explicitly identifies an imagined hotel.
- f004: room image precedes room content, with a clean full-width crop. Dune Room data displays 26 m², 2 guests and €180/night, matching the canonical brief. Metadata baseline appears coherent; do not carry forward the older alignment issue without new evidence.
- f007: restrained staggered two-column material studies retain rectangular edges; coastal section begins as the single dark feature, which is permitted in addition to the footer.
- f010: gallery items now span the mobile content width; captions and invitation are legible. The previously reported desktop-span collision is absent from this sampled frame.
- f012: footer navigation columns, legal links, hairline and demonstration disclosures fit cleanly. Text at the upper frame edge is behind the fixed header because this frame starts mid-footer, not a content clipping defect.

## Limits / next action

Coastal chapter copy, remaining room types, gallery opening and closing CTA are not covered completely by these six frames. Main session should summarise this report in `docs/visual-qa.md`, apply the caption adjustment if desired, rebuild and recapture, then send only the changed material frame to a fresh isolated reviewer. This reviewer has used its six-image allowance.
