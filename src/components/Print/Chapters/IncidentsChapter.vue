<script setup lang="ts">
import { computed } from 'vue'; 
import { storeToRefs } from 'pinia';

import { type LngLatLike, type Map, LngLat, type LayerSpecification, Marker } from 'mapbox-gl'

import Chapter from '@/components/Print/Chapter.vue'
import MapBox from '@/components/Common/Mapbox/MapBox.vue'
import BarChart from '@/components/Charts/BarChart.vue';

import { useGeoLocationsStore } from '@/store/building/geolocations'
import { useBuildingStore } from '@/store/buildings';
import { useStatisticsStore } from '@/store/building/statistics.ts';

const { getLocationDataByBuildingId } = useGeoLocationsStore()  
const { getStatisticsDataByBuildingId } = useStatisticsStore()

const { buildingId } = storeToRefs(useBuildingStore())


const mapOptions = computed(() => {

  const baseOptions = {
    center: <LngLatLike>[4.897, 52.377],
    interactive: false,
    attributionControl: false,
    performanceMetricsCollection: false,
    zoom: 10
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
    .replace('{SOURCE}', 'incident_district')

  map.addSource(
    "incident_district", 
    {
      type: 'vector',
      tiles: [sourcePath],
      // minzoom: 10,
      maxzoom: 16
    }
  )

  // Add incident layer
  // @ts-ignore
  const layerSpecification: LayerSpecification = (await import('../../../config/layers/incident-district.json')).default
  map.addLayer(layerSpecification)
  map.setLayoutProperty('incident-district', 'visibility', 'visible')

  if (! buildingId.value) {
    return false
  }
  
  const buildingData = getLocationDataByBuildingId(buildingId.value)
  if (! buildingData || ! buildingData.residence?.longitude || ! buildingData.residence?.latitude) {
    return false
  }

  new Marker({
      draggable: false
  }).setLngLat(new LngLat(
    buildingData.residence?.longitude,
    buildingData.residence?.latitude
  )).addTo(map);
}

/**
 * Map Legend
 */

const legendItems = [{
  label: '1 incident',
  color: "#c1d4e6"
}, {
  label: '3 incidenten',
  color: "#91bad6",
}, {
  label: '5 incidenten',
  color: "hsl(203, 36%, 50%)",
}, {
  label: '10 incidenten',
  color: "hsl(213, 55%, 26%)"
}]



/**
 * GRAPH data
 */
const buildingStatistics = computed(() => {
  if (! buildingId.value) return null
  return getStatisticsDataByBuildingId(buildingId.value)
})

const graphData = computed(() => {
  return {
    data: buildingStatistics.value?.totalIncidentCount.map(pair => pair.totalCount),
    labels: buildingStatistics.value?.totalIncidentCount.map(pair => pair.year+''),
  }
})


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

      <div class="MapLegend flex">
        <div v-for="item in legendItems" :key="item.label" class="flex items-center px-2">
          <div :style="`background-color: ${item.color};`" class="w-3 h-3 mr-1"></div>
          <div class="label">{{ item.label }}</div>
        </div>
      </div>
      
      <BarChart
        v-if="graphData.data && graphData.data?.length !== 0"
        class="w-full"
        title="Aantal incidenten in de wijk"
        :data="graphData.data"
        :labels="graphData.labels" />
    </section>

  </Chapter>

</template>

<style>
.MapLegend {
  margin-top: 1rem !important;
  color: #808c99;
}

</style>