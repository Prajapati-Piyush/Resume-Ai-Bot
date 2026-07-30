import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CalendarCheck, ChevronDown, Download, FileText, MessagesSquare } from 'lucide-react'
import Button from '../ui/Button'
import { cn } from '../../lib/utils'

const OPTIONS = [
  { scope: 'full', icon: FileText, label: 'Full report', hint: 'Everything, formatted' },
  { scope: 'questions', icon: MessagesSquare, label: 'Questions only', hint: 'Technical + behavioural' },
  { scope: 'roadmap', icon: CalendarCheck, label: 'Roadmap only', hint: 'Day-by-day plan' },
]

/**
 * Export dropdown. On select, calls `onExport(scope)` — the parent sets the
 * print scope, then triggers window.print() on the next frame so the print
 * document re-renders with the chosen scope before the dialog opens.
 */
export default function ExportMenu({ onExport }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (!open) return
    const onDown = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const choose = (scope) => {
    setOpen(false)
    onExport(scope)
  }

  return (
    <div className="relative" ref={ref}>
      <Button variant="secondary" size="sm" onClick={() => setOpen((v) => !v)} aria-haspopup="menu" aria-expanded={open}>
        <Download className="h-4 w-4" aria-hidden="true" />
        <span className="hidden sm:inline">Export PDF</span>
        <span className="sm:hidden">PDF</span>
        <ChevronDown className={cn('h-3.5 w-3.5 transition-transform', open && 'rotate-180')} aria-hidden="true" />
      </Button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 z-40 mt-2 w-60 overflow-hidden rounded-xl p-1.5 shadow-lift glass-strong"
          >
            {OPTIONS.map(({ scope, icon: Icon, label, hint }) => (
              <button
                key={scope}
                role="menuitem"
                type="button"
                onClick={() => choose(scope)}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition hover:bg-fill-strong"
              >
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-line bg-fill text-ink-400">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-medium text-ink-100">{label}</span>
                  <span className="block text-xs text-ink-500">{hint}</span>
                </span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
