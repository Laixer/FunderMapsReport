<script setup lang="ts">
import { computed } from 'vue'

// Risk-stratified "Volgende stappen" closer for each finding inside
// FoundationRiskChapter. Takes the icon level produced by retrieveAndFormatFieldData
// (a / b / c / d / e — same letters used for the ClassificationIcon SVGs)
// and shows guidance scaled to the severity:
//
//   A / B  → low  — observe, no action needed
//   C      → medium — stay alert, QuickScan if circumstances change
//   D / E  → high — recommend KCAF QuickScan now
const props = defineProps<{
  level?: string | null
}>()

const tone = computed<'low' | 'medium' | 'high' | null>(() => {
  if (!props.level) return null
  const l = props.level.toLowerCase()
  if (l === 'a' || l === 'b') return 'low'
  if (l === 'c') return 'medium'
  if (l === 'd' || l === 'e') return 'high'
  return null
})
</script>

<template>
  <aside v-if="tone" class="text-grey-700 border-t border-grey-200 space-y-2 pt-3">
    <strong class="text-grey-800 block">Volgende stappen</strong>
    <p v-if="tone === 'low'">
      Het risico is laag. Een aanvullend onderzoek is op dit moment meestal niet nodig. Houd het
      pand wel in de gaten op zichtbare signalen — scheurvorming, klemmende ramen of deuren,
      zichtbare verzakkingen — en raadpleeg dit rapport opnieuw als die zich voordoen of bij een
      ingrijpende verbouwing.
    </p>
    <p v-else-if="tone === 'medium'">
      Het risico is verhoogd. Acute maatregelen zijn nu meestal nog niet nodig, maar het is
      verstandig om alert te blijven op zichtbare signalen (scheurvorming, vocht, scheefstand). Bij
      twijfel — of bij verkoop of verbouwing van het pand — is een KCAF QuickScan een goede
      vervolgstap (zie hoofdstuk Aanvullend onderzoek).
    </p>
    <p v-else>
      Het risico is hoog. Wij adviseren een <strong>KCAF QuickScan</strong> als vervolgstap — een
      relatief snelle en betaalbare beoordeling die uitwijst of aanvullend funderingsonderzoek op
      locatie nodig is (zie hoofdstuk Aanvullend onderzoek). Bij zichtbare schade aan de gevel of
      constructie is een specialistisch funderingsonderzoek aangewezen.
    </p>
  </aside>
</template>
