import React, { createContext, useContext, useMemo, useState, useCallback } from 'react'

type AuthContextValue = {
  isAuthenticated: boolean
  user: AuthUser | null
  login: (username: string, password: string) => boolean
  logout: () => void
}

const STORAGE_KEY = 'cf_auth'
const STORAGE_USER_KEY = 'cf_auth_user'
const VALID_USERNAME = 'ralf'
const VALID_PASSWORD = '2106'

type AuthUser = {
  username: string
  mode: 'full' | 'insurance-only'
}

const ADDITIONAL_CREDENTIALS: Array<AuthUser & { password: string }> = [
  { username: 'insurteam', password: '2105', mode: 'full' },
  { username: 'demofuchs', password: '2105', mode: 'full' },
  { username: 'priyanka', password: '9876', mode: 'insurance-only' }
]

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

function isBrowser() {
  return typeof window !== 'undefined'
}

function readStoredState() {
  if (!isBrowser()) {
    return { isAuthenticated: false, user: null }
  }
  const isAuthenticated = window.localStorage.getItem(STORAGE_KEY) === 'true'
  const rawUser = window.localStorage.getItem(STORAGE_USER_KEY)
  const user = rawUser ? (JSON.parse(rawUser) as AuthUser) : null
  return { isAuthenticated, user }
}

function persistState(nextState: boolean, user: AuthUser | null) {
  if (!isBrowser()) {
    return
  }
  if (nextState) {
    window.localStorage.setItem(STORAGE_KEY, 'true')
    if (user) {
      window.localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(user))
    }
  } else {
    window.localStorage.removeItem(STORAGE_KEY)
    window.localStorage.removeItem(STORAGE_USER_KEY)
  }
}

function credentialsMatch(username: string, password: string) {
  const normalizedUsername = username.trim().toLowerCase()
  const normalizedPassword = password.trim()

  if (normalizedUsername === VALID_USERNAME.toLowerCase() && normalizedPassword === VALID_PASSWORD) {
    return { ok: true, user: { username: VALID_USERNAME, mode: 'full' } as AuthUser }
  }

  const match = ADDITIONAL_CREDENTIALS.find(
    (cred) => normalizedUsername === cred.username.toLowerCase() && normalizedPassword === cred.password
  )
  if (match) {
    return { ok: true, user: { username: match.username, mode: match.mode } as AuthUser }
  }
  return { ok: false, user: null as AuthUser | null }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => readStoredState().isAuthenticated)
  const [user, setUser] = useState<AuthUser | null>(() => readStoredState().user)

  const login = useCallback((username: string, password: string) => {
    const result = credentialsMatch(username, password)
    persistState(result.ok, result.user)
    setIsAuthenticated(result.ok)
    setUser(result.user)
    return result.ok
  }, [])

  const logout = useCallback(() => {
    persistState(false, null)
    setIsAuthenticated(false)
    setUser(null)
  }, [])

  const value = useMemo<AuthContextValue>(() => ({
    isAuthenticated,
    user,
    login,
    logout
  }), [isAuthenticated, user, login, logout])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
