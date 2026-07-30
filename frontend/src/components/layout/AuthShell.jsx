import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import Logo from './Logo'
import ThemeToggle from '../ui/ThemeToggle'
import { scaleIn } from '../../lib/motion'

/** Shared frame for every auth screen so they stay visually identical. */
export default function AuthShell({ title, subtitle, eyebrow, children, footer }) {
  return (
    <div className="relative flex min-h-screen flex-col bg-ink-950 px-4 py-8 sm:px-6">
      <div className="pointer-events-none absolute inset-0 bg-aurora" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 bg-grid mask-fade-b opacity-40" aria-hidden="true" />

      <div className="relative mx-auto flex w-full max-w-md flex-1 flex-col justify-center">
        <div className="mb-6 flex items-center justify-between">
          <Logo />
          <div className="flex items-center gap-2">
            <ThemeToggle variant="icon" />
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-xs text-ink-400 transition hover:bg-fill-strong hover:text-ink-50"
            >
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
              Back home
            </Link>
          </div>
        </div>

        <motion.div
          variants={scaleIn}
          initial="initial"
          animate="animate"
          className="rounded-2xl p-6 shadow-lift glass sm:p-8"
        >
          <header className="mb-6">
            {eyebrow && (
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-400">{eyebrow}</p>
            )}
            <h1 className="mt-1.5 text-2xl font-bold tracking-tight text-ink-50">{title}</h1>
            {subtitle && <p className="mt-2 text-sm leading-relaxed text-ink-400">{subtitle}</p>}
          </header>

          {children}
        </motion.div>

        {footer && <div className="mt-6 text-center text-sm text-ink-400">{footer}</div>}
      </div>
    </div>
  )
}
