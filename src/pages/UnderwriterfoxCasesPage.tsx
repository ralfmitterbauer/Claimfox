import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '@/components/ui/Card'
import UnderwriterfoxLayout from '@/underwriterfox/components/UnderwriterfoxLayout'
import { useI18n } from '@/i18n/I18nContext'
import { useTenantContext } from '@/brokerfox/hooks/useTenantContext'
import { listCases } from '@/underwriterfox/api/underwriterfoxApi'
import type { UnderwritingCase } from '@/underwriterfox/types'

export default function UnderwriterfoxCasesPage() {
  const { t } = useI18n()
  const navigate = useNavigate()
  const tenant = useTenantContext()
  const ctx = { tenantId: tenant.tenantId, userId: tenant.userId }
  const [cases, setCases] = useState<UnderwritingCase[]>([])
  const [status, setStatus] = useState('all')
  const [productLine, setProductLine] = useState('all')
  const [query, setQuery] = useState('')

  useEffect(() => {
    let mounted = true
    async function load() {
      const data = await listCases(ctx)
      if (!mounted) return
      setCases(data)
    }
    load()
    return () => { mounted = false }
  }, [ctx.tenantId])

  const filtered = useMemo(() => {
    return cases.filter((item) => {
      if (status !== 'all' && item.status !== status) return false
      if (productLine !== 'all' && item.productLine !== productLine) return false
      if (query && !(`${item.caseNumber} ${item.insured} ${item.broker}`.toLowerCase().includes(query.toLowerCase()))) return false
      return true
    })
  }, [cases, status, productLine, query])

  const productOptions = Array.from(new Set(cases.map((item) => item.productLine)))

  return (
    <section className="page" style={{ gap: '1.5rem' }}>
      <UnderwriterfoxLayout title={t('underwriterfox.cases.title')} subtitle={t('underwriterfox.cases.subtitle')}>
        <Card variant="glass" title={t('underwriterfox.cases.title')} subtitle={t('underwriterfox.cases.subtitle')}>
          <div style={{ display: 'grid', gap: '0.75rem', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))' }}>
            <label style={{ display: 'grid', gap: '0.25rem', fontSize: '0.85rem' }}>
              {t('underwriterfox.cases.filterStatus')}
              <select value={status} onChange={(event) => setStatus(event.target.value)} style={{ padding: '0.5rem 0.75rem', borderRadius: 10, border: '1px solid #d6d9e0' }}>
                <option value="all">{t('underwriterfox.cases.filterAllStatus')}</option>
                <option value="intake">{t('underwriterfox.status.intake')}</option>
                <option value="screening">{t('underwriterfox.status.screening')}</option>
                <option value="manualReview">{t('underwriterfox.status.manualReview')}</option>
                <option value="offer">{t('underwriterfox.status.offer')}</option>
                <option value="bound">{t('underwriterfox.status.bound')}</option>
                <option value="declined">{t('underwriterfox.status.declined')}</option>
              </select>
            </label>
            <label style={{ display: 'grid', gap: '0.25rem', fontSize: '0.85rem' }}>
              {t('underwriterfox.cases.filterProduct')}
              <select value={productLine} onChange={(event) => setProductLine(event.target.value)} style={{ padding: '0.5rem 0.75rem', borderRadius: 10, border: '1px solid #d6d9e0' }}>
                <option value="all">{t('underwriterfox.cases.filterAllProduct')}</option>
                {productOptions.map((line) => (
                  <option key={line} value={line}>{line}</option>
                ))}
              </select>
            </label>
            <label style={{ display: 'grid', gap: '0.25rem', fontSize: '0.85rem' }}>
              {t('underwriterfox.cases.searchPlaceholder')}
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t('underwriterfox.cases.searchPlaceholder')} style={{ padding: '0.5rem 0.75rem', borderRadius: 10, border: '1px solid #d6d9e0' }} />
            </label>
          </div>
        </Card>

        <Card variant="glass" title={t('underwriterfox.cases.title')}>
          {filtered.length === 0 ? <p>{t('underwriterfox.cases.empty')}</p> : null}
          <div style={{ display: 'grid', gap: '0.5rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr auto auto', gap: '0.75rem', fontSize: '0.8rem', color: '#64748b' }}>
              <span>{t('underwriterfox.cases.table.caseNumber')}</span>
              <span>{t('underwriterfox.cases.table.insured')}</span>
              <span>{t('underwriterfox.cases.table.productLine')}</span>
              <span>{t('underwriterfox.cases.table.status')}</span>
              <span>{t('underwriterfox.cases.table.premium')}</span>
            </div>
            {filtered.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => navigate(`/underwriterfox/cases/${item.id}`)}
                style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr auto auto', gap: '0.75rem', alignItems: 'center', padding: '0.5rem 0', borderBottom: '1px solid #e2e8f0', borderTop: 'none', borderLeft: 'none', borderRight: 'none', background: 'transparent', textAlign: 'left', color: '#0f172a' }}
              >
                <strong>{item.caseNumber}</strong>
                <span>{item.insured}</span>
                <span>{item.productLine}</span>
                <span style={{ color: '#64748b' }}>{t(`underwriterfox.status.${item.status}`)}</span>
                <span style={{ color: '#0f172a' }}>€{item.premium.total.toLocaleString()}</span>
              </button>
            ))}
          </div>
        </Card>
      </UnderwriterfoxLayout>
    </section>
  )
}
