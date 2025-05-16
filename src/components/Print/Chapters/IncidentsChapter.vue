<script setup lang="ts">
import { computed } from 'vue';
import { storeToRefs } from 'pinia';

import { type LngLatLike, type Map, LngLat, type LayerSpecification, Marker } from 'mapbox-gl'

import Chapter from '@/components/Print/Chapter.vue'
import MapBox from '@/components/Common/Mapbox/MapBox.vue'

import { useGeoLocationsStore } from '@/store/building/geolocations'
import { useBuildingStore } from '@/store/buildings';
import MapLegend from '@/components/MapLegend.vue';

const { getLocationDataByBuildingId } = useGeoLocationsStore()

const { buildingId } = storeToRefs(useBuildingStore())


const mapOptions = computed(() => {

  const baseOptions = {
    center: <LngLatLike>[4.897, 52.377],
    interactive: false,
    attributionControl: false,
    performanceMetricsCollection: false,
    zoom: 10
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


/**
 * GRAPH data
 */

const legendItems = [
  {
    color: 'rgb(193, 212, 230)',
    label: 'Nauwelijks meldingen'
  },
  {
    color: 'rgb(145, 186, 214)',
    label: 'Enkele meldingen'
  },
  {
    color: 'rgb(82, 138, 173)',
    label: 'Regelmatig meldingen'
  },
  {
    color: 'rgb(56, 101, 138)',
    label: 'Veel meldingen'
  },
  {
    color: 'rgb(30, 63, 103) ',
    label: 'Zeer veel meldingen'
  }
]


</script>

<template>
  <Chapter icon="alert" title="Incidenten">

    <section class="space-y-10">
      
      <div class="text-grey-700">
        <p>
          In heel Nederland komen meldingen binnen van schade die mogelijk verband houdt met funderingsproblemen, zoals scheuren in gevels, verzakkingen of klemmende deuren en ramen. Deze signalen worden verzameld en geanalyseerd via het Landelijk Loket Funderingsproblematiek van het KCAF. De meldingen worden ontsloten op een gebiedsgerichte kaart, waarvan hieronder een uitsnede is weergegeven voor de omgeving van het pand.
        </p>
      </div>
      
      <div class="aspect-map w-full overflow-clip">
        <MapBox :options="mapOptions" @load="onLoad" />
      </div>

      <div>
        <MapLegend :items="legendItems" :cols="4" />
      </div>

      <div class="space-y-4 text-grey-700">
        <p>
          Het KCAF-loket fungeert als centraal meldpunt voor bewoners, woningcorporaties en gemeenten die vermoedens hebben van funderingsschade. Heeft u schade, vermoedt u funderingsproblemen of wilt u meer informatie? Dan kunt u kosteloos een melding doen via: 
          <br /> 
          <a href="https://www.kcaf.nl/landelijk-loket-funderingsproblematiek/" target="_blank">https://www.kcaf.nl/landelijk-loket-funderingsproblematiek/</a>
        </p>
        <div class="grid grid-cols-12">
          <p class="col-span-10">
            Het KCAF is een onafhankelijke stichting die woningeigenaren, corporaties en gemeenten ondersteunt bij het verkrijgen van grip op funderingsproblematiek. Uw melding draagt bij aan beter landelijk inzicht in de aard en omvang van funderingsrisico's en kan het startpunt vormen voor verder onderzoek of passende ondersteuning.
          </p>
          <img src="@assets/images/Logo-KCAF.webp" alt="" class="" style="width: 3.4rem" />
        </div>
      </div>      

      <!-- 
      
      Hidden until fix has been applied in backend. Note: does not fit on single page

      <BarChart v-if="graphData.data && graphData.data?.length !== 0" class="w-full"
        title="Aantal incidenten in de wijk" :data="graphData.data" :labels="graphData.labels" gradient /> -->
    </section>

  </Chapter>

</template>