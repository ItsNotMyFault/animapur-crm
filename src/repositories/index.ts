import type { ClientRepository } from './ClientRepository'
import type { FileRepository } from './FileRepository'
import type { ProfessionalRepository } from './ProfessionalRepository'
import { ClientRepositoryStub } from './ClientRepositoryStub'
import { FileRepositoryStub } from './FileRepositoryStub'
import { ProfessionalRepositoryStub } from './ProfessionalRepositoryStub'

export const clientRepo: ClientRepository = new ClientRepositoryStub()
export const fileRepo: FileRepository = new FileRepositoryStub()
export const professionalRepo: ProfessionalRepository = new ProfessionalRepositoryStub()

export type { ClientRepository } from './ClientRepository'
export type { FileRepository } from './FileRepository'
export type { ProfessionalRepository } from './ProfessionalRepository'
export type { ListParams, ListResult } from './types'
