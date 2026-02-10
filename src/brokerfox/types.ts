export type TenantContext = {
  tenantId: string
  userId: string
  roles: string[]
  mode?: 'full' | 'insurance-only'
}

export type PartyRole = 'client' | 'broker' | 'carrier' | 'partner'

export type Party = {
  id: string
  name: string
  role: PartyRole
  email?: string
}

export type Contact = {
  id: string
  tenantId: string
  clientId: string
  name: string
  email: string
  phone?: string
  role?: string
}

export type Client = {
  id: string
  tenantId: string
  name: string
  segment?: string
  industry?: string
  revenue?: string
  employees?: number
  locationsCount?: number
  address?: string
  lossHistory?: LossHistoryEntry[]
  ownerId: string
  createdAt: string
  updatedAt: string
  contacts: Contact[]
  isHero?: boolean
}

export type CoverageRequest = {
  id: string
  label: string
  limit: string
  deductible?: string
  notes?: string
}

export type TenderStatus = 'draft' | 'sent' | 'offersReceived' | 'negotiation' | 'won' | 'lost'

export type Tender = {
  id: string
  tenantId: string
  clientId: string
  title: string
  description?: string
  status: TenderStatus
  dueDate?: string
  coverageRequests: CoverageRequest[]
  attachments: DocumentMeta[]
  invitedCarriers: Party[]
  createdAt: string
  updatedAt: string
  isHero?: boolean
}

export type OfferLine = {
  id: string
  coverage: string
  limit: string
  exclusion: string
  premium: string
}

export type Offer = {
  id: string
  tenantId: string
  tenderId: string
  carrier: Party
  status: 'draft' | 'received' | 'compared' | 'sent'
  lines: OfferLine[]
  conditions?: string[]
  exclusions?: string[]
  premiumTotal?: string
  createdAt: string
  updatedAt: string
}

export type RenewalItem = {
  id: string
  tenantId: string
  clientId: string
  policyName: string
  carrier: string
  renewalDate: string
  premium: string
  status: 'upcoming' | 'inReview' | 'quoted' | 'renewed'
}

export type DocumentMeta = {
  id: string
  tenantId: string
  name: string
  type: string
  size: number
  uploadedAt: string
  uploadedBy: string
  entityType?: EntityType
  entityId?: string
  url?: string
  source?: 'demo' | 'upload'
}

export type IntegrationStatus = 'connected' | 'notConnected'

export type IntegrationItem = {
  id: string
  tenantId: string
  name: string
  status: IntegrationStatus
  description: string
  updatedAt: string
}

export type TaskStatus = 'todo' | 'inProgress' | 'done'

export type TaskItem = {
  id: string
  tenantId: string
  title: string
  description?: string
  status: TaskStatus
  linkedEntityType?: EntityType
  linkedEntityId?: string
  dueDate?: string
  ownerName?: string
  assigneeId?: string
  createdAt: string
  updatedAt: string
}

export type EntityType = 'client' | 'tender' | 'offer' | 'renewal' | 'task' | 'document' | 'integration' | 'contract'

export type TimelineEventType =
  | 'externalMessage'
  | 'internalNote'
  | 'statusUpdate'
  | 'documentUploaded'
  | 'documentAssigned'
  | 'extractionSuggested'
  | 'extractionApplied'
  | 'signatureRequested'
  | 'signatureSigned'
  | 'commissionReminderSent'
  | 'integrationSync'
  | 'taskDelegated'

export type TimelineEvent = {
  id: string
  tenantId: string
  actorId: string
  createdAt: string
  timestamp: string
  entityType: EntityType
  entityId: string
  type: TimelineEventType
  title?: string
  message: string
  attachments?: DocumentMeta[]
}

export type Thread = {
  entityType: EntityType
  entityId: string
  participants: Party[]
  events: TimelineEvent[]
}

export type Message = {
  id: string
  sender: Party
  timestamp: string
  content: string
  type: TimelineEventType
  attachments?: DocumentMeta[]
}

export type ComparisonResult = {
  summary: string
  highlights: string[]
  risks: string[]
}

export type LossHistoryEntry = {
  year: number
  count: number
  paid: string
  reserved: string
}

export type CalendarEvent = {
  id: string
  tenantId: string
  title: string
  date: string
  entityType?: EntityType
  entityId?: string
  description?: string
}

export type MailboxItemStatus = 'unassigned' | 'assigned' | 'done'

export type MailboxItem = {
  id: string
  tenantId: string
  sender: string
  subject: string
  receivedAt: string
  attachments: DocumentMeta[]
  extractedEntities?: Array<{ type: EntityType; label: string }>
  status: MailboxItemStatus
  entityType?: EntityType
  entityId?: string
  body?: string
}

export type ContractStatus = 'active' | 'pending' | 'cancelled'

export type Contract = {
  id: string
  tenantId: string
  clientId: string
  carrierName: string
  lob: string
  policyNumber: string
  status: ContractStatus
  startDate: string
  endDate: string
  premiumEUR: number
  renewalDueDate?: string
  isHero?: boolean
}

export type CommissionStatus = 'expected' | 'partial' | 'paid' | 'overdue'

export type Commission = {
  id: string
  tenantId: string
  contractId: string
  period: string
  expectedEUR: number
  paidEUR: number
  outstandingEUR: number
  dueDate: string
  status: CommissionStatus
}

export type SignatureStatus = 'DRAFT' | 'SENT' | 'SIGNED'

export type SignatureRequest = {
  id: string
  tenantId: string
  documentId: string
  status: SignatureStatus
  recipientName: string
  recipientEmail: string
  createdAt: string
  updatedAt: string
}

export type Extraction = {
  documentId: string
  tenantId: string
  extractedFields: Record<string, string>
  suggestedClientId?: string
  suggestedContractId?: string
  confidence: number
}
