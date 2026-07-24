import { createBrowserRouter } from 'react-router-dom'

import MarketingLayout from './components/layout/MarketingLayout'
import DashboardLayout from './components/layout/DashboardLayout'
import ProtectedRoute from './components/layout/ProtectedRoute'
import PublicOnlyRoute from './components/layout/PublicOnlyRoute'

import Landing from './pages/Landing'
import NotFound from './pages/NotFound'

import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import ForgotPassword from './pages/auth/ForgotPassword'
import ResetPassword from './pages/auth/ResetPassword'

import Dashboard from './pages/app/Dashboard'
import ResumeUpload from './pages/app/ResumeUpload'
import JobAnalysis from './pages/app/JobAnalysis'
import InterviewPrep from './pages/app/InterviewPrep'
import ReportHistory from './pages/app/ReportHistory'
import Profile from './pages/app/Profile'

export const router = createBrowserRouter([
  // ---------- public marketing ----------
  {
    element: <MarketingLayout />,
    children: [{ path: '/', element: <Landing /> }],
  },

  // ---------- auth (redirects away when already signed in) ----------
  { path: '/login', element: <PublicOnlyRoute><Login /></PublicOnlyRoute> },
  { path: '/register', element: <PublicOnlyRoute><Register /></PublicOnlyRoute> },
  { path: '/forgot-password', element: <PublicOnlyRoute><ForgotPassword /></PublicOnlyRoute> },
  { path: '/reset-password', element: <PublicOnlyRoute><ResetPassword /></PublicOnlyRoute> },

  // ---------- authenticated app ----------
  {
    path: '/app',
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'resume', element: <ResumeUpload /> },
      { path: 'analyze', element: <JobAnalysis /> },
      { path: 'reports', element: <ReportHistory /> },
      { path: 'reports/:id', element: <InterviewPrep /> },
      { path: 'profile', element: <Profile /> },
    ],
  },

  { path: '*', element: <NotFound /> },
])
