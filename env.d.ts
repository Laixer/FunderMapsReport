/// <reference types="vite/client" />

interface ImportMetaEnv {
  // Mapbox
  readonly VITE_MAPBOX_TOKEN: string
  readonly VITE_MAPBOX_STYLE: string

  // PDOK
  readonly VITE_PDOK_LOCATIONSERVICE: string

  // Fundermaps Base API Url
  readonly VITE_FUNDERMAPS_URL: string
  
  // Default Mapset
  readonly VITE_DEFAULT_MAPSET_ID: string
  readonly VITE_DEFAULT_LAYERS: string

  // Fundermaps Tile server 
  readonly VITE_FUNDERMAPS_TILES_URL: string

  // Fundermaps base mapbox style
  readonly VITE_FUNDERMAPS_BASE_STYLE: string

  // Static API key baked into the bundle. Required at build time — the
  // headless renderer (Gotenberg) has no user session, so this is the only
  // auth path. Sent as `Authorization: Bearer ${VITE_AUTH_KEY}` (fmsk. key).
  readonly VITE_AUTH_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}