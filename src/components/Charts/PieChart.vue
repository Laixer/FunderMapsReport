<script setup lang="ts">

import { onMounted, watch, ref } from 'vue';

import { CHART_COLORS } from '@/config';
import Chart from 'chart.js/auto';

// The white line between slices, and how wide a slice has to be at the rim
// (in px) to get one. On a narrower slice the lines on its two edges leave
// less colour than white: a class of well under 1% showed as a white sliver.
const SLICE_LINE = 2
const NARROWEST_SLICE_WITH_LINE = 7

const props = withDefaults(defineProps<{
  title?: string,
  labels?: string[],
  data?: string[]|number[],
  backgroundColors?: string[]
}>(), {
  title: 'Statistiek',
  labels: () => ['red', 'blue', 'green'],
  data: () => [100, 200, 600],
  backgroundColors: () => Object.values(CHART_COLORS)
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let chart: any | null = null

// Reference to Chart canvas element
const canvas = ref<HTMLCanvasElement>();

const createChart = function createChart(
  title: string, labels: string[], data: string[]|number[], backgroundColors: string[]
) {
  if (! canvas.value || ! canvas.value.getContext("2d")) {
    return
  } 

   
  const values = data.map(value => Number(value))
  const total = values.reduce((sum, value) => sum + value, 0)
  // With a single slice there is nothing to separate, and the line showed as
  // a seam at 12 o'clock.
  const severalSlices = values.filter(value => value > 0).length > 1

  chart = new Chart(
    canvas.value.getContext("2d") as CanvasRenderingContext2D, 
    {
      type: "pie",
      data: {
        labels,
        datasets: [
          {
            label: title,
            data,
            backgroundColor: backgroundColors,
            borderWidth: (context) => {
              if (!severalSlices) return 0
              const rim = (values[context.dataIndex] / total) * Math.PI * Math.min(context.chart.width, context.chart.height)
              return rim < NARROWEST_SLICE_WITH_LINE ? 0 : SLICE_LINE
            },
            hoverOffset: 4
          },
        ]
      },
      options: {
        animation: false,
        plugins: {
          legend: {
            display: false,
            title: {
              text: title,
              display: true,
              color: 'black',
              font: {
                weight: 'bold'
              }
            },
            position: 'right',
            align: 'center',
            labels: {
              boxWidth: 80
            }
          }
        }
      }
    }
  );

  // Disable animation in the popup, it is too much
  // chart.options.animation = false; 
}

onMounted(() => {
  createChart(
    props.title,
    props.labels,
    props.data,
    props.backgroundColors
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
      props.backgroundColors
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