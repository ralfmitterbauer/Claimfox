import { useEffect, useMemo, useState } from 'react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import FleetfoxLayout from '@/fleetfox/components/FleetfoxLayout'
import FleetAIExplanationCard from '@/fleetfox/components/FleetAIExplanationCard'
import { useI18n } from '@/i18n/I18nContext'
import { useTenantContext } from '@/brokerfox/hooks/useTenantContext'
import { addTimelineEvent, listDrivers, listRoutes, listTelematicsSnapshots, listVehicles } from '@/fleetfox/api/fleetfoxApi'
import { findCriticalVehicles, routeRiskSummary, simulateTrainingPremiumReduction } from '@/fleetfox/ai/fleetRiskEngine'
import type { Driver, FleetAssistantInsight, Route, TelematicsSnapshot, Vehicle } from '@/fleetfox/types'

export default function FleetfoxAssistantPage() {
  const { t } = useI18n()
  const ctx = useTenantContext()
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [drivers, setDrivers] = useState<Driver[]>([])
  const [telematics, setTelematics] = useState<TelematicsSnapshot[]>([])
  const [routes, setRoutes] = useState<Route[]>([])
  const [insight, setInsight] = useState<FleetAssistantInsight | null>(null)

  useEffect(() => {
    let mounted = true
    async function load() {
      const [vehicleData, driverData, telematicsData, routeData] = await Promise.all([
        listVehicles(ctx),
        listDrivers(ctx),
        listTelematicsSnapshots(ctx),
        listRoutes(ctx)
      ])
      if (!mounted) return
      setVehicles(vehicleData)
      setDrivers(driverData)
      setTelematics(telematicsData)
      setRoutes(routeData)
    }
    load()
    return () => { mounted = false }
  }, [ctx])

  const driversByVehicleId = useMemo(() => {
    const map = new Map<string, Driver | undefined>()
    vehicles.forEach((vehicle) => {
      map.set(vehicle.id, drivers.find((driver) => driver.id === vehicle.assignedDriverId))
    })
    return map
  }, [drivers, vehicles])

  const telematicsByVehicleId = useMemo(() => {
    const map = new Map<string, TelematicsSnapshot[]>()
    telematics.forEach((row) => {
      const list = map.get(row.vehicleId) ?? []
      list.push(row)
      map.set(row.vehicleId, list)
    })
    return map
  }, [telematics])

  async function applyInsight(next: FleetAssistantInsight, title: string) {
    setInsight(next)
    await addTimelineEvent(ctx, {
      entityType: 'system',
      entityId: 'assistant',
      type: 'system',
      title,
      message: next.bullets.join(' | '),
      meta: { actor: ctx.userId }
    })
  }

  return (
    <FleetfoxLayout title={t('fleetfox.assistant.title')} subtitle={t('fleetfox.assistant.subtitle')}>
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 0.9fr) minmax(0, 1.1fr)', gap: '1.5rem' }}>
        <Card title={t('fleetfox.assistant.actionsTitle')}>
          <div style={{ display: 'grid', gap: '0.55rem' }}>
            <Button size="sm" onClick={() => applyInsight(findCriticalVehicles(vehicles, driversByVehicleId, telematicsByVehicleId), t('fleetfox.assistant.findCritical'))}>
              {t('fleetfox.assistant.findCritical')}
            </Button>
            <Button size="sm" variant="secondary" onClick={() => applyInsight(simulateTrainingPremiumReduction(vehicles), t('fleetfox.assistant.reducePremium'))}>
              {t('fleetfox.assistant.reducePremium')}
            </Button>
            <Button
              size="sm"
              variant="secondary"
              onClick={() => {
                const avgRouteRisk = routes.reduce((acc, route) => acc + route.riskScore, 0) / Math.max(routes.length, 1)
                const weatherRisk = Math.max(10, avgRouteRisk * 0.42)
                const trafficRisk = Math.max(15, avgRouteRisk * 0.55)
                applyInsight(routeRiskSummary(avgRouteRisk, weatherRisk, trafficRisk), t('fleetfox.assistant.routeSummary'))
              }}
            >
              {t('fleetfox.assistant.routeSummary')}
            </Button>
          </div>
        </Card>

        {insight ? (
          <FleetAIExplanationCard title={t('fleetfox.assistant.resultTitle')} subtitle={t('fleetfox.assistant.resultSubtitle')} insight={insight} />
        ) : (
          <Card title={t('fleetfox.assistant.resultTitle')} subtitle={t('fleetfox.assistant.resultSubtitle')}>
            <div style={{ color: '#64748b' }}>{t('fleetfox.assistant.empty')}</div>
          </Card>
        )}
      </div>
    </FleetfoxLayout>
  )
}
