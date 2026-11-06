# Sora House

The hotel website is prepared for a static Vercel deployment. The production build contains 15 public pages and only their runtime assets. The internal component page remains available in the design workspace.

## Vercel settings

Import or deploy the project from this directory, where package.json and vercel.json live.

| Setting | Value |
|---|---|
| Root directory | Project root |
| Framework preset | Other |
| Node.js | 24.x |
| Build command | npm run build |
| Output directory | dist |
| Install command | Skipped; the production build has no package dependencies |

The repository configuration supplies these values. Vercel supports build/output overrides and extensionless static routes through [vercel.json](https://vercel.com/docs/project-configuration/vercel-json), and supports the pinned [Node.js 24 major version](https://vercel.com/docs/functions/runtimes/node-js/node-js-versions).

To deploy from this folder using the [Vercel CLI](https://vercel.com/docs/cli/deploy):

```sh
npx vercel
```

This creates a preview deployment after account/project setup. After reviewing that deployment, production publication uses:

```sh
npx vercel --prod
```

No deployment was made as part of this preparation.

## Production domain and metadata

Optionally set SITE_URL in the Vercel project's environment variables to the HTTPS origin of the final production domain, without a path or query. Otherwise the build uses Vercel's stable VERCEL_PROJECT_PRODUCTION_URL, then VERCEL_URL if needed. Vercel documents these [system environment variables](https://vercel.com/docs/environment-variables/system-environment-variables).

The domain supplies absolute canonical URLs, Open Graph URLs and the sitemap. Local builds without an origin omit domain-specific canonical/sitemap output; no invented domain is embedded. The social preview is a 1200 × 630 PNG derived from the existing brand artwork.

Preview-environment builds mark every page noindex and omit the sitemap. Production planning, stay-details and 404 pages have noindex metadata. Production robots.txt permits crawlers to read those directives, following [Google's noindex guidance](https://developers.google.com/search/docs/crawling-indexing/block-indexing).

SITE_URL is read from the build process environment; the reference .env.example is not automatically loaded by the standalone Node build. No application secrets are required for the current static site.

## Build and check locally

```sh
npm run build
npm run test:metadata
npm test
npm run preview
```

The production preview starts at http://127.0.0.1:4174. It serves dist with this project's clean routes, redirects, asset headers and custom 404 behaviour. It is a local verification server, not a Vercel runtime emulator.

For browser checks, use a second terminal while the preview is running:

```sh
npm --prefix tools ci
npm run test:browser
```

Browser checks use the existing Playwright tool dependency and an installed Google Chrome. They are optional local QA dependencies and are not installed in the Vercel build. Metadata checks rebuild and restore dist, so run them before browser checks.

The standard build itself verifies every public link, fragment, responsive candidate and CSS asset reference, and rejects development paths, unresolved template tokens and private production records in dist.

## Public output

- Clean routes such as /rooms, /room-suite and /book; old .html URLs redirect.
- A root 404.html supplies the unknown-route response, using Vercel's documented [static custom 404 behaviour](https://vercel.com/kb/guide/custom-404-page).
- CSS, JavaScript, fonts, branding and selected WebP images have content-fingerprinted filenames and immutable cache headers.
- Original PNG masters, retired image variants, generation records, contact sheets, screenshots, source documents and the internal component page are excluded from dist.
- .vercelignore additionally reduces CLI uploads by excluding large production sources and local tooling. The output directory is the public boundary for both Git and CLI builds; see [Vercel ignore-file guidance](https://vercel.com/docs/deployments/vercel-ignore).

Only dist is replaced during a production build. Original assets and authoring files remain intact. Do not manually edit generated files in dist.

## Editing and current services

Edit page bodies in design/prototypes/pages/, shared styles in its css directory, and room data in content/room-data/rooms.json. Run npm run build to regenerate both the design pages and production package. npm run dev retains the original design preview on port 4173.

Online reservation inventory, payment and enquiry delivery are not connected. The interface states their current availability, and does not claim that a room was reserved or an enquiry sent. Connecting these services is separate from deploying the static site.

Implementation detail and visual QA scope are recorded in documentation/implementation-handoff.md and docs/visual-qa.md.
