import React from 'react'
import { LeadItem } from '@/data/leads'
import { formatMoneyCompactEUR, formatPercent } from '@/lib/format'
import { markets } from '@/data/markets'

type Props = {
  leads: LeadItem[]
  locale: string
  onSelect: (lead: LeadItem) => void
}

export default function LeadsTable({ leads, locale, onSelect }: Props) {
  return (
    <div className="card table-card">
      <table className="enterprise-table">
        <thead>
          <tr>
            <th>Lead</th>
            <th>Category</th>
            <th className="num">Exposure DE</th>
            <th className="num">Exposure EU</th>
            <th className="num">Share DE</th>
            <th className="num">Share EU</th>
            <th>Exposure Type</th>
            <th aria-label="Details" />
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead.id}>
              <td>{lead.name}</td>
              <td>{lead.category}</td>
              <td className="num">{formatMoneyCompactEUR(lead.shareDE * markets.DE, locale)}</td>
              <td className="num">{formatMoneyCompactEUR(lead.shareEU * markets.EU, locale)}</td>
              <td className="num">{formatPercent(lead.shareDE, locale)}</td>
              <td className="num">{formatPercent(lead.shareEU, locale)}</td>
              <td>{lead.exposureType}</td>
              <td>
                <button type="button" className="filter-chip" onClick={() => onSelect(lead)}>
                  i
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
