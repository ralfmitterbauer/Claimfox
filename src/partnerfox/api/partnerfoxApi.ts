import type { TenantContext } from '@/brokerfox/types'
import { ensureSeeded, seedAllTenants } from '@/partnerfox/demo/seedDemoData'
import type { CalendarEvent, Partner, PartnerCase, Subrogation, TimelineEvent } from '@/partnerfox/types'

const KEY_PREFIX = 'partnerfox'

function key(tenantId: string, entity: string) {
  return `${KEY_PREFIX}:${tenantId}:${entity}`
}

function isBrowser() {
  return typeof window !== 'undefined'
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

function makeId(prefix: string) {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`
}

export function ensurePartnerfoxSeed(ctx: TenantContext) {
  ensureSeeded(ctx.tenantId)
}

export function seedPartnerfoxTenants() {
  seedAllTenants()
}

export async function listPartners(ctx: TenantContext) {
  ensurePartnerfoxSeed(ctx)
  return readList<Partner>(ctx.tenantId, 'partners')
}

export async function getPartner(ctx: TenantContext, partnerId: string) {
  ensurePartnerfoxSeed(ctx)
  return readList<Partner>(ctx.tenantId, 'partners').find((item) => item.id === partnerId) ?? null
}

export async function listCases(ctx: TenantContext) {
  ensurePartnerfoxSeed(ctx)
  return readList<PartnerCase>(ctx.tenantId, 'cases')
}

export async function getCase(ctx: TenantContext, caseId: string) {
  ensurePartnerfoxSeed(ctx)
  return readList<PartnerCase>(ctx.tenantId, 'cases').find((item) => item.id === caseId) ?? null
}

export async function listSubrogation(ctx: TenantContext) {
  ensurePartnerfoxSeed(ctx)
  return readList<Subrogation>(ctx.tenantId, 'subrogation')
}

export async function listCalendarEvents(ctx: TenantContext) {
  ensurePartnerfoxSeed(ctx)
  return readList<CalendarEvent>(ctx.tenantId, 'calendar')
}

export async function listTimelineEvents(ctx: TenantContext, entityType?: TimelineEvent['entityType'], entityId?: string) {
  ensurePartnerfoxSeed(ctx)
  return readList<TimelineEvent>(ctx.tenantId, 'timeline').filter((event) => {
    if (entityType && event.entityType !== entityType) return false
    if (entityId && event.entityId !== entityId) return false
    return true
  })
}

export async function addTimelineEvent(ctx: TenantContext, event: Omit<TimelineEvent, 'id' | 'tenantId' | 'createdAt'>) {
  ensurePartnerfoxSeed(ctx)
  const list = readList<TimelineEvent>(ctx.tenantId, 'timeline')
  const next: TimelineEvent = {
    id: makeId('timeline'),
    tenantId: ctx.tenantId,
    createdAt: new Date().toISOString(),
    ...event
  }
  list.unshift(next)
  writeList(ctx.tenantId, 'timeline', list)
  return next
}

export async function enableDirectBilling(ctx: TenantContext, caseId: string) {
  ensurePartnerfoxSeed(ctx)
  const cases = readList<PartnerCase>(ctx.tenantId, 'cases')
  const item = cases.find((row) => row.id === caseId)
  if (!item) return null
  item.aiApproved = true
  writeList(ctx.tenantId, 'cases', cases)
  await addTimelineEvent(ctx, {
    entityType: 'case',
    entityId: caseId,
    type: 'status',
    title: 'Direct billing enabled',
    message: `Direct billing enabled for ${item.claimNumber}. Abtretung flow activated.`,
    meta: { actor: ctx.userId }
  })
  return item
}

export async function assignRental(ctx: TenantContext, caseId: string, rentalPartnerId: string) {
  ensurePartnerfoxSeed(ctx)
  const cases = readList<PartnerCase>(ctx.tenantId, 'cases')
  const item = cases.find((row) => row.id === caseId)
  if (!item) return null
  item.rentalPartnerId = rentalPartnerId
  item.status = 'RentalActive'
  writeList(ctx.tenantId, 'cases', cases)
  await addTimelineEvent(ctx, {
    entityType: 'case',
    entityId: caseId,
    type: 'status',
    title: 'Rental partner assigned',
    message: `Rental assignment set for ${item.claimNumber}.`,
    meta: { actor: ctx.userId }
  })
  return item
}

export async function markSubrogationCandidate(ctx: TenantContext, caseId: string) {
  ensurePartnerfoxSeed(ctx)
  const cases = readList<PartnerCase>(ctx.tenantId, 'cases')
  const item = cases.find((row) => row.id === caseId)
  if (!item) return null
  item.subrogationCandidate = true
  writeList(ctx.tenantId, 'cases', cases)
  await addTimelineEvent(ctx, {
    entityType: 'case',
    entityId: caseId,
    type: 'note',
    title: 'Subrogation candidate marked',
    message: `Case ${item.claimNumber} moved to subrogation candidate queue.`,
    meta: { actor: ctx.userId }
  })
  return item
}
