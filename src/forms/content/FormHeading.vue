<script setup lang="ts">
defineProps<{ text?: string }>()
</script>

<template>
  <h3 class="font-semibold text-slate-900 text-lg">{{ text }}</h3>
</template>
