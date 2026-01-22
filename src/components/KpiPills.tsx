import React from 'react'
import { formatMoneyCompactEUR } from '@/lib/format'

type Pill = {
  label: string
  value: number
  format?: 'money' | 'count'
}

type Props = {
  locale: string
  pills: Pill[]
}

export default function KpiPills({ locale, pills }: Props) {
  return (
    <div className="kpi-pills" role="list">
      {pills.map((pill) => (
        <div key={pill.label} className="kpi-pill" role="listitem">
          <span>{pill.label}</span>
          <strong>
            {pill.format === 'count'
              ? new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }).format(pill.value)
              : formatMoneyCompactEUR(pill.value, locale)}
          </strong>
        </div>
      ))}
    </div>
  )
}
