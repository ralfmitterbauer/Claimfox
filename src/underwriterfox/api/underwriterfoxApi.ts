import type {
  AiRecommendation,
  CaseDocument,
  RatingSnapshot,
  RuleHit,
  TimelineEvent,
  UnderwritingCase,
  UnderwriterfoxTenantContext
} from '@/underwriterfox/types'
import { ensureSeeded, seedAllTenants } from '@/underwriterfox/demo/seedDemoData'

const KEY_PREFIX = 'underwriterfox'

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

function addTimelineEventInternal(ctx: UnderwriterfoxTenantContext, event: Omit<TimelineEvent, 'id' | 'tenantId' | 'createdAt'>) {
  const list = readList<TimelineEvent>(ctx.tenantId, 'timeline')
  const entry: TimelineEvent = {
    id: makeId('tl'),
    tenantId: ctx.tenantId,
    createdAt: nowIso(),
    ...event
  }
  list.unshift(entry)
  writeList(ctx.tenantId, 'timeline', list)
  return entry
}

export function seedUnderwriterfoxTenants() {
  seedAllTenants()
}

export async function listCases(ctx: UnderwriterfoxTenantContext) {
  ensureSeeded(ctx.tenantId)
  return readList<UnderwritingCase>(ctx.tenantId, 'cases')
}

export async function getCase(ctx: UnderwriterfoxTenantContext, caseId: string) {
  ensureSeeded(ctx.tenantId)
  const list = readList<UnderwritingCase>(ctx.tenantId, 'cases')
  return list.find((item) => item.id === caseId) ?? null
}

export async function updateCaseStatus(ctx: UnderwriterfoxTenantContext, caseId: string, status: UnderwritingCase['status'], rationale?: string) {
  ensureSeeded(ctx.tenantId)
  const list = readList<UnderwritingCase>(ctx.tenantId, 'cases')
  const idx = list.findIndex((item) => item.id === caseId)
  if (idx === -1) return null
  list[idx] = { ...list[idx], status }
  writeList(ctx.tenantId, 'cases', list)
  addTimelineEventInternal(ctx, {
    entityType: 'case',
    entityId: caseId,
    type: 'statusUpdate',
    title: 'Case status updated',
    message: rationale ? `${status} — ${rationale}` : `Status changed to ${status}.`,
    actor: ctx.userId
  })
  return list[idx]
}

export async function listDocuments(ctx: UnderwriterfoxTenantContext) {
  ensureSeeded(ctx.tenantId)
  return readList<CaseDocument>(ctx.tenantId, 'documents')
}

export async function listDocumentsByCase(ctx: UnderwriterfoxTenantContext, caseId: string) {
  const docs = await listDocuments(ctx)
  return docs.filter((doc) => doc.caseId === caseId)
}

export async function addDocument(ctx: UnderwriterfoxTenantContext, doc: Omit<CaseDocument, 'id' | 'tenantId' | 'uploadedAt'>) {
  ensureSeeded(ctx.tenantId)
  const docs = readList<CaseDocument>(ctx.tenantId, 'documents')
  const entry: CaseDocument = {
    id: makeId('doc'),
    tenantId: ctx.tenantId,
    uploadedAt: nowIso(),
    ...doc
  }
  docs.unshift(entry)
  writeList(ctx.tenantId, 'documents', docs)
  addTimelineEventInternal(ctx, {
    entityType: 'document',
    entityId: entry.id,
    type: 'system',
    title: 'Document uploaded',
    message: `${entry.name} uploaded and queued for extraction.`,
    actor: ctx.userId
  })
  return entry
}

export async function listTimeline(ctx: UnderwriterfoxTenantContext) {
  ensureSeeded(ctx.tenantId)
  return readList<TimelineEvent>(ctx.tenantId, 'timeline')
}

export async function addTimelineEvent(ctx: UnderwriterfoxTenantContext, event: Omit<TimelineEvent, 'id' | 'tenantId' | 'createdAt'>) {
  ensureSeeded(ctx.tenantId)
  return addTimelineEventInternal(ctx, event)
}

export async function saveRuleEvaluation(ctx: UnderwriterfoxTenantContext, caseId: string, hits: RuleHit[]) {
  ensureSeeded(ctx.tenantId)
  addTimelineEventInternal(ctx, {
    entityType: 'rule',
    entityId: caseId,
    type: 'system',
    title: 'Rules evaluation saved',
    message: `${hits.filter((hit) => hit.outcome !== 'pass').length} findings logged.`,
    actor: ctx.userId
  })
  return hits
}

export async function saveRatingSnapshot(ctx: UnderwriterfoxTenantContext, caseId: string, snapshot: RatingSnapshot) {
  ensureSeeded(ctx.tenantId)
  addTimelineEventInternal(ctx, {
    entityType: 'rating',
    entityId: caseId,
    type: 'system',
    title: 'Rating snapshot saved',
    message: `Version ${snapshot.version} saved with technical premium €${snapshot.outputs.technicalPremium}.`,
    actor: ctx.userId
  })
  return snapshot
}

export async function saveAiRecommendation(ctx: UnderwriterfoxTenantContext, caseId: string, recommendation: AiRecommendation) {
  ensureSeeded(ctx.tenantId)
  addTimelineEventInternal(ctx, {
    entityType: 'case',
    entityId: caseId,
    type: 'system',
    title: 'AI recommendation generated',
    message: `Recommendation ${recommendation.recommendedDecision} with confidence ${recommendation.confidence}.`,
    actor: ctx.userId
  })
  return recommendation
}
