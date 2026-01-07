import React, { useState } from 'react'
import Card from '@/components/ui/Card'
import Header from '@/components/ui/Header'
import Button from '@/components/ui/Button'
import { useI18n } from '@/i18n/I18nContext'

const inputStyle: React.CSSProperties = {
  width: '100%',
  borderRadius: '12px',
  border: '1px solid rgba(255,255,255,0.25)',
  padding: '0.6rem 0.75rem',
  background: 'rgba(0,0,0,0.2)',
  color: '#ffffff'
}

const labelStyle: React.CSSProperties = {
  color: 'rgba(255,255,255,0.75)',
  fontSize: '0.85rem'
}

export default function GetQuotePage() {
  const { t } = useI18n()
  const [courierLiability, setCourierLiability] = useState<'yes' | 'no'>('yes')
  const [coldGoodsLiability, setColdGoodsLiability] = useState<'yes' | 'no'>('no')
  const [privacyAccepted, setPrivacyAccepted] = useState(false)

  return (
    <section className="page" style={{ gap: '1.75rem' }}>
      <div style={{ width: '100%', maxWidth: 1200, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
        <Header
          title={t('getQuote.title')}
          subtitle={t('getQuote.subtitle')}
          titleColor="#ffffff"
          subtitleColor="rgba(255,255,255,0.82)"
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.6fr) minmax(0, 0.7fr)',
            gap: '1.25rem'
          }}
        >
          <div style={{ display: 'grid', gap: '1.25rem' }}>
            <Card variant="glass" title={t('getQuote.progress.title')} subtitle={t('getQuote.progress.subtitle')}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.35rem 0.9rem',
                  borderRadius: '999px',
                  background: 'rgba(255,255,255,0.15)',
                  color: '#ffffff',
                  fontWeight: 600
                }}
              >
                {t('getQuote.progress.step')}
              </div>
            </Card>

            <Card variant="glass" title={t('getQuote.company.title')} subtitle={t('getQuote.company.subtitle')}>
              <div style={{ display: 'grid', gap: '0.75rem' }}>
                <label style={labelStyle}>{t('getQuote.company.locationLabel')}</label>
                <select style={inputStyle} defaultValue="">
                  <option value="" disabled>
                    {t('getQuote.company.locationPlaceholder')}
                  </option>
                  <option value="de">{t('getQuote.company.location.de')}</option>
                  <option value="eu">{t('getQuote.company.location.eu')}</option>
                </select>
              </div>
            </Card>

            <Card variant="glass" title={t('getQuote.vehicles.title')} subtitle={t('getQuote.vehicles.subtitle')}>
              <div style={{ display: 'grid', gap: '1rem' }}>
                <div style={{ display: 'grid', gap: '0.75rem' }}>
                  <strong style={{ color: '#ffffff' }}>{t('getQuote.vehicles.primary')}</strong>
                  <label style={labelStyle}>{t('getQuote.vehicles.count')}</label>
                  <input style={inputStyle} type="number" placeholder="4" />
                  <label style={labelStyle}>{t('getQuote.vehicles.weight')}</label>
                  <input style={inputStyle} placeholder="7,5t" />
                  <label style={labelStyle}>{t('getQuote.vehicles.regionLabel')}</label>
                  <select style={inputStyle} defaultValue="de">
                    <option value="de">{t('getQuote.vehicles.region.de')}</option>
                    <option value="eu">{t('getQuote.vehicles.region.eu')}</option>
                  </select>
                </div>

                <div style={{ height: 1, background: 'rgba(255,255,255,0.12)' }} />

                <div style={{ display: 'grid', gap: '0.75rem' }}>
                  <strong style={{ color: '#ffffff' }}>{t('getQuote.vehicles.additional')}</strong>
                  <label style={labelStyle}>{t('getQuote.vehicles.count')}</label>
                  <input style={inputStyle} type="number" placeholder="6" />
                  <label style={labelStyle}>{t('getQuote.vehicles.weight')}</label>
                  <input style={inputStyle} placeholder="30t" />
                  <label style={labelStyle}>{t('getQuote.vehicles.regionLabel')}</label>
                  <select style={inputStyle} defaultValue="eu">
                    <option value="de">{t('getQuote.vehicles.region.de')}</option>
                    <option value="eu">{t('getQuote.vehicles.region.eu')}</option>
                  </select>
                </div>

                <Button variant="secondary" style={{ justifySelf: 'start' }}>
                  {t('getQuote.vehicles.add')}
                </Button>
              </div>
            </Card>

            <Card variant="glass" title={t('getQuote.deductible.title')} subtitle={t('getQuote.deductible.subtitle')}>
              <div style={{ display: 'grid', gap: '0.85rem' }}>
                <label style={labelStyle}>{t('getQuote.deductible.amountLabel')}</label>
                <input style={inputStyle} placeholder="750 EUR" />

                <div style={{ display: 'grid', gap: '0.6rem' }}>
                  <span style={labelStyle}>{t('getQuote.deductible.courier')}</span>
                  <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#ffffff' }}>
                      <input
                        type="radio"
                        name="courier"
                        checked={courierLiability === 'yes'}
                        onChange={() => setCourierLiability('yes')}
                      />
                      {t('getQuote.yes')}
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#ffffff' }}>
                      <input
                        type="radio"
                        name="courier"
                        checked={courierLiability === 'no'}
                        onChange={() => setCourierLiability('no')}
                      />
                      {t('getQuote.no')}
                    </label>
                  </div>
                </div>

                <div style={{ display: 'grid', gap: '0.6rem' }}>
                  <span style={labelStyle}>{t('getQuote.deductible.cold')}</span>
                  <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#ffffff' }}>
                      <input
                        type="radio"
                        name="cold"
                        checked={coldGoodsLiability === 'yes'}
                        onChange={() => setColdGoodsLiability('yes')}
                      />
                      {t('getQuote.yes')}
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#ffffff' }}>
                      <input
                        type="radio"
                        name="cold"
                        checked={coldGoodsLiability === 'no'}
                        onChange={() => setColdGoodsLiability('no')}
                      />
                      {t('getQuote.no')}
                    </label>
                  </div>
                </div>
              </div>
            </Card>

            <Card variant="glass" title={t('getQuote.preInsurer.title')} subtitle={t('getQuote.preInsurer.subtitle')}>
              <div style={{ display: 'grid', gap: '0.75rem' }}>
                <label style={labelStyle}>{t('getQuote.preInsurer.exists')}</label>
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#ffffff' }}>
                    <input type="radio" name="prior" defaultChecked />
                    {t('getQuote.yes')}
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#ffffff' }}>
                    <input type="radio" name="prior" />
                    {t('getQuote.no')}
                  </label>
                </div>
                <label style={labelStyle}>{t('getQuote.preInsurer.name')}</label>
                <input style={inputStyle} placeholder="Helvetia" />
                <label style={labelStyle}>{t('getQuote.preInsurer.number')}</label>
                <input style={inputStyle} placeholder="000.061.9019085" />
              </div>
            </Card>
          </div>

          <div style={{ display: 'grid', gap: '1.25rem', alignSelf: 'start' }}>
            <Card variant="glass" title={t('getQuote.summary.title')} subtitle={t('getQuote.summary.subtitle')}>
              <div style={{ display: 'grid', gap: '0.6rem', color: '#ffffff' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>{t('getQuote.summary.netAnnual')}</span>
                  <strong>xxx,xx €</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>{t('getQuote.summary.tax')}</span>
                  <strong>xx,xx €</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>{t('getQuote.summary.grossAnnual')}</span>
                  <strong>xxx,xx €</strong>
                </div>
                <div style={{ height: 1, background: 'rgba(255,255,255,0.12)' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>{t('getQuote.summary.contract')}</span>
                  <strong>xx.xx.20xx - xx.xx.20xx</strong>
                </div>
              </div>
            </Card>

            <Card variant="glass" title={t('getQuote.confirm.title')} subtitle={t('getQuote.confirm.subtitle')}>
              <label style={{ display: 'flex', gap: '0.6rem', color: 'rgba(255,255,255,0.8)', fontSize: '0.95rem' }}>
                <input
                  type="checkbox"
                  checked={privacyAccepted}
                  onChange={(event) => setPrivacyAccepted(event.target.checked)}
                />
                {t('getQuote.confirm.privacy')}
              </label>
              <Button style={{ width: '100%', marginTop: '1rem' }}>{t('getQuote.confirm.submit')}</Button>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
