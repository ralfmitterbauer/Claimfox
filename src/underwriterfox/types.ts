export type UnderwritingCaseStatus = 'intake' | 'screening' | 'manualReview' | 'offer' | 'bound' | 'declined'

export type UnderwritingCase = {
  id: string
  tenantId: string
  caseNumber: string
  productLine: string
  segment: string
  status: UnderwritingCaseStatus
  broker: string
  insured: string
  inceptionDate: string
  expiryDate: string
  premium: {
    base: number
    adjustments: Array<{ label: string; amount: number }>
    total: number
  }
  risk: {
    score: number
    confidence: number
    factors: string[]
  }
  decision?: {
    status: 'approved' | 'declined' | 'referred'
    rationale: string
    decidedAt: string
    decidedBy: string
  }
  createdAt: string
}

export type CaseDocument = {
  id: string
  tenantId: string
  caseId: string
  name: string
  type: string
  size: number
  uploadedAt: string
  extractedText: string
  extractedFields: Record<string, string>
  status: 'extracted' | 'needsReview' | 'approved'
}

export type RuleHit = {
  ruleId: string
  name: string
  outcome: 'pass' | 'warn' | 'fail'
  severity: 'low' | 'medium' | 'high'
}

export type RatingSnapshot = {
  version: string
  inputs: Record<string, string | number>
  outputs: Record<string, string | number>
}

export type AiRecommendation = {
  summary: string
  recommendedDecision: 'approve' | 'decline' | 'refer'
  bullets: string[]
  confidence: number
}

export type TimelineEvent = {
  id: string
  tenantId: string
  entityType: 'case' | 'document' | 'rule' | 'rating'
  entityId: string
  type: 'statusUpdate' | 'internalNote' | 'externalMessage' | 'system'
  title: string
  message: string
  createdAt: string
  actor: string
}

export type UnderwriterfoxTenantContext = {
  tenantId: string
  userId: string
}
