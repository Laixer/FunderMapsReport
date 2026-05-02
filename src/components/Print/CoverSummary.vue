<script setup lang="ts">
import { computed } from 'vue';
import { storeToRefs } from 'pinia';

import { useAnalysisStore } from '@/store/building/analysis';
import { useGeoLocationsStore } from '@/store/building/geolocations';
import { useBuildingStore } from '@/store/buildings';

import { EFoundationRisk, EFoundationRiskLabels } from '@/datastructures/enums';

const { buildingId } = storeToRefs(useBuildingStore())
const { getAnalysisDataByBuildingId } = useAnalysisStore()
const { getLocationDataByBuildingId } = useGeoLocationsStore()

const analysisData = computed(() => {
  if (!buildingId.value) return null
  return getAnalysisDataByBuildingId(buildingId.value)
})

const locationData = computed(() => {
  if (!buildingId.value) return null
  return getLocationDataByBuildingId(buildingId.value)
})

const fullAddress = computed(() => locationData.value?.address?.fullAddress || '—')

const constructionYear = computed(() => analysisData.value?.constructionYear ?? '—')

const foundationTypeLabel = computed(() => {
  const label = analysisData.value?.foundationTypeLabel
  return label && label.length > 0 ? label : '—'
})

// Headline risk = the worst category across all four risk fields. Higher
// numeric enum value = higher risk on the A–E scale (A=0, E=4).
const highestRiskLabel = computed(() => {
  const a = analysisData.value
  if (!a) return '—'
  const risks = [a.drystandRisk, a.dewateringDepthRisk, a.bioInfectionRisk, a.unclassifiedRisk]
    .filter((r): r is EFoundationRisk => r !== undefined && r !== null)
  if (risks.length === 0) return 'Geen data'
  const worst = Math.max(...risks) as EFoundationRisk
  return EFoundationRiskLabels.get(worst) || 'Onbekend'
})

const externalBuildingId = computed(() => analysisData.value?.externalBuildingId || buildingId.value || '—')

const generatedAt = computed(() =>
  new Date().toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' })
)
</script>

<template>
  <article class="break-inside-avoid space-y-5">
    <header class="space-y-1">
      <p class="text-grey-700 text-sm uppercase tracking-wide">Pand</p>
      <h2 class="text-grey-800 h-4">{{ fullAddress }}</h2>
    </header>

    <dl role="list" class="list--definition grid grid-cols-2 gap-x-8 gap-y-3 border-t border-grey-200 pt-5">
      <div class="item--grid">
        <dt>Bouwjaar</dt>
        <dd>{{ constructionYear }}</dd>
      </div>
      <div class="item--grid">
        <dt>Funderingstype</dt>
        <dd>{{ foundationTypeLabel }}</dd>
      </div>
      <div class="item--grid">
        <dt>Hoogste risicocategorie</dt>
        <dd>{{ highestRiskLabel }}</dd>
      </div>
      <div class="item--grid">
        <dt>BAG ID</dt>
        <dd>{{ externalBuildingId }}</dd>
      </div>
    </dl>

    <p class="text-grey-700 border-t border-grey-200 pt-3 text-sm">
      Gegenereerd op {{ generatedAt }}
    </p>
  </article>
</template>
