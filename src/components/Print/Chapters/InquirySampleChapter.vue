<script setup lang="ts">
import { type ComputedRef, computed } from 'vue'; 
import { storeToRefs } from 'pinia';

import { ICombinedInquiryData } from '@/datastructures/interfaces/index.ts';

import Chapter from '@/components/Print/Chapter.vue'
import FoundationIcon from '@/components/Common/Icons/FoundationIcon.vue';

import { retrieveAndFormatFieldData, FieldDataConfig, applyContextToFieldDataConfigs, CompletedFieldData } from '@/utils/fieldData'
import { inquirySampleFieldLabels } from '@/datastructures/fieldLabels'

import { useAnalysisStore } from '@/store/building/analysis';
import { useInquiriesStore } from '@/store/building/inquiries.ts';
import { useBuildingStore } from '@/store/buildings';


const { getAnalysisDataByBuildingId } = useAnalysisStore()
const { getCombinedInquiryDataByBuildingId } = useInquiriesStore()
const { buildingId } = storeToRefs(useBuildingStore())

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
const foundationType = computed(() => {
  return retrieveAndFormatFieldData(
    new FieldDataConfig({
      name: 'foundationType',
      source: analysisData
    })
  )
})

const foundationIconName = computed(() => {
  if (! analysisData.value) return null

  switch(analysisData.value?.foundationType) {
    case 0:
    case 1:
    case 2:
    case 15:
    case 16:
    case 17:
      return 'houten-palen'

    case 3:
    case 11:
    case 12:
    case 13:
      return 'betonnen-palen'

    case 4:
    case 5:
    case 6:
    case 7:
    case 8:
    case 9:
      return 'niet-onderheid'
    
    case 10:
      return 'houten-palen-oplanger'

    default:
      return null
  }
})

/**
 * 
 */
const foundationTypeReliability = computed(() => {
  return retrieveAndFormatFieldData(
    new FieldDataConfig({
      name: 'foundationTypeReliability',
      source: analysisData
    })
  )
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
const fieldsWithFoundationData = computed(() => {
  const fieldsConfig = applyContextToFieldDataConfigs({
    source: inqueryData.value?.[0]?.sample || undefined,
    labels: inquirySampleFieldLabels,
    configs: [
      new FieldDataConfig({ name: 'enforcementTerm' }),
      new FieldDataConfig({ name: 'damageCharacteristics' }),
      new FieldDataConfig({ name: 'overallQuality' }),
      new FieldDataConfig({ name: 'damageCause' }),
      // TODO: Unknown field: "bestemming"
      new FieldDataConfig({ name: 'substructure' })
    ]
  })
  
  return fieldsConfig.map(retrieveAndFormatFieldData)
})


const fieldGroupHeaders: Record<string, string> = {
  pile: 'Palen & Hout',
  quality: 'Niveau & Kwaliteit',
}

/**
 * Fields config
 */
 const sampleFieldsWithData: ComputedRef<Record<string, CompletedFieldData[]>> = computed(() => {

  const sampleFieldsConfig = applyContextToFieldDataConfigs({
    source: inqueryData.value?.[0]?.sample || undefined,
    labels: inquirySampleFieldLabels,
    configs: [

      // Palen & Hout
      new FieldDataConfig({ group: 'pile', name: 'pileHeadLevel' }),
      new FieldDataConfig({ group: 'pile', name: 'pileDiameterTop' }),
      new FieldDataConfig({ group: 'pile', name: 'pileDistanceLength' }),
      new FieldDataConfig({ group: 'pile', name: 'pileTipLevel' }),
      new FieldDataConfig({ group: 'pile', name: 'pileDiameterBottom' }),
      new FieldDataConfig({ group: 'pile', name: 'concreteChargerLength' }),
      new FieldDataConfig({ group: 'pile', name: 'woodType' }),
      new FieldDataConfig({ group: 'pile', name: 'woodPenetrationDepth' }),
      new FieldDataConfig({ group: 'pile', name: 'woodQuality' }),
      new FieldDataConfig({ group: 'pile', name: 'carryingCapacityQuality' }),
      new FieldDataConfig({ group: 'pile', name: 'woodEncroachement' }),
      new FieldDataConfig({ group: 'pile', name: 'pileWoodCapacityVerticalQuality' }),
      new FieldDataConfig({ group: 'pile', name: 'woodQualityNecessity' }),
      new FieldDataConfig({ group: 'pile', name: 'woodCapacityHorizontalQuality' }),

      // Niveau & Kwaliteit
      new FieldDataConfig({ group: 'quality', name: 'masonQuality' }),
      new FieldDataConfig({ group: 'quality', name: 'constructionQuality' }),
      new FieldDataConfig({ group: 'quality', name: 'constructionLevel' }),
      new FieldDataConfig({ group: 'quality', name: 'enforcementTerm' }),

      // TODO: Repeat field ... 
      new FieldDataConfig({ group: 'quality', name: 'constructionLevel' }), 
      new FieldDataConfig({ group: 'quality', name: 'pileWoodCapacityVerticalQuality' }),
      new FieldDataConfig({ group: 'quality', name: 'overallQuality' }),
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
        }

        return acc
      }, {} as Record<string, CompletedFieldData[]>
    )
})

</script>

<template>
  <Chapter 
    icon="file-foundation"
    title="Fundering">
    <section class="space-y-7">
      <div class="grid grid-cols-12 gap-4">
        <figure
          v-if="foundationIconName"
          class="col-span-3 flex aspect-square flex-col items-center gap-1 rounded border border-grey-400 p-4"
        >
          <FoundationIcon 
            :name="foundationIconName"
            class="aspect-square w-2/3 flex-1"
            aria-hidden="true" />
          <figcaption
            class="is-12 leadding-none flex-initial text-center font-bold text-grey-700"
          >
            {{ foundationType.value }}
          </figcaption>
        </figure>

        <dl role="list" class="list--definition col-span-9">
          <div 
            v-for="field in fieldsWithFoundationData" 
            :key="field.name"
            class="item">
            <dt>{{ field.label }}</dt>
            <dd>{{ field.value }}</dd>
          </div>
        </dl>
      </div>

      <div class="space-y-3">
        <h3>{{ foundationTypeReliability.label }}</h3>
        <div class="max-w-prose text-grey-700">
          <p>
            {{ foundationTypeReliability.value }}
          </p>
        </div>
      </div>

      <div class="space-y-5">
        <div class="highlight">
          <img
            src="@assets/images/highlight-bg.png"
            alt=""
            class="inset absolute -z-10 w-full"
          />
          <div class="highlight__content space-y-3">
            <h3>{{ fieldGroupHeaders['pile'] }}</h3>
            <dl role="list" class="list--definition">
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <template v-for="(field, index) in sampleFieldsWithData['pile']">
                    <div 
                      v-if="index < Math.ceil(sampleFieldsWithData['pile'].length / 2)"
                      :key="field.name" 
                      class="item--grid">
                      <dt>{{ field.label }}</dt>
                      <dd>{{ field.value }}</dd>
                    </div>
                  </template>
                </div>
                <div>
                  <template v-for="(field, index) in sampleFieldsWithData['pile']">
                    <div 
                      v-if="index > Math.floor(sampleFieldsWithData['pile'].length / 2)"
                      :key="field.name" 
                      class="item--grid">
                      <dt>{{ field.label }}</dt>
                      <dd>{{ field.value }}</dd>
                    </div>
                  </template>
                </div>
              </div>
            </dl>
          </div>
        </div>

        <div class="highlight">
          <img
            src="@assets/images/highlight-bg.png"
            alt=""
            class="inset absolute -z-10 w-full"
          />
          <div class="highlight__content space-y-3">
            <h3>{{ fieldGroupHeaders['quality'] }}</h3>
            <dl role="list" class="list--definition">
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <template v-for="(field, index) in sampleFieldsWithData['quality']">
                    <div 
                      v-if="index < Math.ceil(sampleFieldsWithData['quality'].length / 2)"
                      :key="field.name" 
                      class="item--grid">
                      <dt>{{ field.label }}</dt>
                      <dd>{{ field.value }}</dd>
                    </div>
                  </template>
                </div>
                <div>
                  <template v-for="(field, index) in sampleFieldsWithData['quality']">
                    <div 
                      v-if="index > Math.floor(sampleFieldsWithData['quality'].length / 2)"
                      :key="field.name" 
                      class="item--grid">
                      <dt>{{ field.label }}</dt>
                      <dd>{{ field.value }}</dd>
                    </div>
                  </template>
                </div>
              </div>
            </dl>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div class="chart | grid grid-cols-2 items-center gap-4">
          <figure>
            <img
              src="@assets/images/pie-chart.png"
              alt="Grafiek 1"
              class="w-full"
            />
          </figure>
          <div class="legenda space-y-3">
            <h3>Aantal bouwjaren</h3>
            <ol class="list--legenda">
              <li class="legenda--10">Aantal 1</li>
              <li class="legenda--20">Aantal 2</li>
              <li class="legenda--30">Aantal 3</li>
              <li class="legenda--40">Aantal 4</li>
            </ol>
          </div>
        </div>
        <div class="chart | grid grid-cols-2 items-center gap-4">
          <figure>
            <img
              src="@assets/images/pie-chart.png"
              alt="Grafiek 1"
              class="w-full"
            />
          </figure>
          <div class="legenda space-y-3">
            <h3>Type fundering</h3>
            <ol class="list--legenda">
              <li class="legenda--10">Aantal 1</li>
              <li class="legenda--20">Aantal 2</li>
              <li class="legenda--30">Aantal 3</li>
              <li class="legenda--40">Aantal 4</li>
            </ol>
          </div>
        </div>
      </div>
    </section>
  </Chapter>
</template>