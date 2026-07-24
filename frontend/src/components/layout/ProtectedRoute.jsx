import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import LoadingScreen from './LoadingScreen'

/** Blocks app routes until the session probe resolves, then redirects if signed out. */
export default function ProtectedRoute({ children }) {
  const { isAuthenticated, initializing } = useAuth()
  const location = useLocation()

  if (initializing) return <LoadingScreen message="Checking your session…" />

  if (!isAuthenticated) {
    // remember where they were headed so login can send them back
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }

  return children
}
