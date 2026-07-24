import { useEffect, useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import Logo from './Logo'
import Button from '../ui/Button'
import { useAuth } from '../../hooks/useAuth'
import { cn } from '../../lib/utils'

const LINKS = [
  { href: '#features', label: 'Features' },
  { href: '#how-it-works', label: 'How it works' },
  { href: '#testimonials', label: 'Customers' },
  { href: '#pricing', label: 'Pricing' },
]

export default function MarketingLayout() {
  const { isAuthenticated } = useAuth()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="min-h-screen bg-ink-950">
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-300',
          scrolled ? 'border-b border-white/8 bg-ink-950/80 backdrop-blur-xl' : 'bg-transparent',
        )}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Logo />

          <nav className="hidden items-center gap-1 md:flex" aria-label="Sections">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="rounded-lg px-3 py-2 text-sm text-ink-400 transition hover:bg-white/5 hover:text-white"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            {isAuthenticated ? (
              <Button to="/app" size="sm">Open dashboard</Button>
            ) : (
              <>
                <Button to="/login" variant="ghost" size="sm">Sign in</Button>
                <Button to="/register" size="sm">Get started free</Button>
              </>
            )}
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            className="rounded-lg p-2 text-ink-300 transition hover:bg-white/5 hover:text-white md:hidden"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {menuOpen && (
          <div className="animate-fade-in border-t border-white/8 bg-ink-950/95 px-4 py-4 backdrop-blur-xl md:hidden">
            <nav className="flex flex-col gap-1" aria-label="Sections">
              {LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm text-ink-300 transition hover:bg-white/5 hover:text-white"
                >
                  {l.label}
                </a>
              ))}
            </nav>

            <div className="mt-4 flex flex-col gap-2">
              {isAuthenticated ? (
                <Button to="/app" fullWidth>Open dashboard</Button>
              ) : (
                <>
                  <Button to="/login" variant="secondary" fullWidth>Sign in</Button>
                  <Button to="/register" fullWidth>Get started free</Button>
                </>
              )}
            </div>
          </div>
        )}
      </header>

      <main><Outlet /></main>

      <footer className="border-t border-white/8 bg-ink-950">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
            <div className="max-w-xs">
              <Logo />
              <p className="mt-3 text-sm leading-relaxed text-ink-500">
                AI-powered interview preparation. Turn any job description into a
                tailored practice plan in minutes.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-ink-300">Product</h3>
                <ul className="mt-3 space-y-2 text-sm">
                  {LINKS.map((l) => (
                    <li key={l.href}>
                      <a href={l.href} className="text-ink-500 transition hover:text-white">{l.label}</a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-ink-300">Account</h3>
                <ul className="mt-3 space-y-2 text-sm">
                  <li><Link to="/login" className="text-ink-500 transition hover:text-white">Sign in</Link></li>
                  <li><Link to="/register" className="text-ink-500 transition hover:text-white">Create account</Link></li>
                  <li><Link to="/forgot-password" className="text-ink-500 transition hover:text-white">Reset password</Link></li>
                </ul>
              </div>

              <div className="col-span-2 sm:col-span-1">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-ink-300">Legal</h3>
                <ul className="mt-3 space-y-2 text-sm text-ink-500">
                  <li>Privacy policy</li>
                  <li>Terms of service</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/8 pt-6 text-xs text-ink-600 sm:flex-row">
            <p>© {new Date().getFullYear()} PrepPilot. All rights reserved.</p>
            <p>Built with React, Tailwind CSS and Gemini.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
