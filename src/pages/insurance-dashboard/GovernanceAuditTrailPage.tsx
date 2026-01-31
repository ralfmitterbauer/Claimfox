import React from 'react'
import { useI18n } from '@/i18n/I18nContext'
import InsuranceDashboardDetail from '@/pages/insurance-dashboard/InsuranceDashboardDetail'

export default function GovernanceAuditTrailPage() {
  const { lang } = useI18n()

  const copy = {
    kicker: lang === 'en' ? 'Insurance dashboard' : 'Versicherungs-Dashboard',
    title: lang === 'en' ? 'Governance: audit trail' : 'Governance: Audit-Trail',
    subtitle: lang === 'en'
      ? 'Audit completeness and evidence coverage.'
      : 'Audit-Vollstandigkeit und Evidenzabdeckung.',
    backLabel: lang === 'en' ? 'Back to dashboard' : 'Zuruck zum Dashboard',
    backRoute: '/insurance-dashboard',
    kpis: [
      { label: lang === 'en' ? 'Audit findings' : 'Audit-Findings', value: '1' },
      { label: lang === 'en' ? 'Open items' : 'Offene Items', value: '2' },
      { label: lang === 'en' ? 'Evidence coverage' : 'Evidenzabdeckung', value: '98%' },
      { label: lang === 'en' ? 'Retention status' : 'Retention-Status', value: '100%' }
    ],
    sections: [
      {
        id: 'audit',
        title: lang === 'en' ? 'Audit readiness' : 'Audit-Readiness',
        body: lang === 'en'
          ? 'Decision records and evidence chains are tracked.'
          : 'Entscheidungsnachweise und Evidenzketten werden nachverfolgt.',
        kpis: [
          { label: lang === 'en' ? 'Decision records' : 'Entscheidungsnachweise', value: '1.3k' },
          { label: lang === 'en' ? 'Evidence gaps' : 'Evidenzlucken', value: '6' },
          { label: lang === 'en' ? 'Regulator requests' : 'Regulator-Anfragen', value: '0' }
        ],
        cards: [
          {
            title: lang === 'en' ? 'Latest audits' : 'Letzte Audits',
            body: lang === 'en'
              ? 'One finding pending closure within 5 days.'
              : 'Ein Finding wartet auf Abschluss in 5 Tagen.'
          },
          {
            title: lang === 'en' ? 'Evidence completeness' : 'Evidenz-Vollstandigkeit',
            body: lang === 'en'
              ? '98% coverage for active programs.'
              : '98% Abdeckung fur aktive Programme.'
          },
          {
            title: lang === 'en' ? 'Retention policy' : 'Retention-Policy',
            body: lang === 'en'
              ? 'All records within mandated retention period.'
              : 'Alle Records in der vorgeschriebenen Retention.'
          }
        ]
      }
    ]
  }

  return <InsuranceDashboardDetail {...copy} />
}
