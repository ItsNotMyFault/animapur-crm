export interface EmergencyContact {
  name: string
  relationship: string
  phone: string
}

export interface MedicalProfile {
  primaryDiagnosis: string | null
  icd10Code: string | null
  secondaryConditions: string | null
  medications: string | null
  allergies: string | null
  surgicalHistory: string | null
  contraindications: string | null
  painBaseline: number | null
  functionalGoals: string | null
  physicianNotes: string | null
}

export interface ClientNote {
  id: string
  author: string
  note: string
  flagged: boolean
  createdAt: string
}

export interface ClientSession {
  date: string
  type: string
  duration: number
  professional: string
}

export interface Client {
  id: string
  firstName: string
  lastName: string
  dateOfBirth: string | null
  gender: 'male' | 'female' | 'other' | null
  phone: string
  email: string
  preferredContact: 'phone' | 'email' | 'sms'
  address: string
  profilePhotoUrl: string | null
  intakeDate: string
  referringPhysician: string | null
  referringClinic: string | null
  preferredPressure: 'light' | 'medium' | 'firm'
  emergencyContact: EmergencyContact | null
  medicalProfile: MedicalProfile
  notes: ClientNote[]
  sessions: ClientSession[]
}

export type ClientCreate = Omit<Client, 'id' | 'notes' | 'sessions'>
export type ClientUpdate = Partial<ClientCreate>
