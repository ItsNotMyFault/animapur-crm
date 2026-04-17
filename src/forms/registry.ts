import type { FormSchema } from './types'
import { sessionNoteForm } from './schemas/session-note'
import { clientIntakeForm } from './schemas/client-intake'
import { horseRegionsForm } from './schemas/horse-regions'
import { horseAnatomyForm } from './schemas/horse-anatomy'
import { horseAnatomyLabeledForm } from './schemas/horse-anatomy-labeled'

export const formRegistry: FormSchema[] = [
  sessionNoteForm,
  clientIntakeForm,
  horseRegionsForm,
  horseAnatomyForm,
  horseAnatomyLabeledForm,
]

export function getFormByName(name: string): FormSchema | undefined {
  return formRegistry.find((f) => f.name === name)
}
