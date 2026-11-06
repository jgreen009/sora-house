# Rooms desktop — review reconciliation

Date: 30 October 2026. Viewport: 1440 × 900. New image inputs: 0.

## Coverage and evidence

The complete existing frame set, `tools/.frames/rooms-desktop/f000.png` through `f006.png`, is already covered by completed written reviews:

- `task-03-index-rooms-desktop.md`: rooms f000–f003.
- `task-04-rooms-room-desktop.md`: rooms f004–f006.

No frames were reopened, following AGENTS.md §2.2. The observations below reconcile those reports with current source. They are not a fresh visual acceptance of the current rendering.

## Findings

| Element | Previous finding | Current source evidence | Status / next action |
|---|---|---|---|
| Eyebrows, room indices, specification metadata, comparison headers | Small muted text below AA contrast | `sora.css` uses `--c-ink-70`; comparison headers in `components.css` also use this token | Implemented; visual verification not established by the summary log |
| Footer headings and legal line | Muted text below AA contrast | Both now use `--c-ivory-70` | Implemented; verify in next changed-page capture |
| Comparison action heading | Visually blank column heading | `rooms.body.html` now contains visible `Action` | Implemented; verify in next changed-page capture |
| Fictional-property disclaimer | Excessive text measure | `.notice--demo` now has `max-width: 62ch`; dark variant has `72ch` | Implemented; confirm the dark variant against the 62-character body-copy rule |
| Dark booking-panel labels on related room pages | Poor dark-surface contrast | `.panel--dark` now overrides labels, eyebrow and hints with `--c-ivory-70` | Shared fix present; outside this page's visual scope |
| Operating-detail copy | New source audit finding: the rooms page asserts breakfast service from 7.30am to 11am | `rooms.body.html` contains these invented hours | Major content compliance issue: remove unsupported operating hours, consistent with AGENTS.md §3 |

The previous reports describe clean desktop header alignment, grid gutters, image aspect-ratio handling, section spacing and footer layout. They report no desktop room-page blockers. Source CSS aligns card specification rows with flexible card bodies and `margin-top: auto`.

## Compatible modernisation opportunities

1. Refine the four-room collection into a more deliberate editorial sequence: an Atlantic-led 7/5 opening spread, followed by a quieter paired comparison. Preserve the current asymmetry and square imagery.
2. Add accessible comparison interactions so a visitor can choose two room types and inspect the meaningful differences. On mobile, use a compact labelled comparison layout rather than relying solely on a wide table.
3. Give each room card coordinated image, title and arrow hover/focus states. Use modest scale or crop movement and short fades; preserve visible keyboard focus and disable motion for reduced-motion users.
4. Animate section entrances once, with a short bounded stagger, rather than having every block follow the same timing. Keep content readable without JavaScript.
5. Carry selected dates and guest count consistently from availability controls to the booking page. The current rooms page contains its own booking bar despite the decision register describing availability controls on the home and booking pages only; resolve the documentation and implementation mismatch deliberately.
6. Replace procedural room studies with consistent final imagery in a separate asset-production phase. Motion polish alone cannot supply the material, light and depth expected from a hotel presentation.

Do not add parallax, scroll hijacking, autoplay video, rounded-card styling or carousel navigation under the existing approved brand rules. Any such change requires an explicit revision of the design direction.

## Limits

This task reconciled existing complete visual reviews and current source. It did not rerender pages, test interactions, inspect mobile, modify implementation files or establish fresh visual acceptance. The central QA log and project-state document need to distinguish implemented fixes from verified fixes.
