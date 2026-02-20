import { useMemo, useState, type CSSProperties } from 'react'
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis } from 'recharts'
import Card from '@/components/ui/Card'
import Header from '@/components/ui/Header'
import Button from '@/components/ui/Button'
import { useI18n } from '@/i18n/I18nContext'

type BiText = { de: string; en: string }

type MatrixPoint = { name: BiText; overlap: number; value: number }
type FitRow = { key: string; score: number }
type RiskRow = { label: BiText; likelihood: number; impact: number }
type OptionRow = { option: string; label: BiText; risk: number; control: number; capital: number; upside: number; timeToMarket: number; note: BiText }

const kairosFacts: BiText[] = [
  { de: 'Kairos Risk Solutions Pte Ltd', en: 'Kairos Risk Solutions Pte Ltd' },
  { de: 'HQ: Singapur', en: 'HQ: Singapore' },
  { de: 'Unternehmensgröße: 2–10 Mitarbeitende', en: 'Company size: 2–10 employees' },
  { de: 'Spezialitäten: Parametric, Agriculture, Forestry, Credit & Surety, Business Risk', en: 'Specialties: Parametric, agriculture, forestry, credit & surety, business risk' },
  { de: 'Positionierung: Risk Structuring und Specialty Insurance Consulting', en: 'Positioning: risk structuring and specialty insurance consulting' }
]

const insurfoxFacts: BiText[] = [
  { de: 'Hybridmodell: MGA + Broker + Plattform (IaaS) + AI Workflows', en: 'Hybrid model: MGA + broker + platform (IaaS) + AI workflows' },
  { de: 'End-to-end Workflow-Kontrolle in Underwriting und Claims', en: 'End-to-end workflow control in underwriting and claims' },
  { de: 'Claimsfox als operatives Claims-Execution-Modul', en: 'Claimsfox as operational claims execution module' },
  { de: 'AI in FNOL, Underwriting und Operational Steering', en: 'AI in FNOL, underwriting, and operational steering' },
  { de: 'Fokus auf Logistics, Fleet und Mobility', en: 'Focus on logistics, fleet, and mobility' }
]

const matrixPoints: MatrixPoint[] = [
  { name: { de: 'Risk Structuring Partner', en: 'Risk Structuring Partner' }, overlap: 34, value: 90 },
  { name: { de: 'Parametric Product Co-Builder', en: 'Parametric Product Co-Builder' }, overlap: 48, value: 88 },
  { name: { de: 'Distribution Competitor (if they broker)', en: 'Distribution Competitor (if they broker)' }, overlap: 78, value: 42 },
  { name: { de: 'AI/Process Enabler', en: 'AI/Process Enabler' }, overlap: 46, value: 81 }
]

const fitRows: FitRow[] = [
  { key: 'fitProductInnovation', score: 88 },
  { key: 'fitCapacityStructuring', score: 82 },
  { key: 'fitClaimsOpsIntegration', score: 58 },
  { key: 'fitDistributionSynergy', score: 66 },
  { key: 'fitGovernanceReadiness', score: 63 }
]

const riskRows: RiskRow[] = [
  { label: { de: 'Basis Risk & Data Quality', en: 'Basis risk & data quality' }, likelihood: 4, impact: 5 },
  { label: { de: 'Regulatory Cross-Border Constraints (SG/EU)', en: 'Regulatory cross-border constraints (SG/EU)' }, likelihood: 3, impact: 5 },
  { label: { de: 'Data Ownership & Client Access', en: 'Data ownership & client access' }, likelihood: 4, impact: 4 },
  { label: { de: 'Vendor Lock-in / Dependency', en: 'Vendor lock-in / dependency' }, likelihood: 3, impact: 4 },
  { label: { de: 'Model Risk & EU AI Act Governance', en: 'Model risk & EU AI Act governance' }, likelihood: 3, impact: 4 }
]

const optionRows: OptionRow[] = [
  {
    option: 'A',
    label: { de: 'Commercial partnership (referral + product advisory)', en: 'Commercial partnership (referral + product advisory)' },
    risk: 2,
    control: 3,
    capital: 2,
    upside: 3,
    timeToMarket: 4,
    note: { de: 'Schneller Markteintritt bei begrenzter Kontrolle.', en: 'Fast market access with limited control.' }
  },
  {
    option: 'B',
    label: { de: 'Co-built parametric program (MGA delegated authority path)', en: 'Co-built parametric program (MGA delegated authority path)' },
    risk: 3,
    control: 4,
    capital: 3,
    upside: 5,
    timeToMarket: 3,
    note: { de: 'Hoher Upside bei abgestimmter Governance.', en: 'High upside with aligned governance.' }
  },
  {
    option: 'C',
    label: { de: 'JV / program partnership with capacity structuring', en: 'JV / program partnership with capacity structuring' },
    risk: 4,
    control: 4,
    capital: 4,
    upside: 4,
    timeToMarket: 2,
    note: { de: 'Kapitalintensiver mit höherer Komplexität.', en: 'More capital intensive with higher complexity.' }
  },
  {
    option: 'D',
    label: { de: 'Build internally with alternative partners', en: 'Build internally with alternative partners' },
    risk: 4,
    control: 5,
    capital: 5,
    upside: 4,
    timeToMarket: 1,
    note: { de: 'Maximale Kontrolle, längere Time-to-Market.', en: 'Maximum control, longer time to market.' }
  }
]

const sources = [
  'https://www.linkedin.com/company/kairos-risk-solutions',
  'https://www.kairosrs.com/News/',
  'https://www.kairosrs.com/About-Us/'
]

const contacts = [
  { name: 'Jeffrey Khoo', role: 'CEO' },
  { name: 'Richard Price', role: 'Managing Director, Finance & Administration Solutions' },
  { name: 'Casmond Lim', role: 'Founder' }
]

const singaporeAddress = '60 Paya Lebar Road #07-54, Paya Lebar Square, Singapore 409051'

function bi(value: BiText, lang: 'de' | 'en') {
  return lang === 'de' ? value.de : value.en
}

function colorByScore(score: number) {
  if (score >= 20) return '#b91c1c'
  if (score >= 15) return '#dc2626'
  if (score >= 10) return '#f97316'
  if (score >= 6) return '#f59e0b'
  return '#16a34a'
}

function money(v: number) {
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: 1 }).format(v)
}

export default function KairosAnalysisPage() {
  const { lang, t } = useI18n()
  const l = lang === 'de' ? 'de' : 'en'

  const [premiumVolumeM, setPremiumVolumeM] = useState(220)
  const [attachRatePct, setAttachRatePct] = useState(18)
  const [lossRatioPct, setLossRatioPct] = useState(64)
  const [commissionPct, setCommissionPct] = useState(12)

  const parametricPremiumM = premiumVolumeM * (attachRatePct / 100)
  const commissionIncomeM = parametricPremiumM * (commissionPct / 100)
  const assumedExpenseRatio = 0.18
  const uwMarginRate = 1 - lossRatioPct / 100 - assumedExpenseRatio
  const uwMarginProxyM = parametricPremiumM * uwMarginRate
  const contributionM = commissionIncomeM + uwMarginProxyM
  const fixedCostM = 8
  const breakEvenGwpM = fixedCostM / Math.max(0.01, commissionPct / 100 + uwMarginRate)

  const sensitivityData = useMemo(() => {
    const points = [50, 55, 60, 65, 70, 75, 80]
    return points.map((lr) => {
      const marginRate = 1 - lr / 100 - assumedExpenseRatio
      const contrib = parametricPremiumM * (commissionPct / 100 + marginRate)
      return { lossRatio: lr, contribution: contrib }
    })
  }, [parametricPremiumM, commissionPct])

  const fitData = fitRows.map((row) => ({ dimension: t(`analysis.kairos.${row.key}`), score: row.score }))
  const positionData = matrixPoints.map((point) => ({ name: bi(point.name, l), overlap: point.overlap, value: point.value }))

  function handleExport() {
    const previous = document.title
    document.title = 'Kairos_Strategic_Analysis_Insurfox'
    window.print()
    window.setTimeout(() => {
      document.title = previous
    }, 700)
  }

  return (
    <section className="page" style={{ gap: '1.2rem', background: '#ffffff', paddingTop: '1rem' }}>
      <style>{`
        @media print {
          @page { size: A4 landscape; margin: 10mm; }
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
          .kairos-print-hide { display: none !important; }
        }
      `}</style>

      <div style={{ width: '100%', maxWidth: 1240, margin: '0 auto', display: 'grid', gap: '1rem' }}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', flexWrap: 'wrap' }}>
            <Header title={t('analysis.kairos.title')} subtitle={t('analysis.kairos.subtitle')} titleColor="#0f172a" subtitleColor="#475569" />
            <div className="kairos-print-hide" style={{ position: 'sticky', top: 84 }}>
              <Button size="sm" onClick={handleExport}>{t('analysis.kairos.export')}</Button>
            </div>
          </div>
        </Card>

        <Card title={t('analysis.kairos.executiveSummary')}>
          <div style={{ display: 'grid', gap: '0.55rem', color: '#334155', lineHeight: 1.65 }}>
            <p style={{ margin: 0 }}>{t('analysis.kairos.summaryP1')}</p>
            <p style={{ margin: 0 }}>{t('analysis.kairos.summaryP2')}</p>
            <p style={{ margin: 0 }}>{t('analysis.kairos.summaryP3')}</p>
            <p style={{ margin: 0 }}>{t('analysis.kairos.summaryP4')}</p>
          </div>
        </Card>

        <Card title={t('analysis.kairos.companyProfiles')}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1rem' }}>
            <Card title={t('analysis.kairos.kairosSnapshot')}>
              <ul style={listStyle}>
                {kairosFacts.map((fact) => <li key={fact.en}>{bi(fact, l)}</li>)}
              </ul>
            </Card>
            <Card title={t('analysis.kairos.insurfoxSnapshot')}>
              <ul style={listStyle}>
                {insurfoxFacts.map((fact) => <li key={fact.en}>{bi(fact, l)}</li>)}
              </ul>
            </Card>
          </div>
        </Card>

        <Card title={t('analysis.kairos.offeringsDeepDive')}>
          <div style={{ display: 'grid', gap: '0.8rem' }}>
            <SectionBlock title={t('analysis.kairos.offeringsParametricTitle')} body={t('analysis.kairos.offeringsParametricBody')} />
            <SectionBlock title={t('analysis.kairos.offeringsSpecialtyTitle')} body={t('analysis.kairos.offeringsSpecialtyBody')} />
            <SectionBlock title={t('analysis.kairos.offeringsOpsTitle')} body={t('analysis.kairos.offeringsOpsBody')} />
            <SectionBlock title={t('analysis.kairos.offeringsMappingTitle')} body={t('analysis.kairos.offeringsMappingBody')} />
          </div>
        </Card>

        <Card title={t('analysis.kairos.positionMatrix')}>
          <div style={{ height: 320 }}>
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 10, right: 12, left: 10, bottom: 12 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis type="number" dataKey="overlap" name={t('analysis.kairos.overlapAxis')} domain={[0, 100]} stroke="#475569" />
                <YAxis type="number" dataKey="value" name={t('analysis.kairos.valueAxis')} domain={[0, 100]} stroke="#475569" />
                <Tooltip labelFormatter={(_, payload) => (payload?.[0]?.payload?.name ?? '') as string} />
                <Scatter data={positionData} fill="#0f172a" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
          <p style={noteStyle}>{t('analysis.kairos.matrixInterpretation')}</p>
        </Card>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '1rem' }}>
          <Card title={t('analysis.kairos.strategicFit')}>
            <div style={{ overflowX: 'auto' }}>
              <table style={tableStyle}>
                <thead>
                  <tr style={headRowStyle}>
                    <th style={thStyle}>{t('analysis.kairos.fitDimension')}</th>
                    <th style={thStyle}>{t('analysis.kairos.fitScore')}</th>
                  </tr>
                </thead>
                <tbody>
                  {fitRows.map((row) => (
                    <tr key={row.key}>
                      <td style={tdStrongStyle}>{t(`analysis.kairos.${row.key}`)}</td>
                      <td style={tdStyle}>{row.score}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
          <Card title={t('analysis.kairos.strategicFit')}>
            <div style={{ height: 320 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={fitData} margin={{ top: 10, right: 12, left: 0, bottom: 34 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="dimension" stroke="#475569" angle={-12} textAnchor="end" height={64} />
                  <YAxis domain={[0, 100]} stroke="#475569" />
                  <Tooltip />
                  <Bar dataKey="score" fill="#d4380d" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        <Card title={t('analysis.kairos.financialScenario')}>
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(340px, 1fr)', gap: '1rem' }}>
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              <SliderRow label={t('analysis.kairos.premiumVolume')} value={premiumVolumeM} min={50} max={500} step={10} suffix="M" onChange={setPremiumVolumeM} />
              <SliderRow label={t('analysis.kairos.attachRate')} value={attachRatePct} min={5} max={50} step={1} suffix="%" onChange={setAttachRatePct} />
              <SliderRow label={t('analysis.kairos.lossRatio')} value={lossRatioPct} min={40} max={90} step={1} suffix="%" onChange={setLossRatioPct} />
              <SliderRow label={t('analysis.kairos.commissionRate')} value={commissionPct} min={5} max={25} step={1} suffix="%" onChange={setCommissionPct} />
            </div>
            <div style={{ display: 'grid', gap: '0.6rem' }}>
              <MetricCard label={t('analysis.kairos.commissionIncome')} value={`EUR ${money(commissionIncomeM)}m`} />
              <MetricCard label={t('analysis.kairos.uwMarginProxy')} value={`EUR ${money(uwMarginProxyM)}m`} />
              <MetricCard label={t('analysis.kairos.breakEvenGwp')} value={`EUR ${money(breakEvenGwpM)}m`} />
              <MetricCard label={t('analysis.kairos.sensitivitySeries')} value={`EUR ${money(contributionM)}m`} />
              <p style={noteStyle}>{t('analysis.kairos.scenarioDisclaimer')}</p>
            </div>
          </div>
          <div style={{ marginTop: '0.9rem' }}>
            <h3 style={subHeadingStyle}>{t('analysis.kairos.sensitivityTitle')}</h3>
            <div style={{ height: 280 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={sensitivityData} margin={{ top: 10, right: 12, left: 0, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="lossRatio" stroke="#475569" />
                  <YAxis stroke="#475569" />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="contribution" name={t('analysis.kairos.sensitivitySeries')} stroke="#0f172a" strokeWidth={2.2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Card>

        <Card title={t('analysis.kairos.riskGovernanceHeatmap')}>
          <div style={{ display: 'grid', gap: '0.45rem' }}>
            {riskRows.map((risk) => {
              const score = risk.likelihood * risk.impact
              return (
                <div key={risk.label.en} style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 78px 78px 108px', gap: '0.5rem', alignItems: 'center' }}>
                  <div style={{ fontSize: '0.87rem', color: '#334155' }}>{bi(risk.label, l)}</div>
                  <div style={heatCellStyle}>{t('analysis.kairos.likelihood')}: {risk.likelihood}</div>
                  <div style={heatCellStyle}>{t('analysis.kairos.impact')}: {risk.impact}</div>
                  <div style={{ ...heatCellStyle, background: colorByScore(score), color: '#fff', borderColor: 'transparent' }}>{t('analysis.kairos.score')}: {score}</div>
                </div>
              )
            })}
          </div>
        </Card>

        <Card title={t('analysis.kairos.strategicOptions')}>
          <div style={{ overflowX: 'auto' }}>
            <table style={tableStyle}>
              <thead>
                <tr style={headRowStyle}>
                  <th style={thStyle}>{t('analysis.kairos.option')}</th>
                  <th style={thStyle}>{t('analysis.kairos.strategicOptions')}</th>
                  <th style={thStyle}>Risk</th>
                  <th style={thStyle}>{t('analysis.kairos.control')}</th>
                  <th style={thStyle}>{t('analysis.kairos.capital')}</th>
                  <th style={thStyle}>{t('analysis.kairos.upside')}</th>
                  <th style={thStyle}>{t('analysis.kairos.timeToMarket')}</th>
                </tr>
              </thead>
              <tbody>
                {optionRows.map((row) => (
                  <tr key={row.option}>
                    <td style={tdStrongStyle}>{row.option}</td>
                    <td style={tdStyle}>{bi(row.label, l)}<br /><span style={{ color: '#64748b' }}>{bi(row.note, l)}</span></td>
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
          <div style={{ marginTop: '0.9rem', height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={optionRows} margin={{ top: 10, right: 12, left: 0, bottom: 10 }}>
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

        <Card title={t('analysis.kairos.recommendation')}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.8rem' }}>
            <RecommendationBlock title={t('analysis.kairos.next306090')} body={bi({ de: '30 Tage: Due-Diligence auf Parametric Scope und Trigger-Daten. 60 Tage: Co-Design Pilot in Logistics/Fleet. 90 Tage: Entscheid über Program-Go-live mit Governance-Guardrails.', en: '30 days: due diligence on parametric scope and trigger data. 60 days: co-design pilot in logistics/fleet. 90 days: go-live decision with governance guardrails.' }, l)} />
            <RecommendationBlock title={t('analysis.kairos.needFromKairos')} body={bi({ de: 'Trigger-Frameworks, Basisrisiko-Methodik, Governance-Dokumentation, Capacity-Partner-Zugang und vertragliche Data-Rights-Klarheit.', en: 'Trigger frameworks, basis-risk methodology, governance documentation, capacity partner access, and contractual clarity on data rights.' }, l)} />
            <RecommendationBlock title={t('analysis.kairos.offerFromInsurfox')} body={bi({ de: 'Digitales MGA/Broker-Operating-Modell, Workflow-/Claims-Execution, FNOL-Automation, Distribution-Zugang und modulare Plattformintegration.', en: 'Digital MGA/broker operating model, workflow/claims execution, FNOL automation, distribution access, and modular platform integration.' }, l)} />
          </div>
        </Card>

        <Card title={t('analysis.kairos.contacts')}>
          <p style={noteStyle}>{t('analysis.kairos.contactsSubline')}</p>
          <div style={{ display: 'grid', gap: '0.55rem', marginTop: '0.55rem' }}>
            {contacts.map((person) => (
              <div key={person.name} style={{ border: '1px solid #e2e8f0', borderRadius: 10, padding: '0.55rem', background: '#f8fafc' }}>
                <div style={{ fontWeight: 700, color: '#0f172a' }}>{person.name}</div>
                <div style={{ color: '#334155', fontSize: '0.85rem' }}>{t('analysis.kairos.contactRole')}: {person.role}</div>
                <div style={{ color: '#64748b', fontSize: '0.8rem' }}>{t('analysis.kairos.contactReachout')}: LinkedIn / Company contact form</div>
              </div>
            ))}
          </div>
          <p style={{ ...noteStyle, marginTop: '0.55rem' }}><strong>{t('analysis.kairos.contactAddress')}:</strong> {singaporeAddress}</p>
        </Card>

        <Card title={t('analysis.kairos.sources')}>
          <ul style={listStyle}>
            {sources.map((s) => <li key={s}>{s}</li>)}
          </ul>
          <p style={{ ...noteStyle, marginTop: '0.55rem' }}>{t('analysis.kairos.publicSourcesCaptured', { date: l === 'de' ? '20. Februar 2026' : 'February 20, 2026' })}</p>
          <p style={noteStyle}>{t('analysis.kairos.disclaimer')}</p>
        </Card>
      </div>
    </section>
  )
}

function SectionBlock({ title, body }: { title: string; body: string }) {
  return (
    <div>
      <h3 style={subHeadingStyle}>{title}</h3>
      <p style={noteStyle}>{body}</p>
    </div>
  )
}

function RecommendationBlock({ title, body }: { title: string; body: string }) {
  return (
    <div style={{ border: '1px solid #e2e8f0', borderRadius: 10, padding: '0.7rem', background: '#f8fafc' }}>
      <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '0.35rem' }}>{title}</div>
      <div style={{ color: '#334155', fontSize: '0.86rem', lineHeight: 1.55 }}>{body}</div>
    </div>
  )
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ border: '1px solid #e2e8f0', borderRadius: 10, padding: '0.65rem', background: '#f8fafc' }}>
      <div style={{ color: '#64748b', fontSize: '0.8rem' }}>{label}</div>
      <div style={{ color: '#0f172a', fontWeight: 700, marginTop: '0.2rem', fontSize: '1.04rem' }}>{value}</div>
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
