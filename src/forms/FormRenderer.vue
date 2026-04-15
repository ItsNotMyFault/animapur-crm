<script setup lang="ts">
import { computed, provide, toRef } from 'vue'
import type { FormSchema } from './types'
import { DISPLAY_MODE_KEY } from './context'
import { useFormState } from './useFormState'
import FormNodeRenderer from './FormNodeRenderer.vue'

const props = withDefaults(
  defineProps<{
    schema: FormSchema
    initialData?: Record<string, unknown>
    displayMode?: 'form' | 'report'
  }>(),
  { displayMode: 'form' },
)

const emit = defineEmits<{
  submit: [data: Record<string, unknown>]
}>()

const { state, getValue, setValue } = useFormState(props.initialData ?? {})

provide(DISPLAY_MODE_KEY, toRef(props, 'displayMode'))

function onSubmit() {
  emit('submit', JSON.parse(JSON.stringify(state)))
}

const rootChildren = computed(() => props.schema.ui.children)
const isReport = computed(() => props.displayMode === 'report')
</script>

<template>
  <div v-if="isReport" class="space-y-6">
    <FormNodeRenderer
      v-for="child in rootChildren"
      :key="child.id"
      :node="child"
      :get-value="getValue"
      :set-value="setValue"
      :data-schema="schema.dataSchema"
    />
  </div>

  <form v-else class="space-y-6" @submit.prevent="onSubmit">
    <FormNodeRenderer
      v-for="child in rootChildren"
      :key="child.id"
      :node="child"
      :get-value="getValue"
      :set-value="setValue"
      :data-schema="schema.dataSchema"
    />
  </form>
</template>
