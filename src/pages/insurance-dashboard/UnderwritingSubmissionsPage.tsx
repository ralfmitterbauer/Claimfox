import React from 'react'
import { useI18n } from '@/i18n/I18nContext'
import InsuranceDashboardDetail from '@/pages/insurance-dashboard/InsuranceDashboardDetail'

export default function UnderwritingSubmissionsPage() {
  const { lang } = useI18n()

  const copy = {
    kicker: lang === 'en' ? 'Insurance dashboard' : 'Versicherungs-Dashboard',
    title: lang === 'en' ? 'Underwriting: new submissions' : 'Underwriting: neue Einreichungen',
    subtitle: lang === 'en'
      ? 'Initial intake and quote readiness.'
      : 'Initialer Intake und Quote-Readiness.',
    backLabel: lang === 'en' ? 'Back to dashboard' : 'Zuruck zum Dashboard',
    backRoute: '/insurance-dashboard',
    kpis: [
      { label: lang === 'en' ? 'New submissions' : 'Neue Einreichungen', value: '46' },
      { label: lang === 'en' ? 'Avg time to quote' : 'Zeit bis Quote', value: '2.1 d' },
      { label: lang === 'en' ? 'Data gaps' : 'Datenlucken', value: '7' },
      { label: lang === 'en' ? 'Corridor fit' : 'Korridor-Fit', value: '78%' }
    ],
    sections: [
      {
        id: 'queue',
        title: lang === 'en' ? 'Submission queue' : 'Einreichungs-Queue',
        body: lang === 'en'
          ? 'Cases awaiting first review and data validation.'
          : 'Falle warten auf Erstprufung und Datenvalidierung.',
        kpis: [
          { label: lang === 'en' ? 'Priority today' : 'Prioritat heute', value: '12' },
          { label: lang === 'en' ? 'With missing docs' : 'Fehlende Dokumente', value: '5' },
          { label: lang === 'en' ? 'Auto-validated' : 'Auto-validiert', value: '29' }
        ],
        cards: [
          {
            title: lang === 'en' ? 'Top submission sources' : 'Top-Quellen',
            body: lang === 'en'
              ? 'Broker portal, partner API, direct enterprise.'
              : 'Maklerportal, Partner-API, Enterprise direkt.'
          },
          {
            title: lang === 'en' ? 'Data completeness' : 'Datenvollstandigkeit',
            body: lang === 'en'
              ? 'Average 92% at intake; 7 cases below threshold.'
              : 'Im Schnitt 92% im Intake; 7 Falle unter Schwelle.'
          },
          {
            title: lang === 'en' ? 'Quote draft readiness' : 'Quote-Draft-Readiness',
            body: lang === 'en'
              ? '31 cases ready for pricing review.'
              : '31 Falle bereit fur Pricing-Review.'
          }
        ]
      }
    ]
  }

  return <InsuranceDashboardDetail {...copy} />
}
