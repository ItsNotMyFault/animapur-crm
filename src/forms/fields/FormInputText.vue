<script setup lang="ts">
const model = defineModel<string>()
defineProps<{ placeholder?: string }>()
</script>

<template>
  <UInput v-model="model" class="w-full" :placeholder="placeholder ?? ''" />
</template>
