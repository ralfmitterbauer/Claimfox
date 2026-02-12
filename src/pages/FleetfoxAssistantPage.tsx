import { useEffect, useMemo, useState } from 'react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import FleetfoxLayout from '@/fleetfox/components/FleetfoxLayout'
import FleetAIExplanationCard from '@/fleetfox/components/FleetAIExplanationCard'
import { useI18n } from '@/i18n/I18nContext'
import { useTenantContext } from '@/brokerfox/hooks/useTenantContext'
import { addTimelineEvent, listMaintenance, listRoutes, listVehicles, listVisionEvents } from '@/fleetfox/api/fleetfoxApi'
import {
  findCriticalVehicles,
  routeRiskSummary,
  simulateTrainingPremiumReduction
} from '@/fleetfox/components/FleetRiskEngine'
import type { FleetAssistantInsight, MaintenancePrediction, RoutePlan, Vehicle, VisionEvent } from '@/fleetfox/types'

export default function FleetfoxAssistantPage() {
  const { t } = useI18n()
  const ctx = useTenantContext()
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [maintenance, setMaintenance] = useState<MaintenancePrediction[]>([])
  const [visionEvents, setVisionEvents] = useState<VisionEvent[]>([])
  const [routes, setRoutes] = useState<RoutePlan[]>([])
  const [insight, setInsight] = useState<FleetAssistantInsight | null>(null)

  useEffect(() => {
    let mounted = true
    async function load() {
      const [vehicleData, maintenanceData, visionData, routeData] = await Promise.all([
        listVehicles(ctx),
        listMaintenance(ctx),
        listVisionEvents(ctx),
        listRoutes(ctx)
      ])
      if (!mounted) return
      setVehicles(vehicleData)
      setMaintenance(maintenanceData)
      setVisionEvents(visionData)
      setRoutes(routeData)
    }
    load()
    return () => { mounted = false }
  }, [ctx])

  const maintenanceByVehicle = useMemo(
    () => new Map(maintenance.map((item) => [item.vehicleId, item])),
    [maintenance]
  )

  const visionByVehicle = useMemo(() => {
    const map = new Map<string, VisionEvent[]>()
    visionEvents.forEach((event) => {
      const list = map.get(event.vehicleId) ?? []
      list.push(event)
      map.set(event.vehicleId, list)
    })
    return map
  }, [visionEvents])

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
            <Button size="sm" onClick={() => applyInsight(findCriticalVehicles(vehicles, maintenanceByVehicle, visionByVehicle), t('fleetfox.assistant.findCritical'))}>
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
                const weatherRisk = routes.reduce((acc, route) => acc + Number(route.evidence[1]?.replace(/[^0-9]/g, '') || '0'), 0) / Math.max(routes.length, 1)
                const trafficRisk = routes.reduce((acc, route) => acc + Number(route.evidence[0]?.replace(/[^0-9]/g, '') || '0'), 0) / Math.max(routes.length, 1)
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
