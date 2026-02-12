import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import FleetfoxLayout from '@/fleetfox/components/FleetfoxLayout'
import FleetTimelineThread from '@/fleetfox/components/FleetTimelineThread'
import { useI18n } from '@/i18n/I18nContext'
import { useTenantContext } from '@/brokerfox/hooks/useTenantContext'
import {
  addTimelineEvent,
  generateDownloadText,
  getFleetCostSummary,
  getVehicle,
  listDrivers,
  listTelematicsSnapshots,
  listTimelineEvents,
  updateVehicleStatus
} from '@/fleetfox/api/fleetfoxApi'
import { evaluateVehicleRiskPanel, predictServiceDate } from '@/fleetfox/ai/fleetRiskEngine'
import type { Driver, FleetCostSummary, TelematicsSnapshot, TimelineEvent, Vehicle } from '@/fleetfox/types'

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
  const [telematics, setTelematics] = useState<TelematicsSnapshot[]>([])
  const [timeline, setTimeline] = useState<TimelineEvent[]>([])
  const [costSummary, setCostSummary] = useState<FleetCostSummary>({ fuelCost: 0, maintenanceCost: 0, insuranceCost: 0, totalCost: 0, costPerKm: 0 })

  useEffect(() => {
    let mounted = true
    async function load() {
      if (!vehicleId) return
      const [vehicleData, driversData, telematicsData, timelineData, costs] = await Promise.all([
        getVehicle(ctx, vehicleId),
        listDrivers(ctx),
        listTelematicsSnapshots(ctx, vehicleId),
        listTimelineEvents(ctx, 'vehicle', vehicleId),
        getFleetCostSummary(ctx)
      ])
      if (!mounted) return
      setVehicle(vehicleData)
      setDrivers(driversData)
      setTelematics(telematicsData)
      setTimeline(timelineData)
      setCostSummary(costs)
    }
    load()
    return () => { mounted = false }
  }, [ctx, vehicleId])

  const assignedDriver = useMemo(() => drivers.find((driver) => driver.id === vehicle?.assignedDriverId), [drivers, vehicle])

  const riskPanel = useMemo(() => {
    if (!vehicle) return null
    return evaluateVehicleRiskPanel(vehicle, assignedDriver, telematics)
  }, [assignedDriver, telematics, vehicle])

  const isServiceOverdue = Boolean(vehicle && vehicle.mileageKm > vehicle.nextServiceDueKm)

  async function refreshTimeline() {
    if (!vehicleId) return
    setTimeline(await listTimelineEvents(ctx, 'vehicle', vehicleId))
  }

  async function setStatus(status: Vehicle['status']) {
    if (!vehicleId) return
    const next = await updateVehicleStatus(ctx, vehicleId, status)
    if (next) setVehicle(next)
    await refreshTimeline()
  }

  async function saveNote() {
    if (!vehicleId) return
    await addTimelineEvent(ctx, {
      entityType: 'vehicle',
      entityId: vehicleId,
      type: 'note',
      title: 'Manual note',
      message: 'Operator reviewed telematics timeline and accepted AI recommendation.',
      meta: { actor: ctx.userId }
    })
    await refreshTimeline()
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
      title={`${t('fleetfox.vehicleDetail.title')} ${vehicle.licensePlate}`}
      subtitle={`${vehicle.manufacturer} ${vehicle.model} · ${vehicle.vin}`}
      topLeft={<div style={{ color: '#fff', fontSize: '0.84rem' }}>{t('fleetfox.vehicleDetail.heroHint')}</div>}
    >
      <div style={{ display: 'grid', gap: '1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '1rem' }}>
          <Card style={{ padding: '1rem' }}><strong>{t('fleetfox.vehicleDetail.vin')}</strong><div style={{ fontSize: '0.85rem' }}>{vehicle.vin}</div></Card>
          <Card style={{ padding: '1rem' }}><strong>{t('fleetfox.vehicleDetail.licensePlate')}</strong><div>{vehicle.licensePlate}</div></Card>
          <Card style={{ padding: '1rem' }}><strong>{t('fleetfox.vehicleDetail.weight')}</strong><div>{vehicle.totalWeightKg.toLocaleString()} kg</div></Card>
          <Card style={{ padding: '1rem' }}><strong>{t('fleetfox.vehicleDetail.mileage')}</strong><div>{vehicle.mileageKm.toLocaleString()} km</div></Card>
        </div>

        <Card title={t('fleetfox.vehicleDetail.overviewTitle')}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.8rem' }}>
            <div>{t('fleetfox.vehicleDetail.manufacturer')}: {vehicle.manufacturer}</div>
            <div>{t('fleetfox.vehicleDetail.model')}: {vehicle.model}</div>
            <div>{t('fleetfox.vehicleDetail.serviceStatus')}: {vehicle.status}</div>
            <div>{t('fleetfox.vehicleDetail.assignedDriver')}: {assignedDriver ? `${assignedDriver.firstName} ${assignedDriver.lastName}` : '-'}</div>
            <div>
              {t('fleetfox.vehicleDetail.maintenanceRisk')}: {' '}
              <span style={{ display: 'inline-block', padding: '0.1rem 0.45rem', borderRadius: 999, background: vehicle.maintenanceRisk === 'High' ? '#fee2e2' : vehicle.maintenanceRisk === 'Medium' ? '#fef3c7' : '#dcfce7', color: '#0f172a' }}>
                {vehicle.maintenanceRisk}
              </span>
            </div>
            <div>{t('fleetfox.vehicleDetail.predictedServiceDate')}: {new Date(predictServiceDate(vehicle)).toLocaleDateString()}</div>
          </div>
          <div style={{ marginTop: '0.8rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <Button size="sm" onClick={() => setStatus('active')}>{t('fleetfox.vehicleDetail.activate')}</Button>
            <Button size="sm" variant="secondary" onClick={() => setStatus('maintenance')}>{t('fleetfox.vehicleDetail.toMaintenance')}</Button>
            <Button size="sm" variant="secondary" onClick={saveNote}>{t('fleetfox.vehicleDetail.addNote')}</Button>
          </div>
        </Card>

        {isServiceOverdue ? (
          <Card title={t('fleetfox.maintenance.warningTitle')}>
            <div style={{ color: '#7f1d1d' }}>{t('fleetfox.maintenance.warningBody')}</div>
          </Card>
        ) : null}

        {riskPanel ? (
          <Card title={t('fleetfox.risk.title')} subtitle={t('fleetfox.risk.subtitle')}>
            <div style={{ display: 'grid', gap: '0.45rem' }}>
              <div>{t('fleetfox.risk.score')}: <strong>{riskPanel.riskScore}</strong></div>
              <div>{t('fleetfox.risk.category')}: <strong>{riskPanel.riskCategory}</strong></div>
              <div>{t('fleetfox.risk.recommendation')}: {riskPanel.recommendation}</div>
              <div>{t('fleetfox.risk.premiumImpact')}: {riskPanel.premiumImpact}</div>
            </div>
          </Card>
        ) : null}

        <Card title={t('fleetfox.telematics.title')} subtitle={t('fleetfox.telematics.subtitle')}>
          <div style={{ display: 'grid', gap: '0.45rem' }}>
            {telematics.slice(0, 10).map((row) => (
              <div key={row.id} style={{ display: 'grid', gap: '0.15rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.45rem' }}>
                <div style={{ fontWeight: 600 }}>{new Date(row.timestamp).toLocaleString()} · {row.location.city}</div>
                <div style={{ fontSize: '0.85rem', color: '#475569' }}>
                  {t('fleetfox.telematics.speed')}: {row.speed} km/h · {t('fleetfox.telematics.idle')}: {row.idleMinutes} min · {t('fleetfox.telematics.fuel')}: {row.fuelConsumption}
                </div>
                <div style={{ fontSize: '0.82rem', color: '#64748b' }}>
                  {row.harshBraking ? t('fleetfox.telematics.harshBraking') : '-'} {row.harshAcceleration ? `| ${t('fleetfox.telematics.harshAcceleration')}` : ''}
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card title={t('fleetfox.costs.title')} subtitle={t('fleetfox.costs.subtitle')}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '0.8rem' }}>
            <div>{t('fleetfox.costs.total')}: EUR {costSummary.totalCost.toLocaleString()}</div>
            <div>{t('fleetfox.costs.perVehicle')}: EUR {Math.round(costSummary.totalCost / 40).toLocaleString()}</div>
            <div>{t('fleetfox.costs.perKm')}: EUR {costSummary.costPerKm.toFixed(2)}</div>
          </div>
        </Card>

        <Card title={t('fleetfox.vehicleDetail.documentsTitle')} subtitle={t('fleetfox.vehicleDetail.documentsSubtitle')}>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <Button size="sm" onClick={() => handleDownload('telematics')}>{t('fleetfox.vehicleDetail.downloadTelematics')}</Button>
            <Button size="sm" variant="secondary" onClick={() => handleDownload('risk')}>{t('fleetfox.vehicleDetail.downloadRisk')}</Button>
          </div>
        </Card>

        <Card title={t('fleetfox.vehicleDetail.timelineTitle')}>
          <FleetTimelineThread events={timeline} emptyLabel={t('fleetfox.vehicleDetail.timelineEmpty')} />
        </Card>
      </div>
    </FleetfoxLayout>
  )
}
