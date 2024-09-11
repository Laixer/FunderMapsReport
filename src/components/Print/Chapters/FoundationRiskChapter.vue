<script setup lang="ts">
import { type ComputedRef, computed } from 'vue'; 
import { storeToRefs } from 'pinia';

import Chapter from '@/components/Print/Chapter.vue'
import ClassificationIcon from '@/components/Common/Icons/ClassificationIcon.vue'
import PieChart from '@/components/Charts/PieChart.vue'
import { CHART_COLORS } from '@/config';

import { retrieveAndFormatFieldData, FieldDataConfig, applyContextToFieldDataConfigs, CompletedFieldData } from '@/utils/fieldData'
import { riskFieldLabels } from '@/datastructures/fieldLabels'

import { EFoundationRiskIconNames } from '@/datastructures/enums/EFoundationRisk'
import { type EFoundationRisk } from '@/datastructures/enums';

import { useAnalysisStore } from '@/store/building/analysis';
import { useBuildingStore } from '@/store/buildings';
import { useStatisticsStore } from '@/store/building/statistics';


const { getAnalysisDataByBuildingId } = useAnalysisStore()
const { getStatisticsDataByBuildingId } = useStatisticsStore()
const { buildingId } = storeToRefs(useBuildingStore())

/**
 * Data source for panel
 */
const analysisData = computed(() => {
  if (! buildingId.value) return null
  return getAnalysisDataByBuildingId(buildingId.value)
})


/**
 * Fields config
 */
interface CompletedFieldDataWithIcon extends CompletedFieldData {
  icon: string|null|undefined
}

const fieldsWithDataAndIcons: ComputedRef<Record<string, CompletedFieldDataWithIcon>> = computed(() => {
  const fieldsConfig = applyContextToFieldDataConfigs({
    source: analysisData || {},
    labels: riskFieldLabels,
    configs: [
      new FieldDataConfig({ group: 'drystand', name: 'drystandRisk' }),
      new FieldDataConfig({ group: 'drystand', name: 'drystand' }),
      new FieldDataConfig({ group: 'drystand', name: 'drystandReliability' }),
      new FieldDataConfig({ group: 'dewatering', name: 'dewateringDepthRisk' }),
      new FieldDataConfig({ group: 'dewatering', name: 'dewateringDepth' }),
      new FieldDataConfig({ group: 'dewatering', name: 'dewateringDepthReliability' }),
      new FieldDataConfig({ group: 'bioinfection', name: 'bioInfectionRisk' }),
      new FieldDataConfig({ group: 'bioinfection', name: 'bioInfectionReliability' }),
      // new FieldDataConfig({ group: 'negativecling', name: 'negativeclingRisk' }),
      // new FieldDataConfig({ group: 'negativecling', name: 'negativeclingReliability' }),
      new FieldDataConfig({ group: 'differentialsettlement', name: 'differentialsettlementRisk' }),
      new FieldDataConfig({ group: 'differentialsettlement', name: 'differentialsettlementReliability' }),
      new FieldDataConfig({ group: 'unclassified', name: 'unclassifiedRisk' }),
      // new FieldDataConfig({ group: 'facadescan', name: 'facadescanRisk' }),
    ]
  })
  
  return fieldsConfig
    .map(retrieveAndFormatFieldData)

    // Additional step for risk: add an icon (or null)
    // TODO: Refactor to a more generic solution
    .map((fieldWithData: CompletedFieldData): CompletedFieldDataWithIcon => {
      const icon = [
        'drystandRisk', 'dewateringDepthRisk', 'bioInfectionRisk', 'unclassifiedRisk', 'differentialsettlementRisk'
      ].includes(fieldWithData.name) 
        ? EFoundationRiskIconNames.get(fieldWithData.getValue('raw') as EFoundationRisk)
        : null

      return Object.assign(fieldWithData, { icon })
    })
    
    .reduce(
      (acc: Record<string, CompletedFieldDataWithIcon>, fieldData: CompletedFieldDataWithIcon) => {
        acc[fieldData.name] = fieldData
        return acc
      }, {} as Record<string, CompletedFieldDataWithIcon>
    )
})


/**
 * GRAPH data
 */
const buildingStatistics = computed(() => {
  if (! buildingId.value) return null
  return getStatisticsDataByBuildingId(buildingId.value)
})

const graphData = computed(() => {
  const result = {
    data: Object.values(buildingStatistics.value?.foundationRiskDistribution || {}),
    labels: Object.keys(buildingStatistics.value?.foundationRiskDistribution || {}).map(key => key.replace('percentage', '')),
    legend: Object.keys(buildingStatistics.value?.foundationRiskDistribution || {}).map((key, index) => {
      const colors = Object.values(CHART_COLORS)
      return {
        label: key.replace('percentage', ''),
        color: `--marker-color: ${colors[index]}`
      }
    }),
  }

  return result
})

</script>


<template>
  <Chapter 
    icon="alert"
    title="Funderingsrisico">
    
    <section class="space-y-7">
      <!-- RISK: Droogstand -->
      <div class="risk break-inside-avoid space-y-5">
        <div class="space-y-2">
          <dl role="list" class="list--definition">
            <div class="grid grid-cols-12 items-start gap-4">
              <div 
                class="col-span-5">
                <div class="item">
                  <dt>Droogstand</dt>
                  <dd v-if="fieldsWithDataAndIcons.drystandRisk?.icon">
                    <ClassificationIcon 
                      :name="fieldsWithDataAndIcons.drystandRisk?.icon + ''" 
                      class="aspect-square w-4"
                      aria-hidden="true" />
                  </dd>
                  <dd v-else>
                    -
                  </dd>
                </div>
              </div>
              <div 
                class="col-span-7">
                <div class="item">
                  <dt>{{ fieldsWithDataAndIcons.drystandReliability?.label }}</dt>
                  <dd>{{ fieldsWithDataAndIcons.drystandReliability?.value }}</dd>
                </div>
              </div>
            </div>
          </dl>

          <div class="text-grey-700">
            <p>
              Bij droogstand komt het hoogstgelegen funderingshout (regelmatig) droog te staan. Hierdoor kan het funderingshout gaan rotten door de aanvoer van zuurstof. Na jarenlange droogstand kan het draagvermogen van de fundering zijn aangetast, waardoor het pand kan gaan deformeren. Indien dit in een vergevorderd stadium is, zijn er scheuren in de gevel zichtbaar, klemmen ramen en deuren, en vertoont het gevelaanzicht tekenen van verzakkingen.
            </p>
          </div>
        </div>
      </div>

      <!-- RISK: Ontwateringsdiepte -->
      <div class="risk break-inside-avoid space-y-5">
        <div class="space-y-2">
          <dl role="list" class="list--definition">
            <div class="grid grid-cols-12 gap-4">
              <div 
                class="col-span-5">
                <div class="item">
                  <dt>Ontwateringsdiepte</dt>
                  <dd v-if="fieldsWithDataAndIcons.dewateringDepthRisk?.icon">
                    <ClassificationIcon 
                      :name="fieldsWithDataAndIcons.dewateringDepthRisk?.icon + ''" 
                      class="aspect-square w-4"
                      aria-hidden="true" />
                  </dd>
                  <dd v-else>
                    -
                  </dd>
                </div>
              </div>
              <div class="col-span-7">
                <div class="item">
                  <dt>{{ fieldsWithDataAndIcons.dewateringDepthReliability?.label }}</dt>
                  <dd>{{ fieldsWithDataAndIcons.dewateringDepthReliability?.value }}</dd>
                </div>
              </div>
            </div>
          </dl>
          <div class="text-grey-700">
            <p>
              Wanneer de grondwaterstand zich te dicht op de fundering bevindt, is er een risico op optrekkend vocht en (verschil-)verzakkingen van het pand.
            </p>
          </div>
        </div>
      </div>

      <!-- RISK: Verschilzakking -->
      <div class="risk break-inside-avoid space-y-5">
        <div class="space-y-2">
          <dl role="list" class="list--definition">
            <div class="grid grid-cols-12 gap-4">
              <div 
                class="col-span-5">
                <div class="item">
                  <dt>Bacteriële aantasting</dt>
                  <dd 
                    v-if="fieldsWithDataAndIcons.bioInfectionRisk?.icon">
                    <ClassificationIcon 
                      :name="fieldsWithDataAndIcons.bioInfectionRisk?.icon + ''" 
                      class="aspect-square w-4"
                      aria-hidden="true" />
                  </dd>
                  <dd v-else>
                    -
                  </dd>
                </div>
              </div>
              <div class="col-span-7">
                <div class="item">
                  <dt>{{ fieldsWithDataAndIcons.bioInfectionReliability?.label }}</dt>
                  <dd>{{ fieldsWithDataAndIcons.bioInfectionReliability?.value }}</dd>
                </div>
              </div>
            </div>
          </dl>
          <div class="text-grey-700">
            <p>
              Er kunnen grenen palen zijn gebruikt voor de fundeirng. Hierdoor kan er een risico zijn op bacteriële aantasting. Grenen palen zijn gevoelig voor bacteriële aantasting, waardoor het hout van buitenaf wordt aangetast over de gehele lengte van de paal. Het draagvermogen van de paal neemt daarmee af, waardoor het pand gaat verzakken. Indien dit in een vergevorderd stadium is, zijn er scheuren in de gevel zichtbaar, klemmen ramen en deuren, en vertoont het gevelaanzicht tekenen van verzakkingen.
            </p>
          </div>
        </div>
      </div>

      <!-- RISK -->
      <div class="risk break-inside-avoid space-y-5">
        <div class="space-y-2">
          <dl role="list" class="list--definition">
            <div class="grid grid-cols-12 gap-4">
              <div 
                class="col-span-12">
                <div class="item">
                  <dt>Risicoverdeling van de Wijk op Basis van Risicomodellen</dt>
                  <dd></dd>
                </div>
              </div>
            </div>
          </dl>
          <div class="text-grey-700">
            <p>
              Het hoogste risico uit de verschillende risicomodellen is toegepast op het pand. Deze maximale risico’s zijn vervolgens gebruikt om een overzicht van de risicoverdeling voor de hele wijk te maken, waarbij de verhoudingen worden weergegeven in de bijgaande grafiek.
            </p>
          </div>
        </div>
        
        <div class="chart | grid grid-cols-12 items-center gap-4">
          <div class="col-span-5">
            <PieChart 
              title="Type fundering (wijk)"
              :data="graphData.data"
              :labels="graphData.labels" />
          </div>
          <div class="col-span-7">
            <div class="legenda space-y-3">
              <h3>Verdeling van funderingsrisico in de wijk</h3>
              <ol class="list--legenda">
                <li 
                  v-for="item in graphData.legend" 
                  :style="item.color">{{ item.label }}</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  </Chapter>
</template>