<script setup lang="ts">

interface Field {
  name: string
  label: string
  value: null | undefined | boolean | number | string
  break?: boolean
}

const props = defineProps<{
  fields: Field[]
}>()

const formattedFields = props.fields.map(field => {
  field.break = field.label.includes('(')
  return field
})
</script>

<template>
  <div v-for="field in formattedFields" :key="field.name" class="item--grid">
    <dt v-if="!field.break">{{ field.label }}</dt>
    <!--
      The source in brackets stays on the label's line where it fits and is
      kept in one piece where it does not: on a line of its own it read as a
      row without a value.
    -->
    <dt v-else>
      {{ field.label.split('(')[0] }}<span class="whitespace-nowrap italic">{{ `(${field.label.split('(')[1]}` }}</span>
    </dt>
    <dd>{{ field.value }}</dd>
  </div>
</template>