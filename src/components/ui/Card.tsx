import React from 'react'

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  title?: React.ReactNode
  subtitle?: React.ReactNode
  interactive?: boolean
  variant?: 'default' | 'glass'
}

export default function Card({
  children,
  className,
  subtitle,
  title,
  style,
  interactive,
  onClick,
  tabIndex,
  role,
  variant = 'default',
  ...props
}: CardProps) {
  const isInteractive = interactive || Boolean(onClick)
  const isGlass = variant === 'glass'

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (!isInteractive) {
      props.onKeyDown?.(event)
      return
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      onClick?.(event as unknown as React.MouseEvent<HTMLDivElement, MouseEvent>)
    }

    props.onKeyDown?.(event)
  }

  return (
    <div
      {...props}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role={isInteractive ? role ?? 'button' : role}
      tabIndex={isInteractive ? tabIndex ?? 0 : tabIndex}
      className={className}
      style={{
        backgroundColor: '#ffffff',
        border: '1px solid #ececec',
        borderRadius: '20px',
        padding: '1.75rem',
        boxShadow: '0 8px 24px rgba(15, 23, 42, 0.08)',
        color: '#0e0d1c',
        width: '100%',
        cursor: isInteractive ? 'pointer' : undefined,
        transition: isInteractive ? 'transform 0.2s ease, box-shadow 0.2s ease' : undefined,
        ...style
      }}
    >
      {(title || subtitle) && (
        <header style={{ marginBottom: '1.5rem' }}>
          {title && (
            <h2 style={{ margin: 0, fontSize: '1.3rem', color: '#0e0d1c' }}>
              {title}
            </h2>
          )}
          {subtitle && (
            <p style={{ marginTop: '0.35rem', marginBottom: 0, color: '#65748b' }}>
              {subtitle}
            </p>
          )}
        </header>
      )}
      {children}
    </div>
  )
}
