<script setup lang="ts">
import { defineAsyncComponent } from 'vue'

import { trackPending } from '@/lib/pdfReadiness'

const { name } = defineProps({
  name: { type: String, required: true}
})

// We need multiple variants of the same dynamic component, with the only difference being the sub folder
// https://vitejs.dev/guide/features.html#dynamic-import

// The chunk fetch is async — track it so the PDF pipeline doesn't
// rasterize an empty box where the icon should be.
const iconImport = trackPending(import(`../../../assets/svg/icons/foundation/${name}.svg`));
const icon = defineAsyncComponent(() => iconImport);
</script>

<template>
  <component :is="icon"/>
</template>