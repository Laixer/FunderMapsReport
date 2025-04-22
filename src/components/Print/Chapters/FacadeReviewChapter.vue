<script setup lang="ts">
import { ComputedRef, computed } from 'vue';
import { storeToRefs } from 'pinia';

import { ICombinedInquiryData } from '@/datastructures/interfaces/index.ts';

import Chapter from '@/components/Print/Chapter.vue'
import FacadeIcon from '@/components/Common/Icons/FacadeIcon.vue';


import { retrieveAndFormatFieldData, FieldDataConfig, applyContextToFieldDataConfigs, CompletedFieldData } from '@/utils/fieldData'
import { inquirySampleFieldLabels } from '@/datastructures/fieldLabels'

import { useInquiriesStore } from '@/store/building/inquiries.ts';
import { useBuildingStore } from '@/store/buildings';
import PageBreak from '@/components/Print/PageBreak.vue';

const { getCombinedInquiryDataByBuildingId } = useInquiriesStore()
const { buildingId } = storeToRefs(useBuildingStore())


/**
 * Data source for panel
 */
const caseItems: ComputedRef<ICombinedInquiryData[]> = computed(() => {
  if (!buildingId.value) return []
  return getCombinedInquiryDataByBuildingId(buildingId.value) || []
})


/**
 * The selected inquiry case item, or null
 */
const selectedCaseItem: ComputedRef<ICombinedInquiryData | null> = computed(() => {
  if (caseItems.value[0]) {
    return caseItems.value[0]
  }
  return null
})


const groupHasData: Record<string, boolean> = {
  'skewed-left': false,
  'skewed-right': false,
  indoor: false,
  front: false,
  back: false,
  left: false,
  right: false
}

/**
 * Whether there is sample data to be shown
 */
const hasSampleData = computed(() => {
  return (!!(selectedCaseItem.value?.sample)) && !Object.values(groupHasData).every(value => value === false)
})



/**
 * Fields config
 */
const sampleFieldsWithData: ComputedRef<Record<string, CompletedFieldData[]>> = computed(() => {
  const sampleFieldsConfig = applyContextToFieldDataConfigs({
    source: selectedCaseItem?.value?.sample || undefined,
    labels: inquirySampleFieldLabels, // Supplied here in case source is undefined
    configs: [
      // skewed left column      
      new FieldDataConfig({ group: 'skewed-left', name: 'deformedFacade' }),
      new FieldDataConfig({ group: 'skewed-left', name: 'skewedParallelFacade' }),
      new FieldDataConfig({ group: 'skewed-left', name: 'skewedParallel' }),
      new FieldDataConfig({ group: 'skewed-left', name: 'thresholdFrontLevel' }),
      new FieldDataConfig({ group: 'skewed-left', name: 'skewedWindowFrame' }),

      // skewed right column
      new FieldDataConfig({ group: 'skewed-right', name: 'thresholdUpdownSkewed' }),
      new FieldDataConfig({ group: 'skewed-right', name: 'skewedPerpendicularFacade' }),
      new FieldDataConfig({ group: 'skewed-right', name: 'skewedPerpendicular' }),
      new FieldDataConfig({ group: 'skewed-right', name: 'thresholdBackLevel' }),
      new FieldDataConfig({ group: 'skewed-right', name: 'settlementSpeed' }),

      // Scheuren
      new FieldDataConfig({ group: 'indoor', name: 'crackIndoorRestored' }),
      new FieldDataConfig({ group: 'indoor', name: 'crackIndoorType' }),
      new FieldDataConfig({ group: 'indoor', name: 'crackIndoorSize' }),

      // Voorgevel scheur
      new FieldDataConfig({ group: 'front', name: 'crackFacadeFrontRestored' }),
      new FieldDataConfig({ group: 'front', name: 'crackFacadeFrontType' }),
      new FieldDataConfig({ group: 'front', name: 'crackFacadeFrontSize' }),

      // Achtergevel scheur
      new FieldDataConfig({ group: 'back', name: 'crackFacadeBackRestored' }),
      new FieldDataConfig({ group: 'back', name: 'crackFacadeBackType' }),
      new FieldDataConfig({ group: 'back', name: 'crackFacadeBackSize' }),

      // Linkergevel scheur
      new FieldDataConfig({ group: 'left', name: 'crackFacadeLeftRestored' }),
      new FieldDataConfig({ group: 'left', name: 'crackFacadeLeftType' }),
      new FieldDataConfig({ group: 'left', name: 'crackFacadeLeftSize' }),

      // Rechter gevel scheur
      new FieldDataConfig({ group: 'right', name: 'crackFacadeRightRestored' }),
      new FieldDataConfig({ group: 'right', name: 'crackFacadeRightType' }),
      new FieldDataConfig({ group: 'right', name: 'crackFacadeRightSize' })
    ]
  })

  return sampleFieldsConfig
    .map(retrieveAndFormatFieldData)
    .reduce(
      (acc: Record<string, CompletedFieldData[]>, fieldData: CompletedFieldData) => {

        const group = fieldData?.group || ''
        if (group) {
          acc[group] = acc[group] || []
          acc[group].push(fieldData)


          if (fieldData.formattedFieldValueLabel !== 'Geen data') {
            groupHasData[group] = true
          }
        }

        return acc
      }, {} as Record<string, CompletedFieldData[]>
    )
})

</script>

<template>
  <Chapter v-if="hasSampleData" icon="scan" title="Gevelscan">

    <section class="space-y-7">
      <div class="grid grid-cols-2 gap-4"
        v-if="(groupHasData['indoor'] || groupHasData['left'] || groupHasData['right'] || groupHasData['front'] || groupHasData['back'])">
        <div class="grid grid-cols-6 items-center gap-4">
          <figure class="col-span-2 flex aspect-square flex-col items-center gap-1 rounded border border-grey-400 p-2">
            <FacadeIcon name="achter" class="aspect-square w-full flex-1" aria-hidden="true" />
            <figcaption class="flex-initial text-center font-bold leading-4 text-grey-700">
              Achtergevel
            </figcaption>
          </figure>
          <dl role="list" class="list--definition col-span-4">
            <div v-for="field in sampleFieldsWithData['back']" :key="field.name" class="item--grid">
              <dt>{{ field.label }}</dt>
              <dd>{{ field.value }}</dd>
            </div>
          </dl>
        </div>
        <div class="grid grid-cols-6 items-center gap-4">
          <figure class="col-span-2 flex aspect-square flex-col items-center gap-1 rounded border border-grey-400 p-2">
            <FacadeIcon name="inpandig" class="aspect-square w-full flex-1" aria-hidden="true" />
            <figcaption class="flex-initial text-center font-bold leading-4 text-grey-700">
              Inpandige scheur
            </figcaption>
          </figure>
          <dl role="list" class="list--definition col-span-4">
            <div v-for="field in sampleFieldsWithData['indoor']" :key="field.name" class="item--grid">
              <dt>{{ field.label }}</dt>
              <dd>{{ field.value }}</dd>
            </div>
          </dl>
        </div>
        <div class="grid grid-cols-6 items-center gap-4">
          <figure class="col-span-2 flex aspect-square flex-col items-center gap-1 rounded border border-grey-400 p-2">
            <FacadeIcon name="links" class="aspect-square w-full flex-1" aria-hidden="true" />
            <figcaption class="flex-initial text-center font-bold leading-4 text-grey-700">
              Linker zijgevel
            </figcaption>
          </figure>
          <dl role="list" class="list--definition col-span-4">
            <div v-for="field in sampleFieldsWithData['left']" :key="field.name" class="item--grid">
              <dt>{{ field.label }}</dt>
              <dd>{{ field.value }}</dd>
            </div>
          </dl>
        </div>
        <div class="grid grid-cols-6 items-center gap-4">
          <figure class="col-span-2 flex aspect-square flex-col items-center gap-1 rounded border border-grey-400 p-2">
            <FacadeIcon name="rechts" class="aspect-square w-full flex-1" aria-hidden="true" />
            <figcaption class="flex-initial text-center font-bold leading-4 text-grey-700">
              Rechter zijgevel
            </figcaption>
          </figure>
          <dl role="list" class="list--definition col-span-4">
            <div v-for="field in sampleFieldsWithData['right']" :key="field.name" class="item--grid">
              <dt>{{ field.label }}</dt>
              <dd>{{ field.value }}</dd>
            </div>
          </dl>
        </div>
        <div class="grid grid-cols-6 items-center gap-4">
          <figure class="col-span-2 flex aspect-square flex-col items-center gap-1 rounded border border-grey-400 p-2">
            <FacadeIcon name="voor" class="aspect-square w-full flex-1" aria-hidden="true" />
            <figcaption class="flex-initial text-center font-bold leading-4 text-grey-700">
              Voorgevel
            </figcaption>
          </figure>
          <dl role="list" class="list--definition col-span-4">
            <div v-for="field in sampleFieldsWithData['front']" :key="field.name" class="item--grid">
              <dt>{{ field.label }}</dt>
              <dd>{{ field.value }}</dd>
            </div>
          </dl>
        </div>
      </div>

      <div v-if="(groupHasData['skewed-left'] || groupHasData['skewed-right'])" class="highlight">
        <img src="@assets/images/highlight-bg.png" alt="" class="inset absolute -z-10 w-full" />
        <div class="highlight__content space-y-3">
          <h3>Vervorming</h3>
          <dl role="list" class="list--definition">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <div v-for="field in sampleFieldsWithData['skewed-left']" :key="field.name" class="item--grid">
                  <dt>{{ field.label }}</dt>
                  <dd>{{ field.value }}</dd>
                </div>
              </div>
              <div>
                <div v-for="field in sampleFieldsWithData['skewed-right']" :key="field.name" class="item--grid">
                  <dt>{{ field.label }}</dt>
                  <dd>{{ field.value }}</dd>
                </div>
              </div>
            </div>
          </dl>
        </div>
      </div>
    </section>
  </Chapter>
  <!-- PAGE BREAK -->
  <PageBreak v-if="hasSampleData" />
</template>