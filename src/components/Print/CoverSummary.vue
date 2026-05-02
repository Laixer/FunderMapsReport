<script setup lang="ts">
import { computed } from 'vue';
import { storeToRefs } from 'pinia';

import Chapter from '@/components/Print/Chapter.vue'

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
  <Chapter icon="home-info" title="Samenvatting">
    <section class="space-y-7">
      <dl role="list" class="list--definition">
        <div class="item justify-between">
          <dt>Adres</dt>
          <dd>{{ fullAddress }}</dd>
        </div>
        <div class="item justify-between">
          <dt>Bouwjaar</dt>
          <dd>{{ constructionYear }}</dd>
        </div>
        <div class="item justify-between">
          <dt>Funderingstype</dt>
          <dd>{{ foundationTypeLabel }}</dd>
        </div>
        <div class="item justify-between">
          <dt>Hoogste risicocategorie</dt>
          <dd>{{ highestRiskLabel }}</dd>
        </div>
        <div class="item justify-between">
          <dt>BAG ID</dt>
          <dd>{{ externalBuildingId }}</dd>
        </div>
      </dl>

      <p class="text-grey-700 text-sm">
        Gegenereerd op {{ generatedAt }}
      </p>
    </section>
  </Chapter>
</template>
