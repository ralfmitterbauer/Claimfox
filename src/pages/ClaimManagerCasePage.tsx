import React, { useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ClaimManagerPage from '@/pages/ClaimManagerPage'
import {
  DEMO_CLAIMS,
  loadAssistantClaim,
  loadStoredClaimsRaw,
  StoredClaimData
} from '@/data/claimManagerClaims'
import Header from '@/components/ui/Header'
import HeroBlockBackground from '@/assets/images/hero_block_1.png'
import { useI18n } from '@/i18n/I18nContext'

export default function ClaimManagerCasePage() {
  const navigate = useNavigate()
  const { t } = useI18n()
  const { claimNumber } = useParams()
  const storedClaims = useMemo(() => loadStoredClaimsRaw(), [])
  const assistantData = useMemo<StoredClaimData | undefined>(() => loadAssistantClaim(), [])

  const caseList = useMemo(() => {
    const combined = [...DEMO_CLAIMS, ...storedClaims]
    if (assistantData) {
      combined.unshift(assistantData)
    }
    const seen = new Set<string>()
    return combined.filter((claim) => {
      const id = claim.claimNumber || ''
      if (!id || seen.has(id)) return false
      seen.add(id)
      return true
    })
  }, [assistantData, storedClaims])

  const resolvedClaimNumber = claimNumber ? decodeURIComponent(claimNumber) : null
  const selectedClaim =
    caseList.find((claim) => claim.claimNumber && claim.claimNumber === resolvedClaimNumber) ?? caseList[0]

  return (
    <>
      <div
        className="roles-hero"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(7, 20, 74, 0.9) 0%, rgba(11, 45, 122, 0.9) 100%), url(${HeroBlockBackground})`
        }}
      >
        <div className="roles-hero-inner">
          <Header
            title={t('claimManager.app.caseHeader.title')}
            subtitle={t('claimManager.app.caseHeader.subtitle')}
            subtitleColor="rgba(255,255,255,0.82)"
          />
        </div>
      </div>
      <ClaimManagerPage
        assistantData={selectedClaim}
        fullWidth
        onBack={() => navigate('/claim-manager-app')}
      />
    </>
  )
}
