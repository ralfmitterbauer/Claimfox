import React, { useEffect, useRef, useState } from 'react'

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
  const canvasRef = useRef<HTMLDivElement>(null)
  const boardRef = useRef<HTMLDivElement>(null)

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

      let nextScale = Math.min(
        availableWidth / width,
        availableHeight / height,
        MAX_SCALE
      )

      const board = boardRef.current
      const canvas = canvasRef.current
      if (board && canvas) {
        const boardHeight = board.getBoundingClientRect().height
        const canvasHeight = canvas.clientHeight
        if (boardHeight > 0 && canvasHeight > 0 && boardHeight > canvasHeight) {
          nextScale = Math.min(nextScale, canvasHeight / boardHeight)
        }
      }

      setScale(Math.max(nextScale, MIN_SCALE))
    }

    updateScale()
    window.addEventListener('resize', updateScale)
    return () => window.removeEventListener('resize', updateScale)
  }, [height, isPrint, width])

  return (
    <div className={`slide-canvas ${className ?? ''}`} ref={canvasRef}>
      <div
        className="slide-board"
        ref={boardRef}
        style={{ transform: isPrint ? 'none' : `scale(${scale})` }}
      >
        {children}
      </div>
    </div>
  )
}
