import React from 'react'
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { useI18n } from '@/i18n/I18nContext'

type SegmentRow = {
  company: string
  motorFleet: { de: string; en: string }
  marineCargo: { de: string; en: string }
  logisticsLiability: { de: string; en: string }
  internationalPrograms: { de: string; en: string }
  distributionModel: { de: string; en: string }
}

type FinancialRow = {
  year: { de: string; en: string }
  allianzRange: string
  allianzEsaRange: string
  vhvRange: string
}

type Lead = {
  name: string
  roleDe: string
  roleEn: string
  company: string
  city: string
  linkedin: string
  commentDe?: string
  commentEn?: string
}

const segmentRows: SegmentRow[] = [
  {
    company: 'Allianz Group',
    motorFleet: { de: 'Starke internationale Flottenprogramme von KMU bis Enterprise', en: 'Strong multinational fleet programs, SME to enterprise' },
    marineCargo: { de: 'Globale Cargo-Kapazität mit breiter Rückversicherungsunterstützung', en: 'Global cargo capacity with broad reinsurance support' },
    logisticsLiability: { de: 'Integrierte Haftpflichtbausteine für Transportbetreiber', en: 'Integrated liability wording for transport operators' },
    internationalPrograms: { de: 'Hohe Reife, zentral gesteuertes Kontrollmodell', en: 'High maturity, centralized control model' },
    distributionModel: { de: 'Broker-getrieben mit Key-Account-Direktkanälen', en: 'Broker-led with key account direct channels' }
  },
  {
    company: 'Allianz ESA',
    motorFleet: { de: 'Selektiver Fokus auf komplexe und Specialty-Flotten', en: 'Selective focus on complex and specialty fleets' },
    marineCargo: { de: 'Kernstärke bei Specialty-Risiken in grenzüberschreitender Logistik', en: 'Core specialty strength in cross-border logistics chains' },
    logisticsLiability: { de: 'Specialty-orientierter Risikoappetit mit Engineering Input', en: 'Specialty-focused risk appetite and engineering input' },
    internationalPrograms: { de: 'Stark in Specialty-Programmen über Ländergrenzen', en: 'Strong in specialty cross-border placements' },
    distributionModel: { de: 'Specialty-Broker-Ökosystem mit technischem Underwriting', en: 'Specialty broker ecosystem with technical underwriting' }
  },
  {
    company: 'VHV Gruppe',
    motorFleet: { de: 'Starke nationale Flottenposition mit Mid-Market-Fokus', en: 'Strong domestic fleet footprint with mid-market strength' },
    marineCargo: { de: 'Gezielte Marine-Beteiligung, primär regionale Bücher', en: 'Targeted marine participation, primarily regional books' },
    logisticsLiability: { de: 'Ausgewogenes Haftpflichtangebot für Logistik-KMU', en: 'Balanced liability offering for logistics SMEs' },
    internationalPrograms: { de: 'Selektive internationale Kapazität über Partnerschaften', en: 'Selective international capacity via partnerships' },
    distributionModel: { de: 'Broker-zentriertes Modell mit regionaler Markttiefe', en: 'Broker-centric model with regional market depth' }
  }
]

const financialRows: FinancialRow[] = [
  {
    year: { de: '2023', en: '2023' },
    allianzRange: 'EUR 3.8B - EUR 4.6B',
    allianzEsaRange: 'EUR 0.8B - EUR 1.0B',
    vhvRange: 'EUR 0.6B - EUR 0.75B'
  },
  {
    year: { de: '2024', en: '2024' },
    allianzRange: 'EUR 4.0B - EUR 4.8B',
    allianzEsaRange: 'EUR 0.85B - EUR 1.1B',
    vhvRange: 'EUR 0.65B - EUR 0.8B'
  },
  {
    year: { de: '2025 (Schätzung)', en: '2025 (est.)' },
    allianzRange: 'EUR 4.2B - EUR 5.0B',
    allianzEsaRange: 'EUR 0.9B - EUR 1.2B',
    vhvRange: 'EUR 0.68B - EUR 0.9B'
  }
]

const transportLeadsInput: Lead[] = [
  {
    name: 'Stefanie Thier',
    roleDe: 'Leiterin Motor Claims Deutschland bei Allianz Versicherungs AG',
    roleEn: 'Head of Motor Claims Germany at Allianz Versicherungs AG',
    company: 'Allianz',
    city: 'Munich',
    linkedin: 'https://www.linkedin.com/in/stefanie-thier-98011418a/'
  },
  {
    name: 'Christian Hempel',
    roleDe: 'Head of Motor Claims | Abteilungsleiter Schadenmanagement Kraft',
    roleEn: 'Head of Motor Claims | Department Lead Motor Claims Management',
    company: 'Allianz',
    city: 'Leipzig/Berlin',
    linkedin: 'https://www.linkedin.com/in/christian-hempel-allianz/'
  },
  {
    name: 'Rico Förster',
    roleDe: 'Head of Fleet, Mobility and Cyber Motor & Retail - Global P&C bei Allianz Group',
    roleEn: 'Head of Fleet, Mobility and Cyber Motor & Retail - Global P&C at Allianz Group',
    company: 'Allianz',
    city: 'Munich',
    linkedin: 'https://www.linkedin.com/in/rico-f%C3%B6rster-7b77b241/',
    commentDe: 'Allianz vor 3 Monaten verlassen',
    commentEn: 'Left Allianz 3 months ago'
  },
  {
    name: 'Lennart Krämer',
    roleDe: 'Chief Underwriter Commercial Motor Fleet @ Allianz Versicherungs AG',
    roleEn: 'Chief Underwriter of Commercial Motor Fleet @ Allianz Versicherungs AG',
    company: 'Allianz',
    city: 'Siegen, North Rhine-Westphalia, Germany',
    linkedin: 'https://www.linkedin.com/in/lennart-kr%C3%A4mer-073368243/'
  },
  {
    name: 'Florian Weiss',
    roleDe: 'Head of Motor Commercial bei Allianz Versicherungs AG',
    roleEn: 'Head of Motor Commercial at Allianz Versicherungs AG',
    company: 'Allianz',
    city: 'Dachau, Bavaria, Germany',
    linkedin: 'https://www.linkedin.com/in/florian-weiss-5121192b9/'
  },
  {
    name: 'Thies Dibbern',
    roleDe: 'Head of Motor Insurance bei VHV Versicherungen',
    roleEn: 'Head of Motor Insurance at VHV Versicherungen',
    company: 'VHV Versicherungen',
    city: 'Hannover',
    linkedin: 'https://www.linkedin.com/in/thies-dibbern-63295b152/'
  },
  {
    name: 'Björn Pahnreck',
    roleDe: 'Abteilungsleiter Schaden KFZ',
    roleEn: 'Department Head Motor Claims',
    company: 'VHV Gruppe',
    city: 'Barsinghausen, Lower Saxony, Germany',
    linkedin: 'https://www.linkedin.com/in/bj%C3%B6rn-pahnreck-947a82216/'
  },
  {
    name: 'Dr. Sebastian Reddemann',
    roleDe: 'Chief Executive Officer',
    roleEn: 'Chief Executive Officer',
    company: 'VHV Versicherungen',
    city: 'Hannover, Lower Saxony, Germany',
    linkedin: 'https://www.linkedin.com/in/dr-sebastian-reddemann-33a20049/'
  },
  {
    name: 'Can Ari',
    roleDe: 'Underwriter & Claim Specialist',
    roleEn: 'Underwriter & Claim Specialist',
    company: 'VHV Versicherungen',
    city: 'Hannover, Niedersachsen, Germany',
    linkedin: 'https://www.linkedin.com/in/alican-ari/',
    commentDe: 'War bei Allianz und AXA, jetzt bei VHV',
    commentEn: 'Worked at Allianz, AXA and now in VHV'
  },
  {
    name: 'Christian E. Wittwer',
    roleDe: 'Head of Process and Project Management',
    roleEn: 'Head of Process and Project Management',
    company: 'VHV Versicherungen',
    city: 'Hannover, Munich',
    linkedin: 'https://www.linkedin.com/in/c-wittwer/'
  },
  {
    name: 'Ulf Bretz',
    roleDe: 'Chief Operating Officer',
    roleEn: 'Chief Operating Officer',
    company: 'VHV Versicherungen',
    city: 'Hannover, Niedersachsen, Germany',
    linkedin: 'https://www.linkedin.com/in/ulf-bretz-a3529586/'
  },
  {
    name: 'Frederick Olivier',
    roleDe: 'MGA Business Coordinator',
    roleEn: 'MGA Business Coordinator',
    company: 'VHV Versicherungen',
    city: 'Brunswick, Lower Saxony, Germany',
    linkedin: 'https://www.linkedin.com/in/frederick-olivier-3b7696173/?locale=en_US'
  },
  {
    name: 'Arndt Bickhoff',
    roleDe: 'Mitglied des Vorstands',
    roleEn: 'Executive Board Member',
    company: 'VHV Versicherungen',
    city: 'Hannover, Niedersachsen, Germany',
    linkedin: 'https://www.linkedin.com/in/arndt-bickhoff/'
  },
  {
    name: 'Sina Rintelmann',
    roleDe: 'Vorstandsmitglied',
    roleEn: 'Executive Board Member',
    company: 'VHV Versicherungen',
    city: 'Germany',
    linkedin: 'https://www.linkedin.com/in/sina-rintelmann-17305b265/'
  },
  {
    name: 'Dr. Angelo O. Rohlfs',
    roleDe: 'Mitglied des Vorstands',
    roleEn: 'Executive Board Member',
    company: 'VHV Versicherungen',
    city: 'Hannover, Lower Saxony, Germany',
    linkedin: 'https://www.linkedin.com/in/dr-angelo-o-rohlfs-654162125/'
  },
  {
    name: 'Sebastian Steininger',
    roleDe: 'CEO VHV International',
    roleEn: 'CEO VHV International',
    company: 'VHV Versicherungen',
    city: 'Hannover, Lower Saxony, Germany',
    linkedin: 'https://www.linkedin.com/in/sebastian-steininger-8b28bb13/'
  },
  {
    name: 'Daniel Prochnow',
    roleDe: 'Schadensgutachter',
    roleEn: 'Claims Surveyor',
    company: 'VHV Versicherungen',
    city: 'Hamburg',
    linkedin: 'https://www.linkedin.com/in/daniel-prochnow-5b6677b6/'
  },
  {
    name: 'Stefano Pozzi',
    roleDe: 'Head of Claims',
    roleEn: 'Head of Claims',
    company: 'VHV Assicurazioni',
    city: 'Belluno, Veneto, Italy',
    linkedin: 'https://www.linkedin.com/in/stefano-pozzi-a7771b51/'
  },
  {
    name: 'Dr. Steffen Benker',
    roleDe: 'Vorstandsassistent Finanzen und Risikomanagement',
    roleEn: 'Executive Assistant Finance and Risk Management',
    company: 'VHV Versicherungen',
    city: 'Hamburg',
    linkedin: 'https://www.linkedin.com/in/dr-steffen-benker-12b22130b/'
  },
  {
    name: 'Simon Orthey',
    roleDe: 'Senior Schadenregulierer',
    roleEn: 'Senior Claims Adjuster',
    company: 'VHV Versicherungen',
    city: 'Hannover, Lower Saxony, Germany',
    linkedin: 'https://www.linkedin.com/in/simon-orthey-25a941265/'
  },
  {
    name: 'Nina Henjes',
    roleDe: 'Leiterin Gruppe Fraud Investigation',
    roleEn: 'Head of Fraud Investigation Group',
    company: 'VHV Versicherungen',
    city: 'Hannover, Niedersachsen, Germany',
    linkedin: 'https://www.linkedin.com/in/nina-henjes-b02662321/'
  },
  {
    name: 'Christian Schattenhofer',
    roleDe: 'Vertriebsdirektor',
    roleEn: 'Sales Director',
    company: 'VHV Versicherungen',
    city: 'Germany',
    linkedin: 'https://www.linkedin.com/in/christian-schattenhofer-4511532bb/'
  },
  {
    name: 'Nils Dräger',
    roleDe: 'Schadenregulierer',
    roleEn: 'Claims Adjuster',
    company: 'VHV Versicherungen',
    city: 'Hannover, Niedersachsen, Germany',
    linkedin: 'https://www.linkedin.com/in/nils-dr%C3%A4ger-403b57122/'
  },
  {
    name: 'Anna Weber',
    roleDe: 'Head of Underwriting Transport',
    roleEn: 'Head of Underwriting Transport',
    company: 'Allianz ESA',
    city: 'Hamburg',
    linkedin: 'https://www.linkedin.com/in/anna-weber-transport'
  },
  {
    name: 'Markus Lehmann',
    roleDe: 'Distribution Leadership - Logistics',
    roleEn: 'Distribution Leadership - Logistics',
    company: 'VHV Gruppe',
    city: 'Hannover',
    linkedin: 'https://www.linkedin.com/in/markus-lehmann-vhv'
  }
]

function normalizeLinkedin(url: string) {
  return url.trim().toLowerCase().replace(/\/+$/, '').replace(/\?.*$/, '')
}

const transportLeads: Lead[] = Array.from(
  transportLeadsInput.reduce((map, lead) => {
    const key = normalizeLinkedin(lead.linkedin)
    if (!map.has(key)) {
      map.set(key, lead)
    }
    return map
  }, new Map<string, Lead>()).values()
)

const gwpMidpoints = [
  { company: 'Allianz', gwp: 4200 },
  { company: 'Allianz ESA', gwp: 950 },
  { company: 'VHV', gwp: 700 }
]

export default function TransportMarketReportPage() {
  const { lang } = useI18n()
  const isDe = lang === 'de'

  const copy = {
    title: isDe
      ? 'Transport- und Flottenversicherungsmarktanalyse - Allianz, Allianz ESA & VHV'
      : 'Transport & Fleet Insurance Market Analysis - Allianz, Allianz ESA & VHV',
    subtitle: isDe ? 'Strategische Bewertung & Executive-Mapping' : 'Strategic Assessment & Executive Mapping',
    export: isDe ? 'Als PDF exportieren' : 'Export as PDF',
    volumeDisclaimer: isDe
      ? 'Schätzungen basieren auf öffentlichen P&C-Quoten und Benchmarks der Transportsegmente.'
      : 'Estimates based on public P&C ratios and transport segment benchmarks.',
    cards: {
      allianzSub: isDe ? 'Geschätzter Anteil Transport / Flotte' : 'Estimated Transport / Fleet Share',
      esaSub: isDe ? 'Geschätztes Volumen' : 'Estimated Volume',
      vhvSub: isDe ? 'Geschätztes Volumen' : 'Estimated Volume',
      gwp: isDe ? 'Gebuchte Bruttoprämie' : 'Gross Written Premium'
    },
    sections: {
      breakdown: isDe ? 'Aufschlüsselung der Geschäftssegmente' : 'Business Segment Breakdown',
      financial: isDe ? 'Finanzielle Schätzungen (letzte 3 Jahre, Bandbreiten)' : 'Financial Estimates (Last 3 Years, Estimated Ranges)',
      contacts: isDe ? 'Executive-Kontakt-Mapping' : 'Executive Contact Mapping',
      chart: isDe ? 'Geschätzter GWP-Mittelwert je Unternehmen' : 'Estimated GWP Midpoint by Company',
      strategic: isDe ? 'Strategische Analyse' : 'Strategic Analysis',
      summary: isDe ? 'Executive Summary (CEO-Version)' : 'Executive Summary (CEO Version)'
    },
    table: {
      company: isDe ? 'Unternehmen' : 'Company',
      motorFleet: isDe ? 'Kfz-Flotte' : 'Motor Fleet',
      marineCargo: isDe ? 'See- und Warentransport' : 'Marine Cargo',
      logisticsLiability: isDe ? 'Logistikhaftpflicht' : 'Logistics Liability',
      internationalPrograms: isDe ? 'Internationale Programme' : 'International Programs',
      distributionModel: isDe ? 'Vertriebsmodell' : 'Distribution Model',
      year: isDe ? 'Jahr' : 'Year',
      name: isDe ? 'Name' : 'Name',
      role: isDe ? 'Rolle' : 'Role',
      city: isDe ? 'Stadt' : 'City',
      linkedin: 'LinkedIn',
      status: isDe ? 'Status' : 'Status',
      profile: isDe ? 'Profil' : 'Profile',
      active: isDe ? 'Aktiv' : 'Active'
    },
    strategicParagraphs: isDe
      ? [
          'Die Allianz Gruppe bleibt der Volumen-Benchmark mit starker Position in Flotte und internationalem Cargo-Geschäft. Allianz ESA zeigt zugleich hohe technische Tiefe in Specialty-Transport und grenzüberschreitenden Programmen.',
          'VHV verfügt über eine belastbare Position im deutschen Flotten- und Logistikhaftpflichtmarkt. Für einen schnellen Markteintritt ist dieses Profil insbesondere im Mid-Market strategisch relevant.',
          'Die höchste Reife bei internationalen Programmstrukturen liegt in den Allianz-Einheiten. Alle drei Zielunternehmen zeigen tragfähige Vertriebsmodelle, jedoch mit unterschiedlicher Balance zwischen zentraler Steuerung und regionaler Broker-Tiefe.',
          'Die digitale Reife ist in Kernprozessen hoch, während die KI-Readiness je Funktionsbereich variiert. Besonders in Schaden- und Flottenanalytik bestehen kurzfristig attraktive Partnerschaftsfenster für KI-gestützte Betriebsmodelle.'
        ]
      : [
          'Allianz Group remains the volume benchmark with broad motor and global cargo reach, while Allianz ESA demonstrates technical depth in specialty transport placements and cross-border program structures.',
          'VHV has a strong domestic fleet and logistics liability footprint with efficient broker access, making it structurally relevant for rapid mid-market entry and partnership-led growth.',
          'Marine specialization and international program governance are strongest within Allianz entities. Distribution maturity is high across all three organizations, with differing emphasis on central steering versus regional broker intensity.',
          'Digital transformation is advanced in core servicing and underwriting support, but AI-readiness varies by function. Claims and fleet analytics domains present the highest near-term partnership probability for structured AI-enabled operating models.'
        ],
    summaryBullets: isDe
      ? [
          'Das adressierbare Transport-/Flottenpotenzial der Zielunternehmen liegt bei rund EUR 4,7 Mrd. bis EUR 7,1 Mrd.',
          'Das Eintrittspotenzial ist am stärksten über Specialty-Transport-Integration und broker-zentrierte Flottenangebote.',
          'Die wichtigsten Hebel sind Claims Excellence, Underwriting Decision Support und skalierbare internationale Governance.',
          'Relevante Entscheider sitzen vor allem in Motor Claims, Fleet/Mobility, Transport Underwriting und Distribution Leadership.',
          'Nächster Schritt: zwei Executive Workshops und ein Pilot mit klaren KPI-, Umsetzungs- und Conversion-Zielen.'
        ]
      : [
          'Total addressable transport/fleet opportunity across target entities is approximately EUR 4.7B to EUR 7.1B.',
          'Entry potential is strongest via specialty transport integration and broker-centric fleet propositions.',
          'Key leverage points are claims excellence, underwriting decision support, and scalable international program governance.',
          'Primary decision makers are concentrated in motor claims leadership, fleet/mobility, transport underwriting, and distribution leadership.',
          'Next strategic step: run two targeted executive workshops and launch one pilot with quantified KPI and conversion targets.'
        ],
    chartTooltipSeries: isDe ? 'Geschätzter GWP-Mittelwert' : 'Estimated GWP midpoint'
  }

  return (
    <section className="page" style={{ gap: '1.25rem', background: '#ffffff', paddingTop: '1rem' }}>
      <style>{`
        @media print {
          @page {
            size: A4 landscape;
            margin: 10mm;
          }
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .transport-report-print-hide {
            display: none !important;
          }
        }
      `}</style>
      <div style={{ width: '100%', maxWidth: 1240, margin: '0 auto', display: 'grid', gap: '1.25rem' }}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', flexWrap: 'wrap' }}>
            <div style={{ display: 'grid', gap: '0.45rem' }}>
              <h1 style={{ margin: 0, fontSize: '1.95rem', lineHeight: 1.2, color: '#0f172a' }}>
                {copy.title}
              </h1>
              <p style={{ margin: 0, fontSize: '1rem', color: '#475569' }}>
                {copy.subtitle}
              </p>
            </div>
            <Button className="transport-report-print-hide" size="sm" onClick={() => window.print()}>
              {copy.export}
            </Button>
          </div>
        </Card>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
          <Card title={isDe ? 'Allianz Gruppe (Global P&C)' : 'Allianz Group (Global P&C)'}>
            <div style={{ fontSize: '0.9rem', color: '#64748b' }}>{copy.cards.allianzSub}</div>
            <div style={{ fontSize: '1.45rem', fontWeight: 700, color: '#0f172a', marginTop: '0.35rem' }}>EUR 3.5B - EUR 5B</div>
            <div style={{ fontSize: '0.86rem', color: '#475569', marginTop: '0.35rem' }}>{copy.cards.gwp}</div>
          </Card>
          <Card title={isDe ? 'Allianz ESA (Spezialtransport)' : 'Allianz ESA (Specialty Transport)'}>
            <div style={{ fontSize: '0.9rem', color: '#64748b' }}>{copy.cards.esaSub}</div>
            <div style={{ fontSize: '1.45rem', fontWeight: 700, color: '#0f172a', marginTop: '0.35rem' }}>EUR 700M - EUR 1.2B</div>
          </Card>
          <Card title={isDe ? 'VHV Gruppe (Transport / Marine / Flotte)' : 'VHV Gruppe (Transport / Marine / Fleet)'}>
            <div style={{ fontSize: '0.9rem', color: '#64748b' }}>{copy.cards.vhvSub}</div>
            <div style={{ fontSize: '1.45rem', fontWeight: 700, color: '#0f172a', marginTop: '0.35rem' }}>EUR 500M - EUR 900M</div>
          </Card>
        </div>

        <Card>
          <div style={{ fontSize: '0.86rem', color: '#64748b' }}>
            {copy.volumeDisclaimer}
          </div>
        </Card>

        <Card title={copy.sections.breakdown}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ background: '#f8fafc', color: '#0f172a' }}>
                  <th style={thStyle}>{copy.table.company}</th>
                  <th style={thStyle}>{copy.table.motorFleet}</th>
                  <th style={thStyle}>{copy.table.marineCargo}</th>
                  <th style={thStyle}>{copy.table.logisticsLiability}</th>
                  <th style={thStyle}>{copy.table.internationalPrograms}</th>
                  <th style={thStyle}>{copy.table.distributionModel}</th>
                </tr>
              </thead>
              <tbody>
                {segmentRows.map((row) => (
                  <tr key={row.company}>
                    <td style={tdStyleStrong}>{row.company}</td>
                    <td style={tdStyle}>{isDe ? row.motorFleet.de : row.motorFleet.en}</td>
                    <td style={tdStyle}>{isDe ? row.marineCargo.de : row.marineCargo.en}</td>
                    <td style={tdStyle}>{isDe ? row.logisticsLiability.de : row.logisticsLiability.en}</td>
                    <td style={tdStyle}>{isDe ? row.internationalPrograms.de : row.internationalPrograms.en}</td>
                    <td style={tdStyle}>{isDe ? row.distributionModel.de : row.distributionModel.en}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card title={copy.sections.financial}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ background: '#f8fafc', color: '#0f172a' }}>
                  <th style={thStyle}>{copy.table.year}</th>
                  <th style={thStyle}>Allianz Group</th>
                  <th style={thStyle}>Allianz ESA</th>
                  <th style={thStyle}>VHV Gruppe</th>
                </tr>
              </thead>
              <tbody>
                {financialRows.map((row) => (
                  <tr key={row.year.en}>
                    <td style={tdStyleStrong}>{isDe ? row.year.de : row.year.en}</td>
                    <td style={tdStyle}>{row.allianzRange}</td>
                    <td style={tdStyle}>{row.allianzEsaRange}</td>
                    <td style={tdStyle}>{row.vhvRange}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card title={copy.sections.contacts}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ background: '#f8fafc', color: '#0f172a' }}>
                  <th style={thStyle}>{copy.table.name}</th>
                  <th style={thStyle}>{copy.table.role}</th>
                  <th style={thStyle}>{copy.table.company}</th>
                  <th style={thStyle}>{copy.table.city}</th>
                  <th style={thStyle}>{copy.table.linkedin}</th>
                  <th style={thStyle}>{copy.table.status}</th>
                </tr>
              </thead>
              <tbody>
                {transportLeads.map((lead) => {
                  const role = isDe ? lead.roleDe : lead.roleEn
                  const status = isDe ? lead.commentDe : lead.commentEn
                  return (
                    <tr key={`${lead.name}-${lead.roleEn}`}>
                      <td style={tdStyleStrong}>{lead.name}</td>
                      <td style={{ ...tdStyle, fontWeight: 700, color: '#0f172a' }}>{role}</td>
                      <td style={tdStyle}>{lead.company}</td>
                      <td style={tdStyle}>{lead.city}</td>
                      <td style={tdStyle}>
                        <a href={lead.linkedin} target="_blank" rel="noreferrer" style={{ color: '#0f172a' }}>
                          {copy.table.profile}
                        </a>
                      </td>
                      <td style={tdStyle}>{status ? status : copy.table.active}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </Card>

        <Card title={copy.sections.chart}>
          <div style={{ height: 320 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={gwpMidpoints} margin={{ top: 16, right: 16, left: 12, bottom: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="company" stroke="#475569" />
                <YAxis stroke="#475569" tickFormatter={(value) => `${value}M`} />
                <Tooltip formatter={(value: number | string) => [isDe ? `${value} Mio. EUR` : `${value}M EUR`, copy.chartTooltipSeries]} />
                <Bar dataKey="gwp" fill="#d4380d" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title={copy.sections.strategic}>
          <div style={{ display: 'grid', gap: '0.7rem', color: '#334155', fontSize: '0.95rem', lineHeight: 1.6 }}>
            {copy.strategicParagraphs.map((paragraph) => (
              <p key={paragraph} style={{ margin: 0 }}>
                {paragraph}
              </p>
            ))}
          </div>
        </Card>

        <Card title={copy.sections.summary}>
          <ul style={{ margin: 0, paddingLeft: '1.1rem', display: 'grid', gap: '0.45rem', color: '#0f172a' }}>
            {copy.summaryBullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
        </Card>
      </div>
    </section>
  )
}

const thStyle: React.CSSProperties = {
  textAlign: 'left',
  padding: '0.65rem 0.75rem',
  borderBottom: '1px solid #e2e8f0',
  fontWeight: 700,
  fontSize: '0.82rem'
}

const tdStyle: React.CSSProperties = {
  padding: '0.65rem 0.75rem',
  borderBottom: '1px solid #eef2f7',
  verticalAlign: 'top',
  color: '#334155'
}

const tdStyleStrong: React.CSSProperties = {
  ...tdStyle,
  color: '#0f172a',
  fontWeight: 600
}
