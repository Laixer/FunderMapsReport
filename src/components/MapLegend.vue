<script setup lang="ts">
defineProps<{
  items: { color: string, label: string }[],
  cols: number
}>()
</script>

<template>
  <div class="maplegend | grid gap-2 px-2" :class="`grid-cols-${cols}`">
    <div class="maplegend--item relative pl-4" v-for="item in items" :key="item.label"
      :style="`--color: ${item.color}`">
      {{ item.label }}
    </div>
  </div>
</template>
