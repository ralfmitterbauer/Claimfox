import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '@/components/ui/Button'

type KPI = {
  label: string
  value: string
}

type Card = {
  title: string
  body?: string
}

type Section = {
  id: string
  title: string
  body: string
  kpis: KPI[]
  cards: Card[]
}

type InsuranceDashboardDetailProps = {
  kicker: string
  title: string
  subtitle: string
  backLabel: string
  backRoute: string
  kpis: KPI[]
  sections: Section[]
}

export default function InsuranceDashboardDetail(props: InsuranceDashboardDetailProps) {
  const navigate = useNavigate()
  const go = (route: string) => {
    navigate(route)
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }

  return (
    <main className="home-marketing">
      <section className="home-value" style={{ paddingTop: '2.5rem' }}>
        <div
          className="home-section-header"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}
        >
          <div>
            <span className="home-hero-kicker">{props.kicker}</span>
            <h1 style={{ margin: '0.35rem 0 0.4rem' }}>{props.title}</h1>
            <p>{props.subtitle}</p>
          </div>
          <Button
            onClick={() => go(props.backRoute)}
            className="home-marketing-login"
            style={{ padding: '0.5rem 1.1rem' }}
            disableHover
          >
            {props.backLabel}
          </Button>
        </div>
        <div className="home-value-grid">
          {props.kpis.map((kpi) => (
            <div key={kpi.label} className="home-value-card" style={{ display: 'grid', gap: '0.35rem' }}>
              <div style={{ fontSize: '1.8rem', fontWeight: 700, color: '#0f172a' }}>{kpi.value}</div>
              <div style={{ color: '#475569' }}>{kpi.label}</div>
            </div>
          ))}
        </div>
      </section>

      {props.sections.map((section, idx) => (
        <section key={section.id} className="home-value">
          {idx > 0 && (
            <div style={{ width: '100%', height: 2, background: 'var(--insurfox-blue, #2563eb)', marginBottom: '2rem' }} />
          )}
          <div className="home-section-header">
            <h2>{section.title}</h2>
            <p>{section.body}</p>
          </div>
          <div className="home-value-grid">
            {section.kpis.map((kpi) => (
              <div key={kpi.label} className="home-value-card" style={{ display: 'grid', gap: '0.35rem' }}>
                <div style={{ fontSize: '1.6rem', fontWeight: 700, color: '#0f172a' }}>{kpi.value}</div>
                <div style={{ color: '#475569' }}>{kpi.label}</div>
              </div>
            ))}
          </div>
          <div className="home-value-grid" style={{ marginTop: '1.25rem' }}>
            {section.cards.map((card) => (
              <div key={card.title} className="home-value-card" style={{ textAlign: 'left' }}>
                <h3>{card.title}</h3>
                {card.body ? <p>{card.body}</p> : null}
              </div>
            ))}
          </div>
        </section>
      ))}
    </main>
  )
}
