import React, { useMemo, useState } from 'react'
import { leads } from '@/data/leads'
import { markets } from '@/data/markets'
import { buildLeadMetrics } from '@/lib/calc'
import { formatMoneyCompactEUR, formatMoneyExactEUR, formatPercent } from '@/lib/format'
import HeroSplit from '@/components/HeroSplit'
import DotsPattern from '@/components/DotsPattern'
import SectionSplit from '@/components/SectionSplit'
import FeatureCards from '@/components/FeatureCards'
import DarkBenefitSection from '@/components/DarkBenefitSection'
import ChartsTopLeads from '@/components/ChartsTopLeads'
import ChartsGermanyVsEurope from '@/components/ChartsGermanyVsEurope'
import ChartsCategoryMix from '@/components/ChartsCategoryMix'
import LeadsTable from '@/components/LeadsTable'
import LeadDrawer from '@/components/LeadDrawer'
import SourcesDrawer from '@/components/SourcesDrawer'
import heroImage from '@/assets/images/hero_block_1.png'
import marketImage from '@/assets/images/logistik_portal.png'
import modelImage from '@/assets/images/insurance_processes.png'
import thanksImage from '@/assets/images/partner_insurance.png'
import { useI18n } from '@/i18n/I18nContext'

const sources = [
  {
    id: 'anchors',
    title: 'Market Anchors (Mid-Case)',
    publisher: 'Insurfox',
    year: 2024,
    documentType: 'Internal model',
    lastVerified: '2026-01-22',
    url: 'TBD'
  }
]

export default function EnterpriseLeadsPage() {
  const { lang } = useI18n()
  const [region, setRegion] = useState<'DE' | 'EU'>('DE')
  const [category, setCategory] = useState<'All' | 'Operator' | 'Platform' | 'Broker'>('All')
  const [search, setSearch] = useState('')
  const [drawerLead, setDrawerLead] = useState<typeof leads[number] | undefined>()
  const [sourcesOpen, setSourcesOpen] = useState(false)
  const locale = lang === 'de' ? 'de-DE' : 'en-GB'

  const leadMetrics = useMemo(() => buildLeadMetrics(leads), [])
  const marketValue = region === 'DE' ? markets.DE : markets.EU

  const filteredLeads = leadMetrics.filter((lead) => {
    if (category !== 'All' && lead.category !== category) {
      return false
    }
    if (search && !lead.name.toLowerCase().includes(search.toLowerCase())) {
      return false
    }
    return true
  })

  const totalExposure = filteredLeads.reduce((sum, lead) => {
    return sum + (region === 'DE' ? lead.exposureDE : lead.exposureEU)
  }, 0)

  const topLeadData = [...filteredLeads]
    .sort((a, b) => (region === 'DE' ? b.exposureDE - a.exposureDE : b.exposureEU - a.exposureEU))
    .slice(0, 8)
    .map((lead) => ({
      name: lead.name,
      value: region === 'DE' ? lead.exposureDE : lead.exposureEU
    }))

  const categoryMix = [
    {
      label: 'Exposure Mix',
      direct: filteredLeads.filter((lead) => lead.exposureType === 'Direct').length,
      indirect: filteredLeads.filter((lead) => lead.exposureType === 'Indirect').length,
      brokered: filteredLeads.filter((lead) => lead.exposureType === 'Brokered').length
    }
  ]

  const compareData = [
    { label: 'DE', value: markets.DE },
    { label: 'EU', value: markets.EU }
  ]

  function handleExport(type: 'kpi' | 'table' | 'sources') {
    const timestamp = new Date().toISOString()
    if (type === 'kpi') {
      const payload = {
        region,
        market: marketValue,
        totalExposure,
        timestamp
      }
      const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `enterprise-leads-kpis-${region}.json`
      link.click()
      URL.revokeObjectURL(url)
      return
    }
    if (type === 'table') {
      const headers = ['Lead', 'Category', 'Exposure DE', 'Exposure EU', 'Share DE', 'Share EU', 'Exposure Type']
      const rows = filteredLeads.map((lead) => [
        lead.name,
        lead.category,
        formatMoneyCompactEUR(lead.exposureDE, locale),
        formatMoneyCompactEUR(lead.exposureEU, locale),
        formatPercent(lead.shareDE, locale),
        formatPercent(lead.shareEU, locale),
        lead.exposureType
      ].join(','))
      const csv = [headers.join(','), ...rows].join('\n')
      const blob = new Blob([csv], { type: 'text/csv' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `enterprise-leads-${region}.csv`
      link.click()
      URL.revokeObjectURL(url)
      return
    }
    const sourceHeaders = ['Title', 'Publisher', 'Year', 'Document Type', 'Last Verified', 'URL']
    const sourceRows = sources.map((source) =>
      [source.title, source.publisher, `${source.year}`, source.documentType, source.lastVerified, source.url || 'TBD']
        .join(',')
    )
    const csv = [sourceHeaders.join(','), ...sourceRows].join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'enterprise-leads-sources.csv'
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <section className="page enterprise-leads-page">
      <div className="enterprise-container">
        <nav className="enterprise-nav" aria-label="Primary">
          <a href="#overview">Overview</a>
          <a href="#market">Market</a>
          <a href="#model">Model</a>
          <a href="#data">Data</a>
          <a href="#methodology">Methodology</a>
          <a href="#thanks">Thanks</a>
        </nav>
        <div id="overview">
          <HeroSplit
            title="Enterprise Lead Intelligence"
            subtitle="Model-based exposure mapping for fleet, freight and composite insurance. Exposure is not premium, not revenue."
            locale={locale}
            pills={[
              { label: 'DE Market', value: markets.DE },
              { label: 'EU Market', value: markets.EU },
              { label: 'Leads', value: filteredLeads.length, format: 'count' },
              { label: 'Total Exposure', value: totalExposure || marketValue }
            ]}
            region={region}
            onRegionChange={setRegion}
            onExport={handleExport}
            imageUrl={heroImage}
          />
        </div>

        <div id="market">
          <SectionSplit
          title="Market / Opportunity"
          body="Germany and EEA anchors provide a top-down corridor for fleet and logistics exposure. Exposure calculations are model-based and not equivalent to premium or revenue."
          imageUrl={marketImage}
          />
        </div>

        <FeatureCards
          features={[
            {
              number: '01',
              title: 'Market Anchors',
              body: 'DE and EU anchors provide a consistent base for exposure estimates.'
            },
            {
              number: '02',
              title: 'Segmentation',
              body: 'Operators, Platforms, Brokers with explicit exposure type mapping.'
            }
          ]}
        />

        <div id="model">
          <DarkBenefitSection
          title="Solution / Model"
          benefits={[
            { title: 'Direct Exposure', body: 'Operators with asset-based exposure and fleet risk.' },
            { title: 'Indirect Exposure', body: 'Platforms reflecting network-driven risk.' },
            { title: 'Brokered Exposure', body: 'Structured volume via risk advisors.' }
          ]}
          imageUrl={modelImage}
          />
        </div>

        <section className="data-section" id="data">
          <div className="filter-bar">
            {(['All', 'Operator', 'Platform', 'Broker'] as const).map((item) => (
              <button
                key={item}
                type="button"
                className={`filter-chip ${category === item ? 'is-active' : ''}`}
                onClick={() => setCategory(item)}
                aria-pressed={category === item}
              >
                {item}
              </button>
            ))}
            <input
              type="search"
              placeholder="Search lead"
              aria-label="Search lead"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="filter-chip"
            />
            <button type="button" className="filter-chip" onClick={() => setSourcesOpen(true)}>
              Sources
            </button>
          </div>

          <div className="charts-grid">
            <ChartsTopLeads data={topLeadData} locale={locale} />
            <ChartsGermanyVsEurope data={compareData} locale={locale} />
            <ChartsCategoryMix data={categoryMix} />
          </div>

          <div className="card">
            <h3>Enterprise Leads</h3>
            <p className="disclaimer">
              Indicative annual insurance exposure (model-based). Exposure is not premium, not revenue.
            </p>
          </div>
          <LeadsTable leads={filteredLeads} locale={locale} onSelect={setDrawerLead} />
        </section>

        <section className="section-split" id="methodology">
          <div>
            <h2>Methodology & Compliance</h2>
            <p>
              Top-down anchors combined with lead segmentation. Public company-level premium data is
              not disclosed. Exposure ≠ premium ≠ revenue.
            </p>
            <ul>
              <li>Operators = Direct exposure</li>
              <li>Platforms = Indirect exposure</li>
              <li>Brokers = Brokered exposure</li>
            </ul>
          </div>
          <div className="visual-card">
            <img src={marketImage} alt="" />
          </div>
        </section>

        <section className="thanks-section" id="thanks">
          <DotsPattern className="hero-dots" />
          <div>
            <h2>Thank you</h2>
            <p className="disclaimer">contact@insurfox.com · placeholder</p>
          </div>
          <div className="thanks-visual">
            <img src={thanksImage} alt="" />
          </div>
        </section>
      </div>

      <LeadDrawer lead={drawerLead} locale={locale} onClose={() => setDrawerLead(undefined)} />
      <SourcesDrawer open={sourcesOpen} sources={sources} onClose={() => setSourcesOpen(false)} />
    </section>
  )
}
