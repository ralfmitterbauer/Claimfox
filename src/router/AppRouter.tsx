import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import LoginPage from '@/pages/LoginPage'
import HomePage from '@/pages/HomePage'
import RegistrationPage from '@/pages/RegistrationPage'
import RolesPage from '@/pages/RolesPage'
import BrokerPortalLandingPage from '@/pages/BrokerPortalLandingPage'
import ProtectedRoute from '@/router/ProtectedRoute'
import FullscreenBgLayout from '@/layouts/FullscreenBgLayout'
import { useAuth } from '@/features/auth/AuthContext'
import BrokerCrmPage from '@/pages/BrokerCrmPage'
import FleetReportingPage from '@/pages/FleetReportingPage'
import FleetManagementPage from '@/pages/FleetManagementPage'
import MarketingLandingPage from '@/pages/MarketingLandingPage'
import ClaimManagerMarketingPage from '@/pages/ClaimManagerMarketingPage'
import ClaimManagerPage from '@/pages/ClaimManagerPage'
import ClaimManagerCasePage from '@/pages/ClaimManagerCasePage'
import ClaimProcessPage from '@/pages/ClaimProcessPage'
import PartnerManagementPage from '@/pages/PartnerManagementPage'
import FeatureTreePage from '@/pages/FeatureTreePage'
import LogisticsLandingPage from '@/pages/LogisticsLandingPage'
import LogisticsAppPage from '@/pages/LogisticsAppPage'

function NotFoundRedirect() {
  const { isAuthenticated } = useAuth()
  return <Navigate to={isAuthenticated ? '/roles' : '/home'} replace />
}

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route element={<FullscreenBgLayout showHeader={false} />}>
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
      </Route>
      <Route
        element={
          <ProtectedRoute>
            <FullscreenBgLayout showHeader />
          </ProtectedRoute>
        }
      >
        <Route path="/roles" element={<RolesPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/broker-portal" element={<BrokerPortalLandingPage />} />
        <Route path="/marketing" element={<MarketingLandingPage />} />
        <Route path="/broker-crm" element={<BrokerCrmPage />} />
        <Route path="/fleet-reporting" element={<FleetReportingPage />} />
        <Route path="/fleet-management" element={<FleetManagementPage />} />
        <Route path="/claim-manager" element={<ClaimManagerMarketingPage />} />
        <Route path="/claim-manager-app" element={<ClaimManagerPage />} />
        <Route path="/claim-manager-case" element={<ClaimManagerCasePage />} />
        <Route path="/claim-process" element={<ClaimProcessPage />} />
        <Route path="/partner-management" element={<PartnerManagementPage />} />
        <Route path="/feature-tree" element={<FeatureTreePage />} />
        <Route path="/logistics" element={<LogisticsLandingPage />} />
        <Route path="/logistics-app" element={<LogisticsAppPage />} />
      </Route>
      <Route path="*" element={<NotFoundRedirect />} />
    </Routes>
  )
}
