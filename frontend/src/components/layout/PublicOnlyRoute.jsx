import { Navigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import LoadingScreen from './LoadingScreen'

/** Keeps signed-in users out of login/register. */
export default function PublicOnlyRoute({ children }) {
  const { isAuthenticated, initializing } = useAuth()

  if (initializing) return <LoadingScreen message="Checking your session…" />
  if (isAuthenticated) return <Navigate to="/app" replace />

  return children
}
