import React, { useEffect } from 'react'
import { LeadItem } from '@/data/leads'
import { formatMoneyCompactEUR, formatMoneyExactEUR, formatPercent } from '@/lib/format'
import { markets } from '@/data/markets'

type Props = {
  lead?: LeadItem
  locale: string
  onClose: () => void
}

export default function LeadDrawer({ lead, locale, onClose }: Props) {
  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  if (!lead) return null

  const exposureDE = lead.shareDE * markets.DE
  const exposureEU = lead.shareEU * markets.EU
  const methodologyNote =
    lead.category === 'Operator'
      ? 'Operators = Direct exposure (asset-based).'
      : lead.category === 'Platform'
        ? 'Platforms = Indirect exposure (platform-based).'
        : 'Brokers = Brokered/structured exposure.'

  return (
    <>
      <div className="drawer-backdrop" onClick={onClose} />
      <aside className="drawer" aria-live="polite">
        <header>
          <div>
            <h3>{lead.name}</h3>
            <span className="badge">{lead.category}</span>
          </div>
          <button type="button" className="filter-chip" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </header>
        <div className="card" style={{ marginTop: '1rem' }}>
          <h4>Exposure</h4>
          <p>{formatMoneyCompactEUR(exposureDE, locale)} (DE)</p>
          <p>{formatMoneyCompactEUR(exposureEU, locale)} (EU)</p>
          <p title={formatMoneyExactEUR(exposureDE, locale)}>Exact DE: {formatMoneyExactEUR(exposureDE, locale)}</p>
          <p title={formatMoneyExactEUR(exposureEU, locale)}>Exact EU: {formatMoneyExactEUR(exposureEU, locale)}</p>
          <p>Share DE: {formatPercent(lead.shareDE, locale)}</p>
          <p>Share EU: {formatPercent(lead.shareEU, locale)}</p>
        </div>
        <div className="card" style={{ marginTop: '1rem' }}>
          <h4>Methodology note</h4>
          <p>{methodologyNote}</p>
          <p className="disclaimer">
            Model-based estimate; exposure ≠ premium ≠ revenue.
          </p>
        </div>
        <div className="card" style={{ marginTop: '1rem' }}>
          <h4>Sources & assumptions</h4>
          <ul>
            <li>Source: TBD</li>
            <li>Assumptions: market share inputs</li>
          </ul>
        </div>
      </aside>
    </>
  )
}
