import type { FormSchema } from './types'
import { sessionNoteForm } from './schemas/session-note'
import { clientIntakeForm } from './schemas/client-intake'

export const formRegistry: FormSchema[] = [sessionNoteForm, clientIntakeForm]

export function getFormByName(name: string): FormSchema | undefined {
  return formRegistry.find((f) => f.name === name)
}
