import { carriers, demoTenants, docTemplates, industries, integrationTemplates, segments, taskTemplates, timelinePhrases } from './demoCatalog'
import type {
  Client,
  CoverageRequest,
  CalendarEvent,
  DocumentMeta,
  IntegrationItem,
  MailboxItem,
  Offer,
  OfferLine,
  RenewalItem,
  TaskItem,
  Tender,
  TimelineEvent
} from '@/brokerfox/types'

const SEED_FLAG = 'seeded'

export type SeededData = {
  clients: Client[]
  tenders: Tender[]
  offers: Offer[]
  renewals: RenewalItem[]
  documents: DocumentMeta[]
  tasks: TaskItem[]
  integrations: IntegrationItem[]
  calendarEvents: CalendarEvent[]
  mailboxItems: MailboxItem[]
  timeline: TimelineEvent[]
  hero: {
    clientId: string
    tenderId: string
  }
}

function stableId(prefix: string, tenantId: string, index: number) {
  return `${prefix}_${tenantId}_${String(index).padStart(3, '0')}`
}

function stableNow(index: number) {
  const base = new Date('2025-12-01T09:00:00.000Z').getTime()
  return new Date(base + index * 1000 * 60 * 60).toISOString()
}

function pick<T>(list: T[], index: number) {
  return list[index % list.length]
}

function buildClients(tenantId: string, count: number, heroName: string) {
  return Array.from({ length: count }).map((_, idx) => {
    const id = stableId('client', tenantId, idx + 1)
    const name = idx === 0 ? heroName : `${pick(['Nordlicht', 'Atlas', 'Helios', 'Urbania', 'Vento', 'Südpol', 'Rhein', 'Berg'], idx)} ${pick(['Industries', 'Logistics', 'Group', 'Services', 'Holding', 'Partners'], idx + 3)}`
    return {
      id,
      tenantId,
      name,
      segment: pick(segments, idx),
      industry: pick(industries, idx + 2),
      revenue: `${30 + idx * 5} Mio €`,
      employees: 120 + idx * 12,
      locationsCount: 2 + (idx % 4),
      address: `${pick(['Hafenstrasse', 'Industriestrasse', 'Werkallee', 'Hauptweg'], idx)} ${10 + idx}, 20${10 + idx} Hamburg`,
      lossHistory: [
        { year: 2022, count: 2 + (idx % 3), paid: `€ ${120 + idx * 10}k`, reserved: `€ ${40 + idx * 4}k` },
        { year: 2023, count: 1 + (idx % 4), paid: `€ ${80 + idx * 9}k`, reserved: `€ ${30 + idx * 3}k` },
        { year: 2024, count: 2 + (idx % 2), paid: `€ ${110 + idx * 8}k`, reserved: `€ ${35 + idx * 2}k` }
      ],
      ownerId: 'broker-1',
      createdAt: stableNow(idx),
      updatedAt: stableNow(idx + 1),
      contacts: [
        {
          id: stableId('contact', tenantId, idx + 1),
          tenantId,
          clientId: id,
          name: `${pick(['Lea', 'Tobias', 'Mira', 'Jonas', 'Hannah', 'Tim'], idx)} ${pick(['Hansen', 'Koch', 'Schmidt', 'Weber', 'Krüger', 'Neumann'], idx + 2)}`,
          email: `contact${idx + 1}@${name.replace(/\s+/g, '').toLowerCase()}.example`,
          phone: '+49 40 123 555',
          role: pick(['Risk Manager', 'CFO', 'Operations Lead', 'Procurement'], idx)
        }
      ],
      isHero: idx === 0
    } satisfies Client
  })
}

function buildCoverageRequests(tenantId: string, seed: number): CoverageRequest[] {
  const items = [
    { label: 'General Liability', limit: '10 Mio', deductible: '25k', notes: 'EU coverage' },
    { label: 'Property', limit: '8 Mio', deductible: '50k', notes: 'CAT sublimit required' },
    { label: 'Cargo', limit: '5 Mio', deductible: '50k', notes: 'Temperature sensitive' },
    { label: 'Cyber', limit: '3 Mio', deductible: '10k', notes: 'Incident response included' }
  ]
  return items.map((item, idx) => ({
    id: stableId('cov', tenantId, seed + idx + 1),
    ...item
  }))
}

function buildTenders(tenantId: string, clients: Client[], count: number, heroTitle: string) {
  const statuses: Tender['status'][] = ['draft', 'sent', 'offersReceived', 'negotiation', 'won', 'lost']
  return Array.from({ length: count }).map((_, idx) => {
    const id = stableId('tender', tenantId, idx + 1)
    const hero = idx === 0
    return {
      id,
      tenantId,
      clientId: clients[idx % clients.length].id,
      title: hero ? heroTitle : `${pick(['Fleet', 'Property', 'Cyber', 'Liability', 'Cargo'], idx)} Program ${2025 + (idx % 2)}`,
      description: 'Multi-line placement with structured intake and carrier negotiation.',
      status: pick(statuses, idx),
      dueDate: new Date(Date.now() + (idx + 7) * 86400000).toISOString(),
      coverageRequests: buildCoverageRequests(tenantId, idx * 10),
      attachments: [],
      invitedCarriers: carriers.slice(0, 3).map((name, carrierIdx) => ({
        id: stableId('party', tenantId, idx * 10 + carrierIdx),
        name,
        role: 'carrier',
        email: `submissions@${name.toLowerCase().replace(/\s+/g, '')}.example`
      })),
      createdAt: stableNow(idx + 10),
      updatedAt: stableNow(idx + 11),
      isHero: hero
    } satisfies Tender
  })
}

function buildOffers(tenantId: string, tenders: Tender[]) {
  const offers: Offer[] = []
  tenders.forEach((tender, tenderIdx) => {
    const offerCount = 2 + (tenderIdx % 3)
    for (let i = 0; i < offerCount; i += 1) {
      const offerId = stableId('offer', tenantId, tenderIdx * 10 + i + 1)
      const carrierName = carriers[(tenderIdx + i) % carriers.length]
      const lines: OfferLine[] = tender.coverageRequests.map((req, idx) => ({
        id: stableId('line', tenantId, tenderIdx * 20 + i * 5 + idx),
        coverage: req.label,
        limit: req.limit,
        exclusion: idx % 2 === 0 ? 'US exposure' : 'Cyber extortion cap',
        premium: `€ ${180 + tenderIdx * 12 + i * 15}k`
      }))
      offers.push({
        id: offerId,
        tenantId,
        tenderId: tender.id,
        carrier: { id: stableId('party', tenantId, tenderIdx * 10 + i + 99), name: carrierName, role: 'carrier' },
        status: 'received',
        lines,
        exclusions: ['US exposure', 'War risk', 'Cyber extortion cap'].slice(0, 2 + (i % 2)),
        conditions: ['Quarterly loss updates', 'Cyber controls review', 'Fleet telematics summary'],
        premiumTotal: `€ ${420 + tenderIdx * 15 + i * 18}k`,
        createdAt: stableNow(tenderIdx * 5 + i),
        updatedAt: stableNow(tenderIdx * 5 + i + 1)
      })
    }
  })
  return offers
}

function buildRenewals(tenantId: string, clients: Client[], count: number) {
  return Array.from({ length: count }).map((_, idx) => {
    const id = stableId('renewal', tenantId, idx + 1)
    const status = pick(['upcoming', 'inReview', 'quoted', 'renewed'], idx)
    return {
      id,
      tenantId,
      clientId: clients[idx % clients.length].id,
      policyName: `${pick(['Fleet Liability', 'Property All Risk', 'Cyber Shield', 'Cargo Protect'], idx)} ${2025 + (idx % 2)}`,
      carrier: pick(carriers, idx + 4),
      renewalDate: new Date(Date.now() + (15 + idx * 6) * 86400000).toISOString(),
      premium: `€ ${90 + idx * 7}k`,
      status
    } satisfies RenewalItem
  })
}

function buildDocuments(tenantId: string, clients: Client[], tenders: Tender[], offers: Offer[], renewals: RenewalItem[]) {
  const docs: DocumentMeta[] = []
  const entities = [
    ...clients.map((client) => ({ type: 'client' as const, id: client.id })),
    ...tenders.map((tender) => ({ type: 'tender' as const, id: tender.id })),
    ...offers.map((offer) => ({ type: 'offer' as const, id: offer.id })),
    ...renewals.map((renewal) => ({ type: 'renewal' as const, id: renewal.id }))
  ]

  for (let i = 0; i < 40; i += 1) {
    const template = docTemplates[i % docTemplates.length]
    const entity = entities[i % entities.length]
    docs.push({
      id: stableId('doc', tenantId, i + 1),
      tenantId,
      name: template.name,
      type: template.type,
      size: 120000 + i * 1200,
      uploadedAt: stableNow(i + 30),
      uploadedBy: 'broker-1',
      entityType: entity.type,
      entityId: entity.id,
      url: template.url,
      source: 'demo'
    })
  }

  for (let j = 0; j < 8; j += 1) {
    docs.push({
      id: stableId('doc', tenantId, 100 + j),
      tenantId,
      name: `Inbox_Note_${j + 1}.txt`,
      type: 'text/plain',
      size: 500 + j * 40,
      uploadedAt: stableNow(j + 80),
      uploadedBy: 'broker-1',
      source: 'upload'
    })
  }

  return docs
}

function buildTasks(tenantId: string, clients: Client[], tenders: Tender[], renewals: RenewalItem[]) {
  const tasks: TaskItem[] = []
  for (let i = 0; i < 30; i += 1) {
    const linkedType = pick(['client', 'tender', 'renewal'], i) as 'client' | 'tender' | 'renewal'
    const linkedId = linkedType === 'client' ? clients[i % clients.length].id : linkedType === 'tender' ? tenders[i % tenders.length].id : renewals[i % renewals.length].id
    tasks.push({
      id: stableId('task', tenantId, i + 1),
      tenantId,
      title: pick(taskTemplates, i),
      description: 'Demo task created for broker workflow.',
      status: pick(['todo', 'inProgress', 'done'], i) as TaskItem['status'],
      linkedEntityType: linkedType,
      linkedEntityId: linkedId,
      dueDate: new Date(Date.now() + (i + 4) * 86400000).toISOString(),
      assigneeId: 'broker-1',
      createdAt: stableNow(i + 40),
      updatedAt: stableNow(i + 41)
    })
  }
  return tasks
}

function buildIntegrations(tenantId: string) {
  return integrationTemplates.map((tpl, idx) => ({
    id: stableId('integration', tenantId, idx + 1),
    tenantId,
    name: tpl.name,
    status: idx % 2 === 0 ? 'connected' : 'notConnected',
    description: tpl.description,
    updatedAt: stableNow(idx + 5)
  }))
}

function buildCalendarEvents(tenantId: string, tenders: Tender[], renewals: RenewalItem[]) {
  const events: CalendarEvent[] = []
  tenders.slice(0, 6).forEach((tender, idx) => {
    events.push({
      id: stableId('cal', tenantId, idx + 1),
      tenantId,
      title: `Tender deadline: ${tender.title}`,
      date: tender.dueDate ?? new Date(Date.now() + (idx + 5) * 86400000).toISOString(),
      entityType: 'tender',
      entityId: tender.id,
      description: 'Deadline for carrier submissions.'
    })
  })
  renewals.slice(0, 6).forEach((renewal, idx) => {
    events.push({
      id: stableId('cal', tenantId, idx + 20),
      tenantId,
      title: `Renewal review: ${renewal.policyName}`,
      date: renewal.renewalDate,
      entityType: 'renewal',
      entityId: renewal.id,
      description: 'Prepare renewal review pack.'
    })
  })
  return events
}

function buildMailboxItems(tenantId: string, clients: Client[], tenders: Tender[], offers: Offer[]) {
  return [
    {
      id: stableId('mail', tenantId, 1),
      tenantId,
      sender: 'carrier@allianz.example',
      subject: `Offer update for ${tenders[0].title}`,
      receivedAt: stableNow(90),
      attachments: [
        {
          id: stableId('doc', tenantId, 200),
          tenantId,
          name: 'Offer_Allianz.pdf',
          type: 'application/pdf',
          size: 160000,
          uploadedAt: stableNow(90),
          uploadedBy: 'carrier',
          url: '/demo-docs/Offer_Allianz.pdf',
          source: 'demo'
        }
      ],
      extractedEntities: [{ type: 'tender', label: tenders[0].title }],
      status: 'unassigned'
    },
    {
      id: stableId('mail', tenantId, 2),
      tenantId,
      sender: `risk@${clients[0].name.replace(/\\s+/g, '').toLowerCase()}.example`,
      subject: 'Updated risk information',
      receivedAt: stableNow(92),
      attachments: [
        {
          id: stableId('doc', tenantId, 201),
          tenantId,
          name: 'Risk_Assessment_2024.pdf',
          type: 'application/pdf',
          size: 145000,
          uploadedAt: stableNow(92),
          uploadedBy: 'client',
          url: '/demo-docs/Risk_Assessment_2024.pdf',
          source: 'demo'
        }
      ],
      extractedEntities: [{ type: 'client', label: clients[0].name }],
      status: 'unassigned',
      body: 'Please find the updated risk assessment and facility overview.'
    },
    {
      id: stableId('mail', tenantId, 3),
      tenantId,
      sender: 'renewals@carrier.example',
      subject: `Renewal reminder for ${clients[1].name}`,
      receivedAt: stableNow(95),
      attachments: [
        {
          id: stableId('doc', tenantId, 202),
          tenantId,
          name: 'Loss_History_2022_2024.xlsx',
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          size: 90000,
          uploadedAt: stableNow(95),
          uploadedBy: 'carrier',
          url: '/demo-docs/Loss_History_2022_2024.xlsx',
          source: 'demo'
        }
      ],
      extractedEntities: [{ type: 'client', label: clients[1].name }],
      status: 'unassigned',
      body: 'Please provide updated loss history and renewal preferences.'
    }
  ] as MailboxItem[]
}

function buildTimeline(tenantId: string, hero: { clientId: string; tenderId: string }, offers: Offer[], mailboxItems: MailboxItem[]) {
  const events: TimelineEvent[] = []
  const makeEvent = (entityType: TimelineEvent['entityType'], entityId: string, type: TimelineEvent['type'], title: string, message: string, idx: number) => {
    events.push({
      id: stableId('event', tenantId, idx + 1),
      tenantId,
      actorId: 'broker-1',
      createdAt: stableNow(idx + 60),
      timestamp: stableNow(idx + 60),
      entityType,
      entityId,
      type,
      title,
      message
    })
  }

  for (let i = 0; i < 12; i += 1) {
    makeEvent('client', hero.clientId, 'externalMessage', 'Client update', pick(timelinePhrases.external, i), i)
    makeEvent('client', hero.clientId, 'internalNote', 'Internal note', pick(timelinePhrases.internal, i), i + 1)
  }

  for (let i = 0; i < 12; i += 1) {
    makeEvent('tender', hero.tenderId, 'statusUpdate', 'Tender update', pick(timelinePhrases.status, i), i + 20)
  }

  const offerSample = offers.filter((offer) => offer.tenderId === hero.tenderId)[0]
  if (offerSample) {
    makeEvent('offer', offerSample.id, 'statusUpdate', 'AI suggestion', 'AI suggests prioritizing higher liability limit. (Suggestion, not a decision)', 50)
    makeEvent('offer', offerSample.id, 'internalNote', 'Offer note', 'Internal note: validate exclusions and deductibles.', 51)
    makeEvent('offer', offerSample.id, 'externalMessage', 'Carrier update', 'Carrier confirmed revised terms and pricing.', 52)
  }

  mailboxItems.forEach((item, idx) => {
    makeEvent('document', item.id, 'statusUpdate', 'Mail received', `Mailbox item received: ${item.subject}`, 70 + idx)
  })

  return events
}

export function seedDemoData(tenantId: string): SeededData {
  const heroClientName = tenantId === 'demo-industrial-001' ? 'Atlas Industrial AG' : tenantId === 'demo-logistics-001' ? 'Nordlicht Logistics GmbH' : 'Südpol Advisory GmbH'
  const heroTenderTitle = tenantId === 'demo-industrial-001' ? 'Industrial Property & Liability 2026' : tenantId === 'demo-logistics-001' ? 'Fleet & Cargo Program 2026' : 'SME Package Renewal 2026'

  const clients = buildClients(tenantId, 12, heroClientName)
  const tenders = buildTenders(tenantId, clients, 10, heroTenderTitle)
  const offers = buildOffers(tenantId, tenders)
  const renewals = buildRenewals(tenantId, clients, 14)
  const documents = buildDocuments(tenantId, clients, tenders, offers, renewals)
  const tasks = buildTasks(tenantId, clients, tenders, renewals)
  const integrations = buildIntegrations(tenantId)
  const calendarEvents = buildCalendarEvents(tenantId, tenders, renewals)
  const mailboxItems = buildMailboxItems(tenantId, clients, tenders, offers)
  const hero = { clientId: clients[0].id, tenderId: tenders[0].id }
  const timeline = buildTimeline(tenantId, hero, offers, mailboxItems)

  return { clients, tenders, offers, renewals, documents, tasks, integrations, calendarEvents, mailboxItems, timeline, hero }
}

export function seedAllTenants() {
  return demoTenants.reduce<Record<string, SeededData>>((acc, tenant) => {
    acc[tenant.id] = seedDemoData(tenant.id)
    return acc
  }, {})
}

export function resetTenant(tenantId: string) {
  return {
    seedFlag: `${tenantId}:${SEED_FLAG}`
  }
}
