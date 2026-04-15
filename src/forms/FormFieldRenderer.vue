<script setup lang="ts">
import { computed, inject, ref } from 'vue'
import type { DataSchema, DataSchemaProperty, FormUiNode } from './types'
import { DISPLAY_MODE_KEY } from './context'
import FormFieldReportValue from './FormFieldReportValue.vue'
import FormInputText from './fields/FormInputText.vue'
import FormInputNumber from './fields/FormInputNumber.vue'
import FormTextarea from './fields/FormTextarea.vue'
import FormInputDate from './fields/FormInputDate.vue'
import FormSelect from './fields/FormSelect.vue'
import FormRadioGroup from './fields/FormRadioGroup.vue'
import FormCheckboxGroup from './fields/FormCheckboxGroup.vue'
import FormCheckbox from './fields/FormCheckbox.vue'

const props = defineProps<{
  node: FormUiNode
  getValue: (path: string) => unknown
  setValue: (path: string, value: unknown) => void
  dataSchema: DataSchema
}>()

const displayMode = inject(DISPLAY_MODE_KEY, ref<'form' | 'report'>('form'))
const isReport = computed(() => displayMode.value === 'report')

function lookupProperty(path: string): DataSchemaProperty | undefined {
  const parts = path.split('.')
  let curProps = props.dataSchema.properties
  let prop: DataSchemaProperty | undefined
  for (const part of parts) {
    prop = curProps?.[part]
    if (!prop) return undefined
    curProps = prop.properties ?? {}
  }
  return prop
}

const schemaProp = computed(() =>
  props.node.field ? lookupProperty(props.node.field.path) : undefined,
)

const label = computed(
  () =>
    (props.node.props?.label as string | undefined) ??
    schemaProp.value?.title ??
    props.node.field?.path ??
    '',
)

const description = computed(
  () =>
    (props.node.props?.description as string | undefined) ?? schemaProp.value?.description,
)

const required = computed(() => {
  if (!props.node.field) return false
  const topKey = props.node.field.path.split('.')[0]!
  return (props.dataSchema.required ?? []).includes(topKey)
})

const modelValue = computed({
  get: () => (props.node.field ? props.getValue(props.node.field.path) : undefined),
  set: (v) => props.node.field && props.setValue(props.node.field.path, v),
})

const options = computed(() => {
  const fromProps = props.node.props?.options as
    | Array<{ label: string; value: string | number }>
    | undefined
  if (fromProps) return fromProps
  const enumValues = schemaProp.value?.enum
  if (enumValues) return enumValues.map((v) => ({ label: String(v), value: v }))
  return []
})
</script>

<template>
  <!-- Report mode: label above, value below -->
  <div v-if="isReport" class="space-y-1">
    <div class="text-xs font-medium text-slate-500 uppercase tracking-wide">
      {{ label }}
    </div>
    <FormFieldReportValue
      :value="modelValue"
      :component="node.component"
      :node-props="{ ...(node.props ?? {}), options }"
    />
  </div>

  <!-- Form mode: interactive field with label -->
  <UFormField
    v-else
    :label="node.component === 'form.input.checkbox' ? undefined : label"
    :description="description"
    :required="required"
  >
    <FormInputText
      v-if="node.component === 'form.input.text'"
      v-model="(modelValue as string)"
      :placeholder="(node.props?.placeholder as string) ?? ''"
    />
    <FormInputNumber
      v-else-if="node.component === 'form.input.number'"
      v-model="(modelValue as number)"
      :placeholder="(node.props?.placeholder as string) ?? ''"
    />
    <FormTextarea
      v-else-if="node.component === 'form.input.textarea'"
      v-model="(modelValue as string)"
      :placeholder="(node.props?.placeholder as string) ?? ''"
      :rows="(node.props?.rows as number) ?? 3"
    />
    <FormInputDate
      v-else-if="node.component === 'form.input.date'"
      v-model="(modelValue as string)"
    />
    <FormSelect
      v-else-if="node.component === 'form.input.select'"
      v-model="(modelValue as string)"
      :options="options"
    />
    <FormRadioGroup
      v-else-if="node.component === 'form.input.radio-group'"
      v-model="(modelValue as string)"
      :options="options"
    />
    <FormCheckboxGroup
      v-else-if="node.component === 'form.input.checkbox-group'"
      v-model="(modelValue as string[])"
      :options="options"
    />
    <FormCheckbox
      v-else-if="node.component === 'form.input.checkbox'"
      v-model="(modelValue as boolean)"
      :label="label"
    />
  </UFormField>
</template>
