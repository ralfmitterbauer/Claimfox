import React from 'react'
import { useI18n } from '@/i18n/I18nContext'
import InsuranceDashboardDetail from '@/pages/insurance-dashboard/InsuranceDashboardDetail'

export default function ClaimsCostApprovalsPage() {
  const { lang } = useI18n()

  const copy = {
    kicker: lang === 'en' ? 'Insurance dashboard' : 'Versicherungs-Dashboard',
    title: lang === 'en' ? 'Claims: cost approvals' : 'Schaden: Kostenfreigaben',
    subtitle: lang === 'en'
      ? 'Approval queue and decision rationale.'
      : 'Freigabe-Queue und Entscheidungsbegrundung.',
    backLabel: lang === 'en' ? 'Back to dashboard' : 'Zuruck zum Dashboard',
    backRoute: '/insurance-dashboard',
    kpis: [
      { label: lang === 'en' ? 'Approvals pending' : 'Offene Freigaben', value: '11' },
      { label: lang === 'en' ? 'Avg approval' : 'Schnitt Freigabe', value: '18.4k' },
      { label: lang === 'en' ? 'Over-limit requests' : 'Uber Limit', value: '3' },
      { label: lang === 'en' ? 'Savings vs estimate' : 'Einsparung vs Schatze', value: '6%' }
    ],
    sections: [
      {
        id: 'queue',
        title: lang === 'en' ? 'Approval queue' : 'Freigabe-Queue',
        body: lang === 'en'
          ? 'Cases awaiting cost authorization.'
          : 'Falle mit ausstehender Kostenfreigabe.',
        kpis: [
          { label: lang === 'en' ? 'High severity' : 'Hohe Severity', value: '4' },
          { label: lang === 'en' ? 'Partner estimates' : 'Partner-Schatzungen', value: '6' },
          { label: lang === 'en' ? 'Exceptions' : 'Ausnahmen', value: '2' }
        ],
        cards: [
          {
            title: lang === 'en' ? 'Top pending items' : 'Top offene Items',
            body: lang === 'en'
              ? '3 approvals above standard authority threshold.'
              : '3 Freigaben uber Standard-Autoritat.'
          },
          {
            title: lang === 'en' ? 'Override rationale' : 'Override-Begrundung',
            body: lang === 'en'
              ? 'Missing evidence flagged on 2 cases.'
              : 'Fehlende Evidenz bei 2 Fallen markiert.'
          },
          {
            title: lang === 'en' ? 'Escalation queue' : 'Eskalations-Queue',
            body: lang === 'en'
              ? '2 escalations waiting for senior approval.'
              : '2 Eskalationen warten auf Senior-Freigabe.'
          }
        ]
      }
    ]
  }

  return <InsuranceDashboardDetail {...copy} />
}
