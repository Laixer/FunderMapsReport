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

  // Internal Auth Key (overrides jwt token if set)
  readonly VITE_AUTH_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}