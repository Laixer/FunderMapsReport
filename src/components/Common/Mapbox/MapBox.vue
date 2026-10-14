<script setup lang="ts">
/**
 * @copyright MIT 
 * @author Wouter van Dam (wouter@journeyworks.nl)
 * 
 * This is a basic, generic Vue wrapper component for MapBox. 
 * This module is included in the source code of the application itself for simplicity and reliability
 */

import { nextTick, onMounted, onUnmounted, provide, readonly, ref } from 'vue'
import mapboxgl, { type Map } from 'mapbox-gl'

import 'mapbox-gl/dist/mapbox-gl.css';

import { trackPending } from '@/lib/pdfReadiness'

/**
 * The Mapbox instance
 */
let map: Map

/**
 * Reference to the DOM container
 */ 
const mapcontainer = ref()

/**
 * Used to indicate to child components that the mapbox instance is loaded
 */
const loaded = ref(false)
provide('loaded', readonly(loaded))

/**
 * Static PNG snapshot of the rendered canvas. We swap the live WebGL canvas
 * out for an <img> as soon as the map has settled, because headless Chrome's
 * print pipeline doesn't reliably capture WebGL canvases — the rendered PDF
 * gets a blank rectangle where the map should be. A regular <img> always
 * captures correctly.
 */
const snapshot = ref<string | null>(null)

// Hold the PDF ready-flag until this map has been snapshotted. When PDF.vue's
// wait for all maps runs out first, the map is snapshotted as it is then.
let resolveSettled: () => void = () => {}
trackPending(new Promise<void>((resolve) => { resolveSettled = resolve }), () => {
  console.warn('Map snapshot taken at the time limit; the map may be incomplete')
  capture()
})

let captured = false

/**
 * Props
 */ 
const { 
  accessToken = import.meta.env.VITE_MAPBOX_TOKEN, 
  mapStyle = import.meta.env.VITE_MAPBOX_STYLE, 
  options = {},
  onLoad
} = defineProps<{
  accessToken?: string,
  mapStyle?: string,
  options?: object,
  // The @load handler, declared as a prop so the snapshot can wait for the
  // promise of an async handler (one that adds its layer after an import).
  onLoad?: (event: { map: Map, sdk?: object }) => unknown
}>()

const capture = function() {
  if (captured) return
  captured = true
  try {
    snapshot.value = map.getCanvas().toDataURL('image/png')
  } catch (e) {
    console.error('Map snapshot failed', e)
  }
  resolveSettled()
}

/**
 * 
 */
const loadMapbox = function() {
  const mapboxSDK = mapboxgl

  if (accessToken) {
    mapboxSDK.accessToken = accessToken  
  }

  map = new mapboxSDK.Map(
    Object.assign({}, options, {
      container: mapcontainer.value,
      preserveDrawingBuffer: true, // Enables export to png
      // Labels appear at once. A fade-in only adds frames before the 'idle'
      // the snapshot waits for, and on a busy renderer a frame takes seconds.
      fadeDuration: 0
    },
    // Do not override style from options with an empty string
    mapStyle && mapStyle !== '' ? { style: mapStyle } : {})
  )

  // provide('map', map)

  // Wait for the first 'idle' event (everything painted, no in-flight tile
  // requests, no animations) rather than 'load' (style + initial tile batch
  // ready, but vector features may still be painting). 'idle' is strictly
  // stronger.
  map.once('idle', async () => {
    // Map is rendered. Mount any slot children and let the consumer's @load
    // handler attach markers / layers / heatmaps.
    loaded.value = true
    try {
      await onLoad?.({ map, sdk: mapboxSDK })
    } catch (e) {
      console.error('Map layers failed', e)
    }

    // Snapshot on the first 'idle' after the handler's last addSource /
    // addLayer: it only fires once every source and tile in use has loaded
    // and been painted. A check of isStyleLoaded() + areTilesLoaded() is not
    // enough: both are true in the moment between a new source's metadata
    // arriving and its first tile being requested, and the PDF then missed
    // the pand marker or the Incidenten colours. The repaint makes sure an
    // 'idle' follows even when the handler changed nothing.
    if (captured) return
    map.once('idle', capture)
    map.triggerRepaint()
  })
}

/**
 * Not Before Mounted, because DOM element needs to be avaialble
 */ 
onMounted(() => {
  // Delay loading, so that Mapbox will calculate the height properly
  setTimeout(loadMapbox, 200)
})

/** 
 * Mapbox cleans up after itself with this method call
 *  https://docs.mapbox.com/mapbox-gl-js/api/map/#map#remove
 */ 
onUnmounted(() => {
  // Never leave the PDF pipeline waiting on a map that no longer exists.
  captured = true
  resolveSettled()
  nextTick(() => {
    map.remove()
  })
})
</script>

<template>
  <div class="MapBox" :data-mapbox-ready="snapshot ? 'true' : 'false'">
    <div v-show="!snapshot" ref="mapcontainer"></div>
    <img v-if="snapshot" :src="snapshot" alt="" class="MapBox__snapshot" />
    <slot v-if="loaded" />
  </div>
</template>

<style>
.MapBox {
  width: 100% !important;
  height: 100% !important;
}
.mapboxgl-map {
  width: 100% !important;
  height: 100% !important;
}
.MapBox__snapshot {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
}
</style>