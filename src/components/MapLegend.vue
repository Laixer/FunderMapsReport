<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  items: { color: string, label: string }[],
  cols: number
}>()

// Equal columns make the rows of a legend line up. A legend of one row has
// nothing to line up: its columns follow their labels and share the room that
// is left, so a long label does not end against the square of the next one.
const columns = computed(() => props.items.length > props.cols
  ? `repeat(${props.cols}, minmax(0, 1fr))`
  : `repeat(${props.cols}, auto)`)
</script>

<template>
  <!-- An inline style: a class name put together at run time (grid-cols-N) is not in the stylesheet. -->
  <div class="maplegend | grid gap-2 px-2" :style="{ gridTemplateColumns: columns }">
    <div class="maplegend--item relative pl-4" v-for="item in items" :key="item.label"
      :style="`--color: ${item.color}`">
      {{ item.label }}
    </div>
  </div>
</template>
