import React from 'react'
import { useI18n } from '@/i18n/I18nContext'
import InsuranceDashboardDetail from '@/pages/insurance-dashboard/InsuranceDashboardDetail'

export default function GovernanceRulesVersionsPage() {
  const { lang } = useI18n()

  const copy = {
    kicker: lang === 'en' ? 'Insurance dashboard' : 'Versicherungs-Dashboard',
    title: lang === 'en' ? 'Governance: rules & versions' : 'Governance: Regeln & Versionen',
    subtitle: lang === 'en'
      ? 'Change control for rules and models.'
      : 'Change-Control fur Regeln und Modelle.',
    backLabel: lang === 'en' ? 'Back to dashboard' : 'Zuruck zum Dashboard',
    backRoute: '/insurance-dashboard',
    kpis: [
      { label: lang === 'en' ? 'Rule versions' : 'Regelversionen', value: '64' },
      { label: lang === 'en' ? 'Model versions' : 'Modellversionen', value: '9' },
      { label: lang === 'en' ? 'Changes pending' : 'Offene Changes', value: '2' },
      { label: lang === 'en' ? 'Last audit' : 'Letztes Audit', value: '14d' }
    ],
    sections: [
      {
        id: 'changes',
        title: lang === 'en' ? 'Change log' : 'Change-Log',
        body: lang === 'en'
          ? 'Versioned rules and approval workflow.'
          : 'Versionierte Regeln und Freigabe-Workflow.',
        kpis: [
          { label: lang === 'en' ? 'Approved releases' : 'Freigegebene Releases', value: '5' },
          { label: lang === 'en' ? 'In review' : 'In Prufung', value: '2' },
          { label: lang === 'en' ? 'Rollback ready' : 'Rollback-ready', value: '100%' }
        ],
        cards: [
          {
            title: lang === 'en' ? 'Recent changes' : 'Letzte Anderungen',
            body: lang === 'en'
              ? 'Two rule updates approved this month.'
              : 'Zwei Regel-Updates diesen Monat freigegeben.'
          },
          {
            title: lang === 'en' ? 'Model registry' : 'Modell-Registry',
            body: lang === 'en'
              ? 'Nine active versions with documented lineage.'
              : 'Neun aktive Versionen mit dokumentierter Herkunft.'
          },
          {
            title: lang === 'en' ? 'Approval workflow' : 'Freigabe-Workflow',
            body: lang === 'en'
              ? 'All pending changes have assigned reviewers.'
              : 'Alle offenen Changes haben Reviewer.'
          }
        ]
      }
    ]
  }

  return <InsuranceDashboardDetail {...copy} />
}
