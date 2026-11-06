# Sora House — Brand Identity System

**Stage 2 deliverable · Phase 1**
All assets in this document were produced for this project. Nothing is borrowed from an existing hotel.

---

## 1. Positioning

### 1.1 Positioning statement

> **Sora House** is a twelve-room coastal retreat on the Atlantic edge of Portugal, made for travellers who want less noise and more attention. It pairs the discipline of a small, well-built house — pale limestone, warm oak, honest daylight — with the kind of hospitality that remembers how you take your coffee and leaves the rest of the day alone.

### 1.2 Brand philosophy

Sora House exists to make *attention* feel like a luxury that doesn't need announcing. The house is small enough that every room can be considered, and set far enough from the road that the day can be arranged around the light. Nothing here is performed for the guest. The architecture, the food, the coastline and the quiet are the offering.

### 1.3 Manifesto

> We built Sora House for the hours between plans.
>
> For the walk to the water when nobody is asking you to be anywhere.
> For the hour before the light goes, when the room is still warm from the sun.
> For a breakfast that takes all morning and a dinner that takes all evening.
>
> Twelve rooms. One coastline. A house that knows when to speak and when to leave you to the view.

### 1.4 Personality

**Calm · Intimate · Architectural · Warm · Timeless · Considered**

| Trait | Means | Does not mean |
|---|---|---|
| Calm | Low frequency, slow transitions, generous negative space | Cold, minimal-to-the-point-of-emptiness |
| Intimate | Twelve rooms, one host, personal knowledge | Exclusive, gated, members-only |
| Architectural | Form, proportion and material carry the identity | Cold, technical, showy |
| Warm | Human hospitality, food, texture, low light at dusk | Cutesy, rustic-chic, themed |
| Timeless | Materials and forms with long lives | Nostalgic pastiche |
| Considered | Every element has a reason | Minimalist emptiness for its own sake |

### 1.5 Tone of voice

**We write like a good host, not a brochure.**

- **Plain, not poetic.** One image per sentence. If a sentence needs a second adjective, cut one.
- **Specific, not grand.** "Pale limestone and warm oak" beats "stunning materials". "Twelve rooms" beats "exclusive retreat".
- **Inviting, not urgent.** No "don't miss out", no "limited availability", no countdowns.
- **Second person, quietly.** "You can walk to the water in seven minutes" is more useful than "guests enjoy unrivalled coastal access".
- **British English.** Comma before "and" in lists; "travellers"; "colour"; metres; EUR written "€".

**Words we use:** still, warm, quiet, light, morning, walk, sea, oak, lime, linen, made, grown, nearby, unhurried, held.
**Words we avoid:** luxury, exclusive, unparalleled, world-class, stunning, breathtaking, unforgettable, curated, elevate, journey (as in "wellness journey"), immersive, experience (as a noun for an activity).

### 1.6 Brand principles

1. **Show the room, not the promise.** Every claim is attached to something visible in the next image.
2. **Fewer, better things.** Twelve rooms. Three experiences. One table. Nothing padded out.
3. **Time is the amenity.** The product is the quality of an hour, not the count of features.
4. **Made by people, for people.** Named makers, local growers, the house team — without invented awards or numbers.
5. **Honest service.** Use professional, production-facing language. State the availability of online services plainly and never imply that an unconnected form sent a message or reserved a room.

---

## 2. Visual identity rationale

The identity is built from **two ideas that cannot be confused with each other**: the *sky* and the *horizon*.

The brand's mark (see §3) is a circle cut by a broken horizon line — a low sun over the Atlantic. It is used sparingly: favicon, social preview, footer signature, and the loading/press state of the booking flow. It is never used as decoration next to body copy.

The wordmark is deliberately **quiet and typographic rather than pictorial**, so the photography carries the imagery. Set in Instrument Serif with wide, even tracking, it reads as a small press mark rather than a logo stamp.

The palette comes from the house itself: lime-washed plaster, dry dune grass, weathered oak, deep sea in shadow. Nothing is pure white, nothing is fully saturated, and the darkest tone is a green-grey rather than a neutral black — the colour of water seen from above.

---

## 3. Logo and wordmark

### 3.1 Wordmark

**Construction:** Instrument Serif, roman, uppercase.
- Horizontal lockup: cap height 88 units at the 760 × 132 artboard; tracking `0.145em`; optically aligned on a common baseline.
- Stacked lockup: `SORA` at 104 units with `0.12em` tracking above `HOUSE` at 42 units with `0.54em` tracking; the second line starts 12 units further left than the first to create a deliberate optical indent rather than a centred stack.
- Minimum reproduction width: 120 px (horizontal) / 90 px (stacked). Below this, use the mark alone.
- Clear space: equal to the height of the `O` on all four sides.

**Why:** the wide tracking gives the mark the air of an architectural drawing caption, and the serif's low stroke contrast keeps it quiet next to photography.

**Files produced**

| File | Use |
|---|---|
| `assets/branding/wordmark-horizontal-ink.svg` | Navigation and footer on light surfaces |
| `assets/branding/wordmark-horizontal-ivory.svg` | Navigation and footer on dark surfaces |
| `assets/branding/wordmark-stacked-ink.svg` | Brand board, print, large lockups |
| `assets/branding/wordmark-stacked-ivory.svg` | Dark-surface lockup |
| `assets/branding/mark-horizon-ink.svg` / `-ivory.svg` | Mark-only, monochrome |
| `assets/branding/favicon.svg` | Browser icon (mark in a coastal square) |
| `assets/branding/social-preview.svg` | 1200 × 630 social share card |

All SVGs are live, editable vectors. The wordmark files embed the Instrument Serif WOFF2 as a data URI so they render identically on any machine without external font loading; the type remains selectable text. **For print or final handover, convert the type to outlines** and keep the embedded-font files as the working master.

### 3.2 The mark — horizon

A circle (the sun / the eye) crossed by a horizontal line broken at the circle's edge (the horizon / the sea). Built on a 64 × 64 grid, stroke 2.6, round caps, no fill. The gap in the horizon line is deliberate: it is the negative space the house is named for.

**Rejected symbols and why**

| Candidate | Rejected because |
|---|---|
| Wave glyph | Reads as a spa or surf brand; narrows the property to water sport |
| House/roof glyph | Generic hospitality signifier; implies a pitched roof the building does not have |
| Monogram "SH" in a circle | Same silhouette as the horizon mark, less ownable |
| Sun only | Loses the sea; becomes a "sunset" brand |
| Leaf/botanical | Belongs to a different category (wellness retreat) |

### 3.3 Lockup rules

- The mark never sits directly above the wordmark in a way that creates a centred badge; the mark is either standalone, or left-aligned with the wordmark's cap height.
- Minimum mark size: 20 px.
- The mark may be tinted only in Ink, Ivory, Coastal or Taupe. No gradients, no drop shadows.
- No rotations, outlines or effects.

---

## 4. Colour

### 4.1 Core palette

| Token | Name | Hex | Role |
|---|---|---|---|
| `--c-ivory` | Warm Ivory | `#F5F1E9` | Primary page background |
| `--c-sandstone` | Sandstone | `#DDD0BD` | Secondary surfaces, quiet panels |
| `--c-taupe` | Warm Taupe | `#B69979` | Accents, rules, image tints, disabled fills |
| `--c-coastal` | Deep Coastal | `#304444` | Dark feature sections, footer, inverted text |
| `--c-ink` | Soft Charcoal | `#282824` | Primary typography |

### 4.2 Supporting tokens

| Token | Hex | Role |
|---|---|---|
| `--c-ink-70` | `#5C5A52` | Secondary body text on ivory |
| `--c-ink-50` | `#82806F` | Muted text, captions, metadata |
| `--c-ink-30` | `#B3B0A2` | Disabled text, placeholder |
| `--c-line` | `#DED5C4` | Borders, dividers on light surfaces |
| `--c-line-soft` | `#E9E2D5` | Hairline separators inside cards |
| `--c-line-dark` | `#4A5C5B` | Borders on coastal surfaces |
| `--c-coastal-80` | `#3B5150` | Elevated panel on dark surfaces |
| `--c-ivory-70` | `#CFCABB` | Secondary text on coastal surfaces |
| `--c-ivory-50` | `#A9A79A` | Muted text on coastal surfaces |
| `--c-accent` | `#8A6A4B` | Focus ring and interactive accent (Taupe, darkened) |
| `--c-success` | `#3F6B54` | Success messages and confirmed states |
| `--c-error` | `#8C3A2B` | Error messages and invalid fields |
| `--c-warning` | `#8A6A2F` | Caution copy, "limited" notices |
| `--c-overlay` | `rgba(24, 30, 30, 0.98)` | Lightbox and modal scrim |

### 4.3 Contrast verification

Measured with the WCAG 2.x relative-luminance formula against the stated pairing.

| Pairing | Ratio | Result |
|---|---|---|
| Ink `#282824` on Ivory `#F5F1E9` | 13.6 : 1 | Pass AAA |
| Ink-70 `#5C5A52` on Ivory | 6.4 : 1 | Pass AA (and AAA for large text) |
| Ink-50 `#82806F` on Ivory | 3.6 : 1 | Large text / non-text only — **never used for body copy** |
| Ink on Sandstone `#DDD0BD` | 10.4 : 1 | Pass AA |
| Ivory on Coastal `#304444` | 9.8 : 1 | Pass AA |
| Ivory-70 `#CFCABB` on Coastal | 7.1 : 1 | Pass AA |
| Accent `#8A6A4B` on Ivory | 4.7 : 1 | Pass AA for UI and large text |
| Error `#8C3A2B` on Ivory | 6.2 : 1 | Pass AA |
| Success `#3F6B54` on Ivory | 5.9 : 1 | Pass AA |
| Ink on White (for form fields) | 14.2 : 1 | Pass AAA |

**Rule:** Ink-50 and Taupe are reserved for image overlays, decorative rules and ≥24 px display type. All body and label text uses Ink-70 or darker. Focus rings use `--c-accent` at 3:1 against their background, with an additional 1 px Ivory offset ring when they sit on imagery.

### 4.4 Usage rules

- Ivory is the default. Sandstone appears at most once per screen as a section shift.
- Coastal is used for two things only: the footer, and one "dark moment" per page — the architecture section, the booking summary, the confirmation page.
- Taupe is an accent, never a background for body copy.
- Nothing is pure white (`#FFFFFF`) except form field backgrounds; nothing is pure black.

---

## 5. Typography

### 5.1 Families

- **Display — Instrument Serif** (roman 400, italic 400). Headlines, editorial introductions, prices in confirmation, pull quotes. Used at weight 400 only.
- **Interface & body — DM Sans** (300 / 400 / 500 / 700). Body copy, navigation, buttons, labels, metadata, forms.

Both are self-hosted under `assets/fonts/` (SIL Open Font License), with `fonts.css` and the original licence files available for redistribution.

### 5.2 Scale

Desktop (≥1280 px) / Tablet (768–1279) / Mobile (<768). Mobile values use a fluid `clamp()` between 360 px and 768 px.

| Role | Desktop | Mobile | Line height | Tracking | Family / weight |
|---|---|---|---|---|---|
| Display XL (hero) | 104 px | 44–58 px | 1.02 / 1.06 | −0.02em | Instrument Serif 400 |
| Display L (page title) | 76 px | 40–50 px | 1.05 | −0.015em | Instrument Serif 400 |
| Display M (section) | 52 px | 32–40 px | 1.12 | −0.01em | Instrument Serif 400 |
| Display S (card title) | 34 px | 26–30 px | 1.18 | 0 | Instrument Serif 400 |
| Editorial intro | 26 px | 21–24 px | 1.55 | 0 | Instrument Serif 400 |
| H1 / H2 / H3 | 40 / 30 / 23 px | 30 / 25 / 20 px | 1.2 | −0.005em | Instrument Serif 400 |
| Body L | 19 px | 17 px | 1.65 | 0 | DM Sans 300 |
| Body | 17 px | 16 px | 1.7 | 0 | DM Sans 300 |
| Body S / caption | 15 px | 14 px | 1.6 | 0 | DM Sans 400 |
| Label / eyebrow | 12 px | 11–12 px | 1.3 | 0.16em, uppercase | DM Sans 500 |
| Navigation | 14 px | 15 px | 1.2 | 0.06em | DM Sans 500 |
| Button | 13 px | 14 px | 1 | 0.12em, uppercase | DM Sans 500 |
| Form label | 13 px | 13 px | 1.3 | 0.08em, uppercase | DM Sans 500 |
| Price | 24 px | 21 px | 1.2 | 0 | Instrument Serif 400 |
| Price suffix | 13 px | 12 px | 1.2 | 0.04em | DM Sans 400 |

### 5.3 Rules

- Maximum measure: 62 characters for body copy (≈ 680 px at 17 px), 34 characters for editorial serif paragraphs.
- Never set Instrument Serif below 20 px — its low contrast disappears.
- Display type is set in sentence case, not all-caps, except eyebrows and buttons.
- Italic Instrument Serif is reserved for single words within a serif paragraph (e.g. *slower*) and for captions in the gallery.
- Buttons are uppercase with `0.12em` tracking; everything else is sentence case.
- No justified text anywhere.

---

## 6. Spacing, grid and composition

### 6.1 Spacing scale

Base unit 4 px. Scale: `4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128, 160, 200`.

### 6.2 Layout

| Rule | Value |
|---|---|
| Container max | 1360 px |
| Text container max | 760 px |
| Wide container max | 1600 px (large-screen editorial spreads) |
| Desktop gutter | 64 px |
| Tablet gutter | 40 px |
| Mobile gutter | 20 px (16 px at ≤359 px) |
| Grid | 12 columns desktop / 8 tablet / 4 mobile, gutter 24 px |
| Section spacing | 128 px desktop, 96 px tablet, 72 px mobile |
| Editorial band | 200 px desktop / 120 px mobile between major movements |
| Image radii | 0 px (architecture, gallery), 2 px (cards) — the house has no rounded corners |
| Buttons | 52 px height desktop, 56 px mobile, 12 px horizontal padding + 24 px minimum |
| Focus ring | 2 px `--c-accent`, 3 px offset, 1 px Ivory inner ring on imagery |

### 6.3 Composition rules

1. **The horizontal line is the house's drawing.** A single hairline (`--c-line`) under section headings, price rows and card footers repeats throughout.
2. **Asymmetry with a reason.** Editorial layouts alternate weight: a 5/7 split, then a 7/5 split, so no two consecutive sections share a silhouette.
3. **Image first, text second.** In any split, the image sits higher in the frame (optical alignment), never centred against centred text.
4. **One dark section per page** to reset the rhythm.
5. **No centred body text.** Centred type is limited to the hero, section titles and the confirmation summary.

---

## 7. Voice in design

The identity extends into interface copy: labels are nouns, buttons are verbs in the first person plural or plain infinitive, and empty states offer a next step rather than apologise.

- Buttons: `Check availability` · `View room` · `Explore availability` · `Read the story` · `Send enquiry`
- Labels: `Arrival` · `Departure` · `Guests` · `Your name` · `Email address` · `What can we help with?`
- Errors: `Choose an arrival date.` · `Departure must be after arrival.` · `Stays are limited to 14 nights.` · `That room sleeps two guests.` — never "Invalid input".
- Empty states: `No rooms match those dates. Try shifting your stay by a night or two.`
