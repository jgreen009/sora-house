# Sora House — accessibility and performance

## Verified behaviour

The browser suite checks all sixteen pages at 1440, 768, 390 and 360 px: a single main heading, no document-level horizontal overflow, no missing referenced files and no JavaScript console errors. It also covers date/capacity validation, canonical totals, room selection, menu isolation, gallery filtering, lightbox navigation/focus restoration and truthful enquiry status.

All four room galleries are exercised separately: main and secondary images open the shared lightbox, loaded images have intrinsic dimensions, arrow navigation advances within three items and Escape restores the originating control. Mobile room heading visibility, two-column thumbnail alignment and comparison-card action bounds are checked. Content readability and the explanatory notice are checked with JavaScript disabled.

These checks do not establish full WCAG conformance. Manual screen-reader navigation, browser zoom, forced colours, text-spacing overrides, all focus cycles and all content/error states remain to be assessed across browsers and assistive technologies.

## Implemented accessibility patterns

- Semantic headings, navigation labels, a skip link and focusable main region.
- Native room-selection buttons with pressed and disabled states.
- Labels associated with date, guest and enquiry fields; specific errors and aria-invalid.
- Current planning stage announced through aria-current; stage headings receive focus after navigation.
- Native summary disclosure; arrival/departure and pricing are present in its expanded state.
- Modal background inertness, contained focus, Escape, keyboard arrows and focus return.
- Single-open FAQ panels with expanded state and inert collapsed content.
- Live counts for filtering and a focused enquiry-status message.
- Reduced-motion paths and content that remains readable when JavaScript is disabled.

## Asset delivery

The active photographic set contains 17 selected scenes and 52 responsive WebP derivatives, approximately 6.88 MB across every size of the entire library. This is not a per-page transfer total. Original PNGs and retired variants are production sources rather than necessary public runtime assets.

The hero uses 640/1120/1920/2736 px candidates and a cover-aware size expression. Other scene candidates are 640/1120/1600 px. Booking room-choice thumbnails declare 80/120 px sizes, so a small preview does not request a desktop room image. Photographs have intrinsic dimensions and aspect-ratio containers; below-fold images use lazy loading and the leading image has elevated fetch priority. Fonts are served locally with swap behaviour.

## Local measurement boundary

Run node tools/measure-performance.mjs while the preview is running to produce docs/visual-qa/local-performance-2026-10-30.json. It measures home, planning and suite pages at desktop and mobile sizes over local HTTP, after eagerly loading page images. It records asset transfer, chosen image candidates and missing-image checks. Local load timing is diagnostic only: it is not field Web Vitals, a mobile-network benchmark or a production performance guarantee.

Before release, measure deployed performance with representative networks/devices, verify responsive-image choices, configure delivery caching/compression, check layout shifts and LCP, and confirm production metadata, routing and HTTP status behaviour. Online inventory, payment and enquiry delivery must be verified independently when connected.

Local diagnostic results (all images eagerly loaded): home transfers about 1.93 MB at desktop and 2.14 MB at mobile, planning about 0.39 MB, and Suite about 0.72 MB. These include response overhead and depend on the local browser/cache conditions. Four planning previews account for about 150 KB. All six measured cases loaded without broken images or external resource requests. The mobile hero selects its 2736 px candidate; desktop selects 1920 px in the measured viewports.
