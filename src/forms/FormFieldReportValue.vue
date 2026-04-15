<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  value: unknown
  component: string
  nodeProps?: Record<string, unknown>
}>()

const isEmpty = computed(() => {
  if (props.value == null) return true
  if (props.value === '') return true
  if (Array.isArray(props.value) && props.value.length === 0) return true
  return false
})

const isBoolean = computed(() => props.component === 'form.input.checkbox')
const isSingleSelect = computed(() =>
  ['form.input.select', 'form.input.radio-group'].includes(props.component),
)
const isMultiSelect = computed(() => props.component === 'form.input.checkbox-group')

function resolveOptionLabel(val: unknown): string {
  const items = props.nodeProps?.options as
    | Array<{ label: string; value: string | number }>
    | undefined
  if (!items || !Array.isArray(items)) return String(val ?? '')
  const found = items.find((i) => i.value === val)
  return found?.label ?? String(val ?? '')
}

const selectLabel = computed(() => resolveOptionLabel(props.value))
const multiLabels = computed(() => {
  if (!Array.isArray(props.value)) return []
  return props.value.map((v) => resolveOptionLabel(v))
})
</script>

<template>
  <span v-if="isEmpty" class="text-sm text-slate-400 italic">—</span>

  <div v-else-if="isBoolean" class="flex items-center gap-1.5">
    <UIcon
      :name="value ? 'i-lucide-check-circle-2' : 'i-lucide-x-circle'"
      :class="value ? 'text-primary' : 'text-slate-400'"
      class="size-4"
    />
    <span class="text-sm">{{ value ? 'Oui' : 'Non' }}</span>
  </div>

  <span v-else-if="isSingleSelect" class="text-sm">{{ selectLabel }}</span>

  <div v-else-if="isMultiSelect" class="flex flex-wrap gap-1">
    <UBadge v-for="(label, idx) in multiLabels" :key="idx" variant="subtle" size="xs">
      {{ label }}
    </UBadge>
  </div>

  <span
    v-else-if="component === 'form.input.textarea'"
    class="text-sm whitespace-pre-wrap text-slate-900"
  >{{ value }}</span>

  <span v-else class="text-sm text-slate-900">{{ value }}</span>
</template>
