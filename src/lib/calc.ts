import { LeadItem } from '@/data/leads'
import { markets } from '@/data/markets'

export type LeadRow = LeadItem & {
  exposureDE: number
  exposureEU: number
}

export function calcExposure(market: number, share: number) {
  return market * share
}

export function buildLeadRows(leads: LeadItem[]) {
  const rows: LeadRow[] = leads.map((lead) => ({
    ...lead,
    exposureDE: calcExposure(markets.DE, lead.shareDE),
    exposureEU: calcExposure(markets.EU, lead.shareEU)
  }))

  rows.sort((a, b) => b.exposureEU - a.exposureEU)

  const totals = rows.reduce(
    (acc, row) => {
      acc.exposureDE += row.exposureDE
      acc.exposureEU += row.exposureEU
      return acc
    },
    { exposureDE: 0, exposureEU: 0 }
  )

  return { rows, totals }
}
