import React from 'react'
import { Outlet } from 'react-router-dom'
import AppHeader from '@/components/layout/AppHeader'
import BackgroundLogin from '@/assets/images/background_login.png'

type FullscreenBgLayoutProps = {
  showHeader?: boolean
}

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
      <div style={{ position: 'relative', zIndex: 1, minHeight: '100vh', width: '100%' }}>
        {showHeader ? <AppHeader /> : null}
        <div
          style={{
            minHeight: '100vh',
            paddingTop: showHeader ? 'var(--header-height)' : 0
          }}
        >
          <Outlet />
        </div>
      </div>
    </div>
  )
}
