# Sora House — page specifications

## Architecture

Sixteen routes share one header, footer, type system and colour palette. Four room-detail routes use one template. The room catalogue governs room names, descriptions, areas, guest capacity, unit counts and nightly rates. Generated HTML is build output.

| Route | Primary purpose | Main structure | Main action |
|---|---|---|---|
| index.html | Introduce the house and help choose a room | Editorial hero, date bar, house introduction, four room spreads, material studies, coastal chapter, gallery and closing invitation | Find a room or plan dates |
| rooms.html | Browse and compare four categories | Page introduction, coastal image, date bar, catalogue cards, capacity filter, desktop table/mobile comparison cards and house information | Explore a room |
| room-dune.html | Explore the Dune Room | Heading/rate, three-image gallery, room introduction, date form, features, included items and related rooms | Plan a stay |
| room-courtyard.html | Explore the Courtyard Room | Shared room template with catalogue content | Plan a stay |
| room-atlantic.html | Explore the Atlantic Room | Shared room template with catalogue content | Plan a stay |
| room-suite.html | Explore the Sora Suite | Shared room template with catalogue content | Plan a stay |
| book.html | Plan dates and room together | Dates, room choice, review and stay-details stages; persistent summary | View stay details |
| confirmation.html | Show selected stay details | Reference, room, dates, guests, rate and total, with accurate online-service status | Return to rooms |
| experiences.html | Show three ways to spend time at the house | Chapter navigation, table, coast, quiet room and closing section | Explore rooms |
| gallery.html | Explore the visual world of the house | Category filters, editorial image grid and lightbox | Expand an image |
| about.html | Explain the house and its materials | Chapter navigation, idea, architecture, material grid and invitation | Explore rooms |
| contact.html | Present enquiry entry and useful answers | Form, house facts, FAQ and room invitation | Enquiry submission reports current service status |
| privacy.html | Explain actual data handling | Enquiries, stay URL details and website storage | Return to planning |
| terms.html | Explain current website services | Reservation availability, rates, capacity and enquiries | Return to planning |
| 404.html | Recover from an unknown destination | Clear heading and route back into the house | Return home |
| components.html | Inspect the internal component system | Type, palette, controls, forms, cards and states | Review components |

## Room catalogue

| Category | Units | Area | Maximum guests | Nightly rate |
|---|---:|---:|---:|---:|
| Dune Room | 4 | 26 m² | 2 | €180 |
| Courtyard Room | 3 | 32 m² | 2 | €230 |
| Atlantic Room | 4 | 38 m² | 2 | €310 |
| Sora Suite | 1 | 54 m² | 3 | €430 |

Room overview cards, desktop comparison rows, mobile comparison cards, room details, related-room cards and room-selection controls are generated from content/room-data/rooms.json. Home room spreads use the same catalogue. Update the JSON and rebuild; do not manually edit generated prices.

## Main paths

1. Home → rooms → room detail → dates/guests → room planning → review → stay details.
2. Home/date bar → room planning with the supplied dates/guest count retained.
3. Rooms → capacity comparison → selected room, with all metadata and actions accessible on a narrow screen.
4. Gallery/filter → image lightbox → previous/next image → close and return focus to the opening item.
5. Contact → FAQ or enquiry form → field feedback or accurate unsent-message status.

Online reservation inventory, payment and enquiry delivery are not connected. Planning does not reserve a room or send personal details. Keep interface outcomes accurate when those services are eventually implemented.

## Responsive composition

- Shared layout gutters and display sizes follow tokens.css. Page sections collapse into normal document flow on mobile.
- Room heading precedes the gallery. Price and stay action sit beside the title on desktop and below it on narrow screens.
- Room gallery is 8/4 on desktop; mobile uses one main image and two thumbnails on a shared row. All three open the same keyboard-accessible lightbox.
- Comparison table remains at widths above 640 px; narrower screens use stacked cards showing the nightly rate, area, guests, outlook, unit count and room link without horizontal scrolling.
- Booking uses a four-column progress indicator. The summary is collapsed by default at ≤1080 px and includes room, arrival, departure, nights, guests, rate and total when expanded.
- Mobile actions stack at full width. Chapter navigation returns to normal flow on small screens.

## Content exports

Run node tools/export-copy.mjs to refresh content/pages/*.md. These are reviewable exports from the generated pages; runtime stay values use placeholders. The source bodies, catalogue and metadata remain authoritative for implementation. Shared navigation/footer copy stays in the builder.
