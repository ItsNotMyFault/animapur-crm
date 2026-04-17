import type { Professional } from '@/types'

export interface ProfessionalRepository {
  get(id: string): Promise<Professional>
  list(): Promise<Professional[]>
}
