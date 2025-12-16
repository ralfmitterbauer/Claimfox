import React from 'react'
import { Outlet } from 'react-router-dom'
import PageHeader from '../shared/ui/PageHeader'
import BottomNav from '../shared/ui/BottomNav'
import TopHeader from '../shared/ui/TopHeader'
import heroMockup from '@/assets/mockups/hero-mockup.png'

const topbarBackground: React.CSSProperties = {
  '--topbar-hero-image': `url(${heroMockup})`
}

export default function AppShell() {
  return (
    <div className="app-shell">
      <TopHeader />
      <header className="topbar" style={topbarBackground}>
        <PageHeader title="My Insurfox" />
      </header>
      <main className="app-main">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  )
}
