import React from 'react'
import DotsPattern from '@/components/DotsPattern'
import KpiPills from '@/components/KpiPills'
import ExportButtons from '@/components/ExportButtons'

type Props = {
  title: string
  subtitle: string
  locale: string
  pills: { label: string; value: number }[]
  region: 'DE' | 'EU'
  onRegionChange: (region: 'DE' | 'EU') => void
  onExport: (type: 'kpi' | 'table' | 'sources') => void
  imageUrl: string
}

export default function HeroSplit({
  title,
  subtitle,
  locale,
  pills,
  region,
  onRegionChange,
  onExport,
  imageUrl
}: Props) {
  return (
    <section className="enterprise-hero">
      <DotsPattern className="hero-dots" />
      <DotsPattern className="hero-dots bottom" />
      <div>
        <span className="badge">Investor & Carrier-grade</span>
        <h1>{title}</h1>
        <p>{subtitle}</p>
        <KpiPills locale={locale} pills={pills} />
        <div className="hero-actions">
          <button
            type="button"
            className={`hero-toggle ${region === 'DE' ? 'is-active' : ''}`}
            onClick={() => onRegionChange('DE')}
            aria-pressed={region === 'DE'}
          >
            Germany
          </button>
          <button
            type="button"
            className={`hero-toggle ${region === 'EU' ? 'is-active' : ''}`}
            onClick={() => onRegionChange('EU')}
            aria-pressed={region === 'EU'}
          >
            Europe
          </button>
          <ExportButtons onExport={onExport} />
        </div>
      </div>
      <div className="hero-visual">
        <img src={imageUrl} alt="" />
      </div>
    </section>
  )
}
