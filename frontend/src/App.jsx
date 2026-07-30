import { RouterProvider } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import { router } from './app.route.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { ToastProvider } from './context/ToastContext.jsx'
import { ResumeProvider } from './context/ResumeContext.jsx'
import ErrorBoundary from './components/layout/ErrorBoundary.jsx'

export default function App() {
  return (
    <ErrorBoundary>
      {/* MotionConfig honours the OS reduced-motion setting app-wide. */}
      <MotionConfig reducedMotion="user">
        <ThemeProvider>
          {/* Toasts sit above so any provider below can raise one. */}
          <ToastProvider>
            <AuthProvider>
              <ResumeProvider>
                <RouterProvider router={router} />
              </ResumeProvider>
            </AuthProvider>
          </ToastProvider>
        </ThemeProvider>
      </MotionConfig>
    </ErrorBoundary>
  )
}
