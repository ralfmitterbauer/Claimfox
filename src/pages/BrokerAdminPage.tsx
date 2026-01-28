import React from 'react'
import Card from '@/components/ui/Card'
import Header from '@/components/ui/Header'
import { useI18n } from '@/i18n/I18nContext'

export default function BrokerAdminPage() {
  const { lang } = useI18n()

  const copy = lang === 'en'
    ? {
        title: 'Broker Administration',
        subtitle: 'Admin view over portfolio, team access, and compliance.',
        kpis: [
          { title: 'Active accounts', value: '142' },
          { title: 'Open tasks', value: '18' },
          { title: 'Compliance alerts', value: '4' },
          { title: 'Premium in force', value: '€ 12.4M' },
          { title: 'Renewals due', value: '9' },
          { title: 'Pending approvals', value: '6' }
        ],
        taskQueueTitle: 'Task queue',
        complianceTitle: 'Compliance snapshot',
        accessTitle: 'Team access',
        portfolioTitle: 'Portfolio overview',
        accessRows: [
          { name: 'Anna Klein', role: 'Admin', lastLogin: 'Today, 09:12' },
          { name: 'Lukas Weber', role: 'Operations', lastLogin: 'Yesterday, 18:45' },
          { name: 'Maja Roth', role: 'Compliance', lastLogin: 'Yesterday, 10:03' },
          { name: 'Jonas Blum', role: 'Broker Manager', lastLogin: '2 days ago' }
        ],
        taskQueue: [
          { title: 'Approve renewal: Atlas Logistics', status: 'Due today' },
          { title: 'Review claim escalation: CLM-20841', status: '2h left' },
          { title: 'Update broker license docs', status: 'Tomorrow' },
          { title: 'Portfolio exception: FleetSecure', status: '48h' }
        ],
        complianceItems: [
          { label: 'Delegated authority docs', value: 'Up to date' },
          { label: 'AML / KYC checks', value: '92%' },
          { label: 'Audit readiness', value: 'Green' },
          { label: 'Escalations pending', value: '3' }
        ],
        portfolioItems: [
          { label: 'Top lines', value: 'Fleet, Cargo, Liability, Cyber' },
          { label: 'Loss ratio', value: '62% (target 65%)' },
          { label: 'Retention risk', value: '8 accounts flagged' },
          { label: 'Next renewal window', value: '14 days' }
        ]
      }
    : {
        title: 'Broker Administration',
        subtitle: 'Administrative Übersicht über Portfolio, Teamzugriffe und Compliance.',
        kpis: [
          { title: 'Aktive Accounts', value: '142' },
          { title: 'Offene Tasks', value: '18' },
          { title: 'Compliance Alerts', value: '4' },
          { title: 'Prämienbestand', value: '€ 12,4 Mio' },
          { title: 'Fällige Renewals', value: '9' },
          { title: 'Offene Freigaben', value: '6' }
        ],
        taskQueueTitle: 'Task-Queue',
        complianceTitle: 'Compliance Snapshot',
        accessTitle: 'Teamzugriffe',
        portfolioTitle: 'Portfolio-Übersicht',
        accessRows: [
          { name: 'Anna Klein', role: 'Admin', lastLogin: 'Heute, 09:12' },
          { name: 'Lukas Weber', role: 'Operations', lastLogin: 'Gestern, 18:45' },
          { name: 'Maja Roth', role: 'Compliance', lastLogin: 'Gestern, 10:03' },
          { name: 'Jonas Blum', role: 'Broker Manager', lastLogin: 'Vor 2 Tagen' }
        ],
        taskQueue: [
          { title: 'Renewal freigeben: Atlas Logistics', status: 'Heute fällig' },
          { title: 'Schaden-Eskalation prüfen: CLM-20841', status: '2h verbleiben' },
          { title: 'Maklerlizenz-Dokumente aktualisieren', status: 'Morgen' },
          { title: 'Portfolio-Exception: FleetSecure', status: '48h' }
        ],
        complianceItems: [
          { label: 'Delegated Authority Dokumente', value: 'Aktuell' },
          { label: 'AML / KYC Checks', value: '92%' },
          { label: 'Audit Readiness', value: 'Grün' },
          { label: 'Eskalationen offen', value: '3' }
        ],
        portfolioItems: [
          { label: 'Top-Sparten', value: 'Fleet, Cargo, Liability, Cyber' },
          { label: 'Loss Ratio', value: '62% (Ziel 65%)' },
          { label: 'Retention-Risiko', value: '8 Accounts markiert' },
          { label: 'Nächstes Renewal-Fenster', value: '14 Tage' }
        ]
      }

  return (
    <section className="uw-page">
      <div className="uw-container">
        <Header
          title={copy.title}
          subtitle={copy.subtitle}
          subtitleColor="#65748b"
        />

        <div className="uw-grid uw-kpi">
          {copy.kpis.map((item) => (
            <Card key={item.title} title={item.title} variant="glass" className="uw-card">
              <div className="uw-card-body">
                <strong style={{ fontSize: '1.4rem' }}>{item.value}</strong>
              </div>
            </Card>
          ))}
        </div>

        <div className="uw-grid uw-split">
          <Card title={copy.taskQueueTitle} variant="glass" className="uw-card">
            <div className="uw-card-body" style={{ gap: '0.75rem' }}>
              {copy.taskQueue.map((task) => (
                <div key={task.title} style={{ display: 'flex', justifyContent: 'space-between', gap: '0.75rem' }}>
                  <span>{task.title}</span>
                  <span className="uw-muted">{task.status}</span>
                </div>
              ))}
            </div>
          </Card>
          <Card title={copy.complianceTitle} variant="glass" className="uw-card">
            <div className="uw-card-body" style={{ gap: '0.75rem' }}>
              {copy.complianceItems.map((item) => (
                <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="uw-grid uw-split">
          <Card title={copy.accessTitle} variant="glass" className="uw-card">
            <div className="uw-card-body" style={{ gap: '0.75rem' }}>
              {copy.accessRows.map((row) => (
                <div key={row.name} style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr 1fr', gap: '0.75rem' }}>
                  <strong>{row.name}</strong>
                  <span className="uw-muted">{row.role}</span>
                  <span className="uw-muted">{row.lastLogin}</span>
                </div>
              ))}
            </div>
          </Card>
          <Card title={copy.portfolioTitle} variant="glass" className="uw-card">
            <div className="uw-card-body" style={{ gap: '0.75rem' }}>
              {copy.portfolioItems.map((item) => (
                <div key={item.label}>
                  <strong>{item.label}</strong>
                  <div className="uw-muted">{item.value}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
