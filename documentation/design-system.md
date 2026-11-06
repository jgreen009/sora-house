# Sora House — design system implementation

Canonical sources are design/brand/brand-identity.md, then design/prototypes/css/tokens.css, then sora.css and components.css. This document describes how the implemented components use that system; it does not introduce a separate palette or type scale.

## Foundation

Instrument Serif 400 roman/italic carries display, editorial text and prices. DM Sans carries interface text. Warm ivory, sandstone, taupe, coastal green and ink remain the palette. Rectangular image edges, hairline dividers, generous margins and asymmetrical editorial grids carry the architectural identity.

Fast/base/slow motion tokens are 250/450/900 ms. Entrances use 16 px travel and shallow image masks, while controls use restrained opacity, line and arrow feedback. Reduced motion removes movement. Native scrolling remains in place.

## Components and data

| Component | Implementation | Content/state source |
|---|---|---|
| Header and footer | Common builder layout | Shared navigation and current-page metadata |
| Editorial room spread | Generated HTML and component CSS | Room catalogue |
| Room overview/related card | Builder-generated article and link | Room catalogue |
| Room heading | Shared room template | Name, outlook, category and rate |
| Room gallery | Main image, two secondary buttons and shared lightbox fragment | Room gallery catalogue entries plus photographic image map |
| Capacity comparison | Desktop table and mobile cards | Catalogue and guest selector |
| Stay summary | Native details disclosure | Validated planning state |
| Planning progress | Four equal columns | Current stage and completed stages |
| Field errors | Label, control, associated error and aria-invalid | Client validation |
| Lightbox | lightbox.fragment.html | Opening group; visible gallery items or three room images |
| FAQ | Single-open accordion | Page-specific content |
| Photographic image | Build-time WebP srcset and sizes | image-map.json and image-variants.json |

Room cards and comparison layouts share catalogue values so future rate or capacity changes remain consistent. Native buttons carry pressed state for room selection; rooms below required capacity are disabled. Avoid decorative scarcity markers without a real inventory service.

## Interaction details

- Focus is visible on buttons, links and room-image controls. Skip-to-content targets a focusable main region.
- Overlays isolate the background, contain keyboard focus, close with Escape and restore focus to the opening control.
- The lightbox uses a 98% opacity scrim to prevent header/menu shapes showing behind its controls.
- Content is visible without JavaScript. An inline enhancement marker enables reveal states only when scripts run; the no-script message explains which controls require JavaScript.
- Image control labels are derived from meaningful alt text. Lightbox captions include image position and room facts where appropriate.

## Asset rules

Higgsfield-generated production assets remain recorded internally with original PNGs, responsive derivatives and reference/job provenance. The active set has 17 selected scenes. Room details were matched to their corresponding room masters. No image is represented as an on-location shoot.

Hero sizing accounts for cover enlargement in portrait viewports. Booking-option thumbnails use their actual 80/120 px rendered sizes to avoid requesting large room images. Brand marks remain SVG. Do not expose original PNGs, contact sheets or production metadata as runtime dependencies in a deployment bundle.
