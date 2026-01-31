import React from 'react'
import { useI18n } from '@/i18n/I18nContext'
import InsuranceDashboardDetail from '@/pages/insurance-dashboard/InsuranceDashboardDetail'

export default function OperationsReportingPage() {
  const { lang } = useI18n()

  const copy = {
    kicker: lang === 'en' ? 'Insurance dashboard' : 'Versicherungs-Dashboard',
    title: lang === 'en' ? 'Operations: reporting & bordereaux' : 'Operations: Reporting & Bordereaux',
    subtitle: lang === 'en'
      ? 'Delivery schedule and data quality.'
      : 'Lieferplan und Datenqualitat.',
    backLabel: lang === 'en' ? 'Back to dashboard' : 'Zuruck zum Dashboard',
    backRoute: '/insurance-dashboard',
    kpis: [
      { label: lang === 'en' ? 'Reports generated' : 'Reports erzeugt', value: '28' },
      { label: lang === 'en' ? 'Bordereaux due' : 'Bordereaux fallig', value: '3' },
      { label: lang === 'en' ? 'Late deliveries' : 'Verspatet', value: '1' },
      { label: lang === 'en' ? 'Data quality' : 'Datenqualitat', value: '96%' }
    ],
    sections: [
      {
        id: 'schedule',
        title: lang === 'en' ? 'Reporting cadence' : 'Reporting-Zyklus',
        body: lang === 'en'
          ? 'Upcoming deliveries and quality checks.'
          : 'Anstehende Lieferungen und Qualitatschecks.',
        kpis: [
          { label: lang === 'en' ? 'Next delivery' : 'Naechste Lieferung', value: '3d' },
          { label: lang === 'en' ? 'Open issues' : 'Offene Issues', value: '2' },
          { label: lang === 'en' ? 'Carrier packs' : 'Carrier-Pakete', value: '6' }
        ],
        cards: [
          {
            title: lang === 'en' ? 'Delivery calendar' : 'Lieferkalender',
            body: lang === 'en'
              ? '3 bordereaux due within 7 days.'
              : '3 Bordereaux fallig in 7 Tagen.'
          },
          {
            title: lang === 'en' ? 'Data validation' : 'Datenvalidierung',
            body: lang === 'en'
              ? 'Two datasets require reconciliation.'
              : 'Zwei Datensatze mussen abgeglichen werden.'
          },
          {
            title: lang === 'en' ? 'Executive pack' : 'Executive-Pack',
            body: lang === 'en'
              ? 'Board summary scheduled for Friday.'
              : 'Board-Zusammenfassung fur Freitag geplant.'
          }
        ]
      }
    ]
  }

  return <InsuranceDashboardDetail {...copy} />
}
