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
}

export default function CalendarWidget({ events, onAddEvent, onSelectEvent }: CalendarWidgetProps) {
  const { lang, t } = useI18n()
  const [activeMonth, setActiveMonth] = useState(() => new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [isAdding, setIsAdding] = useState(false)
  const [newEvent, setNewEvent] = useState({ title: '', date: '' })

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

  function handleSubmit() {
    if (!newEvent.title.trim() || !newEvent.date) return
    onAddEvent({ title: newEvent.title.trim(), date: newEvent.date })
    setNewEvent({ title: '', date: '' })
    setIsAdding(false)
  }

  return (
    <Card variant="glass" title={t('brokerfox.calendar.title')} subtitle={t('brokerfox.calendar.subtitle')} style={{ minWidth: 300 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
        <strong style={{ color: '#0f172a' }}>{monthLabel}</strong>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button type="button" onClick={() => setActiveMonth(new Date(activeMonth.getFullYear(), activeMonth.getMonth() - 1, 1))} style={{ border: '1px solid #e2e8f0', borderRadius: 6, padding: '0.2rem 0.5rem', background: '#fff' }}>
            ‹
          </button>
          <button type="button" onClick={() => setActiveMonth(new Date(activeMonth.getFullYear(), activeMonth.getMonth() + 1, 1))} style={{ border: '1px solid #e2e8f0', borderRadius: 6, padding: '0.2rem 0.5rem', background: '#fff' }}>
            ›
          </button>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '0.25rem', marginBottom: '0.5rem' }}>
        {weekdayLabels.map((label) => (
          <span key={label} style={{ fontSize: '0.7rem', color: '#64748b', textAlign: 'center' }}>{label}</span>
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
                padding: '0.25rem',
                background: isSelected ? '#0f172a' : '#fff',
                color: isSelected ? '#fff' : '#0f172a',
                position: 'relative'
              }}
            >
              {day.getDate()}
              {hasEvent ? <span style={{ position: 'absolute', bottom: 4, right: 6, width: 6, height: 6, borderRadius: '50%', background: '#f59e0b' }} /> : null}
            </button>
          )
        })}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
        <strong style={{ color: '#0f172a' }}>{t('brokerfox.calendar.upcoming')}</strong>
        <Button onClick={() => setIsAdding((prev) => !prev)}>{t('brokerfox.calendar.addEvent')}</Button>
      </div>

      {isAdding ? (
        <div style={{ display: 'grid', gap: '0.5rem', marginBottom: '0.75rem' }}>
          <input
            value={newEvent.title}
            onChange={(event) => setNewEvent((prev) => ({ ...prev, title: event.target.value }))}
            placeholder={t('brokerfox.calendar.eventTitle')}
            style={{ padding: '0.5rem 0.6rem', borderRadius: 8, border: '1px solid #d6d9e0' }}
          />
          <input
            type="date"
            value={newEvent.date}
            onChange={(event) => setNewEvent((prev) => ({ ...prev, date: event.target.value }))}
            style={{ padding: '0.5rem 0.6rem', borderRadius: 8, border: '1px solid #d6d9e0' }}
          />
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <Button onClick={handleSubmit}>{t('brokerfox.actions.save')}</Button>
            <Button variant="secondary" onClick={() => setIsAdding(false)}>{t('brokerfox.actions.cancel')}</Button>
          </div>
        </div>
      ) : null}

      {filteredEvents.length === 0 ? <p style={{ margin: 0, color: '#64748b' }}>{t('brokerfox.calendar.empty')}</p> : null}
      {filteredEvents.map((event) => (
        <button
          key={event.id}
          type="button"
          onClick={() => onSelectEvent(event)}
          style={{ display: 'block', width: '100%', textAlign: 'left', padding: '0.4rem 0', border: 'none', background: 'transparent', color: '#0f172a' }}
        >
          <strong>{event.title}</strong>
          <div style={{ color: '#64748b', fontSize: '0.85rem' }}>{new Intl.DateTimeFormat(lang, { dateStyle: 'medium' }).format(new Date(event.date))}</div>
        </button>
      ))}
    </Card>
  )
}
