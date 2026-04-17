export interface Professional {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  category: 'health' | 'admin' | 'other'
  subType: string
  specialty: string | null
  active: boolean
}
