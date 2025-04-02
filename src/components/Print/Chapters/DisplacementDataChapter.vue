<script setup lang="ts">
import { computed } from 'vue';
import { storeToRefs } from 'pinia';

import Chapter from '@/components/Print/Chapter.vue'
import ScatterChart from '@/components/Charts/ScatterChart.vue';
import ItemGrid from '@/components/ItemGrid.vue';

import { useAnalysisStore } from '@/store/building/analysis';
import { useBuildingStore } from '@/store/buildings';
import { useSubsidenceStore } from '@/store/building/subsidence.ts';

import { FieldDataConfig, retrieveAndFormatFieldData } from '@/utils/fieldData.ts';

const { buildingId } = storeToRefs(useBuildingStore())
const { getAnalysisDataByBuildingId } = useAnalysisStore()
const { getSubsidenceDataByBuildingId } = useSubsidenceStore()


/**
 * Data source for panel
 */
const analysisData = computed(() => {
  if (! buildingId.value) return null
  return getAnalysisDataByBuildingId(buildingId.value)
})


/**
 * Foundation label
 */
const velocity = computed(() => {
  return retrieveAndFormatFieldData(
    new FieldDataConfig({
      name: 'velocity',
      source: analysisData
    })
  )
})

/******************************************************************************
 * Graph
 */

const subsidenceData = computed(() => {
  if (! buildingId.value) return []

  return getSubsidenceDataByBuildingId(buildingId.value)
})

const graphData = computed(() => {
  console.log("subsidenceData", subsidenceData.value)
  return {
    labels: [],
    data: subsidenceData.value?.map(item => {
      return {
        y: item.velocity,
        x: Date.parse(item.markAt),
        r: 2
      }
    })
  }
})

</script>

<template>
  <Chapter
    icon="graph"
    title="Pandzakking">
    <section class="space-y-10">
      <div class="highlight w-1/2">
        <img
          src="@assets/images/highlight-bg.png"
          alt=""
          class="inset absolute -z-10 w-full"
        />
        <div class="highlight__content space-y-3">
          <h3>Pandzakkingsgegevens</h3>
          <dl role="list" class="list--definition">
            <div class="grid">
              <div>
                <ItemGrid :fields="[{
                  name: 'velocity',
                  value: velocity.value,
                  label: velocity.label
                }]" />
              </div>
            </div>
          </dl>
        </div>
      </div>

      <ScatterChart
        v-if="graphData.data?.length !== 0"
        title="Pandzakking mm"
        :labels="graphData.labels"
        :data="graphData.data"
        :borderColors="['#191e3c']"
        :backgroundColors="['#191e3c']"
      />
      
    </section>
  </Chapter>
</template>