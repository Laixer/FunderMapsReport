<script setup lang="ts">

import Chapter from '@/components/Print/Chapter.vue'

</script>

<template>
  <Chapter
    icon="wrench"
    title="Funderingsherstel">

    <section class="space-y-7">
      <dl role="list" class="list--definition">
        <div class="grid grid-cols-2 gap-4">
          <div>
            <div class="item--grid">
              <dt>Funderingsherstel</dt>
              <dd>Ja/<strong class="text-black">Nee</strong></dd>
            </div>
            <div class="item--grid">
              <dt>Locatieherstel</dt>
              <dd><strong class="text-black">Ja</strong>/Nee</dd>
            </div>
          </div>
          <div>
            <div class="item--grid">
              <dt>Type herstel</dt>
              <dd>Partieeel/Volledig/Verlaging</dd>
            </div>
          </div>
        </div>
      </dl>
    </section>
    
  </Chapter>
</template>