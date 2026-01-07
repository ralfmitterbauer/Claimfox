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
            background: '#ffffff',
            border: '1px solid #ececec',
            borderRadius: '24px',
            padding: '1.5rem',
            color: '#0e0d1c',
            boxShadow: '0 8px 24px rgba(15, 23, 42, 0.08)'
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <h2 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 600 }}>
                {t('claimManager.app.caseList.title')}
              </h2>
              <p style={{ margin: '0.35rem 0 0', color: '#64748b' }}>
                {t('claimManager.app.caseList.subtitle')}
              </p>
            </div>
            {caseList.length ? (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '520px' }}>
                  <thead>
                    <tr style={{ textAlign: 'left', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                      <th style={{ paddingBottom: '0.5rem', color: '#94a3b8' }}>
                        {t('claimManager.app.caseList.columns.claimNumber')}
                      </th>
                      <th style={{ paddingBottom: '0.5rem', color: '#94a3b8' }}>
                        {t('claimManager.app.caseList.columns.firstName')}
                      </th>
                      <th style={{ paddingBottom: '0.5rem', color: '#94a3b8' }}>
                        {t('claimManager.app.caseList.columns.lastName')}
                      </th>
                      <th style={{ paddingBottom: '0.5rem', color: '#94a3b8' }}>
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
                            background: isSelected ? '#f1f5f9' : 'transparent'
                          }}
                        >
                          <td style={{ padding: '0.65rem 0.3rem', color: '#0e0d1c', fontWeight: 600 }}>
                            {claim.claimNumber || '—'}
                          </td>
                          <td style={{ padding: '0.65rem 0.3rem', color: '#64748b' }}>
                            {claim.firstName || '—'}
                          </td>
                          <td style={{ padding: '0.65rem 0.3rem', color: '#64748b' }}>
                            {claim.lastName || '—'}
                          </td>
                          <td style={{ padding: '0.65rem 0.3rem', color: '#64748b' }}>
                            {claim.licensePlate || '—'}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <p style={{ margin: 0, color: '#64748b' }}>
                {t('claimManager.app.caseList.empty')}
              </p>
            )}
          </div>
        </Card>
      }
    />
  )
}
