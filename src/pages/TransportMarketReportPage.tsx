import React from 'react'
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { useI18n } from '@/i18n/I18nContext'

type SegmentRow = {
  company: string
  motorFleet: string
  marineCargo: string
  logisticsLiability: string
  internationalPrograms: string
  distributionModel: string
}

type FinancialRow = {
  year: string
  allianzRange: string
  allianzEsaRange: string
  vhvRange: string
}

type Lead = {
  name: string
  role: string
  company: string
  city: string
  linkedin: string
  comment?: string
}

const segmentRows: SegmentRow[] = [
  {
    company: 'Allianz Group',
    motorFleet: 'Strong multinational fleet programs, SME to enterprise',
    marineCargo: 'Global cargo capacity with broad reinsurance support',
    logisticsLiability: 'Integrated liability wording for transport operators',
    internationalPrograms: 'High maturity, centralized control model',
    distributionModel: 'Broker-led with key account direct channels'
  },
  {
    company: 'Allianz ESA',
    motorFleet: 'Selective focus on complex and specialty fleets',
    marineCargo: 'Core specialty strength in cross-border logistics chains',
    logisticsLiability: 'Specialty-focused risk appetite and engineering input',
    internationalPrograms: 'Strong in specialty cross-border placements',
    distributionModel: 'Specialty broker ecosystem with technical underwriting'
  },
  {
    company: 'VHV Gruppe',
    motorFleet: 'Strong domestic fleet footprint with mid-market strength',
    marineCargo: 'Targeted marine participation, primarily regional books',
    logisticsLiability: 'Balanced liability offering for logistics SMEs',
    internationalPrograms: 'Selective international capacity via partnerships',
    distributionModel: 'Broker-centric model with regional market depth'
  }
]

const financialRows: FinancialRow[] = [
  {
    year: '2023',
    allianzRange: 'EUR 3.8B - EUR 4.6B',
    allianzEsaRange: 'EUR 0.8B - EUR 1.0B',
    vhvRange: 'EUR 0.6B - EUR 0.75B'
  },
  {
    year: '2024',
    allianzRange: 'EUR 4.0B - EUR 4.8B',
    allianzEsaRange: 'EUR 0.85B - EUR 1.1B',
    vhvRange: 'EUR 0.65B - EUR 0.8B'
  },
  {
    year: '2025 (est.)',
    allianzRange: 'EUR 4.2B - EUR 5.0B',
    allianzEsaRange: 'EUR 0.9B - EUR 1.2B',
    vhvRange: 'EUR 0.68B - EUR 0.9B'
  }
]

const transportLeads: Lead[] = [
  {
    name: 'Stefanie Thier',
    role: 'Head of Motor Claims Germany',
    company: 'Allianz',
    city: 'Munich',
    linkedin: 'https://www.linkedin.com/in/stefanie-thier-980'
  },
  {
    name: 'Christian Hempel',
    role: 'Head of Motor Claims',
    company: 'Allianz',
    city: 'Leipzig/Berlin',
    linkedin: 'https://www.linkedin.com/in/christian-hempel-a'
  },
  {
    name: 'Rico Foerster',
    role: 'Head of Fleet, Mobility and Cyber',
    company: 'Allianz',
    city: 'Munich',
    linkedin: 'https://www.linkedin.com/in/rico-f%C3%B6rster-',
    comment: 'Left Allianz 3 months ago'
  },
  {
    name: 'Anna Weber',
    role: 'Head of Underwriting Transport',
    company: 'Allianz ESA',
    city: 'Hamburg',
    linkedin: 'https://www.linkedin.com/in/anna-weber-transport'
  },
  {
    name: 'Markus Lehmann',
    role: 'Distribution Leadership - Logistics',
    company: 'VHV Gruppe',
    city: 'Hannover',
    linkedin: 'https://www.linkedin.com/in/markus-lehmann-vhv'
  }
]

const gwpMidpoints = [
  { company: 'Allianz', gwp: 4200 },
  { company: 'Allianz ESA', gwp: 950 },
  { company: 'VHV', gwp: 700 }
]

const highlightedRoleChecks = [
  'Head of Motor Claims',
  'Head of Fleet',
  'Mobility',
  'Underwriting Transport',
  'Distribution Leadership'
]

export default function TransportMarketReportPage() {
  const { lang } = useI18n()
  const isDe = lang === 'de'

  const copy = {
    title: isDe
      ? 'Transport- und Flottenversicherungsmarktanalyse - Allianz, Allianz ESA & VHV'
      : 'Transport & Fleet Insurance Market Analysis - Allianz, Allianz ESA & VHV',
    subtitle: isDe ? 'Strategische Bewertung & Executive Mapping' : 'Strategic Assessment & Executive Mapping',
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
      contacts: isDe ? 'Executive Contact Mapping' : 'Executive Contact Mapping',
      chart: isDe ? 'Geschätzter GWP-Mittelwert je Unternehmen' : 'Estimated GWP Midpoint by Company',
      strategic: isDe ? 'Strategische Analyse' : 'Strategic Analysis',
      summary: isDe ? 'Executive Summary (CEO Version)' : 'Executive Summary (CEO Version)'
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
          'Die digitale Reife ist in Kernprozessen hoch, während AI-Readiness je Funktionsbereich variiert. Besonders in Claims- und Fleet-Analytics bestehen kurzfristig attraktive Partnerschaftsfenster für KI-gestützte Operating Models.'
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
            <Button size="sm" onClick={() => window.print()}>
              {copy.export}
            </Button>
          </div>
        </Card>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
          <Card title="Allianz Group (Global P&C)">
            <div style={{ fontSize: '0.9rem', color: '#64748b' }}>{copy.cards.allianzSub}</div>
            <div style={{ fontSize: '1.45rem', fontWeight: 700, color: '#0f172a', marginTop: '0.35rem' }}>EUR 3.5B - EUR 5B</div>
            <div style={{ fontSize: '0.86rem', color: '#475569', marginTop: '0.35rem' }}>{copy.cards.gwp}</div>
          </Card>
          <Card title="Allianz ESA (Specialty Transport)">
            <div style={{ fontSize: '0.9rem', color: '#64748b' }}>{copy.cards.esaSub}</div>
            <div style={{ fontSize: '1.45rem', fontWeight: 700, color: '#0f172a', marginTop: '0.35rem' }}>EUR 700M - EUR 1.2B</div>
          </Card>
          <Card title="VHV Gruppe (Transport / Marine / Fleet)">
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
                    <td style={tdStyle}>{row.motorFleet}</td>
                    <td style={tdStyle}>{row.marineCargo}</td>
                    <td style={tdStyle}>{row.logisticsLiability}</td>
                    <td style={tdStyle}>{row.internationalPrograms}</td>
                    <td style={tdStyle}>{row.distributionModel}</td>
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
                  <tr key={row.year}>
                    <td style={tdStyleStrong}>{row.year}</td>
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
                  const isDecisionRole = highlightedRoleChecks.some((term) => lead.role.includes(term))
                  return (
                    <tr key={`${lead.name}-${lead.role}`}>
                      <td style={tdStyleStrong}>{lead.name}</td>
                      <td style={{ ...tdStyle, fontWeight: isDecisionRole ? 700 : 500, color: isDecisionRole ? '#0f172a' : '#334155' }}>{lead.role}</td>
                      <td style={tdStyle}>{lead.company}</td>
                      <td style={tdStyle}>{lead.city}</td>
                      <td style={tdStyle}>
                        <a href={lead.linkedin} target="_blank" rel="noreferrer" style={{ color: '#0f172a' }}>
                          {copy.table.profile}
                        </a>
                      </td>
                      <td style={tdStyle}>{lead.comment ? lead.comment : copy.table.active}</td>
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
                <Tooltip formatter={(value: number | string) => [`${value}M EUR`, copy.chartTooltipSeries]} />
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
