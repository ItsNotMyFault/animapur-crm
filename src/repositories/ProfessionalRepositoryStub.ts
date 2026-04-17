import type { Professional } from '@/types'
import type { ProfessionalRepository } from './ProfessionalRepository'
import professionalsData from '@/data/professionals.json'

export class ProfessionalRepositoryStub implements ProfessionalRepository {
  private data: Professional[] = professionalsData as unknown as Professional[]

  async get(id: string): Promise<Professional> {
    const found = this.data.find((p) => p.id === id)
    if (!found) throw new Error(`Professional ${id} not found`)
    return found
  }

  async list(): Promise<Professional[]> {
    return [...this.data]
  }
}
