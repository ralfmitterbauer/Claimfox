import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '@/components/ui/Card'
import ClaimsfoxLayout from '@/claimsfox/components/ClaimsfoxLayout'
import { useI18n } from '@/i18n/I18nContext'
import { useTenantContext } from '@/brokerfox/hooks/useTenantContext'
import { listClaims } from '@/claimsfox/api/claimsfoxApi'
import type { Claim } from '@/claimsfox/types'

export default function ClaimsfoxClaimsPage() {
  const { t } = useI18n()
  const ctx = useTenantContext()
  const navigate = useNavigate()
  const [claims, setClaims] = useState<Claim[]>([])
  const [status, setStatus] = useState('all')
  const [lob, setLob] = useState('all')
  const [search, setSearch] = useState('')

  useEffect(() => {
    let mounted = true
    async function load() {
      const data = await listClaims(ctx)
      if (!mounted) return
      setClaims(data)
    }
    load()
    return () => { mounted = false }
  }, [ctx])

  const lobOptions = useMemo(() => {
    return Array.from(new Set(claims.map((claim) => claim.lineOfBusiness)))
  }, [claims])

  const filtered = useMemo(() => {
    return claims.filter((claim) => {
      if (status !== 'all' && claim.status !== status) return false
      if (lob !== 'all' && claim.lineOfBusiness !== lob) return false
      const query = search.trim().toLowerCase()
      if (!query) return true
      return [claim.claimNumber, claim.insured, claim.policyRef].some((field) => field.toLowerCase().includes(query))
    })
  }, [claims, status, lob, search])

  return (
    <ClaimsfoxLayout title={t('claimsfox.claims.title')} subtitle={t('claimsfox.claims.subtitle')}>
      <Card>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1rem' }}>
          <label style={{ display: 'grid', gap: '0.35rem', fontSize: '0.85rem', color: '#64748b' }}>
            {t('claimsfox.filters.status')}
            <select value={status} onChange={(event) => setStatus(event.target.value)} style={{ padding: '0.5rem', borderRadius: 10, border: '1px solid #e2e8f0' }}>
              <option value="all">{t('claimsfox.filters.all')}</option>
              <option value="intake">{t('claimsfox.status.intake')}</option>
              <option value="triage">{t('claimsfox.status.triage')}</option>
              <option value="investigation">{t('claimsfox.status.investigation')}</option>
              <option value="settlement">{t('claimsfox.status.settlement')}</option>
              <option value="closed">{t('claimsfox.status.closed')}</option>
              <option value="denied">{t('claimsfox.status.denied')}</option>
            </select>
          </label>
          <label style={{ display: 'grid', gap: '0.35rem', fontSize: '0.85rem', color: '#64748b' }}>
            {t('claimsfox.filters.lob')}
            <select value={lob} onChange={(event) => setLob(event.target.value)} style={{ padding: '0.5rem', borderRadius: 10, border: '1px solid #e2e8f0' }}>
              <option value="all">{t('claimsfox.filters.all')}</option>
              {lobOptions.map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
          </label>
          <label style={{ display: 'grid', gap: '0.35rem', fontSize: '0.85rem', color: '#64748b', flex: 1, minWidth: 220 }}>
            {t('claimsfox.filters.search')}
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={t('claimsfox.filters.searchPlaceholder')}
              style={{ padding: '0.55rem 0.75rem', borderRadius: 10, border: '1px solid #e2e8f0' }}
            />
          </label>
        </div>
        <div style={{ display: 'grid', gap: '0.6rem' }}>
          {filtered.map((claim) => (
            <button
              key={claim.id}
              type="button"
              onClick={() => navigate(`/claimsfox/claims/${claim.id}`)}
              style={{
                display: 'grid',
                gridTemplateColumns: '1.3fr 1fr 0.8fr 0.7fr 0.7fr',
                gap: '0.5rem',
                alignItems: 'center',
                border: '1px solid #e2e8f0',
                borderRadius: 12,
                padding: '0.75rem 1rem',
                background: '#fff',
                color: '#0f172a',
                textAlign: 'left',
                cursor: 'pointer'
              }}
            >
              <div>
                <div style={{ fontWeight: 600 }}>{claim.claimNumber}</div>
                <div style={{ fontSize: '0.85rem', color: '#64748b' }}>{claim.insured}</div>
              </div>
              <div style={{ fontSize: '0.9rem' }}>{claim.lineOfBusiness}</div>
              <div style={{ fontSize: '0.85rem', color: '#64748b' }}>{claim.policyRef}</div>
              <div style={{ fontSize: '0.85rem', color: '#0f172a', fontWeight: 600 }}>{t(`claimsfox.status.${claim.status}`)}</div>
              <div style={{ fontSize: '0.85rem', color: '#64748b' }}>{new Date(claim.slaDueAt).toLocaleDateString()}</div>
            </button>
          ))}
        </div>
      </Card>
    </ClaimsfoxLayout>
  )
}
