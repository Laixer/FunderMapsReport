<script setup lang="ts">
import { type ComputedRef, computed } from 'vue'; 
import { storeToRefs } from 'pinia';

import { IInquiryReport } from '@/datastructures/interfaces/index.ts';

import Chapter from '@/components/Print/Chapter.vue'

import { useInquiriesStore } from '@/store/building/inquiries.ts';
import { useBuildingStore } from '@/store/buildings';

const { buildingId } = storeToRefs(useBuildingStore())
const { getInquiryByBuildingId } = useInquiriesStore()

/**
 * Data inquiry sample source for panel
 */
const inqueryData: ComputedRef<IInquiryReport[]> = computed(() => {
  if (! buildingId.value) return []
  return getInquiryByBuildingId(buildingId.value) || []
})

</script>

<template>
  <Chapter 
    icon="file-report"
    title="Rapportage">
    
    <section class="break-before-avoid-page break-inside-avoid space-y-7">
      <table class="w-full">
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
      <figure>
        <img src="@assets/images/bar-chart.png" alt="" class="w-full" />
      </figure>
    </section>

  </Chapter>
</template>