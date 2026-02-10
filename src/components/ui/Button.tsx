import React from 'react'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md'
  disableHover?: boolean
}

const VARIANT_STYLES: Record<'primary' | 'secondary', React.CSSProperties> = {
  primary: {
    background: '#d4380d',
    color: '#fff'
  },
  secondary: {
    background: '#ffffff',
    border: '1px solid #d9d9d9',
    color: '#0e0d1c'
  }
}

export default function Button({
  children,
  className,
  style,
  variant = 'primary',
  size = 'md',
  type,
  disableHover = false,
  ...props
}: ButtonProps) {
  const isDisabled = Boolean(props.disabled)

  const baseStyle: React.CSSProperties = {
    border: 'none',
    borderRadius: '999px',
    padding: size === 'sm' ? '0 14px' : '0.85rem 1.75rem',
    height: size === 'sm' ? 36 : undefined,
    fontWeight: size === 'sm' ? 600 : 700,
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '0.5rem',
    boxShadow: variant === 'secondary' ? 'none' : size === 'sm' ? '0 6px 12px rgba(212, 56, 13, 0.18)' : '0 12px 24px rgba(212, 56, 13, 0.25)',
    transition: 'transform 0.15s ease, opacity 0.15s ease, background-color 0.15s ease',
    opacity: isDisabled ? 0.6 : 1,
    cursor: isDisabled ? 'not-allowed' : 'pointer'
  }

  return (
    <button
      {...props}
      type={type ?? 'button'}
      className={className}
      style={{
        ...baseStyle,
        ...VARIANT_STYLES[variant],
        ...style
      }}
      onMouseEnter={(event) => {
        props.onMouseEnter?.(event)
        if (!isDisabled && variant === 'primary' && !disableHover) {
          event.currentTarget.style.backgroundColor = '#b9300b'
        }
      }}
      onMouseLeave={(event) => {
        props.onMouseLeave?.(event)
        if (!isDisabled && variant === 'primary' && !disableHover) {
          event.currentTarget.style.backgroundColor = '#d4380d'
        }
        if (!isDisabled && !disableHover) {
          event.currentTarget.style.transform = 'translateY(0)'
        }
      }}
      onMouseDown={(event) => {
        props.onMouseDown?.(event)
        if (!isDisabled && !disableHover) {
          event.currentTarget.style.transform = 'translateY(1px)'
        }
      }}
      onMouseUp={(event) => {
        props.onMouseUp?.(event)
        if (!isDisabled && !disableHover) {
          event.currentTarget.style.transform = 'translateY(0)'
        }
      }}
    >
      {children}
    </button>
  )
}
