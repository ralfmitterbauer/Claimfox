import React from 'react'

export function ResponsiveContainer({ children }: { children: React.ReactNode }) {
  return <div style={{ width: '100%', height: '100%' }}>{children}</div>
}

export function LineChart({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>
}

export function BarChart({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>
}

export function PieChart({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>
}

export function Line() {
  return null
}

export function Bar() {
  return null
}

export function Pie() {
  return null
}

export function XAxis() {
  return null
}

export function YAxis() {
  return null
}

export function Tooltip() {
  return null
}

export function CartesianGrid() {
  return null
}
