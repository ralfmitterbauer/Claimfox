import React, { useMemo, useState } from 'react'
import Card from '@/components/ui/Card'
import { useI18n } from '@/i18n/I18nContext'
import type { CalendarEvent } from '@/brokerfox/types'

function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1)
}

function endOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0)
}

function getMonthDays(date: Date) {
  const start = startOfMonth(date)
  const end = endOfMonth(date)
  const days = []
  for (let d = start.getDate(); d <= end.getDate(); d += 1) {
    days.push(new Date(date.getFullYear(), date.getMonth(), d))
  }
  return days
}

function getCalendarGrid(date: Date) {
  const days = getMonthDays(date)
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1)
  const startOffset = (firstDay.getDay() + 6) % 7
  const cells: Array<Date | null> = Array.from({ length: startOffset }, () => null)
  days.forEach((day) => cells.push(day))
  const remainder = cells.length % 7
  if (remainder !== 0) {
    const fill = 7 - remainder
    for (let i = 0; i < fill; i += 1) {
      cells.push(null)
    }
  }
  return cells
}

type CalendarWidgetProps = {
  events: CalendarEvent[]
  density?: 'compact' | 'regular'
  height?: number | string
}

export default function CalendarWidget({ events, density = 'regular', height }: CalendarWidgetProps) {
  const { lang, t } = useI18n()
  const [activeMonth, setActiveMonth] = useState(() => new Date())

  const days = useMemo(() => getCalendarGrid(activeMonth), [activeMonth])
  const monthLabel = useMemo(() => new Intl.DateTimeFormat(lang, { month: 'long', year: 'numeric' }).format(activeMonth), [lang, activeMonth])
  const upcomingEvents = useMemo(() => {
    return [...events]
      .filter((event) => !Number.isNaN(new Date(event.date).getTime()))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(0, 3)
  }, [events])
  const weekdayLabels = useMemo(() => {
    const formatter = new Intl.DateTimeFormat(lang, { weekday: 'short' })
    const base = new Date(2025, 0, 6)
    return Array.from({ length: 7 }).map((_, idx) => formatter.format(new Date(base.getTime() + idx * 86400000)))
  }, [lang])

  return (
    <Card
      variant="glass"
      style={{ minWidth: density === 'compact' ? 260 : 300, height, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: density === 'compact' ? '0.45rem' : '0.6rem', flex: 1, minHeight: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem', marginBottom: density === 'compact' ? '0.1rem' : '0.15rem' }}>
          <div style={{ display: 'grid', gap: '0.1rem' }}>
            <div style={{ color: '#d4380d', fontWeight: 700, fontSize: density === 'compact' ? '1.14rem' : '1.2rem', lineHeight: 1.1, whiteSpace: 'nowrap', textAlign: 'left' }}>
              {t('brokerfox.calendar.title')}
            </div>
            <div style={{ fontSize: '0.72rem', color: '#64748b', lineHeight: 1.1, whiteSpace: 'nowrap', textAlign: 'left' }}>
              {monthLabel}
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.25rem' }}>
            <button
              type="button"
              onClick={() => setActiveMonth(new Date(activeMonth.getFullYear(), activeMonth.getMonth() - 1, 1))}
              style={{ border: '1px solid #e2e8f0', borderRadius: 6, padding: '0.15rem 0.4rem', background: '#fff', color: '#0f172a', lineHeight: 1 }}
              aria-label={t('brokerfox.actions.previous')}
            >
              ‹
            </button>
            <button
              type="button"
              onClick={() => setActiveMonth(new Date(activeMonth.getFullYear(), activeMonth.getMonth() + 1, 1))}
              style={{ border: '1px solid #e2e8f0', borderRadius: 6, padding: '0.15rem 0.4rem', background: '#fff', color: '#0f172a', lineHeight: 1 }}
              aria-label={t('brokerfox.actions.next')}
            >
              ›
            </button>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: density === 'compact' ? '0.2rem' : '0.28rem', rowGap: density === 'compact' ? '0.28rem' : '0.34rem' }}>
          {weekdayLabels.map((label) => (
            <span key={label} style={{ fontSize: density === 'compact' ? '0.6rem' : '0.7rem', color: '#64748b', textAlign: 'center' }}>{label}</span>
          ))}
          {days.map((day, idx) => {
            if (!day) {
              return <div key={`empty-${idx}`} />
            }
            const hasEvent = events.some((event) => new Date(event.date).toDateString() === day.toDateString())
            return (
              <button
                key={day.toISOString()}
                type="button"
                style={{
                  border: 'none',
                  borderRadius: 8,
                  padding: density === 'compact' ? '0.06rem' : '0.16rem',
                  background: '#fff',
                  color: '#0f172a',
                  position: 'relative',
                  fontSize: density === 'compact' ? '0.64rem' : '0.74rem'
                }}
              >
                {day.getDate()}
                {hasEvent ? <span style={{ position: 'absolute', bottom: 4, right: 6, width: density === 'compact' ? 5 : 6, height: density === 'compact' ? 5 : 6, borderRadius: '50%', background: '#f59e0b' }} /> : null}
              </button>
            )
          })}
        </div>
        <div style={{ display: 'grid', gap: '0.18rem', fontSize: '0.62rem', lineHeight: 1.15, color: '#475569', textAlign: 'left', marginTop: density === 'compact' ? '0.5rem' : '0.55rem' }}>
          {upcomingEvents.length === 0 ? (
            <span style={{ whiteSpace: 'nowrap' }}>{t('brokerfox.calendar.empty')}</span>
          ) : (
            upcomingEvents.map((event) => (
              <div key={event.id} style={{ display: 'flex', justifyContent: 'space-between', gap: '0.5rem' }}>
                <span style={{ color: '#0f172a', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {event.title.replace(/^Tender deadline:\s*/i, '')}
                </span>
                <span style={{ whiteSpace: 'nowrap', color: '#64748b', fontSize: '0.6rem' }}>
                  {new Intl.DateTimeFormat(lang, { month: 'short', day: '2-digit' }).format(new Date(event.date))}
                </span>
              </div>
            ))
          )}
        </div>
      </div>

    </Card>
  )
}
