import { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'

import MarketingLayout from './components/layout/MarketingLayout'
import DashboardLayout from './components/layout/DashboardLayout'
import ProtectedRoute from './components/layout/ProtectedRoute'
import PublicOnlyRoute from './components/layout/PublicOnlyRoute'
import LoadingScreen from './components/layout/LoadingScreen'
import SEO from './components/seo/SEO'

// Code-splitting public marketing pages for rapid First Contentful Paint & Core Web Vitals
const Landing = lazy(() => import('./pages/Landing'))
const Features = lazy(() => import('./pages/Features'))
const HowItWorks = lazy(() => import('./pages/HowItWorks'))
const ResumeAnalysis = lazy(() => import('./pages/ResumeAnalysis'))
const TechnicalInterviewPrep = lazy(() => import('./pages/TechnicalInterviewPrep'))
const HrInterviewPrep = lazy(() => import('./pages/HrInterviewPrep'))
const Faq = lazy(() => import('./pages/Faq'))
const NotFound = lazy(() => import('./pages/NotFound'))

// Code-splitting authentication routes
const Login = lazy(() => import('./pages/auth/Login'))
const Register = lazy(() => import('./pages/auth/Register'))
const ForgotPassword = lazy(() => import('./pages/auth/ForgotPassword'))
const ResetPassword = lazy(() => import('./pages/auth/ResetPassword'))

// Code-splitting private dashboard routes
const Dashboard = lazy(() => import('./pages/app/Dashboard'))
const ResumeUpload = lazy(() => import('./pages/app/ResumeUpload'))
const JobAnalysis = lazy(() => import('./pages/app/JobAnalysis'))
const InterviewPrep = lazy(() => import('./pages/app/InterviewPrep'))
const ReportHistory = lazy(() => import('./pages/app/ReportHistory'))
const Profile = lazy(() => import('./pages/app/Profile'))

// Wrapper for private pages with noindex SEO protection
function PrivatePage({ children, title }) {
  return (
    <>
      <SEO title={title} noIndex={true} />
      <Suspense fallback={<LoadingScreen />}>
        {children}
      </Suspense>
    </>
  )
}

function PublicPage({ children }) {
  return (
    <Suspense fallback={<LoadingScreen />}>
      {children}
    </Suspense>
  )
}

export const router = createBrowserRouter([
  // ---------- public marketing ----------
  {
    element: <MarketingLayout />,
    children: [
      { path: '/', element: <PublicPage><Landing /></PublicPage> },
      { path: '/features', element: <PublicPage><Features /></PublicPage> },
      { path: '/how-it-works', element: <PublicPage><HowItWorks /></PublicPage> },
      { path: '/resume-analysis', element: <PublicPage><ResumeAnalysis /></PublicPage> },
      { path: '/technical-interview-preparation', element: <PublicPage><TechnicalInterviewPrep /></PublicPage> },
      { path: '/hr-interview-preparation', element: <PublicPage><HrInterviewPrep /></PublicPage> },
      { path: '/faq', element: <PublicPage><Faq /></PublicPage> },
    ],
  },

  // ---------- auth (redirects away when already signed in, noindex protection) ----------
  {
    path: '/login',
    element: (
      <PublicOnlyRoute>
        <PrivatePage title="Sign In">
          <Login />
        </PrivatePage>
      </PublicOnlyRoute>
    ),
  },
  {
    path: '/register',
    element: (
      <PublicOnlyRoute>
        <PrivatePage title="Create Account">
          <Register />
        </PrivatePage>
      </PublicOnlyRoute>
    ),
  },
  {
    path: '/forgot-password',
    element: (
      <PublicOnlyRoute>
        <PrivatePage title="Reset Password">
          <ForgotPassword />
        </PrivatePage>
      </PublicOnlyRoute>
    ),
  },
  {
    path: '/reset-password',
    element: (
      <PublicOnlyRoute>
        <PrivatePage title="Set New Password">
          <ResetPassword />
        </PrivatePage>
      </PublicOnlyRoute>
    ),
  },

  // ---------- authenticated app (strictly noindex) ----------
  {
    path: '/app',
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <PrivatePage title="Dashboard">
            <Dashboard />
          </PrivatePage>
        ),
      },
      {
        path: 'resume',
        element: (
          <PrivatePage title="Resume Upload">
            <ResumeUpload />
          </PrivatePage>
        ),
      },
      {
        path: 'analyze',
        element: (
          <PrivatePage title="New Job Analysis">
            <JobAnalysis />
          </PrivatePage>
        ),
      },
      {
        path: 'reports',
        element: (
          <PrivatePage title="Preparation Reports">
            <ReportHistory />
          </PrivatePage>
        ),
      },
      {
        path: 'reports/:id',
        element: (
          <PrivatePage title="Interview Report">
            <InterviewPrep />
          </PrivatePage>
        ),
      },
      {
        path: 'profile',
        element: (
          <PrivatePage title="Your Profile">
            <Profile />
          </PrivatePage>
        ),
      },
    ],
  },

  {
    path: '*',
    element: (
      <PublicPage>
        <SEO title="Page Not Found" noIndex={true} />
        <NotFound />
      </PublicPage>
    ),
  },
])
