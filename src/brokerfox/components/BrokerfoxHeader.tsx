import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '@/components/ui/Header'
import CalendarWidget from '@/brokerfox/components/CalendarWidget'
import { useTenantContext } from '@/brokerfox/hooks/useTenantContext'
import { addCalendarEvent, listCalendarEvents } from '@/brokerfox/api/brokerfoxApi'
import type { CalendarEvent } from '@/brokerfox/types'

const routeMap: Record<string, string> = {
  client: '/brokerfox/clients',
  tender: '/brokerfox/tenders',
  renewal: '/brokerfox/renewals',
  offer: '/brokerfox/offers'
}

type BrokerfoxHeaderProps = {
  title: string
  subtitle?: string
}

export default function BrokerfoxHeader({ title, subtitle }: BrokerfoxHeaderProps) {
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

  function handleSelect(event: CalendarEvent) {
    if (!event.entityType || !event.entityId) return
    const base = routeMap[event.entityType]
    if (!base) return
    const target = event.entityType === 'client' ? `${base}/${event.entityId}` : event.entityType === 'tender' ? `${base}/${event.entityId}` : base
    navigate(target)
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(240px, 1fr) minmax(280px, 360px)', gap: '1.5rem', alignItems: 'start' }}>
      <Header title={title} subtitle={subtitle} titleColor="#0f172a" />
      <div style={{ justifySelf: 'end' }}>
        <CalendarWidget events={events} onAddEvent={handleAdd} onSelectEvent={handleSelect} />
      </div>
    </div>
  )
}
