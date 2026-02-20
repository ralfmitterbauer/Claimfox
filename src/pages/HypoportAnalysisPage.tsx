import { useMemo, useState, type CSSProperties } from 'react'
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis } from 'recharts'
import Card from '@/components/ui/Card'
import Header from '@/components/ui/Header'
import Button from '@/components/ui/Button'
import { useI18n } from '@/i18n/I18nContext'

type BiText = { de: string; en: string }

type ComparisonRow = {
  category: BiText
  hypoport: BiText
  insurfox: BiText
}

type MatrixPoint = {
  name: BiText
  overlap: number
  value: number
}

type RiskRow = {
  label: BiText
  likelihood: number
  impact: number
}

type ContactPerson = {
  name: string
  role: BiText
  focus: BiText
  reachout: BiText
  source: string
}

const profileKpis = {
  hypoport: [
    { label: 'Employees', value: 'approx. 2,000+' },
    { label: 'HQ', value: 'Berlin, Germany' },
    { label: 'Listed', value: 'Frankfurt (Prime Standard)' },
    { label: 'Revenue', value: 'approx. high 3-digit EUR m range' },
    { label: 'Segments', value: 'Credit, Insurance, Real Estate Platforms' }
  ],
  insurfox: [
    { label: 'Modules', value: 'Brokerfox / Claimsfox / Fleetfox / Partnerfox / AI Fox' },
    { label: 'Model', value: 'Hybrid MGA + Broker + Platform' },
    { label: 'AI', value: 'UW + FNOL + Claims + Ops orchestration' },
    { label: 'Focus', value: 'Logistics / Fleet / Mobility' },
    { label: 'Execution', value: 'Operational insurance workflow depth' }
  ]
}

const comparisonRows: ComparisonRow[] = [
  {
    category: { de: 'Regulatory status', en: 'Regulatory status' },
    hypoport: { de: 'Technologie-/Plattformholding; kein eigener Carrier', en: 'Technology/platform holding; no own carrier' },
    insurfox: { de: 'Hybrid MGA/Broker-Operating-Modell', en: 'Hybrid MGA/broker operating model' }
  },
  {
    category: { de: 'Underwriting authority', en: 'Underwriting authority' },
    hypoport: { de: 'Keine originäre Underwriting Authority im Holdingmodell', en: 'No native underwriting authority in holding model' },
    insurfox: { de: 'Delegated-Authority-Pfad im MGA-Kontext', en: 'Delegated authority path in MGA context' }
  },
  {
    category: { de: 'Claims execution depth', en: 'Claims execution depth' },
    hypoport: { de: 'Indirekt über Plattform-/Servicepartner', en: 'Indirect via platform/service partners' },
    insurfox: { de: 'Direkt in Claimsfox-Workflows inkl. FNOL', en: 'Direct in Claimsfox workflows incl. FNOL' }
  },
  {
    category: { de: 'Distribution power', en: 'Distribution power' },
    hypoport: { de: 'Stark über deutsche Distributions- und Makleranbindung', en: 'Strong via German distribution and broker connectivity' },
    insurfox: { de: 'Aufbauend, vertikal fokussiert', en: 'Building, vertically focused' }
  },
  {
    category: { de: 'Platform depth', en: 'Platform depth' },
    hypoport: { de: 'Hoch in Marktplatz-/Prozessinfrastruktur', en: 'High in marketplace/process infrastructure' },
    insurfox: { de: 'Hoch in End-to-end Execution Layer', en: 'High in end-to-end execution layer' }
  },
  {
    category: { de: 'AI integration in operations', en: 'AI integration in operations' },
    hypoport: { de: 'Selektiv und partnerabhängig', en: 'Selective and partner-dependent' },
    insurfox: { de: 'Kernbestandteil operativer UW-/Claims-Prozesse', en: 'Core to operational UW/claims processes' }
  },
  {
    category: { de: 'Capital access / funding logic', en: 'Capital access / funding logic' },
    hypoport: { de: 'Kapitalmarktorientierte Holdinglogik', en: 'Capital-market oriented holding logic' },
    insurfox: { de: 'Wachstums- und partnergetriebene Skalierungslogik', en: 'Growth and partner-driven scaling logic' }
  },
  {
    category: { de: 'Data ownership', en: 'Data ownership' },
    hypoport: { de: 'Plattform-/Distributionsnah mit Netzwerkabhängigkeit', en: 'Platform/distribution-centric with network dependencies' },
    insurfox: { de: 'Plattformzentrierte End-to-end Datensicht', en: 'Platform-centric end-to-end data view' }
  },
  {
    category: { de: 'Embedded insurance capability', en: 'Embedded insurance capability' },
    hypoport: { de: 'Stark über Distributionsinfrastruktur', en: 'Strong through distribution infrastructure' },
    insurfox: { de: 'Stark über modulare API- und Workflow-Architektur', en: 'Strong via modular API and workflow architecture' }
  },
  {
    category: { de: 'Conflict potential', en: 'Conflict potential' },
    hypoport: { de: 'Mittel-Hoch bei Channel-/Ownership-Überschneidung', en: 'Medium-high in channel/ownership overlap' },
    insurfox: { de: 'Mittel bei Multi-Role-Ausbau', en: 'Medium in multi-role expansion' }
  }
]

const businessMix = [
  { segment: 'Platform & Technology', value: 46 },
  { segment: 'Financial Services', value: 34 },
  { segment: 'Insurance-related Services', value: 20 }
]

const geoMix = [
  { region: 'Germany', value: 78 },
  { region: 'Europe ex DE', value: 17 },
  { region: 'Other', value: 5 }
]

const relationshipPoints: MatrixPoint[] = [
  { name: { de: 'Distribution Infrastructure Partner', en: 'Distribution Infrastructure Partner' }, overlap: 44, value: 89 },
  { name: { de: 'Technology Benchmark', en: 'Technology Benchmark' }, overlap: 51, value: 82 },
  { name: { de: 'Data/Workflow Standard Setter', en: 'Data/Workflow Standard Setter' }, overlap: 57, value: 85 },
  { name: { de: 'Direct Channel Competitor', en: 'Direct Channel Competitor' }, overlap: 80, value: 43 },
  { name: { de: 'Dependency Risk (if embedded distribution)', en: 'Dependency Risk (if embedded distribution)' }, overlap: 72, value: 58 }
]

const riskRows: RiskRow[] = [
  { label: { de: 'Distribution overlap in fleet/logistics', en: 'Distribution overlap in fleet/logistics' }, likelihood: 4, impact: 5 },
  { label: { de: 'Data ownership & broker relationship tension', en: 'Data ownership & broker relationship tension' }, likelihood: 4, impact: 4 },
  { label: { de: 'Platform dependency concentration risk', en: 'Platform dependency concentration risk' }, likelihood: 3, impact: 5 },
  { label: { de: 'Governance / compliance alignment risk', en: 'Governance / compliance alignment risk' }, likelihood: 3, impact: 4 },
  { label: { de: 'Commercial steering conflict (customer ownership)', en: 'Commercial steering conflict (customer ownership)' }, likelihood: 4, impact: 4 }
]

const optionData = [
  { option: 'A', label: { de: 'Coexist + avoid channel conflict', en: 'Coexist + avoid channel conflict' }, risk: 2, control: 3, capital: 2, upside: 3, timeToMarket: 4 },
  { option: 'B', label: { de: 'API / workflow partnership', en: 'API / workflow partnership' }, risk: 3, control: 3, capital: 3, upside: 4, timeToMarket: 4 },
  { option: 'C', label: { de: 'Compete in Fleet/Logistics with full-stack execution', en: 'Compete in Fleet/Logistics with full-stack execution' }, risk: 4, control: 5, capital: 4, upside: 5, timeToMarket: 2 },
  { option: 'D', label: { de: 'Independent capacity strategy (reduce distribution dependency)', en: 'Independent capacity strategy (reduce distribution dependency)' }, risk: 4, control: 5, capital: 5, upside: 4, timeToMarket: 1 }
]

const contacts: ContactPerson[] = [
  {
    name: 'Jan H. Pahl',
    role: { de: 'Head of Investor Relations // IRO', en: 'Head of Investor Relations // IRO' },
    focus: { de: 'Kapitalmarktanfragen und Investor-Kommunikation', en: 'Capital markets and investor communication' },
    reachout: { de: 'ir(at)hypoport.de', en: 'ir(at)hypoport.de' },
    source: 'https://www.hypoport.de/investor-relations/'
  },
  {
    name: 'Ronald Slabke',
    role: { de: 'Vorsitzender des Vorstandes', en: 'Chairman of the Management Board' },
    focus: { de: 'Konzernstrategie und Plattformexpansion', en: 'Group strategy and platform expansion' },
    reachout: { de: 'via Kontaktformular / info(at)hypoport.de', en: 'via contact form / info(at)hypoport.de' },
    source: 'https://www.hypoport.de/unternehmensprofil/management/'
  },
  {
    name: 'Stephan Gawarecki',
    role: { de: 'Mitglied des Vorstandes', en: 'Member of the Management Board' },
    focus: { de: 'Privatkunden und Versicherungsplattform-Segment', en: 'Private clients and insurance platform segment' },
    reachout: { de: 'via Kontaktformular / info(at)hypoport.de', en: 'via contact form / info(at)hypoport.de' },
    source: 'https://www.hypoport.de/unternehmensprofil/management/'
  },
  {
    name: 'Dieter Pfeiffenberger',
    role: { de: 'Vorsitzender des Aufsichtsrates', en: 'Chairman of the Supervisory Board' },
    focus: { de: 'Aufsicht und Governance', en: 'Supervision and governance' },
    reachout: { de: 'via Kontaktformular / info(at)hypoport.de', en: 'via contact form / info(at)hypoport.de' },
    source: 'https://www.hypoport.de/unternehmensprofil/management/'
  }
]

function bi(value: BiText, lang: 'de' | 'en') {
  return lang === 'de' ? value.de : value.en
}

function formatCurrencyM(value: number) {
  return `EUR ${new Intl.NumberFormat('en-US', { maximumFractionDigits: 1 }).format(value)}m`
}

function toHeatColor(score: number) {
  if (score >= 20) return '#b91c1c'
  if (score >= 15) return '#dc2626'
  if (score >= 10) return '#f97316'
  if (score >= 6) return '#f59e0b'
  return '#16a34a'
}

export default function HypoportAnalysisPage() {
  const { lang, t } = useI18n()
  const l = lang === 'de' ? 'de' : 'en'

  const [premiumVolumeM, setPremiumVolumeM] = useState(260)
  const [commissionRate, setCommissionRate] = useState(12)
  const [lossRatio, setLossRatio] = useState(66)
  const [platformFeeRate, setPlatformFeeRate] = useState(3)

  const commissionIncome = premiumVolumeM * (commissionRate / 100)
  const expenseRate = 0.17
  const uwMarginProxy = premiumVolumeM * (1 - lossRatio / 100 - expenseRate)
  const platformIncomeProxy = 3 + premiumVolumeM * (platformFeeRate / 100)
  const totalContribution = commissionIncome + uwMarginProxy + platformIncomeProxy
  const breakEvenGwp = 35 / Math.max(0.01, commissionRate / 100 + (1 - lossRatio / 100 - expenseRate) + platformFeeRate / 100)

  const sensitivity = useMemo(() => {
    const points = [50, 55, 60, 65, 70, 75, 80]
    return points.map((lr) => {
      const uw = premiumVolumeM * (1 - lr / 100 - expenseRate)
      const total = premiumVolumeM * (commissionRate / 100) + uw + (3 + premiumVolumeM * (platformFeeRate / 100))
      return { lossRatio: lr, contribution: total }
    })
  }, [commissionRate, platformFeeRate, premiumVolumeM])

  const fitData = [
    { dimension: t('hypoport.text.deepDive2Title'), score: 78 },
    { dimension: t('hypoport.labels.control'), score: 72 },
    { dimension: t('hypoport.labels.timeToMarket'), score: 64 },
    { dimension: t('hypoport.labels.upside'), score: 83 },
    { dimension: t('hypoport.text.deepDive3Title'), score: 86 }
  ]

  const positionData = relationshipPoints.map((p) => ({ name: bi(p.name, l), overlap: p.overlap, value: p.value }))

  function handleExportPdf() {
    const previousTitle = document.title
    document.title = 'Hypoport_Strategic_Analysis_Insurfox'
    window.print()
    window.setTimeout(() => {
      document.title = previousTitle
    }, 700)
  }

  return (
    <section className="page" style={{ gap: '1.25rem', background: '#ffffff', paddingTop: '1rem' }}>
      <style>{`
        @media print {
          @page { size: A4 landscape; margin: 10mm; }
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
          .hypoport-print-hide { display: none !important; }
        }
      `}</style>

      <div style={{ width: '100%', maxWidth: 1240, margin: '0 auto', display: 'grid', gap: '1rem' }}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', flexWrap: 'wrap' }}>
            <Header title={t('hypoport.title')} subtitle={t('hypoport.subtitle')} titleColor="#0f172a" subtitleColor="#475569" />
            <div className="hypoport-print-hide" style={{ position: 'sticky', top: 84 }}>
              <Button size="sm" onClick={handleExportPdf}>{t('hypoport.exportPdf')}</Button>
            </div>
          </div>
        </Card>

        <Card title={t('hypoport.sections.executiveSummary')}>
          <div style={{ display: 'grid', gap: '0.55rem', color: '#334155', lineHeight: 1.65 }}>
            <p style={{ margin: 0 }}>{t('hypoport.text.summaryP1')}</p>
            <p style={{ margin: 0 }}>{t('hypoport.text.summaryP2')}</p>
            <p style={{ margin: 0 }}>{t('hypoport.text.summaryP3')}</p>
            <p style={{ margin: 0 }}>{t('hypoport.text.summaryP4')}</p>
            <p style={{ margin: 0 }}>{t('hypoport.text.summaryP5')}</p>
          </div>
        </Card>

        <Card title={t('hypoport.sections.companyProfile')}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1rem' }}>
            <Card title="Hypoport Overview">
              <p style={noteStyle}>{t('hypoport.text.hypoportNarrative')}</p>
              <div style={kpiGridStyle}>
                {profileKpis.hypoport.map((kpi) => (
                  <div key={kpi.label} style={kpiItemStyle}>
                    <div style={kpiLabelStyle}>{kpi.label}</div>
                    <div style={kpiValueStyle}>{kpi.value}</div>
                  </div>
                ))}
              </div>
            </Card>
            <Card title="Insurfox Overview">
              <p style={noteStyle}>{t('hypoport.text.insurfoxNarrative')}</p>
              <div style={kpiGridStyle}>
                {profileKpis.insurfox.map((kpi) => (
                  <div key={kpi.label} style={kpiItemStyle}>
                    <div style={kpiLabelStyle}>{kpi.label}</div>
                    <div style={kpiValueStyle}>{kpi.value}</div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </Card>

        <Card title={t('hypoport.sections.comparison')}>
          <div style={{ overflowX: 'auto' }}>
            <table style={tableStyle}>
              <thead>
                <tr style={headRowStyle}>
                  <th style={thStyle}>{t('hypoport.labels.category')}</th>
                  <th style={thStyle}>{t('hypoport.labels.hypoport')}</th>
                  <th style={thStyle}>{t('hypoport.labels.insurfox')}</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row) => (
                  <tr key={row.category.en}>
                    <td style={tdStrongStyle}>{bi(row.category, l)}</td>
                    <td style={tdStyle}>{bi(row.hypoport, l)}</td>
                    <td style={tdStyle}>{bi(row.insurfox, l)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card title={t('hypoport.sections.charts')}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1rem' }}>
            <Card title="Business mix (indicative)">
              <div style={{ height: 280 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={businessMix}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="segment" stroke="#475569" />
                    <YAxis stroke="#475569" />
                    <Tooltip />
                    <Bar dataKey="value" fill="#0ea5e9" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <p style={noteStyle}>{t('hypoport.labels.indicativeScenario')}</p>
            </Card>
            <Card title="Geographic exposure (indicative)">
              <div style={{ height: 280 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={geoMix}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="region" stroke="#475569" />
                    <YAxis stroke="#475569" />
                    <Tooltip />
                    <Bar dataKey="value" fill="#d4380d" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <p style={noteStyle}>{t('hypoport.labels.indicativeScenario')}</p>
            </Card>
          </div>
        </Card>

        <Card title={t('hypoport.sections.relationshipMatrix')}>
          <div style={{ height: 320 }}>
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 10, right: 12, left: 10, bottom: 12 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis type="number" dataKey="overlap" name={t('hypoport.labels.competitiveOverlap')} domain={[0, 100]} stroke="#475569" />
                <YAxis type="number" dataKey="value" name={t('hypoport.labels.strategicValue')} domain={[0, 100]} stroke="#475569" />
                <Tooltip labelFormatter={(_, payload) => (payload?.[0]?.payload?.name ?? '') as string} />
                <Scatter data={positionData} fill="#f97316" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title={t('hypoport.sections.deepDive')}>
          <div style={{ display: 'grid', gap: '0.8rem' }}>
            <NarrativeBlock title={t('hypoport.text.deepDive1Title')} body={t('hypoport.text.deepDive1Body')} />
            <NarrativeBlock title={t('hypoport.text.deepDive2Title')} body={t('hypoport.text.deepDive2Body')} />
            <NarrativeBlock title={t('hypoport.text.deepDive3Title')} body={t('hypoport.text.deepDive3Body')} />
          </div>
        </Card>

        <Card title={t('hypoport.sections.risk')}>
          <div style={{ display: 'grid', gap: '0.45rem' }}>
            {riskRows.map((row) => {
              const score = row.likelihood * row.impact
              return (
                <div key={row.label.en} style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 78px 78px 108px', gap: '0.5rem', alignItems: 'center' }}>
                  <div style={{ color: '#334155', fontSize: '0.86rem' }}>{bi(row.label, l)}</div>
                  <div style={heatCellStyle}>{t('hypoport.labels.likelihood')}: {row.likelihood}</div>
                  <div style={heatCellStyle}>{t('hypoport.labels.impact')}: {row.impact}</div>
                  <div style={{ ...heatCellStyle, background: toHeatColor(score), color: '#fff', borderColor: 'transparent' }}>{t('hypoport.labels.score')}: {score}</div>
                </div>
              )
            })}
          </div>
        </Card>

        <Card title={t('hypoport.sections.financial')}>
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(340px, 1fr)', gap: '1rem' }}>
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              <SliderRow label={t('hypoport.labels.premiumVolume')} value={premiumVolumeM} min={80} max={700} step={10} suffix="M" onChange={setPremiumVolumeM} />
              <SliderRow label={t('hypoport.labels.commissionRate')} value={commissionRate} min={5} max={25} step={1} suffix="%" onChange={setCommissionRate} />
              <SliderRow label={t('hypoport.labels.lossRatio')} value={lossRatio} min={45} max={90} step={1} suffix="%" onChange={setLossRatio} />
              <SliderRow label={t('hypoport.labels.platformFeeRate')} value={platformFeeRate} min={1} max={8} step={0.5} suffix="%" onChange={setPlatformFeeRate} />
            </div>
            <div style={{ display: 'grid', gap: '0.55rem' }}>
              <MetricCard label={t('hypoport.labels.commissionIncome')} value={formatCurrencyM(commissionIncome)} />
              <MetricCard label={t('hypoport.labels.uwMarginProxy')} value={formatCurrencyM(uwMarginProxy)} />
              <MetricCard label={t('hypoport.labels.platformIncomeProxy')} value={formatCurrencyM(platformIncomeProxy)} />
              <MetricCard label={t('hypoport.labels.totalContribution')} value={formatCurrencyM(totalContribution)} />
              <MetricCard label={t('hypoport.labels.breakEvenGwp')} value={formatCurrencyM(breakEvenGwp)} />
            </div>
          </div>
          <p style={{ ...noteStyle, marginTop: '0.6rem' }}>{t('hypoport.text.financialNarrative')}</p>
          <div style={{ marginTop: '0.8rem', height: 280 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sensitivity} margin={{ top: 10, right: 12, left: 0, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="lossRatio" stroke="#475569" />
                <YAxis stroke="#475569" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="contribution" stroke="#0f172a" strokeWidth={2.2} dot={false} name="Contribution" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title={t('hypoport.sections.options')}>
          <div style={{ overflowX: 'auto' }}>
            <table style={tableStyle}>
              <thead>
                <tr style={headRowStyle}>
                  <th style={thStyle}>{t('hypoport.labels.option')}</th>
                  <th style={thStyle}>{t('hypoport.sections.options')}</th>
                  <th style={thStyle}>{t('hypoport.labels.risk')}</th>
                  <th style={thStyle}>{t('hypoport.labels.control')}</th>
                  <th style={thStyle}>{t('hypoport.labels.capital')}</th>
                  <th style={thStyle}>{t('hypoport.labels.upside')}</th>
                  <th style={thStyle}>{t('hypoport.labels.timeToMarket')}</th>
                </tr>
              </thead>
              <tbody>
                {optionData.map((row) => (
                  <tr key={row.option}>
                    <td style={tdStrongStyle}>{row.option}</td>
                    <td style={tdStyle}>{bi(row.label, l)}</td>
                    <td style={tdStyle}>{row.risk}</td>
                    <td style={tdStyle}>{row.control}</td>
                    <td style={tdStyle}>{row.capital}</td>
                    <td style={tdStyle}>{row.upside}</td>
                    <td style={tdStyle}>{row.timeToMarket}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ marginTop: '0.8rem', height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={optionData} margin={{ top: 10, right: 12, left: 0, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="option" stroke="#475569" />
                <YAxis domain={[0, 5]} stroke="#475569" />
                <Tooltip />
                <Legend />
                <Bar dataKey="risk" fill="#ef4444" />
                <Bar dataKey="control" fill="#0ea5e9" />
                <Bar dataKey="capital" fill="#7c3aed" />
                <Bar dataKey="upside" fill="#16a34a" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title={t('hypoport.sections.swot')}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1rem' }}>
            <Card title="Hypoport">
              <SwotParagraph title={t('hypoport.labels.strength')} body={bi({ de: 'Die Stärke liegt in etablierter Distributionsinfrastruktur, Prozessstandardisierung und hoher Maklernetzwerk-Anbindung im deutschen Markt.', en: 'Strength sits in established distribution infrastructure, process standardization, and deep broker-network connectivity in Germany.' }, l)} />
              <SwotParagraph title={t('hypoport.labels.weakness')} body={bi({ de: 'Schwächer ist die unmittelbare operative Execution-Tiefe in underwriting-/claims-nahen End-to-end Workflows.', en: 'Weakness is lower direct execution depth in underwriting- and claims-centric end-to-end workflows.' }, l)} />
              <SwotParagraph title={t('hypoport.labels.opportunity')} body={bi({ de: 'Chance besteht in API-basierter Integration mit Full-stack-Ausführungsmodellen, um transaktionale Reichweite mit operativer Tiefe zu kombinieren.', en: 'Opportunity lies in API-based integration with full-stack execution models to combine transactional reach with operational depth.' }, l)} />
              <SwotParagraph title={t('hypoport.labels.threat')} body={bi({ de: 'Risiken entstehen bei Kanal- und Ownership-Konflikten, wenn Plattformmacht und Kundenzugang in dieselben Segmente drücken.', en: 'Threats emerge under channel and ownership conflicts when platform power and customer access converge in the same segments.' }, l)} />
            </Card>
            <Card title="Insurfox">
              <SwotParagraph title={t('hypoport.labels.strength')} body={bi({ de: 'Insurfox ist stark in hybrider Rollenlogik und operativer Workflow-Ausführung über Broker, MGA, Claims und Fleet.', en: 'Insurfox is strong in hybrid role logic and operational workflow execution across broker, MGA, claims, and fleet.' }, l)} />
              <SwotParagraph title={t('hypoport.labels.weakness')} body={bi({ de: 'Schwäche ist die geringere absolute Distributionsreichweite gegenüber etablierten Plattformökosystemen.', en: 'Weakness is lower absolute distribution reach versus established platform ecosystems.' }, l)} />
              <SwotParagraph title={t('hypoport.labels.opportunity')} body={bi({ de: 'Große Chance ist die vertikale Differenzierung in logistics/fleet/mobility mit AI-gestützter End-to-end Steuerung.', en: 'Major opportunity is vertical differentiation in logistics/fleet/mobility with AI-enabled end-to-end control.' }, l)} />
              <SwotParagraph title={t('hypoport.labels.threat')} body={bi({ de: 'Bedrohung entsteht durch Abhängigkeit von externen Distribution-Layern, falls keine eigene kanalunabhängige Skalierung erreicht wird.', en: 'Threat appears via dependency on external distribution layers if independent scaling is not achieved.' }, l)} />
            </Card>
          </div>
        </Card>

        <Card title={t('hypoport.sections.recommendation')}>
          <RecommendationCard title={t('hypoport.text.recommendation306090')} />
          <RecommendationCard title={t('hypoport.text.recommendationNeed')} />
          <RecommendationCard title={t('hypoport.text.recommendationOffer')} />
        </Card>

        <Card title={bi({ de: 'Ansprechpartner & Stakeholder (öffentliche Quellen)', en: 'Contacts & Stakeholders (public sources)' }, l)}>
          <p style={noteStyle}>
            {bi(
              {
                de: 'Die folgenden Ansprechpartner wurden aus öffentlich zugänglichen Hypoport-Quellen übernommen. Persönliche E-Mail-Adressen wurden nicht ergänzt, sofern nicht explizit öffentlich genannt.',
                en: 'The following contacts are taken from publicly available Hypoport sources. Personal email addresses were not added unless explicitly published.'
              },
              l
            )}
          </p>
          <div style={{ display: 'grid', gap: '0.55rem', marginTop: '0.7rem' }}>
            {contacts.map((contact) => (
              <div key={contact.name} style={{ border: '1px solid #e2e8f0', borderRadius: 10, padding: '0.6rem', background: '#f8fafc' }}>
                <div style={{ fontWeight: 700, color: '#0f172a' }}>{contact.name}</div>
                <div style={{ color: '#334155', fontSize: '0.86rem' }}><strong>{bi({ de: 'Rolle', en: 'Role' }, l)}:</strong> {bi(contact.role, l)}</div>
                <div style={{ color: '#334155', fontSize: '0.86rem' }}><strong>{bi({ de: 'Fokus', en: 'Focus' }, l)}:</strong> {bi(contact.focus, l)}</div>
                <div style={{ color: '#334155', fontSize: '0.86rem' }}><strong>{bi({ de: 'Kontaktweg', en: 'Reachout' }, l)}:</strong> {bi(contact.reachout, l)}</div>
                <div style={{ color: '#64748b', fontSize: '0.8rem' }}><strong>{bi({ de: 'Quelle', en: 'Source' }, l)}:</strong> {contact.source}</div>
              </div>
            ))}
          </div>
          <p style={{ ...noteStyle, marginTop: '0.6rem' }}>
            {bi({ de: 'Öffentliche Quellen erfasst am 20. Februar 2026.', en: 'Public sources captured on February 20, 2026.' }, l)}
          </p>
        </Card>

        <Card title={t('hypoport.text.sourcesTitle')}>
          <ul style={listStyle}>
            <li>https://www.hypoport.de/</li>
            <li>https://www.hypoport.de/unternehmensprofil/management/</li>
            <li>https://www.hypoport.de/investor-relations/</li>
            <li>https://www.hypoport.de/kontakt/</li>
            <li>Public annual/public market materials (approx. framing)</li>
            <li>Internal Insurfox positioning assumptions</li>
          </ul>
          <p style={{ ...noteStyle, marginTop: '0.5rem' }}>{t('hypoport.text.disclaimer')}</p>
        </Card>
      </div>

      {/*
        PR Summary:
        - Added HypoportAnalysisPage with executive report structure (hero, narratives, comparison, charts, risk heatmap, financial model, options, SWOT, recommendation, sources).
        - Added protected route /analysis/hypoport in AppRouter.
        - Added DE/EN translation keys under hypoport.* in translations.ts.

        Demo Script:
        1) Open /analysis/hypoport
        2) Toggle DE/EN in header language switch
        3) Review scatter/bar/line charts and risk heatmap
        4) Click "Download Executive Report (PDF)" to print/export
      */}
    </section>
  )
}

function NarrativeBlock({ title, body }: { title: string; body: string }) {
  return (
    <div>
      <h3 style={subHeadingStyle}>{title}</h3>
      <p style={noteStyle}>{body}</p>
    </div>
  )
}

function SwotParagraph({ title, body }: { title: string; body: string }) {
  return (
    <p style={{ ...noteStyle, marginBottom: '0.55rem' }}><strong>{title}:</strong> {body}</p>
  )
}

function RecommendationCard({ title }: { title: string }) {
  return <p style={{ ...noteStyle, marginBottom: '0.5rem' }}>{title}</p>
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div style={metricCardStyle}>
      <div style={metricLabelStyle}>{label}</div>
      <div style={metricValueStyle}>{value}</div>
    </div>
  )
}

function SliderRow({ label, value, min, max, step, suffix, onChange }: { label: string; value: number; min: number; max: number; step: number; suffix: string; onChange: (v: number) => void }) {
  return (
    <label style={{ display: 'grid', gap: '0.35rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.6rem' }}>
        <span style={{ color: '#334155', fontWeight: 600 }}>{label}</span>
        <span style={{ color: '#0f172a', fontWeight: 700 }}>{value}{suffix}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} style={{ accentColor: '#d4380d' }} />
    </label>
  )
}

const listStyle: CSSProperties = {
  margin: 0,
  paddingLeft: '1rem',
  display: 'grid',
  gap: '0.35rem',
  color: '#334155'
}

const noteStyle: CSSProperties = {
  margin: 0,
  color: '#334155',
  fontSize: '0.86rem',
  lineHeight: 1.6
}

const subHeadingStyle: CSSProperties = {
  margin: '0 0 0.4rem',
  color: '#0f172a',
  fontSize: '0.98rem'
}

const tableStyle: CSSProperties = {
  width: '100%',
  borderCollapse: 'separate',
  borderSpacing: 0,
  fontSize: '0.86rem'
}

const headRowStyle: CSSProperties = {
  background: '#f1f5f9'
}

const thStyle: CSSProperties = {
  textAlign: 'left',
  color: '#334155',
  padding: '0.55rem',
  borderBottom: '1px solid #dbe2ea',
  fontWeight: 700,
  whiteSpace: 'nowrap'
}

const tdStyle: CSSProperties = {
  color: '#334155',
  padding: '0.55rem',
  borderBottom: '1px solid #e2e8f0',
  verticalAlign: 'top'
}

const tdStrongStyle: CSSProperties = {
  ...tdStyle,
  color: '#0f172a',
  fontWeight: 700
}

const heatCellStyle: CSSProperties = {
  border: '1px solid #dbe2ea',
  borderRadius: 8,
  padding: '0.3rem 0.45rem',
  fontSize: '0.78rem',
  color: '#334155',
  background: '#ffffff',
  textAlign: 'center'
}

const kpiGridStyle: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
  gap: '0.5rem',
  marginTop: '0.7rem'
}

const kpiItemStyle: CSSProperties = {
  border: '1px solid #e2e8f0',
  borderRadius: 8,
  padding: '0.5rem',
  background: '#f8fafc'
}

const kpiLabelStyle: CSSProperties = {
  color: '#64748b',
  fontSize: '0.78rem'
}

const kpiValueStyle: CSSProperties = {
  color: '#0f172a',
  fontWeight: 700,
  fontSize: '0.84rem',
  marginTop: '0.15rem'
}

const metricCardStyle: CSSProperties = {
  border: '1px solid #e2e8f0',
  borderRadius: 10,
  padding: '0.65rem',
  background: '#f8fafc'
}

const metricLabelStyle: CSSProperties = {
  color: '#64748b',
  fontSize: '0.8rem'
}

const metricValueStyle: CSSProperties = {
  color: '#0f172a',
  fontWeight: 700,
  marginTop: '0.2rem',
  fontSize: '1.04rem'
}
