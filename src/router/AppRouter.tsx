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
import GetQuotePage from '@/pages/GetQuotePage'
import LogisticsLandingPage from '@/pages/LogisticsLandingPage'
import LogisticsAppPage from '@/pages/LogisticsAppPage'
import MvpPage from '@/pages/MvpPage'
import PolicyPurchasePage from '@/pages/PolicyPurchasePage'
import MyProfilePage from '@/pages/MyProfilePage'
import ProfilePersonalPage from '@/pages/ProfilePersonalPage'
import ProfileCompanyPage from '@/pages/ProfileCompanyPage'
import ProfileInsurancesPage from '@/pages/ProfileInsurancesPage'
import ProfileFleetPage from '@/pages/ProfileFleetPage'
import ProfileLocationsPage from '@/pages/ProfileLocationsPage'
import ProfileOnboardingPage from '@/pages/ProfileOnboardingPage'
import AiWhitepaperPage from '@/pages/AiWhitepaperPage'
import InternPage from '@/pages/InternPage'
import AiOnboardingPage from '@/pages/AiOnboardingPage'
import UserIdentificationPage from '@/pages/UserIdentificationPage'
import RegulatoryGovernancePage from '@/pages/RegulatoryGovernancePage'
import AuditAppendixPage from '@/pages/AuditAppendixPage'
import StrategicDeepDivePage from '@/pages/StrategicDeepDivePage'
import InsurfoxWhitepaperPage from '@/pages/InsurfoxWhitepaperPage'

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
        <Route path="/get-quote" element={<GetQuotePage />} />
        <Route path="/logistics" element={<LogisticsLandingPage />} />
        <Route path="/logistics-app" element={<LogisticsAppPage />} />
        <Route path="/mvp" element={<MvpPage />} />
        <Route path="/policy-purchase" element={<PolicyPurchasePage />} />
        <Route path="/profile" element={<MyProfilePage />} />
        <Route path="/profile/onboarding" element={<ProfileOnboardingPage />} />
        <Route path="/profile/personal" element={<ProfilePersonalPage />} />
        <Route path="/profile/company" element={<ProfileCompanyPage />} />
        <Route path="/profile/insurances" element={<ProfileInsurancesPage />} />
        <Route path="/profile/fleet" element={<ProfileFleetPage />} />
        <Route path="/profile/locations" element={<ProfileLocationsPage />} />
        <Route path="/ai-whitepaper" element={<AiWhitepaperPage />} />
        <Route path="/intern" element={<InternPage />} />
        <Route path="/ai-onboarding" element={<AiOnboardingPage />} />
        <Route path="/user-identification" element={<UserIdentificationPage />} />
        <Route path="/governance/regulatory-ai-governance" element={<RegulatoryGovernancePage />} />
        <Route path="/governance/audit-appendix" element={<AuditAppendixPage />} />
        <Route path="/governance/strategic-deep-dive" element={<StrategicDeepDivePage />} />
        <Route path="/insurfox-whitepaper" element={<InsurfoxWhitepaperPage />} />
      </Route>
      <Route path="*" element={<NotFoundRedirect />} />
    </Routes>
  )
}
