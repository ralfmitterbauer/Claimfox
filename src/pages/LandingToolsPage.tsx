import React from 'react'
import Header from '@/components/ui/Header'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'

const TOOL_LIST = [
  {
    title: 'Next.js (App Router)',
    detail: 'Erkennbar an /_next/static/... Assets und app/[locale] Bundles.'
  },
  {
    title: 'React',
    detail: 'Implizit durch Next.js Runtime.'
  },
  {
    title: 'Material UI (MUI)',
    detail: 'Global CSS vars im Head: --mui-*'
  },
  {
    title: 'Emotion',
    detail: 'data-emotion="mui-global" im HTML.'
  },
  {
    title: 'Google Tag Manager',
    detail: 'GTM-K56DDZQ in Script/NoScript Tags.'
  },
  {
    title: 'Media Storage (AWS S3)',
    detail: 'Assets unter https://media-dev.insurfox.de/...'
  }
]

export default function LandingToolsPage() {
  return (
    <section className="page setup-page landing-page">
      <div className="setup-shell">
        <Header title="Toolsliste" subtitle="Technologie-Stack der Landing Page" subtitleColor="#65748b" />

        <div className="landing-actions">
          <Button onClick={() => window.print()}>PDF herunterladen</Button>
        </div>

        <div className="setup-grid">
          <Card className="setup-card">
            <h3>Verwendete Tools &amp; Technologien</h3>
            <ul>
              {TOOL_LIST.map((tool) => (
                <li key={tool.title}>
                  <strong>{tool.title}</strong> – {tool.detail}
                </li>
              ))}
            </ul>
          </Card>

          <Card className="setup-card">
            <h3>Hinweise zur Erkennung</h3>
            <ul>
              <li>HTML-Head enthält Next.js CSS/JS Assets und MUI/Emotion Styles.</li>
              <li>Tracking ist über Google Tag Manager eingebunden.</li>
              <li>Medien werden über media-dev.insurfox.de ausgeliefert.</li>
            </ul>
          </Card>
        </div>
      </div>
    </section>
  )
}
