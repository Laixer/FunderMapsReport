<script setup lang="ts">
import { defineAsyncComponent } from 'vue'

const { name } = defineProps({
  name: { type: String, required: true}
})

// We need multiple variants of the same dynamic component, with the only difference being the sub folder
// https://vitejs.dev/guide/features.html#dynamic-import

const icon = defineAsyncComponent(() => import(`../../../assets/svg/icons/foundation/${name}.svg`));
</script>

<template>
  <component :is="icon"/>
</template>