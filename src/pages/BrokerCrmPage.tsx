import React from 'react'
import Card from '@/components/ui/Card'
import Header from '@/components/ui/Header'
import { useI18n } from '@/i18n/I18nContext'

const kpiData = [
  { key: 'activeCustomers', value: '248', trend: '+12%' },
  { key: 'openLeads', value: '63', trend: '+8%' },
  { key: 'dealsMonth', value: '27', trend: '+5%' },
  { key: 'premiumVolume', value: '€ 4.2 Mio', trend: '+16%' }
] as const

const revenueData = [
  { label: 'Jan', current: 180, previous: 150 },
  { label: 'Feb', current: 210, previous: 170 },
  { label: 'Mar', current: 240, previous: 190 },
  { label: 'Apr', current: 220, previous: 200 },
  { label: 'May', current: 260, previous: 210 },
  { label: 'Jun', current: 280, previous: 230 }
]

const leadsData = [
  { key: 'open', value: 58 },
  { key: 'won', value: 32 },
  { key: 'lost', value: 14 }
] as const

const aiItemKeys = ['item1', 'item2', 'item3', 'item4'] as const
const probabilityItemKeys = new Set(['item1', 'item3'])

const customers = [
  { name: 'Müller Versicherungsservice', statusKey: 'prospect', lastContact: '12.02.2025', potentialKey: 'high', nextStepKey: 'proposal' },
  { name: 'Atlas Maklerwerk', statusKey: 'active', lastContact: '11.02.2025', potentialKey: 'medium', nextStepKey: 'meeting' },
  { name: 'FleetSecure GmbH', statusKey: 'onboarding', lastContact: '09.02.2025', potentialKey: 'high', nextStepKey: 'onboarding' },
  { name: 'Contora Finanz', statusKey: 'prospect', lastContact: '08.02.2025', potentialKey: 'medium', nextStepKey: 'call' },
  { name: 'Nordlicht Broker', statusKey: 'active', lastContact: '05.02.2025', potentialKey: 'high', nextStepKey: 'renewal' },
  { name: 'Südpol Advisory', statusKey: 'dormant', lastContact: '30.01.2025', potentialKey: 'low', nextStepKey: 'call' },
  { name: 'Helix Partners', statusKey: 'prospect', lastContact: '28.01.2025', potentialKey: 'medium', nextStepKey: 'proposal' },
  { name: 'Urbania Risk', statusKey: 'active', lastContact: '26.01.2025', potentialKey: 'high', nextStepKey: 'meeting' }
]

const activityKeys = ['followUp', 'proposal', 'documents', 'audit', 'training'] as const

export default function BrokerCrmPage() {
  const { t } = useI18n()

  const maxRevenue = Math.max(...revenueData.map((entry) => Math.max(entry.current, entry.previous)))
  const maxLeads = Math.max(...leadsData.map((entry) => entry.value))

  return (
    <section className="page" style={{ gap: '1.5rem' }}>
      <Header title={t('brokerCrm.title')} subtitle={t('brokerCrm.subtitle')} />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '1rem'
        }}
      >
        {kpiData.map((item) => (
          <Card key={item.key}>
            <p style={{ margin: 0, color: '#6f6c99', fontSize: '0.95rem' }}>{t(`brokerCrm.kpi.${item.key}`)}</p>
            <div style={{ marginTop: '0.5rem', fontSize: '2rem', fontWeight: 700, color: '#080064' }}>{item.value}</div>
            <span style={{ color: '#28a745', fontWeight: 600 }}>{item.trend}</span>
          </Card>
        ))}
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1rem'
        }}
      >
        <Card title={t('brokerCrm.charts.revenueTitle')} subtitle={t('brokerCrm.charts.revenueSubtitle')}>
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.5rem', color: '#6f6c99', fontSize: '0.9rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#7f3fff' }} />
              {t('brokerCrm.charts.revenueLegendCurrent')}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#cbb6ff' }} />
              {t('brokerCrm.charts.revenueLegendPrevious')}
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '1rem', height: '220px' }}>
            {revenueData.map((entry) => (
              <div key={entry.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.35rem', flex: 1 }}>
                <div style={{ display: 'flex', gap: '0.35rem', alignItems: 'flex-end', width: '100%', justifyContent: 'center' }}>
                  <span
                    style={{
                      width: '12px',
                      borderRadius: '12px',
                      background: '#7f3fff',
                      height: `${(entry.current / maxRevenue) * 160 + 20}px`
                    }}
                  />
                  <span
                    style={{
                      width: '12px',
                      borderRadius: '12px',
                      background: '#cbb6ff',
                      height: `${(entry.previous / maxRevenue) * 160 + 10}px`
                    }}
                  />
                </div>
                <small style={{ color: '#6f6c99' }}>{entry.label}</small>
              </div>
            ))}
          </div>
        </Card>
        <Card title={t('brokerCrm.charts.leadsTitle')} subtitle={t('brokerCrm.charts.leadsSubtitle')}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {leadsData.map((entry) => (
              <div key={entry.key} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ width: '120px', color: '#6f6c99', fontSize: '0.95rem' }}>
                  {t(`brokerCrm.charts.leadsLegend${entry.key.charAt(0).toUpperCase()}${entry.key.slice(1)}`)}
                </span>
                <div
                  style={{
                    flex: 1,
                    height: '12px',
                    borderRadius: '999px',
                    background: '#f0f0ff',
                    overflow: 'hidden'
                  }}
                >
                  <div
                    style={{
                      width: `${(entry.value / maxLeads) * 100}%`,
                      height: '100%',
                      background:
                        entry.key === 'open'
                          ? '#faca15'
                          : entry.key === 'won'
                          ? '#7f3fff'
                          : '#ff8a8a'
                    }}
                  />
                </div>
                <strong style={{ color: '#080064' }}>{entry.value}</strong>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card title={t('brokerCrm.ai.title')} subtitle={t('brokerCrm.ai.subtitle')}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1rem'
          }}
        >
          {aiItemKeys.map((key) => (
            <div
              key={key}
              style={{
                padding: '1rem 1.2rem',
                borderRadius: '16px',
                border: '1px solid #eceafd',
                background: '#fdfdff',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.4rem'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem' }}>
                <div>
                  <p style={{ margin: 0, fontWeight: 600, color: '#080064' }}>{t(`brokerCrm.ai.items.${key}.name`)}</p>
                  <small style={{ color: '#6f6c99' }}>{t(`brokerCrm.ai.items.${key}.type`)}</small>
                </div>
                <span
                  style={{
                    padding: '0.25rem 0.65rem',
                    borderRadius: '999px',
                    background: '#efe8ff',
                    color: '#5c30c5',
                    fontWeight: 600
                  }}
                >
                  <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginRight: '0.35rem' }}>
                    {probabilityItemKeys.has(key) ? t('brokerCrm.ai.labels.probability') : t('brokerCrm.ai.labels.volume')}
                  </span>
                  {t(`brokerCrm.ai.items.${key}.value`)}
                </span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem', color: '#6f6c99' }}>
                <span style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#a09dbf' }}>
                  {t('brokerCrm.ai.labels.recommendation')}
                </span>
                <strong style={{ color: '#080064', fontSize: '0.95rem' }}>
                  {t(`brokerCrm.ai.items.${key}.action`)}
                </strong>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(300px, 3fr) minmax(220px, 1fr)',
          gap: '1rem'
        }}
      >
        <Card title={t('brokerCrm.table.title')}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ textAlign: 'left', color: '#6f6c99', fontSize: '0.9rem' }}>
                  <th style={{ padding: '0.5rem 0.25rem' }}>{t('brokerCrm.table.name')}</th>
                  <th style={{ padding: '0.5rem 0.25rem' }}>{t('brokerCrm.table.status')}</th>
                  <th style={{ padding: '0.5rem 0.25rem' }}>{t('brokerCrm.table.lastContact')}</th>
                  <th style={{ padding: '0.5rem 0.25rem' }}>{t('brokerCrm.table.potential')}</th>
                  <th style={{ padding: '0.5rem 0.25rem' }}>{t('brokerCrm.table.nextStep')}</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer, index) => (
                  <tr key={customer.name} style={{ borderTop: index === 0 ? 'none' : '1px solid #f1f0ff' }}>
                    <td style={{ padding: '0.75rem 0.25rem', fontWeight: 600 }}>{customer.name}</td>
                    <td style={{ padding: '0.75rem 0.25rem', color: '#6f6c99' }}>
                      {t(`brokerCrm.table.statusLabels.${customer.statusKey}`)}
                    </td>
                    <td style={{ padding: '0.75rem 0.25rem', color: '#6f6c99' }}>{customer.lastContact}</td>
                    <td style={{ padding: '0.75rem 0.25rem' }}>
                      <span
                        style={{
                          background: '#f0f0ff',
                          color: '#080064',
                          borderRadius: '999px',
                          padding: '0.1rem 0.6rem',
                          fontSize: '0.85rem'
                        }}
                      >
                        {t(`brokerCrm.table.potentialLabels.${customer.potentialKey}`)}
                      </span>
                    </td>
                    <td style={{ padding: '0.75rem 0.25rem', color: '#080064' }}>
                      {t(`brokerCrm.table.nextSteps.${customer.nextStepKey}`)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
        <Card title={t('brokerCrm.activities.title')}>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {activityKeys.map((key) => (
              <li
                key={key}
                style={{
                  padding: '0.75rem 0.85rem',
                  borderRadius: '12px',
                  background: '#f8f8ff',
                  color: '#080064',
                  fontWeight: 500
                }}
              >
                {t(`brokerCrm.activities.${key}`)}
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </section>
  )
}
