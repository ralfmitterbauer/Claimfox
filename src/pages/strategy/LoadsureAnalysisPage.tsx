import { Scatter, ScatterChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import Card from '@/components/ui/Card'
import Header from '@/components/ui/Header'
import Button from '@/components/ui/Button'
import { useI18n } from '@/i18n/I18nContext'
import CapabilityScoreBar from '@/strategy/components/CapabilityScoreBar'

type BiText = { de: string; en: string }

type ComparisonRow = {
  category: BiText
  loadsure: BiText
  insurfox: BiText
}

const comparisonRows: ComparisonRow[] = [
  { category: { de: 'Kernumsatzmodell', en: 'Core Revenue Model' }, loadsure: { de: 'MGA-Provisionen und Prämienflüsse im Freight-Geschäft', en: 'MGA commissions and freight policy premium flows' }, insurfox: { de: 'Infrastruktur-Subskription und Plattformmonetarisierung', en: 'Infrastructure subscription and workflow platform monetization' } },
  { category: { de: 'Zielkunden', en: 'Target Customers' }, loadsure: { de: 'Versender, Logistikplattformen, Freight Broker', en: 'Shippers, logistics platforms, freight brokers' }, insurfox: { de: 'Versicherer, Makler, Flotten, Claims-Organisationen, Partner', en: 'Insurers, brokers, fleets, claims organizations, partners' } },
  { category: { de: 'Underwriting-Fähigkeit', en: 'Underwriting Capability' }, loadsure: { de: 'Live-Cargo-Risikopricing in Produktion', en: 'Live cargo risk pricing in production' }, insurfox: { de: 'Decision-Support und Regelorchestrierung (Infrastrukturphase)', en: 'Decision support and rule orchestration (infrastructure phase)' } },
  { category: { de: 'Schadenautomatisierung', en: 'Claims Automation' }, loadsure: { de: 'Fokussierte Freight-Claims-Automation', en: 'Focused freight claim handling automation' }, insurfox: { de: 'Modulübergreifende Claims-Prozessautomatisierung inkl. FNOL', en: 'Cross-module claims process automation with FNOL and workflow depth' } },
  { category: { de: 'Embedded APIs', en: 'Embedded APIs' }, loadsure: { de: 'Starkes Embedded-Freight-API-Modell', en: 'Strong embedded freight API model' }, insurfox: { de: 'Breitere Plattform-API-Vision über den Lebenszyklus', en: 'Broader platform API vision across insurance lifecycle modules' } },
  { category: { de: 'Geografischer Fokus', en: 'Geographic Focus' }, loadsure: { de: 'USA, UK und ausgewählte EU-Freight-Korridore', en: 'US, UK, and selected EU freight corridors' }, insurfox: { de: 'DACH-first mit internationaler Infrastrukturambition', en: 'DACH-first operating model with international infrastructure ambition' } },
  { category: { de: 'Produktbreite', en: 'Product Breadth' }, loadsure: { de: 'Freight-zentrierte Versicherungsprodukte', en: 'Freight-centric insurance products' }, insurfox: { de: 'Makler-, Claims-, Fleet-, Partner-, UW- und Governance-Module', en: 'Broker, claims, fleet, partner, underwriting, and governance modules' } },
  { category: { de: 'Strategische Position', en: 'Strategic Position' }, loadsure: { de: 'AI-native Specialty-Insurer/Operator', en: 'AI-native specialty insurer/operator' }, insurfox: { de: 'AI-getriebene Versicherungsinfrastruktur-Layer', en: 'AI-driven insurance infrastructure layer' } }
]

const positioningData = [
  { name: 'Loadsure', infraDepth: 62, productOwnership: 88 },
  { name: 'Insurfox', infraDepth: 90, productOwnership: 56 }
]

const swot = {
  loadsure: {
    strengths: { de: 'Kommerzieller Underwriting-Engine, Embedded-Distribution, klare Nischenspezialisierung.', en: 'Commercial underwriting engine, embedded insurance distribution, clear niche specialization.' },
    weaknesses: { de: 'Geringere Lifecycle-Kontrolle außerhalb freight-spezifischer Domänen.', en: 'Narrower lifecycle control outside freight-specific domains.' },
    opportunities: { de: 'Skalierung von Embedded-Partnerschaften und Korridor-Ausweitung.', en: 'Scale embedded distribution partnerships and expand corridor coverage.' },
    threats: { de: 'Carrier-Abhängigkeit, Pricing-Wettbewerb und Freight-Zyklenrisiko.', en: 'Carrier dependency, pricing competition, and freight cycle volatility.' }
  },
  insurfox: {
    strengths: { de: 'End-to-End-Infrastrukturvision, Modul-Ökosystem, Workflow- und UX-Tiefe.', en: 'Full-lifecycle infrastructure vision, module ecosystem, workflow and UX depth.' },
    weaknesses: { de: 'Frühe Kommerzialisierungsphase, Underwriting-Ökonomie noch nicht voll produktisiert.', en: 'Early commercialization stage, underwriting economics not yet fully productized.' },
    opportunities: { de: 'Enterprise-Plattformpositionierung über Broker-Carrier-Fleet-Modelle.', en: 'Enterprise platform positioning across broker-carrier-fleet operating models.' },
    threats: { de: 'Hoher Ausführungsdruck und Wettbewerb durch spezialisierte AI-MGA-Modelle.', en: 'Execution speed requirements and competition from specialized AI MGA models.' }
  }
}

const loadsureAiScores = [
  { label: { de: 'Dynamisches Pricing', en: 'Dynamic pricing' }, score: 4.6 },
  { label: { de: 'Risikoscore', en: 'Risk scoring' }, score: 4.4 },
  { label: { de: 'Freight-Datenintegration', en: 'Freight data integration' }, score: 4.3 }
]

const insurfoxAiScores = [
  { label: { de: 'Vision AI Schadenscan', en: 'Vision AI damage scan' }, score: 3.9 },
  { label: { de: 'Fraud-Scoring Potenzial', en: 'Fraud scoring potential' }, score: 3.7 },
  { label: { de: 'Prädiktives Flottenrisiko', en: 'Predictive fleet risk' }, score: 4.0 },
  { label: { de: 'Portfolio-Analytics', en: 'Portfolio analytics' }, score: 3.8 },
  { label: { de: 'Workflow-Automatisierung', en: 'Workflow automation' }, score: 4.2 }
]

function getBi(value: BiText, lang: 'de' | 'en') {
  return lang === 'de' ? value.de : value.en
}

export default function LoadsureAnalysisPage() {
  const { lang } = useI18n()
  const l = lang === 'de' ? 'de' : 'en'

  const text = {
    title: getBi({ de: 'Competitive Analysis: Loadsure vs Insurfox', en: 'Competitive Analysis: Loadsure vs Insurfox' }, l),
    subtitle: getBi({ de: 'AI-gestützte Freight Insurance vs intelligente Versicherungsinfrastruktur', en: 'AI-powered Freight Insurance vs Intelligent Insurance Infrastructure' }, l),
    export: getBi({ de: 'Als PDF exportieren', en: 'Export as PDF' }, l),
    executiveSummary: getBi({ de: 'Executive Summary', en: 'Executive Summary' }, l),
    summaryP1: getBi({ de: 'Loadsure operiert als AI-native, freight-fokussierte MGA mit klarer kommerzieller Ausrichtung: Live-Cargo-Pricing und Embedded-Insurance-Ausspielung über API-Kanäle.', en: 'Loadsure operates as an AI-native freight-focused MGA with a clear commercial proposition: live cargo pricing and embedded freight insurance delivery through API-enabled channels.' }, l),
    summaryP2: getBi({ de: 'Insurfox entwickelt einen breiteren Versicherungsinfrastruktur-Stack über Underwriting, Broker-Workflows, FNOL, Claims-Orchestrierung, Partnersteuerung und Fleet-Risk-Operationen.', en: 'Insurfox is developing a broader insurance infrastructure stack that spans underwriting, broker workflows, FNOL, claims orchestration, partner coordination, and fleet risk operations through modular products.' }, l),
    summaryP3: getBi({ de: 'Strategisch optimiert Loadsure auf vertikale Produkt-Ownership im Freight-Segment. Insurfox optimiert auf horizontale Prozess-Ownership über den gesamten Versicherungslifecycle.', en: 'Strategically, Loadsure optimizes for vertical insurance product ownership in freight. Insurfox optimizes for horizontal process ownership across the insurance lifecycle.' }, l),
    summaryP4: getBi({ de: 'Insurfox hat strategische Hebel dort, wo Kunden domänenübergreifende Orchestrierung und langfristige Modernisierung des Operating Models benötigen.', en: 'Insurfox has leverage where clients need cross-domain orchestration and long-term operating model modernization.' }, l),
    profileLoadsure: getBi({ de: 'Loadsure', en: 'Loadsure' }, l),
    profileInsurfox: getBi({ de: 'Insurfox', en: 'Insurfox' }, l),
    businessModelComparison: getBi({ de: 'Geschäftsmodellvergleich', en: 'Business Model Comparison' }, l),
    marketChart: getBi({ de: 'Marktpositionierungs-Chart', en: 'Market Positioning Chart' }, l),
    riskMatrix: getBi({ de: 'Risikomatrix', en: 'Risk Matrix' }, l),
    aiLoadsure: getBi({ de: 'Loadsure AI Capability', en: 'Loadsure AI Capability' }, l),
    aiInsurfox: getBi({ de: 'Insurfox AI Capability Vision', en: 'Insurfox AI Capability Vision' }, l),
    gapTitle: getBi({ de: 'Strategische Gap-Analyse', en: 'Strategic Gap Analysis' }, l),
    gapLoadsure: getBi({ de: 'Wo Loadsure vorne ist', en: 'Where Loadsure is ahead' }, l),
    gapInsurfox: getBi({ de: 'Wo Insurfox differenziert', en: 'Where Insurfox differentiates' }, l),
    swotTitle: getBi({ de: 'SWOT Vergleich', en: 'SWOT Comparison' }, l),
    recoTitle: getBi({ de: 'Strategische Empfehlung (CEO View)', en: 'Strategic Recommendation (CEO View)' }, l),
    financeTitle: getBi({ de: 'Financial Estimation Panel', en: 'Financial Estimation Panel' }, l),
    conclusionTitle: getBi({ de: 'Fazit', en: 'Conclusion' }, l),
    category: getBi({ de: 'Kategorie', en: 'Category' }, l),
    dimension: getBi({ de: 'Dimension', en: 'Dimension' }, l),
    strengths: getBi({ de: 'Stärken', en: 'Strengths' }, l),
    weaknesses: getBi({ de: 'Schwächen', en: 'Weaknesses' }, l),
    opportunities: getBi({ de: 'Chancen', en: 'Opportunities' }, l),
    threats: getBi({ de: 'Risiken', en: 'Threats' }, l)
  }

  return (
    <section className="page" style={{ gap: '1.25rem', background: '#ffffff', paddingTop: '1rem' }}>
      <style>{`
        @media print {
          @page { size: A4 landscape; margin: 10mm; }
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
          .loadsure-print-hide { display: none !important; }
        }
      `}</style>
      <div style={{ width: '100%', maxWidth: 1240, margin: '0 auto', display: 'grid', gap: '1.25rem' }}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', flexWrap: 'wrap' }}>
            <Header title={text.title} subtitle={text.subtitle} titleColor="#0f172a" subtitleColor="#475569" />
            <Button className="loadsure-print-hide" size="sm" onClick={() => window.print()}>{text.export}</Button>
          </div>
        </Card>

        <Card title={text.executiveSummary}>
          <div style={{ display: 'grid', gap: '0.75rem', color: '#334155', lineHeight: 1.65 }}>
            <p style={{ margin: 0 }}>{text.summaryP1}</p>
            <p style={{ margin: 0 }}>{text.summaryP2}</p>
            <p style={{ margin: 0 }}>{text.summaryP3}</p>
            <p style={{ margin: 0 }}>{text.summaryP4}</p>
          </div>
        </Card>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1rem' }}>
          <Card title={text.profileLoadsure}>
            <ul style={listStyle}>
              <li>{getBi({ de: 'Business model: MGA / Lloyd’s Coverholder', en: 'Business model: MGA / Lloyd’s Coverholder' }, l)}</li>
              <li>{getBi({ de: 'Fokus: On-demand Cargo Insurance', en: 'Focus: On-demand cargo insurance' }, l)}</li>
              <li>{getBi({ de: 'Kernprodukte: Thames, Orinoco, Danube und freight-spezifische Angebote', en: 'Core products: Thames, Orinoco, Danube and freight-specific offerings' }, l)}</li>
              <li>{getBi({ de: 'AI Underwriting Engine in produktivem Einsatz', en: 'AI underwriting engine in commercial deployment' }, l)}</li>
              <li>{getBi({ de: 'API-first Architektur für Embedded Distribution', en: 'API-first architecture for embedded distribution' }, l)}</li>
              <li>{getBi({ de: 'Geografie: US + UK + EU', en: 'Geography: US + UK + EU' }, l)}</li>
              <li>{getBi({ de: 'Funding: ca. USD 11M Series A', en: 'Funding: approximately USD 11M Series A' }, l)}</li>
              <li>{getBi({ de: 'Geschätzte Mitarbeiterzahl: 10-100', en: 'Estimated employee range: 10-100' }, l)}</li>
            </ul>
          </Card>
          <Card title={text.profileInsurfox}>
            <ul style={listStyle}>
              <li>{getBi({ de: 'IaaS-Infrastrukturmodell für Versicherungsoperationen', en: 'IaaS infrastructure model for insurance operations' }, l)}</li>
              <li>{getBi({ de: 'Kernmodule: Claimsfox, Brokerfox, Fleetfox, Partnerfox', en: 'Core modules: Claimsfox, Brokerfox, Fleetfox, Partnerfox' }, l)}</li>
              <li>{getBi({ de: 'AI-getriebene Workflows, UX, FNOL, Risiko- und Analytics-Funktionen', en: 'AI-driven workflow, UX, FNOL, risk, and analytics capabilities' }, l)}</li>
              <li>{getBi({ de: 'Ökosystem-Ambition über Broker, Versicherer, Rückversicherer und Flotten', en: 'Ecosystem ambition across broker, insurer, reinsurer, and fleet contexts' }, l)}</li>
              <li>{getBi({ de: 'Aktuelle Reife: Prototyp zu Infrastruktur-Build-Phase', en: 'Current maturity: prototype to infrastructure build phase' }, l)}</li>
            </ul>
          </Card>
        </div>

        <Card title={text.businessModelComparison}>
          <div style={{ overflowX: 'auto' }}>
            <table style={tableStyle}>
              <thead>
                <tr style={headRowStyle}>
                  <th style={thStyle}>{text.category}</th>
                  <th style={thStyle}>Loadsure</th>
                  <th style={thStyle}>Insurfox</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row) => (
                  <tr key={row.category.en}>
                    <td style={tdStrongStyle}>{getBi(row.category, l)}</td>
                    <td style={tdStyle}>{getBi(row.loadsure, l)}</td>
                    <td style={tdStyle}>{getBi(row.insurfox, l)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.3fr) minmax(320px, 1fr)', gap: '1rem' }}>
          <Card title={text.marketChart}>
            <div style={{ height: 320 }}>
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 10, right: 12, left: 10, bottom: 12 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis type="number" dataKey="infraDepth" name={getBi({ de: 'Infrastructure Depth', en: 'Infrastructure Depth' }, l)} domain={[0, 100]} stroke="#475569" />
                  <YAxis type="number" dataKey="productOwnership" name={getBi({ de: 'Insurance Product Ownership', en: 'Insurance Product Ownership' }, l)} domain={[0, 100]} stroke="#475569" />
                  <Tooltip
                    cursor={{ strokeDasharray: '3 3' }}
                    formatter={(value: number, key: string) => [String(value), key === 'infraDepth' ? getBi({ de: 'Infrastructure Depth', en: 'Infrastructure Depth' }, l) : getBi({ de: 'Insurance Product Ownership', en: 'Insurance Product Ownership' }, l)]}
                    labelFormatter={(_, payload) => (payload?.[0]?.payload?.name ?? '') as string}
                  />
                  <Scatter data={positioningData} fill="#d4380d" />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </Card>
          <Card title={text.riskMatrix}>
            <div style={{ display: 'grid', gap: '0.55rem' }}>
              <RiskRow label={getBi({ de: 'Execution Speed Risk (Insurfox)', en: 'Execution Speed Risk (Insurfox)' }, l)} level={getBi({ de: 'Mittel-Hoch', en: 'Medium-High' }, l)} />
              <RiskRow label={getBi({ de: 'Pricing Engine Moat (Loadsure)', en: 'Pricing Engine Moat (Loadsure)' }, l)} level={getBi({ de: 'Hoch', en: 'High' }, l)} />
              <RiskRow label={getBi({ de: 'Platform Adoption Risk (Insurfox)', en: 'Platform Adoption Risk (Insurfox)' }, l)} level={getBi({ de: 'Mittel', en: 'Medium' }, l)} />
              <RiskRow label={getBi({ de: 'Market Concentration Risk (Loadsure)', en: 'Market Concentration Risk (Loadsure)' }, l)} level={getBi({ de: 'Mittel-Hoch', en: 'Medium-High' }, l)} />
              <RiskRow label={getBi({ de: 'Partnership Dependence Risk (Both)', en: 'Partnership Dependence Risk (Both)' }, l)} level={getBi({ de: 'Mittel', en: 'Medium' }, l)} />
            </div>
          </Card>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1rem' }}>
          <Card title={text.aiLoadsure}>
            <div style={{ display: 'grid', gap: '0.65rem' }}>
              {loadsureAiScores.map((item) => <CapabilityScoreBar key={item.label.en} label={getBi(item.label, l)} score={item.score} />)}
            </div>
          </Card>
          <Card title={text.aiInsurfox}>
            <div style={{ display: 'grid', gap: '0.65rem' }}>
              {insurfoxAiScores.map((item) => <CapabilityScoreBar key={item.label.en} label={getBi(item.label, l)} score={item.score} />)}
            </div>
          </Card>
        </div>

        <Card title={text.gapTitle}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1rem' }}>
            <div>
              <h3 style={subHeadingStyle}>{text.gapLoadsure}</h3>
              <ul style={listStyle}>
                <li>{getBi({ de: 'Live-Underwriting-Engine in aktiver Freight-Produktion.', en: 'Live underwriting engine in active freight deployment.' }, l)}</li>
                <li>{getBi({ de: 'Operatives Embedded-Insurance-API-Modell.', en: 'Operational embedded insurance API model.' }, l)}</li>
                <li>{getBi({ de: 'Kommerziell validierter Product-Market-Fit im Nischensegment.', en: 'Commercially proven product-market fit in niche vertical.' }, l)}</li>
              </ul>
            </div>
            <div>
              <h3 style={subHeadingStyle}>{text.gapInsurfox}</h3>
              <ul style={listStyle}>
                <li>{getBi({ de: 'Full-Lifecycle-Infrastruktur über Versicherungsoperationen hinweg.', en: 'Full-lifecycle infrastructure capability across insurance operations.' }, l)}</li>
                <li>{getBi({ de: 'Multi-Modul-Ökosystem mit erweiterbarer Architektur.', en: 'Multi-module ecosystem with extensible architecture.' }, l)}</li>
                <li>{getBi({ de: 'UX-Tiefe in FNOL, AI-Scan und End-to-End-Workflow-Orchestrierung.', en: 'UX depth across FNOL, AI scan, and end-to-end workflow orchestration.' }, l)}</li>
                <li>{getBi({ de: 'Integriertes Broker-, Fleet-, Claims- und Partner-Operating-Model.', en: 'Integrated broker, fleet, claims, and partner operating model.' }, l)}</li>
              </ul>
            </div>
          </div>
        </Card>

        <Card title={text.swotTitle}>
          <div style={{ overflowX: 'auto' }}>
            <table style={tableStyle}>
              <thead>
                <tr style={headRowStyle}>
                  <th style={thStyle}>{text.dimension}</th>
                  <th style={thStyle}>Loadsure</th>
                  <th style={thStyle}>Insurfox</th>
                </tr>
              </thead>
              <tbody>
                <tr><td style={tdStrongStyle}>{text.strengths}</td><td style={tdStyle}>{getBi(swot.loadsure.strengths, l)}</td><td style={tdStyle}>{getBi(swot.insurfox.strengths, l)}</td></tr>
                <tr><td style={tdStrongStyle}>{text.weaknesses}</td><td style={tdStyle}>{getBi(swot.loadsure.weaknesses, l)}</td><td style={tdStyle}>{getBi(swot.insurfox.weaknesses, l)}</td></tr>
                <tr><td style={tdStrongStyle}>{text.opportunities}</td><td style={tdStyle}>{getBi(swot.loadsure.opportunities, l)}</td><td style={tdStyle}>{getBi(swot.insurfox.opportunities, l)}</td></tr>
                <tr><td style={tdStrongStyle}>{text.threats}</td><td style={tdStyle}>{getBi(swot.loadsure.threats, l)}</td><td style={tdStyle}>{getBi(swot.insurfox.threats, l)}</td></tr>
              </tbody>
            </table>
          </div>
        </Card>

        <Card title={text.recoTitle}>
          <div style={{ display: 'grid', gap: '0.8rem', color: '#334155', lineHeight: 1.6 }}>
            <p style={{ margin: 0 }}>{getBi({ de: 'Insurfox sollte keine direkte taktische Replikation des freight-spezifischen Loadsure-Modells als Primärstrategie verfolgen. Der stärkere Pfad ist selektive Capability-Parität bei gleichzeitiger Infrastruktur-Differenzierung.', en: 'Insurfox should not pursue direct tactical replication of Loadsure’s freight niche model as a primary strategy. The stronger path is selective capability parity combined with infrastructure-led differentiation.' }, l)}</p>
            <p style={{ margin: 0 }}>{getBi({ de: 'Partnerschaft bleibt dort sinnvoll, wo Freight-Pricing-Engines modular integriert werden können und Insurfox gleichzeitig die Orchestrierungs-Ownership über Underwriting, Claims und Partner-Workflows hält.', en: 'Partnership should remain an option where freight pricing engines can be integrated through modular interfaces while Insurfox maintains orchestration ownership across underwriting, claims, and partner workflows.' }, l)}</p>
            <p style={{ margin: 0 }}>{getBi({ de: 'Ein Pricing-/Risk-Micro-Engine sollte als Infrastrukturkomponente entwickelt oder integriert werden, nicht als isolierte Freight-Produktstrategie.', en: 'A pricing/risk micro-engine should be developed or integrated as an infrastructure component, not as a standalone freight insurance product strategy.' }, l)}</p>
            <p style={{ margin: 0 }}>{getBi({ de: 'Langfristig sollte sich Insurfox als Operating Layer für Multi-Party-Insurance-Execution über Broker, Versicherer, Rückversicherer und Flotten positionieren.', en: 'Long-term differentiation should focus on becoming the operating layer for multi-party insurance execution across brokers, insurers, reinsurers, and fleets.' }, l)}</p>
          </div>
        </Card>

        <Card title={text.financeTitle}>
          <div style={{ display: 'grid', gap: '0.7rem', color: '#334155' }}>
            <div style={financeBoxStyle}>
              <strong>{getBi({ de: 'Loadsure Szenariomodell', en: 'Loadsure scenario model' }, l)}</strong>
              <span>{getBi({ de: 'Geschätztes GWP-Potenzial (Freight-Nische): EUR 350M - EUR 700M Korridor (Szenariorange).', en: 'Estimated GWP potential (freight niche): EUR 350M - EUR 700M corridor (scenario range).' }, l)}</span>
              <span>{getBi({ de: 'Geschätzte Bewertungsrange: MGA-Multiplikatormodell mit ca. 3x - 6x Revenue-Annahme.', en: 'Estimated valuation range: MGA-style multiple model at approximately 3x - 6x revenue assumption.' }, l)}</span>
            </div>
            <div style={financeBoxStyle}>
              <strong>{getBi({ de: 'Insurfox Szenariomodell', en: 'Insurfox scenario model' }, l)}</strong>
              <span>{getBi({ de: 'Infrastruktur-Plattform-Multiple-Potenzial: ca. 6x - 12x ARR bei erreichter Plattformskalierung und wiederkehrender Enterprise-Integration.', en: 'Infrastructure platform multiple potential: approximately 6x - 12x ARR if platform scale and recurring enterprise integration are achieved.' }, l)}</span>
            </div>
            <div style={{ fontSize: '0.83rem', color: '#64748b' }}>
              {getBi({ de: 'Alle Zahlen sind strategische Szenariomodelle für Board-Planung und keine geprüfte Finanzguidance.', en: 'All figures are strategic scenario models for board-level planning and not audited financial guidance.' }, l)}
            </div>
          </div>
        </Card>

        <Card title={text.conclusionTitle}>
          <p style={{ margin: 0, color: '#334155', lineHeight: 1.7 }}>
            {getBi({ de: 'Loadsure ist als AI-native Freight-Insurer positioniert. Insurfox ist als AI-getriebene Versicherungsinfrastrukturplattform positioniert. Die strategische Implikation: beide adressieren unterschiedliche Ebenen der Wertschöpfungskette – Produkt-Ownership vs. Operating-Infrastructure.', en: 'Loadsure is positioned as an AI-native freight insurer. Insurfox is positioned as an AI-driven insurance infrastructure platform. The strategic implication is that both sit on different layers of the value chain: product ownership vs operating infrastructure.' }, l)}
          </p>
        </Card>
      </div>
    </section>
  )
}

function RiskRow({ label, level }: { label: string; level: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.7rem', border: '1px solid #e2e8f0', borderRadius: 10, padding: '0.55rem 0.65rem' }}>
      <span style={{ color: '#334155', fontSize: '0.88rem' }}>{label}</span>
      <strong style={{ color: '#0f172a', fontSize: '0.86rem' }}>{level}</strong>
    </div>
  )
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
  margin: '0 0 0.4rem 0',
  fontSize: '1rem',
  color: '#0f172a'
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
  color: '#0f172a',
  fontWeight: 600
}

const financeBoxStyle = {
  display: 'grid',
  gap: '0.35rem',
  border: '1px solid #e2e8f0',
  borderRadius: 10,
  padding: '0.65rem 0.75rem'
}
