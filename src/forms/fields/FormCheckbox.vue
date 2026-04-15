<script setup lang="ts">
const model = defineModel<boolean>()
defineProps<{ label?: string }>()
</script>

<template>
  <UCheckbox v-model="model" :label="label" />
</template>
