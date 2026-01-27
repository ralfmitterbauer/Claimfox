import React from 'react'
import Card from '@/components/ui/Card'
import Header from '@/components/ui/Header'
import { useI18n } from '@/i18n/I18nContext'
import HeroBlockBackground from '@/assets/images/hero_block_1.png'

export default function UnderwriterJuniorPage() {
  const { lang } = useI18n()

  const copy = lang === 'en'
    ? {
        title: 'Junior Underwriter',
        subtitle: 'Limited authority with higher referral volume and guided guardrails.',
        kpis: [
          { label: 'In-scope referrals', value: '142', note: 'Month-to-date' },
          { label: 'Bind authority', value: '≤ € 50k', note: 'Per risk' },
          { label: 'Turnaround time', value: '1.6 days', note: 'Avg referral cycle' }
        ],
        sections: [
          {
            title: 'Assigned portfolio',
            items: ['SME logistics accounts', 'Low severity profiles', 'Tight corridor constraints']
          },
          {
            title: 'Referral logic',
            items: ['Mandatory referral outside corridor', 'Auto-escalation on aggregation alerts', 'No override without approval']
          },
          {
            title: 'Decision support',
            items: ['AI highlights risk flags', 'Evidence-first underwriting checks', 'Audit trail mandatory']
          }
        ]
      }
    : {
        title: 'Junior Underwriter',
        subtitle: 'Begrenzte Authority mit höherem Referral-Anteil und klaren Leitplanken.',
        kpis: [
          { label: 'In-scope Referrals', value: '142', note: 'Monat bis heute' },
          { label: 'Bind Authority', value: '≤ € 50k', note: 'Pro Risiko' },
          { label: 'Turnaround Time', value: '1,6 Tage', note: 'Ø Referral-Zyklus' }
        ],
        sections: [
          {
            title: 'Zugewiesenes Portfolio',
            items: ['SME-Logistikbestände', 'Niedrige Schadenintensität', 'Enge Korridor-Grenzen']
          },
          {
            title: 'Referral-Logik',
            items: ['Verpflichtende Referral außerhalb des Korridors', 'Auto-Eskalation bei Aggregations-Alerts', 'Kein Override ohne Freigabe']
          },
          {
            title: 'Entscheidungsunterstützung',
            items: ['AI markiert Risiko-Flags', 'Evidenzbasierte Underwriting-Checks', 'Audit Trail verpflichtend']
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
