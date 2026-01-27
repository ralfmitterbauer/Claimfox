import React from 'react'
import Card from '@/components/ui/Card'
import Header from '@/components/ui/Header'
import { useI18n } from '@/i18n/I18nContext'
import HeroBlockBackground from '@/assets/images/hero_block_1.png'

export default function UnderwriterCarrierPage() {
  const { lang } = useI18n()

  const copy = lang === 'en'
    ? {
        title: 'Carrier UW',
        subtitle: 'Read-only portfolio oversight with final approval authority.',
        kpis: [
          { label: 'Final approvals', value: '64', note: 'Month-to-date' },
          { label: 'Open referrals', value: '21', note: 'Pending review' },
          { label: 'Coverage limits', value: 'Locked', note: 'Carrier controlled' }
        ],
        sections: [
          {
            title: 'Approval view',
            items: ['Read-only portfolio dashboards', 'Final approval queue', 'Override sign-off']
          },
          {
            title: 'Governance oversight',
            items: ['Policy limits and aggregates', 'Referral exceptions log', 'Audit-ready evidence bundles']
          },
          {
            title: 'Decision controls',
            items: ['Carrier retains underwriting authority', 'Claims authority preserved', 'Authority revocation triggers']
          }
        ]
      }
    : {
        title: 'Carrier UW',
        subtitle: 'Read-only Portfolio-Übersicht mit finaler Approval-Authority.',
        kpis: [
          { label: 'Final Approvals', value: '64', note: 'Monat bis heute' },
          { label: 'Offene Referrals', value: '21', note: 'In Prüfung' },
          { label: 'Limits', value: 'Gesperrt', note: 'Carrier-kontrolliert' }
        ],
        sections: [
          {
            title: 'Approval-View',
            items: ['Read-only Portfolio-Dashboards', 'Final Approval Queue', 'Override Sign-off']
          },
          {
            title: 'Governance-Überblick',
            items: ['Policy-Limits und Aggregates', 'Referral-Exception-Log', 'Audit-Ready Evidence Bundles']
          },
          {
            title: 'Entscheidungskontrollen',
            items: ['Carrier behält Underwriting-Authority', 'Claims-Authority bleibt erhalten', 'Trigger für Authority-Entzug']
          }
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
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
          {copy.sections.map((section) => (
            <Card
              key={section.title}
              title={section.title}
              variant="glass"
              style={{ display: 'flex', flexDirection: 'column', minHeight: '200px' }}
            >
              <ul style={{ margin: 0, paddingLeft: '1.1rem', color: '#475569', lineHeight: 1.55 }}>
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
