import type { AIRepairCheckResult, PartnerCase, Subrogation } from '@/partnerfox/types'

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value))
}

export function computeRecoveryProbability(liabilityClear: boolean, disputeRiskFactor: number, evidenceStrength: number) {
  const score = (liabilityClear ? 0.8 : 0.45) - disputeRiskFactor + evidenceStrength
  return clamp(Number(score.toFixed(2)), 0.05, 0.96)
}

export function runRepairAiCheck(item: PartnerCase): AIRepairCheckResult {
  const laborDeviation = Number(((item.estimatedCost % 1700) / 1000).toFixed(2))
  const partsMarkup = Number(((item.estimatedCost % 1200) / 1000).toFixed(2))
  const anomalyFlags = item.status === 'WaitingParts' ? 2 : item.status === 'RentalActive' ? 1 : 0
  const plausibilityScore = clamp(Math.round(100 - laborDeviation * 10 - partsMarkup * 8 - anomalyFlags * 12), 8, 97)
  const confidence = clamp(Math.round(74 + (item.aiApproved ? 11 : 4) - anomalyFlags * 3), 55, 95)

  return {
    plausibilityScore,
    confidence,
    recommendation: plausibilityScore >= 66 ? 'approve' : 'manual-review',
    anomalies: [
      laborDeviation > 0.9 ? 'Labor hours exceed benchmark range' : 'Labor hours within expected range',
      partsMarkup > 0.85 ? 'Parts markup above network median' : 'Parts pricing aligned with network median',
      anomalyFlags > 0 ? 'Workflow anomaly flags detected' : 'No workflow anomaly flags'
    ],
    evidenceRefs: ['Workshop benchmark matrix', 'Parts catalog comparison', 'Case workflow audit trail']
  }
}

export function buildSubrogationRecommendation(item: Subrogation) {
  const projected = Math.round(item.claimAmount * item.recoveryProbability)
  return {
    projectedRecovery: projected,
    stage: item.recoveryProbability > 0.7 ? 'Fast-track negotiation' : item.recoveryProbability > 0.5 ? 'Standard negotiation' : 'Manual legal review'
  }
}
