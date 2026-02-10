import type { ReactNode } from 'react'
import { useEffect, useRef, useState } from 'react'
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

const RIGHT_RAIL_WIDTH = 280

export default function BrokerfoxLayout({ title, subtitle, topLeft, children }: BrokerfoxLayoutProps) {
  const navigate = useNavigate()
  const ctx = useTenantContext()
  const [events, setEvents] = useState<CalendarEvent[]>([])
  const headerRef = useRef<HTMLDivElement | null>(null)
  const [headerHeight, setHeaderHeight] = useState<number | null>(null)

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

  useEffect(() => {
    if (!headerRef.current) return
    const element = headerRef.current
    const observer = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        const nextHeight = Math.ceil(entry.contentRect.height)
        setHeaderHeight(nextHeight)
      })
    })
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

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
        <BrokerfoxNav />
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
            ref={headerRef}
            style={{
              border: '1px solid #e2e8f0',
              borderRadius: 12,
              padding: '1rem 1.1rem',
              display: 'grid',
              gap: '0.75rem',
              background: '#fff'
            }}
          >
            <Header title={title} subtitle={subtitle} titleColor="#0f172a" />
            {topLeft}
          </div>
          <div style={{ height: headerHeight ? `${headerHeight}px` : 'auto', alignSelf: 'stretch', minHeight: 0 }}>
            <CalendarWidget
              events={events}
              onAddEvent={handleAdd}
              onSelectEvent={handleOpenRelated}
              density="compact"
              height={headerHeight ?? undefined}
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
