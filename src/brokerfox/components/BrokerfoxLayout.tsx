import type { ReactNode } from 'react'
import { useEffect, useState } from 'react'
import Header from '@/components/ui/Header'
import BrokerfoxNav from '@/brokerfox/components/BrokerfoxNav'
import CalendarWidget from '@/brokerfox/components/CalendarWidget'
import { useTenantContext } from '@/brokerfox/hooks/useTenantContext'
import { listCalendarEvents } from '@/brokerfox/api/brokerfoxApi'
import type { CalendarEvent } from '@/brokerfox/types'
import HomeHeroBackground from '@/assets/images/Home1.png'
type BrokerfoxLayoutProps = {
  title: string
  subtitle?: string
  topLeft?: ReactNode
  children: ReactNode
}

const RIGHT_RAIL_WIDTH = 280
const TOP_ROW_HEIGHT = RIGHT_RAIL_WIDTH

export default function BrokerfoxLayout({ title, subtitle, topLeft, children }: BrokerfoxLayoutProps) {
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
              height: TOP_ROW_HEIGHT
            }}
          >
            <Header title={title} subtitle={subtitle} titleColor="#0f172a" />
            {topLeft}
          </div>
          <div style={{ height: TOP_ROW_HEIGHT, alignSelf: 'stretch', minHeight: 0 }}>
            <CalendarWidget
              events={events}
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
