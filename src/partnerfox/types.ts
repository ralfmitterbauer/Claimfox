export type PartnerType = 'workshop' | 'rental' | 'towing' | 'glass' | 'assistance'

export type Partner = {
  id: string
  tenantId: string
  name: string
  type: PartnerType
  certification: 'DEKRA' | 'OEM' | 'Independent'
  rating: number
  avgRepairDays: number
  directBillingEnabled: boolean
  networkRegion: string
  performanceScore: number
  casesHandled: number
  contactEmail: string
}

export type PartnerCaseStatus = 'FNOL' | 'InRepair' | 'WaitingParts' | 'RentalActive' | 'Closed'

export type PartnerCase = {
  id: string
  tenantId: string
  claimNumber: string
  vehiclePlate: string
  status: PartnerCaseStatus
  partnerId: string
  rentalPartnerId?: string
  towingPartnerId?: string
  estimatedCost: number
  aiApproved: boolean
  repairDurationDays: number
  customerTrackingLink: string
  subrogationCandidate: boolean
  damageSummary: string
}

export type SubrogationStatus = 'Open' | 'Negotiation' | 'Recovered' | 'Lost'

export type Subrogation = {
  id: string
  tenantId: string
  caseId: string
  liableParty: string
  claimAmount: number
  recoveryProbability: number
  status: SubrogationStatus
  evidenceSummary: string
}

export type CalendarEvent = {
  id: string
  tenantId: string
  title: string
  date: string
  location?: string
  entityType?: 'partner' | 'case' | 'subrogation' | 'rental' | 'assistance'
  entityId?: string
  description?: string
}

export type TimelineEvent = {
  id: string
  tenantId: string
  entityType: 'partner' | 'case' | 'subrogation' | 'system'
  entityId: string
  type: 'system' | 'note' | 'external' | 'status'
  title: string
  message: string
  createdAt: string
  meta?: Record<string, string>
}

export type AIRepairCheckResult = {
  plausibilityScore: number
  confidence: number
  recommendation: 'approve' | 'manual-review'
  anomalies: string[]
  evidenceRefs: string[]
}
