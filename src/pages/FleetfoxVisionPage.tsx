import { useEffect, useState } from 'react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import FleetfoxLayout from '@/fleetfox/components/FleetfoxLayout'
import { useI18n } from '@/i18n/I18nContext'
import { useTenantContext } from '@/brokerfox/hooks/useTenantContext'
import { addTimelineEvent, listVehicles, listVisionEvents } from '@/fleetfox/api/fleetfoxApi'
import type { Vehicle, VisionEvent } from '@/fleetfox/types'
import ClaimDamageImage from '@/assets/images/claim_damage_2.png'

type VisionZone = {
  id: string
  label: string
  confidence: number
  objectPosition: string
  box: { top: string; left: string; width: string; height: string; color: string }
}

function buildDetectedZones(event: VisionEvent | undefined): VisionZone[] {
  if (!event) return []

  const seed = event.id.split('').reduce((acc, ch) => acc + ch.charCodeAt(0), 0)
  const bump = (offset: number) => Math.max(0.6, Math.min(0.95, ((seed + offset) % 28) / 100 + 0.67))
  const baseByType: Record<string, Array<{ label: string; objectPosition: string; box: VisionZone['box'] }>> = {
    'Near miss': [
      {
        label: 'Heckstoßfänger',
        objectPosition: '24% 52%',
        box: { top: '24%', left: '15%', width: '20%', height: '29%', color: '#f97316' }
      },
      {
        label: 'Rücklicht links',
        objectPosition: '13% 45%',
        box: { top: '20%', left: '6%', width: '12%', height: '22%', color: '#38bdf8' }
      },
      {
        label: 'Ladebereich',
        objectPosition: '52% 40%',
        box: { top: '16%', left: '47%', width: '26%', height: '32%', color: '#22c55e' }
      }
    ],
    'Lane departure': [
      {
        label: 'Seitenschweller',
        objectPosition: '28% 62%',
        box: { top: '48%', left: '22%', width: '24%', height: '24%', color: '#f97316' }
      },
      {
        label: 'Radlauf hinten',
        objectPosition: '20% 58%',
        box: { top: '44%', left: '11%', width: '12%', height: '24%', color: '#38bdf8' }
      },
      {
        label: 'Leitplankenkontakt',
        objectPosition: '64% 46%',
        box: { top: '36%', left: '58%', width: '21%', height: '28%', color: '#22c55e' }
      }
    ],
    Tailgating: [
      {
        label: 'Frontbereich',
        objectPosition: '46% 40%',
        box: { top: '28%', left: '40%', width: '26%', height: '30%', color: '#f97316' }
      },
      {
        label: 'Kennzeichenfeld',
        objectPosition: '50% 54%',
        box: { top: '52%', left: '47%', width: '14%', height: '15%', color: '#38bdf8' }
      },
      {
        label: 'Scheinwerferzone',
        objectPosition: '66% 38%',
        box: { top: '34%', left: '62%', width: '15%', height: '18%', color: '#22c55e' }
      }
    ]
  }
  const base = baseByType[event.type] ?? [
    {
      label: 'Schadenzone A',
      objectPosition: '25% 50%',
      box: { top: '28%', left: '17%', width: '22%', height: '30%', color: '#f97316' }
    },
    {
      label: 'Schadenzone B',
      objectPosition: '60% 44%',
      box: { top: '32%', left: '54%', width: '20%', height: '26%', color: '#38bdf8' }
    },
    {
      label: 'Schadenzone C',
      objectPosition: '43% 60%',
      box: { top: '52%', left: '36%', width: '21%', height: '20%', color: '#22c55e' }
    }
  ]

  return base.map((zone, idx) => ({
    id: `${event.id}-${idx + 1}`,
    label: zone.label,
    objectPosition: zone.objectPosition,
    confidence: Number(bump(idx * 7).toFixed(2)),
    box: zone.box
  }))
}

export default function FleetfoxVisionPage() {
  const { t, lang } = useI18n()
  const ctx = useTenantContext()
  const [events, setEvents] = useState<VisionEvent[]>([])
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [selectedId, setSelectedId] = useState('')
  const dateLocale = lang === 'de' ? 'de-DE' : 'en-US'
  const numberFormatter = new Intl.NumberFormat(dateLocale)

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
  const detectedZones = buildDetectedZones(selected)

  function localizeZoneLabel(label: string) {
    if (lang === 'de') return label
    if (label === 'Heckstoßfänger') return 'Rear bumper'
    if (label === 'Rücklicht links') return 'Left taillight'
    if (label === 'Ladebereich') return 'Cargo area'
    if (label === 'Seitenschweller') return 'Side skirt'
    if (label === 'Radlauf hinten') return 'Rear wheel arch'
    if (label === 'Leitplankenkontakt') return 'Guardrail contact'
    if (label === 'Frontbereich') return 'Front section'
    if (label === 'Kennzeichenfeld') return 'Plate area'
    if (label === 'Scheinwerferzone') return 'Headlight area'
    if (label === 'Schadenzone A') return 'Damage zone A'
    if (label === 'Schadenzone B') return 'Damage zone B'
    if (label === 'Schadenzone C') return 'Damage zone C'
    return label
  }

  function localizeVisionType(value: string) {
    if (lang === 'de') {
      if (value === 'Near miss') return 'Beinaheunfall'
      if (value === 'Lane departure') return 'Spurverlassen'
      if (value === 'Tailgating') return 'Zu geringer Abstand'
      if (value === 'Hard cornering') return 'Scharfe Kurvenfahrt'
      if (value === 'Phone distraction') return 'Handy-Ablenkung'
    }
    return value
  }

  function localizeSeverity(value: string | undefined) {
    if (!value) return '-'
    if (lang === 'de') {
      if (value === 'critical') return 'kritisch'
      if (value === 'high') return 'hoch'
      if (value === 'medium') return 'mittel'
      if (value === 'low') return 'niedrig'
    }
    return value
  }

  function localizeSummary(value: string | undefined) {
    if (!value || lang !== 'de') return value
    return value
      .replace('Near miss', 'Beinaheunfall')
      .replace('Lane departure', 'Spurverlassen')
      .replace('Tailgating', 'Zu geringer Abstand')
      .replace('Hard cornering', 'Scharfe Kurvenfahrt')
      .replace('Phone distraction', 'Handy-Ablenkung')
      .replace('detected on', 'erkannt bei')
      .replace('in', 'in')
  }

  function localizeEvidence(value: string) {
    if (lang !== 'de') return value
    if (value === 'Vision confidence 86%') return 'Vision-Konfidenz 86%'
    if (value === 'Speed delta +18 km/h') return 'Geschwindigkeitsdelta +18 km/h'
    if (value === 'High traffic density segment') return 'Streckenabschnitt mit hoher Verkehrsdichte'
    return value
  }

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
            <div style={{ position: 'relative', height: 210, borderRadius: 14, background: '#0f172a', overflow: 'hidden' }}>
              <img
                src={ClaimDamageImage}
                alt="Bounding box base"
                style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.55, filter: 'contrast(1.12) saturate(1.05)' }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(130deg, rgba(15,23,42,0.75) 0%, rgba(15,23,42,0.35) 45%, rgba(15,23,42,0.7) 100%)'
                }}
              />
              {detectedZones.map((zone, index) => (
                <div key={zone.id}>
                  <div
                    style={{
                      position: 'absolute',
                      top: zone.box.top,
                      left: zone.box.left,
                      width: zone.box.width,
                      height: zone.box.height,
                      border: `2px solid ${zone.box.color}`,
                      borderRadius: 8,
                      boxShadow: `0 0 0 1px rgba(15,23,42,0.45), 0 0 14px ${zone.box.color}66`
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: `calc(${zone.box.top} - 18px)`,
                      left: zone.box.left,
                      fontSize: '0.68rem',
                      color: '#e2e8f0',
                      background: 'rgba(15,23,42,0.85)',
                      border: `1px solid ${zone.box.color}66`,
                      borderRadius: 999,
                      padding: '0.1rem 0.35rem'
                    }}
                  >
                    {index + 1}. {localizeZoneLabel(zone.label)}
                  </div>
                </div>
              ))}
              <div
                style={{
                  position: 'absolute',
                  left: 12,
                  right: 12,
                  bottom: 10,
                  color: '#fff',
                  fontSize: '0.8rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <span>{t('fleetfox.vision.overlay')}</span>
                <span style={{ fontSize: '0.72rem', color: '#cbd5e1' }}>{t('fleetfox.vision.liveMap')}</span>
              </div>
            </div>
            <div style={{ fontSize: '0.82rem', color: '#64748b' }}>
              {t('fleetfox.vision.overlayHelp')}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '0.6rem' }}>
              {detectedZones.map((zone) => (
                <div key={zone.id} style={{ border: '1px solid #e2e8f0', borderRadius: 10, overflow: 'hidden', background: '#fff' }}>
                  <div style={{ height: 74, background: '#e2e8f0' }}>
                    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                      <img
                        src={ClaimDamageImage}
                        alt={zone.label}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: zone.objectPosition, display: 'block', transform: `scale(${1.4 + (Number(zone.id.split('-').pop() ?? 1) % 2) * 0.25})` }}
                      />
                      <div
                        style={{
                          position: 'absolute',
                          inset: 0,
                          background: 'linear-gradient(135deg, rgba(15,23,42,0.05), rgba(15,23,42,0.28))',
                          borderTop: `2px solid ${zone.box.color}`
                        }}
                      />
                    </div>
                  </div>
                  <div style={{ padding: '0.35rem 0.45rem', display: 'grid', gap: '0.1rem' }}>
                    <div style={{ fontSize: '0.78rem', fontWeight: 600, color: '#0f172a' }}>{localizeZoneLabel(zone.label)}</div>
                    <div style={{ fontSize: '0.72rem', color: '#64748b' }}>{t('fleetfox.vision.confidence')}: {numberFormatter.format(Math.round(zone.confidence * 100))}%</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card title={t('fleetfox.vision.eventsTitle')} subtitle={t('fleetfox.vision.eventsSubtitle')}>
          <div style={{ display: 'grid', gap: '0.6rem' }}>
            <select value={selectedId} onChange={(event) => setSelectedId(event.target.value)} style={{ padding: '0.45rem', borderRadius: 10, border: '1px solid #e2e8f0' }}>
              {events.map((event) => (
                <option key={event.id} value={event.id}>{localizeVisionType(event.type)} · {new Date(event.occurredAt).toLocaleDateString(dateLocale)}</option>
              ))}
            </select>
            <div style={{ fontWeight: 600 }}>{localizeSummary(selected?.summary)}</div>
            <div style={{ color: '#64748b', fontSize: '0.85rem' }}>{t('fleetfox.vision.vehicle')}: {selectedVehicle?.licensePlate ?? '-'}</div>
            <div style={{ color: '#64748b', fontSize: '0.85rem' }}>{t('fleetfox.vision.severity')}: {localizeSeverity(selected?.severity)}</div>
            <ul style={{ margin: 0, paddingLeft: '1rem', color: '#475569' }}>
              {selected?.evidence.map((item) => <li key={item}>{localizeEvidence(item)}</li>)}
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
