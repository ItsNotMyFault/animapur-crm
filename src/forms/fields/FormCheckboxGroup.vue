<script setup lang="ts">
import { computed } from 'vue'

const model = defineModel<string[]>({ default: () => [] })
defineProps<{ options: Array<{ label: string; value: string | number }> }>()

const currentValues = computed(() => model.value ?? [])

function toggle(value: string | number, checked: boolean | 'indeterminate') {
  const v = String(value)
  const cur = currentValues.value.slice()
  model.value = checked === true ? [...cur, v] : cur.filter((x) => x !== v)
}
</script>

<template>
  <div class="flex flex-wrap gap-4">
    <UCheckbox
      v-for="opt in options"
      :key="String(opt.value)"
      :label="opt.label"
      :model-value="currentValues.includes(String(opt.value))"
      @update:model-value="(checked) => toggle(opt.value, checked)"
    />
  </div>
</template>
