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
    Object.assign(options, {
      container: mapcontainer.value,
      preserveDrawingBuffer: true // Enables export to png
    }, 
    // Do not override style from options with an empty string
    mapStyle && mapStyle !== '' ? { style: mapStyle } : {})
  )

  // provide('map', map)

  map.on('load', () => {
    loaded.value = true
    emit('load', { map, sdk: mapboxSDK } )
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
  <div class="MapBox">
    <div ref="mapcontainer"></div>
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
</style>