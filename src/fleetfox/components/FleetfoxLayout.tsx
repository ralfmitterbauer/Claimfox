import type { ReactNode } from 'react'
import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '@/components/ui/Header'
import Button from '@/components/ui/Button'
import FleetfoxNav from '@/fleetfox/components/FleetfoxNav'
import FleetCalendarWidget from '@/fleetfox/components/FleetCalendarWidget'
import { useTenantContext } from '@/brokerfox/hooks/useTenantContext'
import { listCalendarEvents } from '@/fleetfox/api/fleetfoxApi'
import { useI18n } from '@/i18n/I18nContext'
import type { CalendarEvent } from '@/fleetfox/types'
import HomeHeroBackground from '@/assets/images/Home1.png'
import InsurfoxLogoLight from '@/assets/logos/insurfox-logo-light.png'

const RIGHT_RAIL_WIDTH = 280
const TOP_ROW_HEIGHT = RIGHT_RAIL_WIDTH

type FleetfoxLayoutProps = {
  title: string
  subtitle?: string
  topLeft?: ReactNode
  children: ReactNode
}

function getEventRoute(event: CalendarEvent) {
  if (!event.entityType || !event.entityId) return '/fleetfox'
  if (event.entityType === 'vehicle') return `/fleetfox/vehicles/${event.entityId}`
  if (event.entityType === 'driver') return `/fleetfox/drivers/${event.entityId}`
  if (event.entityType === 'insurance') return '/fleetfox/insurance'
  if (event.entityType === 'route') return '/fleetfox/routes'
  if (event.entityType === 'maintenance') return '/fleetfox/maintenance'
  return '/fleetfox'
}

export default function FleetfoxLayout({ title, subtitle, topLeft, children }: FleetfoxLayoutProps) {
  const ctx = useTenantContext()
  const navigate = useNavigate()
  const { t, lang } = useI18n()
  const [events, setEvents] = useState<CalendarEvent[]>([])
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null)

  useEffect(() => {
    let mounted = true
    async function load() {
      const data = await listCalendarEvents(ctx)
      if (!mounted) return
      setEvents(data)
    }
    load()
    return () => { mounted = false }
  }, [ctx])

  const selectedEventDate = useMemo(() => {
    if (!selectedEvent) return ''
    return new Intl.DateTimeFormat(lang, { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(selectedEvent.date))
  }, [lang, selectedEvent])

  return (
    <>
      <div style={{ width: '100%', maxWidth: 1200, margin: '1rem auto 0', display: 'flex', flexDirection: 'column' }}>
        <div
          style={{
            background: '#f1f5f9',
            border: '1px solid #e2e8f0',
            borderBottom: 0,
            borderTopLeftRadius: 18,
            borderTopRightRadius: 18,
            padding: '8px 10px 0'
          }}
        >
          <FleetfoxNav />
        </div>
        <div
          style={{
            border: '1px solid #e2e8f0',
            borderTop: 0,
            borderBottomLeftRadius: 18,
            borderBottomRightRadius: 18,
            background: '#ffffff',
            padding: '22px 22px 24px',
            boxShadow: '0 8px 24px rgba(15, 23, 42, 0.08)',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem'
          }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: `minmax(0, 1fr) ${RIGHT_RAIL_WIDTH}px`, gap: '1.5rem', alignItems: 'stretch' }}>
            <div
              style={{
                border: '1px solid #e2e8f0',
                borderRadius: 12,
                padding: '1rem 1.1rem',
                display: 'grid',
                gap: '0.75rem',
                backgroundColor: '#fff',
                backgroundImage: `url(${HomeHeroBackground})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                height: TOP_ROW_HEIGHT,
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <Header title={title} subtitle={subtitle} titleColor="#d4380d" subtitleColor="#ffffff" />
              {topLeft}
              <img
                src={InsurfoxLogoLight}
                alt="Insurfox"
                style={{
                  position: 'absolute',
                  right: 14,
                  bottom: 12,
                  width: 156,
                  opacity: 0.9
                }}
              />
            </div>
            <div style={{ height: TOP_ROW_HEIGHT, alignSelf: 'stretch', minHeight: 0 }}>
              <FleetCalendarWidget events={events} height={TOP_ROW_HEIGHT} onEventClick={setSelectedEvent} />
            </div>
          </div>
          <div style={{ display: 'grid', gap: '1.5rem' }}>
            {children}
          </div>
        </div>
      </div>

      {selectedEvent ? (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(8,0,32,0.65)',
            zIndex: 200,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem'
          }}
          onClick={() => setSelectedEvent(null)}
        >
          <div
            style={{
              background: 'rgba(255,255,255,0.98)',
              borderRadius: 20,
              padding: '1.2rem',
              width: 'min(540px, 100%)',
              color: '#0e0d1c',
              boxShadow: '0 12px 30px rgba(15, 23, 42, 0.18)',
              display: 'grid',
              gap: '0.65rem'
            }}
            onClick={(event) => event.stopPropagation()}
          >
            <h3 style={{ margin: 0 }}>{selectedEvent.title}</h3>
            <div style={{ color: '#475569', fontSize: '0.9rem' }}>{selectedEvent.description}</div>
            <div style={{ fontSize: '0.85rem', color: '#64748b' }}>{t('fleetfox.calendar.date')}: {selectedEventDate}</div>
            <div style={{ fontSize: '0.85rem', color: '#64748b' }}>{t('fleetfox.calendar.location')}: {selectedEvent.location ?? '-'}</div>
            <div style={{ fontSize: '0.85rem', color: '#64748b' }}>{t('fleetfox.calendar.linked')}: {selectedEvent.entityType ?? '-'}</div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
              <Button size="sm" variant="secondary" onClick={() => setSelectedEvent(null)}>
                {t('fleetfox.calendar.close')}
              </Button>
              <Button
                size="sm"
                onClick={() => {
                  navigate(getEventRoute(selectedEvent))
                  setSelectedEvent(null)
                }}
              >
                {t('fleetfox.calendar.goTo')}
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}
