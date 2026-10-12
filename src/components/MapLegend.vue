<script setup lang="ts">
defineProps<{
  items: { color: string, label: string }[],
  cols: number
}>()
</script>

<template>
  <!-- An inline style: a class name put together at run time (grid-cols-N) is not in the stylesheet. -->
  <div class="maplegend | grid gap-2 px-2" :style="{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }">
    <div class="maplegend--item relative pl-4" v-for="item in items" :key="item.label"
      :style="`--color: ${item.color}`">
      {{ item.label }}
    </div>
  </div>
</template>
