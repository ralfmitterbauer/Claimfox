import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '@/components/ui/Card'
import UnderwriterfoxLayout from '@/underwriterfox/components/UnderwriterfoxLayout'
import CaseKpiCards from '@/underwriterfox/components/CaseKpiCards'
import { useI18n } from '@/i18n/I18nContext'
import { useTenantContext } from '@/brokerfox/hooks/useTenantContext'
import { listCases } from '@/underwriterfox/api/underwriterfoxApi'
import type { UnderwritingCase } from '@/underwriterfox/types'

export default function UnderwriterfoxDashboardPage() {
  const { t } = useI18n()
  const navigate = useNavigate()
  const tenant = useTenantContext()
  const ctx = { tenantId: tenant.tenantId, userId: tenant.userId }
  const [cases, setCases] = useState<UnderwritingCase[]>([])

  useEffect(() => {
    let mounted = true
    async function load() {
      const data = await listCases(ctx)
      if (!mounted) return
      setCases(data)
    }
    load()
    return () => { mounted = false }
  }, [ctx.tenantId])

  const totals = useMemo(() => {
    return cases.reduce((acc, item) => {
      acc[item.status] += 1
      return acc
    }, {
      intake: 0,
      screening: 0,
      manualReview: 0,
      offer: 0,
      bound: 0,
      declined: 0
    })
  }, [cases])

  const needsReview = useMemo(() => cases.filter((item) => item.status === 'manualReview' || item.status === 'screening').slice(0, 6), [cases])

  return (
    <section className="page" style={{ gap: '1.5rem' }}>
      <UnderwriterfoxLayout
        title={t('underwriterfox.dashboard.title')}
        subtitle={t('underwriterfox.dashboard.subtitle')}
      >
        <CaseKpiCards totals={totals} />
        <Card variant="glass" title={t('underwriterfox.dashboard.needsReview')}>
          {needsReview.length === 0 ? <p>{t('underwriterfox.dashboard.needsReviewEmpty')}</p> : null}
          <div style={{ display: 'grid', gap: '0.6rem' }}>
            {needsReview.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => navigate(`/underwriterfox/cases/${item.id}`)}
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', padding: '0.4rem 0', border: 'none', background: 'transparent', textAlign: 'left', color: '#0f172a' }}
              >
                <span>
                  <strong>{item.caseNumber}</strong> · {item.insured}
                </span>
                <span style={{ color: '#64748b' }}>{t(`underwriterfox.status.${item.status}`)}</span>
              </button>
            ))}
          </div>
        </Card>
      </UnderwriterfoxLayout>
    </section>
  )
}
