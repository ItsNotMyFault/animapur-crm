import type { ClientFile } from '@/types'
import type { FileRepository } from './FileRepository'
import filesData from '@/data/files.json'

export class FileRepositoryStub implements FileRepository {
  private data: ClientFile[] = filesData as unknown as ClientFile[]

  async get(id: string): Promise<ClientFile> {
    const found = this.data.find((f) => f.id === id)
    if (!found) throw new Error(`File ${id} not found`)
    return found
  }

  async getByClientId(clientId: string): Promise<ClientFile[]> {
    return this.data.filter((f) => f.clientId === clientId)
  }
}
