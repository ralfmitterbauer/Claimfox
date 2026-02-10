import React from 'react'
import Header from '@/components/ui/Header'
import BrokerfoxNav from '@/brokerfox/components/BrokerfoxNav'
type BrokerfoxLayoutProps = {
  title: string
  subtitle?: string
  topRight?: React.ReactNode
  children: React.ReactNode
}

export default function BrokerfoxLayout({ title, subtitle, topRight, children }: BrokerfoxLayoutProps) {
  return (
    <div style={{ width: '100%', maxWidth: 1200, margin: '0 auto', paddingTop: 28, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <BrokerfoxNav />
      {topRight ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 320px', gap: '1.5rem', alignItems: 'start' }}>
          <Header title={title} subtitle={subtitle} titleColor="#0f172a" />
          <div style={{ display: 'grid', gap: '0.75rem' }}>{topRight}</div>
        </div>
      ) : (
        <Header title={title} subtitle={subtitle} titleColor="#0f172a" />
      )}
      {children}
    </div>
  )
}
