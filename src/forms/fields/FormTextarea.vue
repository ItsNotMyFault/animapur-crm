<script setup lang="ts">
const model = defineModel<string>()
withDefaults(defineProps<{ placeholder?: string; rows?: number }>(), { rows: 3 })
</script>

<template>
  <UTextarea v-model="model" class="w-full" :rows="rows" :placeholder="placeholder ?? ''" />
</template>
