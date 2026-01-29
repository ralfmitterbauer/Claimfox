import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import LoginPage from '@/pages/LoginPage'
import HomePage from '@/pages/HomePage'
import RegistrationPage from '@/pages/RegistrationPage'
import RolesPage from '@/pages/RolesPage'
import BrokerPortalLandingPage from '@/pages/BrokerPortalLandingPage'
import BrokerAdminPage from '@/pages/BrokerAdminPage'
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
import ClaimManagerAppListPage from '@/pages/ClaimManagerAppListPage'
import ClaimProcessPage from '@/pages/ClaimProcessPage'
import PartnerManagementPage from '@/pages/PartnerManagementPage'
import PartnerManagementOverviewPage from '@/pages/PartnerManagementOverviewPage'
import PartnerManagementAssistancePage from '@/pages/PartnerManagementAssistancePage'
import PartnerManagementRentalPage from '@/pages/PartnerManagementRentalPage'
import PartnerManagementSurveyorsPage from '@/pages/PartnerManagementSurveyorsPage'
import PartnerManagementMajorLossPage from '@/pages/PartnerManagementMajorLossPage'
import PartnerManagementPartsPage from '@/pages/PartnerManagementPartsPage'
import FeatureTreePage from '@/pages/FeatureTreePage'
import GetQuotePage from '@/pages/GetQuotePage'
import LogisticsLandingPage from '@/pages/LogisticsLandingPage'
import InsuranceLandingPage from '@/pages/InsuranceLandingPage'
import FleetLandingPage from '@/pages/FleetLandingPage'
import PartnerLandingPage from '@/pages/PartnerLandingPage'
import LogisticsAppPage from '@/pages/LogisticsAppPage'
import MvpPage from '@/pages/MvpPage'
import UnderwriterRolePage from '@/pages/UnderwriterRolePage'
import LegalRolePage from '@/pages/LegalRolePage'
import LegalIntakePage from '@/pages/LegalIntakePage'
import LegalClaimsSpecialistPage from '@/pages/LegalClaimsSpecialistPage'
import LegalProductDistributionPage from '@/pages/LegalProductDistributionPage'
import LegalRegulatoryCompliancePage from '@/pages/LegalRegulatoryCompliancePage'
import LegalLitigationManagerPage from '@/pages/LegalLitigationManagerPage'
import LegalCarrierFinalAuthorityPage from '@/pages/LegalCarrierFinalAuthorityPage'
import FinanceRolePage from '@/pages/FinanceRolePage'
import FinanceAnalystPage from '@/pages/FinanceAnalystPage'
import FinancePremiumBillingOpsPage from '@/pages/FinancePremiumBillingOpsPage'
import FinanceClaimsPage from '@/pages/FinanceClaimsPage'
import FinanceReinsurancePage from '@/pages/FinanceReinsurancePage'
import FinanceControllerPage from '@/pages/FinanceControllerPage'
import FinanceCfoFinalAuthorityPage from '@/pages/FinanceCfoFinalAuthorityPage'
import UnderwriterReportingPage from '@/pages/UnderwriterReportingPage'
import UnderwriterJuniorPage from '@/pages/UnderwriterJuniorPage'
import UnderwriterSeniorPage from '@/pages/UnderwriterSeniorPage'
import UnderwriterCarrierPage from '@/pages/UnderwriterCarrierPage'
import UnderwriterCompliancePage from '@/pages/UnderwriterCompliancePage'
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
import RequirementsCatalogPage from '@/pages/RequirementsCatalogPage'
import QuestionsQicPage from '@/pages/QuestionsQicPage'
import CvPage from '@/pages/CvPage'
import AnschreibenPage from '@/pages/AnschreibenPage'
import SetupPage from '@/pages/SetupPage'
import StoryblokTestPage from '@/pages/StoryblokTestPage'
import LandingSitemapPage from '@/pages/LandingSitemapPage'
import LandingToolsPage from '@/pages/LandingToolsPage'
import InternalDocsOverviewPage from '@/pages/InternalDocsOverviewPage'
import BusinessModelAntaresPage from '@/pages/BusinessModelAntaresPage'
import MarketOverviewPage from '@/pages/MarketOverviewPage'
import PremiumCorridorPage from '@/pages/PremiumCorridorPage'
import BciaDeckPage from '@/pages/BciaDeckPage'
import InsurfoxIaaSPage from '@/pages/InsurfoxIaaSPage'
import DemoOverviewPage from '@/pages/DemoOverviewPage'
import DemoStepPage from '@/pages/DemoStepPage'
import DemoRoleOverviewPage from '@/pages/DemoRoleOverviewPage'
import DemoDriverOverviewPage from '@/pages/DemoDriverOverviewPage'
import DemoDriverStepPage from '@/pages/DemoDriverStepPage'
import DemoJuniorUnderwriterPage from '@/pages/demo-underwriter/DemoJuniorUnderwriterPage'
import DemoJuniorUnderwriterStepPage from '@/pages/demo-underwriter/DemoJuniorUnderwriterStepPage'
import DemoSeniorUnderwriterPage from '@/pages/demo-underwriter/DemoSeniorUnderwriterPage'
import DemoSeniorUnderwriterStepPage from '@/pages/demo-underwriter/DemoSeniorUnderwriterStepPage'
import DemoCarrierAuthorityPage from '@/pages/demo-underwriter/DemoCarrierAuthorityPage'
import DemoCarrierAuthorityStepPage from '@/pages/demo-underwriter/DemoCarrierAuthorityStepPage'
import DemoCompliancePage from '@/pages/demo-underwriter/DemoCompliancePage'
import DemoComplianceStepPage from '@/pages/demo-underwriter/DemoComplianceStepPage'
import DemoLegalCounselPage from '@/pages/demo-legal/DemoLegalCounselPage'
import DemoLegalCounselStepPage from '@/pages/demo-legal/DemoLegalCounselStepPage'
import DemoLegalClaimsPage from '@/pages/demo-legal/DemoLegalClaimsPage'
import DemoLegalClaimsStepPage from '@/pages/demo-legal/DemoLegalClaimsStepPage'
import DemoRegulatoryLegalPage from '@/pages/demo-legal/DemoRegulatoryLegalPage'
import DemoRegulatoryLegalStepPage from '@/pages/demo-legal/DemoRegulatoryLegalStepPage'
import DemoPrivacyLegalPage from '@/pages/demo-legal/DemoPrivacyLegalPage'
import DemoPrivacyLegalStepPage from '@/pages/demo-legal/DemoPrivacyLegalStepPage'

function NotFoundRedirect() {
  const { isAuthenticated } = useAuth()
  return <Navigate to={isAuthenticated ? '/home' : '/login'} replace />
}

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route element={<FullscreenBgLayout showHeader={false} />}>
        <Route path="/login" element={<LoginPage />} />
      </Route>
      <Route element={<FullscreenBgLayout showHeader />}>
        <Route path="/roles/underwriter/reporting" element={<UnderwriterReportingPage />} />
        <Route path="/roles/underwriter/junior" element={<UnderwriterJuniorPage />} />
        <Route path="/roles/underwriter/senior" element={<UnderwriterSeniorPage />} />
        <Route path="/roles/underwriter/carrier" element={<UnderwriterCarrierPage />} />
        <Route path="/roles/underwriter/compliance" element={<UnderwriterCompliancePage />} />
        <Route path="/insurfox-iaas" element={<InsurfoxIaaSPage />} />
        <Route path="/demo-driver" element={<DemoDriverOverviewPage />} />
        <Route path="/demo-driver/step/:stepId" element={<DemoDriverStepPage />} />
        <Route path="/demo-underwriter/junior" element={<DemoJuniorUnderwriterPage />} />
        <Route path="/demo-underwriter/junior/step/:stepId" element={<DemoJuniorUnderwriterStepPage />} />
        <Route path="/demo-underwriter/senior" element={<DemoSeniorUnderwriterPage />} />
        <Route path="/demo-underwriter/senior/step/:stepId" element={<DemoSeniorUnderwriterStepPage />} />
        <Route path="/demo-underwriter/carrier" element={<DemoCarrierAuthorityPage />} />
        <Route path="/demo-underwriter/carrier/step/:stepId" element={<DemoCarrierAuthorityStepPage />} />
        <Route path="/demo-underwriter/compliance" element={<DemoCompliancePage />} />
        <Route path="/demo-underwriter/compliance/step/:stepId" element={<DemoComplianceStepPage />} />
        <Route path="/demo-legal/counsel" element={<DemoLegalCounselPage />} />
        <Route path="/demo-legal/counsel/step/:stepId" element={<DemoLegalCounselStepPage />} />
        <Route path="/demo-legal/claims" element={<DemoLegalClaimsPage />} />
        <Route path="/demo-legal/claims/step/:stepId" element={<DemoLegalClaimsStepPage />} />
        <Route path="/demo-legal/regulatory" element={<DemoRegulatoryLegalPage />} />
        <Route path="/demo-legal/regulatory/step/:stepId" element={<DemoRegulatoryLegalStepPage />} />
        <Route path="/demo-legal/privacy" element={<DemoPrivacyLegalPage />} />
        <Route path="/demo-legal/privacy/step/:stepId" element={<DemoPrivacyLegalStepPage />} />
      </Route>
      <Route element={<ProtectedRoute><FullscreenBgLayout showHeader={false} /></ProtectedRoute>}>
        <Route path="/home" element={<HomePage />} />
      </Route>
      <Route element={<ProtectedRoute><FullscreenBgLayout showHeader /></ProtectedRoute>}>
        <Route path="/demo" element={<DemoOverviewPage />} />
        <Route path="/demo/step/:stepId" element={<DemoStepPage />} />
        <Route path="/demo/role/:roleId" element={<DemoRoleOverviewPage />} />
        <Route path="/roles" element={<RolesPage />} />
        <Route path="/roles/underwriter" element={<UnderwriterRolePage />} />
        <Route path="/roles/legal" element={<LegalRolePage />} />
        <Route path="/roles/legal/intake" element={<LegalIntakePage />} />
        <Route path="/roles/legal/claims-specialist" element={<LegalClaimsSpecialistPage />} />
        <Route path="/roles/legal/product-distribution" element={<LegalProductDistributionPage />} />
        <Route path="/roles/legal/regulatory-compliance" element={<LegalRegulatoryCompliancePage />} />
        <Route path="/roles/legal/litigation-manager" element={<LegalLitigationManagerPage />} />
        <Route path="/roles/legal/carrier-final-authority" element={<LegalCarrierFinalAuthorityPage />} />
        <Route path="/roles/finance" element={<FinanceRolePage />} />
        <Route path="/finance/analyst" element={<FinanceAnalystPage />} />
        <Route path="/finance/billing" element={<FinancePremiumBillingOpsPage />} />
        <Route path="/finance/claims" element={<FinanceClaimsPage />} />
        <Route path="/finance/reinsurance" element={<FinanceReinsurancePage />} />
        <Route path="/finance/controller" element={<FinanceControllerPage />} />
        <Route path="/finance/cfo" element={<FinanceCfoFinalAuthorityPage />} />
        <Route path="/roles/finance/analyst" element={<FinanceAnalystPage />} />
        <Route path="/roles/finance/premium-billing" element={<FinancePremiumBillingOpsPage />} />
        <Route path="/roles/finance/claims" element={<FinanceClaimsPage />} />
        <Route path="/roles/finance/reinsurance" element={<FinanceReinsurancePage />} />
        <Route path="/roles/finance/controller" element={<FinanceControllerPage />} />
        <Route path="/roles/finance/cfo-final-authority" element={<FinanceCfoFinalAuthorityPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/broker-portal" element={<BrokerPortalLandingPage />} />
        <Route path="/marketing" element={<MarketingLandingPage />} />
        <Route path="/broker-crm" element={<BrokerCrmPage />} />
        <Route path="/broker-admin" element={<BrokerAdminPage />} />
        <Route path="/fleet-reporting" element={<FleetReportingPage />} />
        <Route path="/fleet-management" element={<FleetManagementPage />} />
        <Route path="/claim-manager" element={<ClaimManagerMarketingPage />} />
        <Route path="/claim-manager-app" element={<ClaimManagerAppListPage />} />
        <Route path="/claim-manager-case" element={<ClaimManagerCasePage />} />
        <Route path="/claim-manager-case/:claimNumber" element={<ClaimManagerCasePage />} />
        <Route path="/claim-process" element={<ClaimProcessPage />} />
        <Route path="/partner-management-overview" element={<PartnerManagementOverviewPage />} />
        <Route path="/partner-management" element={<PartnerManagementPage />} />
        <Route path="/partner-management-assistance" element={<PartnerManagementAssistancePage />} />
        <Route path="/partner-management-rental" element={<PartnerManagementRentalPage />} />
        <Route path="/partner-management-surveyors" element={<PartnerManagementSurveyorsPage />} />
        <Route path="/partner-management-major-loss" element={<PartnerManagementMajorLossPage />} />
        <Route path="/partner-management-parts" element={<PartnerManagementPartsPage />} />
        <Route path="/feature-tree" element={<FeatureTreePage />} />
        <Route path="/get-quote" element={<GetQuotePage />} />
        <Route path="/logistics" element={<LogisticsLandingPage />} />
        <Route path="/insurance" element={<InsuranceLandingPage />} />
        <Route path="/fleet" element={<FleetLandingPage />} />
        <Route path="/partner" element={<PartnerLandingPage />} />
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
        <Route path="/requirements-catalog" element={<RequirementsCatalogPage />} />
        <Route path="/questions-qic" element={<QuestionsQicPage />} />
        <Route path="/business-model-antares" element={<BusinessModelAntaresPage />} />
        <Route path="/business-model-antares-test" element={<BusinessModelAntaresPage />} />
        <Route path="/market-overview-logistics" element={<MarketOverviewPage />} />
        <Route path="/bcia" element={<BciaDeckPage />} />
        <Route path="/premium-corridor" element={<PremiumCorridorPage />} />
        <Route path="/setup" element={<SetupPage />} />
        <Route path="/storyblok-test" element={<StoryblokTestPage />} />
        <Route path="/landing/sitemap" element={<LandingSitemapPage />} />
        <Route path="/landing/tools" element={<LandingToolsPage />} />
        <Route path="/internal-docs" element={<InternalDocsOverviewPage />} />
        <Route path="/cv" element={<CvPage />} />
        <Route path="/anschreiben" element={<AnschreibenPage />} />
      </Route>
      <Route path="*" element={<NotFoundRedirect />} />
    </Routes>
  )
}
