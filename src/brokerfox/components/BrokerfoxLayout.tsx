import type { ReactNode } from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '@/components/ui/Header'
import BrokerfoxNav from '@/brokerfox/components/BrokerfoxNav'
import CalendarWidget from '@/brokerfox/components/CalendarWidget'
import { useTenantContext } from '@/brokerfox/hooks/useTenantContext'
import { addCalendarEvent, listCalendarEvents } from '@/brokerfox/api/brokerfoxApi'
import type { CalendarEvent } from '@/brokerfox/types'
type BrokerfoxLayoutProps = {
  title: string
  subtitle?: string
  topLeft?: ReactNode
  children: ReactNode
}

const TOP_ROW_HEIGHT = 260
const RIGHT_RAIL_WIDTH = 280

export default function BrokerfoxLayout({ title, subtitle, topLeft, children }: BrokerfoxLayoutProps) {
  const navigate = useNavigate()
  const ctx = useTenantContext()
  const [events, setEvents] = useState<CalendarEvent[]>([])

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

  async function handleAdd(input: { title: string; date: string }) {
    const event = await addCalendarEvent(ctx, {
      title: input.title,
      date: new Date(input.date).toISOString()
    })
    setEvents((prev) => [event, ...prev])
  }

  function handleOpenRelated(event: CalendarEvent) {
    if (!event.entityType || !event.entityId) return
    if (event.entityType === 'offer') {
      navigate('/brokerfox/offers')
      return
    }
    const base =
      event.entityType === 'client'
        ? '/brokerfox/clients'
        : event.entityType === 'tender'
          ? '/brokerfox/tenders'
          : event.entityType === 'contract'
            ? '/brokerfox/contracts'
            : event.entityType === 'renewal'
              ? '/brokerfox/renewals'
              : ''
    if (!base) return
    const target = `${base}/${event.entityId}`
    navigate(target)
  }

  return (
    <div style={{ width: '100%', maxWidth: 1200, margin: '0 auto', paddingTop: 28, display: 'flex', flexDirection: 'column', gap: 0 }}>
      <BrokerfoxNav />
      <div
        style={{
          border: '1px solid #d6d9e0',
          borderRadius: 16,
          background: '#ffffff',
          padding: 22,
          marginTop: -1,
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
              minHeight: TOP_ROW_HEIGHT,
              display: 'grid',
              gap: '0.75rem',
              background: '#fff'
            }}
          >
            <Header title={title} subtitle={subtitle} titleColor="#0f172a" />
            {topLeft}
          </div>
          <div style={{ height: TOP_ROW_HEIGHT }}>
            <CalendarWidget
              events={events}
              onAddEvent={handleAdd}
              onSelectEvent={handleOpenRelated}
              density="compact"
              height={TOP_ROW_HEIGHT}
            />
          </div>
        </div>
        <div style={{ display: 'grid', gap: '1.5rem' }}>
          {children}
        </div>
      </div>
    </div>
  )
}
