import {
  assistanceNames,
  calendarTemplates,
  caseStatuses,
  glassNames,
  partnerfoxTenants,
  regions,
  rentalNames,
  towingNames,
  workshopNames
} from '@/partnerfox/demo/demoCatalog'
import type { CalendarEvent, Partner, PartnerCase, Subrogation, TimelineEvent } from '@/partnerfox/types'

const KEY_PREFIX = 'partnerfox'
const SCHEMA_VERSION = '1'

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

function hashSeed(input: string) {
  let hash = 2166136261
  for (let i = 0; i < input.length; i += 1) {
    hash ^= input.charCodeAt(i)
    hash = Math.imul(hash, 16777619)
  }
  return hash >>> 0
}

function createRng(seedInput: string) {
  let seed = hashSeed(seedInput)
  return () => {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0
    return seed / 4294967296
  }
}

function pick<T>(items: readonly T[], rand: () => number) {
  return items[Math.floor(rand() * items.length)]
}

function iso(base: Date, days: number) {
  return new Date(base.getTime() + days * 86400000).toISOString()
}

function buildPartners(tenantId: string, rand: () => number): Partner[] {
  const partners: Partner[] = []
  const add = (count: number, type: Partner['type'], names: string[], start: number) => {
    for (let idx = 0; idx < count; idx += 1) {
      const name = idx < names.length ? names[idx] : `${pick(names, rand)} ${idx + 1}`
      partners.push({
        id: `partner_${tenantId}_${String(start + idx).padStart(3, '0')}`,
        tenantId,
        name,
        type,
        certification: idx % 3 === 0 ? 'DEKRA' : idx % 3 === 1 ? 'OEM' : 'Independent',
        rating: Number((3.4 + rand() * 1.5).toFixed(1)),
        avgRepairDays: Math.round(2 + rand() * 10),
        directBillingEnabled: rand() > 0.35,
        networkRegion: pick(regions, rand),
        performanceScore: Math.round(62 + rand() * 35),
        casesHandled: Math.round(25 + rand() * 480),
        contactEmail: `${name.toLowerCase().replace(/[^a-z0-9]+/g, '.')}@partnerfox.demo`
      })
    }
  }

  add(40, 'workshop', workshopNames, 1)
  add(10, 'rental', rentalNames, 41)
  add(6, 'towing', towingNames, 51)
  add(5, 'glass', glassNames, 57)
  add(8, 'assistance', assistanceNames, 62)
  return partners
}

function buildCases(tenantId: string, partners: Partner[], rand: () => number, baseDate: Date): PartnerCase[] {
  const workshops = partners.filter((p) => p.type === 'workshop')
  const rentals = partners.filter((p) => p.type === 'rental')
  const towings = partners.filter((p) => p.type === 'towing')
  const damages = [
    'Front impact with bumper and headlight damage.',
    'Rear-end collision with trunk deformation.',
    'Side panel and mirror damage in depot incident.',
    'Windshield crack and sensor recalibration needed.',
    'Brake overheating event with towing dispatch.'
  ]

  return Array.from({ length: 60 }).map((_, idx) => {
    const workshop = workshops[idx % workshops.length]
    const rental = rentals[idx % rentals.length]
    const towing = towings[idx % towings.length]
    const status = caseStatuses[idx % caseStatuses.length]
    return {
      id: `case_${tenantId}_${String(idx + 1).padStart(3, '0')}`,
      tenantId,
      claimNumber: `PF-${new Date().getFullYear()}-${String(1000 + idx)}`,
      vehiclePlate: idx % 2 === 0 ? `HH-FX ${2400 + idx}` : `B-FX ${1800 + idx}`,
      status,
      partnerId: workshop.id,
      rentalPartnerId: status === 'RentalActive' || idx % 4 === 0 ? rental.id : undefined,
      towingPartnerId: idx % 3 === 0 ? towing.id : undefined,
      estimatedCost: Math.round(1200 + rand() * 12800),
      aiApproved: rand() > 0.42,
      repairDurationDays: Math.round(2 + rand() * 18),
      customerTrackingLink: `https://tracking.partnerfox.demo/${tenantId}/${idx + 1}`,
      subrogationCandidate: rand() > 0.68,
      damageSummary: pick(damages, rand)
    }
  })
}

function buildSubrogation(tenantId: string, cases: PartnerCase[], rand: () => number): Subrogation[] {
  const liable = ['Third-party driver', 'Logistics contractor', 'Municipal road authority', 'Unknown vehicle owner']
  const candidates = cases.filter((item) => item.subrogationCandidate)
  return Array.from({ length: 12 }).map((_, idx) => {
    const source = candidates[idx % Math.max(candidates.length, 1)] ?? cases[idx]
    const probability = Number((0.32 + rand() * 0.56).toFixed(2))
    return {
      id: `subrogation_${tenantId}_${String(idx + 1).padStart(3, '0')}`,
      tenantId,
      caseId: source.id,
      liableParty: pick(liable, rand),
      claimAmount: Math.round(source.estimatedCost * (1.05 + rand() * 0.45)),
      recoveryProbability: probability,
      status: idx % 4 === 0 ? 'Recovered' : idx % 3 === 0 ? 'Negotiation' : idx % 2 === 0 ? 'Open' : 'Lost',
      evidenceSummary: 'Police report, telematics route proof and workshop image evidence attached.'
    }
  })
}

function buildCalendar(tenantId: string, cases: PartnerCase[], partners: Partner[], subrogation: Subrogation[], baseDate: Date): CalendarEvent[] {
  return calendarTemplates.map((item, idx) => ({
    id: `calendar_${tenantId}_${String(idx + 1).padStart(3, '0')}`,
    tenantId,
    title: item.title,
    date: iso(baseDate, idx + 1),
    location: item.location,
    description: item.description,
    entityType: idx === 0 ? 'case' : idx === 2 ? 'subrogation' : idx === 3 ? 'partner' : 'case',
    entityId: idx === 0 ? cases[0]?.id : idx === 2 ? subrogation[0]?.id : idx === 3 ? partners[3]?.id : cases[idx + 2]?.id
  }))
}

function buildTimeline(tenantId: string, cases: PartnerCase[], partners: Partner[], subrogation: Subrogation[], baseDate: Date): TimelineEvent[] {
  const events: TimelineEvent[] = []
  for (let idx = 0; idx < 28; idx += 1) {
    const c = cases[idx % cases.length]
    const p = partners[idx % partners.length]
    const s = subrogation[idx % subrogation.length]
    const type: TimelineEvent['type'] = idx % 4 === 0 ? 'status' : idx % 4 === 1 ? 'note' : idx % 4 === 2 ? 'external' : 'system'
    const entityType: TimelineEvent['entityType'] = idx % 3 === 0 ? 'case' : idx % 3 === 1 ? 'partner' : 'subrogation'
    const entityId = entityType === 'case' ? c.id : entityType === 'partner' ? p.id : s.id
    events.push({
      id: `timeline_${tenantId}_${String(idx + 1).padStart(3, '0')}`,
      tenantId,
      entityType,
      entityId,
      type,
      title: idx % 2 === 0 ? 'BPO workflow update' : 'AI check event',
      message: idx % 2 === 0
        ? `Case ${c.claimNumber} routed to ${p.name}. SLA follow-up in progress.`
        : `Estimate plausibility recalculated for ${c.vehiclePlate}; direct billing ${c.aiApproved ? 'recommended' : 'pending manual review'}.`,
      createdAt: iso(baseDate, -idx),
      meta: { actor: idx % 2 === 0 ? 'partner-ops' : 'partner-ai' }
    })
  }
  return events
}

export function seedTenantData(tenantId: string) {
  const rand = createRng(tenantId)
  const baseDate = new Date(2026, 1, 12)
  const partners = buildPartners(tenantId, rand)
  const cases = buildCases(tenantId, partners, rand, baseDate)
  const subrogation = buildSubrogation(tenantId, cases, rand)
  const calendar = buildCalendar(tenantId, cases, partners, subrogation, baseDate)
  const timeline = buildTimeline(tenantId, cases, partners, subrogation, baseDate)

  writeList(tenantId, 'partners', partners)
  writeList(tenantId, 'cases', cases)
  writeList(tenantId, 'subrogation', subrogation)
  writeList(tenantId, 'calendar', calendar)
  writeList(tenantId, 'timeline', timeline)
}

export function seedAllTenants() {
  partnerfoxTenants.forEach((tenant) => seedTenantData(tenant.id))
}

export function ensureSeeded(tenantId: string) {
  if (!isBrowser()) return
  const marker = key(tenantId, 'seeded')
  if (window.localStorage.getItem(marker) === SCHEMA_VERSION) return
  seedTenantData(tenantId)
  window.localStorage.setItem(marker, SCHEMA_VERSION)
}
