import { RouterProvider } from 'react-router-dom'
import { router } from './app.route.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { ToastProvider } from './context/ToastContext.jsx'
import { ResumeProvider } from './context/ResumeContext.jsx'
import ErrorBoundary from './components/layout/ErrorBoundary.jsx'

export default function App() {
  return (
    <ErrorBoundary>
      {/* Toasts sit outermost so any provider below can raise one. */}
      <ToastProvider>
        <AuthProvider>
          <ResumeProvider>
            <RouterProvider router={router} />
          </ResumeProvider>
        </AuthProvider>
      </ToastProvider>
    </ErrorBoundary>
  )
}
