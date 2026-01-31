import React from 'react'
import { useI18n } from '@/i18n/I18nContext'
import InsuranceDashboardDetail from '@/pages/insurance-dashboard/InsuranceDashboardDetail'

export default function OperationsIntegrationsPage() {
  const { lang } = useI18n()

  const copy = {
    kicker: lang === 'en' ? 'Insurance dashboard' : 'Versicherungs-Dashboard',
    title: lang === 'en' ? 'Operations: integrations' : 'Operations: Integrationen',
    subtitle: lang === 'en'
      ? 'API health and data pipelines.'
      : 'API-Status und Datenpipelines.',
    backLabel: lang === 'en' ? 'Back to dashboard' : 'Zuruck zum Dashboard',
    backRoute: '/insurance-dashboard',
    kpis: [
      { label: lang === 'en' ? 'Connected systems' : 'Verbundene Systeme', value: '14' },
      { label: lang === 'en' ? 'Data latency' : 'Datenlatenz', value: '3m' },
      { label: lang === 'en' ? 'Failed jobs' : 'Fehlgeschlagene Jobs', value: '2' },
      { label: lang === 'en' ? '24h success rate' : '24h Erfolgsquote', value: '99.3%' }
    ],
    sections: [
      {
        id: 'health',
        title: lang === 'en' ? 'Integration health' : 'Integrationsstatus',
        body: lang === 'en'
          ? 'Critical endpoints and batch pipelines.'
          : 'Kritische Endpunkte und Batch-Pipelines.',
        kpis: [
          { label: lang === 'en' ? 'Critical endpoints' : 'Kritische Endpunkte', value: '3' },
          { label: lang === 'en' ? 'Retries queued' : 'Retries in Queue', value: '5' },
          { label: lang === 'en' ? 'Schema changes' : 'Schema-Anderungen', value: '1' }
        ],
        cards: [
          {
            title: lang === 'en' ? 'API uptime' : 'API-Uptime',
            body: lang === 'en'
              ? 'Core endpoints above 99.7%.'
              : 'Core-Endpunkte uber 99.7%.'
          },
          {
            title: lang === 'en' ? 'Pipeline backlog' : 'Pipeline-Backlog',
            body: lang === 'en'
              ? '2 failed jobs require review.'
              : '2 fehlgeschlagene Jobs erfordern Prufung.'
          },
          {
            title: lang === 'en' ? 'Change windows' : 'Change-Fenster',
            body: lang === 'en'
              ? 'Next maintenance in 2 days.'
              : 'Naechste Wartung in 2 Tagen.'
          }
        ]
      }
    ]
  }

  return <InsuranceDashboardDetail {...copy} />
}
