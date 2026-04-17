import type { Client, ClientCreate, ClientUpdate } from '@/types'
import type { ListParams, ListResult } from './types'

export interface ClientRepository {
  get(id: string): Promise<Client>
  list(params?: ListParams): Promise<ListResult<Client>>
  create(data: ClientCreate): Promise<Client>
  update(id: string, data: ClientUpdate): Promise<Client>
  delete(id: string): Promise<void>
}
