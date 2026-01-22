import React from 'react'
import { formatMoneyCompactEUR, formatMoneyExactEUR } from '@/lib/format'

type Props = {
  label: string
  value?: number
  locale: string
  note?: string
  onInfo?: () => void
  isPercent?: boolean
  isCount?: boolean
}

export default function KpiCard({ label, value, locale, note, onInfo, isPercent, isCount }: Props) {
  const formattedValue = value === undefined
    ? 'TBD'
    : isCount
      ? new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }).format(value)
    : isPercent
      ? new Intl.NumberFormat(locale, { style: 'percent', maximumFractionDigits: 2 }).format(value)
        : formatMoneyCompactEUR(value, locale)

  const fullValue = value === undefined
    ? undefined
    : isCount
      ? new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }).format(value)
    : isPercent
      ? new Intl.NumberFormat(locale, { style: 'percent', maximumFractionDigits: 2 }).format(value)
        : formatMoneyExactEUR(value, locale)

  return (
    <article className="ix-card ix-kpi-card" aria-label={label}>
      <div className="ix-kpi-header">
        <p>{label}</p>
        {onInfo && (
          <button type="button" className="ix-icon-btn" onClick={onInfo} aria-label="Source">
            i
          </button>
        )}
      </div>
      <div className="ix-kpi-value" title={fullValue}>{formattedValue}</div>
      {note && <div className="ix-kpi-note">{note}</div>}
    </article>
  )
}
