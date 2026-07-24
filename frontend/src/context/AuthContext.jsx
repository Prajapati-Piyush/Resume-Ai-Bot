import { createContext, useCallback, useEffect, useMemo, useState } from 'react'
import * as authApi from '../api/auth.api'
import { SESSION_EXPIRED_EVENT } from '../api/client'

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  // `initializing` = the one-time session probe on mount. Distinct from
  // per-action pending state so buttons don't fight the boot spinner.
  const [initializing, setInitializing] = useState(true)

  useEffect(() => {
    let cancelled = false

    ;(async () => {
      try {
        const me = await authApi.getMe()
        if (!cancelled) setUser(me)
      } catch {
        if (!cancelled) setUser(null) // no active session — expected when logged out
      } finally {
        if (!cancelled) setInitializing(false)
      }
    })()

    return () => {
      cancelled = true
    }
  }, [])

  // The axios interceptor fires this when any authenticated call returns 401.
  useEffect(() => {
    const onExpired = () => setUser(null)
    window.addEventListener(SESSION_EXPIRED_EVENT, onExpired)
    return () => window.removeEventListener(SESSION_EXPIRED_EVENT, onExpired)
  }, [])

  const login = useCallback(async (credentials) => {
    const me = await authApi.login(credentials)
    setUser(me)
    return me
  }, [])

  const register = useCallback(async (details) => {
    const me = await authApi.register(details)
    setUser(me)
    return me
  }, [])

  const logout = useCallback(async () => {
    try {
      await authApi.logout()
    } finally {
      setUser(null)
    }
  }, [])

  const refresh = useCallback(async () => {
    const me = await authApi.getMe()
    setUser(me)
    return me
  }, [])

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      initializing,
      login,
      register,
      logout,
      refresh,
      forgotPassword: authApi.forgotPassword,
      resetPassword: authApi.resetPassword,
    }),
    [user, initializing, login, register, logout, refresh],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
