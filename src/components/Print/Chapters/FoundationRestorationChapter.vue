<script setup lang="ts">
import { computed, type ComputedRef } from 'vue';
import { storeToRefs } from 'pinia';

import { ICombinedRecoveryData } from '@/datastructures/interfaces/index.ts';

import Chapter from '@/components/Print/Chapter.vue'
import { FieldDataConfig, retrieveAndFormatFieldData } from '@/utils/fieldData.ts';


import { useBuildingStore } from '@/store/buildings.ts';
import { useRecoveryReportsStore } from '@/store/building/recovery.ts';

const { buildingId } = storeToRefs(useBuildingStore())
const { getCombinedRecoveryDataByBuildingId } = useRecoveryReportsStore()

/**
 * Data source for panel
 */
const caseItems: ComputedRef<ICombinedRecoveryData[]> = computed(() => {
  if (! buildingId.value) return []
  return getCombinedRecoveryDataByBuildingId(buildingId.value) || []
})

const type = computed(() => {
  if (! caseItems.value?.[0]?.sample) {
    return {
      value: null
    }
  }

  return retrieveAndFormatFieldData(
    new FieldDataConfig({
      name: 'type',
      source: caseItems.value?.[0]?.sample || null
    })
  )
})

const facade = computed(() => {
  if (! caseItems.value?.[0]?.sample) {
    return {
      value: null
    }
  }

  return retrieveAndFormatFieldData(
    new FieldDataConfig({
      name: 'facade',
      source: caseItems.value?.[0]?.sample || null
    })
  )
})

// Report sample
// recoverySampleFieldLabels.type !== "geen data" => Funderingsherstel = ja
// recoverySampleFieldLabels.facade !== "geen data" => Locatieherstel = ja
// Type herstel = recoverySampleFieldLabels.type


</script>

<template>
  <Chapter
    icon="wrench"
    title="Funderingsherstel">

    <section class="space-y-7">
      <dl role="list" class="list--definition">
        <div class="grid grid-cols-2 gap-4">
          <div>
            <div class="item--grid">
              <dt>Funderingsherstel</dt>
              <dd v-if="type.value === null">Ja/<strong class="text-black">Nee</strong></dd>
              <dd v-else><strong class="text-black">Ja</strong>/Nee</dd>
            </div>
            <div class="item--grid">
              <dt>Locatieherstel</dt>
              <dd v-if="facade.value === null">Ja/<strong class="text-black">Nee</strong></dd>
              <dd v-else><strong class="text-black">Ja</strong>/Nee</dd>
            </div>
          </div>
          <div>
            <div class="item--grid">
              <dt>Type herstel</dt>
              <dd>{{ facade.value === null ? 'geen data' : facade.value }}</dd>
            </div>
          </div>
        </div>
      </dl>
    </section>
  </Chapter>
</template>