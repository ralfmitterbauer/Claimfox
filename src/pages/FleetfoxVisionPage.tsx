import { useEffect, useState } from 'react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import FleetfoxLayout from '@/fleetfox/components/FleetfoxLayout'
import { useI18n } from '@/i18n/I18nContext'
import { useTenantContext } from '@/brokerfox/hooks/useTenantContext'
import { addTimelineEvent, listVehicles, listVisionEvents } from '@/fleetfox/api/fleetfoxApi'
import type { Vehicle, VisionEvent } from '@/fleetfox/types'
import ClaimDamageImage from '@/assets/images/claim_damage_2.png'

export default function FleetfoxVisionPage() {
  const { t } = useI18n()
  const ctx = useTenantContext()
  const [events, setEvents] = useState<VisionEvent[]>([])
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [selectedId, setSelectedId] = useState('')

  useEffect(() => {
    let mounted = true
    async function load() {
      const [eventData, vehicleData] = await Promise.all([listVisionEvents(ctx), listVehicles(ctx)])
      if (!mounted) return
      setEvents(eventData)
      setVehicles(vehicleData)
      setSelectedId(eventData[0]?.id ?? '')
    }
    load()
    return () => { mounted = false }
  }, [ctx])

  const selected = events.find((event) => event.id === selectedId) ?? events[0]
  const selectedVehicle = vehicles.find((vehicle) => vehicle.id === selected?.vehicleId)

  async function saveDecision(decision: string) {
    if (!selected) return
    await addTimelineEvent(ctx, {
      entityType: 'vision',
      entityId: selected.id,
      type: 'status',
      title: 'Vision review decision',
      message: `${decision} for ${selected.clipLabel}.`,
      meta: { actor: ctx.userId }
    })
  }

  return (
    <FleetfoxLayout title={t('fleetfox.vision.title')} subtitle={t('fleetfox.vision.subtitle')}>
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 0.8fr)', gap: '1.5rem' }}>
        <Card title={t('fleetfox.vision.uploadTitle')} subtitle={t('fleetfox.vision.uploadSubtitle')}>
          <div style={{ display: 'grid', gap: '0.8rem' }}>
            <div style={{ border: '1px dashed #cbd5f5', borderRadius: 14, padding: '0.55rem 0.8rem', textAlign: 'center', color: '#64748b' }}>
              {t('fleetfox.vision.uploadHint')}
            </div>
            <div style={{ borderRadius: 14, overflow: 'hidden', border: '1px solid #e2e8f0', height: 190, background: '#e2e8f0' }}>
              <img src={ClaimDamageImage} alt="Vision demo" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
            <div style={{ position: 'relative', height: 180, borderRadius: 14, background: '#0f172a', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 24, left: 40, width: 120, height: 70, border: '2px solid #f97316', borderRadius: 8 }} />
              <div style={{ position: 'absolute', top: 72, right: 38, width: 100, height: 60, border: '2px solid #38bdf8', borderRadius: 8 }} />
              <div style={{ position: 'absolute', bottom: 14, left: 16, color: '#fff', fontSize: '0.82rem' }}>{t('fleetfox.vision.overlay')}</div>
            </div>
          </div>
        </Card>

        <Card title={t('fleetfox.vision.eventsTitle')} subtitle={t('fleetfox.vision.eventsSubtitle')}>
          <div style={{ display: 'grid', gap: '0.6rem' }}>
            <select value={selectedId} onChange={(event) => setSelectedId(event.target.value)} style={{ padding: '0.45rem', borderRadius: 10, border: '1px solid #e2e8f0' }}>
              {events.map((event) => (
                <option key={event.id} value={event.id}>{event.type} · {new Date(event.occurredAt).toLocaleDateString()}</option>
              ))}
            </select>
            <div style={{ fontWeight: 600 }}>{selected?.summary}</div>
            <div style={{ color: '#64748b', fontSize: '0.85rem' }}>{t('fleetfox.vision.vehicle')}: {selectedVehicle?.licensePlate ?? '-'}</div>
            <div style={{ color: '#64748b', fontSize: '0.85rem' }}>{t('fleetfox.vision.severity')}: {selected?.severity}</div>
            <ul style={{ margin: 0, paddingLeft: '1rem', color: '#475569' }}>
              {selected?.evidence.map((item) => <li key={item}>{item}</li>)}
            </ul>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <Button size="sm" onClick={() => saveDecision('Approved')}>{t('fleetfox.vision.approve')}</Button>
              <Button size="sm" variant="secondary" onClick={() => saveDecision('Override')}>{t('fleetfox.vision.override')}</Button>
            </div>
          </div>
        </Card>
      </div>
    </FleetfoxLayout>
  )
}
