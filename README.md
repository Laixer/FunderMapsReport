# FunderMapsReport

Renders the FunderMaps foundation **report** as a web page that a headless
renderer (**Gotenberg** / headless Chrome) turns into the downloadable PDF. It
has no login UI — it authenticates with a single static API key baked in at
build time (`VITE_AUTH_KEY`, sent as `Authorization: Bearer fmsk.…`).

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
- `VITE_AUTH_KEY` — static `fmsk.` API key (sent as a Bearer token).
- `VITE_MAPBOX_TOKEN`, `VITE_MAPBOX_STYLE` — Mapbox rendering.

## How the PDF is produced

`PDF.vue` loads the building data, renders the chapters, and once everything has
flushed to the DOM sets `[data-pdf-ready="true"]` on `<html>`. The renderer is
configured to wait for that selector before snapshotting, which is more reliable
than a network-idle heuristic. Charts disable animation on first paint so the
snapshot is deterministic.
