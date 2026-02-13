import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '@/components/ui/Card'
import AifoxLayout from '@/aifox/components/AifoxLayout'
import { useI18n } from '@/i18n/I18nContext'
import { useTenantContext } from '@/brokerfox/hooks/useTenantContext'
import { listClaims, listDecisions, listFraudAlerts } from '@/aifox/api/aifoxApi'
import type { AifoxClaim, AifoxDecision, AifoxFraudAlert } from '@/aifox/types'
import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const moduleCards = [
  { key: 'claimsVision', route: '/aifox/claims-vision' },
  { key: 'fraud', route: '/aifox/fraud' },
  { key: 'risk', route: '/aifox/risk' },
  { key: 'documentAi', route: '/aifox/document-ai' },
  { key: 'chatbot', route: '/aifox/chatbot' },
  { key: 'governance', route: '/aifox/governance' },
  { key: 'monitoring', route: '/aifox/monitoring' },
  { key: 'integrations', route: '/aifox/integrations' },
  { key: 'audit', route: '/aifox/audit' }
]

function isAutoProcessedDecision(value: string) {
  const normalized = value.trim().toLowerCase()
  return (
    normalized === 'auto-approve' ||
    normalized === 'auto approve' ||
    normalized === 'auto approved' ||
    normalized === 'automatisch freigeben' ||
    normalized === 'automatisch freigegeben'
  )
}

function localizeLineOfBusiness(value: string, lang: 'de' | 'en') {
  if (lang === 'en') return value
  if (value === 'Motor Fleet') return 'Kfz-Flotte'
  if (value === 'Cargo & Logistics') return 'Transport & Logistik'
  if (value === 'Property All Risk') return 'Allgefahren Sach'
  if (value === 'General Liability') return 'Betriebshaftpflicht'
  if (value === 'Cyber') return 'Cyber'
  return value
}

function localizeSeverity(value: string, lang: 'de' | 'en') {
  if (lang === 'de') {
    if (value === 'low') return 'Niedrig'
    if (value === 'medium') return 'Mittel'
    if (value === 'high') return 'Hoch'
  }
  if (value === 'low') return 'Low'
  if (value === 'medium') return 'Medium'
  if (value === 'high') return 'High'
  return value
}

export default function AifoxDashboardPage() {
  const { t, lang } = useI18n()
  const ctx = useTenantContext()
  const navigate = useNavigate()
  const [claims, setClaims] = useState<AifoxClaim[]>([])
  const [fraud, setFraud] = useState<AifoxFraudAlert[]>([])
  const [decisions, setDecisions] = useState<AifoxDecision[]>([])

  useEffect(() => {
    let mounted = true
    async function load() {
      const [claimsData, fraudData, decisionsData] = await Promise.all([
        listClaims(ctx),
        listFraudAlerts(ctx),
        listDecisions(ctx)
      ])
      if (!mounted) return
      setClaims(claimsData)
      setFraud(fraudData)
      setDecisions(decisionsData)
    }
    load()
    return () => { mounted = false }
  }, [ctx])

  const avgConfidence = useMemo(() => {
    if (decisions.length === 0) return 0
    return Math.round((decisions.reduce((sum, item) => sum + item.confidence, 0) / decisions.length) * 100)
  }, [decisions])

  const kpis = [
    { label: t('aifox.dashboard.kpi.autoProcessed'), value: decisions.filter((d) => isAutoProcessedDecision(d.decision)).length },
    { label: t('aifox.dashboard.kpi.fraudAlerts'), value: fraud.length },
    { label: t('aifox.dashboard.kpi.avgConfidence'), value: `${avgConfidence}%` },
    { label: t('aifox.dashboard.kpi.modelDrift'), value: t('aifox.dashboard.kpi.modelDriftValue') },
    { label: t('aifox.dashboard.kpi.aiActRisk'), value: t('aifox.dashboard.kpi.aiActValue') }
  ]

  const performanceSeries = useMemo(() => {
    const months = lang === 'de' ? ['Okt', 'Nov', 'Dez', 'Jan', 'Feb'] : ['Oct', 'Nov', 'Dec', 'Jan', 'Feb']
    return [
      { month: months[0], score: 78 },
      { month: months[1], score: 81 },
      { month: months[2], score: 83 },
      { month: months[3], score: 85 },
      { month: months[4], score: 87 }
    ]
  }, [lang])

  const fraudHeatSeries = useMemo(() => ([
    { name: lang === 'de' ? 'Nord' : 'North', value: 28 },
    { name: lang === 'de' ? 'West' : 'West', value: 24 },
    { name: lang === 'de' ? 'Süd' : 'South', value: 31 },
    { name: lang === 'de' ? 'Ost' : 'East', value: 17 }
  ]), [lang])

  return (
    <AifoxLayout title={t('aifox.dashboard.title')} subtitle={t('aifox.dashboard.subtitle')}>
      <div style={{ display: 'grid', gap: '1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
          {kpis.map((kpi) => (
            <Card key={kpi.label} style={{ padding: '1rem', display: 'grid', gap: '0.35rem' }}>
              <span style={{ fontSize: '0.85rem', color: '#64748b' }}>{kpi.label}</span>
              <span style={{ fontSize: '1.6rem', fontWeight: 700 }}>{kpi.value}</span>
            </Card>
          ))}
        </div>
        <Card title={t('aifox.dashboard.modulesTitle')} subtitle={t('aifox.dashboard.modulesSubtitle')}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
            {moduleCards.map((card) => (
              <button
                key={card.key}
                type="button"
                onClick={() => navigate(card.route)}
                style={{
                  border: '1px solid #e2e8f0',
                  borderRadius: 12,
                  padding: '0.85rem 1rem',
                  background: '#fff',
                  textAlign: 'left',
                  cursor: 'pointer'
                }}
              >
                <div style={{ fontWeight: 600 }}>{t(`aifox.nav.${card.key}`)}</div>
                <div style={{ fontSize: '0.85rem', color: '#64748b' }}>{t(`aifox.dashboard.modules.${card.key}`)}</div>
              </button>
            ))}
          </div>
        </Card>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
          <Card title={t('aifox.dashboard.performanceTitle')} subtitle={t('aifox.dashboard.performanceSubtitle')}>
            <div style={{ height: 180 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={performanceSeries}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" />
                  <YAxis domain={[70, 95]} />
                  <Tooltip />
                  <Bar dataKey="score" fill="#d4380d" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
          <Card title={t('aifox.dashboard.heatmapTitle')} subtitle={t('aifox.dashboard.heatmapSubtitle')}>
            <div style={{ height: 180 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={fraudHeatSeries} dataKey="value" nameKey="name" innerRadius={34} outerRadius={62}>
                    {fraudHeatSeries.map((entry) => (
                      <Cell
                        key={entry.name}
                        fill={entry.value > 29 ? '#d4380d' : entry.value > 22 ? '#f97316' : '#94a3b8'}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
          <Card title={t('aifox.dashboard.riskTitle')} subtitle={t('aifox.dashboard.riskSubtitle')}>
            <div style={{ display: 'grid', gap: '0.5rem' }}>
              {claims.slice(0, 3).map((claim) => (
                <div key={claim.id} style={{ display: 'flex', justifyContent: 'space-between', gap: '0.5rem' }}>
                  <span style={{ fontWeight: 600 }}>{localizeLineOfBusiness(claim.lineOfBusiness, lang)}</span>
                  <span style={{ color: '#64748b' }}>{localizeSeverity(claim.severity, lang)}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </AifoxLayout>
  )
}
