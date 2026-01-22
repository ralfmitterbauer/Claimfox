import React from 'react'
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { formatMoneyCompactEUR } from '@/lib/format'

type Datum = {
  name: string
  value: number
}

type Props = {
  data: Datum[]
  locale: string
}

export default function ChartsTopLeads({ data, locale }: Props) {
  return (
    <div className="card">
      <h3>Top Leads by Exposure</h3>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data} layout="vertical" margin={{ left: 12, right: 12 }}>
          <XAxis type="number" hide />
          <YAxis dataKey="name" type="category" width={140} />
          <Tooltip formatter={(value: number) => formatMoneyCompactEUR(value, locale)} />
          <Bar dataKey="value" fill="var(--ix-chart-1)" radius={[6, 6, 6, 6]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
