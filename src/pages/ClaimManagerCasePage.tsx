import React, { useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ClaimManagerPage from '@/pages/ClaimManagerPage'
import {
  DEMO_CLAIMS,
  loadAssistantClaim,
  loadClaims,
  StoredClaimData
} from '@/data/claimManagerClaims'

export default function ClaimManagerCasePage() {
  const navigate = useNavigate()
  const { claimNumber } = useParams()
  const storedClaims = useMemo(() => loadClaims(), [])
  const assistantData = useMemo<StoredClaimData | undefined>(() => loadAssistantClaim(), [])

  const caseList = useMemo(() => {
    if (storedClaims.length) return storedClaims
    if (assistantData) return [assistantData]
    return DEMO_CLAIMS
  }, [assistantData, storedClaims])

  const resolvedClaimNumber = claimNumber ? decodeURIComponent(claimNumber) : null
  const selectedClaim =
    caseList.find((claim) => claim.claimNumber && claim.claimNumber === resolvedClaimNumber) ?? caseList[0]

  return (
    <ClaimManagerPage
      assistantData={selectedClaim}
      fullWidth
      onBack={() => navigate('/claim-manager-app')}
    />
  )
}
