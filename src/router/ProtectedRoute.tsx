import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/features/auth/AuthContext'

type ProtectedRouteProps = {
  children: React.ReactElement
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated } = useAuth()
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const isPrintMode = searchParams.get('print') === '1'
  const printAllowedRoutes = new Set([
    '/business-model-antares',
    '/enterprise-leads-intelligence'
  ])
  const isPrintAllowed = isPrintMode && printAllowedRoutes.has(location.pathname)

  if (!isAuthenticated && !isPrintAllowed) {
    return <Navigate to="/login" replace />
  }

  return children
}
