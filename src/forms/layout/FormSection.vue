<script setup lang="ts">
defineProps<{ label?: string; description?: string }>()
</script>

<template>
  <section class="bg-white border border-slate-200 rounded-lg p-5 space-y-4 break-inside-avoid">
    <header v-if="label" class="border-b border-slate-200 pb-3">
      <h3 class="font-semibold text-slate-900">{{ label }}</h3>
      <p v-if="description" class="text-sm text-muted mt-1">{{ description }}</p>
    </header>
    <slot />
  </section>
</template>
