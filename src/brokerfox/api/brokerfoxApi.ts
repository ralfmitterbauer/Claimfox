import type {
  CalendarEvent,
  Client,
  ComparisonResult,
  CoverageRequest,
  DocumentMeta,
  EntityType,
  IntegrationItem,
  IntegrationStatus,
  MailboxItem,
  Offer,
  OfferLine,
  RenewalItem,
  TaskItem,
  TaskStatus,
  TenantContext,
  Tender,
  TenderStatus,
  TimelineEvent
} from '@/brokerfox/types'
import { seedAllTenants, seedDemoData } from '@/brokerfox/demo/seedDemoData'
import { demoTenants } from '@/brokerfox/demo/demoCatalog'

const KEY_PREFIX = 'brokerfox'

function key(tenantId: string, entity: string) {
  return `${KEY_PREFIX}:${tenantId}:${entity}`
}

function isBrowser() {
  return typeof window !== 'undefined'
}

function nowIso() {
  return new Date().toISOString()
}

function makeId(prefix: string) {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`
}

function readList<T>(tenantId: string, entity: string): T[] {
  if (!isBrowser()) return []
  const raw = window.localStorage.getItem(key(tenantId, entity))
  if (!raw) return []
  try {
    return JSON.parse(raw) as T[]
  } catch {
    return []
  }
}

function writeList<T>(tenantId: string, entity: string, value: T[]) {
  if (!isBrowser()) return
  window.localStorage.setItem(key(tenantId, entity), JSON.stringify(value))
}

function readValue<T>(tenantId: string, entity: string): T | null {
  if (!isBrowser()) return null
  const raw = window.localStorage.getItem(key(tenantId, entity))
  if (!raw) return null
  try {
    return JSON.parse(raw) as T
  } catch {
    return null
  }
}

function writeValue<T>(tenantId: string, entity: string, value: T) {
  if (!isBrowser()) return
  window.localStorage.setItem(key(tenantId, entity), JSON.stringify(value))
}

export function ensureSeeded(tenantId: string) {
  if (!isBrowser()) return
  const flagKey = key(tenantId, 'seeded')
  if (window.localStorage.getItem(flagKey) === 'true') {
    return
  }

  const seed = seedDemoData(tenantId)
  writeList(tenantId, 'clients', seed.clients)
  writeList(tenantId, 'tenders', seed.tenders)
  writeList(tenantId, 'offers', seed.offers)
  writeList(tenantId, 'renewals', seed.renewals)
  writeList(tenantId, 'documents', seed.documents)
  writeList(tenantId, 'tasks', seed.tasks)
  writeList(tenantId, 'integrations', seed.integrations)
  writeList(tenantId, 'calendar', seed.calendarEvents)
  writeList(tenantId, 'mailbox', seed.mailboxItems)
  writeList(tenantId, 'timeline', seed.timeline)
  writeValue(tenantId, 'hero', seed.hero)
  window.localStorage.setItem(flagKey, 'true')
}

export function seedAllTenantsIfEmpty() {
  if (!isBrowser()) return
  seedAllTenants()
  demoTenants.forEach((tenant) => ensureSeeded(tenant.id))
}

export function resetDemoData(tenantId: string) {
  if (!isBrowser()) return
  const keys = ['clients', 'tenders', 'offers', 'renewals', 'documents', 'tasks', 'integrations', 'calendar', 'mailbox', 'timeline', 'hero', 'seeded']
  keys.forEach((entity) => window.localStorage.removeItem(key(tenantId, entity)))
  ensureSeeded(tenantId)
}

export function getHeroIds(tenantId: string) {
  ensureSeeded(tenantId)
  return readValue<{ clientId: string; tenderId: string }>(tenantId, 'hero')
}

function addTimelineEventInternal(tenantId: string, ctx: TenantContext, event: Omit<TimelineEvent, 'id' | 'tenantId' | 'actorId' | 'timestamp' | 'createdAt'>) {
  const timeline = readList<TimelineEvent>(tenantId, 'timeline')
  const timestamp = nowIso()
  const entry: TimelineEvent = {
    id: makeId('event'),
    tenantId: ctx.tenantId,
    actorId: ctx.userId,
    createdAt: timestamp,
    timestamp,
    ...event
  }
  timeline.unshift(entry)
  writeList(tenantId, 'timeline', timeline)
  return entry
}

export async function listClients(ctx: TenantContext) {
  ensureSeeded(ctx.tenantId)
  return readList<Client>(ctx.tenantId, 'clients')
}

export async function getClient(ctx: TenantContext, clientId: string) {
  ensureSeeded(ctx.tenantId)
  const list = readList<Client>(ctx.tenantId, 'clients')
  return list.find((client) => client.id === clientId) || null
}

export async function createClient(ctx: TenantContext, input: { name: string; segment?: string; industry?: string }) {
  ensureSeeded(ctx.tenantId)
  const clients = readList<Client>(ctx.tenantId, 'clients')
  const createdAt = nowIso()
  const client: Client = {
    id: makeId('client'),
    tenantId: ctx.tenantId,
    name: input.name,
    segment: input.segment,
    industry: input.industry,
    ownerId: ctx.userId,
    createdAt,
    updatedAt: createdAt,
    contacts: []
  }
  clients.unshift(client)
  writeList(ctx.tenantId, 'clients', clients)
  addTimelineEventInternal(ctx.tenantId, ctx, {
    entityType: 'client',
    entityId: client.id,
    type: 'system',
    title: 'Client created',
    message: `Client ${client.name} created.`
  })
  return client
}

export async function updateClient(ctx: TenantContext, clientId: string, update: Partial<Client>) {
  ensureSeeded(ctx.tenantId)
  const clients = readList<Client>(ctx.tenantId, 'clients')
  const idx = clients.findIndex((client) => client.id === clientId)
  if (idx === -1) {
    return null
  }
  const next: Client = {
    ...clients[idx],
    ...update,
    updatedAt: nowIso()
  }
  clients[idx] = next
  writeList(ctx.tenantId, 'clients', clients)
  addTimelineEventInternal(ctx.tenantId, ctx, {
    entityType: 'client',
    entityId: clientId,
    type: 'statusUpdate',
    title: 'Client updated',
    message: 'Client information updated.'
  })
  return next
}

export async function listTenders(ctx: TenantContext) {
  ensureSeeded(ctx.tenantId)
  return readList<Tender>(ctx.tenantId, 'tenders')
}

export async function getTender(ctx: TenantContext, tenderId: string) {
  ensureSeeded(ctx.tenantId)
  const list = readList<Tender>(ctx.tenantId, 'tenders')
  return list.find((tender) => tender.id === tenderId) || null
}

export async function createTender(ctx: TenantContext, input: {
  clientId: string
  title: string
  description?: string
  status?: TenderStatus
}) {
  ensureSeeded(ctx.tenantId)
  const tenders = readList<Tender>(ctx.tenantId, 'tenders')
  const createdAt = nowIso()
  const tender: Tender = {
    id: makeId('tender'),
    tenantId: ctx.tenantId,
    clientId: input.clientId,
    title: input.title,
    description: input.description,
    status: input.status ?? 'draft',
    coverageRequests: [],
    attachments: [],
    invitedCarriers: [],
    createdAt,
    updatedAt: createdAt
  }
  tenders.unshift(tender)
  writeList(ctx.tenantId, 'tenders', tenders)
  addTimelineEventInternal(ctx.tenantId, ctx, {
    entityType: 'tender',
    entityId: tender.id,
    type: 'system',
    title: 'Tender created',
    message: `Tender ${tender.title} created.`
  })
  return tender
}

export async function updateTender(ctx: TenantContext, tenderId: string, update: Partial<Tender>) {
  ensureSeeded(ctx.tenantId)
  const tenders = readList<Tender>(ctx.tenantId, 'tenders')
  const idx = tenders.findIndex((tender) => tender.id === tenderId)
  if (idx === -1) {
    return null
  }
  const next = { ...tenders[idx], ...update, updatedAt: nowIso() }
  tenders[idx] = next
  writeList(ctx.tenantId, 'tenders', tenders)
  addTimelineEventInternal(ctx.tenantId, ctx, {
    entityType: 'tender',
    entityId: tenderId,
    type: 'statusUpdate',
    title: 'Tender updated',
    message: `Tender updated to status ${next.status}.`
  })
  return next
}

export async function listOffers(ctx: TenantContext) {
  ensureSeeded(ctx.tenantId)
  return readList<Offer>(ctx.tenantId, 'offers')
}

export async function addOffer(ctx: TenantContext, tenderId: string, carrierName: string, lines: OfferLine[]) {
  ensureSeeded(ctx.tenantId)
  const offers = readList<Offer>(ctx.tenantId, 'offers')
  const createdAt = nowIso()
  const offer: Offer = {
    id: makeId('offer'),
    tenantId: ctx.tenantId,
    tenderId,
    carrier: { id: makeId('party'), name: carrierName, role: 'carrier' },
    status: 'received',
    lines,
    createdAt,
    updatedAt: createdAt
  }
  offers.unshift(offer)
  writeList(ctx.tenantId, 'offers', offers)
  addTimelineEventInternal(ctx.tenantId, ctx, {
    entityType: 'offer',
    entityId: offer.id,
    type: 'system',
    title: 'Offer received',
    message: `Offer from ${carrierName} received.`
  })
  return offer
}

export async function listRenewals(ctx: TenantContext) {
  ensureSeeded(ctx.tenantId)
  return readList<RenewalItem>(ctx.tenantId, 'renewals')
}

export async function listDocuments(ctx: TenantContext) {
  ensureSeeded(ctx.tenantId)
  return readList<DocumentMeta>(ctx.tenantId, 'documents')
}

export async function listMailboxItems(ctx: TenantContext) {
  ensureSeeded(ctx.tenantId)
  return readList<MailboxItem>(ctx.tenantId, 'mailbox')
}

export async function updateMailboxItem(ctx: TenantContext, itemId: string, update: Partial<MailboxItem>) {
  ensureSeeded(ctx.tenantId)
  const items = readList<MailboxItem>(ctx.tenantId, 'mailbox')
  const idx = items.findIndex((item) => item.id === itemId)
  if (idx === -1) return null
  items[idx] = { ...items[idx], ...update }
  writeList(ctx.tenantId, 'mailbox', items)
  return items[idx]
}

export async function uploadDocument(ctx: TenantContext, input: Omit<DocumentMeta, 'id' | 'tenantId' | 'uploadedAt' | 'uploadedBy'>) {
  ensureSeeded(ctx.tenantId)
  const docs = readList<DocumentMeta>(ctx.tenantId, 'documents')
  const doc: DocumentMeta = {
    id: makeId('doc'),
    tenantId: ctx.tenantId,
    uploadedAt: nowIso(),
    uploadedBy: ctx.userId,
    source: input.source ?? 'upload',
    ...input
  }
  docs.unshift(doc)
  writeList(ctx.tenantId, 'documents', docs)
  addTimelineEventInternal(ctx.tenantId, ctx, {
    entityType: input.entityType ?? 'document',
    entityId: input.entityId ?? doc.id,
    type: 'attachment',
    title: 'Document uploaded',
    message: `Document ${doc.name} uploaded.`,
    attachments: [doc]
  })
  return doc
}

export async function assignDocument(ctx: TenantContext, docId: string, entityType: EntityType, entityId: string) {
  ensureSeeded(ctx.tenantId)
  const docs = readList<DocumentMeta>(ctx.tenantId, 'documents')
  const idx = docs.findIndex((doc) => doc.id === docId)
  if (idx === -1) {
    return null
  }
  docs[idx] = {
    ...docs[idx],
    entityType,
    entityId
  }
  writeList(ctx.tenantId, 'documents', docs)
  addTimelineEventInternal(ctx.tenantId, ctx, {
    entityType,
    entityId,
    type: 'statusUpdate',
    title: 'Document linked',
    message: `Document linked to ${entityType}.`
  })
  return docs[idx]
}

export async function listTasks(ctx: TenantContext) {
  ensureSeeded(ctx.tenantId)
  return readList<TaskItem>(ctx.tenantId, 'tasks')
}

export async function listCalendarEvents(ctx: TenantContext) {
  ensureSeeded(ctx.tenantId)
  return readList<CalendarEvent>(ctx.tenantId, 'calendar')
}

export async function addCalendarEvent(ctx: TenantContext, event: Omit<CalendarEvent, 'id' | 'tenantId'>) {
  ensureSeeded(ctx.tenantId)
  const events = readList<CalendarEvent>(ctx.tenantId, 'calendar')
  const entry: CalendarEvent = { id: makeId('cal'), tenantId: ctx.tenantId, ...event }
  events.unshift(entry)
  writeList(ctx.tenantId, 'calendar', events)
  addTimelineEventInternal(ctx.tenantId, ctx, {
    entityType: event.entityType ?? 'document',
    entityId: event.entityId ?? entry.id,
    type: 'statusUpdate',
    title: 'Calendar event added',
    message: event.title
  })
  return entry
}

export async function createTask(ctx: TenantContext, input: Omit<TaskItem, 'id' | 'tenantId' | 'createdAt' | 'updatedAt'>) {
  ensureSeeded(ctx.tenantId)
  const tasks = readList<TaskItem>(ctx.tenantId, 'tasks')
  const createdAt = nowIso()
  const task: TaskItem = {
    id: makeId('task'),
    tenantId: ctx.tenantId,
    createdAt,
    updatedAt: createdAt,
    ...input
  }
  tasks.unshift(task)
  writeList(ctx.tenantId, 'tasks', tasks)
  addTimelineEventInternal(ctx.tenantId, ctx, {
    entityType: 'task',
    entityId: task.id,
    type: 'system',
    title: 'Task created',
    message: `Task ${task.title} created.`
  })
  if (task.linkedEntityType && task.linkedEntityId) {
    addTimelineEventInternal(ctx.tenantId, ctx, {
      entityType: task.linkedEntityType,
      entityId: task.linkedEntityId,
      type: 'statusUpdate',
      title: 'Task linked',
      message: `Task linked: ${task.title}.`
    })
  }
  return task
}

export async function updateTaskStatus(ctx: TenantContext, taskId: string, status: TaskStatus) {
  ensureSeeded(ctx.tenantId)
  const tasks = readList<TaskItem>(ctx.tenantId, 'tasks')
  const idx = tasks.findIndex((task) => task.id === taskId)
  if (idx === -1) {
    return null
  }
  const next = { ...tasks[idx], status, updatedAt: nowIso() }
  tasks[idx] = next
  writeList(ctx.tenantId, 'tasks', tasks)
  addTimelineEventInternal(ctx.tenantId, ctx, {
    entityType: 'task',
    entityId: taskId,
    type: 'statusUpdate',
    title: 'Task moved',
    message: `Task moved to ${status}.`
  })
  if (next.linkedEntityType && next.linkedEntityId) {
    addTimelineEventInternal(ctx.tenantId, ctx, {
      entityType: next.linkedEntityType,
      entityId: next.linkedEntityId,
      type: 'statusUpdate',
      title: 'Task updated',
      message: `Task status set to ${status}.`
    })
  }
  return next
}

export async function listIntegrations(ctx: TenantContext) {
  ensureSeeded(ctx.tenantId)
  return readList<IntegrationItem>(ctx.tenantId, 'integrations')
}

export async function updateIntegrationStatus(ctx: TenantContext, integrationId: string, status: IntegrationStatus) {
  ensureSeeded(ctx.tenantId)
  const items = readList<IntegrationItem>(ctx.tenantId, 'integrations')
  const idx = items.findIndex((item) => item.id === integrationId)
  if (idx === -1) {
    return null
  }
  items[idx] = { ...items[idx], status, updatedAt: nowIso() }
  writeList(ctx.tenantId, 'integrations', items)
  addTimelineEventInternal(ctx.tenantId, ctx, {
    entityType: 'integration',
    entityId: integrationId,
    type: 'statusUpdate',
    title: 'Integration updated',
    message: `Integration status set to ${status}.`
  })
  return items[idx]
}

export async function listTimelineEvents(ctx: TenantContext, entityType: EntityType, entityId: string) {
  ensureSeeded(ctx.tenantId)
  const timeline = readList<TimelineEvent>(ctx.tenantId, 'timeline')
  return timeline.filter((event) => event.entityType === entityType && event.entityId === entityId)
}

export async function listAllTimelineEvents(ctx: TenantContext) {
  ensureSeeded(ctx.tenantId)
  return readList<TimelineEvent>(ctx.tenantId, 'timeline')
}

export async function addTimelineEvent(ctx: TenantContext, event: Omit<TimelineEvent, 'id' | 'tenantId' | 'actorId' | 'timestamp' | 'createdAt'>) {
  ensureSeeded(ctx.tenantId)
  return addTimelineEventInternal(ctx.tenantId, ctx, event)
}

export async function aiStructureTender(input: { title: string; description?: string }) {
  return {
    suggestion: true,
    result: {
      objectives: ['Clarify coverage scope', 'Confirm claims history', 'Align carrier appetite'],
      requiredDocs: ['Loss runs', 'Fleet list', 'Risk questionnaire'],
      completeness: {
        title: Boolean(input.title),
        description: Boolean(input.description)
      }
    }
  }
}

export async function aiCompareOffers(offers: Offer[]): Promise<{ suggestion: true; result: ComparisonResult }> {
  const carriers = offers.map((offer) => offer.carrier.name).join(', ')
  return {
    suggestion: true,
    result: {
      summary: `Suggested comparison based on carriers: ${carriers}.`,
      highlights: ['Coverage limits differ between carriers.', 'Premium spread indicates negotiation room.'],
      risks: ['Exclusions may impact client needs.', 'Cyber limit lower in one offer.']
    }
  }
}

export async function aiGenerateClientSummary(context: { clientName: string; tenderTitle: string; comparison: ComparisonResult }) {
  return {
    suggestion: true,
    result: `Suggested summary for ${context.clientName}: We received multiple offers for ${context.tenderTitle}. The key differences are limits and exclusions; review the highlighted risks before selecting. This is an AI-generated suggestion and requires human approval.`
  }
}
