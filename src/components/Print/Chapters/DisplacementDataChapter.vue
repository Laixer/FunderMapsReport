<script setup lang="ts">
import { computed } from 'vue';
import { storeToRefs } from 'pinia';

import Chapter from '@/components/Print/Chapter.vue'
import ScatterChart from '@/components/Charts/ScatterChart.vue';
import ItemGrid from '@/components/ItemGrid.vue';
import PageBreak from '@/components/Print/PageBreak.vue'

import { useAnalysisStore } from '@/store/building/analysis';
import { useBuildingStore } from '@/store/buildings';
import { useSubsidenceStore } from '@/store/building/subsidence';

import { FieldDataConfig, retrieveAndFormatFieldData } from '@/utils/fieldData.ts';

const { buildingId } = storeToRefs(useBuildingStore())
const { getAnalysisDataByBuildingId } = useAnalysisStore()
const { getSubsidenceDataByBuildingId } = useSubsidenceStore()


/**
 * Data source for panel
 */
const analysisData = computed(() => {
  if (!buildingId.value) return null
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
const hasVelocityData = computed(() => {
  return velocity.value.value !== 'Geen data'
})

/******************************************************************************
 * Graph
 */

const subsidenceData = computed(() => {
  if (!buildingId.value) return []

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
  <Chapter v-if="hasVelocityData || graphData.data?.length" icon="graph" title="Pandzakking">
    <section class="space-y-10">
      <div class="space-y-4 text-grey-700">
        <p>
          Voor een deel van de panden in Nederland zijn zakkingsgegevens beschikbaar. Deze zijn verkregen op basis van satellietmetingen en bepaald met een zogenaamde InSAR-analyse, waarbij de zakkingssnelheid per jaar wordt uitgedrukt in millimeters per jaar (mm/jaar).
        </p>
        <p>
          De meting geeft de mate van zakking aan in een bepaalde periode, maar kan niet direct worden gebruikt om de absolute zakking te bepalen – oftewel hoeveel het pand in totaal is gezakt over de volledige levensduur.
        </p>
        <p>
          De meetresultaten zijn verwerkt in de risicomodellen en dragen bij aan het bepalen van het funderingsrisico per pand.
        </p>
      </div>
      <div v-if="hasVelocityData" class="highlight w-1/2">
        <img src="@assets/images/highlight-bg.png" alt="" class="inset absolute -z-10 w-full" />
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

      <ScatterChart v-if="graphData.data?.length !== 0" title="Pandzakking mm" :labels="graphData.labels"
        :data="graphData.data" :borderColors="['#191e3c']" :backgroundColors="['#191e3c']" />

    </section>
  </Chapter>

  <!-- PAGE BREAK -->
  <PageBreak v-if="hasVelocityData || graphData.data?.length" />
</template>