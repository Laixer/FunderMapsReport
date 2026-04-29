<script setup lang="ts">

import { onMounted, ref, watch } from 'vue';

import { CHART_COLORS } from '@/config';
import Chart from 'chart.js/auto';

import chartTrendline from 'chartjs-plugin-trendline';
Chart.register(chartTrendline)

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let chart: any | null = null

// Reference to Chart canvas element
const canvas = ref<HTMLCanvasElement>();

const createChart = function createChart(
  title: string, labels: string[], data: point[], backgroundColors: string[], borderColors: string[], horizontal: boolean
) {
  if (! canvas.value || ! canvas.value.getContext("2d")) {
    return
  } 

   
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
            borderWidth: 1,
            // @ts-expect-error trendlineLinear option provided by chartjs-plugin-trendline, not in Chart.js types
            trendlineLinear: {
              colorMin: "#17a4ea",
		          colorMax: "#17a4ea",
              lineStyle: "solid",
              width: 2,
            }
          },
          
        ]
      },
      options: {
        indexAxis: horizontal ? 'y' : 'x',
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              color: '#808c99',
              precision: 0
            },
            title: {
              display: true,
              text: 'mm'
            }
          },
          x: {
            // beginAtZero: true,
            ticks: {
              color: '#808c99',
              //@ts-expect-error - TS wants a number, we want to show a date string, which does work just fine
              callback: function(value: number) {
                return (new Date(value)).toLocaleDateString('nl-NL', { 
                  year: 'numeric',
                  month: 'short',
                }).split(' ')
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
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              label: function(context: any) {
                return `${(new Date(context.raw.x)).toLocaleDateString('nl-NL')}: ${(context.raw.y)} mm`
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