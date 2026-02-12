import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import FleetfoxLayout from '@/fleetfox/components/FleetfoxLayout'
import FleetTimelineThread from '@/fleetfox/components/FleetTimelineThread'
import { useI18n } from '@/i18n/I18nContext'
import { useTenantContext } from '@/brokerfox/hooks/useTenantContext'
import { addTimelineEvent, generateDownloadText, getDriver, listTimelineEvents, listVehicles } from '@/fleetfox/api/fleetfoxApi'
import type { Driver, TimelineEvent, Vehicle } from '@/fleetfox/types'

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

export default function FleetfoxDriverDetailPage() {
  const { driverId } = useParams()
  const { t } = useI18n()
  const ctx = useTenantContext()
  const [driver, setDriver] = useState<Driver | null>(null)
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [timeline, setTimeline] = useState<TimelineEvent[]>([])

  useEffect(() => {
    let mounted = true
    async function load() {
      if (!driverId) return
      const [driverData, vehiclesData, timelineData] = await Promise.all([
        getDriver(ctx, driverId),
        listVehicles(ctx),
        listTimelineEvents(ctx, 'driver', driverId)
      ])
      if (!mounted) return
      setDriver(driverData)
      setVehicles(vehiclesData)
      setTimeline(timelineData)
    }
    load()
    return () => { mounted = false }
  }, [ctx, driverId])

  const assignedVehicles = useMemo(() => {
    if (!driver) return []
    return vehicles.filter((vehicle) => driver.assignedVehicleIds.includes(vehicle.id))
  }, [driver, vehicles])

  async function addCoachingNote() {
    if (!driverId) return
    await addTimelineEvent(ctx, {
      entityType: 'driver',
      entityId: driverId,
      type: 'note',
      title: 'Coaching action',
      message: 'Driver scheduled for distraction and braking coaching module.',
      meta: { actor: ctx.userId }
    })
    setTimeline(await listTimelineEvents(ctx, 'driver', driverId))
  }

  async function downloadProfile() {
    if (!driverId) return
    const file = await generateDownloadText(ctx, 'driver', driverId)
    downloadText(file.filename, file.content, file.mime)
  }

  if (!driver) {
    return <FleetfoxLayout title={t('fleetfox.driverDetail.title')} subtitle={t('fleetfox.common.loading')}><Card>{t('fleetfox.common.loading')}</Card></FleetfoxLayout>
  }

  return (
    <FleetfoxLayout
      title={`${t('fleetfox.driverDetail.title')} ${driver.name}`}
      subtitle={`${driver.baseLocation} · ${driver.licenseClass}`}
      topLeft={<div style={{ color: '#fff', fontSize: '0.84rem' }}>{t('fleetfox.driverDetail.heroHint')}</div>}
    >
      <div style={{ display: 'grid', gap: '1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem' }}>
          <Card style={{ padding: '1rem' }}><strong>{t('fleetfox.driverDetail.safety')}</strong><div>{driver.safetyScore}</div></Card>
          <Card style={{ padding: '1rem' }}><strong>{t('fleetfox.driverDetail.risk')}</strong><div>{driver.riskScore}</div></Card>
          <Card style={{ padding: '1rem' }}><strong>{t('fleetfox.driverDetail.distraction')}</strong><div>{driver.distractionEvents}</div></Card>
          <Card style={{ padding: '1rem' }}><strong>{t('fleetfox.driverDetail.speeding')}</strong><div>{driver.speedingEvents}</div></Card>
        </div>

        <Card title={t('fleetfox.driverDetail.assignedTitle')}>
          <div style={{ display: 'grid', gap: '0.45rem' }}>
            {assignedVehicles.map((vehicle) => (
              <div key={vehicle.id} style={{ color: '#475569' }}>{vehicle.plate} · {vehicle.region}</div>
            ))}
          </div>
        </Card>

        <Card title={t('fleetfox.driverDetail.documentsTitle')}>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <Button size="sm" onClick={downloadProfile}>{t('fleetfox.driverDetail.downloadProfile')}</Button>
            <Button size="sm" variant="secondary" onClick={addCoachingNote}>{t('fleetfox.driverDetail.addNote')}</Button>
          </div>
        </Card>

        <Card title={t('fleetfox.driverDetail.timelineTitle')}>
          <FleetTimelineThread events={timeline} emptyLabel={t('fleetfox.driverDetail.timelineEmpty')} />
        </Card>
      </div>
    </FleetfoxLayout>
  )
}
