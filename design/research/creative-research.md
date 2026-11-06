# Sora House — Creative Research Findings

**Stage 1 deliverable · Phase 1**
Research carried out live on 27 October 2026 via direct page fetches of the reference sites named in the brief, plus inspection of their navigation, content structures and booking entry points.

| Reference | Fetch status | What was observed |
|---|---|---|
| theslow.com | Live fetch successful | Site structure, nav, room presentation, footer, booking CTA |
| aman.com | Live fetch successful | Destination-first IA, editorial copy register, media-led cards, footer depth |
| sixsenses.com | Live fetch successful | Persistent availability bar, room comparison, multi-destination booking model |
| normcph.com | Live fetch successful | Editorial project storytelling, typography hierarchy, whitespace discipline |
| casacook.com | Live fetch successful | Group-level booking entry, offers model, editorial hotel cards |
| thehoxton.com | Live fetch successful | Location-first booking flow, neighbourhood positioning, form UX patterns |
| aesop.com | Fetch blocked (HTTP 403) | Not observed live; no claims made about its current implementation |

Aesop returned a 403 response and could not be inspected. It is therefore **not** cited as an observed reference anywhere in this document. Any mention of it in the brief's reference list is treated as a prompt for the *category* of restrained editorial commerce design, not as a source of observed detail.

---

## 1. Observations — what the references actually do

### 1.1 The Slow (theslow.com)

**Observed**
- The header is intentionally thin: wordmark, a short list of destinations, and a single `Book Now` action. No secondary utility clutter is pushed above the fold.
- The homepage is a stack of *editing* moments rather than a feature list: a full-bleed palm/ocean motif, then a timber-slat facade, a shaded deck, then interiors — each image introduces a different material and light condition.
- Room types are presented as two distinct suite pages, each with its own hero, its own image rhythm, and a separate booking path. There is no "all rooms" comparison table.
- The footer carries contact block, location block, mailing-list capture and repeat navigation in four quiet columns.
- Booking is delegated to an external reservation engine (`reserveonline.id`), reachable from a persistent header action.

**Applicable principle**
> A small hotel earns trust by showing *how the place feels*, then letting the booking engine handle conversion. The website's job is desire and orientation, not transaction.

**What Sora House takes:** a single persistent `Book Your Stay` action; a header with no utility clutter; room types with distinct identities rather than a spec grid; a footer that leads with location and contact, not with newsletter capture.

---

### 1.2 Aman (aman.com)

**Observed**
- Information architecture is *destination-first*: Destinations → individual properties → within a property: Experiences, Wellness, Dining, Residences, Offers.
- Editorial copy is short, sentence-length, and place-specific: "Set amid wild nature, Amanvari emerges where the distinct desert, mountain and ocean landscapes of Baja's East Cape converge."
- Media cards are image-dominant with a small number of typographic lines. No badges, no price, no "from €" on destination cards.
- Three distinct booking entry points coexist: a `Reserve` action in the header, `/book/aman` with date pre-fill, and property-level reservation pages.
- The footer is extremely deep (properties, corporate, legal, social, languages, newsletter) — a consequence of a 36-property group, and deliberately not a model for a 12-room property.

**Applicable principle**
> Write about the *place*, not the product. Give every destination a sentence with a geographic fact in it.

**What Sora House takes:** the discipline of place-specific copy sentences; image-dominant cards with no price pressure; an editorial "experiences" layer separate from accommodation.

**What Sora House rejects:** a destination tree (there is only one property), corporate footer depth, a group-level offers engine.

---

### 1.3 Six Senses (sixsenses.com)

**Observed**
- The availability bar is a *persistent, global* layer: check-in, check-out, guests, room count, and a `Check availability` action that is available before the user has chosen a property.
- The booking widget exposes its own micro-language: `Available`, `Not available`, `Minimum stay`, `No arrival` — the calendar states its constraints rather than silently refusing input.
- There is a room-comparison feature with an explicit maximum (3 rooms).
- The site's headline register is wellness- and sense-led: "Some places you visit. Others, you feel, by reconnecting with yourself, others, and the world around you."
- Property cards combine a single strong image with a one-line description and a second link line.

**Applicable principle**
> A booking widget should *teach* its rules. Say "minimum stay" out loud instead of blocking a click.

**What Sora House takes:** a booking bar with visible constraint language; explicit "no availability" and "minimum stay" states; a single-room-per-booking rule stated plainly.

**What Sora House rejects:** multi-room complexity and a multi-destination selector — Sora House has twelve rooms and one building.

---

### 1.4 Norm Architects (normcph.com)

**Observed**
- Every project gets a short literary paragraph (60–90 words) that describes a *quality of attention* rather than a feature list. "Luxury is expressed not through abundance, but through presence, and from letting a few, carefully chosen things be given the room to truly mean something."
- Project index entries carry: image, title, discipline taxonomy, and year. No price, no CTA verb beyond `View`.
- White space is aggressive and consistent; images are allowed to be large relative to text blocks.
- A curated `Latest work` strip sits above the full archive, and `Press` is treated as a distinct destination rather than a footer link.

**Applicable principle**
> Luxury is communicated by *what is withheld*. One sentence per idea; let images carry the rest.

**What Sora House takes:** one-paragraph project descriptions for experiences; images large relative to copy; `View` verbs rather than `Book now` on editorial links.

---

### 1.5 Casa Cook (casacook.com)

**Observed**
- One global booking widget handles property → dates → guests → rooms → book.
- The homepage sells *the collection* first, then individual hotels; each hotel card carries location as a small metadata line and a short atmospheric description.
- Offers are given their own structural layer with dates, blackout caveats, minimum stay and payment policy stated inline.
- Testimonials exist on the homepage — Sora House will **not** use testimonials, since the project is fictional and fabricating guest quotes would be dishonest.

**Applicable principle**
> Put the terms next to the offer. A demo reservation should state its rules where they are read.

**What Sora House takes:** policy transparency adjacent to the price; a single global booking widget; a collection-level entry pattern reused as the rooms-collection pattern.

**What Sora House rejects:** fabricated reviews and occupancy statistics.

---

### 1.6 The Hoxton (thehoxton.com)

**Observed**
- The primary brand idea is *neighbourhood*, not bedroom. The hero headline is "Welcome to The Hoxton"; the taxonomy is "Trending destinations / Explore all our hotel locations".
- Room presentation is tied to the property, with restaurant and bar sub-navigation listed as part of the stay proposition.
- The enquiry form demonstrates every state explicitly: required-field errors, per-field messages, a success panel, and a "carry on browsing?" continuation.
- A live multi-city availability widget sits in the header from the first pixel, including a location dropdown and date clearing.

**Applicable principle**
> A form is a designed sequence of states, and its success state is part of the experience, not an afterthought.

**What Sora House takes:** explicit form validation and success states; a header booking affordance that works before any page context exists; the idea that the *destination context* is part of the product promise.

---

## 2. Cross-cutting principles adopted for Sora House

1. **One booking verb, one booking bar.** A single availability widget is shared between header, homepage and rooms collection. It is the only place dates are entered.
2. **Photography precedes specification.** Every accommodation and experience is introduced by an image before its numbers. The room spec strip (size / guests / rate) is a *supporting* row, never the hero.
3. **Editorial, then commercial.** The homepage moves from atmosphere → philosophy → accommodation → experiences → architecture → gallery → booking invitation. The booking ask is never the first thing on the page and never the loudest.
4. **Restraint as a conversion strategy.** There are no countdowns, no urgency banners, no "limited availability" theatre, no star ratings, no badges. The demo booking flow is calm because the property is calm.
5. **Rules stated in plain English.** Arrival rules, stay length, capacity, one-room-per-booking, demo-only status — all surfaced at the point of decision, not hidden in a modal.
6. **Cards carry a reason to click.** Every card links with `View room`, `Read more`, `Explore` — never a naked arrow.
7. **Motion is confirmation, not decoration.** Motion confirms an action or reveals an image. Nothing loops, nothing parallaxes aggressively, nothing blocks input.

## 3. Anti-patterns explicitly rejected

| Anti-pattern | Why it is rejected | Sora House alternative |
|---|---|---|
| Full-viewport video hero with autoplay sound | Bandwidth, LCP risk, motion sensitivity | Static art-directed hero image, optional muted loop with poster fallback |
| Glassmorphic floating booking widget over imagery | Reduces text contrast, feels generic 2018 template | Solid ivory bar with a hairline top rule, docked in the composition |
| Carousel of featured rooms | Hides inventory, poor keyboard support, bad on touch | Asymmetric editorial grid, all four categories visible |
| Testimonial slider with fabricated quotes | Dishonest for a fictional property | No testimonials; guest information is described factually |
| Price "from €X" badges on editorial cards | Pushes the page toward comparison shopping | Rate shown quietly in the specification row, in full |
| Marquee of scrolling logos | No relevance to a single property | Not used |
| Scroll-jacking horizontal galleries | Breaks user control and native scroll feel | Native vertical rhythm; lightbox for full-screen viewing |
| Cookie-modal wall on first visit | Hostile first impression | Deferred until an actual consent-requiring feature exists |
| Newsletter capture above the fold | Interrupts discovery | Footer-only capture, marked as a concept form |

## 4. Reference-to-decision map

| Decision | Primary reference | Secondary |
|---|---|---|
| Persistent header booking action | Six Senses | Casa Cook |
| One shared availability widget | Six Senses | The Hoxton |
| Editorial card language (`View room`) | Norm Architects | Aman |
| Place-specific one-sentence copy | Aman | Norm Architects |
| Visible booking constraint language | Six Senses | Casa Cook |
| Form state completeness | The Hoxton | — |
| Thin header, no utility clutter | The Slow | The Hoxton |
| Location-led footer | The Slow | The Slow (contact block) |
| Material-led imagery rhythm | The Slow | Norm Architects |
| Policy adjacent to price | Casa Cook | Six Senses |

## 5. Research limitations

- One reference (Aesop) could not be fetched and is therefore excluded from observation.
- No analytics, conversion-rate or performance data was available for any reference; all statements above are observations of design and structure, not claims about commercial performance.
- No user testing was carried out. The journey assumptions in `documentation/page-specifications.md` are design assumptions and are labelled as such.
