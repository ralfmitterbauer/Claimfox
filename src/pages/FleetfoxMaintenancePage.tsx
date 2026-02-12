import { useEffect, useMemo, useState } from 'react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import FleetfoxLayout from '@/fleetfox/components/FleetfoxLayout'
import { useI18n } from '@/i18n/I18nContext'
import { useTenantContext } from '@/brokerfox/hooks/useTenantContext'
import { addTimelineEvent, listMaintenance, listVehicles } from '@/fleetfox/api/fleetfoxApi'
import type { MaintenancePrediction, Vehicle } from '@/fleetfox/types'

export default function FleetfoxMaintenancePage() {
  const { t } = useI18n()
  const ctx = useTenantContext()
  const [items, setItems] = useState<MaintenancePrediction[]>([])
  const [vehicles, setVehicles] = useState<Vehicle[]>([])

  useEffect(() => {
    let mounted = true
    async function load() {
      const [maintenanceData, vehicleData] = await Promise.all([listMaintenance(ctx), listVehicles(ctx)])
      if (!mounted) return
      setItems(maintenanceData)
      setVehicles(vehicleData)
    }
    load()
    return () => { mounted = false }
  }, [ctx])

  const sorted = useMemo(
    () => [...items].sort((a, b) => b.probability - a.probability),
    [items]
  )

  async function schedule(item: MaintenancePrediction) {
    await addTimelineEvent(ctx, {
      entityType: 'maintenance',
      entityId: item.id,
      type: 'status',
      title: 'Maintenance slot requested',
      message: `${item.predictedIssue} scheduled in ${item.dueInDays} days.`,
      meta: { actor: ctx.userId }
    })
  }

  return (
    <FleetfoxLayout title={t('fleetfox.maintenance.title')} subtitle={t('fleetfox.maintenance.subtitle')}>
      <Card>
        <div style={{ display: 'grid', gap: '0.65rem' }}>
          {sorted.map((item) => {
            const vehicle = vehicles.find((entry) => entry.id === item.vehicleId)
            return (
              <div key={item.id} style={{ border: '1px solid #e2e8f0', borderRadius: 12, padding: '0.75rem 0.8rem', display: 'grid', gap: '0.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <strong>{vehicle?.plate ?? item.vehicleId}</strong>
                  <span style={{ color: '#64748b', fontSize: '0.84rem' }}>{Math.round(item.probability * 100)}%</span>
                </div>
                <div style={{ color: '#475569' }}>{item.predictedIssue}</div>
                <div style={{ color: '#64748b', fontSize: '0.84rem' }}>{t('fleetfox.maintenance.cost')}: EUR {item.costEstimateEur.toLocaleString()} · {t('fleetfox.maintenance.due')}: {item.dueInDays}d</div>
                <Button size="sm" variant="secondary" onClick={() => schedule(item)}>{t('fleetfox.maintenance.schedule')}</Button>
              </div>
            )
          })}
        </div>
      </Card>
    </FleetfoxLayout>
  )
}
