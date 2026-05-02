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

/**
 * Props
 */ 
const { 
  accessToken = import.meta.env.VITE_MAPBOX_TOKEN, 
  mapStyle = import.meta.env.VITE_MAPBOX_STYLE, 
  options = {}
} = defineProps<{
  accessToken?: string,
  mapStyle?: string,
  options?: object
}>()

const emit = defineEmits<{
  load: [{ map: Map, sdk?: object }]
}>()

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
      preserveDrawingBuffer: true // Enables export to png
    },
    // Do not override style from options with an empty string
    mapStyle && mapStyle !== '' ? { style: mapStyle } : {})
  )

  // provide('map', map)

  // Wait for the first 'idle' event (everything painted, no in-flight tile
  // requests, no animations) rather than 'load' (style + initial tile batch
  // ready, but vector features may still be painting). 'idle' is strictly
  // stronger.
  map.once('idle', () => {
    // Map is rendered. Mount any slot children and let the consumer's @load
    // handler attach markers / layers / heatmaps.
    loaded.value = true
    emit('load', { map, sdk: mapboxSDK } )

    // Then wait for the *next* idle (after marker/layer draw settles) and
    // capture the canvas to a PNG so the print pipeline can snapshot it.
    // 500 ms timeout fallback in case nothing the consumer does triggers
    // a redraw — we still need the wrapper to flip ready or the render
    // pipeline waits forever.
    let captured = false
    const capture = () => {
      if (captured) return
      captured = true
      requestAnimationFrame(() => {
        try {
          snapshot.value = map.getCanvas().toDataURL('image/png')
        } catch (e) {
          console.error('Map snapshot failed', e)
        }
      })
    }
    map.once('idle', capture)
    setTimeout(capture, 500)
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