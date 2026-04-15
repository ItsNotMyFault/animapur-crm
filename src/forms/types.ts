// Simplified, static, unversioned form schema — modelled after
// nuclemize-erp's FormUiSchema / DATA_SCHEMA triad but collapsed to a single
// paired FormSchema (ui + dataSchema share context + name).

export type FormComponentId =
  // Layout
  | 'layout.section'
  | 'layout.grid'
  | 'layout.fieldset'
  // Content
  | 'content.heading'
  | 'content.text'
  | 'content.divider'
  | 'content.image'
  // Fields
  | 'form.input.text'
  | 'form.input.number'
  | 'form.input.textarea'
  | 'form.input.date'
  | 'form.input.select'
  | 'form.input.radio-group'
  | 'form.input.checkbox-group'
  | 'form.input.checkbox'
  // Actions
  | 'form.button.submit'

export interface FieldBinding {
  path: string
}

export interface FormUiNode {
  id: string
  component: FormComponentId
  field?: FieldBinding
  props?: Record<string, unknown>
  children?: FormUiNode[]
}

export interface FormUiSchema {
  builderType: 'form'
  component: 'form.layout.root'
  children: FormUiNode[]
}

// Minimal JSON-Schema-like shape. Only the fields we actually use at runtime.
export interface DataSchemaProperty {
  type: 'string' | 'number' | 'integer' | 'boolean' | 'array' | 'object'
  title?: string
  description?: string
  enum?: Array<string | number>
  items?: DataSchemaProperty
  properties?: Record<string, DataSchemaProperty>
  required?: string[]
  minimum?: number
  maximum?: number
  minLength?: number
  maxLength?: number
  format?: 'date' | 'date-time' | 'email'
}

export interface DataSchema {
  $schema?: string
  type: 'object'
  properties: Record<string, DataSchemaProperty>
  required?: string[]
}

export interface FormSchema {
  context: string
  name: string
  label: string
  description?: string
  audience: 'client' | 'employee'
  ui: FormUiSchema
  dataSchema: DataSchema
}
