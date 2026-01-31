import React from 'react'
import { useI18n } from '@/i18n/I18nContext'
import InsuranceDashboardDetail from '@/pages/insurance-dashboard/InsuranceDashboardDetail'

export default function OperationsProgramStatusPage() {
  const { lang } = useI18n()

  const copy = {
    kicker: lang === 'en' ? 'Insurance dashboard' : 'Versicherungs-Dashboard',
    title: lang === 'en' ? 'Operations: program status' : 'Operations: Programmstatus',
    subtitle: lang === 'en'
      ? 'Execution health across insurance programs.'
      : 'Ausfuhrungsstatus uber Versicherungsprogramme.',
    backLabel: lang === 'en' ? 'Back to dashboard' : 'Zuruck zum Dashboard',
    backRoute: '/insurance-dashboard',
    kpis: [
      { label: lang === 'en' ? 'Active programs' : 'Aktive Programme', value: '12' },
      { label: lang === 'en' ? 'Processing volume' : 'Processing-Volumen', value: '1.2k' },
      { label: lang === 'en' ? 'Exception backlog' : 'Ausnahmen-Backlog', value: '8' },
      { label: lang === 'en' ? 'Incident alerts' : 'Incident-Alerts', value: '1' }
    ],
    sections: [
      {
        id: 'status',
        title: lang === 'en' ? 'Program status' : 'Programmstatus',
        body: lang === 'en'
          ? 'Monitor throughput and exception handling.'
          : 'Monitoring von Durchsatz und Ausnahmen.',
        kpis: [
          { label: lang === 'en' ? 'On track' : 'Im Plan', value: '10' },
          { label: lang === 'en' ? 'At risk' : 'Risiko', value: '1' },
          { label: lang === 'en' ? 'Paused' : 'Pausiert', value: '1' }
        ],
        cards: [
          {
            title: lang === 'en' ? 'Throughput overview' : 'Durchsatz-Ubersicht',
            body: lang === 'en'
              ? 'Stable processing on core programs.'
              : 'Stabiler Durchsatz in Kernprogrammen.'
          },
          {
            title: lang === 'en' ? 'Exception handling' : 'Ausnahmen-Handling',
            body: lang === 'en'
              ? '8 items pending in manual review.'
              : '8 Items in manueller Prufung.'
          },
          {
            title: lang === 'en' ? 'Release calendar' : 'Release-Kalender',
            body: lang === 'en'
              ? 'Next release window in 4 days.'
              : 'Naechstes Release-Fenster in 4 Tagen.'
          }
        ]
      }
    ]
  }

  return <InsuranceDashboardDetail {...copy} />
}
