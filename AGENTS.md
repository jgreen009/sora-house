# Sora House — Project Instructions

Applies to every session and subagent working in `sora-house/`.

## 1. Project

Phase 1 of the Sora House brief: research, brand identity, art direction, design system,
site architecture and copy, working prototypes (HTML/CSS/JS), motion and responsive
specifications, visual QA, and an implementation handoff for a twelve-room
boutique hotel on the Atlantic coast of Portugal.

Canonical source of truth for visual decisions:
`design/brand/brand-identity.md` → `design/prototypes/css/tokens.css` →
`design/prototypes/css/sora.css` + `components.css`.

## 2. Multimodal context management protocol (mandatory)

The active model has a provider-enforced maximum of **8 images per inference request**.
Image attachments accumulate across a session even after the conversation moves on.

### 2.1 Strict image budget

- Treat **5 images** as the maximum safe working budget for the main session.
- Count every screenshot, asset preview, crop and image-bearing tool output.
- If the number of retained images is uncertain, assume the budget is exhausted.
- Do not open another image in the main session when that could exceed the budget.

### 2.2 Separate visual inspection from development

The main session does design decisions, implementation, architecture and progress
management. Screenshot inspection happens in a **dedicated subagent context**:

1. One subagent task per page + viewport, max **6 images** in that task.
2. Subagent returns a structured written report (no images forwarded).
3. Reports are saved under `docs/visual-qa/` and summarised in `docs/visual-qa.md`.
4. The main session acts on the written findings only.

Do not re-open an image already covered by a report. Consult `docs/visual-qa.md`
first to avoid duplicate work.

### 2.3 Efficient inspection

- Review only frames that contain unverified content.
- Prefer a labelled contact sheet for cross-asset consistency checks, but only when it
  preserves enough resolution for the decision being made.
- For fine typographic defects, capture a tight crop (viewport frame, not full page)
  in an isolated task.
- Chromium `fullPage: true` captures stitch fixed headers and `100svh` heroes
  incorrectly. Use `tools/shoot-frames.mjs` + `tools/stitch-frames.mjs` for review
  images and `tools/.frames/<page>-<viewport>/fNNN.png` for per-frame inspection.

### 2.4 Persistent project memory

Maintain and update these files; do not create duplicates:

- `docs/project-state.md` — phase, completed, in progress, outstanding, decisions,
  known problems, file locations, next action.
- `docs/design-decisions.md` — approved brand identity, colour, type, layout,
  components, motion, responsive behaviour (links to the detailed brand document).
- `docs/asset-manifest.md` — every asset file, usage, provenance, description,
  review status, defects, replacement needs.
- `docs/visual-qa.md` — per-screenshot findings, severity, required change, status.

### 2.5 Handoff

When the image budget is nearly spent: stop opening images, persist all work, update
the four documents above, write a continuation summary, and continue in a fresh
session or subagent context. Do not rely on token compaction to clear image inputs.

### 2.6 Error recovery

If an image-count error appears: stop adding images, save work, update the persistent
documents, and restart visual work in a fresh subagent context. Never regenerate
existing assets as a response to an input error.

## 3. Working rules

- Never fabricate testimonials, press quotes, awards, staff names, founding dates,
  opening hours or other operating detail. Treat Sora House as real professional
  work. Do not add fictional, demo, self-initiated, portfolio or test-project framing.
  Describe unconnected services accurately in normal customer-facing language;
  never imply that a reservation or message was sent when it was not.
- Room data (areas, capacities, rates, counts) must always match
  `content/room-data/rooms.json`.
- British English in all copy. Avoid the banned word list in
  `design/brand/brand-identity.md` §1.5.
- No new dependencies without checking `tools/package.json` and existing usage.
- No comments in code unless explicitly requested.
- Do not commit unless explicitly asked.
- Rebuild prototypes after edits: `node tools/build-prototype.mjs`
- Re-capture review images after visual fixes:
  `node tools/shoot-frames.mjs <page> <viewport>` then `node tools/stitch-frames.mjs`.
- Verify with lint/typecheck commands if the project defines them; there is currently
  no linter configured, so the closest equivalents are the build script and a
  Playwright console-error check.

## 4. Key facts

| Item | Value |
|---|---|
| Rooms | 12 total — Dune 4 × 26 m² / 2 guests / €180, Courtyard 3 × 32 m² / 2 / €230, Atlantic 4 × 38 m² / 2 / €310, Sora Suite 1 × 54 m² / 3 / €430 |
| Stay length | 1–14 nights, one room per booking, EUR, no real payment |
| Display font | Instrument Serif (400 roman + italic) |
| UI font | DM Sans (300/400/500/700) |
| Palette | ivory `#F5F1E9`, sandstone `#DDD0BD`, taupe `#B69979`, coastal `#304444`, ink `#282824` |
| Prototype pages | index, rooms, room-dune/courtyard/atlantic/suite, book, confirmation, experiences, gallery, about, contact, 404, privacy, terms, components |
