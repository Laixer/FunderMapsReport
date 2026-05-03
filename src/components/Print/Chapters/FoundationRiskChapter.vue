<script setup lang="ts">
import { type ComputedRef, computed } from 'vue';
import { storeToRefs } from 'pinia';

import Chapter from '@/components/Print/Chapter.vue'
import ClassificationIcon from '@/components/Common/Icons/ClassificationIcon.vue'
import RiskNextSteps from '@/components/Print/RiskNextSteps.vue'
import PieChart from '@/components/Charts/PieChart.vue'

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
  if (!buildingId.value) return null
  return getAnalysisDataByBuildingId(buildingId.value)
})


/**
 * Fields config
 */
interface CompletedFieldDataWithIcon extends CompletedFieldData {
  icon: string | null | undefined
}

const fieldsWithDataAndIcons: ComputedRef<Record<string, CompletedFieldDataWithIcon>> = computed(() => {
  const fieldsConfig = applyContextToFieldDataConfigs({
    source: analysisData,
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
  if (!buildingId.value) return null
  return getStatisticsDataByBuildingId(buildingId.value)
})

// Risk-distribution colors map A→E onto a green→red gradient. Keep a single
// source of truth for the chart slice, the PieChart legend and the marker
// dots so they cannot drift apart again — see issue #14 for the analogous
// foundation-type chart fix.
const RISK_COLORS: string[] = ['#2E7D32', '#9E9D24', '#F9A825', '#EF6C00', '#C62828']

const graphData = computed(() => {
  const distribution = buildingStatistics.value?.foundationRiskDistribution
  const labels = distribution ? Object.keys(distribution).map((key) => key.replace('percentage', '')) : []
  const data = distribution ? Object.values(distribution) : []

  return {
    data,
    labels,
    backgroundColors: RISK_COLORS,
    legend: labels.map((label, index) => ({
      label,
      color: `--marker-color: ${RISK_COLORS[index]}`,
    })),
  }
})

</script>


<template>
  <Chapter icon="alert" title="Funderingsrisico">

    <section class="space-y-7">
      <div class="text-grey-700 space-y-4">
        <p>
          Hieronder vindt u per risicotype een beoordeling voor uw pand: droogstand, optrekkend
          vocht, verschilzakking en bacteriële aantasting. Elk risico wordt afzonderlijk gewogen op
          basis van de beschikbare gegevens en kan verschillende oorzaken hebben — een laag risico
          op het ene type sluit een hoger risico op een ander niet uit.
        </p>
        <p>
          Bij elk risico staat een categorie van A (laagste) tot E (hoogste) en een betrouwbaarheid
          (Vastgesteld, Afgeleid of Indicatief). Zie het hoofdstuk Hoe leest u dit rapport? voor de
          uitleg van beide. Onderaan dit hoofdstuk ziet u hoe uw pand zich verhoudt tot de panden in
          uw wijk.
        </p>
      </div>

      <!-- RISK: Droogstand -->
      <div v-if="fieldsWithDataAndIcons.drystandRisk?.icon" class="risk break-inside-avoid space-y-5">
        <div class="space-y-2">
          <dl role="list" class="list--definition">
            <div class="grid grid-cols-12 items-start gap-4">
              <div class="col-span-5">
                <div class="item">
                  <dd v-if="fieldsWithDataAndIcons.drystandRisk?.icon">
                    <ClassificationIcon :name="fieldsWithDataAndIcons.drystandRisk?.icon + ''" class="aspect-square w-4"
                      aria-hidden="true" />
                  </dd>
                  <dd v-else>
                    -
                  </dd>
                  <dt>Droogstand</dt>
                </div>
              </div>
              <div class="col-span-7">
                <div class="item">
                  <dt>{{ fieldsWithDataAndIcons.drystandReliability?.label }}</dt>
                  <dd>{{ fieldsWithDataAndIcons.drystandReliability?.value }}</dd>
                </div>
              </div>
            </div>
          </dl>

          <div class="text-grey-700">
            <p>
              Bij droogstand (ook wel paalrot genoemd) komt het hoogstgelegen deel van het funderingshout (regelmatig)
              boven de grondwaterspiegel te liggen. Hierdoor kan zuurstof toetreden, wat leidt tot houtrot. Na
              jarenlange droogstand kan het draagvermogen van de fundering zijn aangetast, met als gevolg dat het pand
              vervormt. In een vergevorderd stadium uit zich dit in scheurvorming in de gevel, klemmende ramen en
              deuren, en zichtbare verzakkingen in het gevelaanzich.
            </p>
          </div>
        </div>
        <RiskNextSteps :level="fieldsWithDataAndIcons.drystandRisk?.icon" />
      </div>

      <!-- RISK: Ontwateringsdiepte (Optrekkend vocht & Verschilzakking) -->
      <div v-if="fieldsWithDataAndIcons.dewateringDepthRisk?.icon" class="risk break-inside-avoid space-y-5">
        <div class="space-y-2">
          <dl role="list" class="list--definition">
            <div class="grid grid-cols-12 gap-4">
              <div class="col-span-5">
                <div class="item">
                  <dd v-if="fieldsWithDataAndIcons.dewateringDepthRisk?.icon">
                    <ClassificationIcon :name="fieldsWithDataAndIcons.dewateringDepthRisk?.icon + ''"
                      class="aspect-square w-4" aria-hidden="true" />
                  </dd>
                  <dd v-else>
                    -
                  </dd>
                  <dt>Optrekkend vocht</dt>
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
          <div class="space-y-4 text-grey-700">
            <p>
              Wanneer de grondwaterstand langdurig hoog is en zich dicht bij de fundering bevindt, ontstaat het risico
              op optrekkend vocht. Via poreuze bouwmaterialen - zoals bakstenen en metselmortel - wordt vocht opgenomen
              en trekt het omhoog in de constructie. Dit kan leiden tot schimmelvorming op muren en vloeren. Naast
              mogelijke gezondheidsklachten kan langdurige vochtbelasting ook leiden tot aantasting van bouwmaterialen,
              wat de constructieve staat van het pand verzwakt.
            </p>
            <p>
              Bij een hoge grondwaterstand kan bovendien water in de kruipruimte blijven staan, wat de luchtvochtigheid
              verhoogt en daarmee de kans op schimmel en houtrot verder vergroot.
            </p>
          </div>
        </div>
        <!--
          Volgende stappen for the dewateringDepth topic is rendered once
          at the end of the Verschilzakking sub-section below — it covers
          both Optrekkend vocht and Verschilzakking since they share the
          same risk source (dewateringDepthRisk) and would otherwise
          render identical closer copy back-to-back.
        -->
      </div>
      <div v-if="fieldsWithDataAndIcons.dewateringDepthRisk?.icon" class="risk break-inside-avoid space-y-5">
        <div class="space-y-2">
          <dl role="list" class="list--definition">
            <div class="grid grid-cols-12 gap-4">
              <div class="col-span-5">
                <div class="item">
                  <dd v-if="fieldsWithDataAndIcons.dewateringDepthRisk?.icon">
                    <ClassificationIcon :name="fieldsWithDataAndIcons.dewateringDepthRisk?.icon + ''"
                      class="aspect-square w-4" aria-hidden="true" />
                  </dd>
                  <dd v-else>
                    -
                  </dd>
                  <dt>Verschilzakking</dt>
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
          <div class="space-y-4 text-grey-700">
            <p>
              Wanneer het grondwaterpeil sterk fluctueert - bijvoorbeeld door natte winters en droge zomers - ontstaan
              grotere verschillen in de grondwaterstand gedurende het jaar. Door klimaatverandering worden deze extremen
              steeds sterker: de winters worden natter, de zomers droger. Dit vergroot de dynamiek van het
              grondwaterpeil.
            </p>
            <p>
              Deze schommelingen hebben invloed op samendrukbare grondlagen zoals klei en veen. Tijdens droge perioden
              drogen deze lagen uit, waardoor ze inklinken (consolideren) en het pand geleidelijk zakt. In de natte
              maanden stijgt het grondwater vervolgens sneller tot aan de fundering, met een verhoogd risico op
              optrekkend vocht tot gevolg. Door deze cyclische belasting kunnen onder het pand ongelijkmatige zettingen
              ontstaan, waarbij de draagkracht op verschillende plekken afneemt. Dit kan leiden tot scheefstand en
              vervorming van het gebouw.
            </p>
          </div>
        </div>
        <RiskNextSteps :level="fieldsWithDataAndIcons.dewateringDepthRisk?.icon" />
      </div>

      <!-- RISK: Bacteriële aantasting -->
      <div v-if="fieldsWithDataAndIcons.bioInfectionRisk?.icon" class="risk break-inside-avoid space-y-5">
        <div class="space-y-2">
          <dl role="list" class="list--definition">
            <div class="grid grid-cols-12 gap-4">
              <div class="col-span-5">
                <div class="item">
                  <dd v-if="fieldsWithDataAndIcons.bioInfectionRisk?.icon">
                    <ClassificationIcon :name="fieldsWithDataAndIcons.bioInfectionRisk?.icon + ''"
                      class="aspect-square w-4" aria-hidden="true" />
                  </dd>
                  <dd v-else>
                    -
                  </dd>
                  <dt>Bacteriële aantasting</dt>
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
              Bij de fundering kunnen grenenhouten palen zijn toegepast. Dit hout is gevoelig voor bacteriële
              aantasting, waarbij het van buitenaf over de volledige lengte wordt aangetast (ook wel palenpest genoemd).
              Hierdoor neemt het draagvermogen van de palen geleidelijk af, met verzakking van het pand als gevolg. In
              een vergevorderd stadium uit zich dit in scheurvorming in de gevel, klemmende ramen en deuren, en
              zichtbare verzakkingen in het gevelaanzicht.
            </p>
          </div>
        </div>
        <RiskNextSteps :level="fieldsWithDataAndIcons.bioInfectionRisk?.icon" />
      </div>

      <div class="grid grid-cols-2 gap-4">
        <img v-if="fieldsWithDataAndIcons.drystandRisk?.icon" src="@assets/images/schimmelaantasting_droogstand.webp"
          alt="" />
        <img v-if="fieldsWithDataAndIcons.bioInfectionRisk?.icon" src="@assets/images/bacteriele_aantasting.webp"
          alt="" />
        <img v-if="fieldsWithDataAndIcons.dewateringDepthRisk?.icon" src="@assets/images/optrekkend_vocht.webp"
          alt="" />
        <img v-if="fieldsWithDataAndIcons.dewateringDepthRisk?.icon" src="@assets/images/verschilzakking.webp" alt="" />
      </div>

      <!-- RISK -->
      <div class="risk break-inside-avoid space-y-5">
        <div class="space-y-2">
          <dl role="list" class="list--definition">
            <div class="grid grid-cols-12 gap-4">
              <div class="col-span-12">
                <div class="item">
                  <dt>Risicoverdeling van de Wijk op Basis van Risicomodellen</dt>
                  <dd></dd>
                </div>
              </div>
            </div>
          </dl>
          <div class="text-grey-700">
            <p>
              In deze grafiek is per pand het hoogste risico bepaald uit de verschillende risicomodellen. Deze maximale
              risico-waarden zijn vervolgens gebruikt om de risicoverdeling in de hele wijk in kaart te brengen, waarbij
              de verhoudingen zijn weergegeven in de bijgaande grafiek.
            </p>
          </div>
        </div>

        <div class="chart | grid grid-cols-12 items-center gap-4">
          <div class="col-span-5">
            <PieChart title="Verdeling van funderingsrisico in de wijk" :data="graphData.data"
              :labels="graphData.labels" :backgroundColors="graphData.backgroundColors" />
          </div>
          <div class="col-span-7">
            <div class="legenda space-y-3">
              <h3>Verdeling van funderingsrisico in de wijk</h3>
              <ol class="list--legenda">
                <li v-for="item in graphData.legend" :key="item.label" :style="item.color">{{ item.label }}</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  </Chapter>
</template>