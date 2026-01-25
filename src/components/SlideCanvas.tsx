import React, { useEffect, useState } from 'react'

type SlideCanvasProps = {
  children: React.ReactNode
  className?: string
  isPrint?: boolean
  width?: number
  height?: number
}

const DEFAULT_WIDTH = 1122
const DEFAULT_HEIGHT = 793
const MAX_SCALE = 1.2
const MIN_SCALE = 0.85

export default function SlideCanvas({
  children,
  className,
  isPrint = false,
  width = DEFAULT_WIDTH,
  height = DEFAULT_HEIGHT
}: SlideCanvasProps) {
  const [scale, setScale] = useState(1)

  useEffect(() => {
    if (isPrint) {
      return
    }

    const updateScale = () => {
      const headerHeight = parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue('--app-header-h')
      ) || 0
      const availableWidth = window.innerWidth || document.documentElement.clientWidth
      const availableHeight = (window.innerHeight || document.documentElement.clientHeight) - headerHeight
      const nextScale = Math.min(
        availableWidth / width,
        availableHeight / height,
        MAX_SCALE
      )
      setScale(Math.max(nextScale, MIN_SCALE))
    }

    updateScale()
    window.addEventListener('resize', updateScale)
    return () => window.removeEventListener('resize', updateScale)
  }, [height, isPrint, width])

  return (
    <div className={`slide-canvas ${className ?? ''}`}>
      <div
        className="slide-board"
        style={{ transform: isPrint ? 'none' : `scale(${scale})` }}
      >
        {children}
      </div>
    </div>
  )
}
