import React, { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Header from '@/components/ui/Header'
import { useI18n } from '@/i18n/I18nContext'
import {
  DEMO_CLAIMS,
  loadAssistantClaim,
  loadClaims,
  StoredClaimData
} from '@/data/claimManagerClaims'
import HeroBlockBackground from '@/assets/images/hero_block_1.png'

const CARD_STYLE: React.CSSProperties = {
  background: '#ffffff',
  border: '1px solid #ececec',
  borderRadius: '24px',
  padding: '1.5rem',
  color: '#0e0d1c',
  boxShadow: '0 8px 24px rgba(15, 23, 42, 0.08)'
}

export default function ClaimManagerAppListPage() {
  const { t } = useI18n()
  const navigate = useNavigate()
  const storedClaims = useMemo(() => loadClaims(), [])
  const assistantData = useMemo<StoredClaimData | undefined>(() => loadAssistantClaim(), [])

  const caseList = useMemo(() => {
    if (storedClaims.length) return storedClaims
    if (assistantData) return [assistantData]
    return DEMO_CLAIMS
  }, [assistantData, storedClaims])

  return (
    <section style={{ minHeight: '100vh', width: '100%', color: '#0e0d1c' }}>
      <div
        className="roles-hero"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(7, 20, 74, 0.9) 0%, rgba(11, 45, 122, 0.9) 100%), url(${HeroBlockBackground})`
        }}
      >
        <div className="roles-hero-inner">
          <Header
            title={t('claimManager.app.listHeader.title')}
            subtitle={t('claimManager.app.listHeader.subtitle')}
            subtitleColor="rgba(255,255,255,0.82)"
          />
        </div>
      </div>
      <div style={{ width: '100%', maxWidth: 1200, margin: '0 auto', padding: '32px 1.25rem 4rem' }}>
        <Card style={CARD_STYLE}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <Button
                variant="secondary"
                onClick={() => navigate('/claim-manager')}
                style={{
                  background: '#ffffff',
                  color: '#0e0d1c',
                  borderRadius: '999px',
                  border: '1px solid #d9d9d9',
                  height: '40px',
                  padding: '0 1.25rem',
                  fontWeight: 600
                }}
              >
                {t('header.logout')}
              </Button>
            </div>
            {caseList.length ? (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '640px' }}>
                  <thead>
                    <tr style={{ textAlign: 'left', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                      <th style={{ paddingBottom: '0.6rem', color: '#94a3b8' }}>
                        {t('claimManager.app.caseList.columns.claimNumber')}
                      </th>
                      <th style={{ paddingBottom: '0.6rem', color: '#94a3b8' }}>
                        {t('claimManager.app.caseList.columns.firstName')}
                      </th>
                      <th style={{ paddingBottom: '0.6rem', color: '#94a3b8' }}>
                        {t('claimManager.app.caseList.columns.lastName')}
                      </th>
                      <th style={{ paddingBottom: '0.6rem', color: '#94a3b8' }}>
                        {t('claimManager.app.caseList.columns.licensePlate')}
                      </th>
                      <th style={{ paddingBottom: '0.6rem', color: '#94a3b8' }}>
                        {t('claimManager.app.caseList.columns.date')}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {caseList.map((claim, index) => (
                      <tr
                        key={claim.claimNumber ?? `claim-${index}`}
                        onClick={() =>
                          navigate(`/claim-manager-case/${encodeURIComponent(claim.claimNumber ?? '')}`)
                        }
                        style={{
                          cursor: 'pointer',
                          transition: 'background 0.2s ease',
                          borderTop: '1px solid #f1f5f9'
                        }}
                        onMouseEnter={(event) => {
                          event.currentTarget.style.background = '#f8fafc'
                        }}
                        onMouseLeave={(event) => {
                          event.currentTarget.style.background = 'transparent'
                        }}
                      >
                        <td style={{ padding: '0.8rem 0.3rem', color: '#0e0d1c', fontWeight: 600 }}>
                          {claim.claimNumber || '—'}
                        </td>
                        <td style={{ padding: '0.8rem 0.3rem', color: '#64748b' }}>
                          {claim.firstName || '—'}
                        </td>
                        <td style={{ padding: '0.8rem 0.3rem', color: '#64748b' }}>
                          {claim.lastName || '—'}
                        </td>
                        <td style={{ padding: '0.8rem 0.3rem', color: '#64748b' }}>
                          {claim.licensePlate || '—'}
                        </td>
                        <td style={{ padding: '0.8rem 0.3rem', color: '#64748b' }}>
                          {claim.incidentTime || '—'}
                        </td>
                      </tr>
                    ))}
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
      </div>
    </section>
  )
}
