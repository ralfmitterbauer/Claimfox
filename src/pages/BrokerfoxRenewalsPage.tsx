import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '@/components/ui/Card'
import BrokerfoxLayout from '@/brokerfox/components/BrokerfoxLayout'
import DemoUtilitiesPanel from '@/brokerfox/components/DemoUtilitiesPanel'
import { useI18n } from '@/i18n/I18nContext'
import { useTenantContext } from '@/brokerfox/hooks/useTenantContext'
import { listRenewals } from '@/brokerfox/api/brokerfoxApi'
import type { RenewalItem } from '@/brokerfox/types'
import { localizePolicyName } from '@/brokerfox/utils/localizeDemoValues'

export default function BrokerfoxRenewalsPage() {
  const { lang, t } = useI18n()
  const ctx = useTenantContext()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [renewals, setRenewals] = useState<RenewalItem[]>([])
  const locale = lang === 'de' ? 'de-DE' : 'en-US'

  useEffect(() => {
    let mounted = true
    async function load() {
      try {
        const data = await listRenewals(ctx)
        if (!mounted) return
        setRenewals(data)
        setLoading(false)
      } catch {
        if (!mounted) return
        setError(t('brokerfox.state.error'))
        setLoading(false)
      }
    }
    load()
    return () => { mounted = false }
  }, [ctx, t])

  const grouped = useMemo(() => {
    const groups: Record<string, RenewalItem[]> = { '30': [], '60': [], '90': [] }
    renewals.forEach((item) => {
      const days = Math.ceil((new Date(item.renewalDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
      if (days <= 30) groups['30'].push(item)
      else if (days <= 60) groups['60'].push(item)
      else groups['90'].push(item)
    })
    return groups
  }, [renewals])

  return (
    <section className="page" style={{ gap: '1.5rem' }}>
      <BrokerfoxLayout
        title={t('brokerfox.renewals.title')}
        subtitle={t('brokerfox.renewals.subtitle')}
        topLeft={<DemoUtilitiesPanel tenantId={ctx.tenantId} onTenantChange={() => navigate(0)} />}
      >
        {loading ? <p>{t('brokerfox.state.loading')}</p> : null}
        {error ? <p>{error}</p> : null}
        <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
          {(['30', '60', '90'] as const).map((bucket) => (
            <Card
              key={bucket}
              variant="glass"
              title={<span style={{ color: '#0f172a' }}>{t('brokerfox.renewals.bucket', { days: bucket })}</span>}
            >
              {grouped[bucket].length === 0 ? <p>{t('brokerfox.empty.noRenewals')}</p> : null}
              {grouped[bucket].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => navigate(`/brokerfox/renewals/${item.id}`)}
                  style={{ display: 'block', width: '100%', textAlign: 'left', padding: '0.5rem 0', border: 'none', background: 'transparent', color: '#0f172a' }}
                >
                  <strong>{localizePolicyName(item.policyName, lang) ?? item.policyName}</strong>
                  <div style={{ color: '#475569' }}>{new Date(item.renewalDate).toLocaleDateString(locale)}</div>
                </button>
              ))}
            </Card>
          ))}
        </div>
      </BrokerfoxLayout>
    </section>
  )
}
