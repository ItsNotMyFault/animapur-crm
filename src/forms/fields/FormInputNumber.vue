<script setup lang="ts">
const model = defineModel<number>()
defineProps<{ placeholder?: string }>()
</script>

<template>
  <UInput
    v-model.number="model"
    type="number"
    class="w-full"
    :placeholder="placeholder ?? ''"
  />
</template>
