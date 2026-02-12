import { useEffect, useMemo, useState } from 'react'
import Card from '@/components/ui/Card'
import FleetfoxLayout from '@/fleetfox/components/FleetfoxLayout'
import { useI18n } from '@/i18n/I18nContext'
import { useTenantContext } from '@/brokerfox/hooks/useTenantContext'
import { addTimelineEvent, listRoutes } from '@/fleetfox/api/fleetfoxApi'
import type { Route } from '@/fleetfox/types'

export default function FleetfoxRoutesPage() {
  const { t } = useI18n()
  const ctx = useTenantContext()
  const [routes, setRoutes] = useState<Route[]>([])
  const [query, setQuery] = useState('')

  useEffect(() => {
    let mounted = true
    async function load() {
      const data = await listRoutes(ctx)
      if (!mounted) return
      setRoutes(data)
    }
    load()
    return () => { mounted = false }
  }, [ctx])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return routes
    return routes.filter((route) => `${route.startAddress} ${route.endAddress}`.toLowerCase().includes(q))
  }, [query, routes])

  async function acceptSuggestion(route: Route) {
    await addTimelineEvent(ctx, {
      entityType: 'route',
      entityId: route.id,
      type: 'status',
      title: 'Route optimization accepted',
      message: `${route.startAddress} -> ${route.endAddress} deviation ${route.deviationPercent}%`,
      meta: { actor: ctx.userId }
    })
  }

  return (
    <FleetfoxLayout title={t('fleetfox.routes.title')} subtitle={t('fleetfox.routes.subtitle')}>
      <Card>
        <div style={{ display: 'grid', gap: '0.8rem' }}>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={t('fleetfox.routes.search')}
            style={{ padding: '0.5rem 0.65rem', borderRadius: 10, border: '1px solid #e2e8f0', maxWidth: 320 }}
          />

          <div style={{ display: 'grid', gap: '0.55rem' }}>
            {filtered.map((route) => (
              <div key={route.id} style={{ border: '1px solid #e2e8f0', borderRadius: 12, padding: '0.75rem 0.85rem', display: 'grid', gap: '0.3rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.65rem' }}>
                  <strong>{route.startAddress}{' -> '}{route.endAddress}</strong>
                  <span style={{ color: '#64748b', fontSize: '0.84rem' }}>{t('fleetfox.routes.risk')}: {route.riskScore}</span>
                </div>
                <div style={{ color: '#475569', fontSize: '0.9rem' }}>{t('fleetfox.routes.eta')}: {route.actualDurationMin} / {route.plannedDurationMin} min</div>
                <div style={{ color: '#64748b', fontSize: '0.82rem' }}>Deviation {route.deviationPercent}% · {route.delayReason}</div>
                <button type="button" onClick={() => acceptSuggestion(route)} style={{ border: '1px solid #d9d9d9', borderRadius: 999, background: '#fff', padding: '0.3rem 0.7rem', width: 'fit-content', cursor: 'pointer' }}>
                  {t('fleetfox.routes.accept')}
                </button>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </FleetfoxLayout>
  )
}
