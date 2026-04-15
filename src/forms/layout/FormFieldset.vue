<script setup lang="ts">
defineProps<{ label?: string }>()
</script>

<template>
  <fieldset class="space-y-3">
    <legend v-if="label" class="font-medium text-sm text-slate-700">{{ label }}</legend>
    <slot />
  </fieldset>
</template>
