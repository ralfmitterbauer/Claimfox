import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import LoginPage from '@/pages/LoginPage'
import RegistrationPage from '@/pages/RegistrationPage'
import RolesPage from '@/pages/RolesPage'
import BrokerPortalLandingPage from '@/pages/BrokerPortalLandingPage'
import ProtectedRoute from '@/router/ProtectedRoute'
import ProtectedLayout from '@/layouts/ProtectedLayout'
import { useAuth } from '@/features/auth/AuthContext'
import BrokerPortalLandingPage from '@/pages/BrokerPortalLandingPage'
import BrokerCrmPage from '@/pages/BrokerCrmPage'

function NotFoundRedirect() {
  const { isAuthenticated } = useAuth()
  return <Navigate to={isAuthenticated ? '/roles' : '/home'} replace />
}

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/home" element={<LoginPage />} />
      <Route
        element={
          <ProtectedRoute>
            <ProtectedLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/roles" element={<RolesPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/broker-portal" element={<BrokerPortalLandingPage />} />
        <Route path="/broker-crm" element={<BrokerCrmPage />} />
      </Route>
      <Route path="*" element={<NotFoundRedirect />} />
    </Routes>
  )
}
