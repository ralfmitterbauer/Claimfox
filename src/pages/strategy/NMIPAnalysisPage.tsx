import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import Card from '@/components/ui/Card'
import Header from '@/components/ui/Header'
import Button from '@/components/ui/Button'
import { useI18n } from '@/i18n/I18nContext'
import NmiLogoMain from '@/assets/images/NMI_Logo_main.png'

type BiText = { de: string; en: string }

type ProductRow = {
  product: BiText
  strategicValue: BiText
  overlap: BiText
  synergy: BiText
}

type ScoreRow = {
  category: BiText
  score: number
  weight: number
  commentary: BiText
}

type ContactRow = {
  name: string
  role: BiText
  region: BiText
  email: string
  phone: string
  relevance: BiText
}

const productRows: ProductRow[] = [
  {
    product: { de: 'Delay Insurance', en: 'Delay Insurance' },
    strategicValue: { de: 'Ergänzt maritime Supply-Chain-Risiken in Spezialsegmenten.', en: 'Extends specialty maritime supply-chain risk coverage.' },
    overlap: { de: 'Niedrig bis mittel', en: 'Low to medium' },
    synergy: { de: 'Hoch bei maritimen Logistikmandaten', en: 'High for maritime logistics mandates' }
  },
  {
    product: { de: 'Primary Layer Loss of Earnings', en: 'Primary Layer Loss of Earnings' },
    strategicValue: { de: 'Erweitert Ertragsausfall-Absicherung für Reedereien.', en: 'Adds earnings-loss protection for maritime operators.' },
    overlap: { de: 'Niedrig', en: 'Low' },
    synergy: { de: 'Mittel bis hoch', en: 'Medium to high' }
  },
  {
    product: { de: 'Nordic Hull (MGA)', en: 'Nordic Hull (MGA)' },
    strategicValue: { de: 'Kapazitätszugang für H&M-Nische über MGA-Struktur.', en: 'Access to hull niche capacity via MGA structure.' },
    overlap: { de: 'Niedrig', en: 'Low' },
    synergy: { de: 'Hoch als Capacity-Baustein', en: 'High as a capacity component' }
  },
  {
    product: { de: 'Loss of Hire', en: 'Loss of Hire' },
    strategicValue: { de: 'Maritimer Betriebsunterbrechungs-Baustein.', en: 'Maritime business interruption component.' },
    overlap: { de: 'Niedrig', en: 'Low' },
    synergy: { de: 'Mittel', en: 'Medium' }
  },
  {
    product: { de: 'Maritime Lien Insurance', en: 'Maritime Lien Insurance' },
    strategicValue: { de: 'Spezialdeckung für rechtliche Forderungsrisiken.', en: 'Specialized coverage for legal maritime lien exposures.' },
    overlap: { de: 'Sehr niedrig', en: 'Very low' },
    synergy: { de: 'Selektiv', en: 'Selective' }
  }
]

const scoreRows: ScoreRow[] = [
  { category: { de: 'Capacity Strength', en: 'Capacity Strength' }, score: 8, weight: 0.23, commentary: { de: 'Starke marine Spezialisierung mit belastbarer Partnerstruktur.', en: 'Strong marine specialization with solid partner backing.' } },
  { category: { de: 'Strategic Fit (Marine)', en: 'Strategic Fit (Marine)' }, score: 9, weight: 0.22, commentary: { de: 'Sehr hoher Fit für marine Erweiterung des MGA-Modells.', en: 'Very high fit for marine MGA expansion.' } },
  { category: { de: 'Strategic Fit (Fleet)', en: 'Strategic Fit (Fleet)' }, score: 4, weight: 0.12, commentary: { de: 'Begrenzter Nutzen außerhalb maritimer Risikodomänen.', en: 'Limited value outside maritime risk domains.' } },
  { category: { de: 'Digital Maturity', en: 'Digital Maturity' }, score: 5, weight: 0.14, commentary: { de: 'Keine vollintegrierte digitale Plattformtiefe sichtbar.', en: 'No full-stack digital platform depth visible.' } },
  { category: { de: 'Scalability', en: 'Scalability' }, score: 6, weight: 0.14, commentary: { de: 'Skalierbar in Nischen, aber nicht als Multi-Line-Backbone.', en: 'Scalable in niche lines, not as a multi-line backbone.' } },
  { category: { de: 'Partnership Value', en: 'Partnership Value' }, score: 8, weight: 0.15, commentary: { de: 'Hoher Mehrwert als Specialty-Capacity-Partner.', en: 'High value as a specialty capacity partner.' } }
]

const scoreChartData = scoreRows.map((row) => ({
  category: row.category.en,
  score: row.score
}))

const nmipContacts: ContactRow[] = [
  {
    name: 'Dan Lennhammer',
    role: { de: 'Managing Director', en: 'Managing Director' },
    region: { de: 'Stockholm, Schweden', en: 'Stockholm, Sweden' },
    email: 'dan@nmip.se',
    phone: '+46 707 498 260',
    relevance: {
      de: 'Primärer Entscheider für Management, Underwriting-Fokus und Partnerschaften.',
      en: 'Primary decision maker for management, underwriting focus, and partnerships.'
    }
  },
  {
    name: 'Jan Limnell',
    role: { de: 'Deputy Managing Director & UW Director', en: 'Deputy Managing Director & UW Director' },
    region: { de: 'Nordics / Europa', en: 'Nordics / Europe' },
    email: 'jan@nmip.se',
    phone: '+358 40 589 3398',
    relevance: {
      de: 'Zentral für Underwriting-Richtlinien, Risikoselektion und Produktsteuerung.',
      en: 'Central for underwriting guidelines, risk selection, and product steering.'
    }
  },
  {
    name: 'Claudio Blancardi',
    role: { de: 'Marketing Director', en: 'Marketing Director' },
    region: { de: 'Europa / globales Marine-Netzwerk', en: 'Europe / global marine network' },
    email: 'claudio@nmip.se',
    phone: '+46 733 780 110',
    relevance: {
      de: 'Wichtiger Ansprechpartner für Distribution, Positionierung und Broker-Zugang.',
      en: 'Key contact for distribution, positioning, and broker access.'
    }
  },
  {
    name: 'Magnus Hammarqvist',
    role: { de: 'Claims Director', en: 'Claims Director' },
    region: { de: 'Schweden / international', en: 'Sweden / international' },
    email: 'magnus@nmip.se',
    phone: '+46 766 279 051',
    relevance: {
      de: 'Relevant für Claims-Prozesse, Schadensteuerung und operative Integration.',
      en: 'Relevant for claims processes, claims steering, and operational integration.'
    }
  },
  {
    name: 'Charlotte Djerf',
    role: { de: 'Chief Governance Officer', en: 'Chief Governance Officer' },
    region: { de: 'Stockholm, Schweden', en: 'Stockholm, Sweden' },
    email: 'charlotte@nmip.se',
    phone: '+46 709 582 172',
    relevance: {
      de: 'Schlüsselrolle für Governance, Beschwerdeprozesse und regulatorische Themen.',
      en: 'Key role for governance, complaints process, and regulatory topics.'
    }
  },
  {
    name: 'Therese Rislund',
    role: { de: 'Chief Financial Officer', en: 'Chief Financial Officer' },
    region: { de: 'Stockholm, Schweden', en: 'Stockholm, Sweden' },
    email: 'therese@nmip.se',
    phone: '+46 76 847 2395',
    relevance: {
      de: 'Wichtig für Finanzmodellierung, Reporting und Kapitalfragen.',
      en: 'Important for financial modeling, reporting, and capital topics.'
    }
  }
]

function bi(value: BiText, lang: 'de' | 'en') {
  return lang === 'de' ? value.de : value.en
}

export default function NMIPAnalysisPage() {
  const { lang } = useI18n()
  const l = lang === 'de' ? 'de' : 'en'
  const now = new Date()
  const weightedScore = scoreRows.reduce((sum, row) => sum + row.score * row.weight, 0)

  function handlePdfExport() {
    const oldTitle = document.title
    document.title = 'WTW_Strategic_MGA_Analysis_Insurfox'.replace('WTW', 'NMIP')
    window.print()
    window.setTimeout(() => { document.title = oldTitle }, 700)
  }

  return (
    <section className="page" style={{ gap: '1.25rem', background: '#ffffff', paddingTop: '1rem' }}>
      <style>{`
        .nmip-hero-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.1fr) minmax(320px, 0.9fr);
          gap: 1rem;
          align-items: start;
        }
        @media (max-width: 980px) {
          .nmip-hero-grid { grid-template-columns: 1fr; }
        }
        @media print {
          @page { size: A4 landscape; margin: 10mm; }
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
          .nmip-print-hide { display: none !important; }
        }
      `}</style>
      <div style={{ width: '100%', maxWidth: 1240, margin: '0 auto', display: 'grid', gap: '1.1rem' }}>
        <Card>
          <div className="nmip-hero-grid">
            <div style={{ display: 'grid', gap: '0.8rem' }}>
              <Header
                title={bi({ de: 'Nordic Marine Insurance (NMIP) – Strategische Capacity- & Marine-Nischenanalyse', en: 'Nordic Marine Insurance (NMIP) – Strategic Capacity & Marine Niche Analysis' }, l)}
                subtitle={bi({ de: 'Executive-Bewertung für Insurfox Plattform- & MGA-Strategie', en: 'Executive Assessment for Insurfox Platform & MGA Strategy' }, l)}
                titleColor="#0f172a"
                subtitleColor="#475569"
              />
              <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center', flexWrap: 'wrap' }}>
                <div style={{ width: 78, height: 34, border: '1px solid #dbe2ea', borderRadius: 8, display: 'grid', placeItems: 'center', color: '#64748b', fontSize: '0.72rem' }}>
                  NMIP
                </div>
                <span style={metaPillStyle}>Sweden</span>
                <span style={metaPillStyle}>2012</span>
                <span style={metaPillStyle}>Solvency II</span>
                <span style={metaPillStyle}>West P&amp;I Alignment</span>
              </div>
            </div>
            <div style={{ display: 'grid', gap: '0.6rem', justifyItems: 'end' }}>
              <Button className="nmip-print-hide" size="sm" onClick={handlePdfExport}>
                {bi({ de: 'Executive Report (PDF) herunterladen', en: 'Download Full Executive PDF' }, l)}
              </Button>
              <Card title={bi({ de: 'Kernfakten', en: 'Key Facts' }, l)} style={{ width: '100%' }}>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '0.55rem' }}>
                  <img
                    src={NmiLogoMain}
                    alt="Nordic Marine Insurance"
                    style={{ width: 190, maxWidth: '100%', objectFit: 'contain' }}
                  />
                </div>
                <ul style={listStyle}>
                  <li>{bi({ de: 'Fokus: Marine-Nischenzeichnung', en: 'Focus: Marine niche underwriting' }, l)}</li>
                  <li>{bi({ de: 'Produkte: Delay / Loss of Earnings / Hull / Maritime Lien', en: 'Core products: Delay / Loss of Earnings / Hull / Maritime Lien' }, l)}</li>
                  <li>{bi({ de: 'Modell: Direktversicherer + MGA Facilities', en: 'Model: Direct insurer + MGA facilities' }, l)}</li>
                  <li>{bi({ de: 'Geografie: EU und globales Marinegeschäft', en: 'Geography: EU and global marine business' }, l)}</li>
                </ul>
              </Card>
            </div>
          </div>
          <div style={{ marginTop: '0.8rem', color: '#64748b', fontSize: '0.8rem' }}>
            {now.toLocaleDateString(l === 'de' ? 'de-DE' : 'en-US')} · {bi({ de: 'Confidential – Insurfox Strategy', en: 'Confidential – Insurfox Strategy' }, l)}
          </div>
        </Card>

        <Card title={bi({ de: 'Geschäftsmodellanalyse', en: 'Business Model Analysis' }, l)}>
          <div style={{ display: 'grid', gap: '0.8rem', color: '#334155', lineHeight: 1.65 }}>
            <p style={{ margin: 0 }}><strong>A) {bi({ de: 'Kern-Geschäftsmodell', en: 'Core Business Model' }, l)}:</strong> {bi({ de: 'NMIP agiert als spezialisierter Marine-Versicherer mit Fokus auf nicht standardisierte Risikolücken wie Delay und Loss of Earnings sowie MGA-orientierte Hull-Facilities.', en: 'NMIP operates as a specialized marine insurer focused on non-standard risk gaps such as delay and loss of earnings, including MGA-oriented hull facilities.' }, l)}</p>
            <p style={{ margin: 0 }}><strong>B) {bi({ de: 'Erlösmodell (geschätzt / strukturiert)', en: 'Revenue Model (Estimated / Structured)' }, l)}:</strong> {bi({ de: 'Strategische Modellierung: GWP-Korridor EUR 180 Mio.–260 Mio., Kommissionserlöse aus MGA-Facilities, Risikopartizipation und rückversicherungsgestützte Kapitalhebel.', en: 'Strategic estimate model: GWP corridor EUR 180M–260M, commission income from MGA facilities, risk participation income, and reinsurance leverage.' }, l)}</p>
            <div style={{ fontSize: '0.82rem', color: '#64748b' }}>
              {bi({ de: 'Strategische Schätzung auf Basis der Marktpositionierung', en: 'Strategic estimate based on market positioning' }, l)}
            </div>
          </div>
        </Card>

        <Card title={bi({ de: 'Produktanalyse – Marine- & Transportkontext', en: 'Product Analysis – Marine & Transport Context' }, l)}>
          <div style={{ overflowX: 'auto' }}>
            <table style={tableStyle}>
              <thead>
                <tr style={headRowStyle}>
                  <th style={thStyle}>{bi({ de: 'Produkt', en: 'Product' }, l)}</th>
                  <th style={thStyle}>{bi({ de: 'Strategischer Wert für Insurfox', en: 'Strategic Value for Insurfox' }, l)}</th>
                  <th style={thStyle}>{bi({ de: 'Überschneidung mit Insurfox', en: 'Overlap with Insurfox' }, l)}</th>
                  <th style={thStyle}>{bi({ de: 'Synergiepotenzial', en: 'Synergy Potential' }, l)}</th>
                </tr>
              </thead>
              <tbody>
                {productRows.map((row) => (
                  <tr key={row.product.en}>
                    <td style={tdStrongStyle}>{bi(row.product, l)}</td>
                    <td style={tdStyle}>{bi(row.strategicValue, l)}</td>
                    <td style={tdStyle}>{bi(row.overlap, l)}</td>
                    <td style={tdStyle}>{bi(row.synergy, l)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ margin: '0.75rem 0 0', color: '#334155' }}>
            {bi(
              {
                de: 'Die NMIP-Produkte ergänzen maritime Logistikrisiken, decken jedoch keine Fleet-/Road-Mobility-Domänen ab und bleiben klar marine-nischig.',
                en: 'NMIP products complement maritime logistics risk but do not cover fleet/road mobility domains and remain clearly marine-niche.'
              },
              l
            )}
          </p>
        </Card>

        <Card title={bi({ de: 'Strategischer Vergleich', en: 'Strategic Comparison' }, l)}>
          <div style={{ display: 'grid', gap: '0.65rem', color: '#334155' }}>
            <ComparisonBlock title={bi({ de: 'NMIP vs Global Multi-Line Insurer', en: 'NMIP vs Global Multi-Line Insurer' }, l)} body={bi({ de: 'NMIP liefert Tiefenexpertise in Marine-Nischen, jedoch ohne Multi-Line-Breite eines globalen Composite-Carriers.', en: 'NMIP provides deep marine niche expertise but lacks the multi-line breadth of global composite carriers.' }, l)} />
            <ComparisonBlock title={bi({ de: 'NMIP vs Broker (WTW/Marsh)', en: 'NMIP vs Broker (WTW/Marsh)' }, l)} body={bi({ de: 'WTW/Marsh dominieren Distribution und Capacity-Placement; NMIP liefert Produkt-/Risikofokus in maritimen Speziallinien.', en: 'WTW/Marsh dominate distribution and capacity placement; NMIP contributes specialized marine risk focus.' }, l)} />
            <ComparisonBlock title={bi({ de: 'NMIP vs Digital Cargo InsurTech (Loadsure)', en: 'NMIP vs Digital Cargo InsurTech (Loadsure)' }, l)} body={bi({ de: 'Loadsure ist stärker digital/API-nativ, NMIP stärker marine-underwriting-zentriert.', en: 'Loadsure is more digital/API-native, while NMIP is more marine-underwriting-centric.' }, l)} />
            <ComparisonBlock title={bi({ de: 'NMIP vs Insurfox (Platform + MGA Hybrid)', en: 'NMIP vs Insurfox (Platform + MGA Hybrid)' }, l)} body={bi({ de: 'Insurfox vereint Plattform, MGA und Broker-Rolle über mehrere Linien; NMIP bleibt fokussierter Marine-Spezialist.', en: 'Insurfox combines platform, MGA, and broker roles across multiple lines; NMIP remains a focused marine specialist.' }, l)} />
          </div>
          <p style={{ margin: '0.75rem 0 0', color: '#334155' }}>
            {bi({ de: 'Fazit: NMIP ist ein Specialty-Capacity-Partner, kein Full-Ecosystem-Konkurrent zu Insurfox.', en: 'Conclusion: NMIP is a specialty capacity partner, not a full ecosystem competitor to Insurfox.' }, l)}
          </p>
        </Card>

        <Card title={bi({ de: 'Strategischer Fit für Insurfox', en: 'Strategic Fit for Insurfox' }, l)}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '0.8rem' }}>
            <ScenarioCard
              title={bi({ de: 'Scenario A – Capacity Partner for Marine', en: 'Scenario A – Capacity Partner for Marine' }, l)}
              body={bi({ de: 'NMIP wird als Specialty-Capacity für maritime Risiken in das Insurfox-Underwriting-Modul integriert.', en: 'NMIP is integrated as specialty capacity for maritime risks in the Insurfox underwriting module.' }, l)}
            />
            <ScenarioCard
              title={bi({ de: 'Scenario B – Product Extension', en: 'Scenario B – Product Extension' }, l)}
              body={bi({ de: 'Marine Delay Insurance ergänzt das Insurfox-Logistikangebot in ausgewählten Programmen.', en: 'Marine delay insurance extends the Insurfox logistics offering in selected programs.' }, l)}
            />
            <ScenarioCard
              title={bi({ de: 'Scenario C – Limited Strategic Fit', en: 'Scenario C – Limited Strategic Fit' }, l)}
              body={bi({ de: 'Bei Fokus auf Fleet/Road kann die strategische Relevanz von NMIP begrenzt sein.', en: 'If focus stays on fleet/road, NMIP strategic relevance may remain limited.' }, l)}
            />
          </div>
          <div style={{ marginTop: '0.7rem', color: '#334155' }}>
            <strong>{bi({ de: 'Risk Assessment:', en: 'Risk Assessment:' }, l)}</strong>{' '}
            {bi({ de: 'Konzentrationsrisiko, begrenzte Diversifikation und marine-zyklische Abhängigkeit.', en: 'Concentration risk, limited diversification, and marine-cycle dependency.' }, l)}
          </div>
        </Card>

        <Card title={bi({ de: 'SWOT-Analyse', en: 'SWOT Analysis' }, l)}>
          <div style={{ display: 'grid', gap: '0.5rem', color: '#334155' }}>
            <div><strong>{bi({ de: 'Strengths:', en: 'Strengths:' }, l)}</strong> {bi({ de: 'Marine Expertise, Nischenfokus, Solvency-II-Regulierung, starker Partnerhintergrund (West P&I).', en: 'Marine expertise, niche specialization, Solvency II regulation, strong partner backing (West P&I).' }, l)}</div>
            <div><strong>{bi({ de: 'Weaknesses:', en: 'Weaknesses:' }, l)}</strong> {bi({ de: 'Begrenzter Scope, keine Multi-Line-Plattform, geringe embedded AI-Infrastruktur.', en: 'Limited scope, no multi-line platform, limited embedded AI infrastructure.' }, l)}</div>
            <div><strong>{bi({ de: 'Opportunities:', en: 'Opportunities:' }, l)}</strong> {bi({ de: 'Plattformintegration, MGA-Capacity-Kollaboration, marine Erweiterung in Insurfox.', en: 'Platform integration, MGA capacity collaboration, marine expansion inside Insurfox.' }, l)}</div>
            <div><strong>{bi({ de: 'Threats:', en: 'Threats:' }, l)}</strong> {bi({ de: 'Marine-Volatilität, Wettbewerb großer Marine-Carrier, digital-first Cargo-Plattformen.', en: 'Marine market volatility, competition from large marine insurers, digital-first cargo platforms.' }, l)}</div>
          </div>
        </Card>

        <Card title={bi({ de: 'Executive-Entscheidungsmatrix', en: 'Executive Decision Matrix' }, l)}>
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 390px', gap: '1rem' }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={tableStyle}>
                <thead>
                  <tr style={headRowStyle}>
                    <th style={thStyle}>{bi({ de: 'Kategorie', en: 'Category' }, l)}</th>
                    <th style={thStyle}>{bi({ de: 'Score (1–10)', en: 'Score (1–10)' }, l)}</th>
                    <th style={thStyle}>{bi({ de: 'Kommentar', en: 'Commentary' }, l)}</th>
                  </tr>
                </thead>
                <tbody>
                  {scoreRows.map((row) => (
                    <tr key={row.category.en}>
                      <td style={tdStrongStyle}>{bi(row.category, l)}</td>
                      <td style={tdStyle}>{row.score}</td>
                      <td style={tdStyle}>{bi(row.commentary, l)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div style={{ marginTop: '0.6rem', color: '#0f172a', fontWeight: 700 }}>
                {bi({ de: 'Gewichteter Gesamtscore', en: 'Weighted Overall Score' }, l)}: {weightedScore.toFixed(2)} / 10
              </div>
            </div>
            <Card title={bi({ de: 'Score-Übersicht', en: 'Score Overview' }, l)}>
              <div style={{ height: 250 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={scoreChartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="category" stroke="#475569" hide />
                    <YAxis stroke="#475569" domain={[0, 10]} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="score" name={bi({ de: 'Score', en: 'Score' }, l)} fill="#d4380d" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>
        </Card>

        <Card title={bi({ de: 'Strategische Ansprechpartner (öffentlich, nmip.se)', en: 'Strategic Contacts (public, nmip.se)' }, l)}>
          <div style={{ display: 'grid', gap: '0.6rem' }}>
            {nmipContacts.map((contact) => (
              <div key={contact.email} style={{ border: '1px solid #e2e8f0', borderRadius: 10, padding: '0.65rem', background: '#f8fafc' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.6rem', flexWrap: 'wrap' }}>
                  <div style={{ color: '#0f172a', fontWeight: 700 }}>{contact.name}</div>
                  <div style={{ color: '#64748b', fontSize: '0.82rem' }}>{bi(contact.region, l)}</div>
                </div>
                <div style={{ color: '#334155', fontSize: '0.86rem' }}>{bi(contact.role, l)}</div>
                <div style={{ color: '#334155', fontSize: '0.84rem', marginTop: '0.2rem' }}>{bi(contact.relevance, l)}</div>
                <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap', marginTop: '0.35rem', fontSize: '0.82rem', color: '#334155' }}>
                  <span><strong>E-Mail:</strong> {contact.email}</span>
                  <span><strong>Tel:</strong> {contact.phone}</span>
                </div>
              </div>
            ))}
          </div>
          <p style={{ margin: '0.7rem 0 0', color: '#64748b', fontSize: '0.82rem' }}>
            {bi(
              {
                de: 'Quelle: https://nmip.se/ (Bereich "The Team"), Stand 20.02.2026. Angaben vor finaler Ansprache verifizieren.',
                en: 'Source: https://nmip.se/ ("The Team" section), captured on 2026-02-20. Verify details before formal outreach.'
              },
              l
            )}
          </p>
        </Card>

        <Card title={bi({ de: 'Finale Management-Empfehlung', en: 'Final Management Recommendation' }, l)}>
          <div style={{ display: 'grid', gap: '0.6rem', color: '#334155', lineHeight: 1.65 }}>
            <p style={{ margin: 0 }}>{bi({ de: 'NMIP ist ein starker marine-nischiger Capacity-Partner für Insurfox.', en: 'NMIP is a strong marine niche capacity partner for Insurfox.' }, l)}</p>
            <p style={{ margin: 0 }}>{bi({ de: 'NMIP ersetzt keine globalen Capacity Provider für breit diversifizierte Programme.', en: 'NMIP does not replace global capacity providers for diversified multi-line programs.' }, l)}</p>
            <p style={{ margin: 0 }}>{bi({ de: 'NMIP konkurriert nicht mit dem Insurfox-Plattformmodell, sondern ergänzt es in maritimen Speziallinien.', en: 'NMIP does not compete with the Insurfox platform model and instead complements it in marine specialty lines.' }, l)}</p>
            <p style={{ margin: 0 }}>{bi({ de: 'Empfohlen wird ein selektiver Aufbau als Specialty-Marine-Erweiterung der Insurfox-MGA-Strategie.', en: 'Recommended path is selective use as a specialty marine extension to the Insurfox MGA strategy.' }, l)}</p>
          </div>
        </Card>
      </div>
    </section>
  )
}

function ComparisonBlock({ title, body }: { title: string; body: string }) {
  return (
    <div style={{ border: '1px solid #e2e8f0', borderRadius: 10, padding: '0.6rem 0.7rem' }}>
      <strong style={{ color: '#0f172a' }}>{title}</strong>
      <p style={{ margin: '0.35rem 0 0', color: '#334155' }}>{body}</p>
    </div>
  )
}

function ScenarioCard({ title, body }: { title: string; body: string }) {
  return (
    <div style={{ border: '1px solid #e2e8f0', borderRadius: 10, padding: '0.7rem' }}>
      <strong style={{ color: '#0f172a' }}>{title}</strong>
      <p style={{ margin: '0.35rem 0 0', color: '#334155' }}>{body}</p>
    </div>
  )
}

const listStyle = {
  margin: 0,
  paddingLeft: '1.1rem',
  display: 'grid',
  gap: '0.35rem',
  color: '#334155',
  lineHeight: 1.5
}

const metaPillStyle = {
  display: 'inline-flex',
  border: '1px solid #dbe2ea',
  borderRadius: 999,
  padding: '0.2rem 0.55rem',
  fontSize: '0.78rem',
  color: '#475569',
  background: '#f8fafc'
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
