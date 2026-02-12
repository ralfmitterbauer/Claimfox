import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import FleetfoxLayout from '@/fleetfox/components/FleetfoxLayout'
import FleetTimelineThread from '@/fleetfox/components/FleetTimelineThread'
import FleetAIExplanationCard from '@/fleetfox/components/FleetAIExplanationCard'
import { useI18n } from '@/i18n/I18nContext'
import { useTenantContext } from '@/brokerfox/hooks/useTenantContext'
import {
  addTimelineEvent,
  generateDownloadText,
  getVehicle,
  listDrivers,
  listMaintenance,
  listTimelineEvents,
  listVisionEvents,
  updateVehicleStatus
} from '@/fleetfox/api/fleetfoxApi'
import { buildInsuranceAssessment } from '@/fleetfox/components/FleetRiskEngine'
import type { Driver, MaintenancePrediction, TimelineEvent, Vehicle, VisionEvent } from '@/fleetfox/types'

function downloadText(filename: string, content: string, mime: string) {
  const blob = new Blob([content], { type: mime })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = filename
  document.body.appendChild(anchor)
  anchor.click()
  document.body.removeChild(anchor)
  URL.revokeObjectURL(url)
}

export default function FleetfoxVehicleDetailPage() {
  const { vehicleId } = useParams()
  const { t } = useI18n()
  const ctx = useTenantContext()
  const [vehicle, setVehicle] = useState<Vehicle | null>(null)
  const [drivers, setDrivers] = useState<Driver[]>([])
  const [maintenance, setMaintenance] = useState<MaintenancePrediction[]>([])
  const [visionEvents, setVisionEvents] = useState<VisionEvent[]>([])
  const [timeline, setTimeline] = useState<TimelineEvent[]>([])

  useEffect(() => {
    let mounted = true
    async function load() {
      if (!vehicleId) return
      const [vehicleData, driversData, maintenanceData, visionData, timelineData] = await Promise.all([
        getVehicle(ctx, vehicleId),
        listDrivers(ctx),
        listMaintenance(ctx),
        listVisionEvents(ctx),
        listTimelineEvents(ctx, 'vehicle', vehicleId)
      ])
      if (!mounted) return
      setVehicle(vehicleData)
      setDrivers(driversData)
      setMaintenance(maintenanceData)
      setVisionEvents(visionData)
      setTimeline(timelineData)
    }
    load()
    return () => { mounted = false }
  }, [ctx, vehicleId])

  const assignedDrivers = useMemo(() => {
    if (!vehicle) return []
    return drivers.filter((driver) => vehicle.assignedDriverIds.includes(driver.id))
  }, [drivers, vehicle])

  const relatedMaintenance = useMemo(
    () => maintenance.find((item) => item.vehicleId === vehicle?.id),
    [maintenance, vehicle]
  )

  const relatedVision = useMemo(
    () => visionEvents.filter((event) => event.vehicleId === vehicle?.id),
    [vehicle, visionEvents]
  )

  const insight = useMemo(() => {
    if (!vehicle) {
      return { title: '-', confidence: 0, bullets: [], evidenceRefs: [] }
    }
    return buildInsuranceAssessment(vehicle, relatedMaintenance, relatedVision, assignedDrivers[0]).explanation
  }, [assignedDrivers, relatedMaintenance, relatedVision, vehicle])

  async function refreshTimeline() {
    if (!vehicleId) return
    setTimeline(await listTimelineEvents(ctx, 'vehicle', vehicleId))
  }

  async function setStatus(status: Vehicle['status']) {
    if (!vehicleId) return
    const next = await updateVehicleStatus(ctx, vehicleId, status)
    if (next) setVehicle(next)
    refreshTimeline()
  }

  async function saveNote() {
    if (!vehicleId) return
    await addTimelineEvent(ctx, {
      entityType: 'vehicle',
      entityId: vehicleId,
      type: 'note',
      title: 'Manual note',
      message: 'Operator reviewed telematics trend and accepted AI recommendation.',
      meta: { actor: ctx.userId }
    })
    refreshTimeline()
  }

  async function handleDownload(kind: 'telematics' | 'risk') {
    if (!vehicleId) return
    const file = await generateDownloadText(ctx, kind, vehicleId)
    downloadText(file.filename, file.content, file.mime)
  }

  if (!vehicle) {
    return <FleetfoxLayout title={t('fleetfox.vehicleDetail.title')} subtitle={t('fleetfox.common.loading')}><Card>{t('fleetfox.common.loading')}</Card></FleetfoxLayout>
  }

  return (
    <FleetfoxLayout
      title={`${t('fleetfox.vehicleDetail.title')} ${vehicle.plate}`}
      subtitle={`${vehicle.region} · ${vehicle.type.toUpperCase()} · ${vehicle.vin}`}
      topLeft={<div style={{ color: '#fff', fontSize: '0.84rem' }}>{t('fleetfox.vehicleDetail.heroHint')}</div>}
    >
      <div style={{ display: 'grid', gap: '1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
          <Card style={{ padding: '1rem' }}><strong>{t('fleetfox.vehicleDetail.safety')}</strong><div>{vehicle.safetyScore}</div></Card>
          <Card style={{ padding: '1rem' }}><strong>{t('fleetfox.vehicleDetail.risk')}</strong><div>{vehicle.riskScore}</div></Card>
          <Card style={{ padding: '1rem' }}><strong>{t('fleetfox.vehicleDetail.odometer')}</strong><div>{vehicle.odometerKm.toLocaleString()} km</div></Card>
          <Card style={{ padding: '1rem' }}><strong>{t('fleetfox.vehicleDetail.nextService')}</strong><div>{vehicle.nextServiceDueKm.toLocaleString()} km</div></Card>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 0.8fr)', gap: '1.5rem' }}>
          <Card title={t('fleetfox.vehicleDetail.overviewTitle')}>
            <div style={{ display: 'grid', gap: '0.65rem' }}>
              <div>{t('fleetfox.vehicleDetail.assignedDrivers')}: {assignedDrivers.map((driver) => driver.name).join(', ') || '-'}</div>
              <div>{t('fleetfox.vehicleDetail.powertrain')}: {vehicle.powertrain}</div>
              <div>{t('fleetfox.vehicleDetail.tags')}: {vehicle.tags.join(', ')}</div>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <Button size="sm" onClick={() => setStatus('active')}>{t('fleetfox.vehicleDetail.activate')}</Button>
                <Button size="sm" variant="secondary" onClick={() => setStatus('maintenance')}>{t('fleetfox.vehicleDetail.toMaintenance')}</Button>
                <Button size="sm" variant="secondary" onClick={saveNote}>{t('fleetfox.vehicleDetail.addNote')}</Button>
              </div>
            </div>
          </Card>

          <FleetAIExplanationCard title={t('fleetfox.vehicleDetail.aiTitle')} subtitle={t('fleetfox.vehicleDetail.aiSubtitle')} insight={insight} />
        </div>

        <Card title={t('fleetfox.vehicleDetail.documentsTitle')} subtitle={t('fleetfox.vehicleDetail.documentsSubtitle')}>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <Button size="sm" onClick={() => handleDownload('telematics')}>{t('fleetfox.vehicleDetail.downloadTelematics')}</Button>
            <Button size="sm" variant="secondary" onClick={() => handleDownload('risk')}>{t('fleetfox.vehicleDetail.downloadRisk')}</Button>
            <a href="/demo-docs/fleetfox/fleet_readme.txt" target="_blank" rel="noreferrer" style={{ fontSize: '0.9rem', color: '#0f172a', alignSelf: 'center' }}>{t('fleetfox.vehicleDetail.openStaticDoc')}</a>
          </div>
        </Card>

        <Card title={t('fleetfox.vehicleDetail.timelineTitle')}>
          <FleetTimelineThread events={timeline} emptyLabel={t('fleetfox.vehicleDetail.timelineEmpty')} />
        </Card>
      </div>
    </FleetfoxLayout>
  )
}
