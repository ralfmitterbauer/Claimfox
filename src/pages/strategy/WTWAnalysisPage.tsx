import { useMemo, useState } from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'
import Card from '@/components/ui/Card'
import Header from '@/components/ui/Header'
import Button from '@/components/ui/Button'
import { useI18n } from '@/i18n/I18nContext'

type BiText = { de: string; en: string }

type ComparisonRow = {
  category: BiText
  wtw: BiText
  insurfox: BiText
}

type ExecutiveContact = {
  name: string
  title: string
  region: string
  businessUnit: string
  linkedin?: string
  relevance: BiText
}

const businessModelRows: ComparisonRow[] = [
  { category: { de: 'Regulatory Status', en: 'Regulatory Status' }, wtw: { de: 'Globaler Broker- und Advisory-Status', en: 'Global broker and advisory status' }, insurfox: { de: 'Hybrid: MGA + Broker + IaaS-Plattform', en: 'Hybrid: MGA + broker + IaaS platform' } },
  { category: { de: 'Underwriting Authority', en: 'Underwriting Authority' }, wtw: { de: 'Beratend/strukturierend für Delegation', en: 'Advisory and structuring support for delegation' }, insurfox: { de: 'Operative Delegation als Zielmodell', en: 'Operational delegated authority as target model' } },
  { category: { de: 'Capacity Ownership', en: 'Capacity Ownership' }, wtw: { de: 'Kein eigener Carrier, aber starker Capacity-Zugang', en: 'No own carrier, but strong capacity access' }, insurfox: { de: 'Keine eigene Capacity heute, Aufbau über Partner', en: 'No own capacity today, partner-enabled scaling' } },
  { category: { de: 'Distribution Power', en: 'Distribution Power' }, wtw: { de: 'Sehr stark über globale Brokerbeziehungen', en: 'Very strong through global broker relationships' }, insurfox: { de: 'Wachsend über digitale Broker- und Flottenkanäle', en: 'Growing through digital broker and fleet channels' } },
  { category: { de: 'Global Broker Network', en: 'Global Broker Network' }, wtw: { de: 'Ausgeprägt und etabliert', en: 'Deep and established' }, insurfox: { de: 'Selektiv und auf Wachstumsregionen fokussiert', en: 'Selective and focused on growth regions' } },
  { category: { de: 'Digital Infrastructure', en: 'Digital Infrastructure' }, wtw: { de: 'Analytics- und Beratungsplattformen', en: 'Analytics and advisory platforms' }, insurfox: { de: 'End-to-end Versicherungsinfrastruktur (Claims/UW/Fleet/Partner)', en: 'End-to-end insurance infrastructure (claims/UW/fleet/partner)' } },
  { category: { de: 'Claims Automation', en: 'Claims Automation' }, wtw: { de: 'Indirekt über Beratung und Tooling', en: 'Indirect via advisory and tooling' }, insurfox: { de: 'Direkt in Workflow- und FNOL-Prozessen', en: 'Direct in workflow and FNOL processes' } },
  { category: { de: 'AI Usage in Core Business', en: 'AI Usage in Core Business' }, wtw: { de: 'Analytics-first mit Modell- und Beratungsfokus', en: 'Analytics-first with model and advisory focus' }, insurfox: { de: 'Operative AI in Underwriting- und Claims-Prozessen', en: 'Operational AI in underwriting and claims execution' } },
  { category: { de: 'Capital Access', en: 'Capital Access' }, wtw: { de: 'Sehr stark über Markt- und Investorenzugang', en: 'Very strong via market and investor access' }, insurfox: { de: 'Frühe Phase, kapitalabhängig von Partnern und Wachstum', en: 'Early stage, capital-dependent on partners and growth' } },
  { category: { de: 'Embedded Insurance Capability', en: 'Embedded Insurance Capability' }, wtw: { de: 'Über Broker- und Programmstrukturen möglich', en: 'Enabled through broking and program structures' }, insurfox: { de: 'Direkt in Plattformmodulen und APIs verankerbar', en: 'Directly deployable in platform modules and APIs' } },
  { category: { de: 'Data Ownership', en: 'Data Ownership' }, wtw: { de: 'Programm- und Kundengetrieben, oft verteilt', en: 'Program and client driven, often distributed' }, insurfox: { de: 'Plattformzentriert mit End-to-end Prozesssicht', en: 'Platform-centric with end-to-end process visibility' } },
  { category: { de: 'Conflict Potential', en: 'Conflict Potential' }, wtw: { de: 'Mittel: Broker-Interessen vs Plattformstrategie', en: 'Medium: broker incentives vs platform strategy' }, insurfox: { de: 'Mittel-Hoch bei Distribution- und Data-Ownership-Überschneidung', en: 'Medium-high in distribution and data-ownership overlap' } }
]

const revenueSplit = [
  { segment: 'Risk & Broking', value: 62 },
  { segment: 'Health, Wealth & Career', value: 38 }
]

const geoSplit = [
  { region: 'North America', value: 52 },
  { region: 'Europe', value: 30 },
  { region: 'Asia Pacific', value: 10 },
  { region: 'Rest of World', value: 8 }
]

const relationshipMatrix = [
  { name: 'Capacity Provider', overlap: 32, value: 92 },
  { name: 'Distribution Partner', overlap: 58, value: 81 },
  { name: 'Strategic Investor', overlap: 44, value: 77 },
  { name: 'Direct Competitor', overlap: 79, value: 41 }
]

const strategicFit = [
  { name: 'Capacity & Reinsurance Brokerage', strength: 92, strategicValue: 91 },
  { name: 'MGA Treaty Structuring', strength: 88, strategicValue: 90 },
  { name: 'Regulatory & Capital Advisory', strength: 93, strategicValue: 80 },
  { name: 'Technology Integration Support', strength: 68, strategicValue: 84 },
  { name: 'Risk Modeling Support', strength: 84, strategicValue: 87 }
]

const conflictHeatmap = [
  { label: 'Data ownership control', likelihood: 4, impact: 5 },
  { label: 'Distribution conflict risk', likelihood: 4, impact: 4 },
  { label: 'Capacity dependency concentration', likelihood: 3, impact: 5 },
  { label: 'Commission steering risk', likelihood: 3, impact: 4 },
  { label: 'Client ownership transparency', likelihood: 3, impact: 4 },
  { label: 'Governance alignment', likelihood: 2, impact: 4 }
]

const segmentDeepDiveData = [
  { segment: 'Fleet', strength: 82, relevance: 88 },
  { segment: 'Logistics', strength: 87, relevance: 92 },
  { segment: 'Mobility', strength: 74, relevance: 79 },
  { segment: 'Marine Cargo', strength: 93, relevance: 90 }
]

const wtwExecutiveContacts: ExecutiveContact[] = [
  {
    name: 'Dr. Massimo Cavadini',
    title: 'Head of Product, Pricing, Claims and Underwriting for Continental Europe',
    region: 'Continental Europe',
    businessUnit: 'Insurance Consulting and Technology',
    linkedin: 'https://www.linkedin.com/in/massimo-cavadini-2376b837/',
    relevance: {
      de: 'Relevanter Entscheidungsträger für Claims-/Underwriting-Analytics und operative Modellarchitektur.',
      en: 'Relevant decision maker for claims/underwriting analytics and operating model architecture.'
    }
  },
  {
    name: 'Paul Lubbers',
    title: 'Head of Affinity & Programs, U.S.',
    region: 'US (Global program relevance)',
    businessUnit: 'Corporate Risk and Broking',
    relevance: {
      de: 'Wichtig für Program-/MGA-Strukturen, Embedded Distribution und Partnerprogramme.',
      en: 'Important for program/MGA structures, embedded distribution, and partnership programs.'
    }
  },
  {
    name: 'Chris Gingell',
    title: 'Global Head of Affinity',
    region: 'Global',
    businessUnit: 'Affinity / Embedded Insurance',
    relevance: {
      de: 'Schlüsselrolle für Distribution, Embedded-Modelle und internationale Programmskalierung.',
      en: 'Key role for distribution, embedded models, and international program scaling.'
    }
  },
  {
    name: 'Patrick Muls',
    title: 'Head of Marine, Western Europe',
    region: 'Western Europe',
    businessUnit: 'Marine',
    linkedin: 'https://www.wtwco.com/en-be/solutions/products/global-programs',
    relevance: {
      de: 'Direkter maritimer Fachansprechpartner fuer Marine-Cargo-Programme in Europa.',
      en: 'Direct marine specialty contact for marine cargo program structuring in Europe.'
    }
  },
  {
    name: 'Ben Abraham',
    title: 'Global Head of Marine',
    region: 'Global',
    businessUnit: 'Marine',
    linkedin: 'https://www.wtwco.com/en-us/insights/2021/11/how-geopolitics-impacts-the-maritime-industry',
    relevance: {
      de: 'Globaler Marine-Entscheidungstraeger fuer Capacity- und Produktarchitektur im Specialty-Segment.',
      en: 'Global marine decision leader for capacity and product architecture in specialty lines.'
    }
  },
  {
    name: 'Research required – confirm via WTW corporate site / LinkedIn',
    title: 'Head of Transport Claims / Head of Marine Cargo (DACH/EU)',
    region: 'DACH / Europe',
    businessUnit: 'Transport & Marine',
    relevance: {
      de: 'Zielkontakt für Claims-Transport und Marine-Cargo-Entscheidungen vor Outreach verifizieren.',
      en: 'Target contact for transport claims and marine cargo decisions; verify before outreach.'
    }
  }
]

const mgaEnablementScores = [
  { metric: 'Capacity sourcing strength', score: 90 },
  { metric: 'Reinsurance placement depth', score: 91 },
  { metric: 'Regulatory advisory capability', score: 86 },
  { metric: 'Distribution network leverage', score: 88 },
  { metric: 'Technology integration flexibility', score: 66 },
  { metric: 'Conflict of interest risk', score: 62 }
]

const hybridPositioningRows = [
  {
    zone: { de: 'Cooperation Zone', en: 'Cooperation Zone' },
    wtw: { de: 'Capacity Sourcing, Treaty-Placement, Regulatory/Capital Advisory', en: 'Capacity sourcing, treaty placement, regulatory/capital advisory' },
    insurfox: { de: 'Digitale MGA-Execution, FNOL/Claims-Automation, Produkt-Orchestrierung', en: 'Digital MGA execution, FNOL/claims automation, product orchestration' }
  },
  {
    zone: { de: 'Competitive Zone', en: 'Competitive Zone' },
    wtw: { de: 'Brokergeführte Distribution und Kundenzugang im Transportsegment', en: 'Broker-led distribution and client access in transport segment' },
    insurfox: { de: 'Eigene Broker-/MGA-Distribution und datenzentrierte Plattformbindung', en: 'Own broker/MGA distribution and data-centric platform stickiness' }
  }
]

const decisionOptions = [
  { option: 'Option A', labelDe: 'Capacity Partnership Only', labelEn: 'Capacity Partnership Only', risk: 2, control: 2, capital: 2, upside: 3 },
  { option: 'Option B', labelDe: 'Delegated Authority MGA', labelEn: 'Delegated Authority MGA', risk: 3, control: 4, capital: 3, upside: 5 },
  { option: 'Option C', labelDe: 'Joint Venture', labelEn: 'Joint Venture', risk: 4, control: 4, capital: 4, upside: 4 },
  { option: 'Option D', labelDe: 'Independent Capacity Strategy', labelEn: 'Independent Capacity Strategy', risk: 5, control: 5, capital: 5, upside: 5 }
]

const executiveDecisionRows = [
  {
    option: 'Option A',
    marker: 'Conditional Go',
    whenToProceed: { de: 'Schneller Capacity-Zugang bei niedrigem Setup-Risiko erforderlich', en: 'Fast capacity access required with low setup risk' },
    whenToPause: { de: 'Wenn Preissteuerung vollstaendig extern bleibt', en: 'If pricing control remains fully external' },
    whenToRenegotiate: { de: 'Wenn Datentransparenz oder Provisionssteuerung eingeschraenkt ist', en: 'If data transparency or commission steering is restricted' }
  },
  {
    option: 'Option B',
    marker: 'Go',
    whenToProceed: { de: 'Delegated Authority mit klaren Underwriting-Guardrails verfuegbar', en: 'Delegated authority with explicit underwriting guardrails available' },
    whenToPause: { de: 'Wenn Binder-Scope Kernprodukte in Fleet/Logistics ausschliesst', en: 'If binder scope excludes core fleet/logistics products' },
    whenToRenegotiate: { de: 'Wenn Loss-Ratio-Governance-KPIs nicht vertraglich verankert sind', en: 'If loss-ratio governance KPIs are not contractually anchored' }
  },
  {
    option: 'Option C',
    marker: 'Conditional Go',
    whenToProceed: { de: 'Gemeinsame Wachstumsthese und balanciertes Kontrollmodell sind abgestimmt', en: 'Joint growth thesis and balanced control model are aligned' },
    whenToPause: { de: 'Wenn Governance-Design zu langsam oder kapitalintensiv wird', en: 'If governance design becomes too slow or capital-heavy' },
    whenToRenegotiate: { de: 'Wenn Kundenzuordnung und Datenrechte unklar bleiben', en: 'If client ownership and data rights are unclear' }
  },
  {
    option: 'Option D',
    marker: 'Red Flag',
    whenToProceed: { de: 'Nur wenn strategische Autonomie den Kapitalaufwand klar ueberwiegt', en: 'Only if strategic autonomy materially outweighs capital burden' },
    whenToPause: { de: 'Wenn kurzfristige Capacity-Sicherheit erforderlich ist', en: 'If near-term capacity certainty is required' },
    whenToRenegotiate: { de: 'Wenn unabhaengige Konditionen die Break-even-Zeitachse deutlich verschlechtern', en: 'If independent terms materially worsen break-even timeline' }
  }
]

function getBi(value: BiText, lang: 'de' | 'en') {
  return lang === 'de' ? value.de : value.en
}

function toHeatColor(score: number) {
  if (score >= 20) return '#b91c1c'
  if (score >= 15) return '#dc2626'
  if (score >= 10) return '#f97316'
  if (score >= 6) return '#f59e0b'
  return '#16a34a'
}

export default function WTWAnalysisPage() {
  const { lang } = useI18n()
  const l = lang === 'de' ? 'de' : 'en'

  const [premiumVolumeM, setPremiumVolumeM] = useState(180)
  const [lossRatioPct, setLossRatioPct] = useState(64)
  const [commissionPct, setCommissionPct] = useState(14)
  const [capacityModel, setCapacityModel] = useState<'wtw' | 'independent' | 'blended'>('wtw')

  const premiumVolume = premiumVolumeM * 1_000_000
  const commissionRate = commissionPct / 100
  const lossRatio = lossRatioPct / 100
  const expenseRatio = 0.18
  const uwMarginRate = Math.max(-0.15, 1 - lossRatio - expenseRatio)

  const segmentMix = {
    fleet: 0.4,
    logistics: 0.35,
    mobility: 0.25
  }

  const financialModel = useMemo(() => {
    const fleetGwp = premiumVolume * segmentMix.fleet
    const logisticsGwp = premiumVolume * segmentMix.logistics
    const mobilityGwp = premiumVolume * segmentMix.mobility
    const totalGwp = fleetGwp + logisticsGwp + mobilityGwp
    const commissionIncome = totalGwp * commissionRate
    const underwritingMargin = totalGwp * uwMarginRate
    const totalContribution = commissionIncome + underwritingMargin
    const fixedCost = 18_000_000
    const breakEvenGwp = fixedCost / Math.max(0.01, commissionRate + uwMarginRate)

    return {
      fleetGwp,
      logisticsGwp,
      mobilityGwp,
      totalGwp,
      commissionIncome,
      underwritingMargin,
      totalContribution,
      breakEvenGwp,
      fixedCost
    }
  }, [premiumVolume, commissionRate, uwMarginRate])

  const sensitivityData = useMemo(() => {
    const points = [50, 55, 60, 65, 70, 75, 80]
    return points.map((lr) => {
      const lrRate = lr / 100
      const marginRate = 1 - lrRate - expenseRatio
      const contribution = premiumVolume * (commissionRate + marginRate)
      return {
        lossRatio: lr,
        contributionM: contribution / 1_000_000
      }
    })
  }, [premiumVolume, commissionRate])

  const leverageModelData = useMemo(() => {
    const models = [
      { mode: 'wtw' as const, label: 'WTW Capacity', commissionAdj: 0.015, marginAdj: -0.01, capitalIntensity: 2.2 },
      { mode: 'independent' as const, label: 'Independent Capacity', commissionAdj: -0.01, marginAdj: 0.025, capitalIntensity: 4.6 },
      { mode: 'blended' as const, label: 'Blended Model', commissionAdj: 0.005, marginAdj: 0.01, capitalIntensity: 3.1 }
    ]
    return models.map((m) => {
      const modelCommissionRate = Math.max(0.04, commissionRate + m.commissionAdj)
      const modelUwRate = Math.max(-0.2, uwMarginRate + m.marginAdj)
      const contribution = premiumVolume * (modelCommissionRate + modelUwRate)
      const breakEven = 18_000_000 / Math.max(0.01, modelCommissionRate + modelUwRate)
      return {
        model: m.label,
        contributionM: contribution / 1_000_000,
        breakEvenM: breakEven / 1_000_000,
        capitalIntensity: m.capitalIntensity,
        isActive: m.mode === capacityModel
      }
    })
  }, [capacityModel, commissionRate, premiumVolume, uwMarginRate])

  const text = {
    title: getBi({ de: 'WTW (Willis Towers Watson) Strategic Analysis & Comparison with Insurfox', en: 'WTW (Willis Towers Watson) Strategic Analysis & Comparison with Insurfox' }, l),
    subtitle: getBi({ de: 'Advisory, Broking & Technology Solutions vs Intelligent Insurance Infrastructure', en: 'Advisory, Broking & Technology Solutions vs Intelligent Insurance Infrastructure' }, l),
    export: getBi({ de: 'Executive Report herunterladen (PDF)', en: 'Download Executive Report (PDF)' }, l),
    executiveSummary: getBi({ de: 'Executive Summary', en: 'Executive Summary' }, l),
    hybridTitle: getBi({ de: 'Strategic Positioning: Platform + MGA + Broker Hybrid Model', en: 'Strategic Positioning: Platform + MGA + Broker Hybrid Model' }, l),
    relationshipMatrix: getBi({ de: 'Strategic Relationship Matrix', en: 'Strategic Relationship Matrix' }, l),
    companyProfile: getBi({ de: 'Unternehmensprofil', en: 'Company Profile' }, l),
    segmentDeepDive: getBi({ de: 'Segment Deep Dive (Fleet / Logistics / Mobility / Marine Cargo)', en: 'Segment Deep Dive (Fleet / Logistics / Mobility / Marine Cargo)' }, l),
    decisionMakers: getBi({ de: 'Strategic Decision Makers & Entry Points', en: 'Strategic Decision Makers & Entry Points' }, l),
    mgaScorecard: getBi({ de: 'MGA Enablement Scorecard', en: 'MGA Enablement Scorecard' }, l),
    hybridPositioning: getBi({ de: 'Hybrid Positioning Analysis', en: 'Hybrid Positioning Analysis' }, l),
    decisionFramework: getBi({ de: 'Executive Decision Framework', en: 'Executive Decision Framework' }, l),
    businessComparison: getBi({ de: 'Business Model Comparison (Extended)', en: 'Business Model Comparison (Extended)' }, l),
    deepDive: getBi({ de: 'WTW Deep Dive – Value Propositions', en: 'WTW Deep Dive – Value Propositions' }, l),
    segmentRevenue: getBi({ de: 'Umsatzmix nach Segment (%)', en: 'Revenue split by segment (%)' }, l),
    geoRevenue: getBi({ de: 'Geografische Umsatzverteilung (%)', en: 'Geographic revenue distribution (%)' }, l),
    fit: getBi({ de: 'Strategic Fit Analysis for Insurfox', en: 'Strategic Fit Analysis for Insurfox' }, l),
    synergyConflict: getBi({ de: 'Conflict & Synergy Analysis', en: 'Conflict & Synergy Analysis' }, l),
    mgaStrategy: getBi({ de: 'MGA Enablement & Capacity Strategy', en: 'MGA Enablement & Capacity Strategy' }, l),
    financial: getBi({ de: 'Financial Leverage Scenario', en: 'Financial Leverage Scenario' }, l),
    options: getBi({ de: 'Board-Level Strategic Options', en: 'Board-Level Strategic Options' }, l),
    swot: getBi({ de: 'SWOT Analyse', en: 'SWOT Analysis' }, l)
  }

  function handleExportPdf() {
    const previousTitle = document.title
    document.title = 'WTW_Strategic_MGA_Analysis_Insurfox'
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
          .wtw-print-hide { display: none !important; }
        }
      `}</style>
      <div style={{ width: '100%', maxWidth: 1240, margin: '0 auto', display: 'grid', gap: '1.1rem' }}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', flexWrap: 'wrap' }}>
            <Header title={text.title} subtitle={text.subtitle} titleColor="#0f172a" subtitleColor="#475569" />
            <div className="wtw-print-hide" style={{ position: 'sticky', top: 84 }}>
              <Button size="sm" onClick={handleExportPdf}>{text.export}</Button>
            </div>
          </div>
        </Card>

        <Card title={text.executiveSummary}>
          <div style={{ display: 'grid', gap: '0.7rem', color: '#334155', lineHeight: 1.65 }}>
            <p style={{ margin: 0 }}>{getBi({ de: 'WTW ist als globales Advisory- und Broking-Haus ein Kapazitäts- und Strukturierungs-Powerhouse mit hoher Relevanz für MGA-Skalierung, Treaty-Design und regulatorische Kapitalarchitektur.', en: 'WTW is a global advisory and broking powerhouse with high relevance for MGA scaling, treaty design, and regulatory capital architecture.' }, l)}</p>
            <p style={{ margin: 0 }}>{getBi({ de: 'Insurfox operiert als Hybridmodell aus MGA, Commercial Broker, IaaS-Plattform sowie AI-gestütztem Underwriting- und Claims-Operator. Damit ist WTW nicht nur Partner, sondern ein struktureller Enabler mit partieller Wettbewerbsüberschneidung.', en: 'Insurfox operates as a hybrid MGA, commercial broker, IaaS platform, and AI-enabled underwriting/claims operator. WTW is therefore not only a partner, but a structural enabler with selective competitive overlap.' }, l)}</p>
            <p style={{ margin: 0 }}>{getBi({ de: 'Die größte Opportunität liegt in Transport, Fleet und Marine Cargo über ein phasenweises Delegated-Authority-Programm. Voraussetzung ist ein belastbares Vertragsgerüst für Data Ownership, Governance, Steering und Exit-Optionen.', en: 'The largest opportunity sits in transport, fleet, and marine cargo through a phased delegated-authority program. Prerequisite: robust contractual controls over data ownership, governance, steering, and exit options.' }, l)}</p>
            <p style={{ margin: 0 }}>{getBi({ de: 'Board-Position: Conditional Go mit klaren Guardrails; Red-Flag bei einseitiger Capacity-Abhängigkeit oder unklarer Kundenzuordnung.', en: 'Board position: Conditional Go with clear guardrails; Red flag under unilateral capacity dependency or unclear client ownership.' }, l)}</p>
          </div>
        </Card>

        <Card title={text.relationshipMatrix}>
          <div style={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 10, right: 12, left: 10, bottom: 12 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis type="number" dataKey="overlap" name={getBi({ de: 'Competitive Overlap', en: 'Competitive Overlap' }, l)} domain={[0, 100]} stroke="#475569" />
                <YAxis type="number" dataKey="value" name={getBi({ de: 'Strategic Value', en: 'Strategic Value' }, l)} domain={[0, 100]} stroke="#475569" />
                <Tooltip labelFormatter={(_, payload) => (payload?.[0]?.payload?.name ?? '') as string} />
                <Scatter data={relationshipMatrix} fill="#d4380d" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title={text.companyProfile}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1rem' }}>
            <Card title="WTW Overview">
              <ul style={listStyle}>
                <li>{getBi({ de: 'Historische Wurzeln seit 1828 mit globaler Präsenz.', en: 'Historic roots dating back to 1828 with global footprint.' }, l)}</li>
                <li>{getBi({ de: 'Headquarters: London, UK; gelistet an der NASDAQ.', en: 'Headquarters: London, UK; listed on NASDAQ.' }, l)}</li>
                <li>{getBi({ de: 'Mitarbeitende: rund 48.900 global.', en: 'Employees: around 48,900 globally.' }, l)}</li>
                <li>{getBi({ de: 'Umsatz 2024: ca. USD 9,93 Mrd.', en: '2024 revenue: approximately USD 9.93B.' }, l)}</li>
                <li>{getBi({ de: 'Segmente: Risk & Broking sowie Health & Wealth.', en: 'Segments: Risk & Broking and Health & Wealth.' }, l)}</li>
                <li>{getBi({ de: 'Kernservices: Brokerage, Risk Management, Analytics, Consulting, Insurance Tech.', en: 'Core services: brokerage, risk management, analytics, consulting, and insurance tech.' }, l)}</li>
              </ul>
            </Card>
            <Card title="Insurfox Overview">
              <ul style={listStyle}>
                <li>{getBi({ de: 'Hybrid-Rolle: MGA + Broker + IaaS-Plattform + AI-Operator.', en: 'Hybrid role: MGA + broker + IaaS platform + AI operator.' }, l)}</li>
                <li>{getBi({ de: 'Module: Claimsfox, Brokerfox, Fleetfox, Partnerfox, AI Fox.', en: 'Modules: Claimsfox, Brokerfox, Fleetfox, Partnerfox, AI Fox.' }, l)}</li>
                <li>{getBi({ de: 'Demo-fähige UX und AI-Workflows für FNOL, Underwriting, Claims und Reporting.', en: 'Demo-ready UX and AI workflows for FNOL, underwriting, claims, and reporting.' }, l)}</li>
                <li>{getBi({ de: 'Skalierungsziel: digitales MGA-Betriebsmodell mit orchestrierter Capacity-Anbindung.', en: 'Scaling target: digital MGA operating model with orchestrated capacity connectivity.' }, l)}</li>
              </ul>
            </Card>
          </div>
        </Card>

        <Card title={text.segmentDeepDive}>
          <div style={{ display: 'grid', gap: '0.8rem' }}>
            <p style={pStyle}>
              {getBi(
                {
                  de: 'WTW zeigt in Transport- und Marine-Segmenten hohe strukturelle Stärke durch Kapazitätsaggregation, Reinsurance-Platzierung und Programmarchitektur. Für Insurfox ist besonders Marine Cargo/Fleet strategisch relevant, da hier MGA-Wachstum und Plattformorchestrierung zusammenlaufen.',
                  en: 'WTW shows structural strength in transport and marine through capacity aggregation, reinsurance placement, and program architecture. For Insurfox, marine cargo and fleet are highly relevant where MGA scaling and platform orchestration converge.'
                },
                l
              )}
            </p>
            <div style={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 10, right: 12, left: 10, bottom: 12 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis type="number" dataKey="strength" name={getBi({ de: 'WTW Strength', en: 'WTW Strength' }, l)} domain={[50, 100]} stroke="#475569" />
                  <YAxis type="number" dataKey="relevance" name={getBi({ de: 'Strategic Relevance to Insurfox MGA', en: 'Strategic Relevance to Insurfox MGA' }, l)} domain={[50, 100]} stroke="#475569" />
                  <Tooltip labelFormatter={(_, payload) => (payload?.[0]?.payload?.segment ?? '') as string} />
                  <Scatter data={segmentDeepDiveData} fill="#0ea5e9" />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Card>

        <Card title={text.decisionMakers}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.7rem' }}>
            {wtwExecutiveContacts.map((contact) => (
              <div key={`${contact.name}-${contact.title}`} style={{ border: '1px solid #e2e8f0', borderRadius: 10, padding: '0.7rem', background: '#f8fafc', display: 'grid', gap: '0.32rem' }}>
                <div style={{ fontWeight: 700, color: '#0f172a' }}>{contact.name}</div>
                <div style={{ color: '#334155', fontSize: '0.88rem' }}>{contact.title}</div>
                <div style={{ color: '#64748b', fontSize: '0.82rem' }}>{contact.businessUnit} - {contact.region}</div>
                {contact.linkedin ? (
                  <a href={contact.linkedin} target="_blank" rel="noreferrer" style={{ color: '#0ea5e9', fontSize: '0.82rem', textDecoration: 'none' }}>
                    LinkedIn
                  </a>
                ) : (
                  <span style={{ color: '#94a3b8', fontSize: '0.82rem' }}>LinkedIn n/a</span>
                )}
                <div style={{ color: '#334155', fontSize: '0.83rem' }}>{getBi(contact.relevance, l)}</div>
              </div>
            ))}
          </div>
          <p style={{ ...pStyle, marginTop: '0.8rem', fontSize: '0.82rem', color: '#64748b' }}>
            {getBi(
              {
                de: 'Alle Daten stammen aus oeffentlich verfuegbaren Quellen und muessen vor formaler Ansprache verifiziert werden.',
                en: 'All data is sourced from public information and must be verified before formal outreach.'
              },
              l
            )}
          </p>
        </Card>

        <Card title={text.mgaScorecard}>
          <div style={{ height: 280 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mgaEnablementScores} layout="vertical" margin={{ top: 10, right: 14, left: 60, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis type="number" stroke="#475569" domain={[0, 100]} />
                <YAxis type="category" dataKey="metric" stroke="#475569" width={160} />
                <Tooltip />
                <Bar dataKey="score" fill="#d4380d" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p style={{ ...pStyle, marginTop: '0.8rem' }}>
            {getBi(
              {
                de: 'Interpretation: WTW ist ein klarer Enabler bei Capacity, Treaty und Advisory; neutral bis positiv bei Tech-Integration; strategisches Risiko besteht vor allem bei Interessenkonflikten in Distribution und Steering.',
                en: 'Interpretation: WTW is a clear enabler in capacity, treaty, and advisory; neutral-to-positive in technology integration; strategic risk concentrates in distribution and steering conflicts.'
              },
              l
            )}
          </p>
        </Card>

        <Card title={text.businessComparison}>
          <div style={{ overflowX: 'auto' }}>
            <table style={tableStyle}>
              <thead>
                <tr style={headRowStyle}>
                  <th style={thStyle}>{getBi({ de: 'Kategorie', en: 'Category' }, l)}</th>
                  <th style={thStyle}>WTW</th>
                  <th style={thStyle}>Insurfox</th>
                </tr>
              </thead>
              <tbody>
                {businessModelRows.map((row) => (
                  <tr key={row.category.en}>
                    <td style={tdStrongStyle}>{getBi(row.category, l)}</td>
                    <td style={tdStyle}>{getBi(row.wtw, l)}</td>
                    <td style={tdStyle}>{getBi(row.insurfox, l)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card title={text.deepDive}>
          <div style={{ display: 'grid', gap: '0.85rem' }}>
            <div>
              <h3 style={subHeadingStyle}>A) {getBi({ de: 'Global Insurance Broking & Risk', en: 'Global Insurance Broking & Risk' }, l)}</h3>
              <p style={pStyle}>{getBi({ de: 'WTW kombiniert konsultatives Broking, Specialty-Line-Erfahrung und globales Risk-Programm-Management.', en: 'WTW combines consultative broking, specialty line expertise, and global risk program management.' }, l)}</p>
            </div>
            <div>
              <h3 style={subHeadingStyle}>B) {getBi({ de: 'Insurance Consulting & Technology', en: 'Insurance Consulting & Technology' }, l)}</h3>
              <p style={pStyle}>{getBi({ de: 'Versicherungsnahe Advisory-Leistungen werden mit Analytics- und Technologieplattformen verknüpft.', en: 'Insurance-focused advisory services are linked with analytics and technology platforms.' }, l)}</p>
            </div>
            <div>
              <h3 style={subHeadingStyle}>C) {getBi({ de: 'Analytics & Capital Solutions', en: 'Analytics & Capital Solutions' }, l)}</h3>
              <p style={pStyle}>{getBi({ de: 'WTW unterstützt Kapitaloptimierung, finanzielle Modellierung und regulatorische Reporting-Pfade.', en: 'WTW supports capital optimization, financial modeling, and regulatory reporting pathways.' }, l)}</p>
            </div>
          </div>
        </Card>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1rem' }}>
          <Card title={text.segmentRevenue}>
            <div style={{ height: 280 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueSplit}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="segment" stroke="#475569" />
                  <YAxis stroke="#475569" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" name="%" fill="#d4380d" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
          <Card title={text.geoRevenue}>
            <div style={{ height: 280 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={geoSplit}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="region" stroke="#475569" />
                  <YAxis stroke="#475569" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" name="%" fill="#0ea5e9" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        <Card title={text.fit}>
          <div style={{ height: 320 }}>
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 10, right: 12, left: 10, bottom: 12 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis type="number" dataKey="strength" name={getBi({ de: 'WTW Strength', en: 'WTW Strength' }, l)} domain={[40, 100]} stroke="#475569" />
                <YAxis type="number" dataKey="strategicValue" name={getBi({ de: 'Strategischer Wert für Insurfox', en: 'Strategic Value to Insurfox' }, l)} domain={[40, 100]} stroke="#475569" />
                <Tooltip labelFormatter={(_, payload) => (payload?.[0]?.payload?.name ?? '') as string} />
                <Scatter data={strategicFit} fill="#f97316" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title={text.synergyConflict}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1rem' }}>
            <Card title={getBi({ de: 'Synergien', en: 'Synergies' }, l)}>
              <ul style={listStyle}>
                <li>{getBi({ de: 'WTW liefert globalen Capacity-Zugang für MGA-Programme.', en: 'WTW provides global capacity access for MGA programs.' }, l)}</li>
                <li>{getBi({ de: 'WTW unterstützt Reinsurance-Strukturierung und Treaty-Placement.', en: 'WTW supports reinsurance structuring and treaty placement.' }, l)}</li>
                <li>{getBi({ de: 'WTW kann regulatorische und kapitalbezogene Modellierung beschleunigen.', en: 'WTW can accelerate regulatory and capital modeling.' }, l)}</li>
                <li>{getBi({ de: 'WTW könnte Insurfox-Infrastruktur in Programmen white-label integrieren.', en: 'WTW could white-label Insurfox infrastructure in selected programs.' }, l)}</li>
              </ul>
            </Card>
            <Card title={getBi({ de: 'Konflikte', en: 'Conflicts' }, l)}>
              <ul style={listStyle}>
                <li>{getBi({ de: 'WTW besitzt ein starkes eigenes Brokernetzwerk.', en: 'WTW has a strong incumbent broker network.' }, l)}</li>
                <li>{getBi({ de: 'Overlap in Transport- und Logistik-Distribution.', en: 'Overlap in transport and logistics distribution.' }, l)}</li>
                <li>{getBi({ de: 'Abhängigkeitsrisiko bei Capacity-Konzentration auf einen Partner.', en: 'Dependency risk if capacity is concentrated on one partner.' }, l)}</li>
                <li>{getBi({ de: 'Spannungen bei Datenhoheit, Pipeline-Transparenz und Kundenzugang.', en: 'Tension around data ownership, pipeline transparency, and client access.' }, l)}</li>
              </ul>
            </Card>
          </div>

          <div style={{ marginTop: '1rem' }}>
            <h3 style={{ ...subHeadingStyle, marginBottom: '0.6rem' }}>{getBi({ de: 'Risk Heatmap', en: 'Risk Heatmap' }, l)}</h3>
            <div style={{ display: 'grid', gap: '0.45rem' }}>
              {conflictHeatmap.map((row) => {
                const score = row.likelihood * row.impact
                return (
                  <div key={row.label} style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 84px 84px 110px', gap: '0.5rem', alignItems: 'center' }}>
                    <div style={{ fontSize: '0.87rem', color: '#334155' }}>{row.label}</div>
                    <div style={heatCellStyle}>{getBi({ de: 'Wkt.', en: 'Lik.' }, l)}: {row.likelihood}</div>
                    <div style={heatCellStyle}>{getBi({ de: 'Imp.', en: 'Imp.' }, l)}: {row.impact}</div>
                    <div style={{ ...heatCellStyle, background: toHeatColor(score), color: '#fff', borderColor: 'transparent' }}>
                      {getBi({ de: 'Score', en: 'Score' }, l)}: {score}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </Card>

        <Card title={getBi({ de: 'Capacity Negotiation Risk Matrix', en: 'Capacity Negotiation Risk Matrix' }, l)}>
          <div style={{ overflowX: 'auto' }}>
            <table style={tableStyle}>
              <thead>
                <tr style={headRowStyle}>
                  <th style={thStyle}>{getBi({ de: 'Risiko', en: 'Risk' }, l)}</th>
                  <th style={thStyle}>{getBi({ de: 'Score', en: 'Score' }, l)}</th>
                  <th style={thStyle}>{getBi({ de: 'Contractual Protection Required', en: 'Contractual Protection Required' }, l)}</th>
                </tr>
              </thead>
              <tbody>
                {conflictHeatmap.map((row) => {
                  const score = row.likelihood * row.impact
                  return (
                    <tr key={`matrix-${row.label}`}>
                      <td style={tdStrongStyle}>{row.label}</td>
                      <td style={tdStyle}>{score}/25</td>
                      <td style={tdStyle}>
                        {getBi(
                          {
                            de: 'Klar definierte SLA/KPI, Data-Rights, Audit- und Exit-Klauseln',
                            en: 'Explicit SLA/KPI, data rights, audit rights, and exit clauses'
                          },
                          l
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          <p style={{ ...pStyle, marginTop: '0.7rem' }}>
            {getBi(
              {
                de: 'Vertragsseitige Absicherung ist zentral: Data Ownership, Commission Steering, Kundenzuordnung und Governance muessen vor Programmlaunch eindeutig geregelt sein.',
                en: 'Contractual protection is central: data ownership, commission steering, client ownership, and governance must be explicitly settled before launch.'
              },
              l
            )}
          </p>
        </Card>

        <Card title={text.hybridPositioning}>
          <div style={{ overflowX: 'auto' }}>
            <table style={tableStyle}>
              <thead>
                <tr style={headRowStyle}>
                  <th style={thStyle}>{getBi({ de: 'Zone', en: 'Zone' }, l)}</th>
                  <th style={thStyle}>WTW</th>
                  <th style={thStyle}>Insurfox</th>
                </tr>
              </thead>
              <tbody>
                {hybridPositioningRows.map((row) => (
                  <tr key={row.zone.en}>
                    <td style={tdStrongStyle}>{getBi(row.zone, l)}</td>
                    <td style={tdStyle}>{getBi(row.wtw, l)}</td>
                    <td style={tdStyle}>{getBi(row.insurfox, l)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ display: 'grid', gap: '0.45rem', marginTop: '0.7rem' }}>
            <p style={pStyle}>{getBi({ de: 'Insurfox differenziert sich ueber operative AI-Underwriting-Execution, FNOL-Kontrolle, Claims-Automation und modulare Embedded-APIs.', en: 'Insurfox differentiates through operational AI underwriting, direct FNOL control, claims automation, and modular embedded APIs.' }, l)}</p>
            <p style={pStyle}>{getBi({ de: 'WTW bleibt stark in Advisory/Broking, Kapitalstrukturierung und globalem Marktzugang.', en: 'WTW remains strong in advisory/broking, capital structuring, and global market access.' }, l)}</p>
          </div>
        </Card>

        <Card title={text.mgaStrategy}>
          <div style={{ display: 'grid', gap: '0.8rem' }}>
            <p style={pStyle}>{getBi({ de: 'Für die MGA-Skalierung benötigt Insurfox Binder Authority, Capacity-Treaties, Reinsurance-Support, belastbare Pricing-Modelle und Loss-Ratio-Governance.', en: 'To scale as an MGA, Insurfox needs binder authority, capacity treaties, reinsurance support, robust pricing models, and loss-ratio governance.' }, l)}</p>
            <p style={pStyle}>{getBi({ de: 'WTW kann Capacity Sourcing, Treaty Placement, Capital Advisory und Risiko-Modellierung als Enabler bereitstellen.', en: 'WTW can support capacity sourcing, treaty placement, capital advisory, and risk modeling as key enablers.' }, l)}</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.7rem' }}>
              <Milestone title={getBi({ de: 'Phase 1', en: 'Phase 1' }, l)} body={getBi({ de: 'Capacity Sourcing', en: 'Capacity sourcing' }, l)} />
              <Milestone title={getBi({ de: 'Phase 2', en: 'Phase 2' }, l)} body={getBi({ de: 'Delegated Authority', en: 'Delegated authority' }, l)} />
              <Milestone title={getBi({ de: 'Phase 3', en: 'Phase 3' }, l)} body={getBi({ de: 'Portfolio Optimization', en: 'Portfolio optimization' }, l)} />
              <Milestone title={getBi({ de: 'Phase 4', en: 'Phase 4' }, l)} body={getBi({ de: 'Reinsurance Layering', en: 'Reinsurance layering' }, l)} />
            </div>
          </div>
        </Card>

        <Card title={text.financial}>
          <div className="wtw-print-hide" style={{ display: 'grid', gap: '0.6rem', marginBottom: '0.9rem' }}>
            <SliderRow label={getBi({ de: 'Premium Volume (EUR Mio.)', en: 'Premium Volume (EUR M)' }, l)} value={premiumVolumeM} min={50} max={500} onChange={setPremiumVolumeM} />
            <SliderRow label={getBi({ de: 'Loss Ratio (%)', en: 'Loss Ratio (%)' }, l)} value={lossRatioPct} min={45} max={85} onChange={setLossRatioPct} />
            <SliderRow label={getBi({ de: 'Commission Rate (%)', en: 'Commission Rate (%)' }, l)} value={commissionPct} min={8} max={22} onChange={setCommissionPct} />
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
              {[
                { key: 'wtw', label: getBi({ de: 'Capacity via WTW', en: 'Capacity via WTW' }, l) },
                { key: 'independent', label: getBi({ de: 'Independent Capacity', en: 'Independent capacity' }, l) },
                { key: 'blended', label: getBi({ de: 'Blended Model', en: 'Blended model' }, l) }
              ].map((mode) => (
                <button
                  key={mode.key}
                  type="button"
                  onClick={() => setCapacityModel(mode.key as 'wtw' | 'independent' | 'blended')}
                  style={{
                    border: capacityModel === mode.key ? '1px solid #d4380d' : '1px solid #e2e8f0',
                    background: capacityModel === mode.key ? '#fff7ed' : '#ffffff',
                    color: '#334155',
                    borderRadius: 8,
                    padding: '0.3rem 0.6rem',
                    fontSize: '0.82rem',
                    cursor: 'pointer'
                  }}
                >
                  {mode.label}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.65rem' }}>
            <KpiCard label="GWP" value={formatCurrency(financialModel.totalGwp)} />
            <KpiCard label={getBi({ de: 'Commission Margin', en: 'Commission Margin' }, l)} value={formatCurrency(financialModel.commissionIncome)} />
            <KpiCard label={getBi({ de: 'Underwriting Margin', en: 'Underwriting Margin' }, l)} value={formatCurrency(financialModel.underwritingMargin)} />
            <KpiCard label={getBi({ de: 'Break-even GWP', en: 'Break-even GWP' }, l)} value={formatCurrency(financialModel.breakEvenGwp)} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1rem', marginTop: '0.9rem' }}>
            <Card title={getBi({ de: 'Segment GWP (Fleet/Logistics/Mobility)', en: 'Segment GWP (Fleet/Logistics/Mobility)' }, l)}>
              <ul style={listStyle}>
                <li>{getBi({ de: 'Fleet', en: 'Fleet' }, l)}: {formatCurrency(financialModel.fleetGwp)}</li>
                <li>{getBi({ de: 'Logistics', en: 'Logistics' }, l)}: {formatCurrency(financialModel.logisticsGwp)}</li>
                <li>{getBi({ de: 'Mobility', en: 'Mobility' }, l)}: {formatCurrency(financialModel.mobilityGwp)}</li>
              </ul>
            </Card>
            <Card title={getBi({ de: 'Loss Ratio Sensitivity', en: 'Loss Ratio Sensitivity' }, l)}>
              <div style={{ height: 220 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={sensitivityData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="lossRatio" stroke="#475569" />
                    <YAxis stroke="#475569" />
                    <Tooltip />
                    <Line type="monotone" dataKey="contributionM" stroke="#d4380d" strokeWidth={2} dot={{ r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>
            <Card title={getBi({ de: 'Capacity Model Impact', en: 'Capacity model impact' }, l)}>
              <div style={{ height: 220 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={leverageModelData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="model" stroke="#475569" />
                    <YAxis yAxisId="left" stroke="#475569" />
                    <YAxis yAxisId="right" orientation="right" stroke="#94a3b8" />
                    <Tooltip />
                    <Legend />
                    <Line yAxisId="left" type="monotone" dataKey="contributionM" name={getBi({ de: 'Contribution (EUR M)', en: 'Contribution (EUR M)' }, l)} stroke="#d4380d" strokeWidth={2} dot={{ r: 3 }} />
                    <Line yAxisId="right" type="monotone" dataKey="breakEvenM" name={getBi({ de: 'Break-even (EUR M GWP)', en: 'Break-even (EUR M GWP)' }, l)} stroke="#0ea5e9" strokeWidth={2} dot={{ r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>
        </Card>

        <Card title={text.options}>
          <div style={{ height: 320 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={decisionOptions}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="option" stroke="#475569" />
                <YAxis stroke="#475569" domain={[0, 5]} />
                <Tooltip />
                <Legend />
                <Bar dataKey="risk" name={getBi({ de: 'Risk level', en: 'Risk level' }, l)} fill="#ef4444" />
                <Bar dataKey="control" name={getBi({ de: 'Control level', en: 'Control level' }, l)} fill="#0ea5e9" />
                <Bar dataKey="capital" name={getBi({ de: 'Capital intensity', en: 'Capital intensity' }, l)} fill="#f59e0b" />
                <Bar dataKey="upside" name={getBi({ de: 'Strategic upside', en: 'Strategic upside' }, l)} fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div style={{ marginTop: '0.7rem', display: 'grid', gap: '0.4rem', color: '#334155' }}>
            {decisionOptions.map((opt) => (
              <div key={opt.option}><strong>{opt.option}:</strong> {l === 'de' ? opt.labelDe : opt.labelEn}</div>
            ))}
          </div>
        </Card>

        <Card title={text.decisionFramework}>
          <div style={{ display: 'grid', gap: '0.55rem' }}>
            {executiveDecisionRows.map((row) => (
              <div key={`framework-${row.option}`} style={{ border: '1px solid #e2e8f0', borderRadius: 10, padding: '0.65rem', display: 'grid', gap: '0.35rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
                  <div style={{ fontWeight: 700, color: '#0f172a' }}>{row.option}</div>
                  <span
                    style={{
                      borderRadius: 999,
                      padding: '0.12rem 0.55rem',
                      fontSize: '0.76rem',
                      color: '#fff',
                      background: row.marker === 'Go' ? '#16a34a' : row.marker === 'Conditional Go' ? '#f59e0b' : '#dc2626'
                    }}
                  >
                    {row.marker}
                  </span>
                </div>
                <div style={{ fontSize: '0.85rem', color: '#334155' }}>
                  <strong>{getBi({ de: 'WHEN to proceed:', en: 'WHEN to proceed:' }, l)}</strong> {getBi(row.whenToProceed, l)}
                </div>
                <div style={{ fontSize: '0.85rem', color: '#334155' }}>
                  <strong>{getBi({ de: 'WHEN to pause:', en: 'WHEN to pause:' }, l)}</strong> {getBi(row.whenToPause, l)}
                </div>
                <div style={{ fontSize: '0.85rem', color: '#334155' }}>
                  <strong>{getBi({ de: 'WHEN to renegotiate:', en: 'WHEN to renegotiate:' }, l)}</strong> {getBi(row.whenToRenegotiate, l)}
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card title={text.swot}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1rem' }}>
            <Card title="WTW">
              <ul style={listStyle}>
                <li><strong>{getBi({ de: 'Stärken:', en: 'Strengths:' }, l)}</strong> {getBi({ de: 'Globales Netzwerk, Analytics-Kompetenz, Zugang zu Kapital und Capacity.', en: 'Global network, analytics depth, access to capital and capacity.' }, l)}</li>
                <li><strong>{getBi({ de: 'Schwächen:', en: 'Weaknesses:' }, l)}</strong> {getBi({ de: 'Große Legacy-Strukturen, teils langsameres Innovationstempo.', en: 'Large legacy structures and at times slower innovation pace.' }, l)}</li>
                <li><strong>{getBi({ de: 'Chancen:', en: 'Opportunities:' }, l)}</strong> {getBi({ de: 'Embedded-Broking und digitale Plattformpartnerschaften.', en: 'Embedded broking and digital platform partnerships.' }, l)}</li>
                <li><strong>{getBi({ de: 'Risiken:', en: 'Threats:' }, l)}</strong> {getBi({ de: 'Wettbewerb durch Aon/Marsh und regulatorische Komplexität.', en: 'Competition from Aon/Marsh and regulatory complexity.' }, l)}</li>
              </ul>
            </Card>
            <Card title="Insurfox">
              <ul style={listStyle}>
                <li><strong>{getBi({ de: 'Stärken:', en: 'Strengths:' }, l)}</strong> {getBi({ de: 'Plattformagilität, UX-Tiefe, AI-Fokus, Hybridmodell MGA+Broker+IaaS.', en: 'Platform agility, UX depth, AI focus, and MGA+broker+IaaS hybrid model.' }, l)}</li>
                <li><strong>{getBi({ de: 'Schwächen:', en: 'Weaknesses:' }, l)}</strong> {getBi({ de: 'Frühe Phase, limitierte Capacity-Historie.', en: 'Early stage with limited capacity track record.' }, l)}</li>
                <li><strong>{getBi({ de: 'Chancen:', en: 'Opportunities:' }, l)}</strong> {getBi({ de: 'MGA-Skalierung mit digitalem Underwriting und Claims-Automation.', en: 'MGA scaling with digital underwriting and claims automation.' }, l)}</li>
                <li><strong>{getBi({ de: 'Risiken:', en: 'Threats:' }, l)}</strong> {getBi({ de: 'Incumbent-Druck, Kapitalbedarf und Partnerabhängigkeit.', en: 'Incumbent pressure, capital needs, and partner dependency.' }, l)}</li>
              </ul>
            </Card>
          </div>
        </Card>
      </div>
    </section>
  )
}

function Milestone({ title, body }: { title: string; body: string }) {
  return (
    <div style={{ border: '1px solid #e2e8f0', borderRadius: 10, padding: '0.65rem' }}>
      <div style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '0.2rem' }}>{title}</div>
      <div style={{ fontWeight: 700, color: '#0f172a' }}>{body}</div>
    </div>
  )
}

function SliderRow({ label, value, min, max, onChange }: { label: string; value: number; min: number; max: number; onChange: (value: number) => void }) {
  return (
    <label style={{ display: 'grid', gap: '0.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.84rem', color: '#475569' }}>
        <span>{label}</span>
        <strong style={{ color: '#0f172a' }}>{value}</strong>
      </div>
      <input type="range" min={min} max={max} value={value} onChange={(event) => onChange(Number(event.target.value))} />
    </label>
  )
}

function KpiCard({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ border: '1px solid #e2e8f0', borderRadius: 10, padding: '0.7rem', background: '#f8fafc' }}>
      <div style={{ color: '#64748b', fontSize: '0.8rem' }}>{label}</div>
      <div style={{ color: '#0f172a', fontSize: '1rem', fontWeight: 700 }}>{value}</div>
    </div>
  )
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(value)
}

const listStyle = {
  margin: 0,
  paddingLeft: '1.1rem',
  display: 'grid',
  gap: '0.4rem',
  color: '#334155',
  lineHeight: 1.5
}

const subHeadingStyle = {
  margin: 0,
  fontSize: '1rem',
  color: '#0f172a'
}

const pStyle = {
  margin: 0,
  color: '#334155',
  lineHeight: 1.6
}

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse' as const,
  fontSize: '0.9rem'
}

const headRowStyle = {
  background: '#f8fafc',
  color: '#0f172a'
}

const thStyle = {
  textAlign: 'left' as const,
  padding: '0.65rem 0.7rem',
  borderBottom: '1px solid #e2e8f0',
  fontWeight: 700,
  fontSize: '0.82rem'
}

const tdStyle = {
  padding: '0.6rem 0.7rem',
  borderBottom: '1px solid #eef2f7',
  verticalAlign: 'top' as const,
  color: '#334155'
}

const tdStrongStyle = {
  ...tdStyle,
  fontWeight: 700,
  color: '#0f172a'
}

const heatCellStyle = {
  border: '1px solid #e2e8f0',
  borderRadius: 8,
  padding: '0.35rem 0.45rem',
  fontSize: '0.8rem',
  color: '#334155',
  textAlign: 'center' as const
}
