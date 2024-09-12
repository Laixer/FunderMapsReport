<script setup lang="ts">

import { onMounted, ref, watch } from 'vue';

import { CHART_COLORS } from '@/config';
import Chart from 'chart.js/auto';

const props = withDefaults(defineProps<{
  title?: string,
  labels?: string[],
  data?: string[]|number[],
  horizontal?: boolean,
  borderColors?: string[],
  backgroundColors?: string[]
}>(), {
  title: 'Statistiek',
  labels: () => ['red', 'blue', 'green'],
  data: () => [100, 200, 600],
  horizontal: false,
  borderColors: () => Object.values(CHART_COLORS),
  backgroundColors: () => Object.values(CHART_COLORS)
})

// @ts-ignore: No time to deep dive into all the TS particulars of Chart.js
let chart: any|null = null

// Reference to Chart canvas element
const canvas = ref<HTMLCanvasElement>();

const createChart = function createChart(
  title: string, labels: string[], data: string[]|number[], backgroundColors: string[], borderColors: string[], horizontal: boolean
) {
  if (! canvas.value || ! canvas.value.getContext("2d")) {
    return
  } 

  // eslint-disable-next-line no-unused-vars
  chart = new Chart(
    canvas.value.getContext("2d") as CanvasRenderingContext2D, 
    {
      type: "bar",
      data: {
        labels,
        datasets: [
          {
            label: title,
            data,
            backgroundColor: backgroundColors,
            borderColor: borderColors,
            borderWidth: 1
          },
        ]
      },
      options: {
        indexAxis: horizontal ? 'y' : 'x',
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              precision: 0
            }
          },
          x: {
            beginAtZero: true,
            ticks: {
              precision: 0
            }
          }
        },
        plugins: {
          title: {
            text: title,
            display: true
          },
          legend: {
            display: false
          }
        }
      },
    }
  );

  // Disable animation in the popup, it is too much
  chart.options.animation = false; 
}

onMounted(() => {
  createChart(
    props.title,
    props.labels,
    props.data,
    props.backgroundColors,
    props.borderColors,
    props.horizontal
  )
})

watch(
  () => props,
  (props) => {
    if (! chart) return 

    chart.destroy()
    createChart(
      props.title,
      props.labels,
      props.data,
      props.backgroundColors,
      props.borderColors,
      props.horizontal
    )
  },
  {
    deep: true
  }
)

</script>

<template>
  <canvas ref="canvas" class="chart"></canvas>
</template>