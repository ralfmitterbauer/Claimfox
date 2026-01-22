import React, { useEffect } from 'react'

type Source = {
  id: string
  title: string
  publisher: string
  year: number
  documentType: string
  lastVerified: string
  url: string
}

type Props = {
  open: boolean
  sources: Source[]
  onClose: () => void
}

export default function SourcesDrawer({ open, sources, onClose }: Props) {
  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose()
    }
    if (open) {
      window.addEventListener('keydown', onKey)
    }
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <>
      <div className="drawer-backdrop" onClick={onClose} />
      <aside className="drawer" aria-live="polite">
        <header>
          <div>
            <h3>Sources & Verification</h3>
            <p className="disclaimer">Audit-ready source placeholders</p>
          </div>
          <button type="button" className="filter-chip" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </header>
        {sources.map((source) => (
          <div key={source.id} className="card" style={{ marginTop: '1rem' }}>
            <strong>{source.title}</strong>
            <p>{source.publisher}</p>
            <p>{source.documentType}</p>
            <p>{source.year}</p>
            <p>Last verified: {source.lastVerified}</p>
            <p>URL: {source.url || 'TBD'}</p>
          </div>
        ))}
      </aside>
    </>
  )
}
