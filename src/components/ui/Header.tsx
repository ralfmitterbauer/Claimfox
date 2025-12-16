import React from 'react'

type HeaderProps = {
  title: string
  subtitle?: string
  actions?: React.ReactNode
}

export default function Header({ title, subtitle, actions }: HeaderProps) {
  return (
    <header
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
        paddingBottom: '1.5rem',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: '1rem',
          flexWrap: 'wrap',
        }}
      >
        <div>
          {/* Removed hardcoded "ClaimFox" label */}
          <h1
            style={{
              margin: 0,
              fontSize: '2.1rem',
              lineHeight: 1.2,
              color: '#080064',
            }}
          >
            {title}
          </h1>
        </div>

        {actions && <div style={{ alignSelf: 'center' }}>{actions}</div>}
      </div>

      {subtitle && (
        <p style={{ margin: 0, color: '#494870', maxWidth: '720px' }}>
          {subtitle}
        </p>
      )}
    </header>
  )
}
