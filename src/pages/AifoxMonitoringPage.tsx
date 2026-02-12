import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import AifoxLayout from '@/aifox/components/AifoxLayout'
import { useI18n } from '@/i18n/I18nContext'
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

export default function AifoxMonitoringPage() {
  const { t } = useI18n()
  const accuracySeries = [
    { week: 'W1', value: 0.84 },
    { week: 'W2', value: 0.86 },
    { week: 'W3', value: 0.87 },
    { week: 'W4', value: 0.88 }
  ]
  const driftSeries = [
    { week: 'W1', value: 0.08 },
    { week: 'W2', value: 0.11 },
    { week: 'W3', value: 0.13 },
    { week: 'W4', value: 0.17 }
  ]
  const biasSeries = [
    { region: 'DE-N', value: 2.2 },
    { region: 'DE-S', value: 1.7 },
    { region: 'EU-W', value: 2.8 },
    { region: 'US-M', value: 2.1 }
  ]

  return (
    <AifoxLayout title={t('aifox.monitoring.title')} subtitle={t('aifox.monitoring.subtitle')}>
      <div style={{ display: 'grid', gap: '1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
          <Card title={t('aifox.monitoring.accuracyTitle')} subtitle={t('aifox.monitoring.accuracySubtitle')}>
            <div style={{ height: 170 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={accuracySeries}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="week" />
                  <YAxis domain={[0.8, 0.9]} />
                  <Tooltip />
                  <Line dataKey="value" stroke="#d4380d" strokeWidth={2} dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
          <Card title={t('aifox.monitoring.driftTitle')} subtitle={t('aifox.monitoring.driftSubtitle')}>
            <div style={{ height: 170 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={driftSeries}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="week" />
                  <YAxis domain={[0, 0.2]} />
                  <Tooltip />
                  <Line dataKey="value" stroke="#b91c1c" strokeWidth={2} dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
          <Card title={t('aifox.monitoring.biasTitle')} subtitle={t('aifox.monitoring.biasSubtitle')}>
            <div style={{ height: 170 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={biasSeries}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="region" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#475569" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
        <Card title={t('aifox.monitoring.alertTitle')} subtitle={t('aifox.monitoring.alertSubtitle')}>
          <div style={{ display: 'grid', gap: '0.5rem' }}>
            <div style={{ color: '#b91c1c', fontWeight: 600 }}>{t('aifox.monitoring.alertMessage')}</div>
            <div style={{ color: '#64748b' }}>{t('aifox.monitoring.retrainHint')}</div>
            <Button size="sm">{t('aifox.monitoring.retrain')}</Button>
          </div>
        </Card>
      </div>
    </AifoxLayout>
  )
}
