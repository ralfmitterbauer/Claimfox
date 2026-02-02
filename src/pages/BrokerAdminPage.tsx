import React from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '@/components/ui/Card'
import Header from '@/components/ui/Header'
import { useI18n } from '@/i18n/I18nContext'
import { brokerAdminCustomers } from '@/pages/BrokerAdminCustomerPage'

function translateStatus(value: string, lang: string) {
  const map: Record<string, { en: string; de: string }> = {
    Active: { en: 'Active', de: 'Aktiv' },
    Open: { en: 'Open', de: 'Offen' },
    Closed: { en: 'Closed', de: 'Geschlossen' }
  }
  const entry = map[value]
  if (!entry) return value
  return lang === 'en' ? entry.en : entry.de
}

export default function BrokerAdminPage() {
  const { lang } = useI18n()
  const navigate = useNavigate()
  const [search, setSearch] = React.useState('')
  const [sortKey, setSortKey] = React.useState('renewal')
  const [statusFilter, setStatusFilter] = React.useState('all')
  const [quickFilter, setQuickFilter] = React.useState('all')
  const [filtersOpen, setFiltersOpen] = React.useState(false)

  const now = new Date('2026-02-02T00:00:00Z')
  const renewalsNext60 = brokerAdminCustomers.filter((customer) => {
    const date = new Date(`${customer.renewal}T00:00:00Z`)
    const diffDays = (date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
    return diffDays >= 0 && diffDays <= 60
  }).length

  const openClaimsTotal = brokerAdminCustomers.reduce((sum, customer) => sum + customer.openClaims, 0)

  const kpis = [
    {
      label: lang === 'en' ? 'Accounts' : 'Accounts',
      value: String(brokerAdminCustomers.length)
    },
    {
      label: lang === 'en' ? 'Open claims' : 'Offene Schaeden',
      value: String(openClaimsTotal)
    },
    {
      label: lang === 'en' ? 'Renewals (60d)' : 'Renewals (60T)',
      value: String(renewalsNext60)
    },
    {
      label: lang === 'en' ? 'Active mandates' : 'Aktive Mandate',
      value: '12'
    },
    {
      label: lang === 'en' ? 'Premium in force' : 'Praemienbestand',
      value: 'EUR 6.3M'
    },
    {
      label: lang === 'en' ? 'At risk' : 'Erhoeht',
      value: '7'
    }
  ]

  function parsePremium(value: string) {
    const normalized = value.replace(/[^0-9.kKmM]/g, '')
    const number = parseFloat(normalized.replace(/[kKmM]$/, '')) || 0
    if (normalized.toLowerCase().endsWith('m')) return number * 1_000_000
    if (normalized.toLowerCase().endsWith('k')) return number * 1_000
    return number
  }

  const filteredCustomers = brokerAdminCustomers
    .filter((customer) => {
      const query = search.trim().toLowerCase()
      if (!query) return true
      return (
        customer.name.toLowerCase().includes(query) ||
        customer.policies.some((policy) => policy.policy.toLowerCase().includes(query))
      )
    })
    .filter((customer) => {
      if (statusFilter === 'active') return customer.status === 'Active'
      if (statusFilter === 'risk') {
        const renewalDate = new Date(`${customer.renewal}T00:00:00Z`)
        const diffDays = (renewalDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
        return customer.openClaims >= 3 || (diffDays >= 0 && diffDays <= 60)
      }
      return true
    })
    .filter((customer) => {
      if (quickFilter === 'renewal') {
        const renewalDate = new Date(`${customer.renewal}T00:00:00Z`)
        const diffDays = (renewalDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
        return diffDays >= 0 && diffDays <= 60
      }
      if (quickFilter === 'openClaims') return customer.openClaims > 0
      if (quickFilter === 'noOpenClaims') return customer.openClaims === 0
      return true
    })
    .sort((a, b) => {
      if (sortKey === 'openClaims') return b.openClaims - a.openClaims
      if (sortKey === 'premium') return parsePremium(b.premium) - parsePremium(a.premium)
      if (sortKey === 'renewal') {
        const aDate = new Date(`${a.renewal}T00:00:00Z`).getTime()
        const bDate = new Date(`${b.renewal}T00:00:00Z`).getTime()
        return aDate - bDate
      }
      return 0
    })

  const copy = lang === 'en'
    ? {
        title: 'Broker Administration',
        subtitle: 'Customer list with portfolio overview and access to detail records.',
        columns: ['Customer', 'Region', 'Status', 'Premium', 'Renewal', 'Open claims'],
        action: 'Open record',
        filtersTitle: 'Filters',
        filtersToggle: 'Show filters',
        filtersToggleClose: 'Hide filters',
        searchPlaceholder: 'Search customer or policy',
        sortLabel: 'Sort by',
        sortOptions: [
          { label: 'Renewal date', value: 'renewal' },
          { label: 'Open claims', value: 'openClaims' },
          { label: 'Premium', value: 'premium' }
        ],
        statusLabel: 'Status',
        statusOptions: [
          { label: 'All', value: 'all' },
          { label: 'Active', value: 'active' },
          { label: 'At risk', value: 'risk' }
        ],
        quickLabel: 'Quick filters',
        quickOptions: [
          { label: 'Renewal <= 60 days', value: 'renewal' },
          { label: 'Open claims', value: 'openClaims' },
          { label: 'No open claims', value: 'noOpenClaims' }
        ],
        chipLabel: 'Filter chips'
      }
    : {
        title: 'Broker Administration',
        subtitle: 'Kundenliste mit Portfolio-Uebersicht und Zugriff auf Detaildaten.',
        columns: ['Kunde', 'Region', 'Status', 'Praemien', 'Renewal', 'Offene Schaeden'],
        action: 'Datensatz oeffnen',
        filtersTitle: 'Filter',
        filtersToggle: 'Filter anzeigen',
        filtersToggleClose: 'Filter ausblenden',
        searchPlaceholder: 'Kunde oder Police suchen',
        sortLabel: 'Sortieren nach',
        sortOptions: [
          { label: 'Renewal Datum', value: 'renewal' },
          { label: 'Offene Schaeden', value: 'openClaims' },
          { label: 'Praemien', value: 'premium' }
        ],
        statusLabel: 'Status',
        statusOptions: [
          { label: 'Alle', value: 'all' },
          { label: 'Aktiv', value: 'active' },
          { label: 'Erhoeht', value: 'risk' }
        ],
        quickLabel: 'Schnellfilter',
        quickOptions: [
          { label: 'Renewal <= 60 Tage', value: 'renewal' },
          { label: 'Offene Schaeden', value: 'openClaims' },
          { label: 'Keine offenen Schaeden', value: 'noOpenClaims' }
        ],
        chipLabel: 'Filter-Chips'
      }

  return (
    <section className="uw-page">
      <div className="uw-container">
        <Header title={copy.title} subtitle={copy.subtitle} subtitleColor="#65748b" />

        <style>
          {`
            .broker-admin-kpis { display: grid; grid-template-columns: repeat(6, minmax(0, 1fr)); gap: 0.9rem; }
            @media (max-width: 900px) {
              .broker-admin-kpis { grid-template-columns: repeat(3, minmax(0, 1fr)); }
            }
          `}
        </style>
        <div className="uw-grid uw-kpi broker-admin-kpis" style={{ marginBottom: '1.6rem' }}>
          {kpis.map((item) => (
            <Card key={item.label} title={item.label} variant="glass" className="uw-card">
              <div className="uw-card-body">
                <strong style={{ fontSize: '1.4rem' }}>{item.value}</strong>
              </div>
            </Card>
          ))}
        </div>

        <Card title={copy.filtersTitle} variant="glass" className="uw-card" style={{ marginBottom: '1.6rem' }}>
          <div className="uw-card-body" style={{ gap: '0.75rem' }}>
            <style>
              {`
                .broker-admin-filters-toggle { display: none; }
                @media (max-width: 900px) {
                  .broker-admin-filters-toggle { display: inline-flex; }
                  .broker-admin-filters { display: none; }
                  .broker-admin-filters.is-open { display: grid; }
                }
                .broker-admin-chip-row { display: flex; flex-wrap: wrap; gap: 0.5rem; }
                .broker-admin-chip { border-radius: 999px; font-size: 0.7rem; padding: 0.2rem 0.55rem; }
                .broker-admin-quick-row { display: flex; flex-wrap: wrap; gap: 0.9rem; margin-top: 0.6rem; }
                .broker-admin-chip-row { gap: 0.9rem; margin-top: 0.8rem; }
                @media (max-width: 900px) {
                  .broker-admin-chip-row { gap: 0.6rem; }
                }
              `}
            </style>
            <button
              type="button"
              className="btn btn-outline-primary btn-sm broker-admin-filters-toggle"
              onClick={() => setFiltersOpen((prev) => !prev)}
            >
              {filtersOpen ? copy.filtersToggleClose : copy.filtersToggle}
            </button>
            <div
              className={`broker-admin-filters ${filtersOpen ? 'is-open' : ''}`}
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}
            >
              <div style={{ display: 'grid', gap: '0.35rem' }}>
                <label className="uw-muted" htmlFor="broker-admin-search">{copy.searchPlaceholder}</label>
                <input
                  id="broker-admin-search"
                  type="text"
                  placeholder={copy.searchPlaceholder}
                  className="form-control"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                />
              </div>
              <div style={{ display: 'grid', gap: '0.35rem' }}>
                <label className="uw-muted" htmlFor="broker-admin-sort">{copy.sortLabel}</label>
                <select
                  id="broker-admin-sort"
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
                <label className="uw-muted" htmlFor="broker-admin-status">{copy.statusLabel}</label>
                <select
                  id="broker-admin-status"
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
            <div className={`broker-admin-filters broker-admin-quick-row ${filtersOpen ? 'is-open' : ''}`}>
              <span className="uw-muted" style={{ marginRight: '0.5rem' }}>{copy.quickLabel}</span>
              {copy.quickOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className={`btn btn-sm broker-admin-chip ${quickFilter === option.value ? 'btn-primary' : 'btn-outline-secondary'}`}
                  onClick={() => setQuickFilter(quickFilter === option.value ? 'all' : option.value)}
                >
                  {option.label}
                </button>
              ))}
            </div>
            <div className="broker-admin-chip-row">
              <span className="uw-muted" style={{ marginRight: '0.5rem' }}>{copy.chipLabel}</span>
              {copy.statusOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className={`btn btn-sm broker-admin-chip ${statusFilter === option.value ? 'btn-primary' : 'btn-outline-secondary'}`}
                  onClick={() => setStatusFilter(option.value)}
                >
                  {option.label}
                </button>
              ))}
              {copy.sortOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className={`btn btn-sm broker-admin-chip ${sortKey === option.value ? 'btn-primary' : 'btn-outline-secondary'}`}
                  onClick={() => setSortKey(option.value)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </Card>

        <Card title={lang === 'en' ? 'Customer records' : 'Kundendaten'} variant="glass" className="uw-card">
          <div className="uw-card-body" style={{ gap: '0.75rem' }}>
            <style>
              {`
                .broker-admin-table { display: grid; gap: 0.75rem; }
                .broker-admin-cards { display: none; gap: 1.1rem; }
                @media (max-width: 900px) {
                  .broker-admin-table { display: none; }
                  .broker-admin-cards { display: grid; }
                  .broker-admin-cards .uw-card { padding: 1.1rem; }
                  .broker-admin-cards .uw-card-body { gap: 0.6rem; }
                  .broker-admin-cards .badge { font-size: 0.68rem; }
                }
              `}
            </style>
            <div className="broker-admin-table">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.75rem', fontSize: '0.85rem' }}>
                {copy.columns.map((col) => (
                  <strong key={col} className="uw-muted">{col}</strong>
                ))}
                <span />
              </div>

              {filteredCustomers.map((customer) => (
                <div key={customer.id} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.75rem', alignItems: 'center' }}>
                  <strong>{customer.name}</strong>
                  <span className="uw-muted">{customer.region}</span>
                  <span className="uw-muted">{translateStatus(customer.status, lang)}</span>
                  <span className="uw-muted">{customer.premium}</span>
                  <span className="uw-muted">{customer.renewal}</span>
                  <span className="uw-muted">{customer.openClaims}</span>
                  <button
                    type="button"
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => navigate(`/broker-admin/customer/${customer.id}`)}
                  >
                    {copy.action}
                  </button>
                </div>
              ))}
            </div>

            <div className="broker-admin-cards">
              {filteredCustomers.map((customer) => (
                <Card key={customer.id} title={customer.name} variant="glass" className="uw-card">
                  <div className="uw-card-body" style={{ gap: '0.5rem' }}>
                    <div className="uw-muted">{customer.region}</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      <span className="badge bg-blue-lt">{translateStatus(customer.status, lang)}</span>
                      <span className="badge bg-azure-lt">{customer.premium}</span>
                      <span className="badge bg-orange-lt">{customer.renewal}</span>
                      <span className="badge bg-teal-lt">
                        {lang === 'en' ? 'Open claims' : 'Offene Schaeden'}: {customer.openClaims}
                      </span>
                    </div>
                    <button
                      type="button"
                      className="btn btn-primary btn-sm"
                      onClick={() => navigate(`/broker-admin/customer/${customer.id}`)}
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
