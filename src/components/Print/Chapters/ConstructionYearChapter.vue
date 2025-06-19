<script setup lang="ts">
import { computed } from 'vue';
import { storeToRefs } from 'pinia';

import { type LngLatLike, type Map, LngLat, type LayerSpecification, Marker } from 'mapbox-gl'

import { IConstructionYearPair } from '@/datastructures/interfaces/api/IStatistics.ts';

import Chapter from '@/components/Print/Chapter.vue'
import BarChart from '@/components/Charts/BarChart.vue';

import MapBox from '@/components/Common/Mapbox/MapBox.vue'

import { useStatisticsStore } from '@/store/building/statistics';
import { useBuildingStore } from '@/store/buildings';
import { useGeoLocationsStore } from '@/store/building/geolocations'
import MapLegend from '@/components/MapLegend.vue';

const { getStatisticsDataByBuildingId } = useStatisticsStore()
const { buildingId } = storeToRefs(useBuildingStore())

const { getLocationDataByBuildingId } = useGeoLocationsStore()

/******************************************************************************
 * Graph
 */

const buildingStatistics = computed(() => {
  if (!buildingId.value) return null
  return getStatisticsDataByBuildingId(buildingId.value)
})

const constructionGraph = computed(() => {
  if (!buildingStatistics.value?.constructionYearDistribution) {
    return {
      data: [],
      labels: []
    }
  }

  return {
    data: buildingStatistics?.value?.constructionYearDistribution.decades.map((decade: IConstructionYearPair) => {
      return decade.totalCount
    }),
    labels: buildingStatistics.value.constructionYearDistribution.decades.map((decade: IConstructionYearPair) => {
      return `${decade.decade.yearFrom.substring(0, 4)}-${decade.decade.yearTo.substring(0, 4)}`
    })
  }
})


/******************************************************************************
 * Mapbox
 */

const mapOptions = computed(() => {

  const baseOptions = {
    center: <LngLatLike>[4.897, 52.377],
    interactive: false,
    attributionControl: false,
    performanceMetricsCollection: false,
    zoom: 17,
    pitch: 25
  }

  if (!buildingId.value) {
    return baseOptions
  }

  const buildingData = getLocationDataByBuildingId(buildingId.value)
  if (!buildingData || !buildingData.residence?.longitude || !buildingData.residence?.latitude) {
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
  const sourcePath = (import.meta.env.VITE_FUNDERMAPS_TILES_URL + '' || '')
    .replace('{SOURCE}', 'analysis_building')

  map.addSource(
    "analysis_building",
    {
      type: 'vector',
      tiles: [sourcePath],
      // minzoom: 10,
      maxzoom: 16
    }
  )

  // Add incident layer
  // @ts-ignore
  const layerSpecification: LayerSpecification = (await import('../../../config/layers/construction-year.json')).default
  map.addLayer(layerSpecification)
  map.setLayoutProperty('construction-year', 'visibility', 'visible')

  if (!buildingId.value) {
    return false
  }

  const buildingData = getLocationDataByBuildingId(buildingId.value)
  if (!buildingData || !buildingData.residence?.longitude || !buildingData.residence?.latitude) {
    return false
  }

  new Marker({
    draggable: false
  }).setLngLat(new LngLat(
    buildingData.residence?.longitude,
    buildingData.residence?.latitude
  )).addTo(map);
}

const legendItems = [
  {
    color: '#293575',
    label: '< 1960'
  },
  {
    color: '#293575',
    label: '1960 t/m 1970'
  },
  {
    color: '#1261a3',
    label: '1970 t/m 1980'
  },
  {
    color: '#69a8de',
    label: '1980 t/m 1990'
  },
  {
    color: '#99c1e9',
    label: '1990 t/m 2000'
  },
  {
    color: '#b378b1',
    label: '2000 t/m 2010'
  },
  {
    color: '#bd6495',
    label: '2010 t/m 2020'
  },
  {
    color: '#ba2351',
    label: '2020 t/m 2022'
  },
  {
    color: '#d11313',
    label: '> 2022'
  }
]

</script>

<template>
  <Chapter icon="building" title="Bouwjaar">
    <section class="space-y-7">
      <div v-if="constructionGraph.data.length !== 0" class="chart | grid grid-cols-12 items-center gap-4">
        <BarChart class="w-full" title="Bouwjaren (wijk)" :data="constructionGraph.data"
          :labels="constructionGraph.labels" gradient />
      </div>

      <div class="aspect-map w-full overflow-clip">
        <MapBox :options="mapOptions" @load="onLoad" />
      </div>
      <MapLegend :items="legendItems" :cols="6" />
    </section>
  </Chapter>
</template>