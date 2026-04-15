<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    src?: string
    alt?: string
    maxWidth?: string
    maxHeight?: string
    fit?: 'cover' | 'contain'
    caption?: string
  }>(),
  { alt: '', fit: 'cover', maxWidth: '100%', maxHeight: 'none' },
)

const style = computed(() => ({
  maxWidth: props.maxWidth,
  maxHeight: props.maxHeight,
}))
</script>

<template>
  <figure class="flex flex-col items-center gap-2 break-inside-avoid">
    <img
      :src="src"
      :alt="alt"
      :class="[
        'rounded-md border border-slate-200',
        fit === 'contain' ? 'object-contain' : 'object-cover',
      ]"
      :style="style"
    />
    <figcaption v-if="caption" class="text-xs text-muted">{{ caption }}</figcaption>
  </figure>
</template>
