import React from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '@/components/ui/Card'
import Header from '@/components/ui/Header'
import { useI18n } from '@/i18n/I18nContext'

type FleetRecord = {
  id: string
  vehicleId: string
  region: string
  status: 'Operational' | 'At risk' | 'Maintenance'
  nextService: string
  mileage: string
  incidents: number
  operator: string
}

export const fleetRecords: FleetRecord[] = [
  { id: 'fl-1001', vehicleId: 'DE-MF 421', region: 'DE-BY', status: 'Operational', nextService: '2026-03-12', mileage: '118,400 km', incidents: 1, operator: 'Atlas Logistics' },
  { id: 'fl-1002', vehicleId: 'DE-KL 882', region: 'DE-NW', status: 'At risk', nextService: '2026-02-18', mileage: '142,900 km', incidents: 2, operator: 'WestCargo' },
  { id: 'fl-1003', vehicleId: 'DE-HH 518', region: 'DE-HH', status: 'Operational', nextService: '2026-04-05', mileage: '98,200 km', incidents: 0, operator: 'Hanse Trans' },
  { id: 'fl-1004', vehicleId: 'DE-BW 310', region: 'DE-BW', status: 'Maintenance', nextService: '2026-02-07', mileage: '156,700 km', incidents: 3, operator: 'EuroFleet' },
  { id: 'fl-1005', vehicleId: 'DE-HE 774', region: 'DE-HE', status: 'Operational', nextService: '2026-03-28', mileage: '88,600 km', incidents: 1, operator: 'Rhein Cargo' },
  { id: 'fl-1006', vehicleId: 'DE-RP 442', region: 'DE-RP', status: 'At risk', nextService: '2026-02-22', mileage: '132,300 km', incidents: 2, operator: 'Rheinland Transport' },
  { id: 'fl-1007', vehicleId: 'DE-SN 019', region: 'DE-SN', status: 'Operational', nextService: '2026-03-16', mileage: '74,500 km', incidents: 0, operator: 'Ibex Freight' },
  { id: 'fl-1008', vehicleId: 'DE-SH 640', region: 'DE-SH', status: 'Operational', nextService: '2026-03-02', mileage: '65,700 km', incidents: 1, operator: 'NorthSea Logistics' },
  { id: 'fl-1009', vehicleId: 'DE-BE 902', region: 'DE-BE', status: 'Maintenance', nextService: '2026-02-10', mileage: '149,900 km', incidents: 3, operator: 'Central Rail Cargo' },
  { id: 'fl-1010', vehicleId: 'AT-W 615', region: 'AT', status: 'Operational', nextService: '2026-04-11', mileage: '90,000 km', incidents: 0, operator: 'Danube Logistik' },
  { id: 'fl-1011', vehicleId: 'CH-ZH 220', region: 'CH', status: 'Operational', nextService: '2026-03-21', mileage: '112,800 km', incidents: 1, operator: 'Helvetia Trans' },
  { id: 'fl-1012', vehicleId: 'DE-NI 303', region: 'DE-NI', status: 'At risk', nextService: '2026-02-26', mileage: '137,400 km', incidents: 2, operator: 'Delta Haulage' },
  { id: 'fl-1013', vehicleId: 'DE-BB 775', region: 'DE-BB', status: 'Operational', nextService: '2026-03-09', mileage: '84,300 km', incidents: 1, operator: 'Eastern Mobility' },
  { id: 'fl-1014', vehicleId: 'DE-HH 412', region: 'DE-HH', status: 'Operational', nextService: '2026-04-01', mileage: '73,200 km', incidents: 0, operator: 'Cityline Logistics' },
  { id: 'fl-1015', vehicleId: 'DE-BW 881', region: 'DE-BW', status: 'At risk', nextService: '2026-02-15', mileage: '145,600 km', incidents: 2, operator: 'Skyline Transport' }
]

export default function FleetDashboardPage() {
  const { lang } = useI18n()
  const navigate = useNavigate()
  const [search, setSearch] = React.useState('')
  const [sortKey, setSortKey] = React.useState('service')
  const [statusFilter, setStatusFilter] = React.useState('all')
  const [quickFilter, setQuickFilter] = React.useState('all')
  const [filtersOpen, setFiltersOpen] = React.useState(false)

  const GLASS_TEXT = '#0e0d1c'
  const GLASS_SUBTLE = '#64748b'

  const kpis = [
    { label: lang === 'en' ? 'Active vehicles' : 'Aktive Fahrzeuge', value: String(fleetRecords.length) },
    { label: lang === 'en' ? 'At risk' : 'Erhoeht', value: String(fleetRecords.filter((r) => r.status === 'At risk').length) },
    { label: lang === 'en' ? 'Maintenance' : 'Wartung', value: String(fleetRecords.filter((r) => r.status === 'Maintenance').length) },
    { label: lang === 'en' ? 'Open incidents' : 'Offene Incidents', value: '6' },
    { label: lang === 'en' ? 'Upcoming service' : 'Service faellig', value: '4' },
    { label: lang === 'en' ? 'Compliance alerts' : 'Compliance Alerts', value: '2' }
  ]

  const copy = lang === 'en'
    ? {
        title: 'Fleet dashboard',
        subtitle: 'Operational view for fleet health, incidents and service planning.',
        columns: ['Vehicle', 'Region', 'Status', 'Next service', 'Mileage', 'Incidents', 'Operator'],
        action: 'Open record',
        filtersTitle: 'Filters',
        filtersToggle: 'Show filters',
        filtersToggleClose: 'Hide filters',
        searchPlaceholder: 'Search vehicle or operator',
        sortLabel: 'Sort by',
        sortOptions: [
          { label: 'Next service', value: 'service' },
          { label: 'Incidents', value: 'incidents' },
          { label: 'Mileage', value: 'mileage' }
        ],
        statusLabel: 'Status',
        statusOptions: [
          { label: 'All', value: 'all' },
          { label: 'Operational', value: 'operational' },
          { label: 'At risk', value: 'risk' },
          { label: 'Maintenance', value: 'maintenance' }
        ],
        quickLabel: 'Quick filters',
        quickOptions: [
          { label: 'At risk', value: 'risk' },
          { label: 'Maintenance', value: 'maintenance' },
          { label: 'Operational', value: 'operational' }
        ],
        chipLabel: 'Filter chips'
      }
    : {
        title: 'Flotten-Dashboard',
        subtitle: 'Operative Sicht fuer Flottenzustand, Incidents und Serviceplanung.',
        columns: ['Fahrzeug', 'Region', 'Status', 'Naechster Service', 'Kilometer', 'Incidents', 'Operator'],
        action: 'Datensatz oeffnen',
        filtersTitle: 'Filter',
        filtersToggle: 'Filter anzeigen',
        filtersToggleClose: 'Filter ausblenden',
        searchPlaceholder: 'Fahrzeug oder Operator suchen',
        sortLabel: 'Sortieren nach',
        sortOptions: [
          { label: 'Naechster Service', value: 'service' },
          { label: 'Incidents', value: 'incidents' },
          { label: 'Kilometer', value: 'mileage' }
        ],
        statusLabel: 'Status',
        statusOptions: [
          { label: 'Alle', value: 'all' },
          { label: 'Operational', value: 'operational' },
          { label: 'Erhoeht', value: 'risk' },
          { label: 'Wartung', value: 'maintenance' }
        ],
        quickLabel: 'Schnellfilter',
        quickOptions: [
          { label: 'Erhoeht', value: 'risk' },
          { label: 'Wartung', value: 'maintenance' },
          { label: 'Operational', value: 'operational' }
        ],
        chipLabel: 'Filter-Chips'
      }

  function parseMileage(value: string) {
    return parseFloat(value.replace(/[^0-9.]/g, '')) || 0
  }

  const filteredRecords = fleetRecords
    .filter((record) => {
      const query = search.trim().toLowerCase()
      if (!query) return true
      return record.vehicleId.toLowerCase().includes(query) || record.operator.toLowerCase().includes(query)
    })
    .filter((record) => {
      if (statusFilter === 'operational') return record.status === 'Operational'
      if (statusFilter === 'risk') return record.status === 'At risk'
      if (statusFilter === 'maintenance') return record.status === 'Maintenance'
      return true
    })
    .filter((record) => {
      if (quickFilter === 'risk') return record.status === 'At risk'
      if (quickFilter === 'maintenance') return record.status === 'Maintenance'
      if (quickFilter === 'operational') return record.status === 'Operational'
      return true
    })
    .sort((a, b) => {
      if (sortKey === 'incidents') return b.incidents - a.incidents
      if (sortKey === 'mileage') return parseMileage(b.mileage) - parseMileage(a.mileage)
      if (sortKey === 'service') return new Date(a.nextService).getTime() - new Date(b.nextService).getTime()
      return 0
    })

  return (
    <section className="page" style={{ gap: '1.5rem' }}>
      <div
        style={{
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem'
        }}
      >
        <Header title={copy.title} subtitle={copy.subtitle} subtitleColor={GLASS_SUBTLE} titleColor="#D4380D" />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
          {kpis.map((item) => (
            <Card key={item.label} variant="glass">
              <p style={{ margin: 0, color: GLASS_TEXT, fontSize: '0.95rem' }}>{item.label}</p>
              <div style={{ marginTop: '0.5rem', fontSize: '2rem', fontWeight: 700, color: GLASS_TEXT }}>{item.value}</div>
            </Card>
          ))}
        </div>

        <Card title={copy.filtersTitle} variant="glass">
          <div style={{ display: 'grid', gap: '0.9rem' }}>
            <style>
              {`
                .fleet-filters-toggle { display: none; }
                @media (max-width: 900px) {
                  .fleet-filters-toggle { display: inline-flex; }
                  .fleet-filters { display: none; }
                  .fleet-filters.is-open { display: grid; }
                }
                .fleet-chip { border-radius: 999px; font-size: 0.7rem; padding: 0.2rem 0.55rem; }
                .fleet-quick-row { display: flex; flex-wrap: wrap; gap: 0.9rem; margin-top: 0.6rem; }
                .fleet-chip-row { display: flex; flex-wrap: wrap; gap: 0.9rem; margin-top: 0.8rem; }
                @media (max-width: 900px) {
                  .fleet-chip-row { gap: 0.6rem; }
                }
              `}
            </style>
            <button
              type="button"
              className="btn btn-outline-primary btn-sm fleet-filters-toggle"
              onClick={() => setFiltersOpen((prev) => !prev)}
            >
              {filtersOpen ? copy.filtersToggleClose : copy.filtersToggle}
            </button>
            <div
              className={`fleet-filters ${filtersOpen ? 'is-open' : ''}`}
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}
            >
              <div style={{ display: 'grid', gap: '0.35rem' }}>
                <label className="text-muted" htmlFor="fleet-search">{copy.searchPlaceholder}</label>
                <input
                  id="fleet-search"
                  type="text"
                  placeholder={copy.searchPlaceholder}
                  className="form-control"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                />
              </div>
              <div style={{ display: 'grid', gap: '0.35rem' }}>
                <label className="text-muted" htmlFor="fleet-sort">{copy.sortLabel}</label>
                <select
                  id="fleet-sort"
                  className="form-select"
                  value={sortKey}
                  onChange={(event) => setSortKey(event.target.value)}
                >
                  {copy.sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
              <div style={{ display: 'grid', gap: '0.35rem' }}>
                <label className="text-muted" htmlFor="fleet-status">{copy.statusLabel}</label>
                <select
                  id="fleet-status"
                  className="form-select"
                  value={statusFilter}
                  onChange={(event) => setStatusFilter(event.target.value)}
                >
                  {copy.statusOptions.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className={`fleet-filters fleet-quick-row ${filtersOpen ? 'is-open' : ''}`}>
              <span style={{ marginRight: '0.5rem', color: GLASS_SUBTLE, fontSize: '0.85rem' }}>{copy.quickLabel}</span>
              {copy.quickOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className={`btn btn-sm fleet-chip ${quickFilter === option.value ? 'btn-primary' : 'btn-outline-secondary'}`}
                  onClick={() => setQuickFilter(quickFilter === option.value ? 'all' : option.value)}
                >
                  {option.label}
                </button>
              ))}
            </div>
            <div className="fleet-chip-row">
              <span style={{ marginRight: '0.5rem', color: GLASS_SUBTLE, fontSize: '0.85rem' }}>{copy.chipLabel}</span>
              {copy.statusOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className={`btn btn-sm fleet-chip ${statusFilter === option.value ? 'btn-primary' : 'btn-outline-secondary'}`}
                  onClick={() => setStatusFilter(option.value)}
                >
                  {option.label}
                </button>
              ))}
              {copy.sortOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className={`btn btn-sm fleet-chip ${sortKey === option.value ? 'btn-primary' : 'btn-outline-secondary'}`}
                  onClick={() => setSortKey(option.value)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </Card>

        <Card title={lang === 'en' ? 'Fleet records' : 'Flottenrecords'} variant="glass">
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            <style>
              {`
                .fleet-table { display: grid; gap: 0.75rem; }
                .fleet-cards { display: none; gap: 1.1rem; }
                @media (max-width: 900px) {
                  .fleet-table { display: none; }
                  .fleet-cards { display: grid; }
                }
              `}
            </style>
            <div className="fleet-table">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 0.7fr 0.9fr 1fr 1fr 0.7fr 1.2fr 1fr', gap: '0.75rem', fontSize: '0.85rem' }}>
                {copy.columns.map((col) => (
                  <strong key={col} style={{ color: GLASS_SUBTLE }}>{col}</strong>
                ))}
                <span />
              </div>
              {filteredRecords.map((record) => (
                <div key={record.id} style={{ display: 'grid', gridTemplateColumns: '1fr 0.7fr 0.9fr 1fr 1fr 0.7fr 1.2fr 1fr', gap: '0.75rem', alignItems: 'center' }}>
                  <strong>{record.vehicleId}</strong>
                  <span style={{ color: GLASS_SUBTLE }}>{record.region}</span>
                  <span style={{ color: GLASS_SUBTLE }}>{record.status}</span>
                  <span style={{ color: GLASS_SUBTLE }}>{record.nextService}</span>
                  <span style={{ color: GLASS_SUBTLE }}>{record.mileage}</span>
                  <span style={{ color: GLASS_SUBTLE }}>{record.incidents}</span>
                  <span style={{ color: GLASS_SUBTLE }}>{record.operator}</span>
                  <button
                    type="button"
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => navigate(`/fleet-dashboard/record/${record.id}`)}
                  >
                    {copy.action}
                  </button>
                </div>
              ))}
            </div>

            <div className="fleet-cards">
              {filteredRecords.map((record) => (
                <Card key={record.id} title={record.vehicleId} variant="glass">
                  <div style={{ display: 'grid', gap: '0.5rem' }}>
                    <div style={{ color: GLASS_SUBTLE }}>{record.region}</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      <span className="badge bg-blue-lt">{record.status}</span>
                      <span className="badge bg-azure-lt">{record.nextService}</span>
                      <span className="badge bg-orange-lt">{record.mileage}</span>
                      <span className="badge bg-teal-lt">{record.incidents} Incidents</span>
                    </div>
                    <div style={{ color: GLASS_SUBTLE }}>{record.operator}</div>
                    <button
                      type="button"
                      className="btn btn-primary btn-sm"
                      onClick={() => navigate(`/fleet-dashboard/record/${record.id}`)}
                    >
                      {copy.action}
                    </button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}
