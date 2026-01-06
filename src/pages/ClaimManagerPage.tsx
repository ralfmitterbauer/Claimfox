import React, { useEffect, useMemo, useState } from 'react'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import { useI18n } from '@/i18n/I18nContext'
import claimDamage1 from '@/assets/images/claim_damage_1.png'
import claimDamage2 from '@/assets/images/claim_damage_2.png'
import claimDamage3 from '@/assets/images/claim_damage_3.png'
import claimDamage4 from '@/assets/images/claim_damage_4.png'

type CostStatus = 'pending' | 'approved' | 'rejected'

type CostItem = {
  id: string
  labelKey: string
  amount: number
  status: CostStatus
  note: string
}

type PartnerOption = {
  id: string
  nameKey: string
  addressKey: string
  distance: string
  rating: string
}

type SurveyorOption = {
  id: string
  nameKey: string
  regionKey: string
  eta: string
}

const initialCosts: CostItem[] = [
  { id: 'c1', labelKey: 'bodywork', amount: 1800, status: 'pending', note: '' },
  { id: 'c2', labelKey: 'paint', amount: 520, status: 'approved', note: '' },
  { id: 'c3', labelKey: 'rental', amount: 240, status: 'pending', note: '' }
]

const partnerOptions: PartnerOption[] = [
  { id: 'p1', nameKey: 'partner1', addressKey: 'partner1Address', distance: '18 km', rating: '4.8' },
  { id: 'p2', nameKey: 'partner2', addressKey: 'partner2Address', distance: '32 km', rating: '4.5' },
  { id: 'p3', nameKey: 'partner3', addressKey: 'partner3Address', distance: '9 km', rating: '4.2' }
]

const surveyorOptions: SurveyorOption[] = [
  { id: 's1', nameKey: 'surveyor1', regionKey: 'surveyor1Region', eta: '2h' },
  { id: 's2', nameKey: 'surveyor2', regionKey: 'surveyor2Region', eta: '4h' },
  { id: 's3', nameKey: 'surveyor3', regionKey: 'surveyor3Region', eta: '6h' }
]

type FraudRisk = 'low' | 'medium' | 'high'

type DamageImage = {
  key: 'photo1' | 'photo2' | 'photo3' | 'photo4'
  src: string
  fraudRisk: FraudRisk
}

const DAMAGE_IMAGES: DamageImage[] = [
  { key: 'photo1', src: claimDamage1, fraudRisk: 'low' },
  { key: 'photo2', src: claimDamage2, fraudRisk: 'medium' },
  { key: 'photo3', src: claimDamage3, fraudRisk: 'low' },
  { key: 'photo4', src: claimDamage4, fraudRisk: 'high' }
]

const documentKeys = ['estimate', 'police', 'survey', 'invoice'] as const
const aiHintKeys = ['hint1', 'hint2', 'hint3', 'hint4', 'hint5'] as const
const timelineSteps = ['intake', 'review', 'approval', 'repair', 'closure'] as const
const KPI_KEYS = [
  'totalIncurred',
  'reserve',
  'approved',
  'openItems',
  'deductible',
  'coverage',
  'fraudRisk',
  'handlingTime'
] as const

const CARD_STYLE: React.CSSProperties = {
  background: 'rgba(255,255,255,0.1)',
  border: '1px solid rgba(255,255,255,0.15)',
  borderRadius: '28px',
  padding: '1.5rem',
  color: 'rgba(255,255,255,0.92)',
  backdropFilter: 'blur(18px)',
  boxShadow: '0 20px 60px rgba(0,0,0,0.35)'
}

const TEXT_COLORS = {
  primary: 'rgba(255,255,255,0.92)',
  secondary: 'rgba(255,255,255,0.75)',
  muted: 'rgba(255,255,255,0.55)'
} as const

const ACCENT_COLOR = '#D4380D'

function Modal({
  open,
  onClose,
  children,
  fullScreen = false
}: {
  open: boolean
  onClose: () => void
  children: React.ReactNode
  fullScreen?: boolean
}) {
  if (!open) return null
  useEffect(() => {
    function handleKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(8,0,32,0.65)',
        zIndex: 200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: fullScreen ? 0 : '2rem'
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: 'rgba(255,255,255,0.95)',
          borderRadius: fullScreen ? 0 : '20px',
          padding: fullScreen ? '1.25rem' : '1.5rem',
          width: fullScreen ? '100%' : 'min(640px, 100%)',
          height: fullScreen ? '100%' : undefined,
          maxHeight: fullScreen ? '100%' : '80vh',
          overflowY: 'auto',
          color: '#0e0d1c'
        }}
        onClick={(event) => event.stopPropagation()}
      >
        {children}
      </div>
    </div>
  )
}

const layoutStyles = `
  .claim-manager-app-stack {
    display: flex;
    flex-direction: column;
    gap: clamp(1.5rem, 3vw, 2.5rem);
  }
  .claim-manager-kpi-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem;
  }
  .claim-manager-two-col {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: 1.25rem;
  }
  @media (min-width: 900px) {
    .claim-manager-kpi-grid {
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }
  }
  @media (min-width: 1024px) {
    .claim-manager-two-col {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }
`

type ClaimAssistantData = {
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

type ClaimManagerPageProps = {
  assistantData?: ClaimAssistantData
  caseList?: React.ReactNode
}

export default function ClaimManagerPage({ assistantData, caseList }: ClaimManagerPageProps) {
  const { t } = useI18n()
  const [claimStatus, setClaimStatus] = useState<(typeof timelineSteps)[number]>('review')
  const [costItems, setCostItems] = useState<CostItem[]>(initialCosts)
  const [selectedPartner, setSelectedPartner] = useState<string>(partnerOptions[0].id)
  const [partnerModalOpen, setPartnerModalOpen] = useState(false)
  const [surveyorModalOpen, setSurveyorModalOpen] = useState(false)
  const [costModalOpen, setCostModalOpen] = useState(false)
  const [policyChecked, setPolicyChecked] = useState(false)
  const [selectedSurveyor, setSelectedSurveyor] = useState<string>(surveyorOptions[0].id)
  const [docPreview, setDocPreview] = useState<string | null>(null)
  const [damagePreview, setDamagePreview] = useState<DamageImage | null>(null)
  const [assistantPreview, setAssistantPreview] = useState<{ type: 'image' | 'video'; src: string } | null>(null)
  const [assistantIndex, setAssistantIndex] = useState(0)

  const assistantMedia = assistantData?.mediaItems?.length ? assistantData.mediaItems : null

  const partner = partnerOptions.find((item) => item.id === selectedPartner) ?? partnerOptions[0]
  const surveyor = surveyorOptions.find((item) => item.id === selectedSurveyor) ?? surveyorOptions[0]

  const kpiData = useMemo(
    () =>
      KPI_KEYS.map((key) => ({
        key,
        value: t(`claimManager.app.kpiValues.${key}`)
      })),
    [t]
  )

  const detailValues = useMemo(
    () => ({
      type: t('claimManager.app.details.values.type'),
      location: assistantData?.address || t('claimManager.app.details.values.location'),
      vehicle: t('claimManager.app.details.values.vehicle'),
      summary: assistantData?.description || t('claimManager.app.details.values.summary')
    }),
    [assistantData, t]
  )

  function handleCostChange(id: string, field: keyof CostItem, value: string) {
    setCostItems((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item
        if (field === 'amount') {
          return { ...item, amount: Number(value) || 0 }
        }
        if (field === 'status') {
          return { ...item, status: value as CostStatus }
        }
        return { ...item, note: value }
      })
    )
  }

  function handleConfirmCosts() {
    setCostItems((prev) =>
      prev.map((item) => (item.status === 'pending' ? { ...item, status: 'approved' } : item))
    )
    setPolicyChecked(false)
    setCostModalOpen(false)
  }

  function handlePartnerSelect(id: string) {
    setSelectedPartner(id)
  }

  function handleSurveyorSelect(id: string) {
    setSelectedSurveyor(id)
  }

  return (
    <>
        <section
          style={{
            minHeight: '100vh',
            width: '100%',
            color: '#ffffff',
            padding: 'calc(var(--header-height) + 32px) 1.25rem 4rem'
          }}
        >
          <style>{layoutStyles}</style>
          <div
            className="claim-manager-app-stack"
            style={{ width: '100%', maxWidth: 1200, margin: '0 auto' }}
          >
          {caseList}
          <Card style={{ ...CARD_STYLE, padding: '2rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <span style={{ letterSpacing: '0.4em', fontSize: '0.75rem', color: TEXT_COLORS.muted, textTransform: 'uppercase' }}>
                {t('claimManager.app.header.overline')}
              </span>
              <h1 style={{ margin: 0, fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', fontWeight: 600, color: '#fff' }}>
                {t('claimManager.app.header.title')}
              </h1>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', color: TEXT_COLORS.secondary }}>
                <span>
                  {t('claimManager.app.header.claimId')}:{' '}
                  <strong>{assistantData?.claimNumber || t('claimManager.app.header.claimIdValue')}</strong>
                </span>
                <span>
                  {t('claimManager.app.header.date')}:{' '}
                  <strong>{assistantData?.incidentTime || t('claimManager.app.header.dateValue')}</strong>
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem' }}>
                  {t('claimManager.app.header.status')}:
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '0.2rem 0.85rem',
                      borderRadius: '999px',
                      background: 'rgba(255,255,255,0.15)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      fontWeight: 600
                    }}
                  >
                    {t(`claimManager.app.statusOptions.${claimStatus}`)}
                  </span>
                </span>
              </div>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: '1rem' }}>
              <Button
                onClick={() => setCostModalOpen(true)}
                style={{
                  background: ACCENT_COLOR,
                  color: '#fff',
                  borderRadius: '999px',
                  height: '42px',
                  padding: '0 1.5rem',
                  fontWeight: 600
                }}
              >
                {t('claimManager.app.actions.approveCosts')}
              </Button>
              <Button
                variant="secondary"
                onClick={() => setSurveyorModalOpen(true)}
                style={{
                  background: 'rgba(255,255,255,0.12)',
                  color: '#fff',
                  borderRadius: '999px',
                  border: '1px solid rgba(255,255,255,0.25)',
                  height: '42px',
                  padding: '0 1.4rem',
                  fontWeight: 600
                }}
              >
                {t('claimManager.app.actions.assignSurveyor')}
              </Button>
              <Button
                variant="secondary"
                onClick={() => setPartnerModalOpen(true)}
                style={{
                  background: '#ffffff',
                  color: '#0B1028',
                    borderRadius: '999px',
                  height: '42px',
                  padding: '0 1.4rem',
                  fontWeight: 600
                }}
              >
                {t('claimManager.app.actions.changePartner')}
              </Button>
            </div>
          </Card>

          <Card style={{ ...CARD_STYLE, padding: '1.5rem' }}>
            <div className="claim-manager-kpi-grid">
              {kpiData.map((kpi) => (
                <div
                  key={kpi.key}
                  style={{
                    minHeight: '110px',
                    borderRadius: '20px',
                    border: '1px solid rgba(255,255,255,0.2)',
                    padding: '0.85rem'
                  }}
                >
                  <p style={{ margin: 0, fontSize: '0.85rem', color: TEXT_COLORS.muted, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    {t(`claimManager.app.kpis.${kpi.key}`)}
                  </p>
                  <p style={{ margin: '0.35rem 0 0', fontSize: '1.8rem', fontWeight: 600, color: '#fff' }}>{kpi.value}</p>
                </div>
              ))}
            </div>
          </Card>

          <div className="claim-manager-two-col">
            <Card style={CARD_STYLE}>
              <h2 style={{ marginTop: 0, marginBottom: '1rem', fontSize: '1.5rem', fontWeight: 600 }}>{t('claimManager.app.details.title')}</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(210px,1fr))', gap: '0.85rem' }}>
                <div>
                  <p style={{ margin: 0, color: TEXT_COLORS.muted, fontSize: '0.85rem' }}>{t('claimManager.app.details.type')}</p>
                  <p style={{ margin: '0.25rem 0 0', fontWeight: 600 }}>{detailValues.type}</p>
                </div>
                <div>
                  <p style={{ margin: 0, color: TEXT_COLORS.muted, fontSize: '0.85rem' }}>{t('claimManager.app.details.location')}</p>
                  <p style={{ margin: '0.25rem 0 0', fontWeight: 600 }}>{detailValues.location}</p>
                </div>
                <div>
                  <p style={{ margin: 0, color: TEXT_COLORS.muted, fontSize: '0.85rem' }}>{t('claimManager.app.details.vehicle')}</p>
                  <p style={{ margin: '0.25rem 0 0', fontWeight: 600 }}>{detailValues.vehicle}</p>
                </div>
                <div>
                  <p style={{ margin: 0, color: TEXT_COLORS.muted, fontSize: '0.85rem' }}>{t('claimManager.app.details.summary')}</p>
                  <p style={{ margin: '0.25rem 0 0', lineHeight: 1.4 }}>{detailValues.summary}</p>
                </div>
              </div>
            </Card>
            <Card style={CARD_STYLE}>
              <h2 style={{ marginTop: 0, marginBottom: '1rem', fontSize: '1.5rem', fontWeight: 600 }}>{t('claimManager.app.coverage.title')}</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', color: TEXT_COLORS.secondary }}>
                <span>
                  {t('claimManager.app.coverage.policyNumber')}: <strong>{t('claimManager.app.coverage.policyValue')}</strong>
                </span>
                <span>
                  {t('claimManager.app.coverage.term')}: {t('claimManager.app.coverage.termValue')}
                </span>
                <span>
                  {t('claimManager.app.coverage.limit')}: {t('claimManager.app.coverage.limitValue')}
                </span>
                <span>
                  {t('claimManager.app.coverage.exclusion')}: {t('claimManager.app.coverage.exclusionValue')}
                </span>
              </div>
              <div
                style={{
                  marginTop: '1rem',
                  display: 'inline-flex',
                  padding: '0.35rem 1.25rem',
                  borderRadius: '999px',
                  background: '#16A34A',
                  fontWeight: 700
                }}
              >
                {t('claimManager.app.coverage.covered')}
              </div>
              <p style={{ marginTop: '0.85rem', color: TEXT_COLORS.secondary }}>{t('claimManager.app.coverage.note')}</p>
            </Card>
          </div>

          <Card style={CARD_STYLE}>
            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center' }}>
              <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 600 }}>{t('claimManager.app.timeline.title')}</h2>
              <select
                value={claimStatus}
                onChange={(event) => setClaimStatus(event.target.value as (typeof timelineSteps)[number])}
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  color: '#fff',
                  borderRadius: '999px',
                  border: '1px solid rgba(255,255,255,0.25)',
                  padding: '0.45rem 1rem',
                  minWidth: '180px'
                }}
              >
                {timelineSteps.map((step) => (
                  <option key={step} value={step}>
                    {t(`claimManager.app.statusOptions.${step}`)}
                  </option>
                ))}
              </select>
            </div>
            <div style={{ display: 'flex', gap: '0.85rem', marginTop: '1rem', flexWrap: 'wrap' }}>
              {timelineSteps.map((step, index) => {
                const isActive = timelineSteps.indexOf(claimStatus) >= index
                return (
                  <div key={step} style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: isActive ? '#D3F261' : TEXT_COLORS.muted }}>
                    <div
                      style={{
                        width: '30px',
                        height: '30px',
                        borderRadius: '50%',
                        border: `2px solid ${isActive ? '#D3F261' : 'rgba(255,255,255,0.35)'}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 700
                      }}
                    >
                      {index + 1}
                    </div>
                    <span>{t(`claimManager.app.timeline.steps.${step}`)}</span>
                    {index < timelineSteps.length - 1 && <span style={{ opacity: 0.4 }}>—</span>}
                  </div>
                )
              })}
            </div>
          </Card>

          <Card style={CARD_STYLE}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
              <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 600 }}>{t('claimManager.app.costs.title')}</h2>
              <Button
                variant="secondary"
                onClick={() => setCostModalOpen(true)}
                style={{
                  background: 'rgba(255,255,255,0.12)',
                  color: '#fff',
                  borderRadius: '999px',
                  border: '1px solid rgba(255,255,255,0.25)',
                  height: '40px',
                  padding: '0 1.25rem',
                  fontWeight: 600
                }}
              >
                {t('claimManager.app.costs.confirm')}
              </Button>
            </div>
            <div style={{ marginTop: '1rem', overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0, minWidth: '600px' }}>
                <thead>
                  <tr style={{ textAlign: 'left', color: TEXT_COLORS.muted, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    <th style={{ paddingBottom: '0.6rem' }}>{t('claimManager.app.costs.table.position')}</th>
                    <th style={{ paddingBottom: '0.6rem' }}>{t('claimManager.app.costs.table.amount')}</th>
                    <th style={{ paddingBottom: '0.6rem' }}>{t('claimManager.app.costs.table.status')}</th>
                    <th style={{ paddingBottom: '0.6rem' }}>{t('claimManager.app.costs.table.note')}</th>
                  </tr>
                </thead>
                <tbody>
                  {costItems.map((item) => (
                    <tr key={item.id} style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                      <td style={{ padding: '0.6rem 0.4rem', color: TEXT_COLORS.secondary }}>{t(`claimManager.app.costs.items.${item.labelKey}`)}</td>
                      <td style={{ padding: '0.6rem 0.4rem' }}>
                        <input
                          type="number"
                          value={item.amount}
                          onChange={(event) => handleCostChange(item.id, 'amount', event.target.value)}
                          style={{
                            width: '100%',
                            borderRadius: '14px',
                            border: '1px solid rgba(255,255,255,0.25)',
                            background: 'rgba(255,255,255,0.08)',
                            color: '#fff',
                            padding: '0.45rem 0.75rem'
                          }}
                        />
                      </td>
                      <td style={{ padding: '0.6rem 0.4rem' }}>
                        <select
                          value={item.status}
                          onChange={(event) => handleCostChange(item.id, 'status', event.target.value)}
                          style={{
                            width: '100%',
                            borderRadius: '14px',
                            border: '1px solid rgba(255,255,255,0.25)',
                            background: 'rgba(255,255,255,0.08)',
                            color: '#fff',
                            padding: '0.45rem 0.75rem'
                          }}
                        >
                          <option value="pending">{t('claimManager.app.costs.status.pending')}</option>
                          <option value="approved">{t('claimManager.app.costs.status.approved')}</option>
                          <option value="rejected">{t('claimManager.app.costs.status.rejected')}</option>
                        </select>
                      </td>
                      <td style={{ padding: '0.6rem 0.4rem' }}>
                        <input
                          type="text"
                          value={item.note}
                          placeholder={t('claimManager.app.costs.notePlaceholder')}
                          onChange={(event) => handleCostChange(item.id, 'note', event.target.value)}
                          style={{
                            width: '100%',
                            borderRadius: '14px',
                            border: '1px solid rgba(255,255,255,0.25)',
                            background: 'rgba(255,255,255,0.08)',
                            color: '#fff',
                            padding: '0.45rem 0.75rem'
                          }}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          <Card style={CARD_STYLE}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
              <div>
                <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 600 }}>{t('claimManager.app.partner.title')}</h2>
                <p style={{ margin: '0.35rem 0 0', color: TEXT_COLORS.secondary }}>
                  <strong style={{ color: '#fff' }}>{t(`claimManager.app.partner.options.${partner.nameKey}.name`)}</strong>
                  <br />
                  {t(`claimManager.app.partner.options.${partner.addressKey}`)}
                </p>
                <p style={{ margin: '0.4rem 0 0', color: TEXT_COLORS.muted }}>
                  {partner.distance} • ★ {partner.rating}
                </p>
              </div>
              <Button
                variant="secondary"
                onClick={() => setPartnerModalOpen(true)}
                style={{
                  background: '#ffffff',
                  color: '#0B1028',
                  borderRadius: '999px',
                  height: '40px',
                  padding: '0 1.4rem',
                  fontWeight: 600
                }}
              >
                {t('claimManager.app.partner.changeButton')}
              </Button>
            </div>
          </Card>

          <Card style={CARD_STYLE}>
            <h2 style={{ marginTop: 0, fontSize: '1.5rem', fontWeight: 600 }}>{t('claimManager.app.ai.title')}</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.75rem' }}>
              {aiHintKeys.map((key) => (
                <div
                  key={key}
                  style={{
                    padding: '0.85rem 1rem',
                    borderRadius: '18px',
                    border: '1px solid rgba(255,255,255,0.15)',
                    background: 'rgba(255,255,255,0.08)',
                    color: TEXT_COLORS.primary
                  }}
                >
                  {t(`claimManager.app.ai.items.${key}`)}
                </div>
              ))}
            </div>
          </Card>

          <Card style={{ ...CARD_STYLE, display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: '1.25rem' }}>
            <div>
              <h2 style={{ marginTop: 0, fontSize: '1.5rem', fontWeight: 600 }}>{t('claimManager.app.documents.title')}</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem', marginTop: '0.75rem' }}>
                {documentKeys.map((key) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setDocPreview(key)}
                    style={{
                      textAlign: 'left',
                      padding: '0.75rem 1rem',
                      borderRadius: '16px',
                      border: '1px solid rgba(255,255,255,0.2)',
                      background: 'rgba(255,255,255,0.08)',
                      color: '#fff',
                      fontWeight: 600
                    }}
                  >
                    {t(`claimManager.app.documents.list.${key}`)}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h2 style={{ marginTop: 0, fontSize: '1.5rem', fontWeight: 600 }}>{t('claimManager.app.documents.damage.title')}</h2>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))',
                  gap: '1rem',
                  marginTop: '0.75rem'
                }}
              >
                {assistantMedia ? (
                  <div
                    style={{
                      border: '1px solid rgba(255,255,255,0.2)',
                      borderRadius: '22px',
                      padding: '0.9rem',
                      background: 'rgba(255,255,255,0.07)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.7rem'
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => setAssistantPreview(assistantMedia[assistantIndex])}
                      style={{
                        border: 'none',
                        padding: 0,
                        margin: 0,
                        borderRadius: '16px',
                        overflow: 'hidden',
                        cursor: 'pointer',
                        background: 'transparent'
                      }}
                    >
                      {assistantMedia[assistantIndex].type === 'video' ? (
                        <video
                          src={assistantMedia[assistantIndex].src}
                          style={{ width: '100%', height: '220px', objectFit: 'cover', display: 'block' }}
                          muted
                          playsInline
                        />
                      ) : (
                        <img
                          src={assistantMedia[assistantIndex].src}
                          alt={t('claimManager.app.documents.damage.title')}
                          style={{ width: '100%', height: '220px', objectFit: 'cover', display: 'block' }}
                        />
                      )}
                    </button>
                    {assistantMedia.length > 1 && (
                      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.75rem' }}>
                        <Button
                          variant="secondary"
                          onClick={() =>
                            setAssistantIndex((prev) =>
                              prev === 0 ? assistantMedia.length - 1 : prev - 1
                            )
                          }
                          style={{ background: 'rgba(255,255,255,0.12)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}
                        >
                          {t('claimManager.app.documents.damage.prev')}
                        </Button>
                        <span style={{ color: TEXT_COLORS.secondary, alignSelf: 'center' }}>
                          {assistantIndex + 1}/{assistantMedia.length}
                        </span>
                        <Button
                          variant="secondary"
                          onClick={() =>
                            setAssistantIndex((prev) =>
                              prev === assistantMedia.length - 1 ? 0 : prev + 1
                            )
                          }
                          style={{ background: 'rgba(255,255,255,0.12)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}
                        >
                          {t('claimManager.app.documents.damage.next')}
                        </Button>
                      </div>
                    )}
                  </div>
                ) : (
                  DAMAGE_IMAGES.map((image) => (
                    <div
                      key={image.key}
                      style={{
                        border: '1px solid rgba(255,255,255,0.2)',
                        borderRadius: '22px',
                        padding: '0.9rem',
                        background: 'rgba(255,255,255,0.07)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.7rem'
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => setDamagePreview(image)}
                        style={{
                          border: 'none',
                          padding: 0,
                          margin: 0,
                          borderRadius: '16px',
                          overflow: 'hidden',
                          cursor: 'pointer',
                          background: 'transparent'
                        }}
                      >
                        <img
                          src={image.src}
                          alt={t(`claimManager.app.documents.damage.items.${image.key}.title`)}
                          style={{ width: '100%', height: '165px', objectFit: 'cover', display: 'block' }}
                        />
                      </button>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                        <h3 style={{ margin: 0, fontSize: '1.05rem' }}>
                          {t(`claimManager.app.documents.damage.items.${image.key}.title`)}
                        </h3>
                        <p style={{ margin: 0, color: TEXT_COLORS.secondary, fontSize: '0.95rem' }}>
                          {t(`claimManager.app.documents.damage.items.${image.key}.ai`)}
                        </p>
                        <span
                          style={{
                            alignSelf: 'flex-start',
                            padding: '0.25rem 0.85rem',
                            borderRadius: '999px',
                            fontWeight: 700,
                            color: '#ffffff',
                            background:
                              image.fraudRisk === 'low' ? '#00C853' : image.fraudRisk === 'medium' ? '#FF6D00' : '#D50000'
                          }}
                        >
                          {t(`claimManager.app.documents.damage.riskBadges.${image.fraudRisk}`)}
                        </span>
                        <p style={{ margin: 0, color: TEXT_COLORS.secondary, fontSize: '0.9rem' }}>
                          {t(`claimManager.app.documents.damage.items.${image.key}.fraud`)}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </Card>
        </div>
        </section>

      <Modal open={costModalOpen} onClose={() => setCostModalOpen(false)}>
        <h3 style={{ marginTop: 0 }}>{t('claimManager.app.costs.modal.title')}</h3>
        <label style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <input
            type="checkbox"
            checked={policyChecked}
            onChange={(event) => setPolicyChecked(event.target.checked)}
          />
          {t('claimManager.app.costs.modal.checkbox')}
        </label>
        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
          <Button onClick={handleConfirmCosts} disabled={!policyChecked}>
            {t('claimManager.app.costs.modal.confirm')}
          </Button>
          <Button variant="secondary" onClick={() => setCostModalOpen(false)}>
            {t('claimManager.app.costs.modal.cancel')}
          </Button>
        </div>
      </Modal>

      <Modal open={partnerModalOpen} onClose={() => setPartnerModalOpen(false)}>
        <h3 style={{ marginTop: 0 }}>{t('claimManager.app.partner.modalTitle')}</h3>
        <div style={{ display: 'grid', gap: '0.75rem', marginTop: '1rem' }}>
          {partnerOptions.map((option) => (
            <label
              key={option.id}
              style={{
                border: '1px solid rgba(8,0,40,0.15)',
                borderRadius: '14px',
                padding: '0.75rem',
                display: 'flex',
                justifyContent: 'space-between',
                gap: '0.5rem'
              }}
            >
              <div>
                <strong>{t(`claimManager.app.partner.options.${option.nameKey}.name`)}</strong>
                <p style={{ margin: '0.15rem 0 0', color: '#444' }}>{t(`claimManager.app.partner.options.${option.addressKey}`)}</p>
                <p style={{ margin: 0, color: '#666' }}>
                  {option.distance} • ★ {option.rating}
                </p>
              </div>
              <input
                type="radio"
                name="claim-partner"
                checked={selectedPartner === option.id}
                onChange={() => handlePartnerSelect(option.id)}
              />
            </label>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
          <Button onClick={() => setPartnerModalOpen(false)}>{t('claimManager.app.partner.confirm')}</Button>
          <Button variant="secondary" onClick={() => setPartnerModalOpen(false)}>
            {t('claimManager.app.costs.modal.cancel')}
          </Button>
        </div>
      </Modal>

      <Modal open={surveyorModalOpen} onClose={() => setSurveyorModalOpen(false)}>
        <h3 style={{ marginTop: 0 }}>{t('claimManager.app.surveyor.title')}</h3>
        <p style={{ margin: '0 0 0.75rem', color: '#555' }}>{t('claimManager.app.surveyor.mapTitle')}</p>
        <div
          style={{
            height: '140px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, rgba(8,0,64,0.1), rgba(212,56,13,0.15))',
            marginBottom: '1rem'
          }}
        />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          {surveyorOptions.map((option) => (
            <label
              key={option.id}
              style={{
                border: '1px solid rgba(8,0,40,0.15)',
                borderRadius: '14px',
                padding: '0.6rem',
                display: 'flex',
                justifyContent: 'space-between',
                gap: '0.5rem'
              }}
            >
              <div>
                <strong>{t(`claimManager.app.surveyor.options.${option.nameKey}`)}</strong>
                <p style={{ margin: '0.2rem 0 0', color: '#555' }}>{t(`claimManager.app.surveyor.options.${option.regionKey}`)}</p>
                <p style={{ margin: 0, color: '#777' }}>{option.eta}</p>
              </div>
              <input
                type="radio"
                name="surveyor"
                checked={selectedSurveyor === option.id}
                onChange={() => handleSurveyorSelect(option.id)}
              />
            </label>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
          <Button onClick={() => setSurveyorModalOpen(false)}>{t('claimManager.app.surveyor.confirm')}</Button>
          <Button variant="secondary" onClick={() => setSurveyorModalOpen(false)}>
            {t('claimManager.app.costs.modal.cancel')}
          </Button>
        </div>
      </Modal>

      <Modal open={Boolean(docPreview)} onClose={() => setDocPreview(null)}>
        <h3 style={{ marginTop: 0 }}>{t('claimManager.app.documents.previewTitle')}</h3>
        <p>{docPreview ? t(`claimManager.app.documents.list.${docPreview}`) : ''}</p>
        <Button variant="secondary" onClick={() => setDocPreview(null)}>
          {t('claimManager.app.documents.close')}
        </Button>
      </Modal>

      <Modal open={Boolean(damagePreview)} onClose={() => setDamagePreview(null)}>
        {damagePreview && (
          <>
            <h3 style={{ marginTop: 0 }}>{t('claimManager.app.documents.damage.modalTitle')}</h3>
            <img
              src={damagePreview.src}
              alt={t(`claimManager.app.documents.damage.items.${damagePreview.key}.title`)}
              style={{ width: '100%', borderRadius: '18px', margin: '1rem 0', objectFit: 'cover' }}
            />
            <h4 style={{ margin: '0 0 0.5rem' }}>
              {t(`claimManager.app.documents.damage.items.${damagePreview.key}.title`)}
            </h4>
            <p style={{ margin: '0 0 0.5rem' }}>
              {t(`claimManager.app.documents.damage.items.${damagePreview.key}.ai`)}
            </p>
            <span
              style={{
                display: 'inline-flex',
                padding: '0.25rem 0.85rem',
                borderRadius: '999px',
                fontWeight: 700,
                color: '#ffffff',
                background:
                  damagePreview.fraudRisk === 'low'
                    ? '#00C853'
                    : damagePreview.fraudRisk === 'medium'
                    ? '#FF6D00'
                    : '#D50000'
              }}
            >
              {t(`claimManager.app.documents.damage.riskBadges.${damagePreview.fraudRisk}`)}
            </span>
            <p style={{ margin: '0.5rem 0 0' }}>
              {t(`claimManager.app.documents.damage.items.${damagePreview.key}.fraud`)}
            </p>
            <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'flex-end' }}>
              <Button variant="secondary" onClick={() => setDamagePreview(null)}>
                {t('claimManager.app.documents.close')}
              </Button>
            </div>
          </>
        )}
      </Modal>

      <Modal open={Boolean(assistantPreview)} onClose={() => setAssistantPreview(null)} fullScreen>
        {assistantPreview && (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', alignItems: 'center' }}>
              <h3 style={{ margin: 0 }}>{t('claimManager.app.documents.damage.modalTitle')}</h3>
              <Button variant="secondary" onClick={() => setAssistantPreview(null)}>
                {t('claimManager.app.documents.close')}
              </Button>
            </div>
            {assistantPreview.type === 'video' ? (
              <video
                src={assistantPreview.src}
                controls
                style={{ width: '100%', borderRadius: '18px', margin: '1rem 0', maxHeight: '80vh' }}
              />
            ) : (
              <img
                src={assistantPreview.src}
                alt={t('claimManager.app.documents.damage.title')}
                style={{ width: '100%', borderRadius: '18px', margin: '1rem 0', objectFit: 'contain', maxHeight: '80vh' }}
              />
            )}
          </>
        )}
      </Modal>
    </>
  )
}
