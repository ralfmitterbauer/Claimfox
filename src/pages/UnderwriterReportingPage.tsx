import React from 'react'
import Card from '@/components/ui/Card'
import Header from '@/components/ui/Header'
import { useI18n } from '@/i18n/I18nContext'
import HeroBlockBackground from '@/assets/images/hero_block_1.png'

export default function UnderwriterReportingPage() {
  const { lang } = useI18n()

  const copy = lang === 'en'
    ? {
        title: 'Underwriter Reporting',
        subtitle: 'Portfolio status, policy development and AI-supported decision logic for carrier underwriting.',
        kpis: [
          { label: 'Active policies', value: '12,480', note: 'Current in-force count' },
          { label: 'Written premium', value: '€ 41.8M', note: 'Trailing 12 months' },
          { label: 'Loss ratio', value: '24.7%', note: 'Net, rolling 6 months' },
          { label: 'Referral rate', value: '8.9%', note: 'Out-of-corridor cases' }
        ],
        portfolioTitle: 'Policy inventory overview',
        portfolioColumns: ['Line', 'Active policies', 'Premium', 'Loss ratio', 'Status'],
        portfolioRows: [
          ['Cargo & logistics', '4,920', '€ 18.6M', '22.1%', 'Within corridor'],
          ['Fleet', '3,410', '€ 12.4M', '27.9%', 'Monitor'],
          ['Operational interruption', '2,260', '€ 6.8M', '19.4%', 'Within corridor'],
          ['Service interruption', '1,890', '€ 4.0M', '29.8%', 'Referral band']
        ],
        developmentTitle: 'Portfolio development',
        developmentItems: [
          'Policy count +6.2% QoQ (controlled onboarding)',
          'Exposure aggregation stable; regional caps unchanged',
          'Average premium per policy +3.1% from corridor tightening',
          'Claims frequency trending down for two consecutive months'
        ],
        aiTitle: 'AI-supported decision logic',
        aiItems: [
          'Deterministic rules + evidence validation before any recommendation',
          'AI proposes referral flags based on corridor breaches and aggregation alerts',
          'Human-in-the-loop approvals required for binding exceptions',
          'Audit trail captures input data, decision rationale and overrides'
        ],
        specialTitle: 'Key considerations',
        specialItems: [
          'Maintain broker-neutral intake and strict carrier mandate boundaries',
          'Escalate extreme event clusters to moratorium governance',
          'Track accumulation drift in high-growth corridors'
        ]
      }
    : {
        title: 'Underwriter Reporting',
        subtitle: 'Portfolio-Status, Policenentwicklung und KI-gestützte Entscheidungslogik für das Carrier-Underwriting.',
        kpis: [
          { label: 'Aktive Policen', value: '12.480', note: 'Aktueller In-Force-Bestand' },
          { label: 'Bruttoprämie', value: '€ 41,8 Mio.', note: 'Letzte 12 Monate' },
          { label: 'Loss Ratio', value: '24,7%', note: 'Netto, rollierend 6 Monate' },
          { label: 'Referral-Quote', value: '8,9%', note: 'Out-of-corridor Fälle' }
        ],
        portfolioTitle: 'Übersicht Policenbestände',
        portfolioColumns: ['Sparte', 'Aktive Policen', 'Prämie', 'Loss Ratio', 'Status'],
        portfolioRows: [
          ['Cargo & Logistik', '4.920', '€ 18,6 Mio.', '22,1%', 'Innerhalb Korridor'],
          ['Fleet', '3.410', '€ 12,4 Mio.', '27,9%', 'Monitoring'],
          ['Operational Interruption', '2.260', '€ 6,8 Mio.', '19,4%', 'Innerhalb Korridor'],
          ['Service Interruption', '1.890', '€ 4,0 Mio.', '29,8%', 'Referral-Band']
        ],
        developmentTitle: 'Bestandsentwicklung',
        developmentItems: [
          'Policenbestand +6,2% QoQ (kontrolliertes Onboarding)',
          'Exposure-Aggregation stabil; regionale Caps unverändert',
          'Durchschnittsprämie +3,1% durch Korridor-Feintuning',
          'Schadenfrequenz sinkt seit zwei Monaten'
        ],
        aiTitle: 'KI-gestützte Entscheidungslogik',
        aiItems: [
          'Deterministische Regeln + Evidenzvalidierung vor Empfehlungen',
          'AI markiert Referral-Fälle bei Korridor-Breaches und Aggregations-Alerts',
          'Human-in-the-loop Freigaben für Bindung außerhalb der Guidelines',
          'Audit Trail dokumentiert Input, Begründung und Overrides'
        ],
        specialTitle: 'Besonderheiten',
        specialItems: [
          'Broker-neutraler Intake und klare Carrier-Mandate einhalten',
          'Extremereignis-Cluster an Moratorium-Governance eskalieren',
          'Kumulationsdrift in wachstumsstarken Segmenten beobachten'
        ]
      }

  return (
    <section style={{ minHeight: '100vh', width: '100%', color: '#0e0d1c' }}>
      <div
        className="roles-hero"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(7, 20, 74, 0.9) 0%, rgba(11, 45, 122, 0.9) 100%), url(${HeroBlockBackground})`
        }}
      >
        <div className="roles-hero-inner">
          <Header
            title={copy.title}
            subtitle={copy.subtitle}
            subtitleColor="rgba(255,255,255,0.82)"
          />
        </div>
      </div>
      <div style={{ width: '100%', maxWidth: 1200, margin: '0 auto', padding: '32px 1.25rem 4rem', display: 'grid', gap: '1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
          {copy.kpis.map((kpi) => (
            <Card key={kpi.label} title={kpi.label} variant="glass" style={{ minHeight: '140px' }}>
              <div style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '0.35rem' }}>{kpi.value}</div>
              <div style={{ color: '#64748b', fontSize: '0.9rem' }}>{kpi.note}</div>
            </Card>
          ))}
        </div>

        <Card title={copy.portfolioTitle} variant="glass" style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '640px' }}>
            <thead>
              <tr style={{ textAlign: 'left', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#64748b' }}>
                {copy.portfolioColumns.map((col) => (
                  <th key={col} style={{ padding: '0.6rem 0.4rem', borderBottom: '1px solid #e2e8f0' }}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {copy.portfolioRows.map((row) => (
                <tr key={row[0]}>
                  {row.map((cell, index) => (
                    <td key={`${row[0]}-${index}`} style={{ padding: '0.6rem 0.4rem', borderBottom: '1px solid #f1f5f9', color: '#0f172a' }}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
          <Card title={copy.developmentTitle} variant="glass" style={{ minHeight: '220px' }}>
            <ul style={{ margin: 0, paddingLeft: '1.1rem', color: '#475569', lineHeight: 1.55 }}>
              {copy.developmentItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Card>
          <Card title={copy.aiTitle} variant="glass" style={{ minHeight: '220px' }}>
            <ul style={{ margin: 0, paddingLeft: '1.1rem', color: '#475569', lineHeight: 1.55 }}>
              {copy.aiItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Card>
          <Card title={copy.specialTitle} variant="glass" style={{ minHeight: '220px' }}>
            <ul style={{ margin: 0, paddingLeft: '1.1rem', color: '#475569', lineHeight: 1.55 }}>
              {copy.specialItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </section>
  )
}
