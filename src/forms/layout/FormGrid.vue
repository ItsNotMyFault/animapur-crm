<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{ cols?: number }>(), { cols: 2 })

const gridCols = computed(() => {
  switch (props.cols) {
    case 3:
      return 'md:grid-cols-3'
    case 4:
      return 'md:grid-cols-4'
    default:
      return 'md:grid-cols-2'
  }
})
</script>

<template>
  <div class="grid gap-4" :class="gridCols">
    <slot />
  </div>
</template>
