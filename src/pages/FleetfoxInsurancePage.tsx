import { useEffect, useState } from 'react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import FleetfoxLayout from '@/fleetfox/components/FleetfoxLayout'
import FleetAIExplanationCard from '@/fleetfox/components/FleetAIExplanationCard'
import { useI18n } from '@/i18n/I18nContext'
import { useTenantContext } from '@/brokerfox/hooks/useTenantContext'
import { addInsuranceNote, generateDownloadText, listInsurance } from '@/fleetfox/api/fleetfoxApi'
import type { InsuranceAssessment } from '@/fleetfox/types'

function downloadText(filename: string, content: string, mime: string) {
  const blob = new Blob([content], { type: mime })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = filename
  document.body.appendChild(anchor)
  anchor.click()
  document.body.removeChild(anchor)
  URL.revokeObjectURL(url)
}

export default function FleetfoxInsurancePage() {
  const { t } = useI18n()
  const ctx = useTenantContext()
  const [items, setItems] = useState<InsuranceAssessment[]>([])
  const [selectedId, setSelectedId] = useState('')

  useEffect(() => {
    let mounted = true
    async function load() {
      const data = await listInsurance(ctx)
      if (!mounted) return
      setItems(data)
      setSelectedId(data[0]?.id ?? '')
    }
    load()
    return () => { mounted = false }
  }, [ctx])

  const selected = items.find((item) => item.id === selectedId) ?? items[0]

  async function downloadRisk() {
    if (!selected) return
    const file = await generateDownloadText(ctx, 'insurance', selected.id)
    downloadText(file.filename, file.content, file.mime)
  }

  async function addNote() {
    if (!selected) return
    await addInsuranceNote(ctx, selected.id, 'Premium simulation reviewed and action plan agreed.')
  }

  return (
    <FleetfoxLayout title={t('fleetfox.insurance.title')} subtitle={t('fleetfox.insurance.subtitle')}>
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 0.9fr) minmax(0, 1.1fr)', gap: '1.5rem' }}>
        <Card title={t('fleetfox.insurance.listTitle')}>
          <div style={{ display: 'grid', gap: '0.55rem' }}>
            {items.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedId(item.id)}
                style={{
                  border: selectedId === item.id ? '1px solid #d4380d' : '1px solid #e2e8f0',
                  borderRadius: 12,
                  background: '#fff',
                  padding: '0.65rem 0.75rem',
                  textAlign: 'left',
                  cursor: 'pointer'
                }}
              >
                <div style={{ fontWeight: 600 }}>{item.fleetSegment}</div>
                <div style={{ color: '#64748b', fontSize: '0.84rem' }}>
                  {t('fleetfox.insurance.premium')}: EUR {Math.round(item.basePremiumEur * item.multiplier).toLocaleString()}
                </div>
              </button>
            ))}
          </div>
        </Card>

        {selected ? (
          <div style={{ display: 'grid', gap: '1.5rem' }}>
            <Card title={t('fleetfox.insurance.detailTitle')}>
              <div style={{ display: 'grid', gap: '0.4rem' }}>
                <div>{t('fleetfox.insurance.basePremium')}: EUR {selected.basePremiumEur.toLocaleString()}</div>
                <div>{t('fleetfox.insurance.multiplier')}: {selected.multiplier}</div>
                <div>{t('fleetfox.insurance.claimsProbability')}: {Math.round(selected.claimsProbability * 100)}%</div>
                <ul style={{ margin: 0, paddingLeft: '1rem', color: '#475569' }}>
                  {selected.recommendedActions.map((action) => <li key={action}>{action}</li>)}
                </ul>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <Button size="sm" onClick={downloadRisk}>{t('fleetfox.insurance.downloadReport')}</Button>
                  <Button size="sm" variant="secondary" onClick={addNote}>{t('fleetfox.insurance.addNote')}</Button>
                </div>
              </div>
            </Card>

            <FleetAIExplanationCard
              title={t('fleetfox.insurance.aiTitle')}
              subtitle={t('fleetfox.insurance.aiSubtitle')}
              insight={selected.explanation}
            />
          </div>
        ) : null}
      </div>
    </FleetfoxLayout>
  )
}
