<script setup lang="ts">
defineProps<{ label?: string }>()
</script>

<template>
  <div class="flex justify-end pt-2">
    <UButton
      type="submit"
      color="primary"
      size="lg"
      :label="label ?? 'Submit'"
      trailing-icon="i-lucide-check"
    />
  </div>
</template>
