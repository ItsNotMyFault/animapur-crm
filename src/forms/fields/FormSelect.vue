<script setup lang="ts">
const model = defineModel<string | number>()
defineProps<{ options: Array<{ label: string; value: string | number }> }>()
</script>

<template>
  <USelect v-model="model" :items="options" class="w-full" />
</template>
