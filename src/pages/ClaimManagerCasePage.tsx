import React, { useMemo, useState } from 'react'
import ClaimManagerPage from '@/pages/ClaimManagerPage'
import Card from '@/components/ui/Card'
import { useI18n } from '@/i18n/I18nContext'

const STORAGE_KEY = 'claimfox_claim_assistant'
const CLAIMS_LIST_KEY = 'claimfox_claims_list'

type StoredClaimData = {
  claimNumber?: string
  firstName?: string
  lastName?: string
  licensePlate?: string
  incidentTime?: string
  address?: string
  description?: string
  photoCount?: number
  mediaItems?: Array<{ type: 'image' | 'video'; src: string }>
}

function loadClaims() {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(CLAIMS_LIST_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as StoredClaimData[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export default function ClaimManagerCasePage() {
  const { t } = useI18n()
  const initialClaims = useMemo(() => loadClaims(), [])
  const [claims] = useState<StoredClaimData[]>(initialClaims)
  const [selectedClaimNumber, setSelectedClaimNumber] = useState<string | null>(
    initialClaims[0]?.claimNumber ?? null
  )

  const assistantData = useMemo<StoredClaimData | undefined>(() => {
    if (typeof window === 'undefined') return undefined
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY)
      if (!raw) return undefined
      return JSON.parse(raw) as StoredClaimData
    } catch {
      return undefined
    }
  }, [])

  const caseList = claims.length ? claims : assistantData ? [assistantData] : []
  const selectedClaim =
    caseList.find((claim) => claim.claimNumber && claim.claimNumber === selectedClaimNumber) ?? caseList[0]

  return (
    <ClaimManagerPage
      assistantData={selectedClaim}
      caseList={
        <Card
          style={{
            background: 'rgba(255,255,255,0.1)',
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: '24px',
            padding: '1.5rem',
            color: 'rgba(255,255,255,0.92)',
            backdropFilter: 'blur(18px)',
            boxShadow: '0 18px 50px rgba(0,0,0,0.35)'
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <h2 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 600 }}>
                {t('claimManager.app.caseList.title')}
              </h2>
              <p style={{ margin: '0.35rem 0 0', color: 'rgba(255,255,255,0.7)' }}>
                {t('claimManager.app.caseList.subtitle')}
              </p>
            </div>
            {caseList.length ? (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '520px' }}>
                  <thead>
                    <tr style={{ textAlign: 'left', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                      <th style={{ paddingBottom: '0.5rem', color: 'rgba(255,255,255,0.6)' }}>
                        {t('claimManager.app.caseList.columns.claimNumber')}
                      </th>
                      <th style={{ paddingBottom: '0.5rem', color: 'rgba(255,255,255,0.6)' }}>
                        {t('claimManager.app.caseList.columns.firstName')}
                      </th>
                      <th style={{ paddingBottom: '0.5rem', color: 'rgba(255,255,255,0.6)' }}>
                        {t('claimManager.app.caseList.columns.lastName')}
                      </th>
                      <th style={{ paddingBottom: '0.5rem', color: 'rgba(255,255,255,0.6)' }}>
                        {t('claimManager.app.caseList.columns.licensePlate')}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {caseList.map((claim, index) => {
                      const isSelected = claim.claimNumber && claim.claimNumber === selectedClaimNumber
                      return (
                        <tr
                          key={claim.claimNumber ?? `claim-${index}`}
                          onClick={() => setSelectedClaimNumber(claim.claimNumber ?? null)}
                          style={{
                            cursor: 'pointer',
                            background: isSelected ? 'rgba(255,255,255,0.12)' : 'transparent'
                          }}
                        >
                          <td style={{ padding: '0.65rem 0.3rem', color: 'rgba(255,255,255,0.9)', fontWeight: 600 }}>
                            {claim.claimNumber || '—'}
                          </td>
                          <td style={{ padding: '0.65rem 0.3rem', color: 'rgba(255,255,255,0.75)' }}>
                            {claim.firstName || '—'}
                          </td>
                          <td style={{ padding: '0.65rem 0.3rem', color: 'rgba(255,255,255,0.75)' }}>
                            {claim.lastName || '—'}
                          </td>
                          <td style={{ padding: '0.65rem 0.3rem', color: 'rgba(255,255,255,0.75)' }}>
                            {claim.licensePlate || '—'}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <p style={{ margin: 0, color: 'rgba(255,255,255,0.7)' }}>
                {t('claimManager.app.caseList.empty')}
              </p>
            )}
          </div>
        </Card>
      }
    />
  )
}
