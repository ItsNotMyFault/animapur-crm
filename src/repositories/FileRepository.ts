import type { ClientFile } from '@/types'

export interface FileRepository {
  get(id: string): Promise<ClientFile>
  getByClientId(clientId: string): Promise<ClientFile[]>
}
