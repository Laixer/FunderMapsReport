<script setup lang="ts">
import { computed } from 'vue';
import { storeToRefs } from 'pinia';

import Chapter from '@/components/Print/Chapter.vue'

import { useAnalysisStore } from '@/store/building/analysis';
import { useBuildingStore } from '@/store/buildings';
import { FieldDataConfig, retrieveAndFormatFieldData } from '@/utils/fieldData.ts';


const { buildingId } = storeToRefs(useBuildingStore())
const { getAnalysisDataByBuildingId } = useAnalysisStore()

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
                <div class="item--grid">
                  <dt>{{ velocity.label }}</dt>
                  <dd>{{ velocity.value }}</dd>
                </div>
              </div>
            </div>
          </dl>
        </div>
      </div>

      <figure>
        <img
          src="@assets/images/scatter-chart.png"
          alt=""
          class="w-full"
        />
      </figure>
    </section>
  </Chapter>
</template>