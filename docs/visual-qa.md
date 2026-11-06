# Sora House — Visual QA Log

One row per review. Severity: **Blocker** (breaks the page or a core task),
**Major** (visible defect that harms the brand or legibility), **Minor** (polish),
**Nit** (near-invisible), **Pass** (no action).

Verification status: `Open` (not yet fixed), `Fixed` (changed and re-captured),
`Verified` (changed, re-captured and re-inspected), `Accepted` (no change needed).

Review images are produced by `tools/shoot-frames.mjs` + `tools/stitch-frames.mjs`
(frame-based capture stitched by PIL). Chromium `fullPage` captures are not used
for review because fixed headers and `100svh` heroes are stitched incorrectly.

Frame source: `tools/.frames/<page>-<viewport>/fNNN.png`
Stitched: `design/prototypes/screenshots/<page>-<viewport>.png`

## Review reconciliation — 30 October 2026

### Current implementation results

The first modernisation pass is built. `browser-validation-2026-10-30.json` records
64 page/viewport checks over all 16 pages at 1440/768/390/360 px, plus targeted
booking, confirmation, comparison, contact, menu and gallery checks. The HTTP run
passes without console errors, missing local references or document overflow.
This replaces the initial diagnostic as the current functional status.

| Finding / review | Current status | Evidence / limit |
|---|---|---|
| Booking state, summaries, validation and keyboard selection | Fixed; browser verified | URL prefill, canonical totals, capacity exclusions, roomless/past-date/15-night rejection, keyboard selection and confirmation recomputation pass. All compatible rooms now carry sample availability; no unavailable/scarcity claim remains. |
| Home mobile gallery / metadata | Verified in sampled fresh frames | `implementation-index-mobile-2026-10-30.md`: single-column gallery and coherent room metadata; no major defect in six inspected frames. |
| Booking mobile progress / compact summary | Verified starting frame at 390 px | `implementation-book-mobile-2026-10-30.md`: no wrap, legible compact summary. Remaining starting-state frames and expanded/later states await visual review. |
| Home desktop composition | Accepted sampled areas; one minor fixed | `implementation-index-desktop-2026-10-30.md`: hero, rooms, materials and footer clean. Coastal/gallery spacing fixed by section--dark, recaptured and measured at 128 px; changed boundary not re-inspected visually. |
| Material caption crowding | Verified fixed at 390 px | `verification-material-caption-mobile-2026-10-30.md`, fresh f007: labels/descriptions stack without clipping. |
| Booking opening spacing | Minor refinement applied | Booking aside margin reduced at mobile size. No full new visual acceptance claimed. |
| Other changed pages and states | Captured, inspection pending | Fresh desktop/mobile frames for rooms, Atlantic detail, gallery, story, activities, contact and confirmation; book room-choice mobile also captured. |

Fresh frame metadata records offsets and viewport; browser-canvas stitching now
replaces Python and removes repeated header strips. Capture clears only selected
frame files after checking the resolved target. No new dependency was installed.
Representative normal-motion hero reaches opacity 1 and transform none in HTTP
preview. Reduced-motion paths and state transitions pass browser checks; a full
manual accessibility/performance or frame-by-frame motion audit is not claimed.
An additional HTTP check after the final filter changes verifies normal-motion
reflow, restoration of all 12 images, and zero running gallery animations after a
filter change under reduced motion. No JavaScript errors were observed.

The remaining text and pending table below describe the **initial audit baseline**,
not the current fixed state. Do not carry a baseline issue forward without checking
this implementation summary and the current source.

The original pending table below is historical and incomplete. `task-01` through
`task-08` are completed desktop review reports. Some changes already exist in CSS;
none should be called visually verified without matching recapture evidence.
Do not reopen their covered frames. Recommendations that contradict the brand
register (for example, counting footer plus one feature as two forbidden dark
moments) are not accepted automatically.

| Review | Evidence | Finding / severity | Status |
|---|---|---|---|
| Home/mobile | `visual-qa/review-index-mobile-2026-10-30.md`, six existing frames | Major: desktop gallery placements beat mobile rules. Minor: section-boundary spacing and room metadata alignment. | Open |
| Booking/mobile | `visual-qa/review-book-mobile-2026-10-30.md`, four existing frames | Major: fourth progress step wraps. Minor: blank/oversized summary, action width, opening spacing. | Open |
| Rooms/desktop reconciliation | `visual-qa/review-rooms-desktop-2026-10-30.md` | Existing frame coverage complete; several reported contrast fixes present in source. Unsupported operating-hours copy requires correction. | Fresh acceptance pending |
| All 16 pages, desktop/mobile | `visual-qa/browser-audit-2026-10-30.json` | 32 local Chrome loads: no console errors, missing local references or horizontal document overflow. Closed lightbox has empty image source. | Browser checks complete; not full visual acceptance |
| Booking interactions | Same JSON | High: URL prefill ignored; blank summary; roomless progression; unavailable-room confirmation; past dates accepted; pressed state incorrect. | Open |
| Contact accordion | Same JSON | Medium: two panels can remain open despite single-open specification. | Open |

Full review, limitations and implementation order: `site-review-2026-10-30.md`.
The legacy capture script's Chromium executable is absent; installed Chrome works.
Repair target-specific capture and the unavailable Python stitching dependency
before fresh captures. No visual fixes were applied in this review checkpoint.

---

## 1. Review log

| # | Page | Viewport | Frames / source | Observation | Issue | Severity | Required change | Status |
|---|---|---|---|---|---|---|---|---|
| 1 | index | desktop 1440×900 | stitched, chunks 0–4 | Hero, scrim and fixed header read correctly. Header turns solid ivory over the booking bar at scroll. Editorial splits alternate 5/7 and 7/5. Gallery composition 7/5 holds. Dark coastal section resets the rhythm once. | None | Pass | — | Accepted |
| 2 | index | mobile 390×844 | pending | — | — | — | — | Open |
| 3 | rooms | desktop | pending | — | — | — | — | Open |
| 4 | rooms | mobile | pending | — | — | — | — | Open |
| 5 | room-atlantic | desktop | pending | — | — | — | — | Open |
| 6 | room-atlantic | mobile | pending | — | — | — | — | Open |
| 7 | book | desktop | pending | — | — | — | — | Open |
| 8 | book | mobile | pending | — | — | — | — | Open |
| 9 | experiences | desktop | pending | — | — | — | — | Open |
| 10 | experiences | mobile | pending | — | — | — | — | Open |
| 11 | gallery | desktop | pending | — | — | — | — | Open |
| 12 | gallery | mobile | pending | — | — | — | — | Open |
| 13 | about | desktop | pending | — | — | — | — | Open |
| 14 | about | mobile | pending | — | — | — | — | Open |
| 15 | contact | desktop | pending | — | — | — | — | Open |
| 16 | contact | mobile | pending | — | — | — | — | Open |
| 17 | confirmation | desktop | pending | — | — | — | — | Open |
| 18 | confirmation | mobile | pending | — | — | — | — | Open |
| 19 | components | desktop | pending | — | — | — | — | Open |
| 20 | components | mobile | pending | — | — | — | — | Open |
| 21 | 404 | desktop | pending | — | — | — | — | Open |
| 22 | 404 | mobile | pending | — | — | — | — | Open |

## 2. Known tooling issues (not design defects)

| Issue | Impact | Workaround |
|---|---|---|
| Chromium `fullPage: true` duplicates the fixed header and the `100svh` hero | False "duplicated hero" reports | Use frame-based capture and stitching |
| `img.decode()` hangs in screenshot scripts | Script timeouts | Do not await `img.decode()` |
| `node tools/shoot.mjs desktop` can exceed 300 s | Truncated runs | Use a 600 s timeout |

## 3. Defect log

(Empty until the delegated reviews report back. Each fix is recorded here with its
row number and verification status.)

## 4. Method

Each delegated review task receives at most six images, inspects them, and returns a
written report saved under `docs/visual-qa/`. The main session acts only on the
written findings, which keeps the main session's image budget intact.

Review instructions given to each task:

- Judge against `design/brand/brand-identity.md` and `docs/design-decisions.md`.
- Report: element, what is wrong, why it matters, severity, concrete CSS fix.
- Flag anything that is not visible but is clearly broken (misaligned baselines,
  inconsistent gutters, missing hairlines).
- Do not report stylistic preferences that contradict the approved identity.
- Do not modify files.

## Photographic implementation and production wording — 30 October 2026

This entry supersedes older wording and illustration-only status in the earlier audit baseline.

- All sixteen pages now use professional public copy. The browser suite rejects the unwanted project-status framing. Metadata, social-preview SVG and generator text are updated too.
- Enquiry submission accurately reports that a message was not sent. Room planning ends in stay details and does not claim a successful reservation. Online services remain visibly unavailable until connected.
- Higgsfield generated 21 masters; 17 are selected. Four room details were regenerated from their own primary image and accepted for matching galleries. The earlier four are retired. See asset-house-exterior, asset-library and asset-room-corrections reports.
- All 63 photographic image placements compile to responsive WebP using the image map. No public procedural-art image placement remains; brand SVGs stay in use.
- photography-index-desktop/mobile reports inspected six new frames each, with no major layout defects. Their hero contrast and softness findings were corrected.
- verification-photographic-hero-desktop/mobile each inspected one fresh changed frame: desktop heading contrast is resolved; mobile hero is sharp with a readable crop. Both pass.
- Latest HTTP validation passes 64 page/viewport checks, with one h1, no document overflow, missing local references or JavaScript console errors, plus the targeted interaction suite.
- Fresh capture/stitch sets are updated for the changed pages and all room galleries. Captures alone do not certify the remaining uninspected frames or expanded/error/filtered states.

The old pre-photography captures/reports remain historical evidence. Use the newest reports and capture metadata when assigning the next isolated review. Do not reopen already reviewed frames in a context whose image budget is spent.

Final asset integrity check: all 21 original PNGs and 64 WebP derivatives exist; byte sizes match the derivative manifest. Seventeen selected scenes resolve in the image map. Generated HTML contains no rejected public framing or remaining procedural-art image placement. Original vectors and retired details remain intact.

## Room browsing and planning-state QA follow-up

| Finding / scope | Change | Status / evidence |
|---|---|---|
| Room image expand controls had no overlay | Shared lightbox.fragment.html compiled into all four room routes and gallery; named image buttons | Fixed and browser verified on all four room types, including loaded images, 1/3→2/3 navigation, secondary-image indexing and focus restoration |
| Room identity below the image stack | Name, rate and stay action moved above gallery | Verified in verification-room-suite-desktop-production.md and verification-room-suite-mobile-production.md |
| Tall mobile image stack | Main image plus a two-column thumbnail row | Verified at 390 px in Suite review; alignment/browser checks pass |
| Mobile comparison hid prices/actions offscreen | Catalogue-generated stacked cards replace the table at ≤640 px | Verified in verification-rooms-comparison-mobile-production.md; guest filter and action bounds also checked |
| Misleading information-section headings | Length of stay / Guests and room capacity | Verified in the comparison review |
| Expanded summary omitted dates | Arrival and departure added using shared summary bindings | Fixed, recaptured and browser verified; date-row refinement not separately visually re-inspected |
| Underlying menu visible behind lightbox close control | Shared overlay token raised to .98 opacity | Verified fixed in verification-room-lightbox-backdrop-production.md |
| Content hidden without scripts | Progressive reveal marker and readable default styles, useful no-script notice | Browser verified; unconnected enquiry form remains natively disabled without scripts |
| Small booking thumbnails requested large sources | Actual 80/120 px responsive size hints | Local diagnostics confirm 640 px candidates; four previews transfer about 150 KB including response overhead |

The final HTTP suite passes 64 page/viewport checks and all targeted interaction checks. The suite includes the no-script form guard and corrected room-gallery flows. An initial test used the locator disabled check on a fieldset; direct browser inspection showed the fieldset and its submit button were disabled. The test now checks the native fieldset property plus the actual submit button state, and passes.

Fresh captures and stitched outputs cover the four changed room routes, rooms overview, contact, booking review/expanded-summary/date-error/final-planning states and mobile gallery/room lightboxes. Not every newly captured state has been visually accepted. The report scope and image budgets are explicit in each review.

Local diagnostics: local-performance-2026-10-30.json records six home/planning/suite viewport cases, no missing images or external requests, responsive hero selection and small booking preview candidates. These are local asset-delivery checks, not field Web Vitals.

## Vercel production package verification

- npm run build: 15 public pages, 68 fingerprinted assets, 7,415,010 bytes; public
  links, fragments, responsive candidates and CSS resources resolve.
- npm test: clean URLs, query-preserving legacy redirects, immutable asset headers,
  custom unknown/nested 404 responses and private-source exclusion pass.
- npm run test:metadata: explicit production origin, Vercel preview environment,
  sitemap/canonical/share URLs and invalid-origin rejection pass; normal build restored.
- npm run test:browser: 60 page/viewport cases (15 pages × four widths) and all
  room-lightbox/planning/menu/filter/no-script/contact checks pass on dist over HTTP.
- social-preview-png-deployment.md: raster sharing image visually accepted.
- Production clean routing and fingerprinting preserve the previously reviewed
  layout; this task did not introduce a visual redesign.

The local production preview applies this repository’s static routing and headers.
It does not establish a completed Vercel cloud deployment. No publication occurred.
The result summary is vercel-readiness.json and browser detail is
production-browser-validation.json.
