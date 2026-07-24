import { useEffect, useState } from 'react'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import {
  FileText,
  History,
  LayoutDashboard,
  LogOut,
  Menu,
  Sparkles,
  Upload,
  User,
  X,
} from 'lucide-react'
import Logo from './Logo'
import Button from '../ui/Button'
import { useAuth } from '../../hooks/useAuth'
import { useToast } from '../../hooks/useToast'
import { cn, initialsOf } from '../../lib/utils'

const NAV_ITEMS = [
  { to: '/app', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/app/resume', label: 'Resume', icon: Upload },
  { to: '/app/analyze', label: 'New Analysis', icon: Sparkles },
  { to: '/app/reports', label: 'Reports', icon: History },
  { to: '/app/profile', label: 'Profile', icon: User },
]

function NavItems({ onNavigate }) {
  return (
    <nav className="flex flex-col gap-1" aria-label="Main">
      {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          onClick={onNavigate}
          className={({ isActive }) =>
            cn(
              'group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all',
              isActive
                ? 'border border-brand-400/25 bg-brand-500/12 text-white'
                : 'border border-transparent text-ink-400 hover:bg-white/[0.05] hover:text-white',
            )
          }
        >
          {({ isActive }) => (
            <>
              <Icon
                className={cn(
                  'h-4.5 w-4.5 shrink-0 transition-colors',
                  isActive ? 'text-brand-300' : 'text-ink-500 group-hover:text-ink-300',
                )}
                style={{ width: 18, height: 18 }}
                aria-hidden="true"
              />
              {label}
            </>
          )}
        </NavLink>
      ))}
    </nav>
  )
}

function UserCard({ user, onLogout, loggingOut }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
      <div className="flex items-center gap-3">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-xs font-semibold text-white">
          {initialsOf(user?.name, user?.email)}
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-white">{user?.name || 'Account'}</p>
          <p className="truncate text-xs text-ink-500">{user?.email}</p>
        </div>
      </div>

      <Button
        variant="ghost"
        size="sm"
        fullWidth
        className="mt-2 justify-start"
        onClick={onLogout}
        loading={loggingOut}
      >
        {!loggingOut && <LogOut className="h-4 w-4" aria-hidden="true" />}
        Sign out
      </Button>
    </div>
  )
}

export default function DashboardLayout() {
  const { user, logout } = useAuth()
  const toast = useToast()
  const navigate = useNavigate()
  const location = useLocation()

  const [mobileOpen, setMobileOpen] = useState(false)
  const [loggingOut, setLoggingOut] = useState(false)

  // close the drawer whenever the route changes
  useEffect(() => setMobileOpen(false), [location.pathname])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  const handleLogout = async () => {
    setLoggingOut(true)
    try {
      await logout()
      toast.success('Signed out successfully')
      navigate('/login', { replace: true })
    } catch {
      toast.error('Could not sign out. Please try again.')
    } finally {
      setLoggingOut(false)
    }
  }

  return (
    <div className="min-h-screen bg-ink-950">
      {/* ambient background */}
      <div className="pointer-events-none fixed inset-0 bg-aurora opacity-40" aria-hidden="true" />

      {/* ---------- desktop sidebar ---------- */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-white/8 bg-ink-950/60 p-4 backdrop-blur-xl lg:flex">
        <div className="px-2 py-2">
          <Logo to="/app" />
        </div>

        <div className="mt-6 flex-1 overflow-y-auto">
          <NavItems />
        </div>

        <UserCard user={user} onLogout={handleLogout} loggingOut={loggingOut} />
      </aside>

      {/* ---------- mobile drawer ---------- */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 animate-fade-in bg-ink-950/80 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
          <aside
            className="absolute inset-y-0 left-0 flex w-[min(280px,85vw)] animate-slide-in-right flex-col border-r border-white/10 bg-ink-900/95 p-4 backdrop-blur-2xl"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <div className="flex items-center justify-between px-1 py-2">
              <Logo to="/app" />
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                className="rounded-lg p-2 text-ink-400 transition hover:bg-white/5 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-6 flex-1 overflow-y-auto">
              <NavItems onNavigate={() => setMobileOpen(false)} />
            </div>

            <UserCard user={user} onLogout={handleLogout} loggingOut={loggingOut} />
          </aside>
        </div>
      )}

      {/* ---------- main column ---------- */}
      <div className="relative lg:pl-64">
        <header className="sticky top-0 z-20 border-b border-white/8 bg-ink-950/70 backdrop-blur-xl">
          <div className="flex h-16 items-center gap-3 px-4 sm:px-6">
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              className="rounded-lg p-2 text-ink-300 transition hover:bg-white/5 hover:text-white lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>

            <div className="lg:hidden">
              <Logo to="/app" showWordmark={false} />
            </div>

            <div className="ml-auto flex items-center gap-2">
              <Button to="/app/analyze" size="sm">
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                <span className="hidden sm:inline">New analysis</span>
                <span className="sm:hidden">New</span>
              </Button>
            </div>
          </div>
        </header>

        <main className="px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <Outlet />
          </div>
        </main>

        <footer className="border-t border-white/8 px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 text-xs text-ink-500 sm:flex-row">
            <p className="flex items-center gap-1.5">
              <FileText className="h-3.5 w-3.5" aria-hidden="true" />
              Reports are generated by AI — always review before relying on them.
            </p>
            <p>© {new Date().getFullYear()} PrepPilot</p>
          </div>
        </footer>
      </div>
    </div>
  )
}
