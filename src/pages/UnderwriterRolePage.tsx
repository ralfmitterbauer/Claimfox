import React from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '@/components/ui/Card'
import Header from '@/components/ui/Header'
import { useI18n } from '@/i18n/I18nContext'
import HeroBlockBackground from '@/assets/images/hero_block_1.png'

export default function UnderwriterRolePage() {
  const { lang } = useI18n()
  const navigate = useNavigate()

  const copy = lang === 'en'
    ? {
        title: 'Underwriter',
        subtitle: 'Portfolio steering, underwriting corridors and clear referral logic within the carrier framework.',
        disclaimer: 'Human-in-the-loop. Indicative data only — not a forecast.',
        kpi: {
          open: { label: 'Open decisions', note: 'Decision inbox' },
          referrals: { label: 'Referrals', note: 'Out-of-corridor' },
          breaches: { label: 'SLA breaches', note: 'SLA buckets' },
          authority: { label: 'Authority utilization', note: 'Limits used' },
          dataQuality: { label: 'Data quality avg', note: 'Evidence quality' }
        },
        rolesTitle: 'Roles & access levels',
        roles: [
          {
            title: 'Junior Underwriter',
            body: 'Lower authority with more referrals. Guided corridor checks and escalation triggers.',
            bullets: ['Decision inbox triage', 'Mandatory referrals', 'Evidence-first workflow'],
            cta: 'Open dashboard',
            route: '/underwriter/junior'
          },
          {
            title: 'Senior Underwriter',
            body: 'Expanded limits with mandatory override reason and governance sign-off.',
            bullets: ['Override governance', 'Portfolio steering', 'Escalation controls'],
            cta: 'Open dashboard',
            route: '/underwriter/senior'
          },
          {
            title: 'Carrier UW',
            body: 'Read-only portfolio view with final approval authority.',
            bullets: ['Final approval queue', 'Exposure oversight', 'Governance checkpoints'],
            cta: 'Open dashboard',
            route: '/underwriter/carrier'
          },
          {
            title: 'Compliance',
            body: 'Audit log access and governance oversight across decisions.',
            bullets: ['Audit-ready trails', 'Ruleset monitoring', 'Exception register'],
            cta: 'Open dashboard',
            route: '/underwriter/compliance'
          }
        ],
        overviewTitle: 'Platform overview',
        tiles: [
          {
            title: 'Portfolio Steering',
            body: 'Exposure aggregation limits • Capacity caps • Roll-out gates • Monthly review'
          },
          {
            title: 'Underwriting Corridors',
            body: 'Boundary adherence • Eligibility checks • Escalation thresholds'
          },
          {
            title: 'Referral Logic',
            body: 'Out-of-corridor cases • Aggregation alerts • Governance approvals'
          }
        ]
      }
    : {
        title: 'Underwriter',
        subtitle: 'Portfolio-Steuerung, Underwriting-Korridore und klare Referral-Logik im Carrier-Framework.',
        disclaimer: 'Human-in-the-loop. Indikative Daten — keine Prognose.',
        kpi: {
          open: { label: 'Offene Entscheidungen', note: 'Decision Inbox' },
          referrals: { label: 'Referrals', note: 'Out-of-corridor' },
          breaches: { label: 'SLA Breaches', note: 'SLA Buckets' },
          authority: { label: 'Authority Utilization', note: 'Limits genutzt' },
          dataQuality: { label: 'Data Quality Ø', note: 'Evidenzqualität' }
        },
        rolesTitle: 'Rollen & Zugriffslevel',
        roles: [
          {
            title: 'Junior Underwriter',
            body: 'Weniger Authority mit mehr Referrals. Geführte Korridor-Checks und Eskalationslogik.',
            bullets: ['Decision Inbox Triage', 'Pflicht-Referrals', 'Evidenzbasierter Workflow'],
            cta: 'Dashboard öffnen',
            route: '/underwriter/junior'
          },
          {
            title: 'Senior Underwriter',
            body: 'Erweiterte Limits mit Pflicht zur Override-Begründung und Governance-Sign-off.',
            bullets: ['Override-Governance', 'Portfolio-Steering', 'Eskalationskontrollen'],
            cta: 'Dashboard öffnen',
            route: '/underwriter/senior'
          },
          {
            title: 'Carrier UW',
            body: 'Read-only Portfolio-View mit finaler Approval-Authority.',
            bullets: ['Final Approval Queue', 'Exposure-Übersicht', 'Governance-Checkpoints'],
            cta: 'Dashboard öffnen',
            route: '/underwriter/carrier'
          },
          {
            title: 'Compliance',
            body: 'Audit-Log-Zugriff und Governance-Überblick über Entscheidungen.',
            bullets: ['Audit-Trails', 'Ruleset Monitoring', 'Exception Register'],
            cta: 'Dashboard öffnen',
            route: '/underwriter/compliance'
          }
        ],
        overviewTitle: 'Platform Overview',
        tiles: [
          {
            title: 'Portfolio Steering',
            body: 'Exposure-Aggregationsgrenzen • Kapazitäts-Caps • Roll-out Gates • Monthly Review'
          },
          {
            title: 'Underwriting Corridors',
            body: 'Boundary Adherence • Eligibility Checks • Escalation Thresholds'
          },
          {
            title: 'Referral Logic',
            body: 'Out-of-corridor Fälle • Aggregation Alerts • Governance Approvals'
          }
        ]
      }

  const cases = [
    { status: 'new', slaBucket: 'due_today', evidenceQuality: 84, aggregationImpact: 22 },
    { status: 'in_review', slaBucket: 'due_48h', evidenceQuality: 76, aggregationImpact: 41 },
    { status: 'referred', slaBucket: 'breached', evidenceQuality: 63, aggregationImpact: 55 },
    { status: 'new', slaBucket: 'due_today', evidenceQuality: 88, aggregationImpact: 19 },
    { status: 'in_review', slaBucket: 'due_48h', evidenceQuality: 72, aggregationImpact: 48 }
  ]

  const kpis = {
    open: cases.filter((item) => item.status !== 'approved' && item.status !== 'declined').length,
    referrals: cases.filter((item) => item.status === 'referred').length,
    breaches: cases.filter((item) => item.slaBucket === 'breached').length,
    authority: '62%',
    dataQuality: `${Math.round(cases.reduce((acc, item) => acc + item.evidenceQuality, 0) / cases.length)}%`
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
      <div style={{ width: '100%', maxWidth: 1200, margin: '0 auto', padding: '32px 1.25rem 4rem', display: 'grid', gap: '2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
          <Card title={copy.kpi.open.label} variant="glass" style={{ minHeight: '120px' }}>
            <div style={{ fontSize: '1.4rem', fontWeight: 700 }}>{kpis.open}</div>
            <div style={{ color: '#64748b' }}>{copy.kpi.open.note}</div>
          </Card>
          <Card title={copy.kpi.referrals.label} variant="glass" style={{ minHeight: '120px' }}>
            <div style={{ fontSize: '1.4rem', fontWeight: 700 }}>{kpis.referrals}</div>
            <div style={{ color: '#64748b' }}>{copy.kpi.referrals.note}</div>
          </Card>
          <Card title={copy.kpi.breaches.label} variant="glass" style={{ minHeight: '120px' }}>
            <div style={{ fontSize: '1.4rem', fontWeight: 700 }}>{kpis.breaches}</div>
            <div style={{ color: '#64748b' }}>{copy.kpi.breaches.note}</div>
          </Card>
          <Card title={copy.kpi.authority.label} variant="glass" style={{ minHeight: '120px' }}>
            <div style={{ fontSize: '1.4rem', fontWeight: 700 }}>{kpis.authority}</div>
            <div style={{ color: '#64748b' }}>{copy.kpi.authority.note}</div>
          </Card>
          <Card title={copy.kpi.dataQuality.label} variant="glass" style={{ minHeight: '120px' }}>
            <div style={{ fontSize: '1.4rem', fontWeight: 700 }}>{kpis.dataQuality}</div>
            <div style={{ color: '#64748b' }}>{copy.kpi.dataQuality.note}</div>
          </Card>
        </div>

        <div style={{ display: 'grid', gap: '1rem' }}>
          <h2 style={{ margin: 0, fontSize: '1.35rem', color: '#0e0d1c' }}>{copy.rolesTitle}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
            {copy.roles.map((role) => (
              <Card
                key={role.title}
                title={role.title}
                variant="glass"
                interactive
                onClick={() => navigate(role.route)}
                style={{ display: 'flex', flexDirection: 'column', minHeight: '190px' }}
              >
                <p style={{ margin: '0 0 0.75rem', color: '#475569', lineHeight: 1.5 }}>{role.body}</p>
                <ul style={{ margin: 0, paddingLeft: '1.1rem', color: '#64748b', lineHeight: 1.5 }}>
                  {role.bullets.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <div style={{ marginTop: 'auto', color: '#0e0d1c', fontWeight: 600 }}>{role.cta}</div>
              </Card>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gap: '1rem' }}>
          <h2 style={{ margin: 0, fontSize: '1.35rem', color: '#0e0d1c' }}>{copy.overviewTitle}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
            {copy.tiles.map((tile) => (
              <Card
                key={tile.title}
                title={tile.title}
                variant="glass"
                style={{ minHeight: '170px' }}
              >
                <p style={{ margin: 0, color: '#475569', lineHeight: 1.5 }}>{tile.body}</p>
              </Card>
            ))}
          </div>
        </div>

        <div style={{ color: '#64748b', fontSize: '0.9rem' }}>{copy.disclaimer}</div>
      </div>
    </section>
  )
}
