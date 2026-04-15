<script setup lang="ts">
import { computed, inject, ref } from 'vue'
import type { DataSchema, FormUiNode, FormComponentId } from './types'
import { DISPLAY_MODE_KEY } from './context'
import FormFieldRenderer from './FormFieldRenderer.vue'
import FormSection from './layout/FormSection.vue'
import FormGrid from './layout/FormGrid.vue'
import FormFieldset from './layout/FormFieldset.vue'
import FormHeading from './content/FormHeading.vue'
import FormText from './content/FormText.vue'
import FormDivider from './content/FormDivider.vue'
import FormImage from './content/FormImage.vue'
import FormSubmitButton from './fields/FormSubmitButton.vue'

const props = defineProps<{
  node: FormUiNode
  getValue: (path: string) => unknown
  setValue: (path: string, value: unknown) => void
  dataSchema: DataSchema
}>()

const displayMode = inject(DISPLAY_MODE_KEY, ref<'form' | 'report'>('form'))
const isReport = computed(() => displayMode.value === 'report')

const FIELD_COMPONENTS = new Set<FormComponentId>([
  'form.input.text',
  'form.input.number',
  'form.input.textarea',
  'form.input.date',
  'form.input.select',
  'form.input.radio-group',
  'form.input.checkbox-group',
  'form.input.checkbox',
])

const category = computed<'field' | 'layout' | 'content' | 'action' | 'unknown'>(() => {
  const c = props.node.component
  if (FIELD_COMPONENTS.has(c)) return 'field'
  if (c === 'layout.section' || c === 'layout.grid' || c === 'layout.fieldset') return 'layout'
  if (
    c === 'content.heading' ||
    c === 'content.text' ||
    c === 'content.divider' ||
    c === 'content.image'
  )
    return 'content'
  if (c === 'form.button.submit') return 'action'
  return 'unknown'
})

const children = computed(() => props.node.children ?? [])
</script>

<template>
  <!-- Field -->
  <FormFieldRenderer
    v-if="category === 'field'"
    :node="node"
    :get-value="getValue"
    :set-value="setValue"
    :data-schema="dataSchema"
  />

  <!-- Layout -->
  <FormSection
    v-else-if="node.component === 'layout.section'"
    :label="node.props?.label as string"
    :description="node.props?.description as string"
  >
    <FormNodeRenderer
      v-for="child in children"
      :key="child.id"
      :node="child"
      :get-value="getValue"
      :set-value="setValue"
      :data-schema="dataSchema"
    />
  </FormSection>

  <FormGrid
    v-else-if="node.component === 'layout.grid'"
    :cols="(node.props?.cols as number) ?? 2"
  >
    <FormNodeRenderer
      v-for="child in children"
      :key="child.id"
      :node="child"
      :get-value="getValue"
      :set-value="setValue"
      :data-schema="dataSchema"
    />
  </FormGrid>

  <FormFieldset
    v-else-if="node.component === 'layout.fieldset'"
    :label="node.props?.label as string"
  >
    <FormNodeRenderer
      v-for="child in children"
      :key="child.id"
      :node="child"
      :get-value="getValue"
      :set-value="setValue"
      :data-schema="dataSchema"
    />
  </FormFieldset>

  <!-- Content -->
  <FormHeading
    v-else-if="node.component === 'content.heading'"
    :text="node.props?.text as string"
  />
  <FormText
    v-else-if="node.component === 'content.text'"
    :text="node.props?.text as string"
  />
  <FormDivider v-else-if="node.component === 'content.divider'" />
  <FormImage
    v-else-if="node.component === 'content.image'"
    :src="node.props?.src as string"
    :alt="node.props?.alt as string"
    :max-width="node.props?.maxWidth as string"
    :max-height="node.props?.maxHeight as string"
    :fit="((node.props?.fit as string) === 'contain' ? 'contain' : 'cover')"
    :caption="node.props?.caption as string"
  />

  <!-- Actions (hidden in report mode) -->
  <FormSubmitButton
    v-else-if="category === 'action' && !isReport"
    :label="node.props?.label as string"
  />

  <!-- Unknown -->
  <div v-else class="p-2 text-xs text-amber-600 border border-amber-200 rounded">
    Unknown component: {{ node.component }}
  </div>
</template>
