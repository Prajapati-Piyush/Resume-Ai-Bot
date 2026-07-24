import { cn } from '../../lib/utils'

const VARIANTS = {
  neutral: 'bg-white/[0.06] text-ink-300 border-white/12',
  brand: 'bg-brand-500/12 text-brand-300 border-brand-400/25',
  success: 'bg-emerald-500/10 text-emerald-300 border-emerald-400/25',
  warning: 'bg-amber-500/10 text-amber-300 border-amber-400/25',
  danger: 'bg-rose-500/10 text-rose-300 border-rose-400/25',
}

export default function Badge({ variant = 'neutral', icon: Icon, className, children }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium',
        VARIANTS[variant],
        className,
      )}
    >
      {Icon && <Icon className="h-3.5 w-3.5" aria-hidden="true" />}
      {children}
    </span>
  )
}
