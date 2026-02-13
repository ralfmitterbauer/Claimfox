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

function ScoreBar({ value }: { value: number }) {
  return (
    <div style={{ height: 8, background: '#e2e8f0', borderRadius: 999, overflow: 'hidden' }}>
      <div style={{ width: `${value}%`, height: '100%', background: '#d4380d' }} />
    </div>
  )
}

export default function FleetfoxDriverDetailPage() {
  const { driverId } = useParams()
  const { t, lang } = useI18n()
  const ctx = useTenantContext()
  const [driver, setDriver] = useState<Driver | null>(null)
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [timeline, setTimeline] = useState<TimelineEvent[]>([])
  const locale = lang === 'de' ? 'de-DE' : 'en-US'

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

  const currentVehicle = useMemo(() => vehicles.find((vehicle) => vehicle.id === driver?.activeVehicleId), [driver, vehicles])

  async function addCoachingNote() {
    if (!driverId) return
    await addTimelineEvent(ctx, {
      entityType: 'driver',
      entityId: driverId,
      type: 'note',
      title: lang === 'de' ? 'Coaching-Maßnahme' : 'Coaching action',
      message: lang === 'de'
        ? 'Fahrer wurde für ein Coaching-Modul zu Ablenkung und Bremsverhalten eingeplant.'
        : 'Driver scheduled for distraction and braking coaching module.',
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
      title={`${t('fleetfox.driverDetail.title')} ${driver.firstName} ${driver.lastName}`}
      subtitle={`${driver.address.city} · ${driver.licenseClass}`}
      topLeft={<div style={{ color: '#fff', fontSize: '0.84rem' }}>{t('fleetfox.driverDetail.heroHint')}</div>}
    >
      <div style={{ display: 'grid', gap: '1.5rem' }}>
        <Card title={t('fleetfox.driverDetail.profileTitle')}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.8rem' }}>
            <div>{t('fleetfox.driverDetail.address')}: {driver.address.street}, {driver.address.zip} {driver.address.city}, {driver.address.country}</div>
            <div>{t('fleetfox.driverDetail.licenseValidUntil')}: {new Date(driver.licenseValidUntil).toLocaleDateString(locale)}</div>
            <div>{t('fleetfox.driverDetail.incidents')}: {driver.incidentsCount}</div>
            <div>{t('fleetfox.driverDetail.currentVehicle')}: {currentVehicle?.licensePlate ?? '-'}</div>
          </div>
        </Card>

        <Card title={t('fleetfox.driverDetail.scoresTitle')}>
          <div style={{ display: 'grid', gap: '0.65rem' }}>
            <div>{t('fleetfox.driverDetail.risk')} {driver.riskScore}<ScoreBar value={driver.riskScore} /></div>
            <div>{t('fleetfox.driverDetail.safety')} {driver.safetyScore}<ScoreBar value={driver.safetyScore} /></div>
            <div>{t('fleetfox.driverDetail.eco')} {driver.ecoScore}<ScoreBar value={driver.ecoScore} /></div>
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
