import React from 'react'
import { useI18n } from '@/i18n/I18nContext'
import InsuranceDashboardDetail from '@/pages/insurance-dashboard/InsuranceDashboardDetail'

export default function GovernanceAccessMandatesPage() {
  const { lang } = useI18n()

  const copy = {
    kicker: lang === 'en' ? 'Insurance dashboard' : 'Versicherungs-Dashboard',
    title: lang === 'en' ? 'Governance: access & mandates' : 'Governance: Zugriff & Mandate',
    subtitle: lang === 'en'
      ? 'Role-based access and mandate coverage.'
      : 'Rollenbasierter Zugriff und Mandatsabdeckung.',
    backLabel: lang === 'en' ? 'Back to dashboard' : 'Zuruck zum Dashboard',
    backRoute: '/insurance-dashboard',
    kpis: [
      { label: lang === 'en' ? 'Active mandates' : 'Aktive Mandate', value: '18' },
      { label: lang === 'en' ? 'Access reviews' : 'Access-Reviews', value: '2' },
      { label: lang === 'en' ? 'Privileged users' : 'Privilegierte Nutzer', value: '6' },
      { label: lang === 'en' ? 'Pending approvals' : 'Offene Freigaben', value: '3' }
    ],
    sections: [
      {
        id: 'access',
        title: lang === 'en' ? 'Access governance' : 'Zugriffs-Governance',
        body: lang === 'en'
          ? 'Monitor separation of duties and mandate scope.'
          : 'Monitoring von Aufgaben-Trennung und Mandatsumfang.',
        kpis: [
          { label: lang === 'en' ? 'SoD exceptions' : 'SoD-Ausnahmen', value: '1' },
          { label: lang === 'en' ? 'Role changes' : 'Rollenanderungen', value: '4' },
          { label: lang === 'en' ? 'Mandate updates' : 'Mandat-Updates', value: '2' }
        ],
        cards: [
          {
            title: lang === 'en' ? 'Access review schedule' : 'Access-Review-Plan',
            body: lang === 'en'
              ? 'Quarterly review cycle in progress.'
              : 'Quartalsweiser Review-Zyklus laeuft.'
          },
          {
            title: lang === 'en' ? 'Mandate coverage' : 'Mandatsabdeckung',
            body: lang === 'en'
              ? 'All active programs mapped to mandates.'
              : 'Alle aktiven Programme sind Mandaten zugeordnet.'
          },
          {
            title: lang === 'en' ? 'Privilege exceptions' : 'Privilege-Ausnahmen',
            body: lang === 'en'
              ? 'One temporary override pending review.'
              : 'Eine temporare Ausnahme wartet auf Prufung.'
          }
        ]
      }
    ]
  }

  return <InsuranceDashboardDetail {...copy} />
}
