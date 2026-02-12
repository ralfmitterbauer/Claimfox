import { useMemo, useState } from 'react'
import Card from '@/components/ui/Card'
import { useI18n } from '@/i18n/I18nContext'
import type { CalendarEvent } from '@/partnerfox/types'

type PartnerCalendarWidgetProps = {
  events: CalendarEvent[]
  height?: number | string
  onEventClick?: (event: CalendarEvent) => void
}

function getMonthGrid(date: Date) {
  const start = new Date(date.getFullYear(), date.getMonth(), 1)
  const end = new Date(date.getFullYear(), date.getMonth() + 1, 0)
  const startOffset = (start.getDay() + 6) % 7
  const cells: Array<Date | null> = Array.from({ length: startOffset }, () => null)
  for (let d = 1; d <= end.getDate(); d += 1) {
    cells.push(new Date(date.getFullYear(), date.getMonth(), d))
  }
  while (cells.length % 7 !== 0) {
    cells.push(null)
  }
  return cells
}

export default function PartnerCalendarWidget({ events, height, onEventClick }: PartnerCalendarWidgetProps) {
  const { lang, t } = useI18n()
  const [month, setMonth] = useState(() => new Date())

  const monthLabel = useMemo(
    () => new Intl.DateTimeFormat(lang, { month: 'long', year: 'numeric' }).format(month),
    [lang, month]
  )

  const grid = useMemo(() => getMonthGrid(month), [month])

  const weekdayLabels = useMemo(() => {
    const base = new Date(2026, 0, 5)
    const formatter = new Intl.DateTimeFormat(lang, { weekday: 'short' })
    return Array.from({ length: 7 }).map((_, idx) => formatter.format(new Date(base.getTime() + idx * 86400000)))
  }, [lang])

  const upcomingEvents = useMemo(() => {
    const monthValue = month.getMonth()
    const year = month.getFullYear()
    return [...events]
      .filter((event) => {
        const date = new Date(event.date)
        return date.getMonth() === monthValue && date.getFullYear() === year
      })
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(0, 5)
  }, [events, month])

  return (
    <Card variant="glass" style={{ minWidth: 260, height, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', flex: 1, minHeight: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ display: 'grid', gap: '0.12rem' }}>
            <div style={{ color: '#d4380d', fontWeight: 700, fontSize: '1.14rem', lineHeight: 1.1 }}>{t('partnerfox.calendar.title')}</div>
            <div style={{ fontSize: '0.72rem', color: '#64748b' }}>{monthLabel}</div>
          </div>
          <div style={{ display: 'flex', gap: '0.25rem' }}>
            <button
              type="button"
              onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))}
              style={{ border: '1px solid #e2e8f0', borderRadius: 6, padding: '0.15rem 0.4rem', background: '#fff', color: '#0f172a', lineHeight: 1 }}
            >
              ‹
            </button>
            <button
              type="button"
              onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))}
              style={{ border: '1px solid #e2e8f0', borderRadius: 6, padding: '0.15rem 0.4rem', background: '#fff', color: '#0f172a', lineHeight: 1 }}
            >
              ›
            </button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '0.2rem', rowGap: '0.28rem' }}>
          {weekdayLabels.map((label) => (
            <span key={label} style={{ fontSize: '0.6rem', color: '#64748b', textAlign: 'center' }}>{label}</span>
          ))}
          {grid.map((day, idx) => {
            if (!day) return <div key={`empty-${idx}`} />
            const hasEvent = events.some((event) => new Date(event.date).toDateString() === day.toDateString())
            return (
              <div key={day.toISOString()} style={{ borderRadius: 8, padding: '0.08rem', textAlign: 'center', fontSize: '0.64rem', position: 'relative' }}>
                {day.getDate()}
                {hasEvent ? <span style={{ position: 'absolute', bottom: 2, right: 6, width: 4, height: 4, borderRadius: '50%', background: '#f59e0b' }} /> : null}
              </div>
            )
          })}
        </div>

        <div style={{ display: 'grid', gap: '0.25rem', fontSize: '0.62rem', lineHeight: 1.2, marginTop: '0.45rem', minHeight: 0, overflowY: 'auto' }}>
          {upcomingEvents.length === 0 ? (
            <span style={{ color: '#64748b' }}>{t('partnerfox.calendar.empty')}</span>
          ) : (
            upcomingEvents.map((event) => (
              <button
                key={event.id}
                type="button"
                onClick={() => onEventClick?.(event)}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '0.4rem',
                  border: 'none',
                  background: 'transparent',
                  padding: 0,
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <span style={{ color: '#0f172a', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {event.title}
                </span>
                <span style={{ color: '#64748b', whiteSpace: 'nowrap' }}>
                  {new Intl.DateTimeFormat(lang, { day: '2-digit', month: 'short' }).format(new Date(event.date))}
                </span>
              </button>
            ))
          )}
        </div>
      </div>
    </Card>
  )
}
