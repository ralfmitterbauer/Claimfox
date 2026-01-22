import React from 'react'

type Props = {
  onExport: (type: 'kpi' | 'table' | 'sources') => void
}

export default function ExportButtons({ onExport }: Props) {
  return (
    <>
      <button type="button" className="hero-export" onClick={() => onExport('kpi')}>
        Export KPIs
      </button>
      <button type="button" className="hero-export" onClick={() => onExport('table')}>
        Export Table
      </button>
      <button type="button" className="hero-export" onClick={() => onExport('sources')}>
        Export Sources
      </button>
    </>
  )
}
