import React, { useMemo, useState } from 'react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { useI18n } from '@/i18n/I18nContext'

type ShipmentStatus = 'inTransit' | 'delayed' | 'delivered' | 'incident'
type CoverageStatus = 'covered' | 'partial' | 'notCovered'
type IncidentRisk = 'low' | 'medium' | 'high'
type ShipmentCargoKey = 'electronics' | 'pharma' | 'fashion' | 'chemicals' | 'chilled' | 'automotive' | 'retailMixed' | 'seafood'
type ShipmentNoteKey =
  | 'tempStable'
  | 'customsWait'
  | 'theftInvestigation'
  | 'podSigned'
  | 'temp3c'
  | 'ferrySlot'
  | 'borderCrossed'
  | 'tempDeviation'
type ShipmentEtaLabelKey = 'delayed45' | 'delayed25' | 'investigating' | 'hold'
type IncidentTypeKey = 'theftParking' | 'tempDeviation' | 'delay12h' | 'damageForklift'

type Shipment = {
  id: string
  code: string
  customer: string
  route: string
  status: ShipmentStatus
  coverage: CoverageStatus
  cargoKey: ShipmentCargoKey
  value: string
  contact: string
  phone: string
  noteKey?: ShipmentNoteKey
  etaValue?: string
  etaLabelKey?: ShipmentEtaLabelKey
}

type Incident = {
  id: string
  typeKey: IncidentTypeKey
  shipment: string
  status: 'open' | 'review' | 'closed'
  cost: string
  docs: number
  risk: IncidentRisk
}

type PartnerCard = {
  titleKey: string
  contact: string
  phone: string
  email: string
  address: string
}

const KPI_DATA = [
  { key: 'activeShipments', value: '128' },
  { key: 'delayed', value: '14' },
  { key: 'incidents', value: '7' },
  { key: 'coverageOk', value: '92%' },
  { key: 'highRisk', value: '9' },
  { key: 'avgEtaDeviation', value: '18m' }
] as const

const shipments: Shipment[] = [
  {
    id: 'SHP-2025-001',
    code: 'HH → MUC',
    customer: 'NordCargo AG',
    route: 'Hamburg → Munich',
    status: 'inTransit',
    etaValue: '12:45',
    coverage: 'covered',
    cargoKey: 'electronics',
    value: '€ 180k',
    contact: 'Lisa Kramer',
    phone: '+49 40 231 45',
    noteKey: 'tempStable'
  },
  {
    id: 'SHP-2025-014',
    code: 'BER → FRA',
    customer: 'Metro Logistics',
    route: 'Berlin → Frankfurt',
    status: 'delayed',
    etaLabelKey: 'delayed45',
    coverage: 'partial',
    cargoKey: 'pharma',
    value: '€ 260k',
    contact: 'Hannah Meyer',
    phone: '+49 30 882 12',
    noteKey: 'customsWait'
  },
  {
    id: 'SHP-2025-022',
    code: 'RTM → CGN',
    customer: 'Global Freight BV',
    route: 'Rotterdam → Cologne',
    status: 'incident',
    etaLabelKey: 'investigating',
    coverage: 'covered',
    cargoKey: 'fashion',
    value: '€ 95k',
    contact: 'Paul Sievers',
    phone: '+31 10 442 90',
    noteKey: 'theftInvestigation'
  },
  {
    id: 'SHP-2025-031',
    code: 'PRG → VIE',
    customer: 'AlpenEco',
    route: 'Prague → Vienna',
    status: 'delivered',
    etaValue: '08:10',
    coverage: 'covered',
    cargoKey: 'chemicals',
    value: '€ 120k',
    contact: 'Maja Koller',
    phone: '+43 1 778 40',
    noteKey: 'podSigned'
  },
  {
    id: 'SHP-2025-041',
    code: 'CPH → HAM',
    customer: 'Nordic Foods',
    route: 'Copenhagen → Hamburg',
    status: 'inTransit',
    etaValue: '16:30',
    coverage: 'covered',
    cargoKey: 'chilled',
    value: '€ 60k',
    contact: 'Anne Tobias',
    phone: '+45 33 201 456',
    noteKey: 'temp3c'
  },
  {
    id: 'SHP-2025-052',
    code: 'MAD → LYO',
    customer: 'EuroParts',
    route: 'Madrid → Lyon',
    status: 'delayed',
    etaLabelKey: 'delayed25',
    coverage: 'notCovered',
    cargoKey: 'automotive',
    value: '€ 150k',
    contact: 'Julien Besson',
    phone: '+33 4 889 20',
    noteKey: 'ferrySlot'
  },
  {
    id: 'SHP-2025-063',
    code: 'ARN → OSL',
    customer: 'Scandic Retail',
    route: 'Stockholm → Oslo',
    status: 'inTransit',
    etaValue: '21:10',
    coverage: 'covered',
    cargoKey: 'retailMixed',
    value: '€ 72k',
    contact: 'Sara Dahlen',
    phone: '+46 8 200 91',
    noteKey: 'borderCrossed'
  },
  {
    id: 'SHP-2025-074',
    code: 'HEL → RIX',
    customer: 'Baltic Fresh',
    route: 'Helsinki → Riga',
    status: 'incident',
    etaLabelKey: 'hold',
    coverage: 'partial',
    cargoKey: 'seafood',
    value: '€ 58k',
    contact: 'Eeva Paavola',
    phone: '+358 9 120 34',
    noteKey: 'tempDeviation'
  }
]

const coverageCards = [
  {
    titleKey: 'liability',
    policy: 'CL-LOG-2042',
    limit: '€ 500k / incident',
    deductible: '€ 25k',
    statusKey: 'active',
    validity: '01.01 – 31.12.2025'
  },
  {
    titleKey: 'cargo',
    policy: 'CARGO-7718',
    limit: '€ 2 Mio / year',
    deductible: '€ 10k',
    statusKey: 'active',
    validity: '01.04 – 31.03.2026'
  },
  {
    titleKey: 'addons',
    policy: 'Temp & High Value',
    limit: '€ 250k / load',
    deductible: '€ 8k',
    statusKey: 'selective',
    validity: 'Per contract'
  }
]

const incidents: Incident[] = [
  { id: 'INC-01', typeKey: 'theftParking', shipment: 'RTM → CGN', status: 'open', cost: '€ 40k', docs: 6, risk: 'high' },
  { id: 'INC-02', typeKey: 'tempDeviation', shipment: 'HEL → RIX', status: 'review', cost: '€ 8k', docs: 4, risk: 'medium' },
  { id: 'INC-03', typeKey: 'delay12h', shipment: 'BER → FRA', status: 'open', cost: '€ 12k', docs: 3, risk: 'medium' },
  { id: 'INC-04', typeKey: 'damageForklift', shipment: 'MAD → LYO', status: 'closed', cost: '€ 6k', docs: 5, risk: 'low' }
]

const partners: PartnerCard[] = [
  {
    titleKey: 'shipper',
    contact: 'NordCargo AG',
    phone: '+49 40 889 20',
    email: 'dispatch@nordcargo.eu',
    address: 'Speicher 11, Hamburg'
  },
  {
    titleKey: 'consignee',
    contact: 'Metro Logistics',
    phone: '+49 69 200 34',
    email: 'control@metro-log.de',
    address: 'Cargo Park, Frankfurt'
  },
  {
    titleKey: 'broker',
    contact: 'Global Freight BV',
    phone: '+31 10 882 32',
    email: 'operations@globalfreight.com',
    address: 'Maashaven 4, Rotterdam'
  },
  {
    titleKey: 'warehouse',
    contact: 'City Warehouse Köln',
    phone: '+49 221 778 90',
    email: 'info@citywh.de',
    address: 'Industriepark 12, Cologne'
  }
]

const documents = ['CMR.pdf', 'POD.pdf', 'Photos.zip', 'Police-report.pdf', 'Temperature-log.csv', 'Invoice.pdf']

const incidentStatusKey = (status: Incident['status']) => `logisticsApp.incidents.statusLabels.${status}` as const
const incidentRiskKey = (risk: IncidentRisk) => `logisticsApp.incidents.riskLabels.${risk}` as const

export default function LogisticsAppPage() {
  const { t } = useI18n()
  const [statusFilter, setStatusFilter] = useState<'all' | ShipmentStatus>('all')
  const [search, setSearch] = useState('')

  const filteredShipments = useMemo(() => {
    return shipments.filter((shipment) => {
      const matchesStatus = statusFilter === 'all' || shipment.status === statusFilter
      const normalizedQuery = search.trim().toLowerCase()
      const matchesQuery =
        !normalizedQuery ||
        shipment.id.toLowerCase().includes(normalizedQuery) ||
        shipment.route.toLowerCase().includes(normalizedQuery) ||
        shipment.customer.toLowerCase().includes(normalizedQuery)
      return matchesStatus && matchesQuery
    })
  }, [statusFilter, search])

  function badgeStyle(color: string) {
    return {
      background: color,
      color: '#ffffff',
      borderRadius: '999px',
      padding: '0.25rem 0.85rem',
      fontWeight: 700,
      fontSize: '0.85rem',
      textAlign: 'center',
      display: 'inline-block'
    }
  }

  function statusBadge(status: ShipmentStatus) {
    if (status === 'inTransit') return badgeStyle('#16A34A')
    if (status === 'delayed') return badgeStyle('#F97316')
    if (status === 'incident') return badgeStyle('#DC2626')
    return badgeStyle('#2563EB')
  }

  function coverageBadge(status: CoverageStatus) {
    if (status === 'covered') return badgeStyle('#16A34A')
    if (status === 'partial') return badgeStyle('#F97316')
    return badgeStyle('#DC2626')
  }

  function incidentRiskColor(risk: IncidentRisk) {
    if (risk === 'high') return '#DC2626'
    if (risk === 'medium') return '#F97316'
    return '#16A34A'
  }

  const statusFilters: Array<{ key: 'all' | ShipmentStatus; label: string; color?: string }> = [
    { key: 'all', label: t('logisticsApp.filters.statusAll') },
    { key: 'inTransit', label: t('logisticsApp.filters.statusInTransit'), color: '#16A34A' },
    { key: 'delayed', label: t('logisticsApp.filters.statusDelayed'), color: '#F97316' },
    { key: 'delivered', label: t('logisticsApp.filters.statusDelivered'), color: '#2563EB' },
    { key: 'incident', label: t('logisticsApp.filters.statusIncident'), color: '#DC2626' }
  ]

  return (
    <section
      style={{
        minHeight: '100vh',
        width: '100%',
        padding: 'calc(var(--header-height) + 32px) clamp(1rem, 4vw, 3rem) 4rem',
        color: '#ffffff'
      }}
    >
      <div style={{ width: '100%', maxWidth: 1240, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div>
          <p style={{ margin: 0, letterSpacing: '0.32em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.65)' }}>
            {t('logisticsApp.sections.overview')}
          </p>
          <h1 style={{ margin: '0.3rem 0', fontSize: 'clamp(2.4rem, 4vw, 3.4rem)', fontWeight: 700 }}>{t('logisticsApp.title')}</h1>
          <p style={{ margin: 0, color: 'rgba(255,255,255,0.8)', fontSize: '1.1rem' }}>{t('logisticsApp.subtitle')}</p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '0.85rem'
          }}
        >
          {KPI_DATA.map((kpi) => (
            <Card key={kpi.key} variant="glass" style={{ padding: '1rem', minHeight: '110px' }}>
              <p
                style={{
                  margin: 0,
                  color: 'rgba(255,255,255,0.66)',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  fontSize: '0.8rem'
                }}
              >
                {t(`logisticsApp.kpi.${kpi.key}`)}
              </p>
              <p style={{ margin: '0.3rem 0 0', fontSize: '1.8rem', fontWeight: 600 }}>{kpi.value}</p>
            </Card>
          ))}
        </div>

        <Card variant="glass" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1.25rem' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center', justifyContent: 'space-between' }}>
            <h2 style={{ margin: 0 }}>{t('logisticsApp.sections.shipments')}</h2>
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={t('logisticsApp.filters.search')}
              style={{
                flex: '1 1 280px',
                minWidth: '240px',
                borderRadius: '20px',
                border: '1px solid rgba(255,255,255,0.25)',
                background: 'rgba(255,255,255,0.08)',
                color: '#fff',
                padding: '0.5rem 1rem'
              }}
            />
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center' }}>
            <span style={{ color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>{t('logisticsApp.filters.statusLabel')}:</span>
            {statusFilters.map((filter) => (
              <button
                key={filter.key}
                type="button"
                onClick={() => setStatusFilter(filter.key)}
                style={{
                  border: 'none',
                  borderRadius: '999px',
                  padding: '0.4rem 1rem',
                  fontWeight: 600,
                  background: statusFilter === filter.key ? filter.color ?? 'rgba(255,255,255,0.16)' : 'rgba(255,255,255,0.08)',
                  color: '#fff',
                  cursor: 'pointer'
                }}
              >
                {filter.label}
              </button>
            ))}
          </div>
          <div style={{ overflowX: 'auto', paddingBottom: '0.5rem' }}>
            <table style={{ width: '100%', minWidth: '1100px', borderCollapse: 'separate', borderSpacing: 0 }}>
              <caption style={{ textAlign: 'left', marginBottom: '0.75rem', fontWeight: 600, color: '#fff' }}>
                {t('logisticsApp.table.shipments.title')}
              </caption>
              <thead>
                <tr style={{ textAlign: 'left', color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  <th style={{ paddingBottom: '0.6rem' }}>{t('logisticsApp.table.shipments.col.shipment')}</th>
                  <th>{t('logisticsApp.table.shipments.col.customer')}</th>
                  <th>{t('logisticsApp.table.shipments.col.route')}</th>
                  <th>{t('logisticsApp.table.shipments.col.status')}</th>
                  <th>{t('logisticsApp.table.shipments.col.eta')}</th>
                  <th>{t('logisticsApp.table.shipments.col.coverage')}</th>
                  <th>{t('logisticsApp.table.shipments.col.cargo')}</th>
                  <th>{t('logisticsApp.table.shipments.col.value')}</th>
                  <th>{t('logisticsApp.table.shipments.col.thirdParty')}</th>
                  <th>{t('logisticsApp.table.shipments.col.aiHint')}</th>
                </tr>
              </thead>
              <tbody>
                {filteredShipments.length === 0 && (
                  <tr>
                    <td colSpan={10} style={{ padding: '1rem', color: 'rgba(255,255,255,0.75)' }}>
                      {t('logisticsApp.table.shipments.empty')}
                    </td>
                  </tr>
                )}
                {filteredShipments.map((shipment) => (
                  <tr key={shipment.id} style={{ borderTop: '1px solid rgba(255,255,255,0.12)', color: '#fff' }}>
                    <td style={{ padding: '0.6rem 0.35rem' }}>
                      <strong>{shipment.id}</strong>
                      <div style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)' }}>{shipment.code}</div>
                    </td>
                    <td style={{ padding: '0.6rem 0.35rem' }}>{shipment.customer}</td>
                    <td style={{ padding: '0.6rem 0.35rem' }}>{shipment.route}</td>
                    <td style={{ padding: '0.6rem 0.35rem' }}>
                      <span style={statusBadge(shipment.status)}>{t(`logisticsApp.table.statusLabels.${shipment.status}`)}</span>
                    </td>
                    <td style={{ padding: '0.6rem 0.35rem' }}>
                      {shipment.etaLabelKey ? t(`logisticsApp.shipmentsCopy.eta.${shipment.etaLabelKey}`) : shipment.etaValue}
                    </td>
                    <td style={{ padding: '0.6rem 0.35rem' }}>
                      <span style={coverageBadge(shipment.coverage)}>{t(`logisticsApp.table.coverageLabels.${shipment.coverage}`)}</span>
                    </td>
                    <td style={{ padding: '0.6rem 0.35rem' }}>{t(`logisticsApp.shipmentsCopy.cargo.${shipment.cargoKey}`)}</td>
                    <td style={{ padding: '0.6rem 0.35rem' }}>{shipment.value}</td>
                    <td style={{ padding: '0.6rem 0.35rem' }}>
                      <div style={{ fontWeight: 600 }}>{shipment.contact}</div>
                      <div style={{ color: 'rgba(255,255,255,0.7)' }}>{shipment.phone}</div>
                    </td>
                    <td style={{ padding: '0.6rem 0.35rem', color: 'rgba(255,255,255,0.8)' }}>
                      {shipment.noteKey ? t(`logisticsApp.shipmentsCopy.notes.${shipment.noteKey}`) : ''}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <div>
          <h2 style={{ margin: '1rem 0 0.5rem' }}>{t('logisticsApp.sections.coverage')}</h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '1rem'
            }}
          >
          {coverageCards.map((card) => (
            <Card key={card.titleKey} variant="glass" style={{ minHeight: '180px' }}>
              <h3 style={{ marginTop: 0 }}>{t(`logisticsApp.coverageCards.${card.titleKey}.title`)}</h3>
              <p style={{ margin: '0.25rem 0', color: 'rgba(255,255,255,0.78)' }}>
                {t('logisticsApp.coverage.policyId')}: {card.policy}
              </p>
              <p style={{ margin: '0.25rem 0', color: 'rgba(255,255,255,0.78)' }}>
                {t('logisticsApp.coverage.limit')}: {card.limit}
              </p>
              <p style={{ margin: '0.25rem 0', color: 'rgba(255,255,255,0.78)' }}>
                {t('logisticsApp.coverage.deductible')}: {card.deductible}
              </p>
              <p style={{ margin: '0.25rem 0', color: '#D3F261' }}>
                {t('logisticsApp.coverage.status')}: {t(`logisticsApp.coverage.statusLabels.${card.statusKey}`)}
              </p>
              <p style={{ margin: '0.25rem 0', color: 'rgba(255,255,255,0.75)' }}>
                {t('logisticsApp.coverage.validity')}: {card.validity}
              </p>
            </Card>
          ))}
          </div>
        </div>

        <Card variant="glass" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
            <div>
              <h2 style={{ margin: 0 }}>{t('logisticsApp.incidents.title')}</h2>
              <p style={{ margin: 0, color: 'rgba(255,255,255,0.75)' }}>{t('logisticsApp.incidents.subtitle')}</p>
            </div>
            <Button variant="secondary" style={{ background: '#ffffff', color: '#0B1028', borderRadius: '999px' }}>
              {t('logisticsApp.incidents.openIncident')}
            </Button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: '0.85rem' }}>
            {incidents.map((incident) => (
              <div
                key={incident.id}
                style={{
                  padding: '0.9rem 1rem',
                  borderRadius: '16px',
                  border: '1px solid rgba(255,255,255,0.18)',
                  background: 'rgba(255,255,255,0.08)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.75rem' }}>
                  <strong>{t(`logisticsApp.incidents.types.${incident.typeKey}`)}</strong>
                  <span style={badgeStyle(incidentRiskColor(incident.risk))}>{t(incidentRiskKey(incident.risk)).toUpperCase()}</span>
                </div>
                <p style={{ margin: '0.25rem 0 0', color: 'rgba(255,255,255,0.75)' }}>{incident.shipment}</p>
                <p style={{ margin: '0.35rem 0 0', color: 'rgba(255,255,255,0.75)' }}>
                  {t('logisticsApp.incidents.labels.status')}: {t(incidentStatusKey(incident.status))}
                </p>
                <p style={{ margin: '0.1rem 0', color: 'rgba(255,255,255,0.75)' }}>
                  {t('logisticsApp.incidents.labels.cost')}: {incident.cost}
                </p>
                <p style={{ margin: 0, color: 'rgba(255,255,255,0.6)' }}>
                  {incident.docs} {t('logisticsApp.incidents.labels.documents')}
                </p>
              </div>
            ))}
          </div>
        </Card>

        <div>
          <h2 style={{ margin: '1rem 0 0.5rem' }}>{t('logisticsApp.sections.thirdParty')}</h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '1rem'
            }}
          >
          {partners.map((partner) => (
            <Card key={partner.titleKey} variant="glass" style={{ minHeight: '180px' }}>
              <h3 style={{ marginTop: 0 }}>{t(`logisticsApp.thirdParty.${partner.titleKey}`)}</h3>
              <p style={{ margin: '0.2rem 0', fontWeight: 600 }}>{partner.contact}</p>
              <p style={{ margin: '0.2rem 0', color: 'rgba(255,255,255,0.75)' }}>{partner.address}</p>
              <p style={{ margin: '0.2rem 0', color: 'rgba(255,255,255,0.78)' }}>{partner.phone}</p>
              <p style={{ margin: '0.2rem 0', color: 'rgba(255,255,255,0.78)' }}>{partner.email}</p>
            </Card>
          ))}
          </div>
        </div>

        <Card variant="glass">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
            <h2 style={{ margin: 0 }}>{t('logisticsApp.sections.documents')}</h2>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <Button style={{ borderRadius: '999px', padding: '0.45rem 1.2rem', fontWeight: 600 }}>
                {t('logisticsApp.documents.upload')}
              </Button>
              <Button
                variant="secondary"
                style={{ borderRadius: '999px', padding: '0.45rem 1.2rem', fontWeight: 600, background: '#ffffff', color: '#0B1028' }}
              >
                {t('logisticsApp.documents.download')}
              </Button>
            </div>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.85rem', marginTop: '0.75rem' }}>
            {documents.map((doc) => (
              <button
                key={doc}
                type="button"
                style={{
                  border: '1px solid rgba(255,255,255,0.25)',
                  borderRadius: '999px',
                  padding: '0.5rem 1rem',
                  background: 'rgba(255,255,255,0.08)',
                  color: '#fff',
                  fontWeight: 600
                }}
              >
                {doc}
              </button>
            ))}
          </div>
        </Card>
      </div>
    </section>
  )
}
