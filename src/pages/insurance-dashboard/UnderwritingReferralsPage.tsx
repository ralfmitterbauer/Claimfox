import React from 'react'
import { useI18n } from '@/i18n/I18nContext'
import InsuranceDashboardDetail from '@/pages/insurance-dashboard/InsuranceDashboardDetail'

export default function UnderwritingReferralsPage() {
  const { lang } = useI18n()

  const copy = {
    kicker: lang === 'en' ? 'Insurance dashboard' : 'Versicherungs-Dashboard',
    title: lang === 'en' ? 'Underwriting: referrals & approvals' : 'Underwriting: Freigaben & Entscheidungen',
    subtitle: lang === 'en'
      ? 'Exceptions and approval routing.'
      : 'Ausnahmen und Freigaberouting.',
    backLabel: lang === 'en' ? 'Back to dashboard' : 'Zuruck zum Dashboard',
    backRoute: '/insurance-dashboard',
    kpis: [
      { label: lang === 'en' ? 'Open referrals' : 'Offene Freigaben', value: '9' },
      { label: lang === 'en' ? 'Awaiting documents' : 'Warten auf Dokumente', value: '4' },
      { label: lang === 'en' ? 'Escalations' : 'Eskalationen', value: '2' },
      { label: lang === 'en' ? 'SLA breaches' : 'SLA-Verstosse', value: '1' }
    ],
    sections: [
      {
        id: 'referrals',
        title: lang === 'en' ? 'Referral backlog' : 'Freigabe-Backlog',
        body: lang === 'en'
          ? 'Approvals grouped by authority and threshold.'
          : 'Freigaben nach Autoritat und Schwelle.',
        kpis: [
          { label: lang === 'en' ? 'Junior UW' : 'Junior UW', value: '3' },
          { label: lang === 'en' ? 'Senior UW' : 'Senior UW', value: '4' },
          { label: lang === 'en' ? 'Carrier authority' : 'Carrier Authority', value: '2' }
        ],
        cards: [
          {
            title: lang === 'en' ? 'Top referral reasons' : 'Top-Grunde',
            body: lang === 'en'
              ? 'Limit exceed, evidence gaps, portfolio exposure.'
              : 'Limit-Uberschreitung, Evidenzlucken, Portfolio-Exposure.'
          },
          {
            title: lang === 'en' ? 'Decision turn-around' : 'Entscheidungszeit',
            body: lang === 'en'
              ? 'Median 1.6 days; 2 cases above SLA.'
              : 'Median 1.6 Tage; 2 Falle uber SLA.'
          },
          {
            title: lang === 'en' ? 'Pending approvals' : 'Offene Freigaben',
            body: lang === 'en'
              ? '4 approvals pending due to missing documents.'
              : '4 Freigaben offen wegen fehlender Dokumente.'
          }
        ]
      }
    ]
  }

  return <InsuranceDashboardDetail {...copy} />
}
