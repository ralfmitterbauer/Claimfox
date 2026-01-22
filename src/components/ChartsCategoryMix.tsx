import React from 'react'
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

type Datum = {
  label: string
  direct: number
  indirect: number
  brokered: number
}

type Props = {
  data: Datum[]
}

export default function ChartsCategoryMix({ data }: Props) {
  return (
    <div className="card">
      <h3>Risk Mix by Category</h3>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data} margin={{ left: 12, right: 12 }}>
          <XAxis dataKey="label" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="direct" stackId="mix" fill="var(--ix-chart-1)" />
          <Bar dataKey="indirect" stackId="mix" fill="var(--ix-chart-2)" />
          <Bar dataKey="brokered" stackId="mix" fill="var(--ix-chart-3)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
