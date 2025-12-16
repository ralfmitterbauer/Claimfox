import React from 'react'
import { Outlet } from 'react-router-dom'
import BottomNav from '../../shared/ui/BottomNav'
import PageHeader from '../../shared/ui/PageHeader'
import ExecHomeButton from '../../features/exec-summary/ExecHomeButton'
import TopHeader from '../../shared/ui/TopHeader'
import heroMockup from '@/assets/mockups/hero-mockup.png'

const topbarBackground: React.CSSProperties = {
  '--topbar-hero-image': `url(${heroMockup})`
}

export default function AppLayout() {
  return (
    <div className="app-shell">
      <TopHeader />
      <header className="topbar" style={topbarBackground}>
        <PageHeader title="My Insurfox" />
      </header>
      <main className="app-main">
        <Outlet />
      </main>
      <ExecHomeButton />
      <BottomNav />
    </div>
  )
}
