<script setup lang="ts">
import { computed } from 'vue'; 
import { storeToRefs } from 'pinia';

import { type LngLatLike, type Map, LngLat, type LayerSpecification } from 'mapbox-gl'

import Chapter from '@/components/Print/Chapter.vue'
import MapBox from '@/components/Common/Mapbox/MapBox.vue'

import { useGeoLocationsStore } from '@/store/building/geolocations'
import { useBuildingStore } from '@/store/buildings';

const { getLocationDataByBuildingId } = useGeoLocationsStore()  

const { buildingId } = storeToRefs(useBuildingStore())


const mapOptions = computed(() => {

  const baseOptions = {
    center: <LngLatLike>[4.897, 52.377],
    interactive: false,
    attributionControl: false,
    performanceMetricsCollection: false,
    zoom: 16
  }

  if (! buildingId.value) {
    return baseOptions
  }

  const buildingData = getLocationDataByBuildingId(buildingId.value)
  if (! buildingData || ! buildingData.residence?.longitude || ! buildingData.residence?.latitude) {
    return baseOptions
  }

  baseOptions.center = new LngLat(
    buildingData.residence?.longitude,
    buildingData.residence?.latitude
  )

  return baseOptions
})

const onLoad = async function onLoad({ map }: { map: Map }) {
  // Add incident source
  const sourcePath = (import.meta.env.VITE_FUNDERMAPS_TILES_URL+'' || '')
    .replace('{SOURCE}', 'incident')

  map.addSource(
    "incident", 
    {
      type: 'vector',
      tiles: [sourcePath],
      // minzoom: 10,
      maxzoom: 16
    }
  )

  // Add incident layer
  // @ts-ignore
  const layerSpecification: LayerSpecification = (await import('../../../config/layers/incident.json')).default
  map.addLayer(layerSpecification)
}
</script>

<template>
  <Chapter
    icon="alert"
    title="Incidenten">

    <section class="space-y-10">
      <div class="aspect-map w-full overflow-clip">
        <MapBox 
          :options="mapOptions"
          @load="onLoad" />
      </div>
      
      <figure>
        <img src="@assets/images/bar-chart.png" alt="" class="w-full" />
      </figure>
    </section>

  </Chapter>

</template>