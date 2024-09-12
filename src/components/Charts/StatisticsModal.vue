<script setup lang="ts">
import { type ComputedRef, computed, type Component  } from 'vue';
import { storeToRefs } from 'pinia';

import OverlayModal from '@/components/Common/OverlayModal.vue'

import BarChart from '@/components/Modals/Statistics/BarChart.vue'
import PieChart from '@/components/Modals/Statistics/PieChart.vue'
import HorizontalBarChart from '@/components/Modals/Statistics/HorizontalBarChart.vue'

import { useBuildingStore } from "@/store/buildings";
import { useStatisticsStore } from '@/store/building/statistics';
import { IConstructionYearPair, IFoundationTypePair, IIncidentYearPair, IInquiryYearPair } from '@/datastructures/interfaces/api/IStatistics';
import { CHART_COLORS, CHART_TRANSPARENT_COLORS } from '@/config';

const { buildingId } = storeToRefs(useBuildingStore())
const { getStatisticsDataByBuildingId } = useStatisticsStore()
const { showStatisticsModal, statisticsGraph } = storeToRefs(useStatisticsStore())

const emit = defineEmits(['close'])

interface IComponents {
    [key: string]: Component
}
const availableChartComponents: IComponents = {
  BarChart,
  PieChart,
  HorizontalBarChart
}


const buildingStatistics = computed(() => {
  if (! buildingId.value) return null
  return getStatisticsDataByBuildingId(buildingId.value)
})

/**
 * The chart title, based on the statistic name
 */
const title: ComputedRef<string> = computed(() => {
  switch(statisticsGraph.value) {
    case 'foundationTypeDistribution': 
      return 'Verhouding funderingstype in de buurt'

    case 'constructionYearDistribution':
      return 'Aantal bouwjaren per decennia in de buurt'

    case 'foundationRiskDistribution':
      return 'Verhouding funderingsrisico in de buurt'

    case 'totalBuildingRestoredCount':
      return 'Aantal herstel panden per jaar in de buurt'

    case 'totalIncidentCount':
      return 'Aantal incidenten per jaar in de buurt'

    case 'municipalityIncidentCount':
      return 'Aantal incidenten per jaar in de gemeente'
  
    case 'totalReportCount':
      return 'Aantal onderzoeken per jaar in de buurt'

    case 'municipalityReportCount':
      return 'Aantal onderzoeken per jaar in de gemeente'
  }

  return 'Statistiek'
})

/**
 * The graph type, based on the statistic name
 */
const chartComponentName: ComputedRef<string>  = computed(() => {
  switch(statisticsGraph.value) {
    case 'foundationTypeDistribution': 
    case 'foundationRiskDistribution':
      return 'PieChart'
    
    case 'constructionYearDistribution':
      return 'BarChart'

    case 'totalBuildingRestoredCount':
    case 'totalIncidentCount':
    case 'municipalityIncidentCount':
    case 'totalReportCount':
    case 'municipalityReportCount':
      return 'HorizontalBarChart'
  }

  return ''
})

const labels = computed(() => {

  switch(statisticsGraph.value) {
    case 'foundationTypeDistribution': 

      return ['Betonnen', 'Houten paal met betonoplanger', 'Houten palen', 'Niet onderheid', 'Overige']

    case 'constructionYearDistribution':
  
      if (! buildingStatistics.value?.constructionYearDistribution) return []

      return buildingStatistics.value.constructionYearDistribution.decades.map((decade: IConstructionYearPair) => {
        return `${decade.decade.yearFrom.substring(0, 4)}-${decade.decade.yearTo.substring(0, 4)}`
      })

    case 'foundationRiskDistribution':
      if (! buildingStatistics.value?.foundationRiskDistribution) return []

      return Object.keys(buildingStatistics.value?.foundationRiskDistribution)
        .map(key => key.replace('percentage', ''))

    // TODO: API does not yet provide graph data
    case 'totalBuildingRestoredCount':
      if (! buildingStatistics.value?.totalBuildingRestoredCount) return []

      return [ 'Aantal' ]

    case 'totalIncidentCount':
      if (! buildingStatistics.value?.totalIncidentCount) return []

      return buildingStatistics.value.totalIncidentCount.map((decade: IIncidentYearPair) => {
        return decade.year
      })

    case 'municipalityIncidentCount':
      if (! buildingStatistics.value?.municipalityIncidentCount) return []

      return buildingStatistics.value.municipalityIncidentCount.map((decade: IIncidentYearPair) => {
        return decade.year
      })

    case 'totalReportCount': 
      if (! buildingStatistics.value?.totalReportCount) return []

      return buildingStatistics.value.totalReportCount.map((decade: IInquiryYearPair) => {
        return decade.year
      })

    case 'municipalityReportCount': 
      if (! buildingStatistics.value?.municipalityReportCount) return []

      return buildingStatistics.value.municipalityReportCount.map((decade: IInquiryYearPair) => {
        return decade.year
      })

  }

  return ['red', 'blue', 'yellow']
})

const data = computed(() => {

  if (! buildingStatistics.value) return []

  switch(statisticsGraph.value) {
    case 'foundationTypeDistribution': 
      if (! buildingStatistics.value.foundationTypeDistribution.foundationTypes) return []

      return buildingStatistics.value.foundationTypeDistribution.foundationTypes.reduce((acc: number[], pair: IFoundationTypePair ) => {
        switch(pair.foundationType) {
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
      }, [0, 0, 0, 0, 0])

    case 'constructionYearDistribution':
  
      if (! buildingStatistics.value?.constructionYearDistribution) return []

      return buildingStatistics.value.constructionYearDistribution.decades.map((decade: IConstructionYearPair) => {
        return decade.totalCount
      })

    case 'foundationRiskDistribution':
      if (! buildingStatistics.value?.foundationRiskDistribution) return []

      return Object.values(buildingStatistics.value.foundationRiskDistribution)

    // TODO: API does not yet provide graph data
    case 'totalBuildingRestoredCount':
      if (! buildingStatistics.value?.totalBuildingRestoredCount) return []

      return [ buildingStatistics.value.totalBuildingRestoredCount ]

    case 'totalIncidentCount':
      if (! buildingStatistics.value?.totalIncidentCount) return []

      return buildingStatistics.value.totalIncidentCount.map((decade: IIncidentYearPair) => {
        return decade.totalCount
      })

    case 'municipalityIncidentCount':
      if (! buildingStatistics.value?.municipalityIncidentCount) return []

      return buildingStatistics.value.municipalityIncidentCount.map((decade: IIncidentYearPair) => {
        return decade.totalCount
      })

    case 'totalReportCount': 
      if (! buildingStatistics.value?.totalReportCount) return []

      return buildingStatistics.value.totalReportCount.map((decade: IInquiryYearPair) => {
        return decade.totalCount
      })


    case 'municipalityReportCount': 
      if (! buildingStatistics.value?.municipalityReportCount) return []

      return buildingStatistics.value.municipalityReportCount.map((decade: IInquiryYearPair) => {
        return decade.totalCount
      })
  }

  return [300, 200, 600]
})

const backgroundColors = computed(() => {
 switch(statisticsGraph.value) {
    case 'foundationTypeDistribution': 
      return ['#7f8fa4', '#c9b441', '#7b2a2d', '#ce0015', '#ffcc69']

    case 'foundationRiskDistribution':
      const riskColorMap = {
        'A': '#28CC8B',
        'B': '#A7DDB7',
        'C': '#FFCC69',
        'D': '#FF7D1F',
        'E': '#ED1C24'
      }

      return labels.value
        // @ts-ignore - things became too complex for TS to evaluate properly
        .map((label: string) => (riskColorMap[label as keyof typeof riskColorMap] || ''))
  }

  return Object.values(CHART_TRANSPARENT_COLORS)
})

const borderColors = computed(() => {
  return Object.values(CHART_COLORS)
})


const handleClose = function handleClose() {
  showStatisticsModal.value = false
}

</script>

<template>
  <OverlayModal 
    v-if="showStatisticsModal && buildingStatistics"
    :title="title"
    :transparent="true"
    class="xl:pointer-events-none xl:bg-transparent"
    @close="handleClose">
    <div 
      v-if="chartComponentName !== ''"
      class="w-full">
      <component 
        :is="availableChartComponents[chartComponentName]"
        :title="title" 
        :labels="labels"
        :data="data"
        :background-colors="backgroundColors"
        :border-colors="borderColors"
      />
    </div>
  </OverlayModal>
</template>