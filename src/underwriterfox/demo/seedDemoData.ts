import type { AiRecommendation, CaseDocument, RatingSnapshot, RuleHit, TimelineEvent, UnderwritingCase } from '@/underwriterfox/types'
import { aiBullets, brokers, extractedFieldKeys, insureds, productLines, ruleLibrary, segments, underwriterfoxTenants } from './demoCatalog'

const KEY_PREFIX = 'underwriterfox'

function key(tenantId: string, entity: string) {
  return `${KEY_PREFIX}:${tenantId}:${entity}`
}

function isBrowser() {
  return typeof window !== 'undefined'
}

function writeList<T>(tenantId: string, entity: string, value: T[]) {
  if (!isBrowser()) return
  window.localStorage.setItem(key(tenantId, entity), JSON.stringify(value))
}

function stableId(prefix: string, tenantId: string, index: number) {
  return `${prefix}_${tenantId}_${index.toString().padStart(3, '0')}`
}

function stableNow(offset: number) {
  const base = new Date(2026, 1, 1)
  return new Date(base.getTime() + offset * 86400000).toISOString()
}

function pick<T>(list: readonly T[], seed: number) {
  return list[Math.abs(seed) % list.length]
}

function hash(input: string) {
  let h = 0
  for (let i = 0; i < input.length; i += 1) {
    h = (h << 5) - h + input.charCodeAt(i)
    h |= 0
  }
  return Math.abs(h)
}

function buildCases(tenantId: string, count: number) {
  const statuses: UnderwritingCase['status'][] = ['intake', 'screening', 'manualReview', 'offer', 'bound', 'declined']
  return Array.from({ length: count }).map((_, idx) => {
    const productLine = pick(productLines, idx)
    const segment = pick(segments, idx + 3)
    const broker = pick(brokers, idx + 5)
    const insured = pick(insureds, idx + 7)
    const status = pick(statuses, idx)
    const basePremium = 65000 + idx * 1400
    const adjustments = [
      { label: 'Loss ratio adj.', amount: (idx % 3 === 0 ? 1 : -1) * (1200 + idx * 20) },
      { label: 'Exposure uplift', amount: 900 + (idx % 5) * 180 },
      { label: 'Broker terms', amount: -450 - (idx % 4) * 60 }
    ]
    const total = adjustments.reduce((sum, adj) => sum + adj.amount, basePremium)
    const createdAt = stableNow(idx)
    const inceptionDate = new Date(2026, (idx % 12), 1).toISOString()
    const expiryDate = new Date(2027, (idx % 12), 1).toISOString()
    const decision = status === 'bound'
      ? {
          status: 'approved' as const,
          rationale: 'Pricing aligned with risk appetite and controls verified.',
          decidedAt: stableNow(idx + 12),
          decidedBy: 'uw.lead@insurfox'
        }
      : status === 'declined'
        ? {
            status: 'declined' as const,
            rationale: 'Loss ratio above threshold and mitigation insufficient.',
            decidedAt: stableNow(idx + 12),
            decidedBy: 'uw.lead@insurfox'
          }
        : undefined

    return {
      id: stableId('case', tenantId, idx + 1),
      tenantId,
      caseNumber: `UW-${2026 + (idx % 2)}-${(idx + 1).toString().padStart(4, '0')}`,
      productLine,
      segment,
      status,
      broker,
      insured,
      inceptionDate,
      expiryDate,
      premium: {
        base: basePremium,
        adjustments,
        total
      },
      risk: {
        score: 38 + (idx * 7) % 50,
        confidence: Math.round((0.62 + (idx % 7) * 0.04) * 100) / 100,
        factors: [
          `${productLine} exposure concentration`,
          `${segment} loss ratio trend`,
          'Controls evidence quality'
        ]
      },
      decision,
      createdAt
    } satisfies UnderwritingCase
  })
}

function buildDocuments(tenantId: string, cases: UnderwritingCase[]) {
  const docs: CaseDocument[] = []
  cases.forEach((uwCase, caseIdx) => {
    const count = 3 + (caseIdx % 4)
    for (let i = 0; i < count; i += 1) {
      const docId = stableId('doc', tenantId, caseIdx * 10 + i + 1)
      const extractedFields: Record<string, string> = {}
      extractedFieldKeys.forEach((keyName, idx) => {
        extractedFields[keyName] = `${500 + caseIdx * 12 + idx * 7}`
      })
      docs.push({
        id: docId,
        tenantId,
        caseId: uwCase.id,
        name: `UW_${uwCase.caseNumber}_Doc_${i + 1}.pdf`,
        type: 'application/pdf',
        size: 180000 + i * 24000,
        uploadedAt: stableNow(caseIdx + i),
        extractedText: `Submission summary for ${uwCase.insured} (${uwCase.productLine}).\n\nExposure overview: ${uwCase.segment} portfolio with ${420 + caseIdx} units. Loss history shows ${3 + i} notable incidents.\n\nControls: Driver training, geo-fencing, and quarterly audits are in place. Additional details in appendix.`,
        extractedFields,
        status: pick(['extracted', 'needsReview', 'approved'], caseIdx + i) as CaseDocument['status']
      })
    }
  })
  return docs
}

function buildRuleHits(seed: number): RuleHit[] {
  return ruleLibrary.map((rule, idx) => ({
    ruleId: rule.id,
    name: rule.name,
    outcome: pick(['pass', 'warn', 'fail'], seed + idx) as RuleHit['outcome'],
    severity: rule.severity
  }))
}

function buildRatingSnapshot(seed: number): RatingSnapshot {
  return {
    version: `v${1 + (seed % 4)}.${2 + (seed % 6)}`,
    inputs: {
      revenue: 18_000_000 + seed * 420_000,
      lossRatio: Math.round((0.42 + (seed % 7) * 0.03) * 100) / 100,
      fleetSize: 220 + (seed % 12) * 8
    },
    outputs: {
      technicalPremium: 92_000 + seed * 1600,
      indicatedRate: Math.round((1.08 + (seed % 5) * 0.04) * 100) / 100,
      adjustment: `${seed % 2 === 0 ? '+' : '-'}${4 + (seed % 3)}%`
    }
  }
}

function buildAiRecommendation(seed: number): AiRecommendation {
  return {
    summary: 'Submission aligns with appetite after pricing adjustment and control verification.',
    recommendedDecision: pick(['approve', 'refer', 'decline'], seed) as AiRecommendation['recommendedDecision'],
    bullets: [
      aiBullets[seed % aiBullets.length],
      aiBullets[(seed + 1) % aiBullets.length],
      aiBullets[(seed + 2) % aiBullets.length]
    ],
    confidence: Math.round((0.68 + (seed % 6) * 0.04) * 100) / 100
  }
}

function buildTimeline(tenantId: string, cases: UnderwritingCase[], documents: CaseDocument[]) {
  const events: TimelineEvent[] = []
  cases.forEach((uwCase, idx) => {
    const total = 12 + (idx % 14)
    const caseDocs = documents.filter((doc) => doc.caseId === uwCase.id)
    const rating = buildRatingSnapshot(idx)
    const rules = buildRuleHits(idx)
    const aiRec = buildAiRecommendation(idx)

    events.push({
      id: stableId('tl', tenantId, idx * 100 + 1),
      tenantId,
      entityType: 'case',
      entityId: uwCase.id,
      type: 'system',
      title: 'Case created',
      message: `Intake started for ${uwCase.caseNumber}.`,
      createdAt: uwCase.createdAt,
      actor: 'system'
    })

    caseDocs.forEach((doc, docIdx) => {
      events.push({
        id: stableId('tl', tenantId, idx * 100 + 10 + docIdx),
        tenantId,
        entityType: 'document',
        entityId: doc.id,
        type: 'system',
        title: 'Document uploaded',
        message: `${doc.name} ingested and extracted.`,
        createdAt: stableNow(idx + docIdx + 1),
        actor: 'system'
      })
    })

    events.push({
      id: stableId('tl', tenantId, idx * 100 + 40),
      tenantId,
      entityType: 'rule',
      entityId: uwCase.id,
      type: 'system',
      title: 'Rules evaluated',
      message: `Rules engine executed: ${rules.filter((r) => r.outcome !== 'pass').length} findings.`,
      createdAt: stableNow(idx + 4),
      actor: 'rules-engine'
    })

    events.push({
      id: stableId('tl', tenantId, idx * 100 + 50),
      tenantId,
      entityType: 'rating',
      entityId: uwCase.id,
      type: 'system',
      title: 'Rating recalculated',
      message: `Rating snapshot ${rating.version} saved with technical premium €${rating.outputs.technicalPremium}.`,
      createdAt: stableNow(idx + 5),
      actor: 'rating-engine'
    })

    events.push({
      id: stableId('tl', tenantId, idx * 100 + 60),
      tenantId,
      entityType: 'case',
      entityId: uwCase.id,
      type: 'system',
      title: 'AI recommendation generated',
      message: `Recommendation: ${aiRec.recommendedDecision}. Confidence ${aiRec.confidence}.`,
      createdAt: stableNow(idx + 6),
      actor: 'ai-uw'
    })

    for (let n = 0; n < total - 6; n += 1) {
      events.push({
        id: stableId('tl', tenantId, idx * 100 + 70 + n),
        tenantId,
        entityType: 'case',
        entityId: uwCase.id,
        type: n % 3 === 0 ? 'internalNote' : 'statusUpdate',
        title: n % 3 === 0 ? 'Underwriter note' : 'Status updated',
        message: n % 3 === 0
          ? `Reviewed ${uwCase.productLine} risk factors and broker submission.`
          : `Moved to ${uwCase.status} queue for follow-up.`,
        createdAt: stableNow(idx + 7 + n),
        actor: n % 2 === 0 ? 'uw.lead@insurfox' : 'uw.analyst@insurfox'
      })
    }
  })
  return events
}

export function seedTenant(tenantId: string) {
  const cases = buildCases(tenantId, 30)
  const documents = buildDocuments(tenantId, cases)
  const timeline = buildTimeline(tenantId, cases, documents)
  writeList(tenantId, 'cases', cases)
  writeList(tenantId, 'documents', documents)
  writeList(tenantId, 'timeline', timeline)
}

export function seedAllTenants() {
  underwriterfoxTenants.forEach((tenantId) => seedTenant(tenantId))
}

export function ensureSeeded(tenantId: string) {
  if (!isBrowser()) return
  const markerKey = key(tenantId, 'seeded')
  const seeded = window.localStorage.getItem(markerKey)
  if (seeded) return
  seedTenant(tenantId)
  window.localStorage.setItem(markerKey, 'true')
}
