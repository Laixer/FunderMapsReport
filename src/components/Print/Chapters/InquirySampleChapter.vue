<script setup lang="ts">
import { type ComputedRef, computed } from 'vue';
import { storeToRefs } from 'pinia';

import { IFoundationTypePair } from '@/datastructures/interfaces/api/IStatistics.ts';
import { ICombinedInquiryData } from '@/datastructures/interfaces/index.ts';

import Chapter from '@/components/Print/Chapter.vue'
import FoundationIcon from '@/components/Common/Icons/FoundationIcon.vue';
import PieChart from '@/components/Charts/PieChart.vue'

import { retrieveAndFormatFieldData, FieldDataConfig, applyContextToFieldDataConfigs, CompletedFieldData } from '@/utils/fieldData'
import { inquirySampleFieldLabels } from '@/datastructures/fieldLabels'

import { useAnalysisStore } from '@/store/building/analysis';
import { useInquiriesStore } from '@/store/building/inquiries.ts';
import { useStatisticsStore } from '@/store/building/statistics';
import { useBuildingStore } from '@/store/buildings';



const { getAnalysisDataByBuildingId } = useAnalysisStore()
const { getCombinedInquiryDataByBuildingId } = useInquiriesStore()
const { getStatisticsDataByBuildingId } = useStatisticsStore()
const { buildingId } = storeToRefs(useBuildingStore())

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
const foundationType = computed(() => {
  return retrieveAndFormatFieldData(
    new FieldDataConfig({
      name: 'foundationType',
      source: analysisData
    })
  )
})

const foundationIconName = computed(() => {
  if (!analysisData.value) return null

  switch (analysisData.value?.foundationType) {
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
 * Data inquiry sample source for panel
 */
const inqueryData: ComputedRef<ICombinedInquiryData[]> = computed(() => {
  if (!buildingId.value) return []
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
      new FieldDataConfig({ name: 'foundationTypeReliability', source: analysisData }),
      new FieldDataConfig({ name: 'enforcementTerm' }),
      new FieldDataConfig({ name: 'damageCharacteristics' }),
      new FieldDataConfig({ name: 'overallQuality' }),
      new FieldDataConfig({ name: 'damageCause' }),
      new FieldDataConfig({ name: 'substructure' }),
    ]
  })

  return fieldsConfig.map(retrieveAndFormatFieldData)
})


const fieldGroupHeaders: Record<string, string> = {
  pile: 'Palen & Hout',
  quality: 'Niveau & Kwaliteit',
}

const groupHasData: Record<string, boolean> = {
  pile: false,
  quality: false,
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
      new FieldDataConfig({ group: 'quality', name: 'pileWoodCapacityVerticalQuality' }),
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

/******************************************************************************
 * Graph
 */

const buildingStatistics = computed(() => {
  if (!buildingId.value) return null
  return getStatisticsDataByBuildingId(buildingId.value)
})


const foundationTypeGraph = computed(() => {
  return {
    labels: ['Betonnen', 'Houten paal met betonoplanger', 'Houten palen', 'Niet onderheid'],
    data: buildingStatistics.value?.foundationTypeDistribution.foundationTypes.reduce((acc: number[], pair: IFoundationTypePair) => {
      switch (pair.foundationType) {
        case 3:
        case 11:
        case 12:
        case 13:
          acc[0] = acc[0] + pair.percentage
          return acc

        case 10:
          acc[1] = acc[1] + pair.percentage
          return acc

        case 0:
        case 1:
        case 2:
        case 15:
        case 16:
        case 17:
          acc[2] = acc[2] + pair.percentage
          return acc

        case 4:
        case 5:
        case 6:
        case 7:
        case 8:
        case 9:
          acc[3] = acc[3] + pair.percentage
          return acc

        default:
          acc[4] = acc[4] + pair.percentage
          return acc
      }
    }, [0, 0, 0, 0, 0]) || [],
    legend: ['Betonnen', 'Houten paal met betonoplanger', 'Houten palen', 'Niet onderheid'].map((label, index) => {
      const colors = ['#CE0015', '#6A6C70', '#8F7A2E', '#8C3A28']
      return {
        label,
        color: `--marker-color: ${colors[index]}`
      }
    })
  }
})

</script>

<template>
  <Chapter icon="file-foundation" title="Fundering">
    <section class="space-y-7">
      <div class="grid grid-cols-12 gap-4">
        <figure v-if="foundationIconName"
          class="col-span-3 flex aspect-square flex-col items-center gap-1 rounded border border-grey-400 p-4">
          <FoundationIcon :name="foundationIconName" class="aspect-square w-2/3 flex-1" aria-hidden="true" />
          <figcaption class="is-12 leadding-none flex-initial text-center font-bold text-grey-700">
            {{ foundationType.value }}
          </figcaption>
        </figure>

        <dl role="list" class="list--definition col-span-9">
          <div v-for="field in fieldsWithFoundationData" :key="field.name" class="item justify-between">
            <dt>{{ field.label }}</dt>
            <dd>{{ field.value }}</dd>
          </div>
        </dl>
      </div>

      <div class="space-y-5">
        <div v-if="groupHasData['pile']" class="highlight">
          <img src="@assets/images/highlight-bg.png" alt="" class="inset absolute -z-10 w-full" />
          <div class="highlight__content space-y-3">
            <h3>{{ fieldGroupHeaders['pile'] }}</h3>
            <dl role="list" class="list--definition">
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <template v-for="(field, index) in sampleFieldsWithData['pile']">
                    <div v-if="index < Math.ceil(sampleFieldsWithData['pile'].length / 2)" :key="field.name"
                      class="item--grid">
                      <dt>{{ field.label }}</dt>
                      <dd>{{ field.value }}</dd>
                    </div>
                  </template>
                </div>
                <div>
                  <template v-for="(field, index) in sampleFieldsWithData['pile']">
                    <div v-if="index >= Math.floor(sampleFieldsWithData['pile'].length / 2)" :key="field.name"
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

        <div v-if="groupHasData['pile']" class="highlight">
          <img src="@assets/images/highlight-bg.png" alt="" class="inset absolute -z-10 w-full" />
          <div class="highlight__content space-y-3">
            <h3>{{ fieldGroupHeaders['quality'] }}</h3>
            <dl role="list" class="list--definition">
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <template v-for="(field, index) in sampleFieldsWithData['quality']">
                    <div v-if="index < Math.ceil(sampleFieldsWithData['quality'].length / 2)" :key="field.name"
                      class="item--grid">
                      <dt>{{ field.label }}</dt>
                      <dd>{{ field.value }}</dd>
                    </div>
                  </template>
                </div>
                <div>
                  <template v-for="(field, index) in sampleFieldsWithData['quality']">
                    <div v-if="index >= Math.floor(sampleFieldsWithData['quality'].length / 2)" :key="field.name"
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

      <div class="text-grey-700">
        <p v-if="foundationIconName === 'houten-palen'">
          Bij een fundering op houten palen wordt het gebouw gedragen door verticale houten palen die diep in de grond zijn aangebracht. Deze palen reiken doorgaans tot een draagkrachtige zandlaag en zijn bedoeld om de constructie te ondersteunen in slappe of natte bodems. De palen blijven in goede staat zolang ze onder de grondwaterstand blijven en er daardoor geen zuurstof bij komt.
        </p>
        <p v-if="foundationIconName === 'betonnen-palen'">
          Bij een fundering op betonpalen wordt de belasting van het gebouw overgedragen aan de ondergrond via betonnen palen die diep in de bodem zijn geheid. Deze funderingsvorm is veelal toegepast bij zwaardere constructies of in gebieden waar de draagkrachtige laag zich op grotere diepte bevindt. Betonpalen zijn duurzaam, bestand tegen vocht en bacteriële aantasting, en kennen doorgaans geen funderingsproblematiek.
        </p>
        <p v-if="foundationIconName === 'houten-palen-oplanger'">
          Een fundering op houten palen met oplanger bestaat uit houten palen die zijn verlengd met een betonnen opzetstuk (de oplanger). Deze oplanger zorgt ervoor dat de paalkop dieper onder het maaiveld - en idealiter onder de grondwaterstand - komt te liggen. Het doel hiervan is om het hout te beschermen tegen zuurstof en daarmee tegen aantasting, zoals rot. Deze methode werd vaak toegepast bij latere aanpassingen of bij hersteldelen in bestaande bebouwing.
        </p>
        <p v-if="foundationIconName === 'niet-onderheid'">
          Een ondiepe fundering - vaak aangeduid als fundering op staal - is een funderingsvorm waarbij het pand direct op een draagkrachtige grondlaag rust, zoals zand of vaste klei. De belasting van het gebouw wordt via funderingsstroken of poeren verspreid over de ondergrond. Deze methode is geschikt op locaties waar de draagkrachtige laag zich dicht bij het maaiveld bevindt. In slappe of ongelijkmatige bodems is er echter meer risico op zettingen of scheefstand. In het verleden is dit funderingstype veelvuldig toegepast in gebieden met beperkte draagkracht.
        </p>
      </div>

      <div v-if="foundationTypeGraph.data.length !== 0" class="chart | grid grid-cols-12 items-center gap-4">
        <div class="col-span-5">
          <PieChart 
            title="Type fundering (wijk)" 
            :data="foundationTypeGraph.data"
            :labels="foundationTypeGraph.labels" 
            :backgroundColors="['#CE0015', '#6A6C70', '#8F7A2E', '#8C3A28']" />
        </div>
        <div class="col-span-7">
          <div class="legenda space-y-3">
            <h3>Type fundering (wijk)</h3>
            <ol class="list--legenda">
              <li v-for="item in foundationTypeGraph.legend" :style="item.color">{{ item.label }}</li>
            </ol>
          </div>
        </div>
      </div>
    </section>
  </Chapter>
</template>