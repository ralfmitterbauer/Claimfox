import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/features/auth/AuthContext'

type ProtectedRouteProps = {
  children: React.ReactElement
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, user } = useAuth()
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const isPrintMode = searchParams.get('print') === '1'
  const printAllowedRoutes = new Set([
    '/business-model-antares'
  ])
  const isPrintAllowed = isPrintMode && printAllowedRoutes.has(location.pathname)

  if (!isAuthenticated && !isPrintAllowed) {
    return <Navigate to="/login" replace />
  }

  if (isAuthenticated && user?.mode === 'insurance-only') {
    const allowedRoutes = new Set(['/home', '/insurance'])
    if (!allowedRoutes.has(location.pathname)) {
      return <Navigate to="/home" replace />
    }
  }

  return children
}
