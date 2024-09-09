<script setup lang="ts">

import { CHART_COLORS, CHART_TRANSPARENT_COLORS } from '@/config';
import BarChart from './BarChart.vue'

withDefaults(defineProps<{
  title?: string,
  labels?: string[],
  data?: string[]|number[],
  borderColors?: string[],
  backgroundColors?: string[]
}>(), {
  title: 'Statistiek',
  labels: () => ['red', 'blue', 'green'],
  data: () => [100, 200, 600],
  borderColors: () => Object.values(CHART_COLORS),
  backgroundColors: () => Object.values(CHART_TRANSPARENT_COLORS)
})

</script>

<template>
  <BarChart 
    :title="title"
    :labels="labels"
    :data="data"
    :horizontal="true"
    :border-colors="borderColors"
    :background-color="backgroundColors"
  />
</template>