<script setup lang="ts">
import { type ComputedRef, computed } from 'vue'; 
import { storeToRefs } from 'pinia';

import Chapter from '@/components/Print/Chapter.vue'
import ClassificationIcon from '@/components/Common/Icons/ClassificationIcon.vue'

import { retrieveAndFormatFieldData, FieldDataConfig, applyContextToFieldDataConfigs, CompletedFieldData } from '@/utils/fieldData'
import { riskFieldLabels } from '@/datastructures/fieldLabels'

import { EFoundationRiskIconNames } from '@/datastructures/enums/EFoundationRisk'
import { type EFoundationRisk } from '@/datastructures/enums';

import { useAnalysisStore } from '@/store/building/analysis';
import { useBuildingStore } from '@/store/buildings';


const { getAnalysisDataByBuildingId } = useAnalysisStore()
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
                v-if="fieldsWithDataAndIcons.drystandRisk?.icon"
                class="col-span-5">
                <div class="item">
                  <dt>Droogstand</dt>
                  <dd>
                    <ClassificationIcon 
                      :name="fieldsWithDataAndIcons.drystandRisk?.icon + ''" 
                      class="aspect-square w-4"
                      aria-hidden="true" />
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
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Nostrum quam corrupti ipsa, iure aspernatur sed maxime dolores
              ipsum quae saepe quas voluptate fuga culpa debitis quibusdam
              nam neque id repellendus.
            </p>
          </div>
        </div>

        <div class="chart | grid grid-cols-12 items-center gap-4">
          <figure class="col-span-5">
            <img
              src="@assets/images/pie-chart.png"
              alt="Grafiek 1"
              class="w-full"
            />
          </figure>
          <div class="legenda col-span-5 space-y-3">
            <h3>Aantal bouwjaren</h3>
            <ol class="list--legenda">
              <li class="legenda--10">Aantal 1</li>
              <li class="legenda--20">Aantal 2</li>
              <li class="legenda--30">Aantal 3</li>
              <li class="legenda--40">Aantal 4</li>
            </ol>
          </div>
        </div>
      </div>

      <!-- RISK: Ontwateringsdiepte -->
      <div class="risk break-inside-avoid space-y-5">
        <div class="space-y-2">
          <dl role="list" class="list--definition">
            <div class="grid grid-cols-12 gap-4">
              <div 
                v-if="fieldsWithDataAndIcons.dewateringDepthRisk?.icon"
                class="col-span-5">
                <div class="item">
                  <dt>Ontwateringsdiepte</dt>
                  <dd>
                    <ClassificationIcon 
                      :name="fieldsWithDataAndIcons.dewateringDepthRisk?.icon + ''" 
                      class="aspect-square w-4"
                      aria-hidden="true" />
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
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Nostrum quam corrupti ipsa, iure aspernatur sed maxime dolores
              ipsum quae saepe quas voluptate fuga culpa debitis quibusdam
              nam neque id repellendus.
            </p>
          </div>
        </div>
        <div class="chart | grid grid-cols-12 items-center gap-4">
          <figure class="col-span-5">
            <img
              src="@assets/images/pie-chart.png"
              alt="Grafiek 1"
              class="w-full"
            />
          </figure>
          <div class="legenda col-span-5 space-y-3">
            <h3>Aantal bouwjaren</h3>
            <ol class="list--legenda">
              <li class="legenda--10">Aantal 1</li>
              <li class="legenda--20">Aantal 2</li>
              <li class="legenda--30">Aantal 3</li>
              <li class="legenda--40">Aantal 4</li>
            </ol>
          </div>
        </div>
      </div>

      <!-- RISK: Verschilzakking -->
      <div class="risk break-inside-avoid space-y-5">
        <div class="space-y-2">
          <dl role="list" class="list--definition">
            <div class="grid grid-cols-12 gap-4">
              <div 
                v-if="fieldsWithDataAndIcons.drystandRisk?.icon"
                class="col-span-5">
                <div class="item">
                  <dt>Verschilzakking</dt>
                  <dd>
                    <ClassificationIcon 
                      :name="fieldsWithDataAndIcons.drystandRisk?.icon + ''" 
                      class="aspect-square w-4"
                      aria-hidden="true" />
                  </dd>
                </div>
              </div>
              <div class="col-span-7">
                <div class="item">
                  <dt>{{ fieldsWithDataAndIcons.differentialsettlementReliability?.label }}</dt>
                  <dd>{{ fieldsWithDataAndIcons.differentialsettlementReliability?.value }}</dd>
                </div>
              </div>
            </div>
          </dl>
          <div class="text-grey-700">
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Nostrum quam corrupti ipsa, iure aspernatur sed maxime dolores
              ipsum quae saepe quas voluptate fuga culpa debitis quibusdam
              nam neque id repellendus.
            </p>
          </div>
        </div>
        <div class="chart | grid grid-cols-12 items-center gap-4">
          <figure class="col-span-5">
            <img
              src="@assets/images/pie-chart.png"
              alt="Grafiek 1"
              class="w-full"
            />
          </figure>
          <div class="legenda col-span-5 space-y-3">
            <h3>Aantal bouwjaren</h3>
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