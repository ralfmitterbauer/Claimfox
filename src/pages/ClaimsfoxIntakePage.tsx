import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import ClaimsfoxLayout from '@/claimsfox/components/ClaimsfoxLayout'
import { useI18n } from '@/i18n/I18nContext'
import { useTenantContext } from '@/brokerfox/hooks/useTenantContext'
import { createClaim } from '@/claimsfox/api/claimsfoxApi'

export default function ClaimsfoxIntakePage() {
  const { t, lang } = useI18n()
  const ctx = useTenantContext()
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [form, setForm] = useState({
    claimantName: '',
    policyRef: '',
    lossDate: '',
    lossLocation: '',
    description: ''
  })

  async function submit() {
    const now = new Date()
    const defaultPolicyRef = lang === 'de' ? 'POL-DEMO-1201' : 'POL-DEMO-1201'
    const defaultInsured = lang === 'de' ? 'Demo-Versicherungsnehmer' : 'Demo Insured'
    const defaultLocation = lang === 'de' ? 'Hamburg, DE' : 'Hamburg, DE'
    const defaultSummary = lang === 'de' ? 'FNOL über das Maklerportal eingereicht.' : 'FNOL submitted via broker portal.'
    const claim = await createClaim(ctx, {
      claimNumber: `CL-${now.getFullYear()}-${Math.floor(Math.random() * 9000 + 1000)}`,
      policyRef: form.policyRef || defaultPolicyRef,
      insured: form.claimantName || defaultInsured,
      lossDate: form.lossDate || now.toISOString(),
      status: 'intake',
      severity: 'medium',
      reserve: 25000,
      paid: 0,
      currency: 'EUR',
      lineOfBusiness: 'Motor Fleet',
      location: form.lossLocation || defaultLocation,
      tags: ['fnol', 'new'],
      assignedTo: 'mira.klein@claimsfox',
      slaDueAt: new Date(now.getTime() + 10 * 86400000).toISOString(),
      fraudScore: 0.12,
      triageScore: 0.58,
      timelineSummary: form.description || defaultSummary
    })
    navigate(`/claimsfox/claims/${claim.id}`)
  }

  return (
    <ClaimsfoxLayout title={t('claimsfox.intake.title')} subtitle={t('claimsfox.intake.subtitle')}>
      <Card>
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
          {[0, 1, 2].map((idx) => (
            <div key={idx} style={{ flex: 1, height: 6, borderRadius: 999, background: idx <= step ? '#d4380d' : '#e2e8f0' }} />
          ))}
        </div>
        {step === 0 && (
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            <label style={{ display: 'grid', gap: '0.35rem' }}>
              {t('claimsfox.intake.claimant')}
              <input value={form.claimantName} onChange={(event) => setForm({ ...form, claimantName: event.target.value })} style={{ padding: '0.6rem', borderRadius: 10, border: '1px solid #e2e8f0' }} />
            </label>
            <label style={{ display: 'grid', gap: '0.35rem' }}>
              {t('claimsfox.intake.policyRef')}
              <input value={form.policyRef} onChange={(event) => setForm({ ...form, policyRef: event.target.value })} style={{ padding: '0.6rem', borderRadius: 10, border: '1px solid #e2e8f0' }} />
            </label>
          </div>
        )}
        {step === 1 && (
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            <label style={{ display: 'grid', gap: '0.35rem' }}>
              {t('claimsfox.intake.lossDate')}
              <input type="date" value={form.lossDate} onChange={(event) => setForm({ ...form, lossDate: event.target.value })} style={{ padding: '0.6rem', borderRadius: 10, border: '1px solid #e2e8f0' }} />
            </label>
            <label style={{ display: 'grid', gap: '0.35rem' }}>
              {t('claimsfox.intake.lossLocation')}
              <input value={form.lossLocation} onChange={(event) => setForm({ ...form, lossLocation: event.target.value })} style={{ padding: '0.6rem', borderRadius: 10, border: '1px solid #e2e8f0' }} />
            </label>
          </div>
        )}
        {step === 2 && (
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            <label style={{ display: 'grid', gap: '0.35rem' }}>
              {t('claimsfox.intake.description')}
              <textarea value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} style={{ minHeight: 120, padding: '0.6rem', borderRadius: 10, border: '1px solid #e2e8f0' }} />
            </label>
            <div style={{ color: '#64748b', fontSize: '0.85rem' }}>{t('claimsfox.intake.attachmentsHint')}</div>
          </div>
        )}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.5rem' }}>
          <Button size="sm" variant="secondary" onClick={() => setStep(Math.max(0, step - 1))}>
            {t('claimsfox.intake.back')}
          </Button>
          {step < 2 ? (
            <Button size="sm" onClick={() => setStep(step + 1)}>{t('claimsfox.intake.next')}</Button>
          ) : (
            <Button size="sm" onClick={submit}>{t('claimsfox.intake.submit')}</Button>
          )}
        </div>
      </Card>
    </ClaimsfoxLayout>
  )
}
