import React, { useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Header from '@/components/ui/Header'
import ClaimsfoxIcon from '@/assets/logos/Claimsfox_icon.png'
import { useI18n } from '@/i18n/I18nContext'

type ChatMessage = {
  id: string
  author: 'bot' | 'user'
  text: string
  time: string
}

const layoutStyles = `
  .claim-process-grid {
    display: grid;
    gap: 1.5rem;
    grid-template-columns: minmax(0, 1fr);
  }
  .claim-process-chat-shell {
    background: linear-gradient(135deg, rgba(255,255,255,0.25), rgba(212,56,13,0.35));
    border-radius: 26px;
    padding: 1px;
  }
  .claim-process-chat-surface {
    background: rgba(255,255,255,0.96);
    border-radius: 26px;
    padding: 1.5rem;
    box-shadow: 0 30px 60px rgba(7, 5, 50, 0.18);
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .claim-process-chat-header {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    flex-wrap: wrap;
    align-items: center;
  }
  .claim-process-pill {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.35rem 0.9rem;
    border-radius: 999px;
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    background: rgba(212,56,13,0.12);
    color: #8b2307;
  }
  .claim-process-messages {
    background: linear-gradient(180deg, rgba(255,255,255,0.96), rgba(248,247,255,0.98));
    border-radius: 20px;
    padding: 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    min-height: 360px;
    border: 1px solid rgba(8,0,40,0.06);
  }
  .claim-process-bubble {
    padding: 0.85rem 1.1rem;
    border-radius: 18px;
    box-shadow: 0 12px 25px rgba(8, 4, 50, 0.08);
    white-space: pre-line;
  }
  .claim-process-user {
    background: linear-gradient(140deg, #ffe4db, #fff1ea);
  }
  .claim-process-bot {
    background: #f8f7ff;
  }
  .claim-process-input {
    border-radius: 14px;
    border: 1px solid rgba(255,255,255,0.35);
    padding: 0.7rem 0.9rem;
    background: rgba(255,255,255,0.9);
    color: #0e0d1c;
  }
  @media (min-width: 980px) {
    .claim-process-grid {
      grid-template-columns: minmax(0, 1.55fr) minmax(0, 0.9fr);
    }
  }
  @media (max-width: 720px) {
    .claim-process-page {
      padding: calc(var(--header-height) + 20px) 0.9rem 2.5rem;
    }
    .claim-process-chat-surface {
      padding: 1.1rem;
    }
    .claim-process-messages {
      min-height: 280px;
      padding: 1rem;
    }
    .claim-process-chat-header strong {
      font-size: 1rem;
    }
  }
`

export default function ClaimProcessPage() {
  const { t, lang } = useI18n()
  const navigate = useNavigate()
  const locale = lang === 'de' ? 'de-DE' : 'en-US'
  const now = useMemo(() => new Date(), [])
  const dateLabel = useMemo(
    () => now.toLocaleDateString(locale, { day: '2-digit', month: '2-digit', year: 'numeric' }),
    [now, locale]
  )
  const timeLabel = useMemo(
    () => now.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' }),
    [now, locale]
  )
  const messageId = useRef(0)
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: `m-${messageId.current++}`,
      author: 'bot',
      text: t('claimProcess.intro'),
      time: timeLabel
    },
    {
      id: `m-${messageId.current++}`,
      author: 'bot',
      text: t('claimProcess.askTime'),
      time: timeLabel
    }
  ])
  const [draft, setDraft] = useState('')
  const [description, setDescription] = useState('')
  const [locationState, setLocationState] = useState<'idle' | 'pending' | 'granted' | 'denied'>('idle')
  const [street, setStreet] = useState('')
  const [houseNumber, setHouseNumber] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [city, setCity] = useState('')
  const [coords, setCoords] = useState<string | null>(null)
  const [claimNumber, setClaimNumber] = useState<string | null>(null)
  const [files, setFiles] = useState<File[]>([])
  const [photoStatus, setPhotoStatus] = useState('')
  const [step, setStep] = useState<
    'timeChoice' | 'timeOther' | 'locationChoice' | 'location' | 'address' | 'photos' | 'description' | 'done'
  >('timeChoice')
  const [incidentTime, setIncidentTime] = useState<string>('')
  const [incidentTimeOther, setIncidentTimeOther] = useState('')

  const uploadLabel =
    files.length === 0
      ? t('claimProcess.uploadEmpty')
      : t('claimProcess.uploadCount', { count: files.length })

  function getTimeStamp() {
    return new Date().toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' })
  }

  function appendMessage(author: ChatMessage['author'], text: string) {
    setMessages((prev) => [
      ...prev,
      {
        id: `m-${messageId.current++}`,
        author,
        text,
        time: getTimeStamp()
      }
    ])
  }

  function handleSend() {
    const trimmed = draft.trim()
    if (!trimmed) return
    appendMessage('user', trimmed)
    setDescription(trimmed)
    setDraft('')
    appendMessage('bot', t('claimProcess.botAck'))
    const generatedClaimNumber = `DE-${Math.floor(100000 + Math.random() * 900000)}`
    setClaimNumber(generatedClaimNumber)
    appendMessage('bot', t('claimProcess.claimNumberMessage', { claimNumber: generatedClaimNumber }))
    setStep('done')
  }

  async function resolveAddress(lat: number, lon: number) {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}&addressdetails=1&accept-language=${lang}`
    )
    if (!response.ok) {
      throw new Error('Reverse geocoding failed')
    }
    const data = (await response.json()) as {
      address?: Record<string, string>
    }
    const address = data.address ?? {}
    const road = address.road || address.pedestrian || address.residential || ''
    const number = address.house_number || ''
    const postcode = address.postcode || ''
    const cityValue = address.city || address.town || address.village || address.hamlet || ''
    return { road, number, postcode, cityValue }
  }

  function handleLocationRequest() {
    if (locationState === 'pending') return
    setLocationState('pending')

    if (typeof navigator === 'undefined' || !navigator.geolocation) {
      setLocationState('denied')
      appendMessage('bot', t('claimProcess.locationDenied'))
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coordsText = `${position.coords.latitude.toFixed(5)}, ${position.coords.longitude.toFixed(5)}`
        setCoords(coordsText)
        void resolveAddress(position.coords.latitude, position.coords.longitude)
          .then((address) => {
            setStreet(address.road)
            setHouseNumber(address.number)
            setPostalCode(address.postcode)
            setCity(address.cityValue)
            const streetLine = [address.road, address.number].filter(Boolean).join(' ')
            const cityLine = [address.postcode, address.cityValue].filter(Boolean).join(' ')
            setLocationState('granted')
            setStep('address')
            appendMessage('bot', t('claimProcess.askAddressConfirm'))
          })
          .catch(() => {
            setLocationState('denied')
            appendMessage('bot', t('claimProcess.locationDenied'))
            setStep('address')
            appendMessage('bot', t('claimProcess.askAddressConfirm'))
          })
      },
      () => {
        setLocationState('denied')
        appendMessage('bot', t('claimProcess.locationDenied'))
        setStep('address')
        appendMessage('bot', t('claimProcess.askAddressConfirm'))
      },
      { enableHighAccuracy: true, timeout: 8000 }
    )
  }

  function handleConfirmAddress() {
    setStep('photos')
    appendMessage('bot', t('claimProcess.addressConfirmed'))
    appendMessage('bot', t('claimProcess.askPhotos'))
  }

  function handleIncidentTime(choice: 'now' | 'other') {
    if (choice === 'now') {
      setIncidentTime(`${dateLabel} ${timeLabel}`)
      appendMessage('user', t('claimProcess.timeNow'))
      setStep('locationChoice')
      appendMessage('bot', t('claimProcess.askLocationChoice'))
      return
    }
    appendMessage('user', t('claimProcess.timeOther'))
    setStep('timeOther')
  }

  function handleTimeOtherConfirm() {
    const trimmed = incidentTimeOther.trim()
    if (!trimmed) return
    setIncidentTime(trimmed)
    appendMessage('user', trimmed)
    setStep('locationChoice')
    appendMessage('bot', t('claimProcess.askLocationChoice'))
  }

  function handleLocationChoice(choice: 'current' | 'other') {
    if (choice === 'current') {
      appendMessage('user', t('claimProcess.locationCurrent'))
      setStep('location')
      handleLocationRequest()
      return
    }
    appendMessage('user', t('claimProcess.locationOther'))
    setCoords(null)
    setLocationState('idle')
    setStep('address')
    appendMessage('bot', t('claimProcess.askAddressConfirm'))
  }

  function handlePhotoSelect(event: React.ChangeEvent<HTMLInputElement>) {
    const selected = Array.from(event.target.files ?? [])
    setFiles(selected)
    if (selected.length > 0) {
      setPhotoStatus(t('claimProcess.uploadCount', { count: selected.length }))
      appendMessage('user', t('claimProcess.photosUploaded', { count: selected.length }))
    } else {
      setPhotoStatus(t('claimProcess.photosSkipped'))
      appendMessage('user', t('claimProcess.photosSkipped'))
    }
    setStep('description')
    appendMessage('bot', t('claimProcess.askDescription'))
  }

  function handlePhotoSkip() {
    setPhotoStatus(t('claimProcess.photosSkipped'))
    appendMessage('user', t('claimProcess.photosSkipped'))
    setStep('description')
    appendMessage('bot', t('claimProcess.askDescription'))
  }

  return (
    <>
      <style>{layoutStyles}</style>
      <section
        className="claim-process-page"
        style={{
          minHeight: '100vh',
          width: '100%',
          padding: 'calc(var(--header-height) + 32px) 1.25rem 4rem',
          display: 'flex',
          justifyContent: 'center',
          color: '#ffffff'
        }}
      >
        <div style={{ width: '100%', maxWidth: 1200, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <Header
            title={t('claimProcess.title')}
            subtitle={t('claimProcess.subtitle')}
            titleColor="#ffffff"
            subtitleColor="rgba(255,255,255,0.8)"
            actions={
              <Button variant="secondary" onClick={() => navigate('/roles')}>
                {t('claimProcess.back')}
              </Button>
            }
          />

          <div className="claim-process-grid">
            <Card variant="glass" style={{ padding: '1.5rem', color: '#0e0d1c' }}>
              <div className="claim-process-chat-shell">
                <div className="claim-process-chat-surface">
                  <div className="claim-process-chat-header">
                    <div>
                      <strong style={{ fontSize: '1.05rem' }}>{t('claimProcess.chatTitle')}</strong>
                      <p style={{ margin: '0.2rem 0 0', color: 'rgba(8,0,40,0.6)', fontSize: '0.9rem' }}>
                        {t('claimProcess.chatSubtitle')}
                      </p>
                    </div>
                    <div className="claim-process-pill">{t('claimProcess.chatStatus')}</div>
                  </div>
                  <div className="claim-process-messages">
                    {messages.map((message) => {
                      const isUser = message.author === 'user'
                      return (
                        <div
                          key={message.id}
                          style={{
                            display: 'flex',
                            justifyContent: isUser ? 'flex-end' : 'flex-start',
                            gap: '0.5rem'
                          }}
                        >
                          {!isUser && (
                            <img src={ClaimsfoxIcon} alt="Claimsfox" style={{ width: '28px', height: '28px' }} />
                          )}
                          <div
                            style={{
                              maxWidth: '78%',
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: isUser ? 'flex-end' : 'flex-start'
                            }}
                          >
                            <div
                              className={`claim-process-bubble ${isUser ? 'claim-process-user' : 'claim-process-bot'}`}
                              style={{
                                borderRadius: isUser ? '18px 18px 4px 18px' : '18px 18px 18px 4px'
                              }}
                            >
                              {message.text}
                            </div>
                            <span style={{ fontSize: '0.7rem', color: 'rgba(8,0,40,0.5)', marginTop: '0.25rem' }}>
                              {message.time}
                            </span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                  <div>
                    {step === 'timeChoice' && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center' }}>
                        <Button onClick={() => handleIncidentTime('now')} style={{ padding: '0.6rem 1.3rem' }}>
                          {t('claimProcess.timeNow')}
                        </Button>
                        <Button variant="secondary" onClick={() => handleIncidentTime('other')} style={{ padding: '0.6rem 1.3rem' }}>
                          {t('claimProcess.timeOther')}
                        </Button>
                      </div>
                    )}

                    {step === 'timeOther' && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center' }}>
                        <input
                          value={incidentTimeOther}
                          onChange={(event) => setIncidentTimeOther(event.target.value)}
                          placeholder={t('claimProcess.timeOtherPlaceholder')}
                          className="claim-process-input"
                          style={{ flex: '1 1 240px' }}
                        />
                        <Button onClick={handleTimeOtherConfirm} style={{ padding: '0.6rem 1.5rem' }}>
                          {t('claimProcess.confirmTime')}
                        </Button>
                      </div>
                    )}

                    {step === 'locationChoice' && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center' }}>
                        <Button onClick={() => handleLocationChoice('current')} style={{ padding: '0.6rem 1.3rem' }}>
                          {t('claimProcess.locationCurrent')}
                        </Button>
                        <Button variant="secondary" onClick={() => handleLocationChoice('other')} style={{ padding: '0.6rem 1.3rem' }}>
                          {t('claimProcess.locationOther')}
                        </Button>
                      </div>
                    )}

                    {step === 'address' && (
                      <div
                        style={{
                          marginTop: '0.5rem',
                          display: 'grid',
                          gap: '0.75rem',
                          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))'
                        }}
                      >
                        {[
                          { label: t('claimProcess.street'), value: street, onChange: setStreet },
                          { label: t('claimProcess.houseNumber'), value: houseNumber, onChange: setHouseNumber },
                          { label: t('claimProcess.postalCode'), value: postalCode, onChange: setPostalCode },
                          { label: t('claimProcess.city'), value: city, onChange: setCity }
                        ].map((field) => (
                          <div
                            key={field.label}
                            style={{
                              borderRadius: '16px',
                              border: '1px solid rgba(255,255,255,0.2)',
                              background: 'rgba(255,255,255,0.2)',
                              padding: '0.65rem'
                            }}
                          >
                            <span style={{ color: 'rgba(8,0,40,0.65)', fontSize: '0.75rem' }}>{field.label}</span>
                            <input
                              value={field.value}
                              onChange={(event) => field.onChange(event.target.value)}
                              placeholder={field.label}
                              className="claim-process-input"
                              style={{ width: '100%', marginTop: '0.35rem' }}
                            />
                          </div>
                        ))}
                        <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'flex-end' }}>
                          <Button onClick={handleConfirmAddress} style={{ padding: '0.55rem 1.4rem' }}>
                            {t('claimProcess.confirmAddress')}
                          </Button>
                        </div>
                      </div>
                    )}

                    {step === 'photos' && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center' }}>
                        <label
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            background: '#d4380d',
                            color: '#fff',
                            padding: '0.6rem 1.2rem',
                            borderRadius: '999px',
                            cursor: 'pointer',
                            fontWeight: 700
                          }}
                        >
                          <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handlePhotoSelect}
                            style={{ display: 'none' }}
                          />
                          {t('claimProcess.upload')}
                        </label>
                        <span style={{ color: 'rgba(8,0,40,0.6)' }}>{uploadLabel}</span>
                        <Button
                          variant="secondary"
                          onClick={handlePhotoSkip}
                          style={{ padding: '0.55rem 1.1rem', background: '#ffffffd9' }}
                        >
                          {t('claimProcess.skipPhotos')}
                        </Button>
                      </div>
                    )}

                    {step === 'description' && (
                      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                        <input
                          value={draft}
                          onChange={(event) => setDraft(event.target.value)}
                          placeholder={t('claimProcess.inputPlaceholder')}
                          className="claim-process-input"
                          style={{ flex: '1 1 240px' }}
                        />
                        <Button onClick={handleSend} style={{ padding: '0.6rem 1.5rem' }}>
                          {t('claimProcess.send')}
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Card>

            <Card variant="glass" style={{ padding: '1.5rem', color: '#ffffff' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <h3 style={{ margin: 0 }}>{t('claimProcess.infoTitle')}</h3>
                  {t('claimProcess.infoSubtitle') && (
                    <p style={{ margin: '0.35rem 0 0', color: 'rgba(255,255,255,0.75)' }}>
                      {t('claimProcess.infoSubtitle')}
                    </p>
                  )}
                </div>

                <div style={{ display: 'grid', gap: '0.75rem' }}>
                  {[ 
                    { label: t('claimProcess.street'), value: street },
                    { label: t('claimProcess.houseNumber'), value: houseNumber },
                    { label: t('claimProcess.postalCode'), value: postalCode },
                    { label: t('claimProcess.city'), value: city },
                    { label: t('claimProcess.infoIncidentTime'), value: incidentTime },
                    { label: t('claimProcess.infoPhotos'), value: photoStatus || (files.length ? t('claimProcess.uploadCount', { count: files.length }) : '') },
                    { label: t('claimProcess.infoDescription'), value: description },
                    { label: t('claimProcess.infoDate'), value: dateLabel },
                    { label: t('claimProcess.infoTime'), value: timeLabel },
                    { label: t('claimProcess.infoClaimNumber'), value: claimNumber ?? '' },
                    { label: t('claimProcess.infoStatus'), value: t('claimProcess.statusOpen') }
                  ].map((row) => (
                    <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
                      <span style={{ color: 'rgba(255,255,255,0.7)' }}>{row.label}</span>
                      <strong>{row.value || t('claimProcess.valuePending')}</strong>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </>
  )
}
