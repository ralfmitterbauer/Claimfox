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

const aiItemKeys = ['item1', 'item2', 'item3', 'item4', 'item5', 'item6'] as const
const probabilityItemKeys = new Set(['item1', 'item3', 'item5'])

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

const GLASS_TEXT = '#0e0d1c'
const GLASS_SUBTLE = '#64748b'

export default function BrokerCrmPage() {
  const { t } = useI18n()

  const maxRevenue = Math.max(...revenueData.map((entry) => Math.max(entry.current, entry.previous)))
  const maxLeads = Math.max(...leadsData.map((entry) => entry.value))

  function getPotentialStyles(label: string) {
    const normalized = label.toLowerCase()
    if (['hoch', 'high'].includes(normalized)) {
      return {
        background: '#16A34A',
        color: '#ffffff',
        border: '2px solid #15803D'
      }
    }
    if (['mittel', 'medium'].includes(normalized)) {
      return {
        background: '#F97316',
        color: '#ffffff',
        border: '2px solid #EA580C'
      }
    }
    if (['gering', 'low'].includes(normalized)) {
      return {
        background: '#DC2626',
        color: '#ffffff',
        border: '2px solid #B91C1C'
      }
    }
    return {
      background: '#64748B',
      color: '#ffffff',
      border: '2px solid #475569'
    }
  }

  return (
    <section className="page" style={{ gap: '1.5rem' }}>
        <div
          style={{
            width: '100%',
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem'
          }}
        >
      <Header
        title={t('brokerCrm.title')}
        subtitle={t('brokerCrm.subtitle')}
        titleColor="#0e0d1c"
        subtitleColor="#65748b"
      />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '1rem'
        }}
      >
        {kpiData.map((item) => (
          <Card key={item.key} variant="glass">
            <p style={{ margin: 0, color: GLASS_TEXT, fontSize: '0.95rem' }}>{t(`brokerCrm.kpi.${item.key}`)}</p>
            <div style={{ marginTop: '0.5rem', fontSize: '2rem', fontWeight: 700, color: '#0e0d1c' }}>{item.value}</div>
            <span style={{ color: '#16A34A', fontWeight: 600 }}>{item.trend}</span>
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
        <Card variant="glass" title={t('brokerCrm.charts.revenueTitle')} subtitle={t('brokerCrm.charts.revenueSubtitle')}>
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.5rem', color: GLASS_TEXT, fontSize: '0.9rem' }}>
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
                <small style={{ color: GLASS_SUBTLE }}>{entry.label}</small>
              </div>
            ))}
          </div>
        </Card>
        <Card variant="glass" title={t('brokerCrm.charts.leadsTitle')} subtitle={t('brokerCrm.charts.leadsSubtitle')}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {leadsData.map((entry) => (
              <div key={entry.key} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ width: '120px', color: GLASS_TEXT, fontSize: '0.95rem' }}>
                  {t(`brokerCrm.charts.leadsLegend${entry.key.charAt(0).toUpperCase()}${entry.key.slice(1)}`)}
                </span>
                <div
                  style={{
                    flex: 1,
                    height: '12px',
                    borderRadius: '999px',
                    background: '#e2e8f0',
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
                <strong style={{ color: '#0e0d1c' }}>{entry.value}</strong>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card variant="glass" title={t('brokerCrm.ai.title')} subtitle={t('brokerCrm.ai.subtitle')}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.1rem'
          }}
        >
          {aiItemKeys.map((key) => (
            <div
              key={key}
              style={{
                padding: '1rem 1.25rem',
                borderRadius: '18px',
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                boxShadow: '0 8px 20px rgba(15, 23, 42, 0.08)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '160px',
                gap: '0.45rem'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.75rem' }}>
                <div style={{ minWidth: 0 }}>
                  <p style={{ margin: 0, fontWeight: 600, color: '#0e0d1c', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {t(`brokerCrm.ai.items.${key}.name`)}
                  </p>
                </div>
                <span
                  style={{
                    padding: '0.2rem 0.55rem',
                    borderRadius: '999px',
                    background: probabilityItemKeys.has(key) ? '#dcfce7' : '#ede9fe',
                    color: probabilityItemKeys.has(key) ? '#15803d' : '#6d28d9',
                    fontWeight: 600,
                    fontSize: '0.85rem',
                    whiteSpace: 'nowrap',
                    maxWidth: '150px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    textAlign: 'right'
                  }}
                >
                  {t(`brokerCrm.ai.items.${key}.value`)}
                </span>
              </div>
              <small style={{ color: GLASS_SUBTLE, textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: '0.75rem' }}>
                {t(`brokerCrm.ai.items.${key}.type`)}
              </small>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem', color: GLASS_SUBTLE, marginTop: '0.25rem' }}>
                <span style={{ fontSize: '0.75rem', letterSpacing: '0.06em', textTransform: 'uppercase', color: '#94a3b8' }}>
                  {t('brokerCrm.ai.labels.recommendation')}
                </span>
                <strong
                  style={{
                    color: '#0e0d1c',
                    fontSize: '0.95rem',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}
                >
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
        <Card variant="glass" title={t('brokerCrm.table.title')}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', color: '#0e0d1c' }}>
              <thead>
                <tr style={{ textAlign: 'left', color: '#94a3b8', fontSize: '0.9rem', background: '#f8fafc' }}>
                  <th style={{ padding: '0.6rem 0.4rem' }}>{t('brokerCrm.table.name')}</th>
                  <th style={{ padding: '0.6rem 0.4rem' }}>{t('brokerCrm.table.status')}</th>
                  <th style={{ padding: '0.6rem 0.4rem' }}>{t('brokerCrm.table.lastContact')}</th>
                  <th style={{ padding: '0.6rem 0.4rem' }}>{t('brokerCrm.table.potential')}</th>
                  <th style={{ padding: '0.6rem 0.4rem' }}>{t('brokerCrm.table.nextStep')}</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer, index) => (
                  <tr
                    key={customer.name}
                    style={{
                      borderTop: index === 0 ? 'none' : '1px solid #e2e8f0'
                    }}
                  >
                    <td style={{ padding: '0.75rem 0.4rem', fontWeight: 600 }}>{customer.name}</td>
                    <td style={{ padding: '0.75rem 0.4rem', color: GLASS_TEXT }}>
                      {t(`brokerCrm.table.statusLabels.${customer.statusKey}`)}
                    </td>
                    <td style={{ padding: '0.75rem 0.4rem', color: GLASS_TEXT }}>{customer.lastContact}</td>
                    <td style={{ padding: '0.75rem 0.4rem' }}>
                      <span
                        style={{
                          borderRadius: '999px',
                          padding: '0.3rem 0.5rem',
                          fontSize: '0.8rem',
                          fontWeight: 700,
                          whiteSpace: 'nowrap',
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          textAlign: 'center',
                          lineHeight: 1,
                          width: '58px',
                          ...getPotentialStyles(t(`brokerCrm.table.potentialLabels.${customer.potentialKey}`))
                        }}
                      >
                        {t(`brokerCrm.table.potentialLabels.${customer.potentialKey}`)}
                      </span>
                    </td>
                    <td style={{ padding: '0.75rem 0.4rem', color: '#0e0d1c' }}>
                      {t(`brokerCrm.table.nextSteps.${customer.nextStepKey}`)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
        <Card variant="glass" title={t('brokerCrm.activities.title')}>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {activityKeys.map((key) => (
              <li
                key={key}
                style={{
                  padding: '0.75rem 0.85rem',
                  borderRadius: '14px',
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  color: '#0e0d1c',
                  fontWeight: 500,
                  boxShadow: '0 6px 18px rgba(15, 23, 42, 0.08)'
                }}
              >
                {t(`brokerCrm.activities.${key}`)}
              </li>
            ))}
          </ul>
        </Card>
      </div>
        </div>
      </section>
  )
}
