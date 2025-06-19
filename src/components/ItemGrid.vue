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
    <dt v-else>
      <div>{{ field.label.split('(')[0] }}</div>
      <div class="italic">{{ `(${field.label.split('(')[1]}` }}</div>
    </dt>
    <dd>{{ field.value }}</dd>
  </div>
</template>