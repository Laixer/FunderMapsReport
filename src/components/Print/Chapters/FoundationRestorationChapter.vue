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
  if (!buildingId.value) return []
  return getCombinedRecoveryDataByBuildingId(buildingId.value) || []
})

const type = computed(() => {
  if (!caseItems.value?.[0]?.sample) {
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
  if (!caseItems.value?.[0]?.sample) {
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

const recoveryDate = computed(() => {
  if (!caseItems.value?.[0]?.sample) {
    return {
      value: null
    }
  }
  return retrieveAndFormatFieldData(
    new FieldDataConfig({
      name: 'recoveryDate',
      source: caseItems.value?.[0]?.sample || null
    })
  )
})

</script>

<template>
  <Chapter icon="wrench" title="Funderingsherstel">

    <section class="space-y-7">
      <div class="text-grey-700 space-y-4">
        <p>
          Hieronder ziet u of er voor dit pand herstel van de fundering is geregistreerd, en zo ja,
          welk type en wanneer. Een eerder herstel kan duiden op eerdere problematiek; de huidige
          risicobeoordelingen verderop in het rapport gelden onafhankelijk daarvan.
        </p>
        <p>
          De gegevens hieronder zijn afkomstig uit het Nationaal Funderingsherstelregister.
        </p>
      </div>
      <dl role="list" class="list--definition">
        <div class="grid grid-cols-2 gap-4">
          <div>
            <div class="item--grid">
              <dt>Funderingsherstel</dt>
              <!--
                Without a registration there is no "Nee" to give: all that is
                known is that the register has no herstel for this pand.
              -->
              <dd v-if="type.value === null"><strong class="text-black">Geen herstel geregistreerd</strong></dd>
              <dd v-else><strong class="text-black">Ja</strong></dd>
            </div>
            <div class="item--grid">
              <dt>Locatieherstel</dt>
              <dd>{{ facade.value === null ? 'Geen data' : facade.value }}</dd>
            </div>
          </div>
          <div>
            <div class="item--grid">
              <dt>Type herstel</dt>
              <dd>{{ type.value === null ? 'Geen data' : type.value }}</dd>
            </div>
            <div class="item--grid">
              <dt>Datum hersteld</dt>
              <dd>{{ recoveryDate.value === null ? 'Geen data' : recoveryDate.value }}</dd>
            </div>
          </div>
        </div>
      </dl>
    </section>
  </Chapter>
</template>