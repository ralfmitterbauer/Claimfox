import React from 'react'
import Card from '@/components/ui/Card'
import Header from '@/components/ui/Header'
import { useI18n } from '@/i18n/I18nContext'
import HeroBlockBackground from '@/assets/images/hero_block_1.png'

export default function UnderwriterSeniorPage() {
  const { lang } = useI18n()

  const copy = lang === 'en'
    ? {
        title: 'Senior Underwriter',
        subtitle: 'Expanded limits with mandatory override reasons and stricter governance checks.',
        kpis: [
          { label: 'Override approvals', value: '18', note: 'Month-to-date' },
          { label: 'Bind authority', value: '≤ € 250k', note: 'Per risk' },
          { label: 'Portfolio health', value: 'Stable', note: 'Within corridor' }
        ],
        sections: [
          {
            title: 'Authority & limits',
            items: ['Expanded limit schedule', 'Override reason required', 'Escalation for tail clustering']
          },
          {
            title: 'Governance checks',
            items: ['Corridor compliance reviews', 'Aggregation caps enforced', 'Monthly steering pack sign-off']
          },
          {
            title: 'Decision rationale',
            items: ['Evidence bundle required', 'Human-in-the-loop approvals', 'Audit trail for every exception']
          }
        ]
      }
    : {
        title: 'Senior Underwriter',
        subtitle: 'Erweiterte Limits mit Pflicht zur Override-Begründung und strengerer Governance.',
        kpis: [
          { label: 'Override-Freigaben', value: '18', note: 'Monat bis heute' },
          { label: 'Bind Authority', value: '≤ € 250k', note: 'Pro Risiko' },
          { label: 'Portfolio-Status', value: 'Stabil', note: 'Innerhalb Korridor' }
        ],
        sections: [
          {
            title: 'Authority & Limits',
            items: ['Erweitertes Limitschema', 'Override-Begründung verpflichtend', 'Eskalation bei Tail-Clustering']
          },
          {
            title: 'Governance-Checks',
            items: ['Korridor-Compliance Reviews', 'Aggregation Caps enforcebar', 'Monatlicher Steering Pack Sign-off']
          },
          {
            title: 'Entscheidungsbegründung',
            items: ['Evidence Bundle erforderlich', 'Human-in-the-loop Freigaben', 'Audit Trail für jede Ausnahme']
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
