<script setup lang="ts">
import { computed, type ComputedRef } from 'vue';
import { storeToRefs } from 'pinia';
import { type LngLatLike, type Map, LngLat, Marker } from 'mapbox-gl'

import { ICombinedInquiryData } from '@/datastructures/interfaces/index.ts';

import Chapter from '@/components/Print/Chapter.vue'
import MapBox from '@/components/Common/Mapbox/MapBox.vue'
import ItemGrid from '@/components/ItemGrid.vue';

import { retrieveAndFormatFieldData, FieldDataConfig, applyContextToFieldDataConfigs } from '@/utils/fieldData'
import { inquirySampleFieldLabels } from '@/datastructures/fieldLabels'

import { useGeoLocationsStore } from '@/store/building/geolocations'
import { useAnalysisStore } from '@/store/building/analysis';
import { useInquiriesStore } from '@/store/building/inquiries.ts';
import { useBuildingStore } from '@/store/buildings';



const { getLocationDataByBuildingId } = useGeoLocationsStore()
const { getAnalysisDataByBuildingId } = useAnalysisStore()
const { getCombinedInquiryDataByBuildingId } = useInquiriesStore()
const { buildingId } = storeToRefs(useBuildingStore())

const mapOptions = computed(() => {

  const baseOptions = {
    center: <LngLatLike>[4.897, 52.377],
    interactive: false,
    attributionControl: false,
    performanceMetricsCollection: false,
    zoom: 16
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

/**
 * Data source for panel
 */
const analysisData = computed(() => {
  if (!buildingId.value) return null
  return getAnalysisDataByBuildingId(buildingId.value)
})

/**
 * Data inquiry sample source for panel
 */
const inqueryData: ComputedRef<ICombinedInquiryData[]> = computed(() => {
  if (!buildingId.value) return []
  return getCombinedInquiryDataByBuildingId(buildingId.value) || []
})

/**
 * Fields config
 */
const fieldsWithAnalysisData = computed(() => {
  if (analysisData.value === null) return []

  const fieldsConfig = applyContextToFieldDataConfigs({
    source: analysisData,
    configs: [
      new FieldDataConfig({ name: 'soil' }),
      new FieldDataConfig({ name: 'groundLevel' }),
      new FieldDataConfig({ name: 'groundWaterLevel' })
    ]
  })

  return fieldsConfig.map(retrieveAndFormatFieldData)
})


const fieldsWithInquirySampleData = computed(() => {
  const fieldsConfig = applyContextToFieldDataConfigs({
    source: inqueryData.value?.[0]?.sample || undefined,
    labels: inquirySampleFieldLabels,
    configs: [
      new FieldDataConfig({ name: 'cpt' }), // sondering
      new FieldDataConfig({ name: 'groundLevel' }),
      new FieldDataConfig({ name: 'groundwaterLevelNet' }),
      new FieldDataConfig({ name: 'monitoringWell' }),
      new FieldDataConfig({ name: 'groundwaterLevelTemp' })
    ]
  })

  return fieldsConfig.map(retrieveAndFormatFieldData)
})

const addMarker = function addMarker({ map }: { map: Map }) {

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

</script>

<template>
  <Chapter icon="pin" title="Locatie">
    <section class="space-y-7">
      <div class="aspect-map w-full overflow-clip">
        <MapBox class="asp w-full object-cover" :options="mapOptions" @load="addMarker" />
      </div>

      <div class="highlight">

        <img src="@assets/images/highlight-bg.png" alt="" class="inset absolute -z-10 w-full" />

        <div class="highlight__content space-y-3">
          <h3>Omgeving</h3>
          <dl role="list" class="list--definition">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <ItemGrid :fields="fieldsWithAnalysisData" />
              </div>
              <div>
                <ItemGrid :fields="fieldsWithInquirySampleData" />
              </div>
            </div>
          </dl>
        </div>

      </div>
    </section>
  </Chapter>
</template>