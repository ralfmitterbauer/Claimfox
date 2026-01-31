import React from 'react'
import { useI18n } from '@/i18n/I18nContext'
import InsuranceDashboardDetail from '@/pages/insurance-dashboard/InsuranceDashboardDetail'

export default function UnderwritingPortfolioPage() {
  const { lang } = useI18n()

  const copy = {
    kicker: lang === 'en' ? 'Insurance dashboard' : 'Versicherungs-Dashboard',
    title: lang === 'en' ? 'Underwriting: portfolio view' : 'Underwriting: Portfolio-Ansicht',
    subtitle: lang === 'en'
      ? 'Signals and exceptions across programs.'
      : 'Signale und Ausnahmen uber Programme.',
    backLabel: lang === 'en' ? 'Back to dashboard' : 'Zuruck zum Dashboard',
    backRoute: '/insurance-dashboard',
    kpis: [
      { label: lang === 'en' ? 'Active programs' : 'Aktive Programme', value: '12' },
      { label: lang === 'en' ? 'Loss ratio' : 'Loss Ratio', value: '0.68' },
      { label: lang === 'en' ? 'Exceptions' : 'Ausnahmen', value: '5' },
      { label: lang === 'en' ? 'Exposure growth' : 'Exposure-Wachstum', value: '3.4%' }
    ],
    sections: [
      {
        id: 'signals',
        title: lang === 'en' ? 'Portfolio signals' : 'Portfolio-Signale',
        body: lang === 'en'
          ? 'Focus on concentration and corridor drift.'
          : 'Fokus auf Konzentration und Korridor-Drift.',
        kpis: [
          { label: lang === 'en' ? 'Concentration alerts' : 'Konzentrations-Alerts', value: '2' },
          { label: lang === 'en' ? 'Corridor drift' : 'Korridor-Drift', value: '1' },
          { label: lang === 'en' ? 'Model exceptions' : 'Modell-Ausnahmen', value: '3' }
        ],
        cards: [
          {
            title: lang === 'en' ? 'Segment watchlist' : 'Segment-Watchlist',
            body: lang === 'en'
              ? 'Logistics mid-size carriers show elevated severity.'
              : 'Logistik-Mittelstand zeigt erhohte Severity.'
          },
          {
            title: lang === 'en' ? 'Limit utilization' : 'Limit-Auslastung',
            body: lang === 'en'
              ? 'Top 5 accounts at 82% average utilization.'
              : 'Top 5 Accounts bei 82% Auslastung im Schnitt.'
          },
          {
            title: lang === 'en' ? 'Exception summary' : 'Ausnahmen-Ubersicht',
            body: lang === 'en'
              ? '5 open exceptions across three programs.'
              : '5 offene Ausnahmen uber drei Programme.'
          }
        ]
      }
    ]
  }

  return <InsuranceDashboardDetail {...copy} />
}
