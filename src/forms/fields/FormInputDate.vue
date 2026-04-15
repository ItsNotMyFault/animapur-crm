<script setup lang="ts">
const model = defineModel<string>()
</script>

<template>
  <UInput v-model="model" type="date" class="w-full" />
</template>
