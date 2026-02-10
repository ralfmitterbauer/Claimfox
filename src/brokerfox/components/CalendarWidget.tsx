import React, { useMemo, useState } from 'react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
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

type CalendarWidgetProps = {
  events: CalendarEvent[]
  onAddEvent: (input: { title: string; date: string }) => void
  onSelectEvent: (event: CalendarEvent) => void
  density?: 'compact' | 'regular'
  height?: number | string
}

export default function CalendarWidget({ events, onAddEvent, onSelectEvent, density = 'regular', height }: CalendarWidgetProps) {
  const { lang, t } = useI18n()
  const [activeMonth, setActiveMonth] = useState(() => new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null)

  const days = useMemo(() => getMonthDays(activeMonth), [activeMonth])
  const monthLabel = useMemo(() => new Intl.DateTimeFormat(lang, { month: 'long', year: 'numeric' }).format(activeMonth), [lang, activeMonth])

  const filteredEvents = useMemo(() => {
    if (!selectedDate) return events
    const key = selectedDate.toDateString()
    return events.filter((event) => new Date(event.date).toDateString() === key)
  }, [events, selectedDate])

  const weekdayLabels = useMemo(() => {
    const formatter = new Intl.DateTimeFormat(lang, { weekday: 'short' })
    const base = new Date(2025, 0, 5)
    return Array.from({ length: 7 }).map((_, idx) => formatter.format(new Date(base.getTime() + idx * 86400000)))
  }, [lang])

  return (
    <Card
      variant="glass"
      style={{ minWidth: density === 'compact' ? 260 : 300, height, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
    >
      <header className="ui-card__header" style={{ display: 'grid', gap: '0.2rem' }}>
        <div style={{ display: 'grid', gap: '0.2rem' }}>
          <h2 className="ui-card__title">
            {t('brokerfox.calendar.title')}
          </h2>
          <p className="ui-card__subtitle">
            {t('brokerfox.calendar.subtitle')}
          </p>
        </div>
      </header>
      <div style={{ display: 'flex', flexDirection: 'column', gap: density === 'compact' ? '0.45rem' : '0.6rem', flex: 1, minHeight: 0, overflowY: 'auto', paddingRight: 4 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <strong style={{ color: '#0f172a', fontSize: density === 'compact' ? '0.95rem' : '1rem' }}>{monthLabel}</strong>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: density === 'compact' ? '0.12rem' : '0.2rem' }}>
          {weekdayLabels.map((label) => (
            <span key={label} style={{ fontSize: density === 'compact' ? '0.6rem' : '0.7rem', color: '#64748b', textAlign: 'center' }}>{label}</span>
          ))}
          {days.map((day) => {
            const hasEvent = events.some((event) => new Date(event.date).toDateString() === day.toDateString())
            const isSelected = selectedDate?.toDateString() === day.toDateString()
            return (
              <button
                key={day.toISOString()}
                type="button"
                onClick={() => setSelectedDate(day)}
                style={{
                  border: '1px solid #e2e8f0',
                  borderRadius: 8,
                  padding: density === 'compact' ? '0.08rem' : '0.2rem',
                  background: isSelected ? '#0f172a' : '#fff',
                  color: isSelected ? '#fff' : '#0f172a',
                  position: 'relative',
                  fontSize: density === 'compact' ? '0.7rem' : '0.8rem'
                }}
              >
                {day.getDate()}
                {hasEvent ? <span style={{ position: 'absolute', bottom: 4, right: 6, width: density === 'compact' ? 5 : 6, height: density === 'compact' ? 5 : 6, borderRadius: '50%', background: '#f59e0b' }} /> : null}
              </button>
            )
          })}
        </div>

      </div>

      {selectedEvent ? (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.25)',
            display: 'grid',
            placeItems: 'center',
            zIndex: 60
          }}
          onClick={() => setSelectedEvent(null)}
        >
          <div
            style={{ background: '#fff', borderRadius: 16, padding: '1.25rem', width: 'min(520px, 90vw)', boxShadow: '0 18px 50px rgba(15,23,42,0.2)' }}
            onClick={(event) => event.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', marginBottom: '0.75rem' }}>
              <div>
                <strong style={{ fontSize: '1.05rem' }}>{selectedEvent.title}</strong>
                <div style={{ color: '#64748b', fontSize: '0.85rem' }}>
                  {new Intl.DateTimeFormat(lang, { dateStyle: 'full', timeStyle: 'short' }).format(new Date(selectedEvent.date))}
                </div>
              </div>
              <button type="button" onClick={() => setSelectedEvent(null)} style={{ border: '1px solid #e2e8f0', borderRadius: 8, background: '#fff', padding: '0.2rem 0.5rem' }}>✕</button>
            </div>
            <div style={{ display: 'grid', gap: '0.45rem', fontSize: '0.9rem' }}>
              <div><strong>{t('brokerfox.calendar.location')}</strong> {selectedEvent.location ?? t('brokerfox.calendar.locationTbd')}</div>
              <div><strong>{t('brokerfox.calendar.participants')}</strong> {(selectedEvent.participants ?? []).join(', ') || t('brokerfox.calendar.participantsTbd')}</div>
              <div><strong>{t('brokerfox.calendar.description')}</strong> {selectedEvent.description ?? t('brokerfox.calendar.descriptionTbd')}</div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '1rem' }}>
              {selectedEvent.entityType && selectedEvent.entityId ? (
                <Button size="sm" onClick={() => onSelectEvent(selectedEvent)}>{t('brokerfox.calendar.openRelated')}</Button>
              ) : null}
              <Button size="sm" variant="secondary" onClick={() => setSelectedEvent(null)}>{t('brokerfox.actions.cancel')}</Button>
            </div>
          </div>
        </div>
      ) : null}
    </Card>
  )
}
