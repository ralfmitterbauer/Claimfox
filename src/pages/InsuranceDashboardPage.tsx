import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '@/components/ui/Button'
import { useI18n } from '@/i18n/I18nContext'

export default function InsuranceDashboardPage() {
  const { lang } = useI18n()
  const navigate = useNavigate()
  const go = (route: string) => {
    navigate(route)
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }

  const copy = {
    headerKicker: lang === 'en' ? 'Insurance dashboard' : 'Versicherungs-Dashboard',
    headerTitle: lang === 'en'
      ? 'Overview by department (AI analysis and decision templates)'
      : 'Ubersicht nach Abteilungen (KI-Analyse und Entscheidungsvorlagen)',
    headerBody: lang === 'en'
      ? 'Operational views grouped by responsibility.'
      : 'Operative Ansichten nach Verantwortungsbereichen.',
    back: lang === 'en' ? 'Back to Insurance' : 'Zuruck zu Insurance',
    kpis: [
      { label: lang === 'en' ? 'Open cases' : 'Offene Falle', value: '128' },
      { label: lang === 'en' ? 'Referrals / exceptions' : 'Freigaben / Ausnahmen', value: '14' },
      { label: lang === 'en' ? 'Active partners' : 'Aktive Partner', value: '32' },
      { label: lang === 'en' ? 'SLA breaches' : 'SLA-Verstosse', value: '3' }
    ],
    sections: [
      {
        id: 'underwriting',
        title: lang === 'en' ? 'Underwriting' : 'Underwriting',
        body: lang === 'en'
          ? 'Quoting, referrals and portfolio signals.'
          : 'Angebot, Freigaben und Portfolio-Signale.',
        kpis: [
          { label: lang === 'en' ? 'New submissions' : 'Neue Einreichungen', value: '46' },
          { label: lang === 'en' ? 'Open referrals' : 'Offene Freigaben', value: '9' },
          { label: lang === 'en' ? 'Portfolio exceptions' : 'Portfolio-Ausnahmen', value: '5' }
        ],
        cards: [
          { title: lang === 'en' ? 'New submissions' : 'Neue Einreichungen', route: '/insurance-dashboard/underwriting/submissions' },
          { title: lang === 'en' ? 'Referrals & approvals' : 'Freigaben & Entscheidungen', route: '/insurance-dashboard/underwriting/referrals' },
          { title: lang === 'en' ? 'Portfolio view' : 'Portfolio-Ansicht', route: '/insurance-dashboard/underwriting/portfolio' }
        ]
      },
      {
        id: 'claims',
        title: lang === 'en' ? 'Claims' : 'Schaden',
        body: lang === 'en'
          ? 'Triage, reserves and partner coordination.'
          : 'Triage, Reserven und Partnerkoordination.',
        kpis: [
          { label: lang === 'en' ? 'Open claims' : 'Offene Schaden', value: '72' },
          { label: lang === 'en' ? 'Cost approvals pending' : 'Offene Kostenfreigaben', value: '11' },
          { label: lang === 'en' ? 'SLA breaches' : 'SLA-Verstosse', value: '2' }
        ],
        cards: [
          { title: lang === 'en' ? 'Claims worklist' : 'Schaden-Worklist', route: '/claim-manager-app' },
          { title: lang === 'en' ? 'Cost approvals' : 'Kostenfreigaben', route: '/insurance-dashboard/claims/cost-approvals' },
          { title: lang === 'en' ? 'Partner orchestration' : 'Partner-Orchestrierung', route: '/partner-management-overview' }
        ]
      },
      {
        id: 'operations',
        title: lang === 'en' ? 'Operations' : 'Operations',
        body: lang === 'en'
          ? 'Program execution and monitoring.'
          : 'Programmausfuhrung und Monitoring.',
        kpis: [
          { label: lang === 'en' ? 'Active programs' : 'Aktive Programme', value: '12' },
          { label: lang === 'en' ? 'Integration health' : 'Integrationsstatus', value: '97%' },
          { label: lang === 'en' ? 'Processing volume' : 'Processing-Volumen', value: '1.2k' }
        ],
        cards: [
          { title: lang === 'en' ? 'Program status' : 'Programmstatus', route: '/insurance-dashboard/operations/program-status' },
          { title: lang === 'en' ? 'Integrations' : 'Integrationen', route: '/insurance-dashboard/operations/integrations' },
          { title: lang === 'en' ? 'Reporting & bordereaux' : 'Reporting & Bordereaux', route: '/insurance-dashboard/operations/reporting' }
        ]
      },
      {
        id: 'governance',
        title: lang === 'en' ? 'Compliance & Governance' : 'Compliance & Governance',
        body: lang === 'en'
          ? 'Mandates, access and audit readiness.'
          : 'Mandate, Zugriff und Auditierbarkeit.',
        kpis: [
          { label: lang === 'en' ? 'Active mandates' : 'Aktive Mandate', value: '18' },
          { label: lang === 'en' ? 'Rule versions' : 'Regelversionen', value: '64' },
          { label: lang === 'en' ? 'Audit findings' : 'Audit-Findings', value: '1' }
        ],
        cards: [
          { title: lang === 'en' ? 'Access & mandates' : 'Zugriff & Mandate', route: '/insurance-dashboard/governance/access-mandates' },
          { title: lang === 'en' ? 'Rules & versions' : 'Regeln & Versionen', route: '/insurance-dashboard/governance/rules-versions' },
          { title: lang === 'en' ? 'Audit trail' : 'Audit-Trail', route: '/insurance-dashboard/governance/audit-trail' }
        ]
      }
    ]
  }

  return (
    <main className="home-marketing">
      <section className="home-value" style={{ paddingTop: '2.5rem' }}>
        <div className="home-section-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
          <div>
            <span className="home-hero-kicker">{copy.headerKicker}</span>
            <h1 style={{ margin: '0.35rem 0 0.4rem' }}>{copy.headerTitle}</h1>
            <p>{copy.headerBody}</p>
          </div>
          <Button
            onClick={() => go('/insurance')}
            className="home-marketing-login"
            style={{ padding: '0.5rem 1.1rem' }}
            disableHover
          >
            {copy.back}
          </Button>
        </div>
        <div className="home-value-grid">
          {copy.kpis.map((kpi) => (
            <div key={kpi.label} className="home-value-card" style={{ display: 'grid', gap: '0.35rem' }}>
              <div style={{ fontSize: '1.8rem', fontWeight: 700, color: '#0f172a' }}>{kpi.value}</div>
              <div style={{ color: '#475569' }}>{kpi.label}</div>
            </div>
          ))}
        </div>
      </section>

      {copy.sections.map((section, idx) => (
        <section key={section.id} className="home-value">
          {idx > 0 && (
            <div style={{ width: '100%', height: 2, background: 'var(--insurfox-blue, #2563eb)', marginBottom: '2rem' }} />
          )}
          <div className="home-section-header">
            <h2>{section.title}</h2>
            <p>{section.body}</p>
          </div>
          <div className="home-value-grid">
            {section.kpis.map((kpi) => (
              <div key={kpi.label} className="home-value-card" style={{ display: 'grid', gap: '0.35rem' }}>
                <div style={{ fontSize: '1.6rem', fontWeight: 700, color: '#0f172a' }}>{kpi.value}</div>
                <div style={{ color: '#475569' }}>{kpi.label}</div>
              </div>
            ))}
          </div>
          <div className="home-value-grid" style={{ marginTop: '1.25rem' }}>
            {section.cards.map((card) => (
              <button
                key={card.title}
                type="button"
                className="home-value-card"
                onClick={() => go(card.route)}
                style={{ textAlign: 'left' }}
              >
                <h3>{card.title}</h3>
              </button>
            ))}
          </div>
        </section>
      ))}
    </main>
  )
}
