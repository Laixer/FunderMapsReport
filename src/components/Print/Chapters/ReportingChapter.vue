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
 * Newest document first, the same order the Fundering chapter picks its
 * "most recent" report by (the API hands them over by date of last change).
 */
const inquiryData: ComputedRef<IInquiryReport[]> = computed(() => {
  if (!buildingId.value) return []
  return (getInquiryByBuildingId(buildingId.value) || [])
    .slice()
    .sort((a, b) => {
      const byDate = (b.documentDate || '').localeCompare(a.documentDate || '')
      return byDate !== 0 ? byDate : b.id - a.id
    })
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
  <Chapter v-if="inquiryData.length || reportGraph.data.length" icon="file-report" title="Rapportage">

    <section class="break-before-avoid-page break-inside-avoid space-y-7">
      <div class="text-grey-700 space-y-4">
        <p>
          Onder de risicobeoordelingen in dit rapport liggen onderzoeksrapportages voor uw pand of
          voor panden in de directe omgeving. Hieronder vindt u welke rapportages zijn meegenomen, en
          hoeveel onderzoeken er per jaar in uw wijk zijn uitgevoerd – meer onderzoeken in uw buurt
          geven over het algemeen een betrouwbaardere modelinschatting.
        </p>
      </div>
      <p v-if="inquiryData.length === 1" class="text-grey-700">
        De volgende rapportage is beschikbaar voor dit pand en is gebruikt voor het opstellen van
        het funderingsrisicorapport.
      </p>
      <p v-else-if="inquiryData.length !== 0" class="text-grey-700">
        De volgende rapportages zijn beschikbaar voor dit pand en zijn gebruikt voor het opstellen
        van het funderingsrisicorapport.
      </p>
      <p v-else class="text-grey-700">
        Voor dit pand zelf zijn geen onderzoeksrapportages bekend.
      </p>
      <table v-if="inquiryData.length !== 0" class="w-full">
        <thead>
          <tr>
            <th>Nummer</th>
            <th>Type</th>
            <th>Datum</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="report in inquiryData" :key="report.id">
            <td>{{ report.id }}</td>
            <td>{{ report.typeLabel }}</td>
            <td>{{ report.documentDate?.split('T')?.[0].split('-').reverse().join('-') }}</td>
          </tr>
        </tbody>
      </table>

      <BarChart v-if="reportGraph.data.length !== 0" title="Aantal rapportages in de wijk per jaar"
        :data="reportGraph.data" :labels="reportGraph.labels" gradient />
    </section>

  </Chapter>
  <PageBreak v-if="inquiryData.length || reportGraph.data.length" />
</template>