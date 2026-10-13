<script setup lang="ts">
import { computed } from 'vue';
import { storeToRefs } from 'pinia';

import { type LngLatLike, type Map, LngLat, type LayerSpecification } from 'mapbox-gl'

import { IConstructionYearPair } from '@/datastructures/interfaces/api/IStatistics.ts';

import Chapter from '@/components/Print/Chapter.vue'
import BarChart from '@/components/Charts/BarChart.vue';

import MapBox from '@/components/Common/Mapbox/MapBox.vue'
import { addPandMarker } from '@/components/Common/Mapbox/pandMarker'

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
      // A year around 1000 (mostly 1005) is the register's code for an
      // unknown construction year, not a period: no "1000-1009" bar.
      if (Number(decade.decade.yearFrom.substring(0, 4)) < 1100) return 'Onbekend'

      // Written as the legend under the map writes a range
      return `${decade.decade.yearFrom.substring(0, 4)} t/m ${decade.decade.yearTo.substring(0, 4)}`
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
  // Construction-year attributes come from the Martin tileserver's dynamic
  // 'buildings' source (the static analysis_building tileset is retired).
  // Added via its TileJSON endpoint: tile URLs, zoom range and bounds come
  // from the server. The env var may hold either a bare base template or
  // the tile-URL form with a /{z}/{x}/{y} suffix.
  const tileJsonPath = (import.meta.env.VITE_FUNDERMAPS_TILESERVER_URL + '' || '')
    .replace('/{z}/{x}/{y}', '')
    .replace('{SOURCE}', 'buildings')

  map.addSource(
    "buildings",
    {
      type: 'vector',
      url: tileJsonPath
    }
  )

  // Add incident layer
  // @ts-expect-error JSON layer config has wider shape than mapbox LayerSpecification typing
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

  addPandMarker(map, buildingData.residence.longitude, buildingData.residence.latitude)
}

// The layer does not draw a range in one colour. It is one colour before 1960
// and from 2022; in between it runs from each stop to the next (it
// interpolates, see config/layers/construction-year.json). A square shows
// that run: from the colour the first year of its range is drawn in, to the
// colour the next range starts with. With one colour per range "< 1960" and
// "1960 t/m 1969" had the same square (1960 is drawn like everything before
// it), although most of the sixties are drawn bluer.
const run = (from: string, to: string) => `linear-gradient(to right, ${from}, ${to})`

const legendItems = [
  {
    color: '#293575',
    label: '< 1960'
  },
  {
    color: run('#293575', '#1261a3'),
    label: '1960 t/m 1969'
  },
  {
    color: run('#1261a3', '#69a8de'),
    label: '1970 t/m 1979'
  },
  {
    color: run('#69a8de', '#99c1e9'),
    label: '1980 t/m 1989'
  },
  {
    color: run('#99c1e9', '#b378b1'),
    label: '1990 t/m 1999'
  },
  {
    color: run('#b378b1', '#bd6495'),
    label: '2000 t/m 2009'
  },
  {
    color: run('#bd6495', '#ba2351'),
    label: '2010 t/m 2019'
  },
  {
    color: run('#ba2351', '#d11313'),
    label: '2020 t/m 2021'
  },
  {
    color: '#d11313',
    label: 'vanaf 2022'
  }
]

</script>

<template>
  <Chapter icon="building" title="Bouwjaar">
    <section class="space-y-7">
      <div class="text-grey-700">
        <p>
          Het bouwjaar bepaalt vaak het funderingstype en daarmee het risicoprofiel: panden van vóór
          1960 staan in Nederland veelal op houten palen, die gevoelig zijn voor droogstand en
          bacteriële aantasting. Hieronder ziet u in welke periode uw pand is gebouwd en hoe dat
          zich verhoudt tot de panden in uw wijk.
        </p>
      </div>
      <div v-if="constructionGraph.data.length !== 0" class="chart | grid grid-cols-12 items-center gap-4">
        <BarChart class="col-span-12 w-full" title="Bouwjaren (wijk)" :data="constructionGraph.data"
          :labels="constructionGraph.labels" gradient />
      </div>

      <div class="aspect-map w-full overflow-clip">
        <MapBox :options="mapOptions" @load="onLoad" />
      </div>
      <MapLegend :items="legendItems" :cols="6" />
    </section>
  </Chapter>
</template>