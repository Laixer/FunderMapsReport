<script setup lang="ts">

import FundermapsIcon from '@/components/Common/Icons/FundermapsIcon.vue';

defineProps({
  title: { type: String, default: null },
  icon: { type: String, default: null }
})

</script>

<template>

  <article class="space-y-5">
    <header class="flex break-after-avoid items-center gap-2.5">
      <FundermapsIcon
        v-if="icon"
        :name="icon"
        class="accent-color-blue aspect-square w-4"
        aria-hidden="true"
      />
      <h2 class="h-4">{{ title }}</h2>
    </header>

    <slot />
    
  </article>
</template>