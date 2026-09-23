# FunderMapsReport

Renders the FunderMaps foundation **report** as a web page that a headless
renderer (**Gotenberg** / headless Chrome) turns into the downloadable PDF. It
has no login UI. The API's `POST /api/pdf/:id` mints a render token per PDF
(5 minutes, that pand only, read-only) and passes it in the URL fragment
(`/<pand>#t=fmrt.…`); the page sends it as `Authorization: Bearer fmrt.…`.
There is no key in the bundle any more.

**Stack:** Vue 3 (`<script setup>`), TypeScript, Vite, Chart.js, Mapbox GL.
Package manager: **pnpm**.

## Setup

```sh
pnpm install
pnpm dev      # dev server
pnpm build    # type-check + production build
pnpm preview  # preview the production build
```

## Configuration

See `env.d.ts` for the full `VITE_` env surface. The essentials:

- `VITE_FUNDERMAPS_URL` — FunderMaps API base URL.
- `VITE_MAPBOX_TOKEN`, `VITE_MAPBOX_STYLE` — Mapbox rendering.

## How the PDF is produced

`PDF.vue` loads the building data, renders the chapters, and once everything has
flushed to the DOM sets `[data-pdf-ready="true"]` on `<html>`. The renderer is
configured to wait for that selector before snapshotting, which is more reliable
than a network-idle heuristic. Charts disable animation on first paint so the
snapshot is deterministic.
