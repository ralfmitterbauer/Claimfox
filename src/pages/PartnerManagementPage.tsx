import React, { useState } from 'react'
import Card from '@/components/ui/Card'
import Header from '@/components/ui/Header'
import Button from '@/components/ui/Button'
import { useI18n } from '@/i18n/I18nContext'

type PartnerType = 'workshop' | 'surveyor' | 'towing'

type Partner = {
  id: string
  name: string
  type: PartnerType
  city: string
  rating: string
  responseTime: string
}

type ClaimMedia = {
  id: string
  title: string
  status: 'review' | 'approved' | 'missing'
}

const PARTNERS: Partner[] = [
  { id: 'p1', name: 'KFZ Werkstatt Nord GmbH', type: 'workshop', city: 'Hamburg', rating: '4.8', responseTime: '2h' },
  { id: 'p2', name: 'Gutachterverband Hanse', type: 'surveyor', city: 'Bremen', rating: '4.6', responseTime: '4h' },
  { id: 'p3', name: 'AutoRepair Mitte', type: 'workshop', city: 'Hannover', rating: '4.4', responseTime: '3h' },
  { id: 'p4', name: 'RoadAssist Partnernetz', type: 'towing', city: 'Kiel', rating: '4.7', responseTime: '1h' }
]

const MEDIA_ITEMS: ClaimMedia[] = [
  { id: 'm1', title: 'Frontschaden links', status: 'review' },
  { id: 'm2', title: 'Heckstoßstange', status: 'approved' },
  { id: 'm3', title: 'Innenraum', status: 'missing' }
]

const ESTIMATES = [
  { id: 'e1', label: 'KV-2025-0891', partner: 'KFZ Werkstatt Nord GmbH', amount: '€ 2.480', status: 'Eingereicht' },
  { id: 'e2', label: 'KV-2025-0896', partner: 'AutoRepair Mitte', amount: '€ 2.120', status: 'Geprüft' }
]

const INVOICES = [
  { id: 'i1', label: 'RE-2025-1102', partner: 'KFZ Werkstatt Nord GmbH', amount: '€ 1.740', status: 'Offen' },
  { id: 'i2', label: 'RE-2025-1103', partner: 'RoadAssist Partnernetz', amount: '€ 420', status: 'Freigegeben' }
]

const REPAIR_STEPS = [
  { key: 'intake', progress: 'done' },
  { key: 'diagnostics', progress: 'done' },
  { key: 'parts', progress: 'active' },
  { key: 'repair', progress: 'pending' },
  { key: 'handover', progress: 'pending' }
] as const

const QUESTIONS = [
  'Bitte Stand der Ersatzteilverfügbarkeit bestätigen.',
  'Gibt es zusätzliche verdeckte Schäden?',
  'Bitte Foto vom Reparaturfortschritt hochladen.'
]

const CHAT_MESSAGES = [
  { id: 'c1', author: 'partner', text: 'KV ist übermittelt, es fehlen noch Fotos von der rechten Seite.' },
  { id: 'c2', author: 'handler', text: 'Danke, wir prüfen. Bitte neue Fotos bis 16:00 Uhr.' },
  { id: 'c3', author: 'partner', text: 'Fotos folgen, Teile sind bereits bestellt.' }
]

const STATUS_COLORS = {
  review: '#F59E0B',
  approved: '#22C55E',
  missing: '#EF4444'
} as const

export default function PartnerManagementPage() {
  const { t, lang } = useI18n()
  const [selectedPartnerId, setSelectedPartnerId] = useState(PARTNERS[0].id)
  const getTypeLabel = (type: PartnerType) => t(`partnerManagement.partnerTypes.${type}`)

  return (
    <section className="page" style={{ gap: '1.75rem' }}>
      <div style={{ width: '100%', maxWidth: 1200, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
        <Header
          title={t('partnerManagement.title')}
          subtitle={t('partnerManagement.subtitle')}
          titleColor="#0e0d1c"
          subtitleColor="#65748b"
          actions={<Button variant="secondary">{t('partnerManagement.actions.addPartner')}</Button>}
        />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
          <Card variant="glass" title={t('partnerManagement.selection.title')} subtitle={t('partnerManagement.selection.subtitle')}>
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              {PARTNERS.map((partner) => {
                const isActive = partner.id === selectedPartnerId
                return (
                  <button
                    key={partner.id}
                    type="button"
                    onClick={() => setSelectedPartnerId(partner.id)}
                    style={{
                      textAlign: 'left',
                      borderRadius: '16px',
                      border: `1px solid ${isActive ? '#d4380d' : '#e2e8f0'}`,
                      padding: '0.75rem 0.9rem',
                      background: isActive ? '#fff4ee' : '#f8fafc',
                      color: '#0e0d1c',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.3rem',
                      cursor: 'pointer'
                    }}
                  >
                    <strong>{partner.name}</strong>
                    <span style={{ fontSize: '0.85rem', color: '#64748b' }}>
                      {getTypeLabel(partner.type)} • {partner.city}
                    </span>
                    <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                      ★ {partner.rating} · {t('partnerManagement.selection.response')}: {partner.responseTime}
                    </span>
                  </button>
                )
              })}
            </div>
          </Card>

          <Card variant="glass" title={t('partnerManagement.claimMedia.title')} subtitle={t('partnerManagement.claimMedia.subtitle')}>
            <div style={{ display: 'grid', gap: '0.65rem' }}>
              {MEDIA_ITEMS.map((item) => (
                <div
                  key={item.id}
                  style={{
                    borderRadius: '14px',
                    padding: '0.75rem',
                    border: '1px solid #e2e8f0',
                    background: '#f8fafc',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1rem'
                  }}
                >
                  <span style={{ color: '#0e0d1c', fontWeight: 600 }}>{item.title}</span>
                  <span
                    style={{
                      padding: '0.2rem 0.75rem',
                      borderRadius: '999px',
                      background: STATUS_COLORS[item.status],
                      color: '#0b1028',
                      fontWeight: 700,
                      fontSize: '0.75rem',
                      textTransform: 'uppercase'
                    }}
                  >
                    {t(`partnerManagement.claimMedia.status.${item.status}`)}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
          <Card variant="glass" title={t('partnerManagement.estimates.title')} subtitle={t('partnerManagement.estimates.subtitle')}>
            <div style={{ display: 'grid', gap: '0.65rem' }}>
              {ESTIMATES.map((item) => (
                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', color: '#0e0d1c' }}>
                  <div>
                    <strong>{item.label}</strong>
                    <p style={{ margin: '0.2rem 0 0', color: '#64748b' }}>{item.partner}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <strong>{item.amount}</strong>
                    <p style={{ margin: '0.2rem 0 0', color: '#64748b' }}>{item.status}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="secondary" style={{ marginTop: '1rem' }}>
              {t('partnerManagement.estimates.cta')}
            </Button>
          </Card>

          <Card variant="glass" title={t('partnerManagement.invoices.title')} subtitle={t('partnerManagement.invoices.subtitle')}>
            <div style={{ display: 'grid', gap: '0.65rem' }}>
              {INVOICES.map((item) => (
                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', color: '#0e0d1c' }}>
                  <div>
                    <strong>{item.label}</strong>
                    <p style={{ margin: '0.2rem 0 0', color: '#64748b' }}>{item.partner}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <strong>{item.amount}</strong>
                    <p style={{ margin: '0.2rem 0 0', color: '#64748b' }}>{item.status}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="secondary" style={{ marginTop: '1rem' }}>
              {t('partnerManagement.invoices.cta')}
            </Button>
          </Card>

          <Card variant="glass" title={t('partnerManagement.repair.title')} subtitle={t('partnerManagement.repair.subtitle')}>
            <div style={{ display: 'grid', gap: '0.6rem' }}>
              {REPAIR_STEPS.map((step, index) => {
                const isDone = step.progress === 'done'
                const isActive = step.progress === 'active'
                return (
                  <div key={step.key} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#0e0d1c' }}>
                    <div
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: '50%',
                        background: isDone ? '#22C55E' : isActive ? '#F59E0B' : '#e2e8f0',
                        color: isDone || isActive ? '#0b1028' : '#0e0d1c',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 700
                      }}
                    >
                      {index + 1}
                    </div>
                    <span>{t(`partnerManagement.repair.steps.${step.key}`)}</span>
                  </div>
                )
              })}
            </div>
            <p style={{ margin: '0.9rem 0 0', color: '#64748b' }}>
              {t('partnerManagement.repair.eta', { time: lang === 'de' ? '3 Tage' : '3 days' })}
            </p>
          </Card>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 0.8fr)', gap: '1.25rem' }}>
          <Card variant="glass" title={t('partnerManagement.chat.title')} subtitle={t('partnerManagement.chat.subtitle')}>
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              {CHAT_MESSAGES.map((message) => {
                const isPartner = message.author === 'partner'
                return (
                  <div
                    key={message.id}
                    style={{
                      alignSelf: isPartner ? 'flex-start' : 'flex-end',
                      background: isPartner ? '#f1f5f9' : '#fde8df',
                      color: '#0e0d1c',
                      padding: '0.75rem 1rem',
                      borderRadius: '16px',
                      maxWidth: '80%'
                    }}
                  >
                    {message.text}
                  </div>
                )
              })}
            </div>
            <div style={{ display: 'flex', gap: '0.6rem', marginTop: '1rem' }}>
              <input
                placeholder={t('partnerManagement.chat.placeholder')}
                style={{
                  flex: 1,
                  borderRadius: '12px',
                  border: '1px solid #d9d9d9',
                  padding: '0.6rem 0.8rem',
                  background: '#ffffff',
                  color: '#0e0d1c'
                }}
              />
              <Button>{t('partnerManagement.chat.send')}</Button>
            </div>
          </Card>

          <Card variant="glass" title={t('partnerManagement.questions.title')} subtitle={t('partnerManagement.questions.subtitle')}>
            <div style={{ display: 'grid', gap: '0.7rem' }}>
              {QUESTIONS.map((question) => (
                <div
                  key={question}
                  style={{
                    borderRadius: '14px',
                    padding: '0.75rem',
                    border: '1px solid #e2e8f0',
                    background: '#f8fafc',
                    color: '#0e0d1c'
                  }}
                >
                  {question}
                </div>
              ))}
            </div>
            <Button variant="secondary" style={{ marginTop: '1rem' }}>
              {t('partnerManagement.questions.cta')}
            </Button>
          </Card>
        </div>
      </div>
    </section>
  )
}
