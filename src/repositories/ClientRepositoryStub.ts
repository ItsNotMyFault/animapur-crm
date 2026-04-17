import type { Client, ClientCreate, ClientUpdate } from '@/types'
import type { ListParams, ListResult } from './types'
import type { ClientRepository } from './ClientRepository'
import clientsData from '@/data/clients.json'

export class ClientRepositoryStub implements ClientRepository {
  private data: Client[] = clientsData as unknown as Client[]

  async get(id: string): Promise<Client> {
    const found = this.data.find((c) => c.id === id)
    if (!found) throw new Error(`Client ${id} not found`)
    return found
  }

  async list(params?: ListParams): Promise<ListResult<Client>> {
    let filtered = [...this.data]
    if (params?.search) {
      const q = params.search.toLowerCase()
      filtered = filtered.filter((c) =>
        `${c.firstName} ${c.lastName}`.toLowerCase().includes(q),
      )
    }
    const page = params?.page ?? 0
    const limit = params?.limit ?? 50
    return {
      data: filtered.slice(page * limit, (page + 1) * limit),
      total: filtered.length,
      page,
      limit,
    }
  }

  async create(data: ClientCreate): Promise<Client> {
    const newClient: Client = {
      ...data,
      id: String(this.data.length + 1),
      notes: [],
      sessions: [],
    }
    this.data.push(newClient)
    return newClient
  }

  async update(id: string, data: ClientUpdate): Promise<Client> {
    const idx = this.data.findIndex((c) => c.id === id)
    if (idx === -1) throw new Error(`Client ${id} not found`)
    this.data[idx] = { ...this.data[idx]!, ...data } as Client
    return this.data[idx]!
  }

  async delete(id: string): Promise<void> {
    const idx = this.data.findIndex((c) => c.id === id)
    if (idx === -1) throw new Error(`Client ${id} not found`)
    this.data.splice(idx, 1)
  }
}
