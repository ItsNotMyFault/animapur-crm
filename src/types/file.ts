export interface ClientFile {
  id: string
  clientId: string
  formName: string
  label: string
  createdAt: string
  payload: Record<string, unknown>
}
