import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '../../lib/utils'

/** Expand/collapse panel used across the interview report sections. */
export default function Accordion({ title, subtitle, badge, defaultOpen = false, children, className }) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className={cn('overflow-hidden rounded-xl border border-white/10 bg-white/[0.02]', className)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center gap-3 p-4 text-left transition hover:bg-white/[0.04]"
      >
        <ChevronDown
          className={cn('h-4 w-4 shrink-0 text-ink-400 transition-transform duration-300', open && 'rotate-180')}
          aria-hidden="true"
        />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-white">{title}</p>
          {subtitle && <p className="mt-0.5 line-clamp-1 text-xs text-ink-500">{subtitle}</p>}
        </div>
        {badge}
      </button>

      {open && (
        <div className="animate-fade-in border-t border-white/8 p-4 pt-4">{children}</div>
      )}
    </div>
  )
}
