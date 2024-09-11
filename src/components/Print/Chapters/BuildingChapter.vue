<script setup lang="ts">
import { type ComputedRef, computed } from 'vue'; 
import { storeToRefs } from 'pinia';

import { ICombinedInquiryData } from '@/datastructures/interfaces/index.ts';

import Chapter from '@/components/Print/Chapter.vue'

import { retrieveAndFormatFieldData, FieldDataConfig, applyContextToFieldDataConfigs } from '@/utils/fieldData'

import { useAnalysisStore } from '@/store/building/analysis';
import { useGeoLocationsStore } from '@/store/building/geolocations'
import { useInquiriesStore } from '@/store/building/inquiries.ts';
import { useBuildingStore } from '@/store/buildings';


const { getAnalysisDataByBuildingId } = useAnalysisStore()
const { buildingId } = storeToRefs(useBuildingStore())
const { getCombinedInquiryDataByBuildingId } = useInquiriesStore()
const { getLocationDataByBuildingId } = useGeoLocationsStore()

/**
 * Data source for panel
 */
const analysisData = computed(() => {
  if (! buildingId.value) return null
  return getAnalysisDataByBuildingId(buildingId.value)
})
const locationData = computed(() => {
  if (! buildingId.value) return null
  return getLocationDataByBuildingId(buildingId.value)
})

/**
 * Data inquiry sample source for panel
 */
const inqueryData: ComputedRef<ICombinedInquiryData[]> = computed(() => {
  if (! buildingId.value) return []
  return getCombinedInquiryDataByBuildingId(buildingId.value) || []
})

/**
 * Fields config
 */
const fieldsWithData = computed(() => {
  if (analysisData.value === null) return []

  const fieldsConfig = applyContextToFieldDataConfigs({
    source: analysisData,
    configs: [
      new FieldDataConfig({ name: 'fullAddress', source: locationData.value?.address }),
      new FieldDataConfig({ name: 'surfaceArea' }),
      new FieldDataConfig({ name: 'height' }),
      // TODO: 2 unknown fields (Gebruik & Bestemming)
      new FieldDataConfig({ 
        label: 'Onderbouw', 
        name: 'substructure', 
        source: inqueryData.value?.[0]?.sample, 
      })
    ]
  })
  
  return fieldsConfig.map(retrieveAndFormatFieldData)
})

</script>

<template>
  <Chapter 
    icon="building"
    title="Pand">
    <section class="space-y-7">
      <dl role="list" class="list--definition">
        <div 
            v-for="field in fieldsWithData" 
            :key="field.name"
            class="item">
            <dt>{{ field.label }}</dt>
            <dd>{{ field.value }}</dd>
        </div>
      </dl>
    </section>
  </Chapter>
</template>