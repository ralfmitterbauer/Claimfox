import React, { useMemo } from 'react'
import ClaimManagerPage from '@/pages/ClaimManagerPage'

const STORAGE_KEY = 'claimfox_claim_assistant'

type StoredClaimData = {
  claimNumber?: string
  incidentTime?: string
  address?: string
  description?: string
  photoCount?: number
  mediaItems?: Array<{ type: 'image' | 'video'; src: string }>
}

export default function ClaimManagerCasePage() {
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

  return <ClaimManagerPage assistantData={assistantData} />
}
