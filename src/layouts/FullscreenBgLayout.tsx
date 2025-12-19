import React from 'react'
import { Outlet } from 'react-router-dom'
import AppHeader from '@/components/layout/AppHeader'
import BackgroundLogin from '@/assets/images/background_login.png'

type FullscreenBgLayoutProps = {
  showHeader?: boolean
}

const OVERLAY_GRADIENT = 'linear-gradient(180deg, rgba(11,16,40,0.85) 0%, rgba(11,16,40,0.9) 50%, rgba(11,16,40,0.94) 100%)'

export default function FullscreenBgLayout({ showHeader = true }: FullscreenBgLayoutProps) {
  return (
    <div style={{ position: 'relative', minHeight: '100vh', width: '100%', overflow: 'hidden' }}>
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          backgroundImage: `url(${BackgroundLogin})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 1,
          backgroundImage: OVERLAY_GRADIENT
        }}
      />
      <div style={{ position: 'relative', zIndex: 2, minHeight: '100vh', width: '100%' }}>
        {showHeader ? <AppHeader /> : null}
        <Outlet />
      </div>
    </div>
  )
}
