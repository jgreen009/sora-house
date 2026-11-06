# Sora House — site review and continuation plan

Reviewed 30 October 2026. This is the requested review checkpoint before implementation of the design improvements.

## Scope and evidence

Reviewed the page sources, shared builder, CSS, JavaScript, canonical room data, brand system, research, asset manifest, persistent project notes and eight previous desktop QA reports. Built all 16 generated pages successfully. Ran a local Chrome audit on every page at 1440 × 900 and 390 × 844, plus targeted booking and accordion checks. Results: `visual-qa/browser-audit-2026-10-30.json`; reproducible command: `node tools/audit-site.mjs`.

Dedicated visual contexts reviewed six existing home/mobile frames and four booking/mobile frames, and reconciled existing rooms/desktop findings without reopening already reviewed images. These are existing captures, not a fresh full-site visual acceptance pass. All other pages received source and browser checks; not every page, viewport and interaction state has been visually accepted.

## Page inventory

16 generated HTML pages: Home; Rooms; Dune Room; Courtyard Room; Atlantic Room; Sora Suite; Booking; Confirmation; Experiences; Gallery; Our Story; Contact; Privacy; Terms; 404; Components. This is 15 visitor-facing pages plus an internal component specimen. Four room pages share a template, while twelve static page bodies use metadata and the common layout builder.

## What is already built

- Clear architectural identity, Instrument Serif and DM Sans, self-hosted fonts, five-colour palette, horizon mark and wordmarks.
- Brand and reference research; shared tokens and component CSS; responsive editorial layouts; room catalogue, cards, comparison table and room galleries.
- Fixed header with scroll state, animated mobile menu, scroll reveals, hover image treatments, gallery filters/lightbox, accordions, four-step demonstration booking and contact form states.
- Canonical catalogue: twelve rooms in four categories, with correct source areas, capacities, counts and sample rates.
- Static build and screenshot tooling. No framework or new dependency is needed for the next pass.

This is a functional design prototype. There is no booking service, CMS, real payment, mail delivery or deployment configuration. The documentation, copy exports and imagery/video prompt directories are still incomplete or empty despite earlier completion wording.

## Verified problems to prioritise

| Priority | Finding | Evidence / impact |
|---|---|---|
| High | Booking ignores URL prefill | Passing December dates, three guests and suite still displays November defaults and two guests. Home/room-to-booking state transfer is broken. |
| High | Booking review and summary stay blank | `renderSummary` exits because `[data-summary]` does not exist; date/guest state is not initialised from the displayed defaults; only the first matching summary nodes are selected. Review room and total remain dashes. |
| High | Booking permits invalid progression | Room step advances without selection; a room labelled unavailable remains selectable and reaches confirmation; past dates pass custom validation. |
| High | Keyboard selection is incomplete | Room options use `role="button"` without keyboard activation; `aria-pressed` stays false after selection because code looks for a nested button. |
| High | Mobile gallery layout is broken | Desktop `:nth-child` placements override less specific mobile rules. This is visible on home/mobile and also applies to gallery source. |
| High | Mobile progress wraps | Fourth step appears on a disconnected second line in existing book/mobile frames. |
| Medium | Imagery still reads as studies | Procedural SVGs lack photographic detail, duplicate compositions and have crop mismatches noted in earlier reviews. Their placeholder status remains explicit. |
| Medium | Motion and interaction implementation diverges from specification | Accordion permits two open panels despite single-open policy. Menu/lightbox do not contain focus or make background inert. Filter changes hide/show instantly. Reveal timing/travel uses hard-coded values differing from the register. |
| Medium | Copy invents operational details | Contact/FAQ/experiences/rooms include service hours and other unsupported operational promises; experiences says nothing needs reservation but later requires advance booking. Remove or rewrite as clearly conceptual statements. |
| Medium | QA and tooling records are stale | Eight completed desktop reports are absent from central status. Some suggested fixes are present, others unverified. Capture scripts hard-code a missing browser; capture clears the whole frame root. Python is unavailable on PATH. Repair before fresh review capture. |

All 32 page/viewport loads produced no JavaScript console errors, missing local HTML references, or document-level horizontal overflow. The empty image in the closed gallery lightbox was flagged by the diagnostic; this is an uninitialised hidden image, not evidence of a missing visible asset. No full accessibility, performance, HTTP hosting or SEO audit is claimed.

## Design direction

Preserve the existing identity and develop a more expressive architectural editorial site. Keep the palette, fonts, square media corners, room data and quiet copy. Improve composition and image quality as well as animation.

1. Home: coordinate hero headline, caption and action entrances; follow with a concise house introduction, stronger alternating room spreads, a material-detail composition and a deliberate coastal closing scene. Reduce repeated image/text sequences and repair spacing between coloured surfaces.
2. Rooms: use larger room imagery, offset captions and more distinct image proportions. Add useful comparison controls and an immediately legible area/capacity/rate hierarchy, sourced from the catalogue. Keep room browsing straightforward on touch screens.
3. Room detail: balance a dominant image with smaller details, keep captions and crops intentional, preserve selected room/dates into booking and maintain a useful availability action on mobile without covering content.
4. Story and experiences: introduce numbered chapters and a desktop sticky chapter index where useful; alternate full-width imagery, narrower prose and material studies. Mobile becomes normal document flow. Correct unsupported claims and image/caption inconsistencies.
5. Gallery: fix the grid cascade and button reset, reconcile aspect ratios, then add animated filter reflow, crossfades and robust keyboard/touch lightbox navigation. Keep focus stable as items change.
6. Booking: reliable state and capacity/date validation first; then a compact four-column mobile progress bar, expandable mobile summary, full-width primary actions and smooth, focused step transitions. Derive all display data from the catalogue.

## Motion plan

Use existing native browser capabilities and JavaScript; no new animation dependency is justified yet. Make motion a shared component system: short image masks, staggered text/image entrances, line and arrow hover/focus feedback, staged menu opening/closing, gallery reflow, lightbox image crossfades, and booking-summary/step transitions. Use transform and opacity for entrances, and measured height only where content expansion requires it.

Use the existing fast/base/slow durations (250/450/900 ms) and easing tokens with shorter control feedback and slower editorial entrances. Optional cross-document View Transitions can progressively enhance navigation under HTTP hosting, with normal navigation as fallback; file-protocol auditing does not verify them. Keep native scrolling, visible focus and a complete reduced-motion path. Existing policy excludes parallax and autoplay video; no brand-policy revision is required for this direction.

## Implementation sequence and acceptance

1. Repair browser/capture tooling and central QA tracking; fix booking state, validation, keyboard behaviour, mobile gallery and progress layout; remove unsupported operating detail. Build and run focused browser checks.
2. Implement home as the design reference for composition and shared motion. Reuse the resulting components across rooms and room detail.
3. Apply chapter layouts, gallery transitions and contact/confirmation polish. Prepare a coherent concept-photography brief; generated imagery must be labelled and tracked as generated concept art, not photographs of a real hotel.
4. Rebuild, capture changed pages and interaction states, and inspect each page/viewport in isolated contexts. Include compact mobile, tablet, desktop, keyboard, reduced motion and touch flows. Complete handoff, page specifications, motion guide, copy exports and asset provenance.

The first implementation pass should improve reliability and mobile usability before the new home layout establishes the visual standard. No redesign, asset generation or deployment was performed during this review checkpoint.
