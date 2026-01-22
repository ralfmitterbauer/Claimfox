import { LeadItem } from '@/data/leads'
import { markets } from '@/data/markets'

export function calcExposure(market: number, share: number) {
  return market * share
}

export function buildLeadMetrics(leads: LeadItem[]) {
  return leads.map((lead) => ({
    ...lead,
    exposureDE: calcExposure(markets.DE, lead.shareDE),
    exposureEU: calcExposure(markets.EU, lead.shareEU)
  }))
}
