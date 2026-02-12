import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '@/components/ui/Card'
import PartnerfoxLayout from '@/partnerfox/components/PartnerfoxLayout'
import { buildSubrogationRecommendation } from '@/partnerfox/components/SubrogationEngine'
import { useI18n } from '@/i18n/I18nContext'
import { useTenantContext } from '@/brokerfox/hooks/useTenantContext'
import { listCases, listSubrogation } from '@/partnerfox/api/partnerfoxApi'
import type { PartnerCase, Subrogation } from '@/partnerfox/types'

export default function PartnerfoxSubrogationPage() {
  const { t } = useI18n()
  const ctx = useTenantContext()
  const navigate = useNavigate()
  const [items, setItems] = useState<Subrogation[]>([])
  const [cases, setCases] = useState<PartnerCase[]>([])

  useEffect(() => {
    let mounted = true
    async function load() {
      const [subrogationData, caseData] = await Promise.all([listSubrogation(ctx), listCases(ctx)])
      if (!mounted) return
      setItems(subrogationData)
      setCases(caseData)
    }
    load()
    return () => { mounted = false }
  }, [ctx])

  const totalEstimate = useMemo(() => items.reduce((acc, item) => acc + Math.round(item.claimAmount * item.recoveryProbability), 0), [items])

  return (
    <PartnerfoxLayout title={t('partnerfox.subrogation.title')} subtitle={t('partnerfox.subrogation.subtitle')}>
      <div style={{ display: 'grid', gap: '1.5rem' }}>
        <Card>
          <div>{t('partnerfox.subrogation.estimate')}: <strong>EUR {totalEstimate.toLocaleString()}</strong></div>
        </Card>

        <Card>
          <div style={{ display: 'grid', gap: '0.55rem' }}>
            {items.map((item) => {
              const linkedCase = cases.find((row) => row.id === item.caseId)
              const recommendation = buildSubrogationRecommendation(item)
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => linkedCase && navigate(`/partnerfox/cases/${linkedCase.id}`)}
                  style={{ border: '1px solid #e2e8f0', borderRadius: 10, padding: '0.65rem 0.8rem', textAlign: 'left', background: '#fff', cursor: 'pointer', display: 'grid', gap: '0.2rem' }}
                >
                  <strong>{linkedCase?.claimNumber ?? item.caseId}</strong>
                  <span style={{ fontSize: '0.82rem', color: '#475569' }}>{item.liableParty}</span>
                  <span style={{ fontSize: '0.82rem', color: '#64748b' }}>
                    {t('partnerfox.subrogation.probability')}: {Math.round(item.recoveryProbability * 100)}% · {t(`partnerfox.subrogation.status.${item.status}`)}
                  </span>
                  <span style={{ fontSize: '0.82rem', color: '#64748b' }}>
                    {t('partnerfox.subrogation.projected')}: EUR {recommendation.projectedRecovery.toLocaleString()} · {t(`partnerfox.subrogation.stageRecommendation.${recommendation.stageKey}`)}
                  </span>
                </button>
              )
            })}
          </div>
        </Card>
      </div>
    </PartnerfoxLayout>
  )
}
