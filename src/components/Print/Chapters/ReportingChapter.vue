<script setup lang="ts">
import { type ComputedRef, computed } from 'vue';
import { storeToRefs } from 'pinia';

import { IInquiryReport } from '@/datastructures/interfaces/index.ts';

import PageBreak from '@/components/Print/PageBreak.vue'
import Chapter from '@/components/Print/Chapter.vue'
import BarChart from '@/components/Charts/BarChart.vue';

import { useInquiriesStore } from '@/store/building/inquiries.ts';
import { useStatisticsStore } from '@/store/building/statistics';
import { useBuildingStore } from '@/store/buildings';

const { buildingId } = storeToRefs(useBuildingStore())
const { getInquiryByBuildingId } = useInquiriesStore()
const { getStatisticsDataByBuildingId } = useStatisticsStore()

/**
 * Data inquiry sample source for panel
 */
const inqueryData: ComputedRef<IInquiryReport[]> = computed(() => {
  if (!buildingId.value) return []
  return getInquiryByBuildingId(buildingId.value) || []
})

/******************************************************************************
 * Graph
 */

const buildingStatistics = computed(() => {
  if (!buildingId.value) return null
  return getStatisticsDataByBuildingId(buildingId.value)
})


const reportGraph = computed(() => {
  if (!buildingStatistics.value?.totalReportCount) {
    return {
      data: [],
      labels: []
    }
  }

  return {
    data: buildingStatistics?.value?.totalReportCount.map(item => item.totalCount),
    labels: buildingStatistics.value.totalReportCount.map(item => item.year + '')
  }
})

</script>

<template>
  <Chapter v-if="inqueryData.length || reportGraph.data.length" icon="file-report" title="Rapportage">

    <section class="break-before-avoid-page break-inside-avoid space-y-7">
      <p v-if="inqueryData.length !== 0">
        De volgende rapportage(s) zijn beschikbaar voor dit pand en zijn gebruikt voor het opstellen van het
        funderingsrisicorapport
      </p>
      <table v-if="inqueryData.length !== 0" class="w-full">
        <thead>
          <tr>
            <th>Nummer</th>
            <th>Naam</th>
            <th>Type</th>
            <th>Datum</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="report in inqueryData" :key="report.id">
            <td>{{ report.id }}</td>
            <td>{{ report.documentName }}</td>
            <td>{{ report.typeLabel }}</td>
            <td>{{ report.documentDate?.split('T')?.[0].split('-').reverse().join('-') }}</td>
          </tr>
        </tbody>
      </table>

      <BarChart v-if="reportGraph.data.length !== 0" title="Aantal rapportages in de wijk per jaar"
        :data="reportGraph.data" :labels="reportGraph.labels" gradient />
    </section>

  </Chapter>
  <PageBreak v-if="inqueryData.length || reportGraph.data.length" />
</template>