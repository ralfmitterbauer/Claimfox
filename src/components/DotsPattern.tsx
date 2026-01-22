import React from 'react'

type Props = {
  className?: string
}

export default function DotsPattern({ className }: Props) {
  return (
    <svg
      className={className}
      width="160"
      height="120"
      viewBox="0 0 160 120"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <pattern id="ix-dots" x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.5" fill="var(--ix-border)" />
        </pattern>
      </defs>
      <rect width="160" height="120" fill="url(#ix-dots)" />
    </svg>
  )
}
