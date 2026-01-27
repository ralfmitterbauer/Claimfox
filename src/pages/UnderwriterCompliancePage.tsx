import React from 'react'
import Card from '@/components/ui/Card'
import Header from '@/components/ui/Header'
import { useI18n } from '@/i18n/I18nContext'
import HeroBlockBackground from '@/assets/images/hero_block_1.png'

export default function UnderwriterCompliancePage() {
  const { lang } = useI18n()

  const copy = lang === 'en'
    ? {
        title: 'Compliance',
        subtitle: 'Audit logs, governance controls and traceability across underwriting decisions.',
        kpis: [
          { label: 'Audit events', value: '2,418', note: 'Last 30 days' },
          { label: 'Policy exceptions', value: '36', note: 'Logged with evidence' },
          { label: 'Model versions', value: '7', note: 'Active governance set' }
        ],
        sections: [
          {
            title: 'Audit log',
            items: ['Immutable decision trail', 'Evidence bundles per case', 'Timestamped overrides']
          },
          {
            title: 'Governance controls',
            items: ['Authority scope validation', 'Referral escalation rules', 'Limit and corridor compliance']
          },
          {
            title: 'Reporting',
            items: ['Bordereaux extracts', 'Exception reporting', 'Regulatory documentation']
          }
        ]
      }
    : {
        title: 'Compliance',
        subtitle: 'Audit-Logs, Governance-Kontrollen und Nachvollziehbarkeit im Underwriting.',
        kpis: [
          { label: 'Audit-Events', value: '2.418', note: 'Letzte 30 Tage' },
          { label: 'Policy-Exceptions', value: '36', note: 'Mit Evidenz dokumentiert' },
          { label: 'Model-Versionen', value: '7', note: 'Aktiver Governance-Stand' }
        ],
        sections: [
          {
            title: 'Audit-Log',
            items: ['Unveränderlicher Decision-Trail', 'Evidence Bundles je Fall', 'Zeitgestempelte Overrides']
          },
          {
            title: 'Governance-Kontrollen',
            items: ['Authority-Scope Validierung', 'Referral-Eskalationslogik', 'Limit- und Korridor-Compliance']
          },
          {
            title: 'Reporting',
            items: ['Bordereaux-Extrakte', 'Exception-Reporting', 'Regulatorische Dokumentation']
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
