<script setup lang="ts">

import { onMounted, ref, watch } from 'vue';

import { CHART_COLORS } from '@/config';
import Chart from 'chart.js/auto';

type point = {
  x: number
  y: number
}

const props = withDefaults(defineProps<{
  title?: string,
  labels?: string[],
  data?: point[],
  horizontal?: boolean,
  borderColors?: string[],
  backgroundColors?: string[]
}>(), {
  title: 'Statistiek',
  labels: () => ['red', 'blue', 'green'],
  data: () => [],
  horizontal: false,
  borderColors: () => Object.values(CHART_COLORS),
  backgroundColors: () => Object.values(CHART_COLORS)
})

// @ts-ignore: No time to deep dive into all the TS particulars of Chart.js
let chart: any|null = null

// Reference to Chart canvas element
const canvas = ref<HTMLCanvasElement>();

const createChart = function createChart(
  title: string, labels: string[], data: point[], backgroundColors: string[], borderColors: string[], horizontal: boolean
) {
  if (! canvas.value || ! canvas.value.getContext("2d")) {
    return
  } 

  // eslint-disable-next-line no-unused-vars
  chart = new Chart(
    canvas.value.getContext("2d") as CanvasRenderingContext2D, 
    {
      type: "bubble",
      data: {
        labels,
        datasets: [
          {
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
            color: 'red',
            // beginAtZero: true,
            ticks: {
              //@ts-ignore - TS wants a number, we want to show a date string, which does work just fine
              callback: function(value: number, index, ticks) {
                return (new Date(value)).toLocaleDateString('nl-NL', { 
                  year: 'numeric',
                  month: 'short',
                })
              }
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
          },
          tooltip: {
            callbacks: {
              // any to avoid TS issue without having to create an interface for the whole thing
              label: function(context: any) {
                return `${(new Date(context.raw.x)).toLocaleDateString('nl-NL')}: ${(context.raw.y)}`
              }
            }
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