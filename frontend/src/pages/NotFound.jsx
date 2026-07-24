import { ArrowLeft, Compass, Home, Search } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/ui/Button'
import Logo from '../components/layout/Logo'
import { useAuth } from '../hooks/useAuth'

export default function NotFound() {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()

  return (
    <div className="relative flex min-h-screen flex-col bg-ink-950 px-4 py-8 sm:px-6">
      <div className="pointer-events-none absolute inset-0 bg-aurora" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 bg-grid mask-fade-b opacity-40" aria-hidden="true" />

      <div className="relative">
        <Logo />
      </div>

      <div className="relative mx-auto flex w-full max-w-lg flex-1 flex-col items-center justify-center text-center">
        <div className="animate-fade-up">
          <span className="relative grid h-24 w-24 place-items-center">
            <span
              className="absolute inset-0 animate-spin-slow rounded-full border border-dashed border-brand-400/25"
              aria-hidden="true"
            />
            <span className="grid h-16 w-16 place-items-center rounded-2xl border border-brand-400/25 bg-brand-500/12 text-brand-300 shadow-glow">
              <Compass className="h-8 w-8" aria-hidden="true" />
            </span>
          </span>
        </div>

        <p
          className="mt-8 animate-fade-up bg-gradient-to-b from-white to-white/20 bg-clip-text text-7xl font-bold leading-none text-transparent sm:text-8xl"
          style={{ animationDelay: '60ms' }}
        >
          404
        </p>

        <h1
          className="mt-4 animate-fade-up text-balance text-2xl font-bold tracking-tight text-white sm:text-3xl"
          style={{ animationDelay: '120ms' }}
        >
          We couldn&apos;t find that page
        </h1>

        <p
          className="mt-3 max-w-sm animate-fade-up text-pretty text-sm leading-relaxed text-ink-400"
          style={{ animationDelay: '180ms' }}
        >
          The link may be broken, or the page may have been moved. Let&apos;s get
          you back to somewhere useful.
        </p>

        <div
          className="mt-8 flex w-full animate-fade-up flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row"
          style={{ animationDelay: '240ms' }}
        >
          <Button
            variant="secondary"
            size="lg"
            onClick={() => navigate(-1)}
            className="w-full sm:w-auto"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Go back
          </Button>

          <Button to={isAuthenticated ? '/app' : '/'} size="lg" className="w-full sm:w-auto">
            <Home className="h-4 w-4" aria-hidden="true" />
            {isAuthenticated ? 'Back to dashboard' : 'Back home'}
          </Button>
        </div>

        {isAuthenticated && (
          <div
            className="mt-10 w-full animate-fade-up rounded-2xl glass p-5 text-left"
            style={{ animationDelay: '300ms' }}
          >
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-ink-400">
              <Search className="h-3.5 w-3.5" aria-hidden="true" />
              Try one of these
            </p>

            <div className="mt-3 grid gap-2 sm:grid-cols-3">
              {[
                ['/app', 'Dashboard'],
                ['/app/analyze', 'New analysis'],
                ['/app/reports', 'Your reports'],
              ].map(([to, label]) => (
                <Button key={to} to={to} variant="ghost" size="sm" className="justify-start">
                  {label}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
