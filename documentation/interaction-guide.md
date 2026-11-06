# Sora House — implemented interaction and motion guide

30 October 2026. Canonical tokens: `design/prototypes/css/tokens.css`.

## Timing and entrances

250 ms for small control feedback, 450 ms for interface transitions, 900 ms for editorial entrances. Use the existing ease-out curve for entrances and ease-inout for overlay movement. Reveals travel 16 px and run once; short per-element delays establish reading order. Media reveals use a shallow clip mask. Hover/focus image scale is restrained. Native scrolling stays intact.

The site honours `prefers-reduced-motion` in CSS and programmatic animations. Reveals are immediately visible in reduced motion, scrolling becomes immediate and gallery/lightbox animation is skipped. Changing the preference reveals pending content. No parallax, looping decorative motion or autoplay video is used.

## Controls

- Mobile menu: staged links, scroll lock, inert page content, keyboard cycle including the close toggle, Escape and focus restoration. Returning to desktop closes it.
- Room galleries: heading and nightly rate precede the imagery; two mobile thumbnails share a row. Main and secondary controls open one shared three-image lightbox.
- Lightbox: group determined at open time; gallery filters limit the active sequence. Previous/next buttons, arrow keys and horizontal touch swipes navigate. Escape/backdrop closes. Background is inert and focus returns to the opening item. A 98% scrim prevents the underlying header showing through.
- Filters: active `aria-pressed` state, live count, measured position animation and opacity entrance. Filtered layouts use an even grid; the unfiltered gallery keeps its editorial composition.
- Accordion: one open item per group, measured height, expanded state and inert collapsed panels. Content resize updates open height.
- Booking: native room buttons, clear pressed/disabled states and live summaries in both locations, including arrival and departure in the expanded disclosure. Step change focuses and scrolls to its heading. Errors mark the fields, announce messages and focus the first invalid control. Dates and room eligibility are checked again before displaying stay details. Online reservations remain unavailable; no room is held.
- Comparison: guest filter hides room types below required capacity and announces the count. The desktop table becomes stacked comparison cards at ≤640 px, with every price and action visible.
- Contact: local required-field checks, first-error focus and a focused unsent-message status. Online enquiries are unavailable; nothing is submitted.

## Further verification

Automated coverage verifies key keyboard and state transitions. Manual screen-reader testing and visual review of all expanded/error/filtered states remain outstanding. Do not mark captured states accepted without isolated inspection.
