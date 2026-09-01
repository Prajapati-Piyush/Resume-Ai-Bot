import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, Outlet } from 'react-router-dom'
import { ChevronDown, Menu, X } from 'lucide-react'
import Logo from './Logo'
import Button from '../ui/Button'
import ThemeToggle from '../ui/ThemeToggle'
import { useAuth } from '../../hooks/useAuth'
import { cn } from '../../lib/utils'

const PRIMARY_LINKS = [
  { href: '/#features', label: 'Features' },
  { href: '/#how-it-works', label: 'How it works' },
  { href: '/#testimonials', label: 'Customers' },
  { href: '/#pricing', label: 'Pricing' },
]

const SOLUTION_LINKS = [
  { to: '/features', label: 'All Features' },
  { to: '/how-it-works', label: 'How It Works' },
  { to: '/resume-analysis', label: 'Resume Analysis AI' },
  { to: '/technical-interview-preparation', label: 'Technical Interview Prep' },
  { to: '/hr-interview-preparation', label: 'HR Interview Prep' },
  { to: '/faq', label: 'FAQ' },
]

export default function MarketingLayout() {
  const { isAuthenticated } = useAuth()
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [solutionsOpen, setSolutionsOpen] = useState(false)
  const solutionsRef = useRef(null)

  // Scroll listener for sticky header background
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menus and scroll to top on page navigation
  useEffect(() => {
    setSolutionsOpen(false)
    setMenuOpen(false)
    if (!location.hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    }
  }, [location.pathname, location.hash])

  // Click outside listener for Explore dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (solutionsRef.current && !solutionsRef.current.contains(event.target)) {
        setSolutionsOpen(false)
      }
    }
    if (solutionsOpen) {
      document.addEventListener('pointerdown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('pointerdown', handleClickOutside)
    }
  }, [solutionsOpen])

  return (
    <div className="min-h-screen bg-ink-950">
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-300',
          scrolled ? 'border-b border-line bg-ink-950/80 backdrop-blur-xl' : 'bg-transparent',
        )}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Logo />

          <nav className="hidden items-center gap-1 md:flex" aria-label="Sections">
            {PRIMARY_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="rounded-lg px-3 py-2 text-sm text-ink-400 transition hover:bg-fill-strong hover:text-ink-50"
              >
                {l.label}
              </a>
            ))}

            {/* Public SEO Solutions Dropdown */}
            <div ref={solutionsRef} className="relative ml-1">
              <button
                type="button"
                onClick={() => setSolutionsOpen((v) => !v)}
                className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm text-ink-400 transition hover:bg-fill-strong hover:text-ink-50"
                aria-expanded={solutionsOpen}
                aria-haspopup="true"
              >
                Explore
                <ChevronDown className={cn('h-3.5 w-3.5 transition-transform duration-200', solutionsOpen && 'rotate-180')} />
              </button>

              {solutionsOpen && (
                <div className="animate-scale-in absolute left-0 top-full mt-2 w-60 rounded-2xl border border-line bg-ink-900/95 p-2 shadow-lift backdrop-blur-2xl z-50">
                  {SOLUTION_LINKS.map((sol) => (
                    <Link
                      key={sol.to}
                      to={sol.to}
                      onClick={() => setSolutionsOpen(false)}
                      className="block rounded-xl px-3.5 py-2.5 text-xs font-medium text-ink-300 transition hover:bg-fill-strong hover:text-ink-50"
                    >
                      {sol.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <ThemeToggle variant="icon" />
            {isAuthenticated ? (
              <Button to="/app" size="sm">Open dashboard</Button>
            ) : (
              <>
                <Button to="/login" variant="ghost" size="sm">Sign in</Button>
                <Button to="/register" size="sm">Start Preparing</Button>
              </>
            )}
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            className="rounded-lg p-2 text-ink-300 transition hover:bg-fill-strong hover:text-ink-50 md:hidden"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {menuOpen && (
          <div className="animate-fade-in border-t border-line bg-ink-950/95 px-4 py-4 backdrop-blur-xl md:hidden">
            <nav className="flex flex-col gap-1" aria-label="Sections">
              {PRIMARY_LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm text-ink-300 transition hover:bg-fill-strong hover:text-ink-50"
                >
                  {l.label}
                </a>
              ))}
              <div className="my-1 border-t border-line px-3 pt-2 text-xs font-semibold uppercase tracking-wider text-ink-500">
                Explore Pages
              </div>
              {SOLUTION_LINKS.map((sol) => (
                <Link
                  key={sol.to}
                  to={sol.to}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg px-3 py-2 text-sm text-ink-300 transition hover:bg-fill-strong hover:text-ink-50"
                >
                  {sol.label}
                </Link>
              ))}
            </nav>

            <div className="mt-4 flex flex-col gap-2">
              {isAuthenticated ? (
                <Button to="/app" fullWidth>Open dashboard</Button>
              ) : (
                <>
                  <Button to="/login" variant="secondary" fullWidth>Sign in</Button>
                  <Button to="/register" fullWidth>Start Preparing</Button>
                </>
              )}
              <div className="mt-2 flex items-center justify-between rounded-lg border border-line bg-fill px-3 py-2">
                <span className="text-sm text-ink-400">Theme</span>
                <ThemeToggle />
              </div>
            </div>
          </div>
        )}
      </header>

      <main><Outlet /></main>

      <footer className="border-t border-line bg-ink-950">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
            <div className="max-w-xs">
              <Logo />
              <p className="mt-3 text-sm leading-relaxed text-ink-500">
                AI-powered interview preparation. Turn any job description into a
                tailored practice plan in minutes.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-ink-300">Product</h3>
                <ul className="mt-3 space-y-2 text-sm">
                  {PRIMARY_LINKS.map((l) => (
                    <li key={l.href}>
                      <a href={l.href} className="text-ink-500 transition hover:text-ink-50">{l.label}</a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-ink-300">Solutions</h3>
                <ul className="mt-3 space-y-2 text-sm">
                  <li><Link to="/resume-analysis" className="text-ink-500 transition hover:text-ink-50">Resume Analysis</Link></li>
                  <li><Link to="/technical-interview-preparation" className="text-ink-500 transition hover:text-ink-50">Technical Prep</Link></li>
                  <li><Link to="/hr-interview-preparation" className="text-ink-500 transition hover:text-ink-50">HR & Behavioral</Link></li>
                  <li><Link to="/faq" className="text-ink-500 transition hover:text-ink-50">FAQ</Link></li>
                </ul>
              </div>

              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-ink-300">Account</h3>
                <ul className="mt-3 space-y-2 text-sm">
                  <li><Link to="/login" className="text-ink-500 transition hover:text-ink-50">Sign in</Link></li>
                  <li><Link to="/register" className="text-ink-500 transition hover:text-ink-50">Create account</Link></li>
                  <li><Link to="/forgot-password" className="text-ink-500 transition hover:text-ink-50">Reset password</Link></li>
                </ul>
              </div>

              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-ink-300">Legal</h3>
                <ul className="mt-3 space-y-2 text-sm text-ink-500">
                  <li>Privacy policy</li>
                  <li>Terms of service</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-line pt-6 text-xs text-ink-600 sm:flex-row">
            <p>© {new Date().getFullYear()} PrepPilot. All rights reserved.</p>
            <p>Built for ambitious engineers and candidates.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
