import React from 'react'
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { formatMoneyCompactEUR } from '@/lib/format'

type Datum = {
  label: string
  value: number
}

type Props = {
  data: Datum[]
  locale: string
}

export default function ChartsGermanyVsEurope({ data, locale }: Props) {
  return (
    <div className="card">
      <h3>Germany vs Europe scale</h3>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data} margin={{ left: 12, right: 12 }}>
          <XAxis dataKey="label" />
          <YAxis hide />
          <Tooltip formatter={(value: number) => formatMoneyCompactEUR(value, locale)} />
          <Bar dataKey="value" fill="var(--ix-chart-2)" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
