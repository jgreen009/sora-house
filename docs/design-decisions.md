# Sora House — Design Decisions

Approved decisions register. Detail and rationale live in
`design/brand/brand-identity.md` (brand) and `design/prototypes/css/tokens.css`
(implementation). This file is the short, current, authoritative summary — if it and
a source file disagree, this file records the latest ruling and the source is
updated to match.

**Status:** Brand identity retained. First implementation of the user-authorised modernisation completed 30 October 2026.

30 October 2026 implementation: home now uses stronger editorial room spreads,
offset material studies and a coastal chapter. Story and activities have chapter
navigation, galleries use corrected responsive compositions and filter motion, and
booking has a compact mobile summary. Native scrolling, reduced-motion support,
the no-parallax/no-autoplay rules, canonical room data and accurate service-availability
messages remain binding. Implementation detail: `documentation/interaction-guide.md`.

Updated component decisions: booking room options are native pressed-state buttons;
all capacity-compatible choices are room-planning options, without live-inventory
or scarcity claims. Summary uses a native details disclosure, initially collapsed at ≤1080 px.
Progress uses four equal columns. Today is evaluated in Europe/Lisbon. Confirmation
recomputes canonical rates. Gallery groups are rebuilt from visible items on open.
Motion uses 16 px reveal travel, slow editorial entrances and base interface
transitions, with fast feedback for small controls. Material captions stack at
≤600 px. Higgsfield-generated photographic assets now replace public illustration placements;
provenance and retired variants remain in the internal manifest.

## 1. Brand identity

- **Property:** Sora House, a twelve-room coastal retreat on the Atlantic
  coast of Portugal.
- **Positioning:** "less noise and more attention" — a small, well-built house where
  hospitality is attentive rather than performed.
- **Personality:** calm, intimate, architectural, warm, timeless, considered.
- **Voice:** plain and specific, second person, quietly inviting, British English.
  No urgency, no superlatives, no fabricated credibility.
- **Banned vocabulary:** luxury, exclusive, unparalleled, world-class, stunning,
  breathtaking, unforgettable, curated, elevate, journey, immersive.
- **Imagery concept:** two ideas that cannot be confused — *sky* and *horizon*.
  The mark is a circle cut by a broken horizon line.
- **Logo:** quiet typographic wordmark in Instrument Serif with wide tracking; the
  pictorial mark is used only in favicon, social preview, footer signature and
  booking-flow states.

## 2. Colour system

| Token | Hex | Use |
|---|---|---|
| `--c-ivory` | `#F5F1E9` | Default page background |
| `--c-sandstone` | `#DDD0BD` | Secondary surfaces; at most one per screen |
| `--c-taupe` | `#B69979` | Accents, rules, image tints only |
| `--c-coastal` | `#304444` | Footer and one "dark moment" per page |
| `--c-ink` | `#282824` | Primary type |
| `--c-ink-70` | `#5C5A52` | Secondary body copy |
| `--c-ink-50` | `#82806F` | Captions and metadata; never body copy |
| `--c-accent` | `#8A6A4B` | Focus rings and interactive accent |
| `--c-success` / `--c-error` / `--c-warning` | `#3F6B54` / `#8C3A2B` / `#8A6A2F` | Form states |

Rules: no pure white except form fields, no pure black; Taupe never a body-copy
background; Coastal carries no more than one dark section per page.

## 3. Typography

- **Display:** Instrument Serif 400 (roman and italic). Headlines, editorial
  introductions, prices, pull quotes. Never below 20 px.
- **UI/body:** DM Sans 300/400/500/700. Body copy, navigation, buttons, labels, forms.
- Fluid `clamp()` scale from 360 px to 1280 px; full table in
  `design/brand/brand-identity.md` §5.2 and `tokens.css`.
- Maximum measure 62 characters for body copy; no justified text; sentence case
  except eyebrows and buttons (buttons uppercase, `0.12em` tracking).
- Fonts are self-hosted in `assets/fonts/` (OFL) and embedded in the brand SVG
  masters.

## 4. Layout conventions

- Container 1360 px, wide container 1600 px, text column 760 px.
- Gutter 64 px desktop / 40 px tablet / 20 px mobile (16 px ≤359 px).
- Grid 12 / 8 / 4 columns, 24 px gap (16 px mobile).
- Section spacing 128 px desktop, 88–104 px tablet, 56–80 px mobile.
- 4 px base spacing unit: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128, 160, 200.
- **Image radii 0 px** (2 px for cards only) — the house has no rounded corners.
- Editorial splits alternate 5/7 and 7/5 so no two consecutive sections share a
  silhouette. Image sits optically higher than its text.
- A single hairline `--c-line` under section headings, price rows and card footers
  is the recurring "drawing" motif.
- Centred type only in the hero, section titles and the confirmation summary.

## 5. Component decisions

- **Header:** fixed, 72 px tall (mobile 60 px), transparent over a hero and solid
  ivory elsewhere. `is-scrolled` state switches to ivory and swaps the light
  wordmark for the dark one. Interior pages carry `header-solid` on the body.
- **Mobile menu:** full-screen overlay, z-index below the header so the wordmark
  stays visible and switches to the dark lockup over the ivory panel.
- **Booking bar:** one shared component. On the home page it sits under the hero;
  the booking page places editable dates in the main flow and a sticky summary
  at top 104 px on desktop. Mobile summary is an expandable details element.
- **Room cards:** image, name, one-line description, spec strip (area, guests,
  rate), hairline footer. No badges, no "popular" tags.
- **Room gallery:** heading and rate precede an 8/4 split. On mobile the main image
  sits above two side-by-side thumbnails. All three images open the shared lightbox.
- **Gallery grid:** per-page compositions (home 7/5, gallery 8/4) — no masonry,
  no carousel.
- **Accordion:** used for FAQs and room detail; single-open behaviour.
- **Lightbox:** shared fragment across gallery and room pages, 98% opacity scrim,
  keyboard navigation, Escape, focus containment and focus restoration.
- **Comparison:** catalogue-generated table above 640 px; stacked cards at ≤640 px
  expose every rate, room fact and action without horizontal scrolling.
- **Buttons:** 52 px desktop / 56 px mobile, uppercase 13–14 px DM Sans 500,
  accent or ink fill. Secondary buttons are hairline only.
- **Reveal animation:** intersection-observer fade-and-rise, 16 px travel, staggered
  by `--dur-base`; disabled under `prefers-reduced-motion`.

## 6. Motion standards

| Token | Value | Use |
|---|---|---|
| `--ease-out` | `cubic-bezier(.22,.61,.36,1)` | Entrances, reveals, hovers |
| `--ease-inout` | `cubic-bezier(.65,0,.35,1)` | Overlay and menu transitions |
| `--dur-fast` | `.25s` | Hover, focus, colour changes |
| `--dur-base` | `.45s` | Reveals, accordion, filter changes |
| `--dur-slow` | `.9s` | Lightbox and page-level transitions |

Motion is restrained: nothing bounces, nothing spins, no parallax, no autoplaying
video. All motion respects `prefers-reduced-motion: reduce`.

## 7. Responsive behaviour

- Breakpoints: ≥1280 desktop, 768–1279 tablet, <768 mobile, ≤359 compact mobile.
- Booking bar collapses from a four-field row to a stacked form and then to a
  single full-width "Check availability" button at ≤480 px.
- Editorial splits become single column below 900 px, image first.
- Galleries become 2-up at 900 px and 1-up at 640 px with adjusted spans.
- `100svh` hero with `min-height` fallback keeps the hero stable when mobile
  browser chrome collapses.
- Tap targets minimum 44 px on mobile; form fields stack full width.

## 8. Content and booking rules

- Room count, areas, capacities and rates always mirror `content/room-data/rooms.json`.
- One room per booking, 1–14 nights, EUR, no payment taken.
- Errors are specific and human ("Choose an arrival date."), never "Invalid input".
- Empty states offer a next step, not an apology.
- The site states that it is a clear service status wherever a guest might
  believe a real booking occurred.

## 9. Photography and art direction

- Seventeen selected Higgsfield-generated photographic assets replace the public vector-study placements.
- Original vectors, PNG masters and retired variants are preserved; generation provenance remains internal.
- The image map and derivative manifest govern generated page output. Brand marks remain vector assets.
- Room details use corrected references to their matching master images. Verify crop and contrast in each page composition.

## 10. Production wording and photography — 30 October 2026

The user requires realistic professional project language across work. Remove
project-status labels from public copy and metadata. The global preference is
saved in C:/Users/OWNER/.codex/AGENTS.md and the project rule is updated.

Use the Higgsfield MCP connection for the requested image production. Seventeen
selected FLUX 3 images form the current site library, including four corrected
room details referenced to their own master images. Keep AI-generation provenance
in production documentation; do not claim an on-location shoot. All former public
SVG illustration placements compile to responsive WebP via image-map.json.
The tall hero uses cover-aware sizes and a full-width 2736 px variant, a stronger
horizontal scrim, and 38% horizontal positioning on mobile. Brand SVGs remain.

## 11. Deployment packaging

Production emits clean root routes, content-fingerprinted runtime assets, shared
metadata and a custom 404.html. The internal component page is excluded. The source
HTML design workflow remains intact. This packaging does not change the approved
visual identity. The old direct 404 footer link has been removed from navigation.
Vercel configuration and root scripts are authoritative for deployment; README.md
records the setup and actual current service availability.
